abstract class AbstractCanvasWrapper<T extends AbstractCanvasAPI> {

    protected api: T;

    private canvas: HTMLDivElement;

    protected constructor( canvasId: string, apiType: new ( canvas: HTMLDivElement ) => T ) {

        this.canvas = <HTMLDivElement> DOMHelper.getElementById( canvasId );
        this.api = new apiType( this.canvas );
    }

    public show() {

        this.canvas.hidden = false;
    }

    public hide() {

        this.canvas.hidden = true;
    }

    protected initCanvasElement( id: string, domRect: ClientRect ): HTMLDivElement {

        let canvas: HTMLDivElement = <HTMLDivElement> DOMHelper.getElementById( id );

        canvas.style.width = domRect.width + 'px';
        canvas.style.height = domRect.height + 'px';
        canvas.style.position = 'relative';

        return canvas;
    }
}