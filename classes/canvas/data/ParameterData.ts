class ParameterData extends VariableData {

    private _isOptional: boolean;

    public constructor(
        name: string,
        type: string,
        defaultValue: string,
        isOptional: boolean,
        x: number,
        y: number
    ) {

        super( name, type, defaultValue, x, y );

        this._isOptional = isOptional;
    }

    public get isOptional(): boolean {

        return this._isOptional;
    }
}