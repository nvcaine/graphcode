class PropertyData extends AbstractClassData {

    public constructor(
        name: string,
        type: string,
        defaultValue: string,
        accessLevel: AccessLevel,
        isStatic: boolean,
        x: number,
        y: number
    ) {

        super( name, type, defaultValue, accessLevel, isStatic, x, y );
    }
}