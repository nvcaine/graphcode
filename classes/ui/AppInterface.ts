class AppInterface extends AbstractInterface {

    protected init( messenger: SimpleMessenger ) {

        this.interfaceContainer = <HTMLDivElement> DOMHelper.getElementById( DOMContainers.APP_INTERFACE );

        /*InterfaceButtons.INTERFACE_ADD_CLASS*/
        this.initInterfaceButton( 'submit-new-class', this.addClassClickHandler, messenger );
        this.initInterfaceButton( 'interface-load-app', this.loadAppDataClickHandler, messenger );
    }

    private addClassClickHandler( messenger: SimpleMessenger ) {

        let newClassName: string = ( <HTMLInputElement> DOMHelper.getElementById( 'new-class-name' ) ).value,
            isAbstractClass: boolean = ( <HTMLInputElement> DOMHelper.getElementById( 'new-class-abstract' ) ).checked;

        if ( newClassName )
            messenger.sendMessage( Messages.ADD_CLASS, newClassName, isAbstractClass );
    }

    private loadAppDataClickHandler( messenger: SimpleMessenger ) {
        messenger.sendMessage( Messages.LOAD_APP );
    }
}