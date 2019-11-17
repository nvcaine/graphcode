abstract class AbstractTypedData extends AbstractCanvasData {

    private _type: string;

    protected constructor( name: string, type: string, x: number, y: number ) {
        super( name, x, y );
        this._type = type;
    }

    public get type(): string {
        return this._type;
    }
}