"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

var keys = {};
function keyPressed(event)
{
    keys[event.key] = true;
}
function keyReleased(event)
{
    keys[event.key] = false;
}

window.addEventListener('keydown', keyPressed, false);
window.addEventListener('keyup', keyReleased, false);

let config = {
    camera: {
        window: {
            x: 70,
            y: 60,
            width: canvas.width - 140,
            height: canvas.height - 120
        }
    },
    // level: {
    //     bounds: {
    //         minX: 50,
    //         minY: 70,
    //         maxX: 200,//3000,
    //         maxY: 220//2986
    //     }
    // },
    grid: {
        rows: 12,
        cols: 12,
        cell: {
            height: 280,
            width: 280
        }
    },
};

let world = new CartesianSystem.World(config);

world.init();

console.log(world);

var player = {
    x: 140,
    y: 140
};

world.cam.setFocus(player.x, player.y, "player");

var Rect = function(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    var that = this;

    this.body = {
        moved: true,
        boundingBox: {
            minX: x,
            minY: y,
            maxX: x + width,
            maxY: y + height
        },
        updateBoundingBox: function()
        {
            var box = this.boundingBox;
            box.minX = that.x;
            box.minY = that.y;
            box.maxX = that.x + that.width;
            box.maxY = that.y + that.height;
        }
    };

    lastMoveTime: Date.now();

    this.update = function()
    {
        // lastMoveTime

        var dir = Math.atan2(player.y - this.y, player.x - this.x);

        this.x += Math.cos(dir) * 5;
        this.y += Math.sin(dir) * 5;

        this.body.updateBoundingBox();
    };

    this.draw = function()
    {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

var rects = world.add.gameObjectArray(Rect);

rects.add(180, 124, 80, 40);
rects.add(600, 230, 120, 30);

// for(var i = 0; i < 400; i++)
// {
//     rects.add(Math.random() * , 700, 23, 23);
// }

var loop = function()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var translateValues = world.cam.getTranslateValues();
    ctx.translate(translateValues.x, translateValues.y);

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x - 10, player.y - 10, 20, 20);

    if(keys.a)
    {
        player.x -= 5;
    }
    if(keys.d)
    {
        player.x += 5;
    }
    if(keys.w)
    {
        player.y -= 5;
    }
    if(keys.s)
    {
        player.y += 5;
    }

    world.cam.updateFocus(player.x, player.y);

    world.step("update", "draw");

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    var cellWidth = config.grid.cell.width;
    var cellHeight = config.grid.cell.height;

    world.grid.loopThroughVisibleCells((cell, col, row) =>
    {
        ctx.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
    });

    var bounds = world.cam.getBounds();

    ctx.lineWidth = 4;
    ctx.strokeRect(
        bounds.minX, 
        bounds.minY, 
        bounds.maxX - bounds.minX, 
        bounds.maxY - bounds.minY, 
    );

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.lineWidth = 2;

    ctx.strokeRect(
        config.camera.window.x, 
        config.camera.window.y, 
        config.camera.window.width, 
        config.camera.window.height
    );

    ctx.font = "20px Georgia";
    ctx.fillText(Object.keys(world.grid.getCell(player.x, player.y).refs).join("\n"), 10, 50);

    window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(loop);

