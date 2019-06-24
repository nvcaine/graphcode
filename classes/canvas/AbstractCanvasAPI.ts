/// <reference path='../dom/DOMHelper.ts' />
/// <reference path='data/Vector2.ts' />

abstract class AbstractCanvasAPI {

    protected canvas: HTMLDivElement;
    protected canvasOffset: Vector2;
    protected domHelper: DOMHelper;

    /**
     * Initialize the canvas offset and dom helper.
     * @param canvas the DOM element to operate on
     */
    public constructor( canvas: HTMLDivElement ) {

        let rect: ClientRect = canvas.getBoundingClientRect();

        this.canvasOffset = new Vector2( rect.left, rect.top )
        this.domHelper = new DOMHelper();

        this.canvas = canvas;
        this.canvas.ondragover = function ( event: DragEvent ) {
            event.preventDefault();
        };
    }
}
