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

    public addProperty( propertyName: string, x: number, y: number ): PropertyData {

        if ( this.properties === undefined ) {
            this.properties = [];
        }

        let newProperty: PropertyData = new PropertyData( propertyName, x, y );

        this.properties.push( newProperty );

        return newProperty;
    }
}