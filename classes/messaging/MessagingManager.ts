class MessagingManager {

    private static instance: MessagingManager;

    private registeredHandlers: any;

    private constructor() {
        this.registeredHandlers = {};
    }

    public static getInstance(): MessagingManager {
        if ( this.instance === undefined )
            this.instance = new MessagingManager();

        return this.instance;
    }

    public sendMessage( type: string, data: any ) {

        for ( let messageType in this.registeredHandlers ) {
            if ( type == messageType ) {
                <Array<( data: any ) => any>>( this.registeredHandlers[type] ).map(
                    function ( currentHandler: ( data: any ) => any ) {
                        currentHandler.call( null, data );
                    }
                );
            }
        }
    }

    public onMessage( type: string, handler: ( data: any ) => any ) {

        if ( this.registeredHandlers.hasOwnProperty( type ) ) {
            let currentValue: Array<any> = this.registeredHandlers[type];
            this.registeredHandlers[type] = currentValue.concat( handler );
        } else {
            this.registeredHandlers[type] = [handler];
        }
    }
}