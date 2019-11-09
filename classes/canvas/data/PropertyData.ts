class PropertyData extends AbstractCanvasData {

    public identifiers: IdentifierData[];

    private type: string;
    private accessLevel: AccessLevel;
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

        super( name, x, y );

        this.type = type;
        this.defaultValue = defaultValue;
        this.accessLevel = accessLevel;
        this.isStatic = isStatic;

        this.identifiers = [];
    }
}