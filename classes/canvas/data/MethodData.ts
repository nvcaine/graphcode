class MethodData extends AbstractClassData {

    private _parameters: ParameterData[];
    private _variables: VariableData[]

    public get parameters(): ParameterData[] {

        return this._parameters;
    }

    public get variables(): VariableData[] {

        return this._variables;
    }

    public addParameter( parameterName: string, x: number, y: number ): ParameterData {

        if ( this._parameters === undefined ) {
            this._parameters = [];
        }

        let newParameter: ParameterData = new ParameterData( parameterName, '', '', false, x, y );

        this._parameters.push( newParameter );

        return newParameter;
    }

    public addVariable( variableName: string, variableType: string, defaultValue: string, x: number, y: number ): VariableData {

        if ( this._variables === undefined ) {
            this._variables = [];
        }

        let newVariable: VariableData = new VariableData( variableName, variableType, defaultValue, x, y );

        this._variables.push( newVariable );

        return newVariable;
    }
}