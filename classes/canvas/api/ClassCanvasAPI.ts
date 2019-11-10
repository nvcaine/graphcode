class ClassCanvasAPI extends AbstractCanvasAPI {

    public openClass( classData: ClassData ) {

        this.renderClass( classData );
    }

    /**
     * Clear the class canvas when a class is closed.
     */
    public closeClass() {

        DOMHelper.removeAllChildren( this.canvas );
    }

    /**
     * Add a property to the current class and render it on the canvas.
     * @param propertyName the name of the propertyy
     * @param x canvas coordinate X
     * @param y canvas coordinate Y
     */
    public addProperty( propertyData: PropertyData ) {

        this.renderProperty( propertyData );
    }

    public addMethod( methodData: MethodData ) {

        this.renderMethod( methodData );
    }

    /**
     * Render class to canvas. Display properties and methods;
     * @param classData the class object
     */
    private renderClass( classData: ClassData ) {

        if ( classData.properties !== undefined )
            classData.properties.map( this.renderProperty, this );

        if ( classData.methods !== undefined )
            classData.methods.map( this.renderMethod, this );
    }

    private renderProperty( propertyData: PropertyData ) {

        let customProperties: any = { border: '1px solid blue' },
            propertyContainer: HTMLDivElement = this.createMemberContainer( propertyData, customProperties );

        this.canvas.appendChild( propertyContainer );
    }

    private renderMethod( methodData: MethodData ) {

        let customProperties: any = { border: '1px solid red' },
            methodContainer: HTMLDivElement = this.createMemberContainer( methodData, customProperties );

        methodContainer.ondblclick = this.openMethod.bind( this, methodData );

        this.canvas.appendChild( methodContainer );
    }

    /**
     * Create a div container for a class memer
     * @param memberData PropertyData or MethodData
     * @param customStyle additional properties, specific for each member type
     * @returns HTML element representing the container
     */
    private createMemberContainer( memberData: AbstractClassData, customStyle: any ): HTMLDivElement {

        let styleObject: any = this.getStyleObject( memberData, customStyle ),
            result: HTMLDivElement = DOMHelper.createDivElement( styleObject );

        result.innerText = memberData.name;
        result.draggable = true;
        result.ondragstart = this.onDragStart.bind( this );
        result.ondragend = this.dropElement.bind( this, memberData );

        return result;
    }

    private openMethod( methodData: MethodData ) {

        let messagingManager: MessagingManager = MessagingManager.getInstance();

        messagingManager.sendMessage( Messages.OPEN_METHOD, methodData );
    }

    private getStyleObject( memberData: AbstractClassData, additionalStyleProperties: any ): any {

        let result = {
            position: 'absolute',
            height: '50px',
            width: '150px',
            top: memberData.y + 'px',
            left: memberData.x + 'px'
        };

        let keys: string[] = Object.keys( additionalStyleProperties );

        keys.map( ( value ) => {
            result[value] = additionalStyleProperties[value];
        } );

        result['border-left'] = '3px solid #' + this.getAccessLevelColor( memberData.accessLevel );

        return result;
    }

    private getAccessLevelColor( accessLevel: AccessLevel ): string {

        let result: string = 'FF0000'; // private

        switch ( accessLevel ) {
            case AccessLevel.PUBLIC:
                return '00FF00';
            case AccessLevel.PROTECTED:
                return 'FFFF00';
        }

        return result
    }
}