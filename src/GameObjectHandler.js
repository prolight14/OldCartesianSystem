var createAA = require("./createAA.js");

function GameObjectHandler()
{
    var gameObjects = createAA([], undefined, "gameObjects");

    // used for loop (mainly so we don't use an object again)
    var usedFL = {};
    // Will be used as a cache to contain all the stuff we need to process
    var used = {};

    this.addArray = function(name, gameObjectArray)
    {
        return gameObjects.addObject(name, gameObjectArray);
    };
    
    // Gets all 
    this.window = function(cameraGrid, minCol, minRow, maxCol, maxRow) 
    {
        usedFL = {};
        used = {};

        var grid = cameraGrid.grid;

        var col, row, refs, i, object, id;

        // Loop through grid
        for(col = minCol; col <= maxCol; col++)
        {
            for(row = minRow; row <= maxRow; row++)
            {
                refs = grid[col][row].refs;

                // Loop through cell references
                for(i in refs)
                {
                    // We already recorded key (`object._arrayName + object._id`), so don't do it again since some 
                    // objects can be in multiple cells at a time
                    if(usedFL[i])
                    {
                        continue;
                    }

                    // Is the same as createAA#getObject(name)
                    object = gameObjects[gameObjects.references[refs[i].arrayName]][refs[i].id];

                    // Save info for rendering
                    id = gameObjects.references[object._arrayName];
                    used[id] = used[id] === undefined ? [] : used[id];
                    used[id].push(object._id);

                    // Show we've recorded the key (`object._arrayName + object._id`)
                    usedFL[i] = true;
                }
            }
        }
    };

    this.act = function(cameraGrid, key)
    {
        var i, j, object;

        for(i in used)
        {
            for(j = 0; j < used[i].length; j++)
            {
                object = gameObjects[i][used[i][j]];

                object[key]();

                // Refreshes the object's cell place after it has been moved 
                if(object.body.moved)
                {
                    cameraGrid.removeRef(object);
                    cameraGrid.addRef(object);
                }
            }
        }
    };

    this.eachObjectsInCamera = function(callback)
    {
        var i, j;

        for(i in used)
        {
            for(j = 0; j < used[i].length; j++)
            {
                callback(gameObjects[i][used[i][j]]);
            }
        }
    };
}

module.exports = GameObjectHandler;