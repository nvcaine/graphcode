/// <reference path='./data/Vector2.ts' />

/// <reference path='./helpers/DOMHelper.ts' />

abstract class AbstractCanvasAPI {

    protected canvas: HTMLDivElement;
    protected domHelper: DOMHelper;

    private canvasOffset: Vector2;
    private mouseOffsetData: Vector2;

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

    /**
     * Save the mouse offset relative to the dragged element's origin.
     * @param event
     */
    protected onDragStart( event: DragEvent ) {

        let div: HTMLDivElement = <HTMLDivElement> event.target,
            targetRect: ClientRect = div.getBoundingClientRect();

        this.mouseOffsetData = new Vector2(
            event.pageX - targetRect.left,
            event.pageY - targetRect.top - 42 // !! magic number
        );

        console.log('mouse offset');
        console.log(this.mouseOffsetData);
    }

    /**
     * Update the position of the dragged element on the canvas.
     * @param event
     */
    protected onDragEnd( event: DragEvent ): Vector2 {

        event.preventDefault();

        let div: HTMLDivElement = <HTMLDivElement> event.target;
        let result: Vector2 = new Vector2(
            event.pageX - this.canvasOffset.x - this.mouseOffsetData.x,
            event.pageY - this.canvasOffset.y - this.mouseOffsetData.y
        );

        console.log('drag end');
        console.log(result);

        div.style.left = result.x + 'px';
        div.style.top = result.y + 'px';

        return result;
    }
}
