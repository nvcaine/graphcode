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

        classContainer.innerText = classData.name;
        classContainer.draggable = true;
        classContainer.ondragstart = this.onDragStart.bind( this );
        classContainer.ondragend = this.dropClass.bind( this, classData );
        classContainer.ondblclick = this.openClass.bind( this, classData );

        this.canvas.appendChild( classContainer );
    }

    /**
     * Update target coordinate on canvas and update the object data
     * @param classData the object passed to the handler when creating a new class object
     * @param event
     */
    private dropClass( classData: ClassData, event: DragEvent ) {

        let position: Vector2 = super.onDragEnd( event );

        classData.x = position.x;
        classData.y = position.y;
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
}