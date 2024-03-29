/**
 * Controls access to the global classes data.
 */
class ClassDataProxy {

    private static instance: ClassDataProxy;

    private classes: Array<ClassData>;

    public static getInstance() {

        if ( this.instance === undefined )
            this.instance = new ClassDataProxy();

        return this.instance;
    }

    private constructor() {

        this.classes = [];
    }

    // post
    public addClass( className: string, isAbstract:boolean, x: number, y: number ): ClassData {

        let classData: ClassData = new ClassData( className, isAbstract, x, y );

        this.classes.push( classData );

        return classData.copy();
    }

    // put
    public updateClass( classData: ClassData ): ClassData {

        let originalClassData: ClassData = this.getClassById( classData.id );

        originalClassData.update(classData);

        return originalClassData.copy();
    }

    private getClassById( id: number ): ClassData {

        for ( let i = 0, len = this.classes.length; i < len; i++ )
            if ( this.classes[i].id == id )
                return this.classes[i];

        return null;
    }
}