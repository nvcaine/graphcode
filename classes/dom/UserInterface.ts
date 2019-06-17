class UserInterface {

    public constructor( domElementId: string ) {
        let container: HTMLDivElement = <HTMLDivElement> document.getElementById( domElementId );

        this.initializeContainer( container );
    }

    private initializeContainer( container: HTMLDivElement ) {
        let addClassButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById( 'interface-add-class' );

        addClassButton.onclick = this.addClickHandler;
        console.log( '## Interface initalized' );
    }

    private addClickHandler( e: MouseEvent ) {
        let newClassName: string = prompt( 'Enter class name', 'NewClass' );
        console.log( 'dispatch new-class-message with name: ' + newClassName );

        let messagingManager: MessagingManager = MessagingManager.getInstance();

        messagingManager.sendMessage( 'add-class', newClassName );
    }
}