let Camera = require("./Camera.js");
let CameraGrid = require("./CameraGrid.js");

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

    var cameraTracker = {};
    cameraTracker.update = function()
    {
        // Note: Keep this out of the camera!
        var camBox = camera.boundingBox;
        var round = Math.round;
        var min = Math.min;
        var max = Math.max;
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
    };

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
    
    this.grid = {};
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
}

module.exports = World;