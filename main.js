/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/boom.js":
/*!*********************!*\
  !*** ./src/boom.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Boom; });\n/* harmony import */ var _tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tool */ \"./src/tool.js\");\n/* harmony import */ var _fireworks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fireworks */ \"./src/fireworks.js\");\n\n\n\nconst ySpeedRange = [7, 20]; // y初始速度范围\nconst xSpeedRange = [0, 1]; // x初始速度范围\nconst yVelocity = 0.08; // y摩擦力\nconst xVelocity = 0.01; // x摩擦力\nconst shapeText = ['新年快乐', '阖家欢乐', '万事如意', '心想事成'];\n\nclass Boom {\n  // 爆炸后的烟花\n\n  // 是否已经爆炸\n  constructor(x, y, radius, type, boomArea, context, width, height) {\n    this.boomed = false;\n    this.finished = false;\n    this.fireworkses = [];\n\n    this.x = x;\n    this.y = y;\n    this.radius = radius;\n    this.type = type;\n    this.context = context;\n    this.width = width;\n    this.height = height;\n    this.boomArea = boomArea;\n    this.color = 'rgba(255, 228, 150, 0.3)';\n    this.vy = Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(...ySpeedRange); // y速度\n    this.vx = Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(...xSpeedRange); // x速度\n  }\n\n  /**\n   * 画发射过程中的散光\n   */\n  // 是否已经结束\n  drawLight() {\n    const ctx = this.context;\n    ctx.save();\n    ctx.beginPath();\n    ctx.fillStyle = this.color;\n    ctx.arc(this.x, this.y, this.radius + 3 * Math.random() + 1, 0, 2 * Math.PI);\n    ctx.fill();\n    ctx.restore();\n  }\n\n  draw() {\n    const ctx = this.context;\n    if (this.boomed) {\n      let finished = true;\n      this.fireworkses.forEach(fireworks => {\n        if (!fireworks.finished) {\n          fireworks.paint();\n          finished = false;\n        }\n      });\n      this.finished = finished;\n    } else {\n      this.drawLight();\n      ctx.save();\n      ctx.beginPath();\n      ctx.fillStyle = this.color;\n      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n      ctx.fill();\n      ctx.restore();\n    }\n  }\n\n  /**\n   * 移动\n   */\n  move() {\n    if (this.boomed) {\n      this.fireworkses.forEach(fireworks => fireworks.move());\n    } else {\n\n      const { boomArea } = this;\n      this.vy = this.vy - yVelocity;\n      this.vx = this.vx <= 0 ? this.vx : this.vx - xVelocity;\n      this.x = this.x + this.vx;\n      this.y = this.y - this.vy;\n\n      if (boomArea.y - this.y >= 0 || // 到爆炸区域爆炸\n      this.vy <= 0 && this.vx <= 0 // 速度为零爆炸\n      ) {\n          this.boom();\n        }\n    }\n  }\n\n  boom() {\n    this.boomed = true;\n    if (this.type <= 7) {\n      this.boomDefault();\n    } else {\n      this.boomText();\n    }\n  }\n\n  boomDefault() {\n    const fragNum = Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(30, 200);\n    const style = Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(0, 10) >= 5 ? 2 : 1;\n    let color;\n    if (style === 1) {\n      color = `rgba(${parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(128, 255))},${parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(128, 255))},${parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(128, 255))},1)`;\n    }\n\n    const range = parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(300, 400));\n    for (var i = 0; i < fragNum; i++) {\n      if (style === 2) {\n        color = `rgba(${parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(128, 255))},${parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(128, 255))},${parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(128, 255))},1)`;\n      }\n      var a = Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(-Math.PI, Math.PI);\n      var x = Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(0, range) * Math.cos(a) + this.x;\n      var y = Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(0, range) * Math.sin(a) + this.y;\n      var radius = Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(0, 2);\n      var fireworks = new _fireworks__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.x, this.y, radius, color, x, y, this.context);\n      this.fireworkses.push(fireworks);\n    }\n  }\n\n  boomText() {\n    const canvas = document.createElement('canvas');\n    canvas.width = this.width;\n    canvas.height = this.height;\n    const context = canvas.getContext('2d');\n    const text = shapeText[Math.round(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(0, shapeText.length - 1))];\n    context.save();\n    const fontSize = 200;\n    context.font = fontSize + \"px 宋体 bold\";\n    context.textAlign = \"center\";\n    context.textBaseline = \"middle\";\n    context.fillStyle = \"rgba(\" + parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(128, 255)) + \",\" + parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(128, 255)) + \",\" + parseInt(Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(128, 255)) + \" , 1)\";\n    context.fillText(text, canvas.width / 2, canvas.height / 2);\n    context.restore();\n    const dots = Object(_tool__WEBPACK_IMPORTED_MODULE_0__[\"getImageData\"])(context, this.width, this.height, 5);\n    const radius = 1;\n    const dx = canvas.width / 2 - this.x;\n    const dy = canvas.height / 2 - this.y;\n    dots.forEach(dot => {\n      const fireworks = new _fireworks__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.x, this.y, radius, `rgba(${dot.a},${dot.b},${dot.c},1)`, dot.x - dx, dot.y - dy, this.context);\n      this.fireworkses.push(fireworks);\n    });\n  }\n\n  paint() {\n    if (!this.finished) {\n      this.move();\n      this.draw();\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/boom.js?");

/***/ }),

/***/ "./src/fireworks.js":
/*!**************************!*\
  !*** ./src/fireworks.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Fireworks; });\nclass Fireworks {\n\n  constructor(centerX, centerY, radius, color, tx, ty, context) {\n    this.tx = tx;\n    this.ty = ty;\n    this.x = centerX;\n    this.y = centerY;\n    this.finished = false;\n    this.centerX = centerX;\n    this.centerY = centerY;\n    this.radius = radius;\n    this.color = color;\n    this.context = context;\n  }\n\n  paint() {\n    const ctx = this.context;\n    ctx.save();\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.restore();\n  }\n  move() {\n    this.ty = this.ty + 0.3;\n    const dx = this.tx - this.x,\n          dy = this.ty - this.y;\n    this.x = Math.abs(dx) < 0.1 ? this.tx : this.x + dx * 0.1;\n    this.y = Math.abs(dy) < 0.1 ? this.ty : this.y + dy * 0.1;\n    if (dx === 0 && Math.abs(dy) <= 80) {\n      this.finished = true;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/fireworks.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _boom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boom */ \"./src/boom.js\");\n/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./star */ \"./src/star.js\");\n/* harmony import */ var _tool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tool */ \"./src/tool.js\");\n\n\n\n\nclass Portal {\n  // 发射时间间隔\n\n  // 背景星星\n  constructor({ ele, width, height }) {\n    this.starCount = 40;\n    this.stars = [];\n    this.booms = [];\n    this.stepTime = 500;\n\n    this.canvas = document.getElementById(ele);\n    this.context = this.canvas.getContext('2d');\n    this.toolCanvasEle = document.createElement('canvas'); // 像素计算canvas\n    this.canvas.width = this.toolCanvasEle.width = width;\n    this.canvas.height = this.toolCanvasEle.height = height;\n    this.height = height;\n    this.width = width;\n    this.lastTime = new Date().getTime(); // 上一个烟花发射时间\n    this.initBg(); // 初始化背景\n  } // 烟花\n\n\n  initBg() {\n    const rangeX = [this.width / 10, this.width * 9 / 10];\n    const rangeY = [this.height / 10, this.height * 3 / 4];\n    const rangeRadius = [0.5, 1.5];\n    for (let index = 0; index < this.starCount; index++) {\n      const x = Object(_tool__WEBPACK_IMPORTED_MODULE_2__[\"getRandom\"])(...rangeX),\n            y = Object(_tool__WEBPACK_IMPORTED_MODULE_2__[\"getRandom\"])(...rangeY),\n            raduis = Object(_tool__WEBPACK_IMPORTED_MODULE_2__[\"getRandom\"])(...rangeRadius);\n      this.stars.push(new _star__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, y, raduis, this.context));\n    }\n    const ctx = this.context;\n    ctx.save();\n    ctx.fillStyle = 'rgba(0, 0, 0, 1)';\n    ctx.fillRect(0, 0, this.width, this.height);\n    ctx.restore();\n  }\n\n  drawStars() {\n    this.stars.forEach(star => star.paint());\n  }\n\n  clearForLongTail() {\n    // 长尾效果\n    const ctx = this.context;\n    ctx.save();\n    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';\n    ctx.fillRect(0, 0, this.width, this.height);\n    ctx.restore();\n  }\n\n  run() {\n    this.clearForLongTail();\n    this.drawStars();\n    const newTime = new Date().getTime();\n\n    if (newTime - this.lastTime > this.stepTime) {\n      const centerX = this.width / 2;\n      const boomType = Math.round(Object(_tool__WEBPACK_IMPORTED_MODULE_2__[\"getRandom\"])(1, 8));\n      const startXRange = [centerX - centerX / 8, centerX + centerX / 8];\n      const x = Object(_tool__WEBPACK_IMPORTED_MODULE_2__[\"getRandom\"])(...startXRange);\n      const radius = Object(_tool__WEBPACK_IMPORTED_MODULE_2__[\"getRandom\"])(2, 3);\n      const y = this.height + radius;\n      const leftRight = Object(_tool__WEBPACK_IMPORTED_MODULE_2__[\"getRandom\"])(0, 10) > 5 ? 1 : -1;\n      const boomArea = {\n        x: x + leftRight * this.width / 10,\n        y: Object(_tool__WEBPACK_IMPORTED_MODULE_2__[\"getRandom\"])(this.height / 8, this.height / 2)\n      };\n      this.booms.push(new _boom__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, radius, boomType, boomArea, this.context, this.width, this.height));\n      this.booms = this.booms.filter(boom => !boom.finished);\n      this.lastTime = newTime;\n    }\n\n    this.booms.forEach(boom => boom.paint());\n\n    Object(_tool__WEBPACK_IMPORTED_MODULE_2__[\"requestAnimationFrame\"])(this.run.bind(this));\n  }\n}\n\nnew Portal({\n  ele: 'canvas',\n  width: window.innerWidth,\n  height: window.innerHeight\n}).run();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/star.js":
/*!*********************!*\
  !*** ./src/star.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Star; });\n\n\nclass Star {\n  // 颜色\n\n  constructor(x, y, radius, context) {\n    this.color = \"rgba(255, 255, 255, 1)\";\n\n    this.x = x;\n    this.y = y;\n    this.radius = radius;\n    this.context = context;\n  }\n\n  paint() {\n    const ctx = this.context;\n    ctx.save();\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.restore();\n  }\n}\n\n//# sourceURL=webpack:///./src/star.js?");

/***/ }),

/***/ "./src/tool.js":
/*!*********************!*\
  !*** ./src/tool.js ***!
  \*********************/
/*! exports provided: getRandom, requestAnimationFrame, getImageData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandom\", function() { return getRandom; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"requestAnimationFrame\", function() { return requestAnimationFrame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getImageData\", function() { return getImageData; });\n\n// 根据范围获取随机数\nfunction getRandom(a, b) {\n  return Math.random() * (b - a) + a;\n}\n\nconst requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {\n  window.setTimeout(callback, 1000 / 60);\n};\n\nfunction getImageData(context, width, height, step) {\n  const imgData = context.getImageData(0, 0, width, height);\n  context.clearRect(0, 0, width, height);\n  const dots = [];\n  for (let i = 0; i < imgData.width; i += step) {\n    for (let j = 0; j < imgData.height; j += step) {\n      const k = (j * imgData.width + i) * 4;\n      if (imgData.data[k + 3] > 128) {\n        var dot = {\n          x: i,\n          y: j,\n          a: imgData.data[k],\n          b: imgData.data[k + 1],\n          c: imgData.data[k + 2]\n        };\n        dots.push(dot);\n      }\n    }\n  }\n  return dots;\n}\n\n//# sourceURL=webpack:///./src/tool.js?");

/***/ })

/******/ });