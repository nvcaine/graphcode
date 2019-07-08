interface SimpleMessenger {

    sendMessage( type: string, data: any ): void;
    onMessage( type: string, handler: ( data: any ) => any ): void; // !maybe => void
}