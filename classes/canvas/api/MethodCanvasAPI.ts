class MethodCanvasAPI extends AbstractCanvasAPI {

    public openMethod( methodData: MethodData ) {

        this.renderMethod( methodData );
    }

    public closeMethod() {

        DOMHelper.removeAllChildren( this.canvas );
    }

    public addParameter( parameterData: ParameterData ) {

        this.renderParameter( parameterData );
    }

    public addVariable( variableData: VariableData ) {

        this.renderVariable( variableData );
    }

    private renderMethod( methodData: MethodData ) {

        if ( methodData.parameters !== undefined )
            methodData.parameters.map( this.renderParameter, this );

        if ( methodData.variables !== undefined )
            methodData.variables.map( this.renderVariable, this );
    }

    /**
     * Render a method parameter its identifiers.
     * Create the element and append it to the canvas.
     * @param parameterData 
     */
    private renderParameter( parameterData: ParameterData ) {

        let parameterContainer: HTMLDivElement = DOMHelper.createDivElement( {
            position: 'absolute',
            border: '1px solid orange',
            height: '50px',
            width: '150px',
            top: parameterData.y + 'px',
            left: parameterData.x + 'px'
        } );

        parameterContainer.innerText = parameterData.name;
        parameterContainer.draggable = true;
        parameterContainer.ondragstart = this.onDragStart.bind( this );
        parameterContainer.ondragend = this.dropProperty.bind( this, parameterData );
        parameterContainer.ondblclick = this.addIdentifier.bind( this, parameterData );

        this.canvas.appendChild( parameterContainer );

        parameterData.identifiers.map( this.renderIdentifier, this );
    }

    /**
     * Render a local variable with its identifiers.
     * Create the element and append it to the canvas.
     * @param variableData 
     */
    private renderVariable( variableData: VariableData ) {

        let variableContainer: HTMLDivElement = DOMHelper.createDivElement( {
            position: 'absolute',
            border: '1px solid pink',
            height: '50px',
            width: '150px',
            top: variableData.y + 'px',
            left: variableData.x + 'px'
        } );

        variableContainer.innerText = variableData.name;
        variableContainer.draggable = true;
        variableContainer.ondragstart = this.onDragStart.bind( this );
        variableContainer.ondragend = this.dropProperty.bind( this, variableData );
        variableContainer.ondblclick = this.addIdentifier.bind( this, variableData );

        this.canvas.appendChild( variableContainer );

        variableData.identifiers.map( this.renderIdentifier, this );
    }

    /**
     * Create an identifier and connector for the specified property and render it.
     * Add the identifier object to the property data.
     * @param propertyData 
     */
    private addIdentifier( propertyData: PropertyData ) {

        let identifierData: IdentifierData = new IdentifierData( propertyData ),
            coords: any = this.getConnectorBounds( identifierData );

        identifierData.connectorElement = DOMHelper.createConnectorElement( coords );
        propertyData.identifiers.push( identifierData );

        this.renderIdentifier( identifierData );
    }

    /**
     * Create a div element and append it to the canvas, along with the connector
     * @param identifierData
     */
    private renderIdentifier( identifierData: IdentifierData ) {

        let identifierContainer: HTMLDivElement = DOMHelper.createDivElement( {
            position: 'absolute',
            border: '1px solid silver',
            height: '30px',
            width: '100px',
            top: identifierData.y + 'px',
            left: identifierData.x + 'px'
        } )

        identifierContainer.innerText = identifierData.name;
        identifierContainer.draggable = true;
        identifierContainer.ondragstart = this.onDragStart.bind( this );
        identifierContainer.ondragend = this.dropIdentifier.bind( this, identifierData );

        this.canvas.appendChild( identifierContainer );
        this.canvas.appendChild( identifierData.connectorElement );
    }

    /**
     * When dorpping the identifier, updated the connector in addition to updating its position.
     * @param identifierData
     * @param event 
     */
    private dropIdentifier( identifierData: IdentifierData, event: DragEvent ) {

        this.dropElement( identifierData, event );

        this.updateIdentifierConnector( identifierData );
    }

    /**
     * Get identifier bounds and update the connector container and line
     * @param identifierData 
     */
    private updateIdentifierConnector( identifierData: IdentifierData ) {

        let coords: any = this.getConnectorBounds( identifierData );

        DOMHelper.updateConnectorContainer( identifierData.connectorElement, coords );
        DOMHelper.updateConnectorLine( <SVGLineElement> identifierData.connectorElement.firstChild, coords );
    }

    /**
     * Update connectors when dropping an parameter or variable
     * @param propertyData
     * @param event 
     */
    private dropProperty( propertyData: PropertyData, event: DragEvent ) {

        this.dropElement( propertyData, event );

        propertyData.identifiers.map( this.updateIdentifierConnector, this );
    }

    private getConnectorBounds( identifierData: IdentifierData ) {

        return {
            startX: identifierData.parent.x + 150,
            startY: identifierData.parent.y + 10,
            endX: identifierData.x,
            endY: identifierData.y + 15
        };
    }
}