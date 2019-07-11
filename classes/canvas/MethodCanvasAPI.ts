class MethodCanvasAPI extends AbstractCanvasAPI {

    private currentMethod: MethodData;

    public openMethod( methodData: MethodData ) {

        this.currentMethod = methodData;
        this.renderMethod( methodData );
    }

    public closeMethod() {

        this.domHelper.removeAllChildren( this.canvas );
        // save data here to make as less updates as possible
    }

    public addMethodParameter( name: string, x: number, y: number ) {

        let parameterData: PropertyData = this.addParameterToMethodData( name, x, y );

        this.renderMethodParameter( parameterData );
    }

    private renderMethod( methodData: MethodData ) {
        console.log( '### renderMethod' );
    }

    private addParameterToMethodData( name: string, x: number, y: number ): PropertyData {

        let newParameter: PropertyData = this.currentMethod.addParameter( name, x, y );

        return newParameter;
    }

    private renderMethodParameter( parameterData: PropertyData ) {

        let parameterContainer: HTMLDivElement = this.domHelper.createParameterElement( parameterData.x, parameterData.y );

        parameterContainer.innerText = parameterData.name;
        parameterContainer.draggable = true;
        parameterContainer.ondragstart = this.onDragStart.bind( this );
        parameterContainer.ondragend = this.dropElement.bind( this, parameterData );

        this.canvas.appendChild( parameterContainer );
    }

    private dropElement( elementData: PropertyData, event: DragEvent ) {

        let position: Vector2 = this.onDragEnd( event ),
            classDataProxy: ClassDataProxy = ClassDataProxy.getInstance();

        elementData.x = position.x;
        elementData.y = position.y;
        //classDataProxy.updateClass( this.currentClassData );
    }
}