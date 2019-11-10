/**
 * Unify access level property for Property and Method data objects
 */
abstract class AbstractClassData extends AbstractCanvasData {

    private type: string;
    private isStatic: boolean;

    private _accessLevel: AccessLevel;

    public constructor( name: string, type:string, accessLevel: AccessLevel, isStatic:boolean, x: number, y: number ) {

        super( name, x, y );

        this.type = type;
        this._accessLevel = accessLevel;
        this.isStatic = isStatic;
    }

    public get accessLevel(): AccessLevel {

        return this._accessLevel;
    }
}