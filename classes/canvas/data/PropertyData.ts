class PropertyData extends AbstractClassData {

    public identifiers: IdentifierData[];

    private defaultValue: string;

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

        this.defaultValue = defaultValue;

        this.identifiers = [];
    }
}