abstract class AbstractInterface {

    protected interfaceContainer: HTMLDivElement;

    public constructor( messenger: SimpleMessenger ) {

        this.init( messenger );
    }

    protected init( messenger: SimpleMessenger ) { }

    public show() {

        this.interfaceContainer.hidden = false;
    }

    public hide() {

        this.interfaceContainer.hidden = true;
    }

    /**
     * Allow user to cancel a prompt and optionally warn if empty value entered
     * @param message The prompt message
     * @param defaultValue
     * @param warnIfEmpty if the user enters an empty value, display a warning if set to true
     */
    protected validatedPrompt( message: string, defaultValue: string, warnIfEmpty: boolean = true ): string {

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

    /**
     * Get an element by its id and attach a click handler
     * @param buttonId the id of the DOM element corresponding to the button
     * @param handler the click handler
     * @returns a refference to the button
     * @throws 
     */
    protected initInterfaceButton( buttonId: string, handler: ( m: SimpleMessenger ) => void, m: SimpleMessenger ): HTMLButtonElement {

        let buttonElement: HTMLButtonElement = <HTMLButtonElement> DOMHelper.getElementById( buttonId );

        buttonElement.onclick = handler.bind( this, m );

        return buttonElement;
    }
}