var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MessagingManager = /** @class */ (function () {
    function MessagingManager() {
        this.registeredHandlers = {};
    }
    MessagingManager.getInstance = function () {
        if (this.instance === undefined)
            this.instance = new MessagingManager();
        return this.instance;
    };
    MessagingManager.prototype.sendMessage = function (type, data) {
        for (var messageType in this.registeredHandlers) {
            if (type == messageType) {
                (this.registeredHandlers[type]).map(function (currentHandler) {
                    currentHandler.call(null, data);
                });
            }
        }
    };
    MessagingManager.prototype.onMessage = function (type, handler) {
        if (this.registeredHandlers.hasOwnProperty(type)) {
            var currentValue = this.registeredHandlers[type];
            this.registeredHandlers[type] = currentValue.concat(handler);
        }
        else {
            this.registeredHandlers[type] = [handler];
        }
    };
    return MessagingManager;
}());
var ClassData = /** @class */ (function () {
    function ClassData(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = +new Date;
    }
    ClassData.prototype.getId = function () {
        return this.id;
    };
    ClassData.prototype.copy = function () {
        var copy = new ClassData(this.name, this.x, this.y);
        copy.id = this.id;
        return copy;
    };
    ClassData.prototype.addProperty = function (propertyName, x, y) {
        if (this.properties === undefined) {
            this.properties = [];
        }
        this.properties.push(new PropertyData(propertyName, x, y));
    };
    return ClassData;
}());
var DOMHelper = /** @class */ (function () {
    function DOMHelper() {
    }
    DOMHelper.prototype.createClassElement = function (x, y) {
        return this.createDivElement({
            position: 'absolute',
            border: '1px solid black',
            height: '50px',
            width: '150px',
            top: y + 'px',
            left: x + 'px'
        });
    };
    DOMHelper.prototype.createPropertyElement = function (x, y) {
        return this.createDivElement({
            position: 'absolute',
            border: '1px solid blue',
            height: '50px',
            width: '150px',
            top: y + 'px',
            left: x + 'px'
        });
    };
    DOMHelper.prototype.removeAllChildren = function (element) {
        while (element.lastChild) {
            element.removeChild(element.lastChild);
        }
    };
    DOMHelper.prototype.createDivElement = function (style) {
        var result = document.createElement('div'), keys = Object.keys(style);
        keys.map(function (value) {
            result.style[value] = style[value];
        });
        return result;
    };
    return DOMHelper;
}());
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    return Vector2;
}());
/// <reference path='../dom/DOMHelper.ts' />
/// <reference path='data/Vector2.ts' />
var AbstractCanvasAPI = /** @class */ (function () {
    /**
     * Initialize the canvas offset and dom helper.
     * @param canvas the DOM element to operate on
     */
    function AbstractCanvasAPI(canvas) {
        var rect = canvas.getBoundingClientRect();
        this.canvasOffset = new Vector2(rect.left, rect.top);
        this.domHelper = new DOMHelper();
        this.canvas = canvas;
        this.canvas.ondragover = function (event) {
            event.preventDefault();
        };
    }
    return AbstractCanvasAPI;
}());
/// <reference path="data/ClassData.ts" />
/// <reference path="AbstractCanvasAPI.ts" />
var CanvasAPI = /** @class */ (function (_super) {
    __extends(CanvasAPI, _super);
    function CanvasAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create class canvas element and save it in the global collection.
     * @param className
     * @param x
     * @param y
     */
    CanvasAPI.prototype.addClass = function (className, x, y) {
        var classDataProxy = ClassDataProxy.getInstance();
        var classData = classDataProxy.addClass(className, x, y);
        var classContainer = this.domHelper.createClassElement(x, y);
        classContainer.innerText = className;
        classContainer.draggable = true;
        classContainer.ondragstart = this.startDragClass.bind(this);
        classContainer.ondragend = this.dropClass.bind(this, classData);
        classContainer.ondblclick = this.openClass.bind(this, classData);
        this.canvas.appendChild(classContainer);
    };
    /**
     * Get the mouse offset relative to the event target's origin
     * @param event
     */
    CanvasAPI.prototype.startDragClass = function (event) {
        var div = event.target, targetRect = div.getBoundingClientRect();
        // !! magic number
        this.mouseOffsetData = new Vector2(event.pageX - targetRect.left, event.pageY - targetRect.top - 21);
    };
    /**
     * Update target coordinate on canvas and update the object data
     * @param classData the object passed to the handler when creating a new class object
     * @param event
     */
    CanvasAPI.prototype.dropClass = function (classData, event) {
        event.preventDefault();
        var div = event.target;
        var classDataProxy = ClassDataProxy.getInstance();
        classData.x = (event.pageX - this.canvasOffset.x - this.mouseOffsetData.x);
        classData.y = (event.pageY - this.canvasOffset.y - this.mouseOffsetData.y);
        classDataProxy.updateClass(classData);
        div.style.left = classData.x + 'px';
        div.style.top = classData.y + 'px';
    };
    /**
     * Open the double-clicked class
     * @param classData the object passed to the handler when creating a new class object
     * @param event
     */
    CanvasAPI.prototype.openClass = function (classData, event) {
        var messagingManager = MessagingManager.getInstance();
        messagingManager.sendMessage('open-class', classData);
    };
    return CanvasAPI;
}(AbstractCanvasAPI));
/// <reference path="AbstractCanvasAPI.ts" />
var ClassCanvasAPI = /** @class */ (function (_super) {
    __extends(ClassCanvasAPI, _super);
    function ClassCanvasAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassCanvasAPI.prototype.openClass = function (classData) {
        console.log(classData);
        this.currentClassData = classData;
        this.renderClassData(classData);
    };
    ClassCanvasAPI.prototype.closeClass = function () {
        this.domHelper.removeAllChildren(this.canvas);
    };
    ClassCanvasAPI.prototype.addProperty = function (propertyName, x, y) {
        var propertyContainer = this.domHelper.createPropertyElement(100, 100);
        propertyContainer.innerText = propertyName;
        this.canvas.appendChild(propertyContainer);
        var classDataProxy = ClassDataProxy.getInstance();
        this.currentClassData.addProperty(propertyName, x, y);
        classDataProxy.updateClass(this.currentClassData);
    };
    ClassCanvasAPI.prototype.renderClassData = function (classData) {
        if (classData.properties !== undefined)
            for (var i = 0, len = classData.properties.length; i < len; i++) {
                var propertyContainer = this.domHelper.createPropertyElement(classData.properties[i].x, classData.properties[i].y);
                propertyContainer.innerText = classData.properties[i].name;
                this.canvas.appendChild(propertyContainer);
            }
    };
    return ClassCanvasAPI;
}(AbstractCanvasAPI));
/// <reference path="../messaging/MessagingManager.ts" />
/// <reference path="../canvas/CanvasAPI.ts" />
/// <reference path="../canvas/ClassCanvasAPI.ts" />
var CanvasWrapper = /** @class */ (function () {
    function CanvasWrapper(canvasElementId) {
        this.appCanvas = document.getElementById(canvasElementId);
        this.classCanvas = document.getElementById('class-canvas');
        this.classCanvas.hidden = true;
        var domRect = document.body.getBoundingClientRect();
        this.appCanvas.style.width = this.classCanvas.style.width = domRect.width + 'px';
        this.appCanvas.style.height = this.classCanvas.style.height = domRect.height + 'px';
        console.log('## Canvas initialized: ' + this.appCanvas.style.width + ' ' + this.appCanvas.style.height);
        this.appCanvasAPI = new CanvasAPI(this.appCanvas);
        this.classCanvasAPI = new ClassCanvasAPI(this.classCanvas);
        this.initMessagingContainer();
    }
    CanvasWrapper.prototype.initMessagingContainer = function () {
        var messagingManager = MessagingManager.getInstance();
        messagingManager.onMessage('add-class', this.addClass.bind(this));
        messagingManager.onMessage('open-class', this.openClass.bind(this));
        messagingManager.onMessage('close-class', this.closeClass.bind(this));
        messagingManager.onMessage('add-class-property', this.addClassProperty.bind(this));
    };
    CanvasWrapper.prototype.addClass = function (className) {
        this.appCanvasAPI.addClass(className, 100, 100);
    };
    CanvasWrapper.prototype.openClass = function (classData) {
        this.appCanvas.hidden = true;
        this.classCanvas.hidden = false;
        this.classCanvasAPI.openClass(classData);
    };
    CanvasWrapper.prototype.closeClass = function (messageData) {
        this.appCanvas.hidden = false;
        this.classCanvas.hidden = true;
        this.classCanvasAPI.closeClass();
    };
    CanvasWrapper.prototype.addClassProperty = function (propertyName) {
        console.log('add class property');
        this.classCanvasAPI.addProperty(propertyName, 100, 100);
    };
    return CanvasWrapper;
}());
/// <reference path="../canvas/data/ClassData.ts" />
var UserInterface = /** @class */ (function () {
    function UserInterface(domElementId) {
        this.appInterface = document.getElementById('app-interface');
        this.classInterface = document.getElementById('class-interface');
        this.classInterface.hidden = true;
        this.messagingManager = MessagingManager.getInstance();
        this.initializeContainer();
        this.initClassContainer();
    }
    UserInterface.prototype.initializeContainer = function () {
        // !! use a dictionary for constants
        var addClassButton = document.getElementById('interface-add-class'), backButton = document.getElementById('interface-back');
        addClassButton.onclick = this.addClickHandler.bind(this);
        backButton.onclick = this.backClickHandler.bind(this);
        this.messagingManager.onMessage('open-class', this.openClass.bind(this));
        console.log('## Interface initalized');
    };
    UserInterface.prototype.initClassContainer = function () {
        var addPropertyButton = document.getElementById('interface-class-add-property');
        addPropertyButton.onclick = this.addPropertyClickHandler.bind(this);
    };
    UserInterface.prototype.addClickHandler = function (e) {
        var newClassName = prompt('Enter class name', 'NewClass');
        this.messagingManager.sendMessage('add-class', newClassName);
    };
    UserInterface.prototype.openClass = function (messageData) {
        this.appInterface.hidden = true;
        this.classInterface.hidden = false;
        this.renderClass(messageData);
    };
    UserInterface.prototype.renderClass = function (classData) {
        var nameSpan = document.getElementById('interface-class-name');
        nameSpan.innerHTML = classData.name;
    };
    UserInterface.prototype.backClickHandler = function (event) {
        this.messagingManager.sendMessage('close-class', undefined);
        this.appInterface.hidden = false;
        this.classInterface.hidden = true;
    };
    UserInterface.prototype.addPropertyClickHandler = function (event) {
        var propertyName = prompt('Enter property name', 'newProperty');
        this.messagingManager.sendMessage('add-class-property', propertyName);
    };
    return UserInterface;
}());
/// <reference path="dom/CanvasWrapper.ts" />
/// <reference path="dom/UserInterface.ts" />
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.prototype.run = function () {
        console.log('# start new app');
        var canvasWrapper = new CanvasWrapper('app-canvas');
        var userInterface = new UserInterface('app-interface');
        console.log('# exit');
    };
    return Application;
}());
var app = new Application();
app.run();
var PropertyData = /** @class */ (function () {
    function PropertyData(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.private = false;
    }
    return PropertyData;
}());
/**
 * Controls access to the global classes data.
 */
var ClassDataProxy = /** @class */ (function () {
    function ClassDataProxy() {
        this.classes = [];
    }
    ClassDataProxy.getInstance = function () {
        if (this.instance === undefined)
            this.instance = new ClassDataProxy();
        return this.instance;
    };
    // post
    ClassDataProxy.prototype.addClass = function (className, x, y) {
        var classData = new ClassData(className, x, y);
        this.classes.push(classData);
        return classData.copy();
    };
    // put
    ClassDataProxy.prototype.updateClass = function (classData) {
        var originalClassData = this.getClassById(classData.getId());
        originalClassData.name = classData.name;
        originalClassData.x = classData.x;
        originalClassData.y = classData.y;
        originalClassData.properties = classData.properties;
        // also update properties and methods;
        console.log(this.classes);
        return originalClassData.copy();
    };
    ClassDataProxy.prototype.getClassById = function (id) {
        for (var i = 0, len = this.classes.length; i < len; i++)
            if (this.classes[i].getId() == id)
                return this.classes[i];
        return null;
    };
    return ClassDataProxy;
}());
//# sourceMappingURL=app.js.map