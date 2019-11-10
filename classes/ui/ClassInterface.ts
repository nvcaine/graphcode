class ClassInterface extends AbstractInterface {

    protected init( messenger: SimpleMessenger ) {

        this.interfaceContainer = <HTMLDivElement> DOMHelper.getElementById( DOMContainers.CLASS_INTERFACE );

        this.initInterfaceButton( InterfaceButtons.INTERFACE_BACK, this.backClickHandler, messenger );
        this.initInterfaceButton( 'submit-new-property', this.addPropertyClickHandler, messenger );
        this.initInterfaceButton( 'submit-new-method', this.addMethodClickHandler, messenger );
    }

    public renderClass( classData: ClassData ) {

        let nameSpan: HTMLSpanElement = <HTMLSpanElement> document.getElementById( 'interface-class-name' );

        nameSpan.innerHTML = classData.name;
    }

    private backClickHandler( messenger: SimpleMessenger ) {

        messenger.sendMessage( Messages.CLOSE_CLASS, undefined );
    }

    private addPropertyClickHandler( messenger: SimpleMessenger ) {

        let propertyName: string = ( <HTMLInputElement> DOMHelper.getElementById( 'new-property-name' ) ).value,
            propertyType: string = ( <HTMLInputElement> DOMHelper.getElementById( 'new-property-type' ) ).value,
            defaultValue: string = ( <HTMLInputElement> DOMHelper.getElementById( 'new-property-value' ) ).value,
            isStatic: boolean = ( <HTMLInputElement> DOMHelper.getElementById( 'new-property-static' ) ).checked,
            accessLevel: AccessLevel = this.getMemberAccessLevel('property');

        if ( propertyName )
            messenger.sendMessage( Messages.ADD_CLASS_PROPERTY, propertyName, propertyType, defaultValue, accessLevel, isStatic );
    }

    private addMethodClickHandler( messenger: SimpleMessenger ) {

        let methodName: string = ( <HTMLInputElement> DOMHelper.getElementById( 'new-method-name' ) ).value,
            methodType: string = ( <HTMLInputElement> DOMHelper.getElementById( 'new-method-type' ) ).value,
            isStatic: boolean = ( <HTMLInputElement> DOMHelper.getElementById( 'new-method-static' ) ).checked,
            accessLevel: AccessLevel = this.getMemberAccessLevel('method');

        if ( methodName )
            messenger.sendMessage( Messages.ADD_CLASS_METHOD, methodName, methodType, accessLevel, isStatic );
    }

    private getMemberAccessLevel( memberType: string ): AccessLevel {

        if ( ( <HTMLInputElement> DOMHelper.getElementById( 'new-' + memberType + '-public' ) ).checked )
            return AccessLevel.PUBLIC;

        if ( ( <HTMLInputElement> DOMHelper.getElementById( 'new-' + memberType + '-protected' ) ).checked )
            return AccessLevel.PROTECTED;

        return AccessLevel.PRIVATE;
    }
}