function CameraGrid(cols, rows, cellWidth, cellHeight)
{
    this.cols = cols;
    this.rows = rows;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;

    var grid = [];

    this.reset = function()
    {
        grid.length = 0;

        var cols = this.cols;
        var rows = this.rows;

        for(var i = 0; i < cols; i++)
        {
            // Create a cell with no __proto__ object
            var cell = Object.create(null);

            grid.push(Array(rows).fill(cell));
        }

        console.log(grid);
    };
}

module.exports = CameraGrid;