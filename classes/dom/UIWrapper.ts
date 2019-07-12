class UIWrapper implements DOMWrapper {

    private appInterface: HTMLDivElement;
    private classInterface: HTMLDivElement;
    private methodInterface: HTMLDivElement;

    private domHelper: DOMHelper;

    public init( messenger: SimpleMessenger ) {

        this.domHelper = new DOMHelper();

        try {
            this.initInterfaces( messenger );
            this.initMessages( messenger );
        } catch ( error ) {
            console.error( error.message );
        }
    }

    private initInterfaces( messenger: SimpleMessenger ) {

        this.initAppInterface( messenger );
        this.initClassInterface( messenger );
        this.initMethodInterface( messenger );

        console.log( '## Interface initalized' );
    }

    private initMessages( messenger: SimpleMessenger ) {

        messenger.onMessage( Messages.OPEN_CLASS, this.openClass.bind( this ) );
        messenger.onMessage( Messages.OPEN_METHOD, this.openMethod.bind( this ) );
    }

    private initAppInterface( messenger: SimpleMessenger ) {

        this.appInterface = <HTMLDivElement> this.domHelper.getElementById( DOMContainers.APP_INTERFACE );

        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_CLASS, this.addClassClickHandler, messenger );
        this.initInterfaceButton( InterfaceButtons.INTERFACE_BACK, this.backClickHandler, messenger );
    }

    private initClassInterface( messenger: SimpleMessenger ) {

        this.classInterface = <HTMLDivElement> this.domHelper.getElementById( DOMContainers.CLASS_INTERFACE );
        this.classInterface.hidden = true;

        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_CLASS_PROPERTY, this.addPropertyClickHandler, messenger );
        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_CLASS_METHOD, this.addMethodClickHandler, messenger );
    }

    private initMethodInterface( messenger: SimpleMessenger ) {

        this.methodInterface = <HTMLDivElement> this.domHelper.getElementById( DOMContainers.METHOD_INTERFACE );
        this.methodInterface.hidden = true;

        this.initInterfaceButton( InterfaceButtons.INTERFACE_CLASS_BACK, this.backClassClickHandler, messenger );
        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_METHOD_PARAMETER, this.addMethodParameter, messenger );
        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_METHOD_VARIABLE, this.addMethodVariable, messenger );

    }

    /**
     * Get an element by its id and attach a click handler
     * @param buttonId the id of the DOM element corresponding to the button
     * @param handler the click handler
     * @returns a refference to the button
     * @throws 
     */
    private initInterfaceButton( buttonId: string, handler: ( m: SimpleMessenger ) => void, m: SimpleMessenger ): HTMLButtonElement {

        let buttonElement: HTMLButtonElement = <HTMLButtonElement> this.domHelper.getElementById( buttonId );

        buttonElement.onclick = handler.bind( this, m );

        return buttonElement;
    }

    /**
     * Allow user to cancel a prompt and optionally warn if empty value entered
     * @param message The prompt message
     * @param defaultValue
     * @param warnIfEmpty if the user enters an empty value, display a warning if set to true
     */
    private validatedPrompt( message: string, defaultValue: string, warnIfEmpty: boolean = true ): string {

        let result: string = prompt( message, defaultValue );

        if ( result === null ) {
            return null; // user cancelled
        }

        result = result.replace( /\s+/g, '' );

        if ( result.length === 0 && warnIfEmpty ) {
            console.warn( 'Cannot add a class without a name.' );
            return null;
        }

        return result;
    }

    private addClassClickHandler( messenger: SimpleMessenger ) {

        let newClassName: string = this.validatedPrompt( 'Enter class name', 'NewClass' );

        if ( newClassName )
            messenger.sendMessage( Messages.ADD_CLASS, newClassName );
    }

    // !! remove class data reference
    private openClass( messageData: ClassData ) {

        this.appInterface.hidden = true;
        this.classInterface.hidden = false;
        this.renderClass( messageData );
    }

    // !! handle in a different manner
    private renderClass( classData: ClassData ) {

        let nameSpan: HTMLSpanElement = <HTMLSpanElement> document.getElementById( 'interface-class-name' );

        nameSpan.innerHTML = classData.name;
    }

    private backClickHandler( messenger: SimpleMessenger ) {

        messenger.sendMessage( Messages.CLOSE_CLASS, undefined );
        this.appInterface.hidden = false;
        this.classInterface.hidden = true;
    }

    private addPropertyClickHandler( messenger: SimpleMessenger ) {

        let propertyName: string = this.validatedPrompt( 'Enter property name', 'newProperty' );

        if ( propertyName )
            messenger.sendMessage( Messages.ADD_CLASS_PROPERTY, propertyName );
    }

    private addMethodClickHandler( messenger: SimpleMessenger ) {

        let methodName: string = this.validatedPrompt( 'Enter method name', 'newMethod' );

        if ( methodName )
            messenger.sendMessage( Messages.ADD_CLASS_METHOD, methodName );
    }

    private openMethod( methodData: MethodData ) {

        this.classInterface.hidden = true;
        this.methodInterface.hidden = false;
        this.renderMethod( methodData );
    }

    private backClassClickHandler( messenger: SimpleMessenger ) {

        messenger.sendMessage( Messages.CLOSE_METHOD, undefined );

        this.methodInterface.hidden = true;
        this.classInterface.hidden = false;
    }

    private renderMethod( methodData: MethodData ) {

        let nameSpan: HTMLSpanElement = <HTMLSpanElement> document.getElementById( 'interface-method-name' );

        nameSpan.innerHTML = methodData.name;
    }

    private addMethodParameter( messenger: SimpleMessenger ) {

        let parameterName: string = this.validatedPrompt( 'Enter parameter name', 'newParam' );

        if ( parameterName )
            messenger.sendMessage( Messages.ADD_METHOD_PARAMETER, parameterName );
    }

    private addMethodVariable( messenger: SimpleMessenger ) {

        let variableName: string = this.validatedPrompt( 'Enter parameter name', 'newParam' );

        if ( variableName )
            messenger.sendMessage( Messages.ADD_METHOD_VARIABLE, variableName );
    }
}