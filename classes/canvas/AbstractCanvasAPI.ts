/// <reference path='../dom/DOMHelper.ts' />

abstract class AbstractCanvasAPI {

    protected canvas: HTMLDivElement;
    protected canvasOffsetX: number;
    protected canvasOffsetY: number;

    protected domHelper: DOMHelper;

    public constructor( canvas: HTMLDivElement ) {

        this.canvas = canvas;
        this.canvas.ondragover = function ( event: DragEvent ) {
            event.preventDefault();
        };

        let rect: ClientRect = this.canvas.getBoundingClientRect();
        this.canvasOffsetX = rect.left;
        this.canvasOffsetY = rect.top;

        this.domHelper = new DOMHelper();
    }
}
