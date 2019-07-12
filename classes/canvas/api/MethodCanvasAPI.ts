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

    private renderMethod( methodData: MethodData ) {

        if ( methodData.parameters !== undefined )
            methodData.parameters.map( this.renderParameter, this );
    }

    private renderParameter( parameterData: PropertyData ) {

        let parameterContainer: HTMLDivElement = this.domHelper.createParameterElement( parameterData.x, parameterData.y );

        parameterContainer.innerText = parameterData.name;
        parameterContainer.draggable = true;
        parameterContainer.ondragstart = this.onDragStart.bind( this );
        parameterContainer.ondragend = this.dropElement.bind( this, parameterData );

        this.canvas.appendChild( parameterContainer );
    }

    private dropElement( elementData: PropertyData, event: DragEvent ) {

        let position: Vector2 = this.onDragEnd( event );

        elementData.x = position.x;
        elementData.y = position.y;
    }
}