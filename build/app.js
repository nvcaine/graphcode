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
var CanvasWrapper = /** @class */ (function () {
    function CanvasWrapper() {
    }
    CanvasWrapper.prototype.init = function (messenger) {
        var domRect = document.body.getBoundingClientRect();
        this.appCanvas = new AppCanvasWrapper(DOMContainers.APP_CANVAS, domRect);
        this.appCanvas.hide();
        this.classCanvas = new ClassCanvasWrapper(DOMContainers.CLASS_CANVAS, domRect);
        this.classCanvas.hide();
        this.methodCanvas = new MethodCanvasWrapper(DOMContainers.METHOD_CANVAS, domRect);
        this.methodCanvas.hide();
        this.appCanvas.show();
        this.initMessagingContainer(messenger);
    };
    CanvasWrapper.prototype.initMessagingContainer = function (messenger) {
        messenger.onMessage(Messages.OPEN_CLASS, this.openClass.bind(this));
        messenger.onMessage(Messages.CLOSE_CLASS, this.closeClass.bind(this));
        messenger.onMessage(Messages.OPEN_METHOD, this.openMethod.bind(this));
        messenger.onMessage(Messages.CLOSE_METHOD, this.closeMethod.bind(this));
    };
    CanvasWrapper.prototype.openClass = function () {
        this.appCanvas.hide();
        this.classCanvas.show();
    };
    CanvasWrapper.prototype.closeClass = function () {
        this.classCanvas.hide();
        this.appCanvas.show();
        this.save();
    };
    CanvasWrapper.prototype.openMethod = function () {
        this.classCanvas.hide();
        this.methodCanvas.show();
    };
    CanvasWrapper.prototype.closeMethod = function () {
        this.methodCanvas.hide();
        this.classCanvas.show();
        this.save();
    };
    CanvasWrapper.prototype.save = function () {
        // ClassDataProxy.getInstance().updateClass( this.openedClass );
    };
    return CanvasWrapper;
}());
var UIWrapper = /** @class */ (function () {
    function UIWrapper() {
    }
    UIWrapper.prototype.init = function (messenger) {
        this.domHelper = new DOMHelper();
        try {
            this.initInterfaces(messenger);
            this.initMessages(messenger);
        }
        catch (error) {
            console.error(error.message);
        }
    };
    UIWrapper.prototype.initInterfaces = function (messenger) {
        this.initAppInterface(messenger);
        this.initClassInterface(messenger);
        this.initMethodInterface(messenger);
        console.log('## Interface initalized');
    };
    UIWrapper.prototype.initMessages = function (messenger) {
        messenger.onMessage(Messages.OPEN_CLASS, this.openClass.bind(this));
        messenger.onMessage(Messages.OPEN_METHOD, this.openMethod.bind(this));
    };
    UIWrapper.prototype.initAppInterface = function (messenger) {
        this.appInterface = this.domHelper.getElementById(DOMContainers.APP_INTERFACE);
        this.initInterfaceButton(InterfaceButtons.INTERFACE_ADD_CLASS, this.addClassClickHandler, messenger);
        this.initInterfaceButton(InterfaceButtons.INTERFACE_BACK, this.backClickHandler, messenger);
    };
    UIWrapper.prototype.initClassInterface = function (messenger) {
        this.classInterface = this.domHelper.getElementById(DOMContainers.CLASS_INTERFACE);
        this.classInterface.hidden = true;
        this.initInterfaceButton(InterfaceButtons.INTERFACE_ADD_CLASS_PROPERTY, this.addPropertyClickHandler, messenger);
        this.initInterfaceButton(InterfaceButtons.INTERFACE_ADD_CLASS_METHOD, this.addMethodClickHandler, messenger);
    };
    UIWrapper.prototype.initMethodInterface = function (messenger) {
        this.methodInterface = this.domHelper.getElementById(DOMContainers.METHOD_INTERFACE);
        this.methodInterface.hidden = true;
        this.initInterfaceButton(InterfaceButtons.INTERFACE_CLASS_BACK, this.backClassClickHandler, messenger);
        this.initInterfaceButton(InterfaceButtons.INTERFACE_ADD_METHOD_PARAMETER, this.addMethodParameter, messenger);
        this.initInterfaceButton(InterfaceButtons.INTERFACE_ADD_METHOD_VARIABLE, this.addMethodVariable, messenger);
    };
    /**
     * Get an element by its id and attach a click handler
     * @param buttonId the id of the DOM element corresponding to the button
     * @param handler the click handler
     * @returns a refference to the button
     * @throws
     */
    UIWrapper.prototype.initInterfaceButton = function (buttonId, handler, m) {
        var buttonElement = this.domHelper.getElementById(buttonId);
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
    UIWrapper.prototype.openMethod = function (methodData) {
        this.classInterface.hidden = true;
        this.methodInterface.hidden = false;
        this.renderMethod(methodData);
    };
    UIWrapper.prototype.backClassClickHandler = function (messenger) {
        messenger.sendMessage(Messages.CLOSE_METHOD, undefined);
        this.methodInterface.hidden = true;
        this.classInterface.hidden = false;
    };
    UIWrapper.prototype.renderMethod = function (methodData) {
        var nameSpan = document.getElementById('interface-method-name');
        nameSpan.innerHTML = methodData.name;
    };
    UIWrapper.prototype.addMethodParameter = function (messenger) {
        var parameterName = this.validatedPrompt('Enter parameter name', 'newParam');
        if (parameterName)
            messenger.sendMessage(Messages.ADD_METHOD_PARAMETER, parameterName);
    };
    UIWrapper.prototype.addMethodVariable = function (messenger) {
        var variableName = this.validatedPrompt('Enter variable name', 'localVariable');
        if (variableName)
            messenger.sendMessage(Messages.ADD_METHOD_VARIABLE, variableName);
    };
    return UIWrapper;
}());
var DOMContainers = /** @class */ (function () {
    function DOMContainers() {
    }
    DOMContainers.APP_CANVAS = 'app-canvas';
    DOMContainers.CLASS_CANVAS = 'class-canvas';
    DOMContainers.METHOD_CANVAS = 'method-canvas';
    DOMContainers.APP_INTERFACE = 'app-interface';
    DOMContainers.CLASS_INTERFACE = 'class-interface';
    DOMContainers.METHOD_INTERFACE = 'method-interface';
    return DOMContainers;
}());
var AbstractCanvasWrapper = /** @class */ (function () {
    function AbstractCanvasWrapper(canvasId, apiType) {
        this.domHelper = new DOMHelper();
        this.canvas = this.domHelper.getElementById(canvasId);
        this.api = new apiType(this.canvas);
    }
    AbstractCanvasWrapper.prototype.show = function () {
        this.canvas.hidden = false;
    };
    AbstractCanvasWrapper.prototype.hide = function () {
        this.canvas.hidden = true;
    };
    AbstractCanvasWrapper.prototype.initCanvasElement = function (id, domRect) {
        var canvas = this.domHelper.getElementById(id);
        canvas.style.width = domRect.width + 'px';
        canvas.style.height = domRect.height + 'px';
        canvas.style.position = 'relative';
        return canvas;
    };
    return AbstractCanvasWrapper;
}());
var AppCanvasWrapper = /** @class */ (function (_super) {
    __extends(AppCanvasWrapper, _super);
    function AppCanvasWrapper(canvasId, domRect) {
        var _this = _super.call(this, canvasId, AppCanvasAPI) || this;
        try {
            _this.initCanvasElement(canvasId, domRect);
            _this.initMessages(MessagingManager.getInstance()); // tight coupling
        }
        catch (error) {
            console.warn('Caught error: ' + error.message);
        }
        return _this;
    }
    AppCanvasWrapper.prototype.initMessages = function (messenger) {
        messenger.onMessage(Messages.ADD_CLASS, this.addClass.bind(this));
    };
    AppCanvasWrapper.prototype.addClass = function (className) {
        var classDataProxy = ClassDataProxy.getInstance(), classData = classDataProxy.addClass(className, 100, 100);
        this.api.addClass(classData);
    };
    return AppCanvasWrapper;
}(AbstractCanvasWrapper));
var ClassCanvasWrapper = /** @class */ (function (_super) {
    __extends(ClassCanvasWrapper, _super);
    function ClassCanvasWrapper(canvasId, domRect) {
        var _this = _super.call(this, canvasId, ClassCanvasAPI) || this;
        try {
            _this.initCanvasElement(canvasId, domRect);
            _this.initMessages(MessagingManager.getInstance()); // tight coupling
        }
        catch (error) {
            console.warn('Caught error: ' + error.message);
        }
        return _this;
    }
    ClassCanvasWrapper.prototype.initMessages = function (messenger) {
        messenger.onMessage(Messages.OPEN_CLASS, this.openClass.bind(this));
        messenger.onMessage(Messages.CLOSE_CLASS, this.closeClass.bind(this));
        messenger.onMessage(Messages.ADD_CLASS_PROPERTY, this.addClassProperty.bind(this));
        messenger.onMessage(Messages.ADD_CLASS_METHOD, this.addClassMethod.bind(this));
    };
    ClassCanvasWrapper.prototype.openClass = function (classData) {
        this.currentClass = classData;
        this.api.openClass(classData);
    };
    ClassCanvasWrapper.prototype.closeClass = function () {
        this.api.closeClass();
    };
    ClassCanvasWrapper.prototype.addClassProperty = function (propertyName) {
        var newProperty = this.currentClass.addProperty(propertyName, 100, 100);
        this.api.addProperty(newProperty);
    };
    ClassCanvasWrapper.prototype.addClassMethod = function (methodName) {
        var newMethod = this.currentClass.addMethod(methodName, 100, 100);
        this.api.addMethod(newMethod);
    };
    return ClassCanvasWrapper;
}(AbstractCanvasWrapper));
var MethodCanvasWrapper = /** @class */ (function (_super) {
    __extends(MethodCanvasWrapper, _super);
    function MethodCanvasWrapper(canvasId, domRect) {
        var _this = _super.call(this, canvasId, MethodCanvasAPI) || this;
        try {
            _this.initCanvasElement(canvasId, domRect);
            _this.initMessages(MessagingManager.getInstance()); // tight coupling
        }
        catch (error) {
            console.warn('Caught error: ' + error.message);
        }
        return _this;
    }
    MethodCanvasWrapper.prototype.initMessages = function (messenger) {
        messenger.onMessage(Messages.OPEN_METHOD, this.openMethod.bind(this));
        messenger.onMessage(Messages.CLOSE_METHOD, this.closeMethod.bind(this));
        messenger.onMessage(Messages.ADD_METHOD_PARAMETER, this.addMethodParameter.bind(this));
        messenger.onMessage(Messages.ADD_METHOD_VARIABLE, this.addMethodVariable.bind(this));
    };
    MethodCanvasWrapper.prototype.openMethod = function (methodData) {
        this.currentMethod = methodData;
        this.api.openMethod(methodData);
    };
    MethodCanvasWrapper.prototype.closeMethod = function () {
        this.api.closeMethod();
    };
    MethodCanvasWrapper.prototype.addMethodParameter = function (parameterName) {
        var newParameter = this.currentMethod.addParameter(parameterName, 100, 100);
        this.api.addParameter(newParameter);
    };
    MethodCanvasWrapper.prototype.addMethodVariable = function (variableName) {
        var newVariable = this.currentMethod.addVariable(variableName, 100, 100);
        this.api.addVariable(newVariable);
    };
    return MethodCanvasWrapper;
}(AbstractCanvasWrapper));
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
        this.mouseOffset = new Vector2(event.pageX - targetRect.left, event.pageY - targetRect.top);
    };
    /**
     * Update the position of the dragged element on the canvas.
     * @param event the drag event
     * @returns the updated position after the drag
     */
    AbstractCanvasAPI.prototype.onDragEnd = function (event) {
        event.preventDefault();
        var div = event.target, result = this.getDropPosition(event, this.canvasOffset, this.mouseOffset);
        div.style.left = result.x + 'px';
        div.style.top = result.y + 'px';
        return result;
    };
    /**
     * Get the global position of a dropped element
     * @param event the drag event to process
     * @param canvasOffset the current canvas offset relative to the page
     * @param mouseOffset the mouse offset relative to the event target's bounds
     * @returns a vector corresponding to the updated position
     */
    AbstractCanvasAPI.prototype.getDropPosition = function (event, canvasOffset, mouseOffset) {
        var result = new Vector2(event.pageX - canvasOffset.x - mouseOffset.x, event.pageY - canvasOffset.y - mouseOffset.y);
        return result;
    };
    return AbstractCanvasAPI;
}());
var AppCanvasAPI = /** @class */ (function (_super) {
    __extends(AppCanvasAPI, _super);
    function AppCanvasAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create class canvas element and save it in the global collection.
     * @param className
     * @param x
     * @param y
     */
    AppCanvasAPI.prototype.addClass = function (classData) {
        this.renderClass(classData);
    };
    AppCanvasAPI.prototype.renderClass = function (classData) {
        var classContainer = this.domHelper.createDivElement({
            position: 'absolute',
            border: '1px solid black',
            height: '50px',
            width: '150px',
            top: classData.y + 'px',
            left: classData.x + 'px'
        });
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
    AppCanvasAPI.prototype.dropClass = function (classData, event) {
        var position = _super.prototype.onDragEnd.call(this, event);
        classData.x = position.x;
        classData.y = position.y;
    };
    /**
     * Open the double-clicked class
     * @param classData the object passed to the handler when creating a new class object
     * @param event
     */
    AppCanvasAPI.prototype.openClass = function (classData, event) {
        var messagingManager = MessagingManager.getInstance();
        messagingManager.sendMessage(Messages.OPEN_CLASS, classData);
    };
    return AppCanvasAPI;
}(AbstractCanvasAPI));
var ClassCanvasAPI = /** @class */ (function (_super) {
    __extends(ClassCanvasAPI, _super);
    function ClassCanvasAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassCanvasAPI.prototype.openClass = function (classData) {
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
    ClassCanvasAPI.prototype.addProperty = function (propertyData) {
        this.renderProperty(propertyData);
    };
    ClassCanvasAPI.prototype.addMethod = function (methodData) {
        this.renderMethod(methodData);
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
        var propertyContainer = this.domHelper.createDivElement({
            position: 'absolute',
            border: '1px solid blue',
            height: '50px',
            width: '150px',
            top: propertyData.y + 'px',
            left: propertyData.x + 'px'
        });
        propertyContainer.innerText = propertyData.name;
        propertyContainer.draggable = true;
        propertyContainer.ondragstart = this.onDragStart.bind(this);
        propertyContainer.ondragend = this.dropElement.bind(this, propertyData);
        this.canvas.appendChild(propertyContainer);
    };
    ClassCanvasAPI.prototype.renderMethod = function (methodData) {
        var methodContainer = this.domHelper.createDivElement({
            position: 'absolute',
            border: '1px solid red',
            height: '50px',
            width: '150px',
            top: methodData.y + 'px',
            left: methodData.x + 'px'
        });
        methodContainer.innerText = methodData.name;
        methodContainer.draggable = true;
        methodContainer.ondragstart = this.onDragStart.bind(this);
        methodContainer.ondragend = this.dropElement.bind(this, methodData);
        methodContainer.ondblclick = this.openMethod.bind(this, methodData);
        this.canvas.appendChild(methodContainer);
    };
    ClassCanvasAPI.prototype.dropElement = function (elementData, event) {
        var position = this.onDragEnd(event);
        elementData.x = position.x;
        elementData.y = position.y;
    };
    ClassCanvasAPI.prototype.openMethod = function (methodData) {
        var messagingManager = MessagingManager.getInstance();
        messagingManager.sendMessage(Messages.OPEN_METHOD, methodData);
    };
    return ClassCanvasAPI;
}(AbstractCanvasAPI));
var MethodCanvasAPI = /** @class */ (function (_super) {
    __extends(MethodCanvasAPI, _super);
    function MethodCanvasAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MethodCanvasAPI.prototype.openMethod = function (methodData) {
        this.renderMethod(methodData);
    };
    MethodCanvasAPI.prototype.closeMethod = function () {
        this.domHelper.removeAllChildren(this.canvas);
    };
    MethodCanvasAPI.prototype.addParameter = function (parameterData) {
        this.renderParameter(parameterData);
    };
    MethodCanvasAPI.prototype.addVariable = function (variableData) {
        this.renderVariable(variableData);
    };
    MethodCanvasAPI.prototype.renderMethod = function (methodData) {
        if (methodData.parameters !== undefined)
            methodData.parameters.map(this.renderParameter, this);
        if (methodData.variables !== undefined)
            methodData.variables.map(this.renderVariable, this);
    };
    MethodCanvasAPI.prototype.renderParameter = function (parameterData) {
        var parameterContainer = this.domHelper.createDivElement({
            position: 'absolute',
            border: '1px solid orange',
            height: '50px',
            width: '150px',
            top: parameterData.y + 'px',
            left: parameterData.x + 'px'
        });
        parameterContainer.innerText = parameterData.name;
        parameterContainer.draggable = true;
        parameterContainer.ondragstart = this.onDragStart.bind(this);
        parameterContainer.ondragend = this.dropElement.bind(this, parameterData);
        this.canvas.appendChild(parameterContainer);
    };
    MethodCanvasAPI.prototype.renderVariable = function (variableData) {
        var parameterContainer = this.domHelper.createDivElement({
            position: 'absolute',
            border: '1px solid pink',
            height: '50px',
            width: '150px',
            top: variableData.y + 'px',
            left: variableData.x + 'px'
        });
        parameterContainer.innerText = variableData.name;
        parameterContainer.draggable = true;
        parameterContainer.ondragstart = this.onDragStart.bind(this);
        parameterContainer.ondragend = this.dropElement.bind(this, variableData);
        this.canvas.appendChild(parameterContainer);
    };
    MethodCanvasAPI.prototype.dropElement = function (elementData, event) {
        var position = this.onDragEnd(event);
        elementData.x = position.x;
        elementData.y = position.y;
    };
    return MethodCanvasAPI;
}(AbstractCanvasAPI));
var AbstractCanvasData = /** @class */ (function () {
    function AbstractCanvasData(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
    return AbstractCanvasData;
}());
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
    DOMHelper.prototype.getElementById = function (id) {
        var result;
        result = document.getElementById(id);
        if (result === null)
            throw new Error('Element with id \'' + id + '\' not found.');
        return result;
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
    Messages.OPEN_METHOD = 'open-method';
    Messages.CLOSE_METHOD = 'close-method';
    Messages.ADD_METHOD_PARAMETER = 'add-method-parameter';
    Messages.ADD_METHOD_VARIABLE = 'add-method-variable';
    return Messages;
}());
var InterfaceButtons = /** @class */ (function () {
    function InterfaceButtons() {
    }
    InterfaceButtons.INTERFACE_ADD_CLASS = 'interface-add-class';
    InterfaceButtons.INTERFACE_BACK = 'interface-back';
    InterfaceButtons.INTERFACE_ADD_CLASS_PROPERTY = 'interface-class-add-property';
    InterfaceButtons.INTERFACE_ADD_CLASS_METHOD = 'interface-class-add-method';
    InterfaceButtons.INTERFACE_CLASS_BACK = 'interface-class-back';
    InterfaceButtons.INTERFACE_ADD_METHOD_PARAMETER = 'interface-add-method-parameter';
    InterfaceButtons.INTERFACE_ADD_METHOD_VARIABLE = 'interface-add-method-variable';
    return InterfaceButtons;
}());
/// <reference path="./dom/CanvasWrapper.ts" />
/// <reference path="./dom/UIwrapper.ts" />
/// <reference path="./dom/consts/DOMContainers.ts" />
/// <reference path="./canvas/wrappers/AbstractCanvasWrapper.ts" />
/// <reference path="./canvas/wrappers/AppCanvasWrapper.ts" />
/// <reference path="./canvas/wrappers/ClassCanvasWrapper.ts" />
/// <reference path="./canvas/wrappers/MethodCanvasWrapper.ts" />
/// <reference path="./canvas/api/AbstractCanvasAPI.ts" />
/// <reference path="./canvas/api/AppCanvasAPI.ts" />
/// <reference path="./canvas/api/ClassCanvasAPI.ts" />
/// <reference path="./canvas/api/MethodCanvasAPI.ts" />
/// <reference path='./canvas/data/AbstractCanvasData.ts' />
/// <reference path="./canvas/data/ClassData.ts" />
/// <reference path='./canvas/data/Vector2.ts' />
/// <reference path='./canvas/helpers/DOMHelper.ts' />
/// <reference path="./messaging/MessagingManager.ts" />
/// <reference path="./messaging/consts/Messages.ts" />
/// <reference path="./dom/consts/InterfaceButtons.ts" />
/// <reference path="includes.ts" />
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.run = function () {
        console.log('# start new app');
        this.initWrappers([
            new UIWrapper,
            new CanvasWrapper
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
    function MethodData(name, x, y, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        var _this = _super.call(this, name, x, y) || this;
        _this.isPrivate = isPrivate;
        return _this;
    }
    Object.defineProperty(MethodData.prototype, "parameters", {
        get: function () {
            return this._parameters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MethodData.prototype, "variables", {
        get: function () {
            return this._variables;
        },
        enumerable: true,
        configurable: true
    });
    MethodData.prototype.addParameter = function (parameterName, x, y) {
        if (this._parameters === undefined) {
            this._parameters = [];
        }
        var newProperty = new PropertyData(parameterName, x, y);
        this._parameters.push(newProperty);
        return newProperty;
    };
    MethodData.prototype.addVariable = function (variableName, x, y) {
        if (this._variables === undefined) {
            this._variables = [];
        }
        var newVariable = new PropertyData(variableName, x, y);
        this._variables.push(newVariable);
        return newVariable;
    };
    return MethodData;
}(AbstractCanvasData));
var PropertyData = /** @class */ (function (_super) {
    __extends(PropertyData, _super);
    function PropertyData(name, x, y, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        var _this = _super.call(this, name, x, y) || this;
        _this.isPrivate = isPrivate;
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