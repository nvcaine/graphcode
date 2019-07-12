class PropertyData extends AbstractCanvasData {

    public isPrivate: boolean;

    public constructor( name: string, x: number, y: number, isPrivate: boolean = false ) {

        super( name, x, y );

        this.isPrivate = isPrivate;
    }
}