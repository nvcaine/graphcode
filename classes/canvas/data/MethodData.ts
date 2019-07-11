class MethodData extends AbstractCanvasData {

    public isPrivate: boolean;

    private _parameters: PropertyData[];

    public constructor( name: string, x: number, y: number, isPrivate: boolean = false ) {

        super( name, x, y );

        this.isPrivate = isPrivate;
    }

    public addParameter( parameterName: string, x: number, y: number ): PropertyData {

        if ( this._parameters === undefined ) {
            this._parameters = [];
        }

        let newProperty: PropertyData = new PropertyData( parameterName, x, y );

        this._parameters.push( newProperty );

        return newProperty;
    }
}