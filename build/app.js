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
var AbstractWrapper = /** @class */ (function () {
    function AbstractWrapper() {
    }
    AbstractWrapper.prototype.getElementById = function (id) {
        var result;
        result = document.getElementById(id);
        if (result === null)
            throw new Error('Element with id \'' + id + '\' not found.');
        return result;
    };
    return AbstractWrapper;
}());
var DOMContainers = /** @class */ (function () {
    function DOMContainers() {
    }
    DOMContainers.APP_CANVAS = 'app-canvas';
    DOMContainers.CLASS_CANVAS = 'class-canvas';
    DOMContainers.APP_INTERFACE = 'app-interface';
    DOMContainers.CLASS_INTERFACE = 'class-interface';
    return DOMContainers;
}());
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    return Vector2;
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
    DOMHelper.prototype.createMethodElement = function (x, y) {
        return this.createDivElement({
            position: 'absolute',
            border: '1px solid red',
            height: '50px',
            width: '150px',
            top: y + 'px',
            left: x + 'px'
        });
    };
    DOMHelper.prototype.removeAllChildren = function (element) {
        while (element.lastChild)
            element.removeChild(element.lastChild);
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
/// <reference path='./data/Vector2.ts' />
/// <reference path='./helpers/DOMHelper.ts' />
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
    /**
     * Save the mouse offset relative to the dragged element's origin.
     * @param event
     */
    AbstractCanvasAPI.prototype.onDragStart = function (event) {
        var div = event.target, targetRect = div.getBoundingClientRect();
        this.mouseOffsetData = new Vector2(event.pageX - targetRect.left, event.pageY - targetRect.top - 21 // !! magic number
        );
    };
    /**
     * Update the position of the dragged element on the canvas.
     * @param event
     */
    AbstractCanvasAPI.prototype.onDragEnd = function (event) {
        event.preventDefault();
        var div = event.target;
        var result = new Vector2(event.pageX - this.canvasOffset.x - this.mouseOffsetData.x, event.pageY - this.canvasOffset.y - this.mouseOffsetData.y);
        div.style.left = result.x + 'px';
        div.style.top = result.y + 'px';
        return result;
    };
    return AbstractCanvasAPI;
}());
/// <reference path="./AbstractCanvasAPI.ts" />
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
        var classDataProxy = ClassDataProxy.getInstance(), classData = classDataProxy.addClass(className, x, y);
        this.renderClass(classData);
    };
    CanvasAPI.prototype.renderClass = function (classData) {
        var classContainer = this.domHelper.createClassElement(classData.x, classData.y);
        classContainer.innerText = classData.name;
        classContainer.draggable = true;
        classContainer.ondragstart = this.onDragStart.bind(this);
        classContainer.ondragend = this.dropClass.bind(this, classData);
        classContainer.ondblclick = this.openClass.bind(this, classData);
        this.canvas.appendChild(classContainer);
    };
    /**
     * Update target coordinate on canvas and update the object data
     * @param classData the object passed to the handler when creating a new class object
     * @param event
     */
    CanvasAPI.prototype.dropClass = function (classData, event) {
        var position = _super.prototype.onDragEnd.call(this, event), classDataProxy = ClassDataProxy.getInstance();
        classData.x = position.x;
        classData.y = position.y;
        classDataProxy.updateClass(classData);
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
/// <reference path="./AbstractCanvasAPI.ts" />
var ClassCanvasAPI = /** @class */ (function (_super) {
    __extends(ClassCanvasAPI, _super);
    function ClassCanvasAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassCanvasAPI.prototype.openClass = function (classData) {
        this.currentClassData = classData;
        this.renderClass(classData);
    };
    /**
     * Clear the class canvas when a class is closed.
     */
    ClassCanvasAPI.prototype.closeClass = function () {
        this.domHelper.removeAllChildren(this.canvas);
    };
    /**
     * Add a property to the current class and render it on the canvas.
     * @param propertyName the name of the propertyy
     * @param x canvas coordinate X
     * @param y canvas coordinate Y
     */
    ClassCanvasAPI.prototype.addProperty = function (propertyName, x, y) {
        var propertyData = this.addPropertyToClassData(propertyName, x, y);
        this.renderProperty(propertyData);
    };
    ClassCanvasAPI.prototype.addMethod = function (methodName, x, y) {
        var methodData = this.addMethodToClassData(methodName, x, y);
        this.renderMethod(methodData);
    };
    /**
     * Add a property to the current class and update the class record.
     * @param propertyName the name of the property
     * @param x canvas coordinate X
     * @param y canvas coordinate Y
     * @returns a copy of the added property object
     */
    ClassCanvasAPI.prototype.addPropertyToClassData = function (propertyName, x, y) {
        var newProperty = this.currentClassData.addProperty(propertyName, x, y);
        ClassDataProxy.getInstance().updateClass(this.currentClassData);
        return newProperty;
    };
    ClassCanvasAPI.prototype.addMethodToClassData = function (methodName, x, y) {
        var newMethod = this.currentClassData.addMethod(methodName, x, y);
        ClassDataProxy.getInstance().updateClass(this.currentClassData);
        return newMethod;
    };
    /**
     * Render class to canvas. Display properties and methods;
     * @param classData the class object
     */
    ClassCanvasAPI.prototype.renderClass = function (classData) {
        if (classData.properties !== undefined)
            classData.properties.map(this.renderProperty, this);
        if (classData.methods !== undefined)
            classData.methods.map(this.renderMethod, this);
    };
    ClassCanvasAPI.prototype.renderProperty = function (propertyData) {
        var propertyContainer = this.domHelper.createPropertyElement(propertyData.x, propertyData.y);
        propertyContainer.innerText = propertyData.name;
        propertyContainer.draggable = true;
        propertyContainer.ondragstart = this.onDragStart.bind(this);
        propertyContainer.ondragend = this.dropElement.bind(this, propertyData);
        this.canvas.appendChild(propertyContainer);
    };
    ClassCanvasAPI.prototype.renderMethod = function (methodData) {
        var methodContainer = this.domHelper.createMethodElement(methodData.x, methodData.y);
        methodContainer.innerText = methodData.name;
        methodContainer.draggable = true;
        methodContainer.ondragstart = this.onDragStart.bind(this);
        methodContainer.ondragend = this.dropElement.bind(this, methodData);
        this.canvas.appendChild(methodContainer);
    };
    ClassCanvasAPI.prototype.dropElement = function (elementData, event) {
        var position = this.onDragEnd(event), classDataProxy = ClassDataProxy.getInstance();
        elementData.x = position.x;
        elementData.y = position.y;
        classDataProxy.updateClass(this.currentClassData);
    };
    return ClassCanvasAPI;
}(AbstractCanvasAPI));
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
var Messages = /** @class */ (function () {
    function Messages() {
    }
    Messages.ADD_CLASS = 'add-class';
    Messages.OPEN_CLASS = 'open-class';
    Messages.CLOSE_CLASS = 'close-class';
    Messages.ADD_CLASS_PROPERTY = 'add-class-property';
    Messages.ADD_CLASS_METHOD = 'add-class-method';
    return Messages;
}());
/// <reference path="./AbstractWrapper.ts" />
/// <reference path="./consts/DOMContainers.ts" />
/// <reference path="../canvas/CanvasAPI.ts" />
/// <reference path="../canvas/ClassCanvasAPI.ts" />
/// <reference path="../messaging/MessagingManager.ts" />
/// <reference path="../messaging/consts/Messages.ts" />
var CanvasWrapper = /** @class */ (function (_super) {
    __extends(CanvasWrapper, _super);
    function CanvasWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CanvasWrapper.prototype.init = function (messenger) {
        try {
            this.initCanvas(messenger);
        }
        catch (error) {
            console.error(error.message);
        }
    };
    CanvasWrapper.prototype.initCanvas = function (messenger) {
        this.initDOMElements();
        this.initAPIs();
        this.initMessagingContainer(messenger);
        console.log('## Canvas wrapper initialized');
    };
    CanvasWrapper.prototype.initDOMElements = function () {
        this.appCanvas = this.getElementById(DOMContainers.APP_CANVAS);
        this.classCanvas = this.getElementById(DOMContainers.CLASS_CANVAS);
        var domRect = document.body.getBoundingClientRect();
        this.appCanvas.style.width = this.classCanvas.style.width = domRect.width + 'px';
        this.appCanvas.style.height = this.classCanvas.style.height = domRect.height + 'px';
        this.appCanvas.style.position = this.classCanvas.style.position = 'relative;';
        console.log('## Canvas initialized: ' + this.appCanvas.style.width + ' ' + this.appCanvas.style.height);
    };
    CanvasWrapper.prototype.initAPIs = function () {
        this.appCanvasAPI = new CanvasAPI(this.appCanvas);
        this.appCanvas.hidden = true; // hide the app canvas in order to correctly initalize the class canvas
        this.classCanvasAPI = new ClassCanvasAPI(this.classCanvas); // correctly positioned for getting the offsets
        this.classCanvas.hidden = true;
        this.appCanvas.hidden = false;
    };
    CanvasWrapper.prototype.initMessagingContainer = function (messenger) {
        messenger.onMessage(Messages.ADD_CLASS, this.addClass.bind(this));
        messenger.onMessage(Messages.OPEN_CLASS, this.openClass.bind(this));
        messenger.onMessage(Messages.CLOSE_CLASS, this.closeClass.bind(this));
        messenger.onMessage(Messages.ADD_CLASS_PROPERTY, this.addClassProperty.bind(this));
        messenger.onMessage(Messages.ADD_CLASS_METHOD, this.addClassMethod.bind(this));
    };
    CanvasWrapper.prototype.addClass = function (className) {
        this.appCanvasAPI.addClass(className, 100, 100);
    };
    CanvasWrapper.prototype.openClass = function (classData) {
        this.appCanvas.hidden = true;
        this.classCanvas.hidden = false;
        this.classCanvasAPI.openClass(classData);
    };
    CanvasWrapper.prototype.closeClass = function () {
        this.appCanvas.hidden = false;
        this.classCanvas.hidden = true;
        this.classCanvasAPI.closeClass();
    };
    CanvasWrapper.prototype.addClassProperty = function (propertyName) {
        this.classCanvasAPI.addProperty(propertyName, 100, 100);
    };
    CanvasWrapper.prototype.addClassMethod = function (methodName) {
        this.classCanvasAPI.addMethod(methodName, 100, 100);
    };
    return CanvasWrapper;
}(AbstractWrapper));
var InterfaceButtons = /** @class */ (function () {
    function InterfaceButtons() {
    }
    InterfaceButtons.INTERFACE_ADD_CLASS = 'interface-add-class';
    InterfaceButtons.INTERFACE_BACK = 'interface-back';
    InterfaceButtons.INTERFACE_ADD_CLASS_PROPERTY = 'interface-class-add-property';
    InterfaceButtons.INTERFACE_ADD_CLASS_METHOD = 'interface-class-add-method';
    return InterfaceButtons;
}());
var AbstractCanvasData = /** @class */ (function () {
    function AbstractCanvasData(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
    return AbstractCanvasData;
}());
/// <reference path='./AbstractCanvasData.ts' />
var ClassData = /** @class */ (function (_super) {
    __extends(ClassData, _super);
    function ClassData(name, x, y) {
        var _this = _super.call(this, name, x, y) || this;
        _this._id = +new Date;
        return _this;
    }
    Object.defineProperty(ClassData.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassData.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassData.prototype, "methods", {
        get: function () {
            return this._methods;
        },
        enumerable: true,
        configurable: true
    });
    ClassData.prototype.copy = function () {
        var copy = new ClassData(this.name, this.x, this.y);
        copy._id = this._id;
        return copy;
    };
    ClassData.prototype.update = function (classData) {
        this.name = classData.name;
        this.x = classData.x;
        this.y = classData.y;
        this._properties = classData._properties;
        this._methods = classData._methods;
    };
    ClassData.prototype.addProperty = function (propertyName, x, y) {
        if (this._properties === undefined) {
            this._properties = [];
        }
        var newProperty = new PropertyData(propertyName, x, y);
        this._properties.push(newProperty);
        return newProperty;
    };
    ClassData.prototype.addMethod = function (methodName, x, y) {
        if (this._methods === undefined) {
            this._methods = [];
        }
        var newMethod = new MethodData(methodName, x, y);
        this._methods.push(newMethod);
        return newMethod;
    };
    return ClassData;
}(AbstractCanvasData));
/// <reference path="./consts/DOMContainers.ts" />
/// <reference path="./consts/InterfaceButtons.ts" />
/// <reference path="../canvas/data/ClassData.ts" />
/// <reference path="../messaging/consts/Messages.ts" />
var UIWrapper = /** @class */ (function (_super) {
    __extends(UIWrapper, _super);
    function UIWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIWrapper.prototype.init = function (messenger) {
        messenger.onMessage(Messages.OPEN_CLASS, this.openClass.bind(this));
        try {
            this.initInterfaces(messenger);
        }
        catch (error) {
            console.error(error.message);
        }
    };
    UIWrapper.prototype.initInterfaces = function (messenger) {
        this.initAppInterface(messenger);
        this.initClassInterface(messenger);
        console.log('## Interface initalized');
    };
    UIWrapper.prototype.initAppInterface = function (messenger) {
        this.appInterface = this.getElementById(DOMContainers.APP_INTERFACE);
        this.initInterfaceButton(InterfaceButtons.INTERFACE_ADD_CLASS, this.addClassClickHandler, messenger);
        this.initInterfaceButton(InterfaceButtons.INTERFACE_BACK, this.backClickHandler, messenger);
    };
    UIWrapper.prototype.initClassInterface = function (messenger) {
        this.classInterface = this.getElementById(DOMContainers.CLASS_INTERFACE);
        this.classInterface.hidden = true;
        this.initInterfaceButton(InterfaceButtons.INTERFACE_ADD_CLASS_PROPERTY, this.addPropertyClickHandler, messenger);
        this.initInterfaceButton(InterfaceButtons.INTERFACE_ADD_CLASS_METHOD, this.addMethodClickHandler, messenger);
    };
    /**
     * Get an element by its id and attach a click handler
     * @param buttonId the id of the DOM element corresponding to the button
     * @param handler the click handler
     * @returns a refference to the button
     * @throws
     */
    UIWrapper.prototype.initInterfaceButton = function (buttonId, handler, m) {
        var buttonElement = this.getElementById(buttonId);
        buttonElement.onclick = handler.bind(this, m);
        return buttonElement;
    };
    /**
     * Allow user to cancel a prompt and optionally warn if empty value entered
     * @param message The prompt message
     * @param defaultValue
     * @param warnIfEmpty if the user enters an empty value, display a warning if set to true
     */
    UIWrapper.prototype.validatedPrompt = function (message, defaultValue, warnIfEmpty) {
        if (warnIfEmpty === void 0) { warnIfEmpty = true; }
        var result = prompt(message, defaultValue);
        if (result === null) {
            return null; // user cancelled
        }
        result = result.replace(/\s+/g, '');
        if (result.length === 0 && warnIfEmpty) {
            console.warn('Cannot add a class without a name.');
            return null;
        }
        return result;
    };
    UIWrapper.prototype.addClassClickHandler = function (messenger) {
        var newClassName = this.validatedPrompt('Enter class name', 'NewClass');
        if (newClassName)
            messenger.sendMessage(Messages.ADD_CLASS, newClassName);
    };
    // !! remove class data reference
    UIWrapper.prototype.openClass = function (messageData) {
        this.appInterface.hidden = true;
        this.classInterface.hidden = false;
        this.renderClass(messageData);
    };
    // !! handle in a different manner
    UIWrapper.prototype.renderClass = function (classData) {
        var nameSpan = document.getElementById('interface-class-name');
        nameSpan.innerHTML = classData.name;
    };
    UIWrapper.prototype.backClickHandler = function (messenger) {
        messenger.sendMessage(Messages.CLOSE_CLASS, undefined);
        this.appInterface.hidden = false;
        this.classInterface.hidden = true;
    };
    UIWrapper.prototype.addPropertyClickHandler = function (messenger) {
        var propertyName = this.validatedPrompt('Enter property name', 'newProperty');
        if (propertyName)
            messenger.sendMessage(Messages.ADD_CLASS_PROPERTY, propertyName);
    };
    UIWrapper.prototype.addMethodClickHandler = function (messenger) {
        var methodName = this.validatedPrompt('Enter method name', 'newMethod');
        if (methodName)
            messenger.sendMessage(Messages.ADD_CLASS_METHOD, methodName);
    };
    return UIWrapper;
}(AbstractWrapper));
/// <reference path="./dom/CanvasWrapper.ts" />
/// <reference path="./dom/UIwrapper.ts" />
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.run = function () {
        console.log('# start new app');
        this.initWrappers([
            new CanvasWrapper,
            new UIWrapper
        ], MessagingManager.getInstance());
        console.log('# wrappers initialized - exit');
    };
    Application.initWrappers = function (wrappers, messenger) {
        wrappers.map(function (wrapper) {
            wrapper.init(messenger);
        });
    };
    return Application;
}());
Application.run();
var MethodData = /** @class */ (function (_super) {
    __extends(MethodData, _super);
    function MethodData(name, x, y) {
        var _this = _super.call(this, name, x, y) || this;
        _this.private = false;
        return _this;
    }
    return MethodData;
}(AbstractCanvasData));
/// <reference path='./AbstractCanvasData.ts' />
var PropertyData = /** @class */ (function (_super) {
    __extends(PropertyData, _super);
    function PropertyData(name, x, y) {
        var _this = _super.call(this, name, x, y) || this;
        _this.private = false;
        return _this;
    }
    return PropertyData;
}(AbstractCanvasData));
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
        var originalClassData = this.getClassById(classData.id);
        originalClassData.update(classData);
        return originalClassData.copy();
    };
    ClassDataProxy.prototype.getClassById = function (id) {
        for (var i = 0, len = this.classes.length; i < len; i++)
            if (this.classes[i].id == id)
                return this.classes[i];
        return null;
    };
    return ClassDataProxy;
}());
//# sourceMappingURL=app.js.map