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

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack://CartesianSystem/../node_modules/webpack/buildin/global.js?");

/***/ }),

/***/ "./CartesianSystem.js":
/*!****************************!*\
  !*** ./CartesianSystem.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var CartesianSystem = {\r\n    World: __webpack_require__(/*! ./world */ \"./world/index.js\")\r\n};\r\n\r\n// Export it\r\nmodule.exports = CartesianSystem;\r\nglobal.CartesianSystem = CartesianSystem;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"../node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://CartesianSystem/./CartesianSystem.js?");

/***/ }),

/***/ "./grid/grid.js":
/*!**********************!*\
  !*** ./grid/grid.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let grid = [];\r\n\r\n/**\r\n * Initializes the grid with values\r\n * \r\n * @param {number} cols \r\n * @param {number} rows \r\n * @param {number} cellWidth \r\n * @param {number} cellHeight \r\n */\r\ngrid.init = function(cols, rows, cellWidth, cellHeight)\r\n{\r\n    this.cols = cols;\r\n    this.rows = rows;\r\n    this.cellWidth = cellWidth;\r\n    this.cellHeight = cellHeight;\r\n};\r\n\r\n/**\r\n * Empties then fills the grid with empty objects\r\n */\r\ngrid.build = function()\r\n{\r\n    this.length = 0;\r\n\r\n    for(var i = 0; i < this.cols; i++)\r\n    {\r\n        this.push(Array(rows).fill(Object.create(null)));\r\n    }\r\n};\r\n\r\nmodule.exports = grid;\n\n//# sourceURL=webpack://CartesianSystem/./grid/grid.js?");

/***/ }),

/***/ "./grid/index.js":
/*!***********************!*\
  !*** ./grid/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let grid = __webpack_require__(/*! ./grid.js */ \"./grid/grid.js\");\r\n\r\nmodule.exports = grid;\n\n//# sourceURL=webpack://CartesianSystem/./grid/index.js?");

/***/ }),

/***/ "./world/index.js":
/*!************************!*\
  !*** ./world/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let World = __webpack_require__(/*! ./world.js */ \"./world/world.js\");\r\n\r\nmodule.exports = World;\n\n//# sourceURL=webpack://CartesianSystem/./world/index.js?");

/***/ }),

/***/ "./world/world.js":
/*!************************!*\
  !*** ./world/world.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let grid = __webpack_require__(/*! ../grid */ \"./grid/index.js\");\r\n\r\nfunction World(config)\r\n{\r\n    grid.init(config.grid.rows, config.grid.cols, config.cell.width, config.cell.height);\r\n}\r\n\r\nmodule.exports = World;\n\n//# sourceURL=webpack://CartesianSystem/./world/world.js?");

/***/ })

/******/ });
});