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
    // public methods: Array<ClassMethodData>;
    function ClassData(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = +new Date;
    }
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
        var result = document.createElement('div');
        var keys = Object.keys(style);
        keys.map(function (value) {
            result.style[value] = style[value];
        });
        return result;
    };
    return DOMHelper;
}());
/// <reference path='../dom/DOMHelper.ts' />
var AbstractCanvasAPI = /** @class */ (function () {
    function AbstractCanvasAPI(canvas) {
        this.canvas = canvas;
        this.canvas.ondragover = function (event) {
            event.preventDefault();
        };
        var rect = this.canvas.getBoundingClientRect();
        this.canvasOffsetX = rect.left;
        this.canvasOffsetY = rect.top;
        this.domHelper = new DOMHelper();
    }
    return AbstractCanvasAPI;
}());
/// <reference path="data/ClassData.ts" />
/// <reference path="AbstractCanvasAPI.ts" />
var CanvasAPI = /** @class */ (function (_super) {
    __extends(CanvasAPI, _super);
    function CanvasAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.classes = [];
        return _this;
    }
    /**
     * Create a div element and append it to the canvas
     * @param className
     * @param x
     * @param y
     */
    CanvasAPI.prototype.addClass = function (className, x, y) {
        // !! wrap the data in a proxy (based on rest methods)
        var classData = new ClassData(className, x, y);
        this.classes.push(classData);
        var classContainer = this.domHelper.createClassElement(100, 100);
        classContainer.innerText = className;
        classContainer.draggable = true;
        classContainer.ondragstart = this.startDragClass.bind(this, classData);
        classContainer.ondragend = this.dragClass.bind(this, classData);
        classContainer.ondblclick = this.openClass.bind(this, classData);
        this.canvas.appendChild(classContainer);
    };
    CanvasAPI.prototype.startDragClass = function (classData, event) {
        event.stopPropagation();
        var div = event.target;
        var targetRect = div.getBoundingClientRect();
        // !! cheap trick - find a better way to pass the mouse offset
        classData.mouseOffsetX = event.pageX - targetRect.left;
        classData.mouseOffsetY = event.pageY - targetRect.top - 21;
    };
    CanvasAPI.prototype.dragClass = function (classData, event) {
        event.stopPropagation();
        var div = event.target;
        classData.x = (event.pageX - this.canvasOffsetX - classData.mouseOffsetX);
        classData.y = (event.pageY - this.canvasOffsetY - classData.mouseOffsetY);
        div.style.left = classData.x + 'px';
        div.style.top = classData.y + 'px';
    };
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
    };
    ClassCanvasAPI.prototype.closeClass = function () {
        this.domHelper.removeAllChildren(this.canvas);
    };
    ClassCanvasAPI.prototype.addProperty = function (propertyName, x, y) {
        var propertyContainer = this.domHelper.createPropertyElement(100, 100);
        propertyContainer.innerText = propertyName;
        this.canvas.appendChild(propertyContainer);
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
        var addClassButton = document.getElementById('interface-add-class');
        var backButton = document.getElementById('interface-back');
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
//# sourceMappingURL=app.js.map