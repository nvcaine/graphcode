abstract class AbstractCanvasData {

    public name: string;
    public x: number;
    public y: number;

    protected constructor( name: string, x: number, y: number ) {

        this.name = name;
        this.x = x;
        this.y = y;
    }
}