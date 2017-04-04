(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["flattenizer"] = factory();
	else
		root["flattenizer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module to flatten and unflatten objects.
 *
 * @module Flattenizer
 */

/**
 * Flattens an object
 *
 * @function
 * @param {Object} unflattened - the object to flatten
 * @returns {Object} - the flattened object, empty if provided object is undefined
 * @public
 */
var flatten = exports.flatten = function flatten(unflattened) {
    if (typeof unflattened === 'undefined') return {};

    var flattened = {};

    for (var key in unflattened) {
        if (!unflattened.hasOwnProperty(key)) continue;

        if (_typeof(unflattened[key]) === 'object') {
            var flatObject = flatten(unflattened[key]);
            for (var subKey in flatObject) {
                // append to create new key value and assign it's value
                flattened[key + '.' + subKey] = flatObject[subKey];
            }
        } else {
            flattened[key] = unflattened[key];
        }
    }

    return flattened;
};

/**
 * Unflattens an object with compressed keys.
 *
 * @function
 * @param {Object} flattened - object to unflatten
 * @returns {Object} - the unflattened object, empty if provided object is undefined
 * @public
 */
var unflatten = exports.unflatten = function unflatten(flattened) {
    if (typeof flattened === 'undefined') return {};

    var unflattened = {};

    for (var prop in flattened) {
        if (flattened.hasOwnProperty(prop)) {
            explodeProperty(unflattened, prop, flattened);
        }
    }

    return unflattened;
};

/**
 * Explodes a flattened object key.
 *
 * @function
 * @param {Object} currUnflattened the current unflattened object
 * @param {String} key the current property to explode
 * @param {Object} flattenedObj the current flattened object
 * @private
 */
var explodeProperty = function explodeProperty(currUnflattened, key, flattenedObj) {
    var keys = key.split('.');
    var value = flattenedObj[key];
    var lastKeyIndex = keys.length - 1;

    for (var idx = 0; idx < lastKeyIndex; idx++) {
        var currKey = keys[idx];
        var nextKeyVal = void 0;

        if (!(currKey in currUnflattened)) {
            nextKeyVal = parseInt(keys[idx + 1], 10);
            currUnflattened[currKey] = isNaN(nextKeyVal) ? {} : [];
        }

        currUnflattened = currUnflattened[currKey];
    }

    currUnflattened[keys[lastKeyIndex]] = value;
};

exports.default = { flatten: flatten, unflatten: unflatten };

/***/ })
/******/ ]);
});
//# sourceMappingURL=flattenizer.js.map