class AppInterface extends AbstractInterface {

    protected init( messenger: SimpleMessenger ) {

        this.interfaceContainer = <HTMLDivElement> DOMHelper.getElementById( DOMContainers.APP_INTERFACE );

        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_CLASS, this.addClassClickHandler, messenger );
    }

    private addClassClickHandler( messenger: SimpleMessenger ) {

        let newClassName: string = this.validatedPrompt( 'Enter class name', 'NewClass' );

        if ( newClassName )
            messenger.sendMessage( Messages.ADD_CLASS, newClassName );
    }
}