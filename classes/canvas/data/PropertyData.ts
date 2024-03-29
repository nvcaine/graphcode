class PropertyData extends AbstractClassData {

    // !duplicate
    private _defaultValue: string;

    public constructor(
        name: string,
        type: string,
        defaultValue: string,
        accessLevel: AccessLevel,
        isStatic: boolean,
        x: number,
        y: number
    ) {

        super( name, type, accessLevel, isStatic, x, y );

        this._defaultValue = defaultValue;
    }

    // !!duplicate
    public get defaultValue(): string {

        return this._defaultValue;
    }
}