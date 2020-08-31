function CameraGrid(cols, rows, cellWidth, cellHeight)
{
    this.cols = cols;
    this.rows = rows;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.halfCellWidth = cellWidth / 2;
    this.halfCellHeight = cellHeight / 2;

    var round = Math.round;
    var min = Math.min;
    var max = Math.max;

    var grid = [];

    this.reset = function()
    {
        grid.length = 0;

        var cols = this.cols;
        var rows = this.rows;
        var i, cell;

        for(i = 0; i < cols; i++)
        {
            // Create a cell with no __proto__ object
            cell = Object.create(null);

            grid.push(Array(rows).fill(cell));
        }
        
        this.minCol = 0;
        this.minRow = 0;
        this.maxCol = grid.length - 1;
        this.maxRow = grid[0].length - 1;
    };

    /**
     * Only use if you understand the implications, in other 
     * words only use if you don't need a bounds check first
     * 
     * @method CameraGrid#getCoordinatesFast
     * @returns {object} col and row
     */
    this.getCoordinatesFast = function()
    {
        return {
            col: round((x - this.halfCellWidth) / this.cellWidth),
            row: round((y - this.halfCellHeight) / this.cellHeight)
        };
    };

    /**
     * Converts x and y to col and row
     * 
     * @method CameraGrid#getCoordinates
     * @returns {object} col and row
     */
    this.getCoordinates = function()
    {
        return {
            col: max(min(round((x - this.halfCellWidth) / this.cellWidth), this.maxCol), this.minCol),
            row: max(min(round((y - this.halfCellHeight) / this.cellHeight), this.maxRow), this.minRow)
        };
    };

    this.loopWithin = function(upperLeftCol, upperLeftRow, lowerRightCol, lowerRightRow, callback)
    {
        var col, row;

        for(col = upperLeftCol; col <= lowerRightCol; col++)
        {
            for(row = upperLeftRow; row <= lowerRightRow; row++)
            {
                callback(grid[col][row], col, row);
            }
        }
    };
}

module.exports = CameraGrid;