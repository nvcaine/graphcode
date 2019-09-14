class MethodData extends AbstractCanvasData {

    public isPrivate: boolean;

    private _parameters: PropertyData[];
    private _variables: PropertyData[]

    public constructor( name: string, x: number, y: number, isPrivate: boolean = false ) {

        super( name, x, y );

        this.isPrivate = isPrivate;
    }

    public get parameters(): PropertyData[] {

        return this._parameters;
    }

    public get variables(): PropertyData[] {

        return this._variables;
    }

    public addParameter( parameterName: string, x: number, y: number ): PropertyData {

        if ( this._parameters === undefined ) {
            this._parameters = [];
        }

        let newProperty: PropertyData = new PropertyData( parameterName, x, y );

        this._parameters.push( newProperty );

        return newProperty;
    }

    public addVariable( variableName: string, x: number, y: number ): PropertyData {

        if ( this._variables === undefined ) {
            this._variables = [];
        }

        let newVariable: PropertyData = new PropertyData( variableName, x, y );

        this._variables.push( newVariable );

        return newVariable;
    }
}