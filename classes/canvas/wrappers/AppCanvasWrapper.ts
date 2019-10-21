class AppCanvasWrapper extends AbstractCanvasWrapper<AppCanvasAPI> {

    public constructor( canvasId: string, domRect: ClientRect ) {

        super( canvasId, AppCanvasAPI );

        try {
            this.initCanvasElement( canvasId, domRect );
            this.initMessages( MessagingManager.getInstance() ); // tight coupling
        } catch ( error ) {
            console.warn( 'Caught error: ' + error.message );
        }
    }

    private initMessages( messenger: SimpleMessenger ) {

        messenger.onMessage( Messages.ADD_CLASS, this.addClass.bind( this ) );
    }

    private addClass( className: string, isAbstract: boolean ) {

        let classDataProxy: ClassDataProxy = ClassDataProxy.getInstance(),
            classData: ClassData = classDataProxy.addClass( className, isAbstract, 100, 100 );

        this.api.addClass( classData );
    }

}