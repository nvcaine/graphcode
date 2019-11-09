class ClassData extends AbstractCanvasData {

    private _id: number;
    private _properties: PropertyData[];
    private _methods: MethodData[];

    private _isAbstract: boolean;

    public constructor( name: string, isAbstract: boolean, x: number, y: number ) {

        super( name, x, y );

        this._id = +new Date;
        this._isAbstract = isAbstract;
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

    public get isAbstract(): boolean {
        return this._isAbstract;
    }

    public copy(): ClassData {

        let copy: ClassData = new ClassData( this.name, this.isAbstract, this.x, this.y );

        copy._id = this._id;

        return copy;
    }

    public update( classData: ClassData ) {

        this.name = classData.name;
        this.x = classData.x;
        this.y = classData.y;
        this._properties = classData._properties;
        this._methods = classData._methods;

        this._isAbstract = classData._isAbstract;
    }

    public addProperty( propertyName: string, propertyType: string, defaultValue: string, accessLevel: AccessLevel, isStatic: boolean, x: number, y: number ): PropertyData {

        if ( this._properties === undefined ) {
            this._properties = [];
        }

        let newProperty: PropertyData = new PropertyData(
            propertyName,
            propertyType,
            defaultValue,
            accessLevel,
            isStatic,
            x, y
        );

        this._properties.push( newProperty );

        return newProperty;
    }

    public addMethod( methodName: string, methodType: string, accessLevel: AccessLevel, isStatic: boolean, x: number, y: number ): MethodData {

        if ( this._methods === undefined ) {
            this._methods = [];
        }

        let newMethod: MethodData = new MethodData(
            methodName,
            methodType,
            accessLevel,
            isStatic,
            x, y
        );

        this._methods.push( newMethod );

        return newMethod;
    }
}