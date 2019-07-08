class MethodData extends AbstractCanvasData {

    public private: boolean;

    public constructor( name: string, x: number, y: number ) {

        super( name, x, y );

        this.private = false;
    }
}