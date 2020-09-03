var CartesianSystem = {
    World: require("./World.js"),
    Utils: {
        CreateAA: require("./createAA.js")
    }
};

// Export it
module.exports = CartesianSystem;
global.CartesianSystem = CartesianSystem;
