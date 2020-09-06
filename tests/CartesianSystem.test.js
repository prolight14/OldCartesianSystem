var CartesianSystem = require("../src/CartesianSystem.js");

test("Tests CartesianSystem.World constructor", () => 
{
    expect(typeof CartesianSystem.World).toBe("function");
});

test("Makes sure the world gets instiantiated", () => 
{
    var config = {
        camera: {
            window: {
                x: 0,
                y: 0,
                width: 800,
                height: 800
            }
        },
        grid: {
            rows: 40,
            cols: 40,
            cell: {
                height: 300,
                width: 300
            }
        },
    };

    expect(typeof new CartesianSystem.World(config).init()).toBe("object");
});