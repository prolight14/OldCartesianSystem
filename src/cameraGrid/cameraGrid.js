function CameraGrid()
{
    let grid = [];

    var _CameraGrid = function(cols, rows, cellWidth, cellHeight)
    {
        this.cols = cols;
        this.rows = rows;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    };

    _CameraGrid.prototype.build = function()
    {
        this.length = 0;

        for(var i = 0; i < this.cols; i++)
        {
            grid.push(Array(rows).fill(Object.create(null)));
        }
    };

    return _CameraGrid;
}

module.exports = grid;