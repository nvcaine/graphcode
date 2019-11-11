/**
 * Unify access level property for Property and Method data objects
 */
abstract class AbstractClassData extends VariableData {

    private _accessLevel: AccessLevel;
    private _isStatic: boolean;

    public constructor(
        name: string,
        type: string,
        defaultValue: string,
        accessLevel: AccessLevel,
        isStatic: boolean,
        x: number,
        y: number
    ) {

        super( name, type, defaultValue, x, y );

        this._accessLevel = accessLevel;
        this._isStatic = isStatic;
    }

    public get isStatic(): boolean {

        return this._isStatic;
    }

    public get accessLevel(): AccessLevel {

        return this._accessLevel;
    }
}