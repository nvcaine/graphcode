class VariableData extends AbstractDefaultValueData {

    public identifiers: IdentifierData[];

    public constructor(
        name: string,
        type: string,
        defaultValue: string,
        x: number,
        y: number
    ) {

        super( name, type, defaultValue, x, y );

        this.identifiers = [];
    }
}