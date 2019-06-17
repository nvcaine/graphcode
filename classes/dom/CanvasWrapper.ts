/// <reference path="../messaging/MessagingManager.ts" />
/// <reference path="../canvas/CanvasAPI.ts" />

class CanvasWrapper {

    private canvas:HTMLDivElement;

    public constructor( canvasElementId: string ) {

        this.canvas = <HTMLDivElement> document.getElementById( canvasElementId );

        let domRect: ClientRect = document.body.getBoundingClientRect();

        this.canvas.style.width = domRect.width + 'px';
        this.canvas.style.height = domRect.height + 'px';

        console.log( '## Canvas initialized: ' + this.canvas.style.width + ' ' + this.canvas.style.height );

        this.initMessagingContainer();
    }

    private initMessagingContainer() {
        let messagingManager: MessagingManager = MessagingManager.getInstance();

        messagingManager.onMessage( 'add-class', this.addClass.bind( this ) );
    }

    private addClass( messageData: any ) {

        console.log( 'received:' + messageData );

        let canvasAPI: CanvasAPI = new CanvasAPI( this.canvas );

        canvasAPI.drawClass( messageData, 100, 100 );
    }
}