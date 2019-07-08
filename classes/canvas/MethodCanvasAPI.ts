class MethodCanvasAPI extends AbstractCanvasAPI {

    public openMethod( methodData: MethodData ) {

        this.renderMethod( methodData );
    }

    private renderMethod( methodData: MethodData ) {
        console.log( '### renderMethod' );
    }
}