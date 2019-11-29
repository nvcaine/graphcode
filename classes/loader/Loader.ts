class Loader {

    private appCanvasAPI: AppCanvasAPI;

    public constructor( appCanvasAPI: AppCanvasAPI ) {
        this.appCanvasAPI = appCanvasAPI;
    }

    public loadFile( path: string ) {
        let json: string = this.getJSONFromFile( path );
        let classes: ClassData[] = this.getClasses( json );

        classes.map( this.renderClass.bind( this ) );
    }

    private getJSONFromFile( path: string ): string {

        let result: any = [{
            name: 'MyClass',
            isAbstract: false,
            x: 200,
            y: 200
        }]

        return JSON.stringify( result );
    }

    private getClasses( json: string ): ClassData[] {
        let classes: any[] = JSON.parse( json );

        return classes.map( this.extractClassData.bind( this ) );
    }

    private extractClassData( classObject: any ) {
        return new ClassData( classObject.name, classObject.isAbstract, classObject.x, classObject.y );
    }

    private renderClass( classData: ClassData ) {
        this.appCanvasAPI.addClass( classData );
    }
}