/// <reference path="./AbstractWrapper.ts" />

/// <reference path="./consts/DOMContainers.ts" />

/// <reference path="../canvas/CanvasAPI.ts" />
/// <reference path="../canvas/ClassCanvasAPI.ts" />

/// <reference path="../messaging/MessagingManager.ts" />
/// <reference path="../messaging/consts/Messages.ts" />

class CanvasWrapper extends AbstractWrapper implements DOMWrapper {

    private appCanvas: HTMLDivElement;
    private classCanvas: HTMLDivElement;

    private appCanvasAPI: CanvasAPI;
    private classCanvasAPI: ClassCanvasAPI;

    public init( messenger: SimpleMessenger ) {

        try {
            this.initCanvas( messenger );
        } catch ( error ) {
            console.error( error.message );
        }
    }

    private initCanvas( messenger: SimpleMessenger ) {

        this.initDOMElements();
        this.initAPIs();
        this.initMessagingContainer( messenger );

        console.log( '## Canvas wrapper initialized' );
    }

    private initDOMElements() {

        this.appCanvas = <HTMLDivElement> this.getElementById( DOMContainers.APP_CANVAS );
        this.classCanvas = <HTMLDivElement> this.getElementById( DOMContainers.CLASS_CANVAS );

        let domRect: ClientRect = document.body.getBoundingClientRect();

        this.appCanvas.style.width = this.classCanvas.style.width = domRect.width + 'px';
        this.appCanvas.style.height = this.classCanvas.style.height = domRect.height + 'px';
        this.appCanvas.style.position = this.classCanvas.style.position = 'relative;'

        console.log( '## Canvas initialized: ' + this.appCanvas.style.width + ' ' + this.appCanvas.style.height );
    }

    private initAPIs() {

        this.appCanvasAPI = new CanvasAPI( this.appCanvas );
        this.appCanvas.hidden = true; // hide the app canvas in order to correctly initalize the class canvas

        this.classCanvasAPI = new ClassCanvasAPI( this.classCanvas ); // correctly positioned for getting the offsets
        this.classCanvas.hidden = true;
        this.appCanvas.hidden = false;
    }

    private initMessagingContainer( messenger: SimpleMessenger ) {

        messenger.onMessage( Messages.ADD_CLASS, this.addClass.bind( this ) );
        messenger.onMessage( Messages.OPEN_CLASS, this.openClass.bind( this ) );
        messenger.onMessage( Messages.CLOSE_CLASS, this.closeClass.bind( this ) );

        messenger.onMessage( Messages.ADD_CLASS_PROPERTY, this.addClassProperty.bind( this ) );
        messenger.onMessage( Messages.ADD_CLASS_METHOD, this.addClassMethod.bind( this ) );
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
}