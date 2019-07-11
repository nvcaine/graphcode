/// <reference path="./AbstractCanvasAPI.ts" />

class ClassCanvasAPI extends AbstractCanvasAPI {

    private currentClassData: ClassData;

    public openClass( classData: ClassData ) {

        this.currentClassData = classData;
        this.renderClass( classData );
    }

    /**
     * Clear the class canvas when a class is closed.
     */
    public closeClass() {

        this.domHelper.removeAllChildren( this.canvas );
    }

    /**
     * Add a property to the current class and render it on the canvas.
     * @param propertyName the name of the propertyy
     * @param x canvas coordinate X
     * @param y canvas coordinate Y
     */
    public addProperty( propertyName: string, x: number, y: number ) {

        let propertyData: PropertyData = this.addPropertyToClassData( propertyName, x, y );

        this.renderProperty( propertyData );
    }

    public addMethod( methodName: string, x: number, y: number ) {

        let methodData: MethodData = this.addMethodToClassData( methodName, x, y );

        this.renderMethod( methodData );
    }

    /**
     * Add a property to the current class and update the class record.
     * @param propertyName the name of the property
     * @param x canvas coordinate X
     * @param y canvas coordinate Y
     * @returns a copy of the added property object
     */
    private addPropertyToClassData( propertyName: string, x: number, y: number ): PropertyData {

        let newProperty: PropertyData = this.currentClassData.addProperty( propertyName, x, y );

        ClassDataProxy.getInstance().updateClass( this.currentClassData );

        return newProperty;
    }

    private addMethodToClassData( methodName: string, x: number, y: number ): MethodData {

        let newMethod: MethodData = this.currentClassData.addMethod( methodName, x, y );

        ClassDataProxy.getInstance().updateClass( this.currentClassData );

        return newMethod;
    }
    /**
     * Render class to canvas. Display properties and methods;
     * @param classData the class object
     */
    private renderClass( classData: ClassData ) {

        if ( classData.properties !== undefined )
            classData.properties.map( this.renderProperty, this );

        if ( classData.methods !== undefined )
            classData.methods.map( this.renderMethod, this );
    }

    private renderProperty( propertyData: PropertyData ) {

        let propertyContainer: HTMLDivElement = this.domHelper.createPropertyElement( propertyData.x, propertyData.y );

        propertyContainer.innerText = propertyData.name;
        propertyContainer.draggable = true;
        propertyContainer.ondragstart = this.onDragStart.bind( this );
        propertyContainer.ondragend = this.dropElement.bind( this, propertyData );

        this.canvas.appendChild( propertyContainer );
    }

    private renderMethod( methodData: MethodData ) {

        let methodContainer: HTMLDivElement = this.domHelper.createMethodElement( methodData.x, methodData.y );

        methodContainer.innerText = methodData.name;
        methodContainer.draggable = true;
        methodContainer.ondragstart = this.onDragStart.bind( this );
        methodContainer.ondragend = this.dropElement.bind( this, methodData );
        methodContainer.ondblclick = this.openMethod.bind( this, methodData, this.currentClassData );

        this.canvas.appendChild( methodContainer );
    }

    private dropElement( elementData: AbstractCanvasData, event: DragEvent ) {

        let position: Vector2 = this.onDragEnd( event ),
            classDataProxy: ClassDataProxy = ClassDataProxy.getInstance();

        elementData.x = position.x;
        elementData.y = position.y;
        classDataProxy.updateClass( this.currentClassData );
    }

    private openMethod( methodData: MethodData ) {

        let messagingManager: MessagingManager = MessagingManager.getInstance();

        messagingManager.sendMessage( Messages.OPEN_METHOD, methodData );
    }
}