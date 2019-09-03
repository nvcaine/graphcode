abstract class DOMHelper {

    public static getElementById( id: string ): HTMLElement {

        let result: HTMLElement;

        result = document.getElementById( id );

        if ( result === null )
            throw new Error( 'Element with id \'' + id + '\' not found.' );

        return result;
    }

    public static removeAllChildren( element: HTMLDivElement ) {

        while ( element.lastChild )
            element.removeChild( element.lastChild );
    }

    public static createDivElement( style: any ): HTMLDivElement {

        let result: HTMLDivElement = document.createElement( 'div' ),
            keys: string[] = Object.keys( style );

        keys.map( ( value ) => {
            result.style[value] = style[value];
        } );

        return result;
    }

    public static createConnectorElement( coords: any ): SVGElement {

        let result: SVGElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ),
            line: SVGLineElement = this.createLineElement( coords );

        result.style['position'] = 'absolute';
        this.updateConnectorContainer( result, coords );
        result.appendChild( line );

        return result;
    }

    public static createLineElement( coords: any ): SVGLineElement {

        let result: SVGLineElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'line' );

        result.setAttribute( 'stroke', 'red' );
        result.setAttribute( 'stroke-width', '2' );
        this.updateConnectorLine( result, coords );

        return result;
    }

    public static updateConnectorContainer( connector: SVGElement, coords: any ) {

        connector.setAttribute( 'height', Math.abs( coords.startY - coords.endY ) + '' );
        connector.setAttribute( 'width', Math.abs( coords.startX - coords.endX ) + '' );
        connector.style['top'] = Math.min( coords.startY, coords.endY ) + 'px';
        connector.style['left'] = Math.min( coords.startX, coords.endX ) + 'px';
    }

    public static updateConnectorLine( line: SVGLineElement, coords: any ) {

        line.setAttribute( 'x1', '0' );
        line.setAttribute( 'y1', '0' );
        line.setAttribute( 'x2', Math.abs( coords.endX - coords.startX ) + '' );
        line.setAttribute( 'y2', Math.abs( coords.endY - coords.startY ) + '' );
    }
}