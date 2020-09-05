"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");

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
            height: 300,
            width: 300
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

var player2 = {
    x: 300,
    y: 300
};

world.cam.setFocus(player.x, player.y, "player");

var bounds = world.cam.getBounds();

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

    var lastMoveTime = Date.now();

    var driftX = -5 + Math.random() * 10;
    var driftY = -5 + Math.random() * 10;

    this.update = function()
    {
        if(Date.now() - lastMoveTime > 5000)
        {
            driftX = -5 + Math.random() * 10;
            driftY = -5 + Math.random() * 10;

            lastMoveTime = Date.now();
        }

        this.x += driftX * 0.1;
        this.y += driftY * 0.1;

        this.body.updateBoundingBox();

        var box = this.body.boundingBox;
        if(box.maxX < bounds.minX)
        {
            this.x = bounds.maxX - 1;

            this.body.updateBoundingBox();
        }   
        if(box.maxY < bounds.minY)
        {
            this.y = bounds.maxY - 1;

            this.body.updateBoundingBox();
        }  
        if(box.minX > bounds.maxX)
        {
            this.x = bounds.minX - this.width + 1;

            this.body.updateBoundingBox();
        }  
        if(box.minY > bounds.maxY)
        {
            this.y = bounds.minY - this.height + 1;

            this.body.updateBoundingBox();
        }    
    };

    this.draw = function()
    {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.draw2 = function()
    {
        ctx2.fillStyle = "green";
        ctx2.fillRect(this.x, this.y, this.width, this.height);
    };
};

var rects = world.add.gameObjectArray(Rect);
rects.add(180, 124, 80, 40);
rects.add(600, 230, 120, 30);

for(var i = 0; i < 400; i++)
{
    var w = 15 + Math.random() * 20;
    var h = 15 + Math.random() * 20;

    rects.add(w / 2 + Math.random() * (bounds.maxX - bounds.minX - w), h / 2 +Math.random() * (bounds.maxY - bounds.minY - h), w, h);
}

var mouse = {
    x: 0,
    y: 0
};
world.cam.setFocus(player.x, player.y, "player");

function runCanvas1()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    world.cam.resize(
        config.camera.window.x,
        config.camera.window.y,
        config.camera.window.width,
        config.camera.window.height,
    );
    world.cam.setFocus(player.x, player.y, "player");

    // world.cam.updateFocus(player.x, player.y);
    world.cam.update();

    var translateValues = world.cam.getTranslateValues();
    ctx.translate(translateValues.x, translateValues.y);

    if(keys["q"])
    {
        console.log(translateValues);
    }

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

    var camwin = world.cam.getWindow();

    ctx.lineWidth = 2;

    ctx.strokeRect(
        camwin.x, camwin.y,
        camwin.width, camwin.height
    );

    ctx.fillStyle = "white";
    ctx.font = "20px Georgia";

    var camScroll = world.cam.getScroll();
    var camWindow = config.camera.window;
    var targetX = camScroll.x - camWindow.width / 2 - camWindow.x + mouse.x;
    var targetY = camScroll.y - camWindow.height / 2 - camWindow.y + mouse.y;

    ctx.fillText(targetX.toFixed(3) + ", " + targetY.toFixed(3), 10, 20);

    var cellIds = Object.keys(world.grid.getCell(targetX, targetY).refs);
    for(var i = 0; i < cellIds.length; i++)
    {
        ctx.fillText(cellIds[i], 10, 50 + i * 20);
    }
}

var loop = function()
{
    runCanvas1();

    ////////////////////////////////////////////////////////////////

    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillStyle = "black";
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

    world.cam.resize(100, 100, canvas2.width - 200, canvas2.height - 200);

    world.cam.setFocus(player2.x, player2.y, "player2");
    world.cam.update();

    var translateValues = world.cam.getTranslateValues();
    ctx2.translate(translateValues.x, translateValues.y);

    if(keys[" "])
    {
        console.log(translateValues);
    }

    ctx2.fillStyle = "red";
    ctx2.fillRect(player2.x - 12, player2.y - 12, 24, 24);

    if(keys.ArrowLeft)
    {
        player2.x -= 5;
    }
    if(keys.ArrowRight)
    {
        player2.x += 5;
    }
    if(keys.ArrowUp)
    {
        player2.y -= 5;
    }
    if(keys.ArrowDown)
    {
        player2.y += 5;
    }

    world.step("draw2");

    ctx2.setTransform(1, 0, 0, 1, 0, 0);

    var camwin = world.cam.getWindow();

    ctx2.strokeStyle = "white";
    ctx2.lineWidth = 2;

    ctx2.strokeRect(
        camwin.x, camwin.y,
        camwin.width, camwin.height
    );

    window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(loop);

canvas.addEventListener("mousedown", (event) =>
{
    var rect = canvas.getBoundingClientRect();

    mouse = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
});

canvas.addEventListener("mousemove", (event) =>
{   
    var rect = canvas.getBoundingClientRect();

    mouse = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
});

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