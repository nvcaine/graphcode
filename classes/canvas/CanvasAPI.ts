class CanvasAPI {

    private canvas: HTMLDivElement;
    private canvasOffsetX: number;
    private canvasOffsetY: number;
    private targetOffsetX: number;
    private targetOffsetY: number;

    public constructor( canvas: HTMLDivElement ) {

        this.canvas = canvas;
        this.canvas.ondragover = function ( event: DragEvent ) {
            event.preventDefault();
        };

        let rect: ClientRect = this.canvas.getBoundingClientRect();
        this.canvasOffsetX = rect.left;
        this.canvasOffsetY = rect.top;
    }

    public drawClass( className: string, x: number, y: number ) {

        let classContainer: HTMLDivElement = document.createElement( 'div' );

        classContainer.style.top = y + 'px';
        classContainer.style.left = x + 'px';
        classContainer.style.position = 'absolute';
        classContainer.style.border = '1px solid black';
        classContainer.innerText = className;

        classContainer.draggable = true;
        classContainer.ondragstart = this.startDragClass.bind( this );
        classContainer.ondragend = this.dragClass.bind( this );

        this.canvas.appendChild( classContainer );
    }

    private startDragClass( event: DragEvent ) {
        event.stopPropagation();
        let targetRect: ClientRect = ( <HTMLDivElement> event.target ).getBoundingClientRect();
        this.targetOffsetX = event.pageX - targetRect.left;
        this.targetOffsetY = event.pageY - targetRect.top;
    }

    private dragClass( event: DragEvent ) {

        event.stopPropagation();
        let div: HTMLDivElement = <HTMLDivElement> event.target;

        div.style.left = ( event.pageX - this.canvasOffsetX - this.targetOffsetX ) + 'px'
        div.style.top = ( event.pageY - this.canvasOffsetY - this.targetOffsetY ) + 'px';
    }
}