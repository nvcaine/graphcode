/// <reference path='./AbstractCanvasData.ts' />

class ClassData extends AbstractCanvasData {

    private _id: number;
    private _properties: PropertyData[];
    private _methods: MethodData[];

    public constructor( name: string, x: number, y: number ) {

        super( name, x, y );

        this._id = +new Date;
    }

    public get id(): number {

        return this._id;
    }

    public get properties(): PropertyData[] {

        return this._properties;
    }

    public get methods(): MethodData[] {

        return this._methods;
    }

    public copy(): ClassData {

        let copy: ClassData = new ClassData( this.name, this.x, this.y );

        copy._id = this._id;

        return copy;
    }

    public update( classData: ClassData ) {

        this.name = classData.name;
        this.x = classData.x;
        this.y = classData.y;
        this._properties = classData._properties;
        this._methods = classData._methods;
    }

    public addProperty( propertyName: string, x: number, y: number ): PropertyData {

        if ( this._properties === undefined ) {
            this._properties = [];
        }

        let newProperty: PropertyData = new PropertyData( propertyName, x, y );

        this._properties.push( newProperty );

        return newProperty;
    }

    public addMethod( methodName: string, x: number, y: number ): MethodData {

        if ( this._methods === undefined ) {
            this._methods = [];
        }

        let newMethod: MethodData = new MethodData( methodName, x, y );

        this._methods.push( newMethod );

        return newMethod;
    }
}