class MethodCanvasAPI extends AbstractCanvasAPI {

    public openMethod( methodData: MethodData ) {

        this.renderMethod( methodData );
    }

    public closeMethod() {

        this.domHelper.removeAllChildren( this.canvas );
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

        let parameterContainer: HTMLDivElement = this.domHelper.createDivElement( {
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

        this.canvas.appendChild( parameterContainer );
    }

    private renderVariable( variableData: PropertyData ) {

        let parameterContainer: HTMLDivElement = this.domHelper.createDivElement( {
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

    private dropElement( elementData: PropertyData, event: DragEvent ) {

        let position: Vector2 = this.onDragEnd( event );

        elementData.x = position.x;
        elementData.y = position.y;
    }
}