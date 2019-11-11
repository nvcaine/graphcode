class VariableData extends AbstractCanvasData {

    private _type: string;
    private _defaultValue: string;

    // !! methods and properties don't have identifiers
    public identifiers: IdentifierData[];

    public constructor(
        name: string,
        type: string,
        defaultValue: string,
        x: number,
        y: number
    ) {

        super( name, x, y );

        this._type = type;
        this._defaultValue = defaultValue;

        this.identifiers = [];
    }

    public get type(): string {

        return this._type;
    }

    public get defaultValue(): string {

        return this._defaultValue;
    }
}