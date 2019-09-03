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

    public static createConnectorElement( startX: number, startY: number, endX: number, endY: number ): SVGElement {

        let result: SVGElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ),
            line: SVGLineElement = this.createLineElement( startX, startY, endX, endY );

        result.setAttribute( 'height', Math.abs( startY - endY ) + 5 + '' );
        result.setAttribute( 'width', Math.abs( startX - endX ) + 5 + '' );
        result.style['position'] = 'absolute';
        result.style['top'] = Math.min( startY, endY ) + 'px';
        result.style['left'] = Math.min( startX, endX ) + 'px';

        result.appendChild( line );

        return result;
    }

    public static createLineElement( startX: number, startY: number, endX: number, endY: number ): SVGLineElement {

        let line: SVGLineElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'line' );

        line.setAttribute( 'x1', '0' );
        line.setAttribute( 'y1', '0' );
        line.setAttribute( 'x2', Math.abs( endX - startX ) + '' );
        line.setAttribute( 'y2', Math.abs( endY - startY ) + '' );
        line.setAttribute( 'stroke', 'red' );
        line.setAttribute( 'stroke-width', '2' );

        return line;
    }

    public static updateConnectorContainer( connector: SVGElement, startX: number, startY: number, endX: number, endY: number ) {
        connector.setAttribute( 'height', Math.abs( startY - endY ) + 5 + '' );
        connector.setAttribute( 'width', Math.abs( startX - endX ) + 5 + '' );
        connector.style['top'] = Math.min( startY, endY ) + 'px';
        connector.style['left'] = Math.min( startX, endX ) + 'px';
    }
}