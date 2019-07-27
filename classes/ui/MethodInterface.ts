class MethodInterface extends AbstractInterface {

    protected init( messenger: SimpleMessenger ) {

        this.interfaceContainer = <HTMLDivElement> DOMHelper.getElementById( DOMContainers.METHOD_INTERFACE );

        this.initInterfaceButton( InterfaceButtons.INTERFACE_CLASS_BACK, this.backClassClickHandler, messenger );
        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_METHOD_PARAMETER, this.addMethodParameter, messenger );
        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_METHOD_VARIABLE, this.addMethodVariable, messenger );

        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_METHOD_ASSIGN, this.addMethodAssign, messenger );
        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_METHOD_RETURN, this.addMethodReturn, messenger );
    }

    public renderMethod( methodData: MethodData ) {

        let nameSpan: HTMLSpanElement = <HTMLSpanElement> document.getElementById( 'interface-method-name' );

        nameSpan.innerHTML = methodData.name;
    }

    private backClassClickHandler( messenger: SimpleMessenger ) {

        messenger.sendMessage( Messages.CLOSE_METHOD, undefined );
    }

    private addMethodParameter( messenger: SimpleMessenger ) {

        let parameterName: string = this.validatedPrompt( 'Enter parameter name', 'newParam' );

        if ( parameterName )
            messenger.sendMessage( Messages.ADD_METHOD_PARAMETER, parameterName );
    }

    private addMethodVariable( messenger: SimpleMessenger ) {

        let variableName: string = this.validatedPrompt( 'Enter variable name', 'localVariable' );

        if ( variableName )
            messenger.sendMessage( Messages.ADD_METHOD_VARIABLE, variableName );
    }

    private addMethodAssign( messenger: SimpleMessenger ) {
        console.log( 'add assign' );
    }

    private addMethodReturn( messenger: SimpleMessenger ) {
        console.log( 'add return' );
    }
}