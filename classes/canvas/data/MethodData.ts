class MethodData extends AbstractClassData {

    private type: string;
    private isStatic: boolean;

    private _parameters: PropertyData[];
    private _variables: PropertyData[]

    public constructor( name: string, type:string, accessLevel: AccessLevel, isStatic:boolean, x: number, y: number ) {

        super( name, accessLevel, x, y );

        this.type = type;
        this.isStatic = isStatic;
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

        // ! no access level
        let newProperty: PropertyData = new PropertyData( parameterName, '', '', AccessLevel.PUBLIC, false, x, y );

        this._parameters.push( newProperty );

        return newProperty;
    }

    public addVariable( variableName: string, x: number, y: number ): PropertyData {

        if ( this._variables === undefined ) {
            this._variables = [];
        }

        // ! no access level
        let newVariable: PropertyData = new PropertyData( variableName, '', '', AccessLevel.PUBLIC, false, x, y );

        this._variables.push( newVariable );

        return newVariable;
    }
}