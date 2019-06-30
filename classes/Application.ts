/// <reference path="dom/CanvasWrapper.ts" />
/// <reference path="dom/UserInterface.ts" />

class Application {

    public static run() {

        console.log( '# start new app' );

        let canvasWrapper: CanvasWrapper = new CanvasWrapper( 'app-canvas', 'class-canvas' );
        let userInterface: UserInterface = new UserInterface( 'app-interface' )

        console.log( '# exit' );

    }
}

Application.run();