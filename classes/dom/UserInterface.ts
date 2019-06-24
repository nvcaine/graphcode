/// <reference path="../canvas/data/ClassData.ts" />

class UserInterface {

    private appInterface: HTMLDivElement;
    private classInterface: HTMLDivElement;

    private messagingManager: MessagingManager;

    public constructor( domElementId: string ) {

        this.appInterface = <HTMLDivElement> document.getElementById( 'app-interface' );
        this.classInterface = <HTMLDivElement> document.getElementById( 'class-interface' );
        this.classInterface.hidden = true;

        this.messagingManager = MessagingManager.getInstance();

        this.initializeContainer();
        this.initClassContainer();
    }

    private initializeContainer() {

        // !! use a dictionary for constants
        let addClassButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById( 'interface-add-class' ),
            backButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById( 'interface-back' );

        addClassButton.onclick = this.addClickHandler.bind( this );
        backButton.onclick = this.backClickHandler.bind( this );

        this.messagingManager.onMessage( 'open-class', this.openClass.bind( this ) );

        console.log( '## Interface initalized' );
    }

    private initClassContainer() {

        let addPropertyButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById( 'interface-class-add-property' );

        addPropertyButton.onclick = this.addPropertyClickHandler.bind( this );
    }

    private addClickHandler( e: MouseEvent ) {

        let newClassName: string = prompt( 'Enter class name', 'NewClass' );

        this.messagingManager.sendMessage( 'add-class', newClassName );
    }

    private openClass( messageData: ClassData ) {

        this.appInterface.hidden = true;
        this.classInterface.hidden = false;
        this.renderClass( messageData );
    }

    private renderClass( classData: ClassData ) {

        let nameSpan: HTMLSpanElement = <HTMLSpanElement> document.getElementById( 'interface-class-name' );

        nameSpan.innerHTML = classData.name;
    }

    private backClickHandler( event: MouseEvent ) {

        this.messagingManager.sendMessage( 'close-class', undefined );
        this.appInterface.hidden = false;
        this.classInterface.hidden = true;
    }

    private addPropertyClickHandler( event: MouseEvent ) {
        let propertyName: string = prompt( 'Enter property name', 'newProperty' );
        this.messagingManager.sendMessage( 'add-class-property', propertyName );
    }
}