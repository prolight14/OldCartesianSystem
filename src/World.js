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

    this.init = function()
    {
        cameraGrid.reset();
    };

    this.cam = {};
    this.cam.getFocus = function()
    {
        return {
            x: camera.focusX,
            y: camera.focusY
        };
    };

    // This is seperate for now
    this.view = function(x, y)
    {
        camera.moveFocus(x, y);
    };
}

module.exports = World;