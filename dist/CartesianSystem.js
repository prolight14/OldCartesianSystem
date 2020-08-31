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
    this.scrollX = this.halfWindowWidth;
    this.scrollY = this.halfWindowHeight;
    this.scrollSpeed = 0.5;

    // The bounds the camera will stay with in
    // These will need to be set externally
    this.bounds = {
        minX: -Infinity,
        minY: -Infinity,
        maxX: Infinity,
        maxY: Infinity
    };

    this.boundingBox = {
        minX: this.scrollX - this.halfWindowWidth,
        minY: this.scrollY - this.halfWindowHeight,
        maxX: this.scrollX + this.halfWindowWidth,
        maxY: this.scrollY + this.halfWindowHeight
    };

    var focusObject;

    this.update = function()
    {
        if(focusObject)
        {
            this.scroll(focusObject.x, focusObject.y);
        }
    };

    this.setFocus = function(x, y, name)
    {
        focusObject = {
            x: x,
            y: y,
            name: name
        };
    };
    this.updateFocus = function(x, y)
    {
        focusObject.x = x;
        focusObject.y = y;
    };
    this.getFocus = function()
    {
        return focusObject;
    };
    this.removeFocus = function()
    {
        focusObject = undefined;
    };

    this.getTranslateValues = function()
    {
        return {
            x: this.windowX + this.halfWindowWidth - this.scrollX,
            y: this.windowY + this.halfWindowHeight - this.scrollY, 
        };
    };
}
Camera.prototype.scroll = function(x, y)
{
    // Move direction and move magnitude
    // These will be used to move the scroll of the camera 
    var moveDir = Math.atan2(y - this.scrollY, x - this.scrollX);
    var moveMag = Math.sqrt(Math.pow(x - this.scrollX, 2) + Math.pow(y - this.scrollY, 2)) * this.scrollSpeed;

    // Move camera in both x and y components
    this.scrollX += moveMag * Math.cos(moveDir);
    this.scrollY += moveMag * Math.sin(moveDir);

    // Keep it within bounds
    this.scrollX = Math.min(Math.max(this.scrollX, this.bounds.minX + this.halfWindowWidth), this.bounds.maxX - this.halfWindowWidth);
    this.scrollY = Math.min(Math.max(this.scrollY, this.bounds.minY + this.halfWindowHeight), this.bounds.maxY - this.halfWindowHeight);

    // Update the bounding box
    this.boundingBox.minX = this.scrollX - this.halfWindowWidth;
    this.boundingBox.minY = this.scrollY - this.halfWindowHeight;
    this.boundingBox.maxX = this.scrollX + this.halfWindowWidth;
    this.boundingBox.maxY = this.scrollY + this.halfWindowHeight;
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
    this.halfCellWidth = cellWidth / 2;
    this.halfCellHeight = cellHeight / 2;

    var round = Math.round;
    var min = Math.min;
    var max = Math.max;

    var grid = [];

    this.reset = function()
    {
        grid.length = 0;

        var cols = this.cols;
        var rows = this.rows;
        var i, cell;

        for(i = 0; i < cols; i++)
        {
            // Create a cell with no __proto__ object
            cell = Object.create(null);

            grid.push(Array(rows).fill(cell));
        }
        
        this.minCol = 0;
        this.minRow = 0;
        this.maxCol = grid.length - 1;
        this.maxRow = grid[0].length - 1;
    };

    /**
     * Only use if you understand the implications, in other 
     * words only use if you don't need a bounds check first
     * 
     * @method CameraGrid#getCoordinatesFast
     * @returns {object} col and row
     */
    this.getCoordinatesFast = function()
    {
        return {
            col: round((x - this.halfCellWidth) / this.cellWidth),
            row: round((y - this.halfCellHeight) / this.cellHeight)
        };
    };

    /**
     * Converts x and y to col and row
     * 
     * @method CameraGrid#getCoordinates
     * @returns {object} col and row
     */
    this.getCoordinates = function()
    {
        return {
            col: max(min(round((x - this.halfCellWidth) / this.cellWidth), this.maxCol), this.minCol),
            row: max(min(round((y - this.halfCellHeight) / this.cellHeight), this.maxRow), this.minRow)
        };
    };

    this.loopWithin = function(upperLeftCol, upperLeftRow, lowerRightCol, lowerRightRow, callback)
    {
        var col, row;

        for(col = upperLeftCol; col <= lowerRightCol; col++)
        {
            for(row = upperLeftRow; row <= lowerRightRow; row++)
            {
                callback(grid[col][row], col, row);
            }
        }
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

    if(typeof config.level === "undefined" || typeof config.level.bounds === "undefined")
    {
        camera.bounds.minX = camera.bounds.minY = 0;
        camera.bounds.maxX = config.grid.cols * config.grid.cell.width;
        camera.bounds.maxY = config.grid.rows * config.grid.cell.height;
    }
    else
    {
        camera.bounds.minX = config.level.bounds.minX;
        camera.bounds.minY = config.level.bounds.minY;
        camera.bounds.maxX = config.level.bounds.maxX;
        camera.bounds.maxY = config.level.bounds.maxY;
    }

    var cameraTracker = {};
    cameraTracker.update = function()
    {
        // Note: Keep this out of the camera!
        var camBox = camera.boundingBox;
        var round = Math.round;
        var min = Math.min;
        var max = Math.max;
        var cg = cameraGrid;

        // Todo: get rid of the bounds restrainment (min/max functions) and keep the camera in the world/grid 
        this.upperLeftCol = min(max(round((camBox.minX - cg.halfCellWidth) / cg.cellWidth), cg.minCol), cg.maxCol);
        this.upperLeftRow = min(max(round((camBox.minY - cg.halfCellHeight) / cg.cellHeight), cg.minRow), cg.maxRow);
        this.lowerRightCol = min(max(round((camBox.maxX - cg.halfCellWidth) / cg.cellWidth), cg.minCol), cg.maxCol);
        this.lowerRightRow = min(max(round((camBox.maxY - cg.halfCellHeight) / cg.cellHeight), cg.minRow), cg.maxRow);
    };

    this.init = function()
    {
        cameraGrid.reset();
        cameraTracker.update();

        // You can't initalize more than once (kinda like a singleton)
        delete this.init;
    };

    this.step = function()
    {
        camera.update();

        cameraTracker.update();
    };

    this.cam = {};
    this.cam.setFocus = function(x, y, name)
    {
        camera.setFocus(x, y, name);
        return this;
    };
    this.cam.updateFocus = function(x, y)
    {
        camera.updateFocus(x, y);
        return this;
    };
    this.cam.getFocus = function()
    {
        return camera.getFocus();
    };
    this.cam.removeFocus = function()
    {
        camera.removeFocus();
        return this;
    };
    this.cam.getScroll = function()
    {
        return { 
            x: camera.scrollX, 
            y: camera.scrollY
        };
    };
    this.cam.getTranslateValues = function()
    {
        return camera.getTranslateValues();
    };
    this.cam.getBounds = function()
    {
        return camera.bounds;
    };
    
    this.grid = {};
    this.grid.loopThroughVisibleCells = function(callback)
    {
        cameraGrid.loopWithin(
            cameraTracker.upperLeftCol,
            cameraTracker.upperLeftRow,
            cameraTracker.lowerRightCol,
            cameraTracker.lowerRightRow,
            callback
        );
    };
}

module.exports = World;

/***/ })

/******/ });
});
//# sourceMappingURL=CartesianSystem.js.map