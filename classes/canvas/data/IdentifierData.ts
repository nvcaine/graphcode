class IdentifierData extends AbstractCanvasData {

    public connectorElement: SVGElement;

    private _parent: VariableData;

    public constructor( parent: VariableData ) {

        super( '[I] ' + parent.name, parent.x + 200, parent.y );

        this._parent = parent;
    }

    public get parent(): VariableData {

        return this._parent;
    }
}