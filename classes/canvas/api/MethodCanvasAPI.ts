class MethodCanvasAPI extends AbstractCanvasAPI {

    public openMethod( methodData: MethodData ) {

        this.renderMethod( methodData );
    }

    public closeMethod() {

        DOMHelper.removeAllChildren( this.canvas );
    }

    public addParameter( parameterData: PropertyData ) {

        this.renderParameter( parameterData );
    }

    public addVariable( variableData: PropertyData ) {

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
    private renderParameter( parameterData: PropertyData ) {

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
    private renderVariable( variableData: PropertyData ) {

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

    private dropElement( elementData: AbstractCanvasData, event: DragEvent ) {

        let position: Vector2 = this.onDragEnd( event );

        elementData.x = position.x;
        elementData.y = position.y;
    }

    /**
     * Create an identifier and connector for the specified property and render it.
     * Add the identifier object to the property data.
     * @param propertyData 
     */
    private addIdentifier( propertyData: PropertyData ) {

        let identifierData: IdentifierData = new IdentifierData( propertyData );

        identifierData.connectorElement = this.createIdentifierParentConnector( identifierData );
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

    private dropIdentifier( identifierData: IdentifierData, event: DragEvent ) {

        this.dropElement( identifierData, event );

        this.updateIdentifierConnector( identifierData );
    }

    private createIdentifierParentConnector( identifierData: IdentifierData ): SVGElement {

        // !! correctly calculate connector bounds based on parameter-identifier relative position

        return DOMHelper.createConnectorElement( identifierData.parent.x + 150, identifierData.parent.y + 10, identifierData.x, identifierData.y + 15 );
    }

    private updateIdentifierConnector( identifierData: IdentifierData ) {

        let line: SVGLineElement = DOMHelper.createLineElement( identifierData.parent.x + 150, identifierData.parent.y + 10, identifierData.x, identifierData.y + 15 ),
            connectorElement: SVGElement = identifierData.connectorElement;

        connectorElement.removeChild( connectorElement.firstChild );
        DOMHelper.updateConnectorContainer( connectorElement, identifierData.parent.x + 150, identifierData.parent.y + 10, identifierData.x, identifierData.y + 15 );
        connectorElement.appendChild( line );
    }

    private dropProperty( parameterData: PropertyData, event: DragEvent ) {

        this.dropElement( parameterData, event );

        parameterData.identifiers.map( this.updateIdentifierConnector, this );
    }
}