(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CartesianSystem", [], factory);
	else if(typeof exports === 'object')
		exports["CartesianSystem"] = factory();
	else
		root["CartesianSystem"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./CartesianSystem.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./Camera.js":
/*!*******************!*\
  !*** ./Camera.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

function Camera(windowX, windowY, windowWidth, windowHeight)
{
    // Window stuff
    this.windowX = windowX;
    this.windowY = windowY;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.halfWindowWidth = this.windowWidth / 2;
    this.halfWindowHeight = this.windowHeight / 2;

    // Needed for moving the camera
    this.focusX = 0;
    this.focusY = 0;
    this.focusSpeed = 0.5;

    // The bounds the camera will stay with in
    // These will need to be set externally
    this.bounds = {
        minX: -Infinity,
        minY: -Infinity,
        maxX: Infinity,
        maxY: Infinity
    };
}
Camera.prototype.follow = function(x, y)
{
    // Move direction and move magnitude
    // These will be used to move the focus of the camera 
    var moveDir = Math.atan2(y - this.focusY, x - this.focusX);
    var moveMag = Math.sqrt(Math.pow(x - this.focusX, 2) + Math.pow(y - this.focusY, 2)) * this.speed;

    // Move camera in both x and y components
    this.focusX += this.distance * Math.cos(this.angle);
    this.focusY += this.distance * Math.sin(this.angle);

    // Keep it within bounds
    this.focusX = Math.min(Math.max(this.focusX, this.bounds.minX), this.bounds.maxX);
    this.focusY = Math.min(Math.max(this.focusY, this.bounds.minY), this.bounds.maxY);
};

module.exports = Camera;

/***/ }),

/***/ "./CameraGrid.js":
/*!***********************!*\
  !*** ./CameraGrid.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function CameraGrid(cols, rows, cellWidth, cellHeight)
{
    this.cols = cols;
    this.rows = rows;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;

    var grid = [];

    this.refill = function()
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

/***/ }),

/***/ "./CartesianSystem.js":
/*!****************************!*\
  !*** ./CartesianSystem.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var CartesianSystem = {
    World: __webpack_require__(/*! ./World.js */ "./World.js")
};

// Export it
module.exports = CartesianSystem;
global.CartesianSystem = CartesianSystem;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./World.js":
/*!******************!*\
  !*** ./World.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let Camera = __webpack_require__(/*! ./Camera.js */ "./Camera.js");
let CameraGrid = __webpack_require__(/*! ./CameraGrid.js */ "./CameraGrid.js");

function World(config)
{
    let camera = new Camera(
        config.camera.window.x,
        config.camera.window.y,
        config.camera.window.width,
        config.camera.window.height,
    );
    let cameraGrid = new CameraGrid(
        config.grid.cols, 
        config.grid.rows, 
        config.grid.cell.width, 
        config.grid.cell.height
    );

    this.init = function()
    {
        cameraGrid.refill();
    };
}

module.exports = World;

/***/ })

/******/ });
});
//# sourceMappingURL=CartesianSystem.js.map