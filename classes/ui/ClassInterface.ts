class ClassInterface extends AbstractInterface {

    protected init( messenger: SimpleMessenger ) {

        this.interfaceContainer = <HTMLDivElement> DOMHelper.getElementById( DOMContainers.CLASS_INTERFACE );

        this.initInterfaceButton( InterfaceButtons.INTERFACE_BACK, this.backClickHandler, messenger );

        // this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_CLASS_PROPERTY, this.addPropertyClickHandler, messenger );
        this.initInterfaceButton( InterfaceButtons.INTERFACE_ADD_CLASS_METHOD, this.addMethodClickHandler, messenger );

        this.initInterfaceButton( 'submit-new-property', this.addPropertyClickHandler, messenger );
    }

    public renderClass( classData: ClassData ) {

        let nameSpan: HTMLSpanElement = <HTMLSpanElement> document.getElementById( 'interface-class-name' );

        nameSpan.innerHTML = classData.name;
    }

    private backClickHandler( messenger: SimpleMessenger ) {

        messenger.sendMessage( Messages.CLOSE_CLASS, undefined );
    }

    private addPropertyClickHandler( messenger: SimpleMessenger ) {

        // let propertyName: string = this.validatedPrompt( 'Enter property name', 'newProperty' );
        let propertyName: string = ( <HTMLInputElement> DOMHelper.getElementById( 'new-property-name' ) ).value,
            propertyType: string = ( <HTMLInputElement> DOMHelper.getElementById( 'new-property-type' ) ).value,
            defaultValue: string = ( <HTMLInputElement> DOMHelper.getElementById( 'new-property-value' ) ).value,
            accessLevel: AccessLevel = this.getPropertyAccessLevel(),
            isStatic: boolean = ( <HTMLInputElement> DOMHelper.getElementById( 'new-property-static' ) ).checked;

        if ( propertyName )
            messenger.sendMessage( Messages.ADD_CLASS_PROPERTY, propertyName, propertyType, defaultValue, accessLevel, isStatic );
    }

    private addMethodClickHandler( messenger: SimpleMessenger ) {

        let methodName: string = this.validatedPrompt( 'Enter method name', 'newMethod' );

        if ( methodName )
            messenger.sendMessage( Messages.ADD_CLASS_METHOD, methodName );
    }

    private getPropertyAccessLevel(): AccessLevel {

        let result: AccessLevel = AccessLevel.PRIVATE;

        return result;
    }
}