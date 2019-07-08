class MethodCanvasAPI extends AbstractCanvasAPI {

    public openMethod( methodData: MethodData ) {

        this.renderMethod( methodData );
    }

    public closeMethod() {
        this.domHelper.removeAllChildren( this.canvas );
    }

    private renderMethod( methodData: MethodData ) {
        console.log( '### renderMethod' );
    }
}