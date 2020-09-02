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
        this.upperLeftCol = min(max(round((camBox.minX - cg.halfCellWidth) / cg.cellWidth), cg.minCol), cg.maxCol);
        this.upperLeftRow = min(max(round((camBox.minY - cg.halfCellHeight) / cg.cellHeight), cg.minRow), cg.maxRow);
        this.lowerRightCol = min(max(round((camBox.maxX - cg.halfCellWidth) / cg.cellWidth), cg.minCol), cg.maxCol);
        this.lowerRightRow = min(max(round((camBox.maxY - cg.halfCellHeight) / cg.cellHeight), cg.minRow), cg.maxRow);
    };

    this.init = function()
    {
        cameraGrid.reset();
        cameraTracker.update();

        // You can't initalize more than once (kinda like a singleton)
        delete this.init;
    };

    this.step = function()
    {
        camera.update();
        cameraTracker.update();

        gameObjectHandler.window(
            cameraGrid,
            cameraTracker.upperLeftCol, 
            cameraTracker.upperLeftRow, 
            cameraTracker.lowerRightCol, 
            cameraTracker.lowerRightRow
        );

        for(var i = 0; i < arguments.length; i++)
        {
            gameObjectHandler.act(cameraGrid, arguments[i]);
        }
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

        return array;
    };

    // Todo maybe make createAA static
    // this.utils = {};
    // this.utils.createAA = createAA;

    // Maybe todo: Move these to World.prototype
    this.grid = {};
    this.grid.getCell = function(x, y)
    {
        var pos = cameraGrid.getCoors(x, y);

        return cameraGrid.grid[pos.col][pos.row];
    };
    this.grid.loopThroughVisibleCells = function(callback)
    {
        cameraGrid.loopWithin(
            cameraTracker.upperLeftCol,
            cameraTracker.upperLeftRow,
            cameraTracker.lowerRightCol,
            cameraTracker.lowerRightRow,
            callback
        );
    };
    // this.grid.addReference = function(object)
    // { 
    //     cameraGrid.addRef(object);
    // };

    this.cam = {};
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
        return { 
            x: camera.scrollX, 
            y: camera.scrollY
        };
    };
    this.cam.getTranslateValues = function()
    {
        return camera.getTranslateValues();
    };
    this.cam.getBounds = function()
    {
        return camera.bounds;
    };
}

module.exports = World;