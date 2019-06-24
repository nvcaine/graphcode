/// <reference path="AbstractCanvasAPI.ts" />

class ClassCanvasAPI extends AbstractCanvasAPI {

    public openClass( classData: ClassData ) {

        console.log( classData );
    }

    public closeClass() {

        this.domHelper.removeAllChildren( this.canvas );
    }

    public addProperty( propertyName: string, x: number, y: number ) {

        let propertyContainer: HTMLDivElement = this.domHelper.createPropertyElement( 100, 100 );

        propertyContainer.innerText = propertyName;

        this.canvas.appendChild( propertyContainer );
    }
}