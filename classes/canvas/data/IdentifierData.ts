class IdentifierData extends AbstractCanvasData {

    public connectorElement: SVGElement;

    private _parent: PropertyData;

    public constructor( parent: PropertyData ) {

        super( '[I] ' + parent.name, parent.x + 200, parent.y );

        this._parent = parent;
    }

    public get parent(): PropertyData {

        return this._parent;
    }
}