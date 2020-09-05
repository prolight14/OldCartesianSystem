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

let config = {
    camera: {
        window: {
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height
        }
    },
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

var Rect = function(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    var that = this;

    this.body = {
        moved: false,
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
};

var Block = function(x, y, width, height)
{
    Rect.call(this, x, y, width, height);

    this.update = function()
    {

    };

    this.draw = function()
    {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

var Player = function(x, y, width, height)
{
    Rect.call(this, x, y, width, height);

    this.body.moved = true;

    this.update = function()
    {
        if(keys.a)
        {
            this.x -= 5;
        }
        if(keys.d)
        {
            this.x += 5;
        }
        if(keys.w)
        {
            this.y -= 5;
        }
        if(keys.s)
        {
            this.y += 5;
        }

        this.body.updateBoundingBox();
    };

    this.draw = function()
    {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

var blocks = world.add.gameObjectArray(Block);

var worldBounds = world.cam.getBounds();
for(var i = 0; i < 400; i++)
{
    var w = 15 + Math.random() * 20;
    var h = 15 + Math.random() * 20;

    blocks.add(w / 2 + Math.random() * (worldBounds.maxX - worldBounds.minX - w), h / 2 +Math.random() * (worldBounds.maxY - worldBounds.minY - h), w, h);
}

var players = world.add.gameObjectArray(Player);

var player1 = players.add(300, 300, 30, 30);

world.cam.setFocus(player1.x, player1.y, "player");

function loop()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    world.cam.updateFocus(player1.x, player1.y);
    world.cam.update();
    var translateValues = world.cam.getTranslateValues();

    ctx.translate(translateValues.x, translateValues.y);

    world.step("update", "draw");

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(loop);

window.addEventListener('keydown', keyPressed, false);
window.addEventListener('keyup', keyReleased, false);