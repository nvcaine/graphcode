/// <reference path="dom/CanvasWrapper.ts" />
/// <reference path="dom/UserInterface.ts" />

class Application {

    public run() {

        console.log( '# start' );

        let canvasWrapper: CanvasWrapper = new CanvasWrapper( 'app-canvas' );
        let userInterface: UserInterface = new UserInterface( 'app-interface' )

        console.log( '# exit' );

    }
}
