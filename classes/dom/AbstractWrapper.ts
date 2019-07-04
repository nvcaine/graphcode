abstract class AbstractWrapper {

    protected getElementById( id: string ): HTMLElement {

        let result: HTMLElement;

        result = <HTMLElement> document.getElementById( id );

        if ( result === null )
            throw new Error( 'Element with id \'' + id + '\' not found.' );

        return result;
    }
}