class UIWrapper implements DOMWrapper {

    private appInterface: AppInterface;
    private classInterface: ClassInterface;
    private methodInterface: MethodInterface;

    public init( messenger: SimpleMessenger ) {

        try {
            this.initInterfaces( messenger );
            this.initMessages( messenger );
        } catch ( error ) {
            console.error( error.message );
        }
    }

    private initInterfaces( messenger: SimpleMessenger ) {

        this.appInterface = new AppInterface( messenger );
        this.classInterface = new ClassInterface( messenger );
        this.methodInterface = new MethodInterface( messenger );

        this.classInterface.hide();
        this.methodInterface.hide();

        console.log( '## Interface initalized' );
    }

    private initMessages( messenger: SimpleMessenger ) {

        messenger.onMessage( Messages.OPEN_CLASS, this.openClass.bind( this ) );
        messenger.onMessage( Messages.OPEN_METHOD, this.openMethod.bind( this ) );
        messenger.onMessage( Messages.CLOSE_CLASS, this.closeClass.bind( this ) );
        messenger.onMessage( Messages.CLOSE_METHOD, this.closeMethod.bind( this ) );
    }

    private openClass( messageData: ClassData ) {

        this.appInterface.hide();
        this.classInterface.show();
        this.classInterface.renderClass( messageData );
    }

    private closeClass( messenger: SimpleMessenger ) {

        this.classInterface.hide();
        this.appInterface.show();
    }

    private openMethod( methodData: MethodData ) {

        this.classInterface.hide();
        this.methodInterface.show();
        this.methodInterface.renderMethod( methodData );
    }

    private closeMethod( messenger: SimpleMessenger ) {

        this.methodInterface.hide();
        this.classInterface.show();
    }
}