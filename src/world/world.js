let grid = require("../grid");

function World(config)
{
    this.grid = grid;
    grid.init(config.grid.rows, config.grid.cols, config.cell.width, config.cell.height);
}

module.exports = World;