/**
 * Unify access level property for Property and Method data objects
 */
abstract class AbstractClassData extends AbstractCanvasData {

    private _accessLevel: AccessLevel;

    public constructor( name: string, accessLevel: AccessLevel, x: number, y: number ) {

        super( name, x, y );

        this._accessLevel = accessLevel;
    }

    public get accessLevel(): AccessLevel {

        return this._accessLevel;
    }
}