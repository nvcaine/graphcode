class PropertyData extends AbstractCanvasData {

    public identifiers: IdentifierData[];

    private accessLevel: AccessLevel;
    private defaultValue: string;
    private propertyType: string;
    private isStatic: boolean

    public constructor(
        name: string,
        propertyType: string,
        defaultValue: string,
        accessLevel: AccessLevel,
        isStatic: boolean,
        x: number,
        y: number
    ) {

        super( name, x, y );

        this.propertyType = propertyType;
        this.defaultValue = defaultValue;
        this.accessLevel = accessLevel;
        this.isStatic = isStatic;

        this.identifiers = [];
    }
}