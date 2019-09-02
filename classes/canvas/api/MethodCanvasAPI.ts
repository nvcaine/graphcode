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
        parameterContainer.ondragend = this.dropParameter.bind( this, parameterData );

        parameterContainer.ondblclick = this.addIdentifier.bind( this, parameterData );

        this.canvas.appendChild( parameterContainer );
    }

    private renderVariable( variableData: PropertyData ) {

        let parameterContainer: HTMLDivElement = DOMHelper.createDivElement( {
            position: 'absolute',
            border: '1px solid pink',
            height: '50px',
            width: '150px',
            top: variableData.y + 'px',
            left: variableData.x + 'px'
        } );

        parameterContainer.innerText = variableData.name;
        parameterContainer.draggable = true;
        parameterContainer.ondragstart = this.onDragStart.bind( this );
        parameterContainer.ondragend = this.dropElement.bind( this, variableData );

        this.canvas.appendChild( parameterContainer );
    }

    private dropElement( elementData: AbstractCanvasData, event: DragEvent ) {

        let position: Vector2 = this.onDragEnd( event );

        elementData.x = position.x;
        elementData.y = position.y;
    }

    private addIdentifier( parameterData: PropertyData ) {

        let identifierData: IdentifierData = new IdentifierData( parameterData ),
            identifierContainer: HTMLDivElement = DOMHelper.createDivElement( {
                position: 'absolute',
                border: '1px solid silver',
                height: '30px',
                width: '100px',
                top: identifierData.y + 'px',
                left: identifierData.x + 'px'
            } ),
            connectorContainer: SVGElement = this.createIdentifierParentConnector( identifierData );

        identifierContainer.innerText = identifierData.name;
        identifierContainer.draggable = true;
        identifierContainer.ondragstart = this.onDragStart.bind( this );
        identifierContainer.ondragend = this.dropIdentifier.bind( this, identifierData, connectorContainer );

        identifierData.connectorElement = connectorContainer;
        parameterData.identifiers.push( identifierData );

        this.canvas.appendChild( identifierContainer );
        this.canvas.appendChild( connectorContainer );
    }

    private dropIdentifier( identifierData: IdentifierData, connectorElement: SVGElement, event: DragEvent ) {

        this.dropElement( identifierData, event );

        this.updateConnector( connectorElement, identifierData );
    }

    private createIdentifierParentConnector( identifierData: IdentifierData ): SVGElement {

        // !! correctly calculate connector bounds based on parameter-identifier relative position
        let connectorContainer: SVGElement = DOMHelper.createIdentifierConnector( identifierData.parent.x + 150, identifierData.parent.y + 10, identifierData.x, identifierData.y + 15 );

        return connectorContainer;
    }

    private updateConnector( connectorElement: SVGElement, identifierData: IdentifierData ) {

        let line: SVGLineElement = DOMHelper.createLineElement( identifierData.parent.x + 150, identifierData.parent.y + 10, identifierData.x, identifierData.y + 15 );

        connectorElement.removeChild( connectorElement.firstChild );
        DOMHelper.updateConnectorContainer( connectorElement, identifierData.parent.x + 150, identifierData.parent.y + 10, identifierData.x, identifierData.y + 15 );
        connectorElement.appendChild( line );
    }

    private dropParameter( parameterData: PropertyData, event: DragEvent ) {

        this.dropElement( parameterData, event );

        parameterData.identifiers.map( ( identifierData: IdentifierData ) => {

            this.updateConnector( identifierData.connectorElement, identifierData );
        } );
    }
}