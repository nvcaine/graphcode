abstract class AbstractDefaultValueData extends AbstractTypedData {

    private _defaultValue: string;

    protected constructor(
        name: string,
        type: string,
        defaultValue: string,
        x: number,
        y: number
    ) {

        super( name, type, x, y );

        this._defaultValue = defaultValue;
    }

    public get defaultValue(): string {
        return this._defaultValue;
    }
}