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

        // !! remove DOMHelper reference everywhere
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
        parameterContainer.ondragend = this.dropElement.bind( this, parameterData );

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
            } );

        identifierContainer.innerText = identifierData.name;
        identifierContainer.draggable = true;
        identifierContainer.ondragstart = this.onDragStart.bind( this );
        identifierContainer.ondragend = this.dropIdentifier.bind( this, identifierData );

        this.canvas.appendChild( identifierContainer );

        this.addIdentifierParentConnector( identifierData, parameterData );
    }

    private dropIdentifier( identifierData: IdentifierData, event: DragEvent ) {

        this.dropElement( identifierData, event );
    }

    private addIdentifierParentConnector( identifierData: IdentifierData, parameterData: PropertyData ) {

        let connectorContainer: SVGElement = DOMHelper.createIdentifierConnector( parameterData.x + 150, parameterData.y + 10, identifierData.x, identifierData.y + 15 );

        this.canvas.appendChild( connectorContainer );
    }
}