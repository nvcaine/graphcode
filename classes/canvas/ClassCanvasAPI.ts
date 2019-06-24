/// <reference path="AbstractCanvasAPI.ts" />

class ClassCanvasAPI extends AbstractCanvasAPI {

    private currentClassData: ClassData;

    public openClass( classData: ClassData ) {
        console.log( classData );
        this.currentClassData = classData;
        this.renderClassData( classData );
    }

    public closeClass() {

        this.domHelper.removeAllChildren( this.canvas );
    }

    public addProperty( propertyName: string, x: number, y: number ) {

        let propertyContainer: HTMLDivElement = this.domHelper.createPropertyElement( 100, 100 );

        propertyContainer.innerText = propertyName;

        this.canvas.appendChild( propertyContainer );

        let classDataProxy: ClassDataProxy = ClassDataProxy.getInstance();

        this.currentClassData.addProperty( propertyName, x, y );
        classDataProxy.updateClass( this.currentClassData );
    }

    private renderClassData( classData: ClassData ) {

        if ( classData.properties !== undefined )
            for ( let i = 0, len = classData.properties.length; i < len; i++ ) {
                let propertyContainer: HTMLDivElement = this.domHelper.createPropertyElement( classData.properties[i].x, classData.properties[i].y );

                propertyContainer.innerText = classData.properties[i].name;

                this.canvas.appendChild( propertyContainer );

            }
    }
}