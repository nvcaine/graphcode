abstract class AbstractCanvasAPI {

    protected canvas: HTMLDivElement;

    private canvasOffset: Vector2;
    private mouseOffset: Vector2;

    /**
     * Initialize the canvas offset and dom helper.
     * @param canvas the DOM element to operate on
     */
    public constructor( canvas: HTMLDivElement ) {

        let rect: ClientRect = canvas.getBoundingClientRect();

        this.canvasOffset = new Vector2( rect.left, rect.top )

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

        this.mouseOffset = new Vector2(
            event.pageX - targetRect.left,
            event.pageY - targetRect.top
        );
    }

    /**
     * Update the position of the dragged element on the canvas.
     * @param event the drag event
     * @returns the updated position after the drag
     */
    protected onDragEnd( event: DragEvent ): Vector2 {

        event.preventDefault();

        let div: HTMLDivElement = <HTMLDivElement> event.target,
            result: Vector2 = this.getDropPosition( event, this.canvasOffset, this.mouseOffset );

        div.style.left = result.x + 'px';
        div.style.top = result.y + 'px';

        return result;
    }

    /**
     * Get the global position of a dropped element
     * @param event the drag event to process
     * @param canvasOffset the current canvas offset relative to the page
     * @param mouseOffset the mouse offset relative to the event target's bounds
     * @returns a vector corresponding to the updated position
     */
    private getDropPosition( event: DragEvent, canvasOffset: Vector2, mouseOffset: Vector2 ): Vector2 {

        let result: Vector2 = new Vector2(
            event.pageX - canvasOffset.x - mouseOffset.x,
            event.pageY - canvasOffset.y - mouseOffset.y
        );

        return result;
    }
}