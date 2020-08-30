"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let config = {
    camera: {
        window: {
            x: 30,
            y: 40,
            width: canvas.width - 60,
            height: canvas.height - 80
        }
    },
    grid: {
        rows: 12,
        cols: 12,
        cell: {
            height: 80,
            width: 80
        }
    },
};

let world = new CartesianSystem.World(config);

world.init();

console.log(world);