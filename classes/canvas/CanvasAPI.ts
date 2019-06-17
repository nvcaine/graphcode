/// <reference path="data/ClassData.ts" />
/// <reference path="AbstractCanvasAPI.ts" />

class CanvasAPI extends AbstractCanvasAPI {

    private classes: Array<ClassData> = [];

    /**
     * Create a div element and append it to the canvas
     * @param className 
     * @param x 
     * @param y 
     */
    public addClass( className: string, x: number, y: number ) {

        let classData: ClassData = new ClassData( className, x, y );

        this.classes.push( classData );

        let classContainer: HTMLDivElement = document.createElement( 'div' );

        classContainer.style.top = y + 'px';
        classContainer.style.left = x + 'px';
        classContainer.style.position = 'absolute';
        classContainer.style.border = '1px solid black';
        classContainer.style.height = '50px';
        classContainer.style.width = '150px';
        classContainer.innerText = className;

        // maybe wrap this behaviour
        classContainer.draggable = true;
        classContainer.ondragstart = this.startDragClass.bind( this, classData );
        classContainer.ondragend = this.dragClass.bind( this, classData );

        classContainer.ondblclick = this.openClass.bind( this, classData );

        this.canvas.appendChild( classContainer );
    }

    private startDragClass( classData: ClassData, event: DragEvent ) {

        event.stopPropagation();

        let div: HTMLDivElement = <HTMLDivElement> event.target;
        let targetRect: ClientRect = div.getBoundingClientRect();

        classData.mouseOffsetX = event.pageX - targetRect.left;
        classData.mouseOffsetY = event.pageY - targetRect.top - 21;
    }

    private dragClass( classData: ClassData, event: DragEvent ) {

        event.stopPropagation();

        let div: HTMLDivElement = <HTMLDivElement> event.target;

        classData.x = ( event.pageX - this.canvasOffsetX - classData.mouseOffsetX );
        classData.y = ( event.pageY - this.canvasOffsetY - classData.mouseOffsetY );
        div.style.left = classData.x + 'px';
        div.style.top = classData.y + 'px';
    }

    private openClass( classData: ClassData, event: DragEvent ) {

        let messagingManager: MessagingManager = MessagingManager.getInstance();

        messagingManager.sendMessage( 'open-class', classData );
    }
}