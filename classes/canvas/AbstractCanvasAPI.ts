abstract class AbstractCanvasAPI {

    protected canvas: HTMLDivElement;
    protected canvasOffsetX: number;
    protected canvasOffsetY: number;

    public constructor( canvas: HTMLDivElement ) {

        this.canvas = canvas;
        this.canvas.ondragover = function ( event: DragEvent ) {
            event.preventDefault();
        };

        let rect: ClientRect = this.canvas.getBoundingClientRect();
        this.canvasOffsetX = rect.left;
        this.canvasOffsetY = rect.top;
    }
}
