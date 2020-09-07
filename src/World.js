let Camera = require("./Camera.js");
let CameraGrid = require("./CameraGrid.js");
let GameObjectHandler = require("./GameObjectHandler");
let createAA = require("./createAA.js");

function World(config)
{
    let camera = new Camera(
        config.camera.window.x,
        config.camera.window.y,
        config.camera.window.width,
        config.camera.window.height,
    );
    let cameraGrid = new CameraGrid(
        config.grid.cols, 
        config.grid.rows, 
        config.grid.cell.width, 
        config.grid.cell.height
    );
    let gameObjectHandler = new GameObjectHandler();

    if(typeof config.level === "undefined" || typeof config.level.bounds === "undefined")
    {
        camera.bounds.minX = camera.bounds.minY = 0;
        camera.bounds.maxX = config.grid.cols * config.grid.cell.width;
        camera.bounds.maxY = config.grid.rows * config.grid.cell.height;
    }
    else
    {
        camera.bounds.minX = config.level.bounds.minX;
        camera.bounds.minY = config.level.bounds.minY;
        camera.bounds.maxX = config.level.bounds.maxX;
        camera.bounds.maxY = config.level.bounds.maxY;
    }

    var round = Math.round;
    var min = Math.min;
    var max = Math.max;

    var cameraTracker = {};
    cameraTracker.update = function()
    {
        // Note: Keep this out of the camera!
        var camBox = camera.boundingBox;
        var cg = cameraGrid;

        // Todo: get rid of the bounds restrainment (min/max functions) and keep the camera in the world/grid 
        this.minCol = min(max(round((camBox.minX - cg.halfCellWidth) / cg.cellWidth), cg.minCol), cg.maxCol);
        this.minRow = min(max(round((camBox.minY - cg.halfCellHeight) / cg.cellHeight), cg.minRow), cg.maxRow);
        this.maxCol = min(max(round((camBox.maxX - cg.halfCellWidth) / cg.cellWidth), cg.minCol), cg.maxCol);
        this.maxRow = min(max(round((camBox.maxY - cg.halfCellHeight) / cg.cellHeight), cg.minRow), cg.maxRow);
    };

    this.init = function()
    {
        cameraGrid.reset();
        cameraTracker.update();

        // You can't initalize more than once (kinda like a singleton)
        delete this.init;

        return this;
    };

    var intertermFunction = function()
    {

    };

    this.setIntertermFunction = function(callback)
    {
        intertermFunction = callback || intertermFunction;

        return this;
    };

    this.getIntertermFunction = function()
    {
        return intertermFunction;
    };

    this.processOffscreen = function(gameObject)
    {
        var ct = cameraTracker;

        // Perform a bounds check to make sure we only add this object to the processList when it's offscreen
        // So it doesn't happen twice if it is onscreen
        if(gameObject._maxCol < ct.minCol || gameObject._minCol > ct.maxCol ||
           gameObject._maxRow < ct.minRow || gameObject._minRow > ct.maxRow)
        {
            gameObjectHandler.addToProcessList(
                cameraGrid,
                gameObject._minCol,
                gameObject._minRow,
                gameObject._maxCol,
                gameObject._maxRow,
            );
        }

        return this;
    };

    this.processOnscreen = function()
    {
        gameObjectHandler.addToProcessList(
            cameraGrid,
            cameraTracker.minCol, 
            cameraTracker.minRow, 
            cameraTracker.maxCol, 
            cameraTracker.maxRow
        );

        return this;
    };

    this.step = function()
    {
        for(var i = 0; i < arguments.length; i++)
        {
            gameObjectHandler.act(cameraGrid, arguments[i]);
        }

        // We don't need this information anymore, get rid of it
        gameObjectHandler.resetProcessList();

        return this;
    };

    this.update = function()
    {
        this.cam.update();
        this.processOnscreen();
        intertermFunction();
        this.step.apply(this, arguments);

        return this;
    };

    this.add = {};
    this.add.gameObjectArray = function(object, arrayName)
    {
        if(arrayName === undefined) { arrayName = object.name.charAt(0).toLowerCase() + object.name.slice(1); }

        var array = gameObjectHandler.addArray(arrayName, createAA(object, undefined, arrayName));

        var lastAdd = array.add;
        Object.defineProperty(array, "add", 
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function()
            {
                var gameObject = lastAdd.apply(this, arguments);

                cameraGrid.addRef(gameObject);
                return gameObject;
            }
        });
        var lastAddObject = array.addObject;
        Object.defineProperty(array, "addObject", 
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function()
            {
                var gameObject = lastAddObject.apply(this, arguments);
                if(!gameObject) { return; }

                cameraGrid.addRef(gameObject);
                return gameObject;
            }
        });

        var lastRemove = array.remove;
        Object.defineProperty(array, "remove",  
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function(id)
            {
                cameraGrid.removeRef(this[id]);
                return lastRemove.apply(this, arguments);
            }
        });
        var lastRemoveObject = array.removeObject;
        Object.defineProperty(array, "removeObject",  
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function(name)
            {
                cameraGrid.removeRef(this[this.references[name]]);
                return lastRemoveObject.apply(this, arguments);
            }
        });

        return array;
    };
    this.add.gameObject = function(arrayName)
    {
        var gameObjectArray = gameObjectHandler.getArray(arrayName);
        var gameObject = gameObjectArray.add.apply(gameObjectArray, Array.prototype.slice.call(arguments, 1));
        cameraGrid.addRef(gameObject);
        return gameObject;
    };

    this.get = {};
    this.get.gameObjectArray = function(arrayName)
    {
        return gameObjectHandler.getArray(arrayName);
    };
    this.get.gameObject = function(arrayName, id)
    {
        return gameObjectHandler.getArray(arrayName)[id];
    };

    this.remove = {};
    this.remove.gameObjectArray = function(arrayName)
    {
        cameraGrid.removeAll(arrayName);
        gameObjectHandler.removeArray(arrayName);
        return this;
    };
    this.remove.gameObject = function(arrayName, id)
    {
        var gameObjectArray = gameObjectHandler.getArray(arrayName);
        cameraGrid.removeRef(gameObjectArray[id]);
        gameObjectArray.remove(id);
        return this;
    };

    this.grid = {};
    this.grid.getCell = function(x, y)
    {
        var pos = cameraGrid.getCoors(x, y);
        return cameraGrid.grid[pos.col][pos.row];
    };
    this.grid.loopThroughVisibleCells = function(callback)
    {
        cameraGrid.loopThroughVisibleCells(
            cameraTracker.minCol,
            cameraTracker.minRow,
            cameraTracker.maxCol,
            cameraTracker.maxRow,
            callback
        );

        return this;
    };
    this.grid.loopThroughAllCells = function(callback)
    {
        cameraGrid.loopThroughAllCells(callback);
        return this;
    };
    this.grid.addToAllCells = function(name, property)
    {
        cameraGrid.addToAllCells(name, property);

        return this;
    };
    this.grid.refreshReferences = function(object)
    {
        cameraGrid.removeRef(object);
        cameraGrid.addRef(object);

        return this;
    };
    this.grid.getCoordinates = function(x, y)
    {
        return cameraGrid.getCoors(x, y);
    };

    this.cam = {};
    this.cam.update = function()
    {
        camera.update();
        cameraTracker.update();
    };
    this.cam.setFocus = function(x, y, name)
    {
        camera.setFocus(x, y, name);
        return this;
    };
    this.cam.updateFocus = function(x, y)
    {
        camera.updateFocus(x, y);
        return this;
    };
    this.cam.getFocus = function()
    {
        return camera.getFocus();
    };
    this.cam.removeFocus = function()
    {
        camera.removeFocus();
        return this;
    };
    this.cam.getScroll = function()
    {
        return camera.getScroll();
    };
    this.cam.getTranslateValues = function()
    {
        return camera.getTranslateValues();
    };
    this.cam.getBounds = function()
    {
        return camera.bounds;
    };
    this.cam.getWindow = function()
    {
        return {
            x: camera.windowX,
            y: camera.windowY,
            width: camera.windowWidth,
            height: camera.windowHeight
        };
    };
    this.cam.resize = function(windowX, windowY, windowWidth, windowHeight)
    {
        camera.resize(windowX, windowY, windowWidth, windowHeight);
    };
    this.cam.getWindowX = function()
    {
        return camera.windowX;
    };
    this.cam.getWindowY = function()
    {
        return camera.windowY;
    };
    this.cam.getWindowWidth = function()
    {
        return camera.windowWidth;
    };
    this.cam.getWindowHeight = function()
    {
        return camera.windowHeight;
    };
    this.cam.setWindowX = function(x)
    {
        camera.windowX = x;
        return this;
    };
    this.cam.setWindowY = function(y)
    {
        camera.windowY = y;
        return this;
    };
    this.cam.setWindowWidth = function(width)
    {
        camera.windowWidth = width;
        return this;
    };
    this.cam.setWindowHeight = function(height)
    {
        camera.windowHeight = height;
        return this;
    };

    // DEV only!
    this.exposeInternals = function()
    {
        return { 
            camera: camera,
            cameraGrid: cameraGrid,
            gameObjectHandler: gameObjectHandler,
            cameraTracker: cameraTracker
        };
    };
}

module.exports = World;