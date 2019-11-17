abstract class AbstractCanvasData {

    private _name: string;
    private _x: number;
    private _y: number;

    protected constructor( name: string, x: number, y: number ) {

        this._name = name;
        this._x = x;
        this._y = y;
    }

    public get name(): string {

        return this._name;
    }

    public get x(): number {

        return this._x;
    }

    public get y(): number {

        return this._y;
    }

    public set name( name: string ) {

        this._name = name;
    }

    public set x( x: number ) {

        this._x = x;
    }

    public set y( y: number ) {

        this._y = y;
    }
}