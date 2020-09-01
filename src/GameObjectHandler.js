var createAA = require("./createAA.js");

function GameObjectHandler()
{
    var gameObjects = createAA([], undefined, "gameObjects");
    var used = Object.create(null);

    this.window = function(grid, minCol, minRow, maxCol, maxRow) 
    {
        var col, row, cell, i;

        for(col = minCol; col < maxCol; col++)
        {
            for(row = minRow; row < maxRow; row++)
            {
                cell = grid[col][row];

                for(i in cell.refs)
                {

                }
            }
        }
    };

    this.act = function(key)
    {

    };

    this.eachObjectsInCamera = function(callback)
    {

    };
}

module.exports = GameObjectHandler;