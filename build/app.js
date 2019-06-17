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
var CanvasAPI = /** @class */ (function () {
    function CanvasAPI(canvas) {
        this.canvas = canvas;
        this.canvas.ondragover = function (event) {
            event.preventDefault();
        };
        var rect = this.canvas.getBoundingClientRect();
        this.canvasOffsetX = rect.left;
        this.canvasOffsetY = rect.top;
    }
    CanvasAPI.prototype.drawClass = function (className, x, y) {
        var classContainer = document.createElement('div');
        classContainer.style.top = y + 'px';
        classContainer.style.left = x + 'px';
        classContainer.style.position = 'absolute';
        classContainer.style.border = '1px solid black';
        classContainer.innerText = className;
        classContainer.draggable = true;
        classContainer.ondragstart = this.startDragClass.bind(this);
        classContainer.ondragend = this.dragClass.bind(this);
        this.canvas.appendChild(classContainer);
    };
    CanvasAPI.prototype.startDragClass = function (event) {
        event.stopPropagation();
        var targetRect = event.target.getBoundingClientRect();
        this.targetOffsetX = event.pageX - targetRect.left;
        this.targetOffsetY = event.pageY - targetRect.top;
    };
    CanvasAPI.prototype.dragClass = function (event) {
        event.stopPropagation();
        var div = event.target;
        div.style.left = (event.pageX - this.canvasOffsetX - this.targetOffsetX) + 'px';
        div.style.top = (event.pageY - this.canvasOffsetY - this.targetOffsetY) + 'px';
    };
    return CanvasAPI;
}());
/// <reference path="../messaging/MessagingManager.ts" />
/// <reference path="../canvas/CanvasAPI.ts" />
var CanvasWrapper = /** @class */ (function () {
    function CanvasWrapper(canvasElementId) {
        this.canvas = document.getElementById(canvasElementId);
        var domRect = document.body.getBoundingClientRect();
        this.canvas.style.width = domRect.width + 'px';
        this.canvas.style.height = domRect.height + 'px';
        console.log('## Canvas initialized: ' + this.canvas.style.width + ' ' + this.canvas.style.height);
        this.initMessagingContainer();
    }
    CanvasWrapper.prototype.initMessagingContainer = function () {
        var messagingManager = MessagingManager.getInstance();
        messagingManager.onMessage('add-class', this.addClass.bind(this));
    };
    CanvasWrapper.prototype.addClass = function (messageData) {
        console.log('received:' + messageData);
        var canvasAPI = new CanvasAPI(this.canvas);
        canvasAPI.drawClass(messageData, 100, 100);
    };
    return CanvasWrapper;
}());
var UserInterface = /** @class */ (function () {
    function UserInterface(domElementId) {
        var container = document.getElementById(domElementId);
        this.initializeContainer(container);
    }
    UserInterface.prototype.initializeContainer = function (container) {
        var addClassButton = document.getElementById('interface-add-class');
        addClassButton.onclick = this.addClickHandler;
        console.log('## Interface initalized');
    };
    UserInterface.prototype.addClickHandler = function (e) {
        var newClassName = prompt('Enter class name', 'NewClass');
        console.log('dispatch new-class-message with name: ' + newClassName);
        var messagingManager = MessagingManager.getInstance();
        messagingManager.sendMessage('add-class', newClassName);
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