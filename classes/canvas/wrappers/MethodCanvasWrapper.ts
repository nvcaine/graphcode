class MethodCanvasWrapper extends AbstractCanvasWrapper<MethodCanvasAPI> {

    private currentMethod: MethodData;

    public constructor( canvasId: string, domRect: ClientRect ) {

        super( canvasId, MethodCanvasAPI );

        try {
            this.initCanvasElement( canvasId, domRect );
            this.initMessages( MessagingManager.getInstance() ); // tight coupling
        } catch ( error ) {
            console.warn( 'Caught error: ' + error.message );
        }
    }

    private initMessages( messenger: SimpleMessenger ) {

        messenger.onMessage( Messages.OPEN_METHOD, this.openMethod.bind( this ) );
        messenger.onMessage( Messages.CLOSE_METHOD, this.closeMethod.bind( this ) );
        messenger.onMessage( Messages.ADD_METHOD_PARAMETER, this.addMethodParameter.bind( this ) );
        messenger.onMessage( Messages.ADD_METHOD_VARIABLE, this.addMethodVariable.bind( this ) );
    }

    private openMethod( methodData: MethodData ) {

        this.currentMethod = methodData;

        this.api.openMethod( methodData );
    }

    private closeMethod() {

        this.api.closeMethod();
    }

    private addMethodParameter( parameterName: any ) {

        let newParameter: ParameterData = this.currentMethod.addParameter( parameterName, 100, 100 );

        this.api.addParameter( newParameter );
    }

    private addMethodVariable( variableName: any ) {

        let newVariable: VariableData = this.currentMethod.addVariable( variableName, 100, 100 );

        this.api.addVariable( newVariable );
    }
}