class DOMHelper {

    public createClassElement( x: number, y: number ): HTMLDivElement {

        return this.createDivElement( {
            position: 'absolute',
            border: '1px solid black',
            height: '50px',
            width: '150px',
            top: y + 'px',
            left: x + 'px'
        } );
    }

    public createPropertyElement( x: number, y: number ): HTMLDivElement {

        return this.createDivElement( {
            position: 'absolute',
            border: '1px solid blue',
            height: '50px',
            width: '150px',
            top: y + 'px',
            left: x + 'px'
        } );
    }

    public createMethodElement( x: number, y: number ): HTMLDivElement {

        return this.createDivElement( {
            position: 'absolute',
            border: '1px solid red',
            height: '50px',
            width: '150px',
            top: y + 'px',
            left: x + 'px'
        } );
    }

    public createParameterElement( x: number, y: number ): HTMLDivElement {

        return this.createDivElement( {
            position: 'absolute',
            border: '1px solid orange',
            height: '50px',
            width: '150px',
            top: y + 'px',
            left: x + 'px'
        } );
    }

    public removeAllChildren( element: HTMLDivElement ) {

        while ( element.lastChild )
            element.removeChild( element.lastChild );
    }

    private createDivElement( style: any ): HTMLDivElement {

        let result: HTMLDivElement = document.createElement( 'div' ),
            keys: string[] = Object.keys( style );

        keys.map( ( value ) => {
            result.style[value] = style[value];
        } );

        return result;
    }
}