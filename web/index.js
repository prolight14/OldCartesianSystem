let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let config = {
    grid: {
        rows: 12,
        cols: 12,
    },
    cell: {
        height: 80,
        width: 80
    }
};

let world = new CartesianSystem.World(config);

console.log(world);

