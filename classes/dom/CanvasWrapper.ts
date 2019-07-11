/// <reference path="./AbstractWrapper.ts" />

/// <reference path="./consts/DOMContainers.ts" />

/// <reference path="../canvas/AppCanvasAPI.ts" />
/// <reference path="../canvas/ClassCanvasAPI.ts" />
/// <reference path="../canvas/MethodCanvasAPI.ts" />

/// <reference path="../messaging/MessagingManager.ts" />
/// <reference path="../messaging/consts/Messages.ts" />

class CanvasWrapper extends AbstractWrapper implements DOMWrapper {

    private appCanvas: HTMLDivElement;
    private classCanvas: HTMLDivElement;
    private methodCanvas: HTMLDivElement;

    private appCanvasAPI: AppCanvasAPI;
    private classCanvasAPI: ClassCanvasAPI;
    private methodCanvasAPI: MethodCanvasAPI;

    public init( messenger: SimpleMessenger ) {

        try {
            this.initCanvases( messenger );
        } catch ( error ) {
            console.error( error.message );
        }
    }

    private initCanvases( messenger: SimpleMessenger ) {

        this.initDOMElements();
        this.initAPIs();
        this.initMessagingContainer( messenger );

        console.log( '## Canvas wrapper initialized' );
    }

    private initDOMElements() {

        let domRect: ClientRect = document.body.getBoundingClientRect();

        this.appCanvas = this.initCanvasElement( DOMContainers.APP_CANVAS, domRect );
        this.classCanvas = this.initCanvasElement( DOMContainers.CLASS_CANVAS, domRect );
        this.methodCanvas = this.initCanvasElement( DOMContainers.METHOD_CANVAS, domRect );

        console.log( '## Canvases initialized: ' + this.appCanvas.style.width + ' ' + this.appCanvas.style.height );

    }

    /**
     * Get an HTML element and resize it to fit the specified dimentions
     * @param id the id of the HTML canvas element
     * @param domRect the dimentions used to update the canvas
     * @returns the initialized element
     */
    private initCanvasElement( id: string, domRect: ClientRect ): HTMLDivElement {

        let canvas: HTMLDivElement = <HTMLDivElement> this.getElementById( id );

        canvas.style.width = domRect.width + 'px';
        canvas.style.height = domRect.height + 'px';
        canvas.style.position = 'relative';

        return canvas;
    }

    private initAPIs() {

        this.appCanvasAPI = new AppCanvasAPI( this.appCanvas );
        this.appCanvas.hidden = true; // hide the app canvas in order to correctly initalize the class canvas

        this.classCanvasAPI = new ClassCanvasAPI( this.classCanvas ); // correctly positioned for getting the offsets
        this.classCanvas.hidden = true;

        this.methodCanvasAPI = new MethodCanvasAPI( this.methodCanvas );
        this.methodCanvas.hidden = true;

        this.appCanvas.hidden = false;
    }

    private initMessagingContainer( messenger: SimpleMessenger ) {

        messenger.onMessage( Messages.ADD_CLASS, this.addClass.bind( this ) );
        messenger.onMessage( Messages.OPEN_CLASS, this.openClass.bind( this ) );
        messenger.onMessage( Messages.CLOSE_CLASS, this.closeClass.bind( this ) );

        messenger.onMessage( Messages.ADD_CLASS_PROPERTY, this.addClassProperty.bind( this ) );
        messenger.onMessage( Messages.ADD_CLASS_METHOD, this.addClassMethod.bind( this ) );

        messenger.onMessage( Messages.OPEN_METHOD, this.openMethod.bind( this ) );
        messenger.onMessage( Messages.CLOSE_METHOD, this.closeMethod.bind( this ) );
        messenger.onMessage( Messages.ADD_METHOD_PARAMETER, this.addMethodParameter.bind( this ) );
        messenger.onMessage( Messages.ADD_METHOD_VARIABLE, this.addMethodVariable.bind( this ) );
    }

    private addClass( className: any ) {

        this.appCanvasAPI.addClass( className, 100, 100 );
    }

    private openClass( classData: ClassData ) {

        this.appCanvas.hidden = true;
        this.classCanvas.hidden = false;

        this.classCanvasAPI.openClass( classData );
    }

    private closeClass() {

        this.appCanvas.hidden = false;
        this.classCanvas.hidden = true;
        this.classCanvasAPI.closeClass();
    }

    private addClassProperty( propertyName: any ) {

        this.classCanvasAPI.addProperty( propertyName, 100, 100 );
    }

    private addClassMethod( methodName: any ) {

        this.classCanvasAPI.addMethod( methodName, 100, 100 );
    }

    private openMethod( methodData: MethodData ) {

        this.classCanvas.hidden = true;
        this.methodCanvas.hidden = false;

        this.methodCanvasAPI.openMethod( methodData );
    }

    private closeMethod() {

        this.methodCanvas.hidden = true;
        this.classCanvas.hidden = false;

        this.methodCanvasAPI.closeMethod();
    }

    private addMethodParameter( parameterName: any ) {

        this.methodCanvasAPI.addMethodParameter( parameterName, 100, 100 );
    }

    private addMethodVariable( variableName: any ) {

        //this.methodCanvasAPI.addMethodVariable( variableName, 100, 100 );
    }
}