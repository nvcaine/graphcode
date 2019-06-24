class ClassData {
    // make properties private
    public name: string;
    public x: number;
    public y: number;

    private id: number;

    // !! make private
    public properties: PropertyData[];

    public constructor( name: string, x: number, y: number ) {

        this.name = name;
        this.x = x;
        this.y = y;
        this.id = +new Date;
    }

    public getId(): number {

        return this.id;
    }

    public copy(): ClassData {

        let copy: ClassData = new ClassData( this.name, this.x, this.y );

        copy.id = this.id;

        return copy;
    }

    public addProperty( propertyName: string, x: number, y: number ) {
        if ( this.properties === undefined ) {
            this.properties = [];
        }

        this.properties.push( new PropertyData( propertyName, x, y ) );
    }
}