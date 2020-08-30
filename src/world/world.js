let CameraGrid = require("../cameraGrid");

function World(config)
{
    this.cameraGrid = new CameraGrid();

    return function()
    {

    };
}

modules.export = World;