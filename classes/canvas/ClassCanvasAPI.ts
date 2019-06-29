/// <reference path="AbstractCanvasAPI.ts" />

class ClassCanvasAPI extends AbstractCanvasAPI {

    private currentClassData: ClassData;

    private mouseOffsetData: Vector2;

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

    /**
     * Render class to canvas. Display properties and methods;
     * @param classData the class object
     */
    private renderClass( classData: ClassData ) {

        if ( classData.properties !== undefined )
            classData.properties.map( this.renderProperty, this );
    }

    private renderProperty( propertyData: PropertyData ) {

        let propertyContainer: HTMLDivElement = this.domHelper.createPropertyElement( propertyData.x, propertyData.y );

        propertyContainer.innerText = propertyData.name;
        propertyContainer.draggable = true;
        propertyContainer.ondragstart = this.startDragProperty.bind( this );
        propertyContainer.ondragend = this.dropProperty.bind( this, propertyData );

        this.canvas.appendChild( propertyContainer );
    }

    // !! dupes
    private startDragProperty( event: DragEvent ) {
        let div: HTMLDivElement = <HTMLDivElement> event.target,
            targetRect: ClientRect = div.getBoundingClientRect();

        // !! magic number
        this.mouseOffsetData = new Vector2( event.pageX - targetRect.left, event.pageY - targetRect.top - 21 );
    }

    // !! dupes
    private dropProperty( propertyData: PropertyData, event: DragEvent ) {

        event.preventDefault();

        let div: HTMLDivElement = <HTMLDivElement> event.target;
        let classDataProxy: ClassDataProxy = ClassDataProxy.getInstance();

        propertyData.x = ( event.pageX - this.canvasOffset.x - this.mouseOffsetData.x );
        propertyData.y = ( event.pageY - this.canvasOffset.y - this.mouseOffsetData.y );
        classDataProxy.updateClass( this.currentClassData );

        div.style.left = propertyData.x + 'px';
        div.style.top = propertyData.y + 'px';
    }
}