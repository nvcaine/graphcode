class DOMHelper {

    public getElementById( id: string ): HTMLElement {

        let result: HTMLElement;

        result = document.getElementById( id );

        if ( result === null )
            throw new Error( 'Element with id \'' + id + '\' not found.' );

        return result;
    }

    public removeAllChildren( element: HTMLDivElement ) {

        while ( element.lastChild )
            element.removeChild( element.lastChild );
    }

    public createDivElement( style: any ): HTMLDivElement {

        let result: HTMLDivElement = document.createElement( 'div' ),
            keys: string[] = Object.keys( style );

        keys.map( ( value ) => {
            result.style[value] = style[value];
        } );

        return result;
    }
}