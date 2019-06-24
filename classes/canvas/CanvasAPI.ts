/// <reference path="data/ClassData.ts" />
/// <reference path="AbstractCanvasAPI.ts" />

class CanvasAPI extends AbstractCanvasAPI {

    private mouseOffsetData: Vector2;

    /**
     * Create class canvas element and save it in the global collection.
     * @param className 
     * @param x 
     * @param y 
     */
    public addClass( className: string, x: number, y: number ) {

        let classDataProxy: ClassDataProxy = ClassDataProxy.getInstance();
        let classData: ClassData = classDataProxy.addClass( className, x, y );
        let classContainer: HTMLDivElement = this.domHelper.createClassElement( x, y );

        classContainer.innerText = className;
        classContainer.draggable = true;
        classContainer.ondragstart = this.startDragClass.bind( this );
        classContainer.ondragend = this.dropClass.bind( this, classData );
        classContainer.ondblclick = this.openClass.bind( this, classData );

        this.canvas.appendChild( classContainer );
    }

    /**
     * Get the mouse offset relative to the event target's origin
     * @param event 
     */
    private startDragClass( event: DragEvent ) {

        let div: HTMLDivElement = <HTMLDivElement> event.target,
            targetRect: ClientRect = div.getBoundingClientRect();

        // !! magic number
        this.mouseOffsetData = new Vector2( event.pageX - targetRect.left, event.pageY - targetRect.top - 21 );
    }

    /**
     * Update target coordinate on canvas and update the object data
     * @param classData the object passed to the handler when creating a new class object
     * @param event
     */
    private dropClass( classData: ClassData, event: DragEvent ) {

        event.preventDefault();

        let div: HTMLDivElement = <HTMLDivElement> event.target;
        let classDataProxy: ClassDataProxy = ClassDataProxy.getInstance();

        classData.x = ( event.pageX - this.canvasOffset.x - this.mouseOffsetData.x );
        classData.y = ( event.pageY - this.canvasOffset.y - this.mouseOffsetData.y );
        classDataProxy.updateClass( classData );

        div.style.left = classData.x + 'px';
        div.style.top = classData.y + 'px';
    }

    /**
     * Open the double-clicked class
     * @param classData the object passed to the handler when creating a new class object
     * @param event 
     */
    private openClass( classData: ClassData, event: MouseEvent ) {

        let messagingManager: MessagingManager = MessagingManager.getInstance();

        messagingManager.sendMessage( 'open-class', classData );
    }
}