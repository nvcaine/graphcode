class PropertyData extends AbstractClassData {

    public identifiers: IdentifierData[];

    private type: string;
    private defaultValue: string;
    private isStatic: boolean

    public constructor(
        name: string,
        type: string,
        defaultValue: string,
        accessLevel: AccessLevel,
        isStatic: boolean,
        x: number,
        y: number
    ) {

        super( name, accessLevel, x, y );

        this.type = type;
        this.defaultValue = defaultValue;
        this.isStatic = isStatic;

        this.identifiers = [];
    }
}