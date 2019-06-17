class ClassData {
    public name: string;
    public x: number;
    public y: number;
    public mouseOffsetX: number;
    public mouseOffsetY: number;

    private id:number;
    // public methods: Array<ClassMethodData>;

    public constructor( name: string, x: number, y: number ) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = +new Date;
    }
}