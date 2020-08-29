"use strict";

// Modified from https://github.com/photonstorm/phaser3-plugin-template

const webpack = require("webpack");

module.exports = {

    context: `${__dirname}/src/`,

    mode: "development",

    entry: {
        CartesianSystem: "./CartesianSystem.js",
        "CartesianSystem.min": "./CartesianSystem.js"
    },

    output: {
        path: `${__dirname}/dist/`,
        filename: "[name].js",
        library: "CartesianSystem",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
};