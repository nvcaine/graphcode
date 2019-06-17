/// <reference path="data/ClassData.ts" />

class CanvasAPI {

    private canvas: HTMLDivElement;
    private canvasOffsetX: number;
    private canvasOffsetY: number;
    private targetOffsetX: number;
    private targetOffsetY: number;

    private classes: Array<ClassData> = [];

    public constructor( canvas: HTMLDivElement ) {

        this.canvas = canvas;
        this.canvas.ondragover = function ( event: DragEvent ) {
            event.preventDefault();
        };

        let rect: ClientRect = this.canvas.getBoundingClientRect();
        this.canvasOffsetX = rect.left;
        this.canvasOffsetY = rect.top;
    }

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
        classContainer.ondragstart = this.startDragClass.bind( this );
        classContainer.ondragend = this.dragClass.bind( this, classData );

        classContainer.ondblclick = this.openClass.bind( this, classData );

        this.canvas.appendChild( classContainer );
    }

    private startDragClass( event: DragEvent ) {

        event.stopPropagation();

        let div: HTMLDivElement = <HTMLDivElement> event.target;
        let targetRect: ClientRect = div.getBoundingClientRect();

        this.targetOffsetX = event.pageX - targetRect.left;
        this.targetOffsetY = event.pageY - targetRect.top;

    }

    private dragClass( classData: ClassData, event: DragEvent ) {

        event.stopPropagation();

        let div: HTMLDivElement = <HTMLDivElement> event.target;

        classData.x = ( event.pageX - this.canvasOffsetX - this.targetOffsetX );
        classData.y = ( event.pageY - this.canvasOffsetY - this.targetOffsetY );
        div.style.left = classData.x + 'px';
        div.style.top = classData.y + 'px';
    }

    private openClass( classData: ClassData, event: DragEvent ) {

        let messagingManager: MessagingManager = MessagingManager.getInstance();
        let target: HTMLDivElement = <HTMLDivElement> event.target;

        messagingManager.sendMessage( 'open-class', classData );
    }
}