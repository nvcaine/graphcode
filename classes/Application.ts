/// <reference path="includes.ts" />

class Application {

    public static run() {

        console.log( '# start new app' );

        this.initWrappers(
            [
                new UIWrapper,
                new CanvasWrapper
            ],
            MessagingManager.getInstance()
        );

        console.log( '# wrappers initialized - exit' );
    }

    private static initWrappers( wrappers: DOMWrapper[], messenger: SimpleMessenger ) {

        wrappers.map( ( wrapper: DOMWrapper ) => {
            wrapper.init( messenger );
        } );
    }
}

Application.run();