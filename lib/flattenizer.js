(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Flattenizer"] = factory();
	else
		root["Flattenizer"] = factory();
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
 * Flattens a valid object
 *
 * @param obj the object to unflatten
 * @returns {object} the flattened object
 */
var flattenate = exports.flattenate = function flattenate(obj) {
    var flattened = {};

    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        if (_typeof(obj[key]) === 'object') {
            var flatObject = flattenate(obj[key]);
            for (var subKey in flatObject) {
                // append to create new key value and assign it's value
                flattened[key + '.' + subKey] = flatObject[subKey];
            }
        } else {
            // be sure all property values are strings!
            flattened[key] = obj[key];
        }
    }

    return flattened;
};

/**
 * Unflattens a flattened object
 *
 * @param flattened
 * @returns {object} the unflattened object
 */
var unflattenate = exports.unflattenate = function unflattenate(flattened) {
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
 * @param currUnflattened the current unflattened object
 * @param prop the current property to explode
 * @param flattenedObj the current flattened object
 */
var explodeProperty = function explodeProperty(currUnflattened, prop, flattenedObj) {
    var keys = prop.split('.');
    var value = flattenedObj[prop];
    var lastKeyIndex = keys.length - 1;

    for (var idx = 0; idx < lastKeyIndex; idx++) {
        var currKey = keys[idx];

        if (!(currKey in currUnflattened)) {
            var nextKeyVal = parseInt(keys[idx + 1], 10);
            currUnflattened[currKey] = isNaN(nextKeyVal) ? {} : [];
        }

        currUnflattened = currUnflattened[currKey];
    }

    currUnflattened[keys[lastKeyIndex]] = value;
};

exports.default = { flattenate: flattenate, unflattenate: unflattenate };

/***/ })
/******/ ]);
});