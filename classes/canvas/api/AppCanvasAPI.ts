class AppCanvasAPI extends AbstractCanvasAPI {

    /**
     * Create class canvas element and save it in the global collection.
     * @param className 
     * @param x 
     * @param y 
     */
    public addClass( classData: ClassData ) {

        this.renderClass( classData );
    }

    private renderClass( classData: ClassData ) {

        let classContainer: HTMLDivElement = DOMHelper.createDivElement( {
            position: 'absolute',
            border: '1px solid black',
            height: '50px',
            width: '150px',
            top: classData.y + 'px',
            left: classData.x + 'px'
        } );

        classContainer.innerText = this.getClassName( classData );
        classContainer.draggable = true;
        classContainer.ondragstart = this.onDragStart.bind( this );
        classContainer.ondragend = this.dropElement.bind( this, classData );
        classContainer.ondblclick = this.openClass.bind( this, classData );

        this.canvas.appendChild( classContainer );
    }

    /**
     * Open the double-clicked class
     * @param classData the object passed to the handler when creating a new class object
     * @param event 
     */
    private openClass( classData: ClassData, event: MouseEvent ) {

        let messagingManager: MessagingManager = MessagingManager.getInstance();

        messagingManager.sendMessage( Messages.OPEN_CLASS, classData );
    }

    private getClassName( classData: ClassData ): string {

        let result: string = classData.name;

        if ( classData.isAbstract )
            result = '[Abstract]' + classData.name;

        return result;
    }
}