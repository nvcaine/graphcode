class ClassCanvasWrapper extends AbstractCanvasWrapper<ClassCanvasAPI> {

    private currentClass: ClassData;

    public constructor( canvasId: string, domRect: ClientRect ) {

        super( canvasId, ClassCanvasAPI );

        try {
            this.initCanvasElement( canvasId, domRect );
            this.initMessages( MessagingManager.getInstance() ); // tight coupling
        } catch ( error ) {
            console.warn( 'Caught error: ' + error.message );
        }
    }

    private initMessages( messenger: SimpleMessenger ) {

        messenger.onMessage( Messages.OPEN_CLASS, this.openClass.bind( this ) );
        messenger.onMessage( Messages.CLOSE_CLASS, this.closeClass.bind( this ) );
        messenger.onMessage( Messages.ADD_CLASS_PROPERTY, this.addClassProperty.bind( this ) );
        messenger.onMessage( Messages.ADD_CLASS_METHOD, this.addClassMethod.bind( this ) );
    }

    private openClass( classData: ClassData ) {

        this.currentClass = classData;

        this.api.openClass( classData );
    }

    private closeClass() {

        this.api.closeClass();
    }

    private addClassProperty( propertyName: string, propertyType: string, defaultValue: string, accessLevel: AccessLevel, isStatic: boolean ) {

        let newProperty: PropertyData = this.currentClass.addProperty(
            propertyName,
            propertyType,
            defaultValue,
            accessLevel,
            isStatic,
            100, 100
        );

        this.api.addProperty( newProperty );
    }

    private addClassMethod( methodName: any ) {

        let newMethod: MethodData = this.currentClass.addMethod( methodName, 100, 100 );

        this.api.addMethod( newMethod );
    }
}