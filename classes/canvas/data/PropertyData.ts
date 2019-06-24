class PropertyData {

    public name: string;
    public x: number;
    public y: number;
    public private: boolean;

    public constructor( name: string, x: number, y: number ) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.private = false;

    }
}