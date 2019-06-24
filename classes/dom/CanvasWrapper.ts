/// <reference path="../messaging/MessagingManager.ts" />
/// <reference path="../canvas/CanvasAPI.ts" />
/// <reference path="../canvas/ClassCanvasAPI.ts" />

class CanvasWrapper {

    private appCanvas: HTMLDivElement;
    private classCanvas: HTMLDivElement;

    private appCanvasAPI: CanvasAPI;
    private classCanvasAPI: ClassCanvasAPI;

    public constructor( canvasElementId: string ) {

        this.appCanvas = <HTMLDivElement> document.getElementById( canvasElementId );
        this.classCanvas = <HTMLDivElement> document.getElementById( 'class-canvas' );
        this.classCanvas.hidden = true;

        let domRect: ClientRect = document.body.getBoundingClientRect();

        this.appCanvas.style.width = this.classCanvas.style.width = domRect.width + 'px';
        this.appCanvas.style.height = this.classCanvas.style.height = domRect.height + 'px';

        console.log( '## Canvas initialized: ' + this.appCanvas.style.width + ' ' + this.appCanvas.style.height );

        this.appCanvasAPI = new CanvasAPI( this.appCanvas );
        this.classCanvasAPI = new ClassCanvasAPI( this.classCanvas );

        this.initMessagingContainer();
    }

    private initMessagingContainer() {
        let messagingManager: MessagingManager = MessagingManager.getInstance();

        messagingManager.onMessage( 'add-class', this.addClass.bind( this ) );
        messagingManager.onMessage( 'open-class', this.openClass.bind( this ) );
        messagingManager.onMessage( 'close-class', this.closeClass.bind( this ) );

        messagingManager.onMessage( 'add-class-property', this.addClassProperty.bind( this ) );
    }

    private addClass( className: any ) {

        this.appCanvasAPI.addClass( className, 100, 100 );
    }

    private openClass( classData: ClassData ) {

        this.appCanvas.hidden = true;
        this.classCanvas.hidden = false;

        this.classCanvasAPI.openClass( classData );
    }

    private closeClass( messageData: any ) {

        this.appCanvas.hidden = false;
        this.classCanvas.hidden = true;
        this.classCanvasAPI.closeClass();
    }

    private addClassProperty( propertyName: any ) {
        console.log( 'add class property' );
        this.classCanvasAPI.addProperty( propertyName, 100, 100 );
    }
}