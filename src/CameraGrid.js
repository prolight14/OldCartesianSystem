function CameraGrid(cols, rows, cellWidth, cellHeight)
{
    this.cols = cols;
    this.rows = rows;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.halfCellWidth = cellWidth / 2;
    this.halfCellHeight = cellHeight / 2;

    this.grid = [];

    var round = Math.round;
    var min = Math.min;
    var max = Math.max;

    this.reset = function()
    {
        this.grid.length = 0;

        var cols = this.cols;
        var rows = this.rows;
        var i, cell;

        for(i = 0; i < cols; i++)
        {
            // Create a cell with no __proto__ object
            cell = Object.create(null);
            cell.refs = Object.create(null);
            this.grid.push(Array(rows).fill(cell));
        }
        
        this.minCol = 0;
        this.minRow = 0;
        this.maxCol = this.grid.length - 1;
        this.maxRow = this.grid[0].length - 1;
    };

    /**
     * Only use if you understand the implications, in other 
     * words only use if you don't need a bounds check first
     * 
     * @method CameraGrid#getCoorssFast
     * @returns {object} col and row
     */
    this.getCoorsFast = function()
    {
        return {
            col: round((x - this.halfCellWidth) / this.cellWidth),
            row: round((y - this.halfCellHeight) / this.cellHeight)
        };
    };

    /**
     * Converts x and y to col and row
     * 
     * @method CameraGrid#getCoors
     * @returns {object} col and row
     */
    this.getCoors = function()
    {
        return {
            col: max(min(round((x - this.halfCellWidth) / this.cellWidth), this.maxCol), this.minCol),
            row: max(min(round((y - this.halfCellHeight) / this.cellHeight), this.maxRow), this.minRow)
        };
    };

    this.addRef = function(object)
    {   
        var key = object._arrayName + object._id;
        var toSet = {
            arrayName: object._arrayName,
            id: object._id
        };

        var box = object.body.boundingBox;

        var minCol = min(max(round((box.minX - this.halfCellWidth) / this.cellWidth), this.minCol), this.maxCol),
            minRow = min(max(round((box.minY - this.halfCellHeight) / this.cellHeight), this.minRow), this.maxRow),
            maxCol = min(max(round((box.maxX - this.halfCellWidth) / this.cellWidth), this.minCol), this.maxCol),
            maxRow = min(max(round((box.maxY - this.halfCellHeight) / this.cellHeight), this.minRow), this.maxRow);

        var col, row;

        for(col = minCol; col <= maxCol; col++)
        {
            for(row = minRow; row <= maxRow; row++)
            {
                this.grid[col][row].refs[key] = toSet;
            }
        }

        object._minCol = minCol;
        object._minRow = minRow;
        object._maxCol = maxCol;
        object._maxRow = maxRow;
    };

    this.removeRef = function()
    {
        var key = object._arrayName + object._id;

        var minCol = object._minCol,
            minRow = object._minRow,
            maxCol = object._maxCol,
            maxRow = object._maxRow;

        var col, row;

        for(col = minCol; col <= maxCol; col++)
        {
            for(row = minRow; row <= maxRow; row++)
            {
                delete this.grid[col][row].refs[key];
            }
        }
    };

    this.loopWithin = function(upperLeftCol, upperLeftRow, lowerRightCol, lowerRightRow, callback)
    {
        var col, row;

        for(col = upperLeftCol; col <= lowerRightCol; col++)
        {
            for(row = upperLeftRow; row <= lowerRightRow; row++)
            {
                callback(this.grid[col][row], col, row);
            }
        }
    };
}

module.exports = CameraGrid;