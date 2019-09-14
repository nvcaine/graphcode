class CanvasWrapper implements DOMWrapper {

    private appCanvas: AppCanvasWrapper;
    private classCanvas: ClassCanvasWrapper;
    private methodCanvas: MethodCanvasWrapper;

    public init( messenger: SimpleMessenger ) {

        let domRect: ClientRect = document.body.getBoundingClientRect();

        this.appCanvas = new AppCanvasWrapper( DOMContainers.APP_CANVAS, domRect );
        this.appCanvas.hide();

        this.classCanvas = new ClassCanvasWrapper( DOMContainers.CLASS_CANVAS, domRect );
        this.classCanvas.hide();

        this.methodCanvas = new MethodCanvasWrapper( DOMContainers.METHOD_CANVAS, domRect );
        this.methodCanvas.hide();

        this.appCanvas.show();

        this.initMessagingContainer( messenger );
    }

    private initMessagingContainer( messenger: SimpleMessenger ) {

        messenger.onMessage( Messages.OPEN_CLASS, this.openClass.bind( this ) );
        messenger.onMessage( Messages.CLOSE_CLASS, this.closeClass.bind( this ) );

        messenger.onMessage( Messages.OPEN_METHOD, this.openMethod.bind( this ) );
        messenger.onMessage( Messages.CLOSE_METHOD, this.closeMethod.bind( this ) );
    }

    private openClass() {

        this.appCanvas.hide()
        this.classCanvas.show();
    }

    private closeClass() {

        this.classCanvas.hide();
        this.appCanvas.show()

        this.save();
    }

    private openMethod() {

        this.classCanvas.hide();
        this.methodCanvas.show();
    }

    private closeMethod() {

        this.methodCanvas.hide();
        this.classCanvas.show();

        this.save();
    }

    private save() {
        // ClassDataProxy.getInstance().updateClass( this.openedClass );
    }
}