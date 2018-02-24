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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector2 {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }
    setTo(x, y) {
        this.x = x;
        this.y = y;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    normalize() {
        var t = Math.sqrt(this.x * this.x + this.y * this.y) + Vector2.ZERO_TOLERANCE;
        this.x /= t;
        this.y /= t;
        return t;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    lengthSqrd() {
        return this.x * this.x + this.y * this.y;
    }
    clampScalar(max) {
        var l = this.length();
        if (l > max) {
            this.multEquals(max / l);
        }
    }
    clampVector(v) {
        this.x = Math.min(Math.max(this.x, -v.x), v.x);
        this.y = Math.min(Math.max(this.y, -v.y), v.y);
    }
    plusEquals(v) {
        this.x += v.x;
        this.y += v.y;
    }
    minusEquals(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    multEquals(s) {
        this.x *= s;
        this.y *= s;
    }
    plusMultEquals(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
    }
    minusMultEquals(v, s) {
        this.x -= v.x * s;
        this.y -= v.y * s;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    leftHandNormal() {
        return new Vector2(this.y, -this.x);
    }
    leftHandNormalEquals() {
        var t = this.x;
        this.x = this.y;
        this.y = -t;
    }
    rightHandNormal() {
        return new Vector2(-this.y, this.x);
    }
    rightHandNormalEquals() {
        var t = this.x;
        this.x = -this.y;
        this.y = t;
    }
    reflectEquals(normal) {
        var d = this.dot(normal);
        this.x -= 2 * d * normal.x;
        this.y -= 2 * d * normal.y;
    }
    interpolate(v1, v2, t) {
        this.copy(v1);
        this.multEquals(1 - t);
        this.plusMultEquals(v2, t);
        // return v1.mult(1 - t).plus(v2.mult(t));
    }
    setAngle(angle) {
        var len = this.length();
        this.x = Math.cos(angle) * len;
        this.y = Math.sin(angle) * len;
    }
    rotateEquals(angle) {
        var a = angle * (Math.PI / 180);
        var cos = Math.cos(a);
        var sin = Math.sin(a);
        this.x = cos * this.x - sin * this.y;
        this.y = cos * this.y + sin * this.x;
    }
    setUnitRotation(angle) {
        var a = angle * (Math.PI / 180);
        this.x = Math.cos(a);
        this.y = Math.sin(a);
    }
    heading() {
        return Math.atan2(this.y, this.x);
    }
    distSqrd(v) {
        var dX = this.x - v.x;
        var dY = this.y - v.y;
        return dX * dX + dY * dY;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector2;

Vector2.ZERO_TOLERANCE = 1e-8;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class System {
    constructor(components) {
        this.members = new Map();
        // this.membersAsArray = new Array();
        this.components = components.map(factory => factory.name);
    }
    addEntity(entity, components) {
        const boundUpdate = this.updateEntity.bind(this, entity, ...components);
        const entry = { components, boundUpdate };
        this.members.set(entity, entry);
        // this.membersAsArray.push(entry);
        this.onEntityAdded(entity, ...components);
    }
    onEntityAdded(entity, ...components) { }
    removeEntity(entity) {
        if (!this.members.has(entity))
            return;
        const entry = this.members.get(entity);
        this.onEntityRemoved(entity, ...entry.components);
        this.members.delete(entity);
        // this.membersAsArray.splice(this.membersAsArray.indexOf(entry), 1);
    }
    onEntityRemoved(entity, ...components) { }
    updateSystem(dt) {
        this.dt = dt;
        this.preUpdate();
        this.updateAllEntities();
        this.postUpdate();
    }
    preUpdate() { }
    updateAllEntities() {
        for (let i of this.members.keys()) {
            this.members.get(i).boundUpdate();
        }
        // const len = this.membersAsArray.length;
        // for (let i=0; i<len; i++) {
        //     this.membersAsArray[i].boundUpdate();
        // }
    }
    postUpdate() { }
    updateEntity(entity, ...components) { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = System;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);

class Position {
    constructor(x, y) {
        this.coords = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](x, y);
        this.prevCoords = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](x, y);
        this.direction = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](1, 1);
    }
    update(position) {
        this.prevCoords.copy(this.coords);
        this.coords.copy(position);
    }
    clone() {
        var clone = new Position(this.coords.x, this.coords.y);
        clone.prevCoords.copy(this.prevCoords);
        clone.direction.copy(this.direction);
        return clone;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Position;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PhysicsBody {
    constructor(body, setMassFromVolume = false) {
        this.body = body;
        this.setMassFromVolume = setMassFromVolume;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsBody;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);

class Extents {
    constructor(width, height, offsetX = 0, offsetY = 0) {
        this.halfWidths = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](width, height);
        this.offset = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](offsetX, offsetY);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Extents;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DIsplayObject__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_AABB2__ = __webpack_require__(6);


class DisplayObjectContainer extends __WEBPACK_IMPORTED_MODULE_0__DIsplayObject__["a" /* DisplayObject */] {
    constructor() {
        super();
        this.subTreeAABB = new __WEBPACK_IMPORTED_MODULE_1__geom_AABB2__["a" /* AABB2 */]();
        this.childCount = 0;
    }
    addChild(child) {
        if (child.parent != null)
            child.parent.removeChild(child);
        this.insertEnd(child);
        this.childAdded(child);
    }
    addChildAt(child, index) {
        if (index >= this.childCount) {
            this.addChild(child);
            return;
        }
        if (index == 0) {
            this.insertBeginning(child);
        }
        else {
            this.insertBefore(this.findChildByIndex(index), child);
        }
        this.childAdded(child);
    }
    childAdded(child) {
        this.childCount++;
        child.parent = this;
    }
    findChildByIndex(index) {
        var child = this.head;
        var count = 0;
        while (child != null) {
            if (count++ == index)
                return child;
            child = child.next;
        }
        return this.tail;
    }
    removeChild(child) {
        if (child.parent == this) {
            this.remove(child);
            this.childRemoved(child);
        }
    }
    removeChildAt(index) {
        var child = this.findChildByIndex(index);
        this.removeChild(child);
        return child;
    }
    childRemoved(child) {
        this.childCount--;
        child.parent = null;
    }
    updateTransform() {
        //Reset AABB
        this.aabb.reset();
        super.updateTransform();
        this.calcExtents();
        this.subTreeAABB.reset();
        this.subTreeAABB.addAABB(this.aabb);
        //Expand AAABB to this DisplayObject -> New required
        var child = this.head;
        while (child != null) {
            child.updateTransform();
            //Inflate this AABB to encapsulate child
            this.subTreeAABB.addAABB(child.aabb);
            child = child.next;
        }
    }
    // public apply(slot:DisplayObject->Dynamic->Void,p:Dynamic=null) {
    // }
    //TODO Probably get rid of this...
    //Linked Lists
    insertAfter(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next == null)
            this.tail = newNode;
        else
            node.next.prev = newNode;
        node.next = newNode;
    }
    insertBefore(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev == null)
            this.head = newNode;
        else
            node.prev.next = newNode;
        node.prev = newNode;
    }
    insertBeginning(newNode) {
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
            newNode.prev = null;
            newNode.next = null;
        }
        else
            this.insertBefore(this.head, newNode);
    }
    insertEnd(newNode) {
        if (this.tail == null)
            this.insertBeginning(newNode);
        else
            this.insertAfter(this.tail, newNode);
    }
    remove(node) {
        if (node.prev == null)
            this.head = node.next;
        else
            node.prev.next = node.next;
        if (node.next == null)
            this.tail = node.prev;
        else
            node.next.prev = node.prev;
        node.prev = node.next = null;
    }
    debug() {
        var child = this.head;
        while (child != null) {
            child = child.next;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DisplayObjectContainer;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AABB2 {
    constructor(t = 0.0, r = 0.0, b = 0.0, l = 0.0) {
        this.l = Number.POSITIVE_INFINITY;
        this.t = Number.POSITIVE_INFINITY;
        this.r = Number.NEGATIVE_INFINITY;
        this.b = Number.NEGATIVE_INFINITY;
        this.t = t;
        this.r = r;
        this.b = b;
        this.l = l;
    }
    setToSweeptAABB(aabb, preditcedPosition) {
        this.l = aabb.position.x - aabb.extents.x;
        this.r = aabb.position.x + aabb.extents.x;
        this.t = aabb.position.y - aabb.extents.y;
        this.b = aabb.position.y + aabb.extents.y;
    }
    fromAABB(aabb) { }
    clone() {
        return new AABB2(this.t, this.r, this.b, this.l);
    }
    reset() {
        this.t = this.l = Number.POSITIVE_INFINITY;
        this.r = this.b = Number.NEGATIVE_INFINITY;
    }
    get width() {
        return this.r - this.l;
    }
    get height() {
        return this.b - this.t;
    }
    intersect(aabb) {
        if (this.l > aabb.r)
            return false;
        else if (this.r < aabb.l)
            return false;
        else if (this.t > aabb.b)
            return false;
        else if (this.b < aabb.t)
            return false;
        else
            return true;
    }
    addAABB(aabb) {
        if (aabb.t < this.t)
            this.t = aabb.t;
        if (aabb.r > this.r)
            this.r = aabb.r;
        if (aabb.b > this.b)
            this.b = aabb.b;
        if (aabb.l < this.l)
            this.l = aabb.l;
    }
    addPoint(x, y) {
        if (x < this.l)
            this.l = x;
        if (x > this.r)
            this.r = x;
        if (y < this.t)
            this.t = y;
        if (y > this.b)
            this.b = y;
    }
    fitPoint(point) {
        if (point.x < this.l)
            point.x = this.l;
        if (point.x > this.r)
            point.x = this.r;
        if (point.y < this.t)
            point.y = this.t;
        if (point.y > this.b)
            point.y = this.b;
    }
    expand(i) {
        this.l -= i / 2;
        this.r += i / 2;
        this.t -= i / 2;
        this.b += i / 2;
    }
    expand2(width, height) {
        this.l += width / 2;
        this.r -= width / 2;
        this.t += height / 2;
        this.b -= height / 2;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AABB2;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_BFProxy__ = __webpack_require__(62);

class PhysicsCollision {
    constructor(isSensor, filter, contactCallbacks, limitToStaticCheck = false) {
        this.proxy = new __WEBPACK_IMPORTED_MODULE_0__collision_BFProxy__["a" /* BFProxy */]();
        this.proxy.isSensor = isSensor;
        this.proxy.filter = filter;
        this.proxy.contactCallbacks = contactCallbacks;
        this.proxy.limitToStaticCheck = limitToStaticCheck;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsCollision;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Graphics {
    constructor(frameListId) {
        this.frameListId = frameListId;
        this.initialFrameId = null;
    }
    setFrame(value) {
        this.frame = value;
        if (this.sprite != null) {
            this.frame.updateSprite(this.sprite);
        }
    }
    setFrameId(id) {
        this.frame = this.frameList.getFrame(id);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Graphics;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Rectangle {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rectangle;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CompileVertexShader */
/* unused harmony export CompileFragmentShader */
/* unused harmony export CompileShader */
/* harmony export (immutable) */ __webpack_exports__["a"] = CompileProgram;
function CompileVertexShader(gl, shaderSrc) {
    return CompileShader(gl, shaderSrc, WebGLRenderingContext.VERTEX_SHADER);
}
function CompileFragmentShader(gl, shaderSrc) {
    return CompileShader(gl, shaderSrc, WebGLRenderingContext.FRAGMENT_SHADER);
}
function CompileShader(gl, shaderSrc, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS)) {
        window.alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
function CompileProgram(gl, vertexSrc, fragmentSrc) {
    var vertexShader = CompileVertexShader(gl, vertexSrc);
    var fragmentShader = CompileFragmentShader(gl, fragmentSrc);
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, WebGLRenderingContext.LINK_STATUS)) {
        window.alert("Could not initialize program");
    }
    return shaderProgram;
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ShaderWrapper {
    constructor(gl, program) {
        this.program = program;
        gl.useProgram(this.program);
        this.attribute = {};
        this.uniform = {};
        var cnt = gl.getProgramParameter(program, WebGLRenderingContext.ACTIVE_ATTRIBUTES);
        var i = 0;
        while (i < cnt) {
            var attrib = gl.getActiveAttrib(program, i);
            this.attribute[attrib.name] = gl.getAttribLocation(program, attrib.name);
            i++;
        }
        cnt = gl.getProgramParameter(program, WebGLRenderingContext.ACTIVE_UNIFORMS);
        i = 0;
        while (i < cnt) {
            var attrib = gl.getActiveUniform(program, i);
            this.uniform[attrib.name] = gl.getUniformLocation(program, attrib.name);
            i++;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ShaderWrapper;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector2__ = __webpack_require__(0);

class AABB {
    constructor() {
        this.position = new __WEBPACK_IMPORTED_MODULE_0__Vector2__["a" /* Vector2 */]();
        this.extents = new __WEBPACK_IMPORTED_MODULE_0__Vector2__["a" /* Vector2 */]();
    }
    get l() {
        return this.position.x - this.extents.x;
    }
    get t() {
        return this.position.y - this.extents.y;
    }
    get r() {
        return this.position.x + this.extents.x;
    }
    get b() {
        return this.position.y + this.extents.y;
    }
    /*
     *  Standard AABB overlap.  Only returns a boolean, which isnt much use if you need to actually resolve anything.
     */
    overlap(aabb) {
        if (Math.abs(this.position.x - aabb.position.x) > (this.extents.x + aabb.extents.x))
            return false;
        if (Math.abs(this.position.y - aabb.position.y) > (this.extents.y + aabb.extents.y))
            return false;
        return true;
    }
    containsAABB(aabb) {
        return false;
    }
    containsPoint(point) {
        return (Math.abs(point.x - this.position.x) < this.extents.x && Math.abs(point.y - this.position.y) < this.extents.y);
    }
    overlapArea(aabb) {
        var _l = Math.max(this.l, aabb.l);
        var _r = Math.min(this.r, aabb.r);
        var _t = Math.max(this.t, aabb.t);
        var _b = Math.min(this.b, aabb.b);
        return (_r - _l) * (_b - _t);
    }
    area() {
        return this.extents.x * this.extents.y * 4;
    }
    clone(aabb) {
        var aabb = new AABB();
        aabb.position.copy(this.position);
        aabb.extents.copy(this.extents);
        return aabb;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AABB;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Fixed {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fixed;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Moveable {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Moveable;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Active {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Active;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BaseTexture {
    constructor(gl, width, height, floatingPonumber = false) {
        this.gl = gl;
        this.powerOfTwo = false;
        this.width = width;
        this.height = height;
        this.RegisterTexture(floatingPonumber);
    }
    RegisterTexture(fp) {
        if (this.texture == null)
            this.texture = this.gl.createTexture();
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.texture);
        this.gl.pixelStorei(WebGLRenderingContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        // this.gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, 1);
        this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);
        this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
        if (this.powerOfTwo) {
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.REPEAT);
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.REPEAT);
        }
        else {
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.CLAMP_TO_EDGE);
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.CLAMP_TO_EDGE);
        }
        // this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D,null);
        //this.gl.texImage2D(WebGLRenderingContext.TEXTURE_2D,0,WebGLRenderingContext.RGBA,WebGLRenderingContext.RGBA,WebGLRenderingContext.UNSIGNED_BYTE,source);
        this.gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, this.width, this.height, 0, WebGLRenderingContext.RGBA, fp ? WebGLRenderingContext.FLOAT : WebGLRenderingContext.UNSIGNED_BYTE, null);
    }
    static FromImage(gl, image) {
        var texture = new BaseTexture(gl, image.width, image.height);
        gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, image);
        return texture;
    }
    bind(unit) {
        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0 + unit);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.texture);
    }
    unbind(unit) {
        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0 + unit);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, null);
    }
    drawTo(callback) {
        //var v = this.gl.getParameter(WebGLRenderingContext.VIEWPORT);
        if (this.framebuffer == null)
            this.framebuffer = this.gl.createFramebuffer();
        if (this.renderbuffer == null)
            this.renderbuffer = this.gl.createRenderbuffer();
        this.gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, this.framebuffer);
        this.gl.bindRenderbuffer(WebGLRenderingContext.RENDERBUFFER, this.renderbuffer);
        if (this.width != this.renderbuffer.width || this.height != this.renderbuffer.height) {
            this.renderbuffer.width = this.width;
            this.renderbuffer.height = this.height;
            this.gl.renderbufferStorage(WebGLRenderingContext.RENDERBUFFER, WebGLRenderingContext.DEPTH_COMPONENT16, this.width, this.height);
            this.gl.framebufferTexture2D(WebGLRenderingContext.FRAMEBUFFER, WebGLRenderingContext.COLOR_ATTACHMENT0, WebGLRenderingContext.TEXTURE_2D, this.texture, 0);
            this.gl.framebufferRenderbuffer(WebGLRenderingContext.FRAMEBUFFER, WebGLRenderingContext.DEPTH_ATTACHMENT, WebGLRenderingContext.RENDERBUFFER, this.renderbuffer);
        }
        this.gl.viewport(0, 0, this.width, this.height);
        callback();
        this.gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
        this.gl.bindRenderbuffer(WebGLRenderingContext.RENDERBUFFER, null);
        // this.gl.viewport(v[0], v[1], v[2], v[3]);
        this.gl.viewport(0, 0, 800, 640);
    }
    UnregisterTexture(gl) {
        if (this.texture != null) {
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseTexture;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Rectangle__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__ = __webpack_require__(0);


class Texture {
    constructor(baseTexture, frame, pivot = null) {
        this.noFrame = false;
        this.baseTexture = baseTexture;
        if (frame == null) {
            this.noFrame = true;
            this.frame = new __WEBPACK_IMPORTED_MODULE_0__geom_Rectangle__["a" /* Rectangle */](0, 0, 1, 1);
        }
        else {
            this.frame = frame;
        }
        this.trim = new __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__["a" /* Vector2 */]();
        this.pivot = pivot == null ? new __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__["a" /* Vector2 */]() : pivot;
        this.uvs = new Float32Array(8);
        this.updateUVS();
    }
    updateUVS() {
        var tw = this.baseTexture.width;
        var th = this.baseTexture.height;
        this.uvs[0] = this.frame.x / tw;
        this.uvs[1] = this.frame.y / th;
        this.uvs[2] = (this.frame.x + this.frame.width) / tw;
        this.uvs[3] = this.frame.y / th;
        this.uvs[4] = (this.frame.x + this.frame.width) / tw;
        this.uvs[5] = (this.frame.y + this.frame.height) / th;
        this.uvs[6] = this.frame.x / tw;
        this.uvs[7] = (this.frame.y + this.frame.height) / th;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Texture;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DisplayObjectContainer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__ = __webpack_require__(0);


class Sprite extends __WEBPACK_IMPORTED_MODULE_0__DisplayObjectContainer__["a" /* DisplayObjectContainer */] {
    constructor() {
        super();
        this.renderable = true;
        this.anchor = new __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__["a" /* Vector2 */]();
        this.transformedVerts = new Float32Array(8);
    }
    calcExtents() {
        var width = this.texture.frame.width;
        var height = this.texture.frame.height;
        var aX = this.anchor.x;
        var aY = this.anchor.y;
        var w0 = width * (1 - aX);
        var w1 = width * -aX;
        var h0 = height * (1 - aY);
        var h1 = height * -aY;
        var a = this.worldTransform[0];
        var b = this.worldTransform[3];
        var c = this.worldTransform[1];
        var d = this.worldTransform[4];
        var tx = this.worldTransform[2];
        var ty = this.worldTransform[5];
        this.transformedVerts[0] = a * w1 + c * h1 + tx;
        this.transformedVerts[1] = d * h1 + b * w1 + ty;
        this.transformedVerts[2] = a * w0 + c * h1 + tx;
        this.transformedVerts[3] = d * h1 + b * w0 + ty;
        this.transformedVerts[4] = a * w0 + c * h0 + tx;
        this.transformedVerts[5] = d * h0 + b * w0 + ty;
        this.transformedVerts[6] = a * w1 + c * h0 + tx;
        this.transformedVerts[7] = d * h0 + b * w1 + ty;
        for (var i = 0; i < 4; i++) {
            this.aabb.addPoint(this.transformedVerts[i * 2], this.transformedVerts[i * 2 + 1]);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TypedArray2D {
    constructor(width, height, buffer = null) {
        this.w = width;
        this.h = height;
        if (buffer == null)
            this.buffer = new ArrayBuffer(this.w * this.h * 4);
        else
            this.buffer = buffer;
        this.data32 = new Uint32Array(this.buffer);
        this.data8 = new Uint8Array(this.buffer);
    }
    get(x, y) {
        return this.data32[y * this.w + x];
    }
    set(x, y, v) {
        this.data32[y * this.w + x] = v;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TypedArray2D;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GraphicsAnimation {
    constructor(frameListId, animationId) {
        this.frameListId = frameListId;
        this.animationId = animationId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GraphicsAnimation;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);

class Contact {
    constructor() {
        this.position = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.delta = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.normal = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.distance = 0;
        this.time = 0;
        this.sweepPosition = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
    }
    setTo(contact) {
        this.position.x = contact.position.x;
        this.position.y = contact.position.y;
        this.delta.x = contact.delta.x;
        this.delta.y = contact.delta.y;
        this.normal.x = contact.normal.x;
        this.normal.y = contact.normal.y;
        this.time = contact.time;
        this.distance = contact.distance;
        this.sweepPosition.x = contact.sweepPosition.x;
        this.sweepPosition.y = contact.sweepPosition.y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Contact;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Contact__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Filter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geom_Vector2__ = __webpack_require__(0);



const contact = new __WEBPACK_IMPORTED_MODULE_0__Contact__["a" /* Contact */]();
const epsilon = 1e-8;
let collideCount = 0;
const Collide = function (proxyA, proxyB) {
    collideCount++;
    //Exit on static vs statics, they should never be sent but you never know
    //Sensors dont trigger other sensors
    if ((proxyA.isStatic && proxyB.isStatic) || (proxyA.isSensor && proxyB.isSensor))
        return false;
    if (!proxyA.isActive || !proxyB.isActive)
        return false;
    //Do filtering
    if (!__WEBPACK_IMPORTED_MODULE_1__Filter__["a" /* Filter */].CHECK(proxyA.filter, proxyB.filter))
        return false;
    var collided = false;
    if (proxyA.isSensor || proxyB.isSensor) {
        //One is a sensor so just check for overlap
        collided = StaticAABBvsStaticAABB(proxyA.aabb.position, proxyA.aabb.extents, proxyB.aabb.position, proxyB.aabb.extents, contact);
        //TODO should we make a special case for bullets?
    }
    else if (!proxyA.isStatic && !proxyB.isStatic) {
        //Both are dynamic, which means both have bodies
        if (proxyA.body.isBullet && proxyB.body.isBullet) {
            //Both bullets? for now nothing
            return false;
        }
        else if (proxyA.body.isBullet) {
            //Just A is a bullet
            if (StaticAABBvsSweeptAABB(proxyB.aabb.position, proxyB.aabb.extents, proxyA.aabb.position, proxyA.aabb.extents, proxyA.body.delta, contact) == true) {
                proxyA.body.respondBulletCollision(contact);
                collided = true;
            }
        }
        else if (proxyB.body.isBullet) {
            //Just B is a bullet
            if (StaticAABBvsSweeptAABB(proxyA.aabb.position, proxyA.aabb.extents, proxyB.aabb.position, proxyB.aabb.extents, proxyB.body.delta, contact) == true) {
                proxyB.body.respondBulletCollision(contact);
                collided = true;
            }
        }
        else {
            //Regular dynamic<>dynamic
            collided = StaticAABBvsStaticAABB(proxyA.aabb.position, proxyA.aabb.extents, proxyB.aabb.position, proxyB.aabb.extents, contact);
        }
    }
    else {
        //Were just left with static<>dynamic collisions
        //Order them
        var staticProxy, dynamicProxy;
        if (proxyA.isStatic) {
            staticProxy = proxyA;
            dynamicProxy = proxyB;
        }
        else {
            staticProxy = proxyB;
            dynamicProxy = proxyA;
        }
        //Test
        if (dynamicProxy.body.isBullet) {
            collided = BulletAABB(dynamicProxy, staticProxy);
            if (collided) {
                dynamicProxy.body.respondBulletCollision(contact);
            }
        }
        else {
            AABBvsStaticSolidAABB(dynamicProxy.aabb.position, dynamicProxy.aabb.extents, staticProxy.aabb.position, staticProxy.aabb.extents, staticProxy.responseBias, contact);
            //We have to the response process and get the result
            collided = dynamicProxy.body.respondStaticCollision(contact);
        }
    }
    if (collided == true) {
        proxyA.collide(proxyB, contact);
        proxyB.collide(proxyA, contact);
    }
    return collided;
};
/* harmony export (immutable) */ __webpack_exports__["c"] = Collide;

const BulletAABB = function (segmentProxy, staticProxy) {
    // return StaticSegmentvsStaticAABB(staticProxy.aabb.position,staticProxy.aabb.extents,segmentProxy.body.position,segmentProxy.body.delta,0,0,contact);
    return StaticAABBvsSweeptAABB(staticProxy.aabb.position, staticProxy.aabb.extents, segmentProxy.aabb.position, segmentProxy.aabb.extents, segmentProxy.body.delta, contact);
};
/* unused harmony export BulletAABB */

const RayAABB = function (ray, proxy) {
    if (StaticSegmentvsStaticAABB(proxy.aabb.position, proxy.aabb.extents, ray.origin, ray.delta, 0, 0, contact)) {
        ray.report(contact.delta.x, contact.delta.y, contact.normal.x, contact.normal.y, proxy);
        return true;
    }
    return false;
};
/* harmony export (immutable) */ __webpack_exports__["e"] = RayAABB;

const Spring = function (bodyA, bodyB, length, k) {
    var dx = bodyA.position.x - bodyB.position.x;
    var dy = bodyA.position.y - bodyB.position.y;
    // But, we need to account for 'rest length' being `l` not 0
    // Normalize dx and dy to length 1; purely directional. `_n` means 'normalized' here
    var dist = Math.sqrt(dx * dx + dy * dy); //+0.000001;
    if (dist < length)
        return;
    var dx_n = dx / dist;
    var dy_n = dy / dist;
    var true_offset = dist - length;
    dx_n *= true_offset;
    dy_n *= true_offset;
    var fx = k * dx_n;
    var fy = k * dy_n;
    bodyA.addForce(new __WEBPACK_IMPORTED_MODULE_2__geom_Vector2__["a" /* Vector2 */](fx, fy));
    bodyB.addForce(new __WEBPACK_IMPORTED_MODULE_2__geom_Vector2__["a" /* Vector2 */](-fx, -fy));
    // bodyA.collisionForce.plusEquals(new Vector2(fx,fy));
    // bodyB.collisionForce.plusEquals(new Vector2(-fx,-fy));
};
/* unused harmony export Spring */

const StaticAABBvsStaticAABB = function (aabb_position_A, aabb_extents_A, aabb_position_B, aabb_extents_B, contact) {
    var dx = aabb_position_B.x - aabb_position_A.x;
    var px = aabb_extents_B.x + aabb_extents_A.x - Math.abs(dx);
    if (px <= 0)
        return false;
    var dy = aabb_position_B.y - aabb_position_A.y;
    var py = aabb_extents_B.y + aabb_extents_A.y - Math.abs(dy);
    if (py <= 0)
        return false;
    if (px < py) {
        var sx = dx < 0 ? -1 : 1;
        contact.distance = contact.delta.x = px * sx;
        contact.delta.y = 0;
        contact.normal.x = sx;
        contact.normal.y = 0;
        contact.position.x = aabb_position_A.x + aabb_extents_A.x * sx;
        contact.position.y = aabb_position_B.y;
    }
    else {
        var sy = dy < 0 ? -1 : 1;
        contact.delta.x = 0;
        contact.distance = contact.delta.y = py * sy;
        contact.normal.x = 0;
        contact.normal.y = sy;
        contact.position.x = aabb_position_B.x;
        contact.position.y = aabb_position_A.y + aabb_extents_A.y * sy;
    }
    return true;
};
/* unused harmony export StaticAABBvsStaticAABB */

const IsSegVsAABB = function (segment, aabb_position, aabb_extents, paddingX, paddingY) {
    return IsStaticSegmentvsStaticAABB(aabb_position, aabb_extents, segment.start, segment.scale, segment.sign, paddingX, paddingY);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = IsSegVsAABB;

const IsStaticSegmentvsStaticAABB = function (aabb_position, aabb_extents, segment_position, scale, sign, paddingX, paddingY) {
    // var scale.x = 1/segment_delta.x;
    // var scale.y = 1/segment_delta.y;
    // var sign.x = scale.x<0 ? -1 : 1;
    // var sign.y = scale.y<0 ? -1 : 1;
    var nearTimeX = (aabb_position.x - sign.x * (aabb_extents.x + paddingX) - segment_position.x) * scale.x;
    var nearTimeY = (aabb_position.y - sign.y * (aabb_extents.y + paddingY) - segment_position.y) * scale.y;
    var farTimeX = (aabb_position.x + sign.x * (aabb_extents.x + paddingX) - segment_position.x) * scale.x;
    var farTimeY = (aabb_position.y + sign.y * (aabb_extents.y + paddingY) - segment_position.y) * scale.y;
    if (nearTimeX > farTimeY || nearTimeY > farTimeX)
        return false;
    var nearTime = Math.max(nearTimeX, nearTimeY);
    var farTime = Math.min(farTimeX, farTimeY);
    if (nearTime >= 1 || farTime <= 0)
        return false;
    return true;
};
/* unused harmony export IsStaticSegmentvsStaticAABB */

const StaticSegmentvsStaticAABB = function (aabb_position, aabb_extents, segment_position, segment_delta, paddingX, paddingY, contact) {
    var scaleX = 1 / segment_delta.x;
    var scaleY = 1 / segment_delta.y;
    var signX = scaleX < 0 ? -1 : 1;
    var signY = scaleY < 0 ? -1 : 1;
    var nearTimeX = (aabb_position.x - signX * (aabb_extents.x + paddingX) - segment_position.x) * scaleX;
    var nearTimeY = (aabb_position.y - signY * (aabb_extents.y + paddingY) - segment_position.y) * scaleY;
    var farTimeX = (aabb_position.x + signX * (aabb_extents.x + paddingX) - segment_position.x) * scaleX;
    var farTimeY = (aabb_position.y + signY * (aabb_extents.y + paddingY) - segment_position.y) * scaleY;
    if (nearTimeX > farTimeY || nearTimeY > farTimeX)
        return false;
    var nearTime = Math.max(nearTimeX, nearTimeY);
    var farTime = Math.min(farTimeX, farTimeY);
    if (nearTime >= 1 || farTime <= 0)
        return false;
    contact.time = Math.min(Math.max(nearTime, 0), 1);
    if (nearTimeX > nearTimeY) {
        contact.normal.x = -signX;
        contact.normal.y = 0;
    }
    else {
        contact.normal.x = 0;
        contact.normal.y = -signY;
    }
    contact.delta.x = contact.time * segment_delta.x;
    contact.delta.y = contact.time * segment_delta.y;
    contact.position.x = segment_position.x + contact.delta.x;
    contact.position.y = segment_position.y + contact.delta.y;
    return true;
};
/* unused harmony export StaticSegmentvsStaticAABB */

const StaticAABBvsSweeptAABB = function (aabb_position_A, aabb_extents_A, aabb_position_B, aabb_extents_B, aabb_delta_B, contact) {
    if (aabb_delta_B.x == 0 && aabb_delta_B.y == 0) {
        contact.sweepPosition.x = aabb_position_B.x;
        contact.sweepPosition.y = aabb_position_B.y;
        if (StaticAABBvsStaticAABB(aabb_position_A, aabb_extents_A, aabb_position_B, aabb_extents_B, contact)) {
            contact.time = 0;
            return true;
        }
        else {
            contact.time = 1;
            return false;
        }
    }
    else {
        if (StaticSegmentvsStaticAABB(aabb_position_A, aabb_extents_A, aabb_position_B, aabb_delta_B, aabb_extents_B.x, aabb_extents_B.y, contact)) {
            contact.time = Math.min(Math.max(contact.time - epsilon, 0), 1);
            contact.sweepPosition.x = aabb_position_B.x + aabb_delta_B.x * contact.time;
            contact.sweepPosition.y = aabb_position_B.y + aabb_delta_B.y * contact.time;
            //Inline expanded normalize to avoid object creation
            var t = Math.sqrt(aabb_delta_B.x * aabb_delta_B.x + aabb_delta_B.y * aabb_delta_B.y);
            contact.position.x += aabb_delta_B.x / t * aabb_extents_B.x;
            contact.position.y += aabb_delta_B.y / t * aabb_extents_B.y;
            return true;
        }
        else {
            contact.sweepPosition.x = aabb_position_B.x * aabb_delta_B.x;
            contact.sweepPosition.y = aabb_position_B.y * aabb_delta_B.y;
            return false;
        }
    }
};
/* harmony export (immutable) */ __webpack_exports__["f"] = StaticAABBvsSweeptAABB;

const AABBvsStaticSolidAABB = function (aabb_position_A, aabb_extents_A, aabb_position_B, aabb_extents_B, bias, contact) {
    //New overlap code, handle corners better
    var dx = aabb_position_B.x - aabb_position_A.x;
    var px = aabb_extents_B.x + aabb_extents_A.x - Math.abs(dx);
    var dy = aabb_position_B.y - aabb_position_A.y;
    var py = aabb_extents_B.y + aabb_extents_A.y - Math.abs(dy);
    if (px < py) {
        contact.normal.x = dx < 0 ? 1 : -1;
        contact.normal.y = 0;
    }
    else {
        contact.normal.x = 0;
        contact.normal.y = dy < 0 ? 1 : -1;
    }
    contact.normal.x *= bias.x;
    contact.normal.y *= bias.y;
    // var dx = aabb_position_B.x - aabb_position_A.x;
    // var dy = aabb_position_B.y - aabb_position_A.y;
    // if (dx*dx>dy*dy) {
    //     contact.normal.x = dx>=0 ? -1: 1;
    //     contact.normal.y = 0;
    // } else {
    //     contact.normal.x = 0;
    //     contact.normal.y = dy>=0 ? -1 : 1;
    // }
    var pcx = contact.normal.x * (aabb_extents_A.x + aabb_extents_B.x) + aabb_position_B.x;
    var pcy = contact.normal.y * (aabb_extents_A.y + aabb_extents_B.y) + aabb_position_B.y;
    var pdx = aabb_position_A.x - pcx;
    var pdy = aabb_position_A.y - pcy;
    contact.distance = pdx * contact.normal.x + pdy * contact.normal.y;
    return true;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = AABBvsStaticSolidAABB;

// public static Stairs(aabb_position_A:Vector2,aabb_extents_A:Vector2,aabb_position_B:Vector2,aabb_extents_B:Vector2,bias:Vector2,contact:Contact):number {
//      //New overlap code, handle corners better
//      var dx = aabb_position_B.x - aabb_position_A.x;
//      var px = (aabb_extents_B.x + aabb_extents_A.x) - Math.abs(dx);
//      var dy = aabb_position_B.y - aabb_position_A.y;
//      var py = (aabb_extents_B.y + aabb_extents_A.y) - Math.abs(dy);
//      if (px<py) {
//          contact.normal.x = dx<0 ? 1 : -1;
//          contact.normal.y = 0;
//      } else {
//          contact.normal.x = 0;
//          contact.normal.y = dy<0 ? 1 : -1;
//      }
//      contact.normal.x = 0;
//      contact.normal.y = -1;
//      var pcx = (contact.normal.x * (aabb_extents_A.x+aabb_extents_B.x) ) + aabb_position_B.x;
//      var pcy = (contact.normal.y * (aabb_extents_A.y+aabb_extents_B.y) ) + aabb_position_B.y;
//      var pdx = aabb_position_A.x - pcx;
//      var pdy = aabb_position_A.y - pcy;
//      contact.distance = pdx*contact.normal.x + pdy*contact.normal.y;
//      if (px<py) {
//          return dx<0 ? 1 : -1;
//      }
//      return 0;
//  }
/*
    This is seperate to avoid overcomplicating the above with too much branching
    */
const AABBvsStaticSolidAABBFixedNormal = function (aabb_position_A, aabb_extents_A, aabb_position_B, aabb_extents_B, normal, contact) {
    contact.normal.copy(normal);
    var pcx = contact.normal.x * (aabb_extents_A.x + aabb_extents_B.x) + aabb_position_B.x;
    var pcy = contact.normal.y * (aabb_extents_A.y + aabb_extents_B.y) + aabb_position_B.y;
    var pdx = aabb_position_A.x - pcx;
    var pdy = aabb_position_A.y - pcy;
    contact.distance = pdx * contact.normal.x + pdy * contact.normal.y;
    return true;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = AABBvsStaticSolidAABBFixedNormal;

const AABBvsStaticSolidAABBSlope = function (aabb_position_A, aabb_extents_A, aabb_position_B, aabb_extents_B, bias, contact) {
    var _sqr = 0.70710678118655;
    //New overlap code, handle corners better
    var dx = aabb_position_B.x - aabb_position_A.x;
    var px = aabb_extents_B.x + aabb_extents_A.x - Math.abs(dx);
    var dy = aabb_position_B.y - aabb_position_A.y;
    var py = aabb_extents_B.y + aabb_extents_A.y - Math.abs(dy);
    // if (px<py) {
    //     contact.normal.x = dx<0 ? 1 : -1;
    //     contact.normal.y = 0;
    // } else {
    //     contact.normal.x = 0;
    //     contact.normal.y = dy<0 ? 1 : -1;
    // }
    // contact.normal.x *= bias.x;
    // contact.normal.y *= bias.y;
    contact.normal.x = -_sqr;
    contact.normal.y = -_sqr;
    // var dx = aabb_position_B.x - aabb_position_A.x;
    // var dy = aabb_position_B.y - aabb_position_A.y;
    // if (dx*dx>dy*dy) {
    //     contact.normal.x = dx>=0 ? -1: 1;
    //     contact.normal.y = 0;
    // } else {
    //     contact.normal.x = 0;
    //     contact.normal.y = dy>=0 ? -1 : 1;
    // }
    var pcx = contact.normal.x * (aabb_extents_A.x + aabb_extents_B.x) + aabb_position_B.x;
    var pcy = contact.normal.y * (aabb_extents_A.y + aabb_extents_B.y) + aabb_position_B.y;
    var pdx = aabb_position_A.x - pcx - 8;
    var pdy = aabb_position_A.y - pcy;
    contact.distance = pdx * contact.normal.x + pdy * contact.normal.y;
    return true;
};


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Filter {
    //e.g.
    //player.filter.categoryBits = 0x0002
    //player.filter.maskBits     = 0x0004
    //
    //enemy.filter.categoryBits  = 0x0004
    //enemy.filter.maskBits      = 0x0002
    //
    //Here, players an enemies will collide
    //overever players wont collide with player or monsters with mosters
    constructor(categoryBits = 0x1, maskBits = 0xffffffff, groupIndex = 0x0) {
        //Two positive and equal group indexs always collide
        //Two negative and equal group indexs never collide
        //Two zero group indexs are passed through
        this.groupIndex = 0;
        //What category this filter is in
        this.categoryBits = 0x0001;
        //What other categories it can collide with
        this.maskBits = 0xffffffff;
        this.categoryBits = categoryBits;
        this.maskBits = maskBits;
        this.groupIndex = groupIndex;
    }
    static CHECK(filterA, filterB) {
        if (filterA == null || filterB == null)
            return true;
        // if ((filterA.groupIndex > 0 && filterB.groupIndex > 0 && filterA.groupIndex == filterB.groupIndex)) {
        //     return false;
        // }
        if (filterA.groupIndex == filterB.groupIndex && filterA.groupIndex != 0)
            return filterA.groupIndex > 0;
        return (filterA.maskBits & filterB.categoryBits) != 0 && (filterA.categoryBits & filterB.maskBits) != 0;
        // else {
        //     if ((filterA.maskBits & filterB.categoryBits) == 0) return false;
        //     if ((filterA.categoryBits & filterB.maskBits) == 0) return false;
        // }
        // return true;
    }
    clone() {
        return new Filter(this.categoryBits, this.maskBits, this.groupIndex);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Filter;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Material {
    constructor(density = 1, elasticity = 0.3, friction = 0.1) {
        this.density = density;
        this.elasticity = elasticity;
        this.friction = friction;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Material;

Material.NORMAL = new Material(1, 0.3, 0.1);
Material.LIGHTMETAL = new Material(1.4, 0.3, 0.1);
Material.ROCK = new Material(2.0, 0.2, 0.1);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Controllable {
    constructor(force) {
        this.force = 1;
        this.force = force;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controllable;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TileGraphics {
    constructor(tileFrameId = "") {
        this.setTileFrameId(tileFrameId);
    }
    setTileFrameId(value) {
        this.tileFrameId = value;
        if (this.onChange != null) {
            this.onChange();
        }
        return value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileGraphics;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__test_GameTestA__ = __webpack_require__(28);

const game = new __WEBPACK_IMPORTED_MODULE_0__test_GameTestA__["a" /* GameTestA */]();


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__glaze_GlazeEngine__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__glaze_graphics_systems_GraphicsRenderSystem__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__glaze_geom_AABB2__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__glaze_core_components_Position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__glaze_graphics_components_Graphics__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__glaze_graphics_render_sprite_SpriteRenderer__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__glaze_graphics_render_tile_TileMapRenderer__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__glaze_graphics_components_GraphicsAnimation__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__glaze_graphics_systems_AnimationSystem__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__glaze_physics_collision_broadphase_TileMapCollision__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__glaze_physics_collision_broadphase_BruteforceBroadphase__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__glaze_physics_systems_PhysicsStaticSystem__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__glaze_physics_systems_PhysicsMoveableSystem__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__glaze_physics_systems_PhysicsCollisionSystem__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__glaze_physics_systems_PhysicsMassSystem__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__glaze_physics_systems_PhysicsPositionSystem__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__glaze_core_components_Extents__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__glaze_physics_components_PhysicsCollision__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__glaze_physics_collision_Filter__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__glaze_physics_Material__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__glaze_physics_Body__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__glaze_physics_components_PhysicsBody__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__glaze_core_components_Moveable__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__glaze_core_components_Active__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__glaze_physics_systems_PhysicsUpdateSystem__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__glaze_core_components_Controllable__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__glaze_core_systems_ControllerSystem__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__glaze_graphics_systems_TileGraphicsRenderSystem__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__glaze_graphics_components_TileGraphics__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__glaze_core_components_Fixed__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__glaze_particle_engines_BlockParticleEngine2__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__glaze_particle_systems_ParticleSystem__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__glaze_space_systems_FixedViewManagementSystem__ = __webpack_require__(76);


































const MAP_DATA = "data/16map.json";
const TEXTURE_CONFIG = "data/sprites.json";
const TEXTURE_DATA = "data/sprites.png";
const FRAMES_CONFIG = "data/frames.json";
const PARTICLE_TEXTURE_CONFIG = "data/particles.json";
const PARTICLE_TEXTURE_DATA = "data/particles.png";
const PARTICLE_FRAMES_CONFIG = "data/particleFrames.json";
const TILE_FRAMES_CONFIG = "data/tileFrames.json";
// const COL_SPRITE_SHEET:string = "data/superSet.png";
// const TILE_SPRITE_SHEET_1:string = "data/superSet.png";
// const TILE_SPRITE_SHEET_2:string = "data/superSet.png";
// const TILE_SPRITE_SHEET_B:string = "data/superSet.png";
const TILE_SPRITE_SHEET = "data/superSet.png";
const TILE_SIZE = 16;
class GameTestA extends __WEBPACK_IMPORTED_MODULE_0__glaze_GlazeEngine__["a" /* GlazeEngine */] {
    constructor() {
        const canvas = document.getElementById("view");
        super(canvas);
        this.loadAssets([TEXTURE_CONFIG, TEXTURE_DATA, FRAMES_CONFIG, MAP_DATA, TILE_SPRITE_SHEET, TILE_FRAMES_CONFIG]);
    }
    initalize() {
        this.engine.addCapacityToEngine(1000);
        const tmxMap = JSON.parse(this.assets.assets.get(MAP_DATA));
        var cameraRange = new __WEBPACK_IMPORTED_MODULE_2__glaze_geom_AABB2__["a" /* AABB2 */](0, TILE_SIZE * tmxMap.width, TILE_SIZE * tmxMap.height, 0);
        cameraRange.expand(-TILE_SIZE * 2);
        this.renderSystem = new __WEBPACK_IMPORTED_MODULE_1__glaze_graphics_systems_GraphicsRenderSystem__["a" /* GraphicsRenderSystem */](this.canvas, cameraRange);
        this.renderSystem.textureManager.AddTexture(TEXTURE_DATA, this.assets.assets.get(TEXTURE_DATA));
        this.renderSystem.textureManager.AddTexture(TILE_SPRITE_SHEET, this.assets.assets.get(TILE_SPRITE_SHEET));
        this.renderSystem.textureManager.ParseTexturePackerJSON(this.assets.assets.get(TEXTURE_CONFIG), TEXTURE_DATA);
        this.renderSystem.frameListManager.ParseFrameListJSON(this.assets.assets.get(FRAMES_CONFIG));
        const background = Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["d" /* LayerToCoordTexture */])(Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["e" /* TMXdecodeLayer */])(Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["a" /* GetLayer */])(tmxMap, "Background")));
        const foreground1 = Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["d" /* LayerToCoordTexture */])(Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["e" /* TMXdecodeLayer */])(Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["a" /* GetLayer */])(tmxMap, "Foreground1")));
        const foreground2 = Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["d" /* LayerToCoordTexture */])(Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["e" /* TMXdecodeLayer */])(Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["a" /* GetLayer */])(tmxMap, "Foreground2")));
        const collisionData = Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["c" /* LayerToCollisionData */])(Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["e" /* TMXdecodeLayer */])(Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["a" /* GetLayer */])(tmxMap, "Collision")), Object(__WEBPACK_IMPORTED_MODULE_6__glaze_tmx_TMXMap__["b" /* GetTileSet */])(tmxMap, "Collision").firstgid, TILE_SIZE);
        var tileMapRenderer = new __WEBPACK_IMPORTED_MODULE_7__glaze_graphics_render_tile_TileMapRenderer__["a" /* TileMapRenderer */](16 / 2, 2);
        tileMapRenderer.SetTileRenderLayer("bg", ["Background", "Foreground1"]);
        tileMapRenderer.SetTileRenderLayer("fg", ["Foreground2"]);
        this.renderSystem.renderer.AddRenderer(tileMapRenderer);
        tileMapRenderer.SetTileLayerFromData(foreground2, this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET), "Foreground2", 1, 1);
        tileMapRenderer.SetTileLayerFromData(foreground1, this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET), "Foreground1", 1, 1);
        tileMapRenderer.SetTileLayerFromData(background, this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET), "Background", 1, 1);
        const spriteRender = new __WEBPACK_IMPORTED_MODULE_5__glaze_graphics_render_sprite_SpriteRenderer__["a" /* SpriteRenderer */]();
        spriteRender.AddStage(this.renderSystem.stage);
        this.renderSystem.renderer.AddRenderer(spriteRender);
        this.renderSystem.itemContainer.addChild(tileMapRenderer.renderLayersMap.get("bg").sprite);
        this.renderSystem.camera.addChild(tileMapRenderer.renderLayersMap.get("fg").sprite);
        this.engine.addSystemToEngine(this.renderSystem);
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_9__glaze_graphics_systems_AnimationSystem__["a" /* AnimationSystem */](this.renderSystem.frameListManager));
        const tileMapCollision = new __WEBPACK_IMPORTED_MODULE_10__glaze_physics_collision_broadphase_TileMapCollision__["a" /* TileMapCollision */](collisionData);
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_28__glaze_graphics_systems_TileGraphicsRenderSystem__["a" /* TileGraphicsRenderSystem */](this.assets.assets.get(TILE_FRAMES_CONFIG), tileMapRenderer, tileMapCollision));
        const blockParticleEngine = new __WEBPACK_IMPORTED_MODULE_31__glaze_particle_engines_BlockParticleEngine2__["a" /* BlockParticleEngine2 */](4000, 1000 / 60, collisionData);
        this.renderSystem.renderer.AddRenderer(blockParticleEngine.renderer);
        const broadphase = new __WEBPACK_IMPORTED_MODULE_11__glaze_physics_collision_broadphase_BruteforceBroadphase__["a" /* BruteforceBroadphase */](tileMapCollision);
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_25__glaze_physics_systems_PhysicsUpdateSystem__["a" /* PhysicsUpdateSystem */]());
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_12__glaze_physics_systems_PhysicsStaticSystem__["a" /* PhysicsStaticSystem */](broadphase));
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_13__glaze_physics_systems_PhysicsMoveableSystem__["a" /* PhysicsMoveableSystem */](broadphase));
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_14__glaze_physics_systems_PhysicsCollisionSystem__["a" /* PhysicsCollisionSystem */](broadphase));
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_15__glaze_physics_systems_PhysicsMassSystem__["a" /* PhysicsMassSystem */]());
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_16__glaze_physics_systems_PhysicsPositionSystem__["a" /* PhysicsPositionSystem */]());
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_27__glaze_core_systems_ControllerSystem__["a" /* ControllerSystem */](this.input));
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_32__glaze_particle_systems_ParticleSystem__["a" /* ParticleSystem */](blockParticleEngine));
        this.engine.addSystemToEngine(new __WEBPACK_IMPORTED_MODULE_33__glaze_space_systems_FixedViewManagementSystem__["a" /* FixedViewManagementSystem */](this.renderSystem.camera));
        let x = 0;
        let y = 0;
        let player = null;
        for (var count = 0; count < 1; count++) {
            const chicken = this.engine.createEntity();
            if (player == null) {
                player = chicken;
            }
            x += 20;
            if (x > 700) {
                x = 0;
                y += 20;
            }
            var chickenBody = new __WEBPACK_IMPORTED_MODULE_21__glaze_physics_Body__["a" /* Body */](__WEBPACK_IMPORTED_MODULE_20__glaze_physics_Material__["a" /* Material */].NORMAL);
            chickenBody.setBounces(3);
            chickenBody.maxScalarVelocity = 1000;
            this.engine.addComponentsToEntity(chicken, [
                new __WEBPACK_IMPORTED_MODULE_3__glaze_core_components_Position__["a" /* Position */](100 + x, 100 + y),
                new __WEBPACK_IMPORTED_MODULE_17__glaze_core_components_Extents__["a" /* Extents */](12, 12),
                new __WEBPACK_IMPORTED_MODULE_4__glaze_graphics_components_Graphics__["a" /* Graphics */]("chicken"),
                new __WEBPACK_IMPORTED_MODULE_8__glaze_graphics_components_GraphicsAnimation__["a" /* GraphicsAnimation */]("chicken", "walk"),
                new __WEBPACK_IMPORTED_MODULE_18__glaze_physics_components_PhysicsCollision__["a" /* PhysicsCollision */](false, new __WEBPACK_IMPORTED_MODULE_19__glaze_physics_collision_Filter__["a" /* Filter */](), []),
                new __WEBPACK_IMPORTED_MODULE_22__glaze_physics_components_PhysicsBody__["a" /* PhysicsBody */](chickenBody, true),
                new __WEBPACK_IMPORTED_MODULE_23__glaze_core_components_Moveable__["a" /* Moveable */](),
                new __WEBPACK_IMPORTED_MODULE_24__glaze_core_components_Active__["a" /* Active */](),
                new __WEBPACK_IMPORTED_MODULE_26__glaze_core_components_Controllable__["a" /* Controllable */](150),
            ]);
        }
        const pos = this.engine.getComponentForEntity(player, __WEBPACK_IMPORTED_MODULE_3__glaze_core_components_Position__["a" /* Position */]);
        this.renderSystem.cameraTarget = pos.coords; // new Vector2(400, 400);
        const doorSwitch = this.engine.createEntity();
        this.engine.addComponentsToEntity(doorSwitch, [
            this.mapPosition(10.5, 18.5),
            new __WEBPACK_IMPORTED_MODULE_17__glaze_core_components_Extents__["a" /* Extents */](8, 8),
            new __WEBPACK_IMPORTED_MODULE_18__glaze_physics_components_PhysicsCollision__["a" /* PhysicsCollision */](false, null, []),
            new __WEBPACK_IMPORTED_MODULE_30__glaze_core_components_Fixed__["a" /* Fixed */](),
            new __WEBPACK_IMPORTED_MODULE_24__glaze_core_components_Active__["a" /* Active */](),
            new __WEBPACK_IMPORTED_MODULE_29__glaze_graphics_components_TileGraphics__["a" /* TileGraphics */]("switchOff"),
        ]);
        this.loop.start();
    }
    mapPosition(xTiles, yTiles) {
        return new __WEBPACK_IMPORTED_MODULE_3__glaze_core_components_Position__["a" /* Position */](xTiles * TILE_SIZE, yTiles * TILE_SIZE);
    }
    preUpdate() {
        this.input.Update(-this.renderSystem.camera.position.x, -this.renderSystem.camera.position.y);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameTestA;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_DigitalInput__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ecs_Engine__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_AssetLoader__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_GameLoop__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__geom_Vector2__ = __webpack_require__(0);





class GlazeEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.loop = new __WEBPACK_IMPORTED_MODULE_3__util_GameLoop__["a" /* GameLoop */]();
        this.loop.updateFunc = this.update.bind(this);
        this.input = new __WEBPACK_IMPORTED_MODULE_0__util_DigitalInput__["a" /* DigitalInput */]();
        var rect = canvas.getBoundingClientRect();
        this.input.InputTarget(window.document, new __WEBPACK_IMPORTED_MODULE_4__geom_Vector2__["a" /* Vector2 */](rect.left, rect.top));
        this.engine = new __WEBPACK_IMPORTED_MODULE_1__ecs_Engine__["a" /* Engine */]();
    }
    loadAssets(assetList) {
        this.assets = new __WEBPACK_IMPORTED_MODULE_2__util_AssetLoader__["a" /* AssetLoader */]();
        this.assets.loaded.add(this.initalize.bind(this));
        this.assets.SetImagesToLoad(assetList);
        this.assets.Load();
    }
    initalize() {
    }
    update(delta, now) {
        this.preUpdate();
        this.engine.update(delta, now);
        this.postUpdate();
    }
    preUpdate() {
    }
    postUpdate() {
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GlazeEngine;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);

class DigitalInput {
    constructor() {
        this.keyMap = new Array();
        for (var i = 0; i < 256; i++) {
            this.keyMap[i] = 0;
        }
        this.mousePosition = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.mousePreviousPosition = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.mouseOffset = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.frameRef = 2;
    }
    InputTarget(target, inputCorrection) {
        this.target = target;
        target.addEventListener("keydown", this.KeyDown.bind(this), false);
        target.addEventListener("keyup", this.KeyUp.bind(this), false);
        target.addEventListener("mousedown", this.MouseDown.bind(this), false);
        //target.addEventListener("touchstart",MouseDown,false);
        target.addEventListener("mouseup", this.MouseUp.bind(this), false);
        target.addEventListener("mousemove", this.MouseMove.bind(this), false);
        // target.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, RightMouseDown, false, 0, true);
        // target.addEventListener(MouseEvent.RIGHT_MOUSE_UP, RightMouseUp, false, 0, true);
        this.inputCorrection = inputCorrection;
    }
    ViewCorrectedMousePosition() {
        var pos = this.mousePosition.clone();
        pos.plusEquals(this.mouseOffset);
        return pos;
    }
    Update(x, y) {
        this.mouseOffset.x = x;
        this.mouseOffset.y = y;
        this.frameRef++;
        // mousePreviousPosition.x = mousePosition.x;
        // mousePreviousPosition.y = mousePosition.y;
        // mousePosition.x = target.mouseX + screenOffset.x;
        // mousePosition.y = target.mouseY + screenOffset.y;
    }
    KeyDown(event) {
        if (this.keyMap[event.keyCode] == 0) {
            this.keyMap[event.keyCode] = this.frameRef;
        }
        event.preventDefault();
    }
    KeyUp(event) {
        this.keyMap[event.keyCode] = 0;
        event.preventDefault();
    }
    MouseDown(event) {
        this.keyMap[200] = this.frameRef;
        event.preventDefault();
    }
    MouseUp(event) {
        this.keyMap[200] = 0;
        event.preventDefault();
    }
    MouseMove(event) {
        this.mousePreviousPosition.x = this.mousePosition.x;
        this.mousePreviousPosition.y = this.mousePosition.y;
        this.mousePosition.x = event.clientX - this.inputCorrection.x;
        this.mousePosition.y = event.clientY - this.inputCorrection.y;
        event.preventDefault();
    }
    // public  RightMouseDown(event : MouseEvent) : Void {
    //     keyMap[201] = frameRef;
    // }
    // public  RightMouseUp(event : MouseEvent) : Void {
    //     keyMap[201] = 0;
    // }
    Pressed(keyCode) {
        return this.keyMap[keyCode] > 0;
    }
    JustPressed(keyCode) {
        return this.keyMap[keyCode] == this.frameRef - 1;
    }
    PressedDuration(keyCode) {
        var duration = this.keyMap[keyCode];
        return duration > 0 ? this.frameRef - duration : -1;
    }
    Released(keyCode) {
        return this.keyMap[keyCode] == 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DigitalInput;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Pool__ = __webpack_require__(32);

class Engine {
    constructor() {
        this.components = new Map();
        this.systems = new Array();
        this.entityPool = new __WEBPACK_IMPORTED_MODULE_0__util_Pool__["a" /* Pool */](i => i);
    }
    addCapacityToEngine(entityCount) {
        this.entityPool.addCapacity(entityCount);
        this.components.forEach((_, name) => this.components.set(name, [...this.components.get(name), ...emptyNullArray(this.entityPool.capacity)]));
    }
    createEntity() {
        return this.entityPool.reserve();
    }
    getComponentForEntity(entity, component) {
        const name = component.name;
        if (this.components.has(name))
            return this.components.get(name)[entity];
    }
    addComponentsToEntity(entity, componentsToAdd) {
        componentsToAdd.forEach(component => {
            const name = component.constructor.name;
            if (this.components.has(name))
                this.components.get(name)[entity] = component;
        });
        this.matchEntity(entity);
    }
    removeComponentsFromEntity(entity, componentsToRemove) {
        componentsToRemove.forEach(component => {
            const name = component.name;
            if (this.components.has(name))
                this.components.get(name)[entity] = null;
        });
        this.matchEntity(entity);
    }
    addSystemToEngine(system) {
        system.engine = this;
        this.systems.push(system);
        system.components.forEach((name) => this.components.set(name, emptyNullArray(this.entityPool.capacity)));
    }
    update(dt, timestamp) {
        this.systems.forEach(system => system.updateSystem(dt));
    }
    matchEntity(entity) {
        this.systems.forEach(system => system.components.reduce((sum, name) => (this.components.get(name)[entity] ? sum - 1 : sum), system.components.length) === 0
            ? system.addEntity(entity, this.entityComponentsForSystem(entity, system))
            : system.removeEntity(entity));
    }
    entityComponentsForSystem(entity, system) {
        return system.components.map(name => this.components.get(name)[entity]);
    }
    addEntitiesToComponentList(componentName) {
        this.components.set(componentName, emptyNullArray(this.entityPool.capacity));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Engine;

// const setIdOnComponent = (component: IComponent<any>, id: number) => (component._id_ = id);
const emptyArray = () => [];
const emptyNullArray = count => Array(count).fill(null);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Pool {
    constructor(factory) {
        this.pool = [];
        this.factory = factory;
        this.nextAvailableIndex = -1;
    }
    addCapacity(capacity) {
        this.pool = [...entityRange(this.pool.length, capacity), ...this.pool];
        this.nextAvailableIndex += capacity;
    }
    reserve() {
        const item = this.pool[this.nextAvailableIndex];
        this.pool[this.nextAvailableIndex] = null;
        this.nextAvailableIndex--;
        return item;
    }
    free(item) {
        this.nextAvailableIndex++;
        this.pool[this.nextAvailableIndex] = item;
    }
    get capacity() {
        return this.pool.length;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pool;

const emptyNullArray = count => Array(count).fill(null);
const reverseOrder = (a, b) => b - a;
const entityRange = (start, len) => emptyNullArray(len)
    .map((_, i) => start + i)
    .sort(reverseOrder);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signals_Signal__ = __webpack_require__(34);

class AssetLoader {
    constructor() {
        this.assets = new Map();
        this.loaded = new __WEBPACK_IMPORTED_MODULE_0__signals_Signal__["a" /* Signal */]();
        this.Reset();
    }
    Reset() {
        this.running = false;
        this.loaders = new Array();
    }
    SetImagesToLoad(urls) {
        urls.forEach(url => this.AddAsset(url));
    }
    AddAsset(url) {
        if (this.running == true)
            return;
        var loader = this.LoaderFactory(url);
        loader.Init(url);
        this.loaders.push(loader);
    }
    LoaderFactory(url) {
        var extention = url.substring(url.length - 3, url.length);
        if (extention == "png")
            return new ImageAsset(this);
        if (extention == "tmx" || extention == "xml" || extention == "son")
            return new BlobAsset(this);
        return null;
    }
    Load() {
        if (this.running == true || this.loaders.length == 0)
            return;
        this.completeCount = this.loaders.length;
        this.running = true;
        this.loaders.forEach(loader => loader.Load());
    }
    onLoad(item) {
        this.completeCount--;
        this.assets.set(item.getKey(), item.getValue());
        if (this.completeCount == 0) {
            this.loaded.dispatch();
            this.running = false;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssetLoader;

class ImageAsset {
    constructor(mgr) {
        this.mgr = mgr;
    }
    Init(url) {
        this.url = url;
        this.image = new Image();
        this.image.onload = this.onLoad.bind(this);
        this.image.crossOrigin = "anonymous";
    }
    Load() {
        this.image.src = this.url + "?cb=" + Date.now();
        if (this.image.complete == true) {
            this.onLoad(null);
        }
    }
    onLoad(event) {
        if (this.mgr != null) {
            this.mgr.onLoad(this);
        }
    }
    getKey() {
        return this.url;
    }
    getValue() {
        return this.image;
    }
}
class BlobAsset {
    constructor(mgr) {
        this.mgr = mgr;
    }
    Init(url) {
        this.url = url;
        this.xhr = new XMLHttpRequest();
        this.xhr.responseType = "text";
        this.xhr.onload = this.onLoad.bind(this);
        this.xhr.open("GET", this.url + "?cb=" + Date.now(), true);
    }
    Load() {
        this.xhr.send();
    }
    onLoad(event) {
        if (this.mgr != null) {
            this.mgr.onLoad(this);
        }
    }
    getKey() {
        return this.url;
    }
    getValue() {
        return this.xhr.response;
    }
}


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SignalBinding__ = __webpack_require__(35);

class Signal {
    constructor() {
        this._bindings = [];
        this._prevParams = null;
        this.memorize = false;
        this._shouldPropagate = true;
        this.active = true;
    }
    validateListener(listener, fnName) {
        if (typeof listener !== "function") {
            throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", fnName));
        }
    }
    _registerListener(listener, isOnce, listenerContext, priority) {
        var prevIndex = this._indexOfListener(listener, listenerContext);
        var binding;
        if (prevIndex !== -1) {
            binding = this._bindings[prevIndex];
            if (binding.isOnce() !== isOnce) {
                throw new Error("You cannot add" +
                    (isOnce ? "" : "Once") +
                    "() then add" +
                    (!isOnce ? "" : "Once") +
                    "() the same listener without removing the relationship first.");
            }
        }
        else {
            binding = new __WEBPACK_IMPORTED_MODULE_0__SignalBinding__["a" /* SignalBinding */](this, listener, isOnce, listenerContext, priority);
            this._addBinding(binding);
        }
        if (this.memorize && this._prevParams) {
            binding.execute(this._prevParams);
        }
        return binding;
    }
    _addBinding(binding) {
        //simplified insertion sort
        var n = this._bindings.length;
        do {
            --n;
        } while (this._bindings[n] && binding.priority <= this._bindings[n].priority);
        this._bindings.splice(n + 1, 0, binding);
    }
    _indexOfListener(listener, context) {
        var n = this._bindings.length;
        var cur;
        while (n--) {
            cur = this._bindings[n];
            if (cur.getListener() === listener && cur.context === context) {
                return n;
            }
        }
        return -1;
    }
    has(listener, context = null) {
        return this._indexOfListener(listener, context) !== -1;
    }
    add(listener, listenerContext = null, priority = 0) {
        this.validateListener(listener, "add");
        return this._registerListener(listener, false, listenerContext, priority);
    }
    addOnce(listener, listenerContext = null, priority = 0) {
        this.validateListener(listener, "addOnce");
        return this._registerListener(listener, true, listenerContext, priority);
    }
    remove(listener, context = null) {
        this.validateListener(listener, "remove");
        var i = this._indexOfListener(listener, context);
        if (i !== -1) {
            this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
            this._bindings.splice(i, 1);
        }
        return listener;
    }
    removeAll() {
        var n = this._bindings.length;
        while (n--) {
            this._bindings[n]._destroy();
        }
        this._bindings.length = 0;
    }
    getNumListeners() {
        return this._bindings.length;
    }
    halt() {
        this._shouldPropagate = false;
    }
    dispatch(...paramsArr) {
        if (!this.active) {
            return;
        }
        var n = this._bindings.length;
        var bindings;
        if (this.memorize) {
            this._prevParams = paramsArr;
        }
        if (!n) {
            //should come after memorize
            return;
        }
        bindings = this._bindings.slice(0); //clone array in case add/remove items during dispatch
        this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.
        do {
            n--;
        } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
    }
    forget() {
        this._prevParams = null;
    }
    dispose() {
        this.removeAll();
        delete this._bindings;
        delete this._prevParams;
    }
    toString() {
        return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Signal;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SignalBinding {
    constructor(signal, listener, isOnce, listenerContext, priority = 0) {
        this.active = true;
        this.params = null;
        this._listener = listener;
        this._isOnce = isOnce;
        this.context = listenerContext;
        this._signal = signal;
        this.priority = priority || 0;
    }
    execute(paramsArr) {
        var handlerReturn;
        var params;
        if (this.active && !!this._listener) {
            params = this.params ? this.params.concat(paramsArr) : paramsArr;
            handlerReturn = this._listener.apply(this.context, params);
            if (this._isOnce) {
                this.detach();
            }
        }
        return handlerReturn;
    }
    detach() {
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
    }
    isBound() {
        return !!this._signal && !!this._listener;
    }
    isOnce() {
        return this._isOnce;
    }
    getListener() {
        return this._listener;
    }
    getSignal() {
        return this._signal;
    }
    _destroy() {
        delete this._signal;
        delete this._listener;
        delete this.context;
    }
    toString() {
        return ("[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SignalBinding;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MIN_DELTA = 1000 / 60 + 1e-8;
class GameLoop {
    constructor() {
        this.isRunning = false;
        this.update = this.update.bind(this);
    }
    update(timestamp) {
        this.delta = this.prevAnimationTime == 0 ? MIN_DELTA : timestamp - this.prevAnimationTime;
        this.prevAnimationTime = timestamp;
        if (this.updateFunc != null)
            //trace(Math.max(delta,MIN_DELTA));
            //updateFunc(Math.max(delta,MIN_DELTA),Math.floor(timestamp));
            // updateFunc(1000/60,Math.floor(timestamp));
            this.updateFunc(MIN_DELTA, Math.floor(timestamp));
        this.rafID = window.requestAnimationFrame(this.update);
        return false;
    }
    start() {
        if (this.isRunning == true)
            return;
        this.isRunning = true;
        this.prevAnimationTime = 0;
        this.rafID = window.requestAnimationFrame(this.update);
    }
    stop() {
        if (this.isRunning == false)
            return;
        this.isRunning = false;
        window.cancelAnimationFrame(this.rafID);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameLoop;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecs_System__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_components_Position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Graphics__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__displaylist_Stage__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__displaylist_Camera__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__render_RenderEngine__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__texture_TextureManager__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__displaylist_DisplayObjectContainer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__frame_FrameListManager__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__displaylist_Sprite__ = __webpack_require__(18);










class GraphicsRenderSystem extends __WEBPACK_IMPORTED_MODULE_0__ecs_System__["a" /* System */] {
    constructor(canvas, cameraRange) {
        super([__WEBPACK_IMPORTED_MODULE_1__core_components_Position__["a" /* Position */], __WEBPACK_IMPORTED_MODULE_2__components_Graphics__["a" /* Graphics */]]);
        this.canvas = canvas;
        this.stage = new __WEBPACK_IMPORTED_MODULE_3__displaylist_Stage__["a" /* Stage */]();
        this.camera = new __WEBPACK_IMPORTED_MODULE_4__displaylist_Camera__["a" /* Camera */]();
        this.camera.worldExtentsAABB = cameraRange;
        this.initalize();
    }
    initalize() {
        // this.camera.worldExtentsAABB.expand(-16);
        this.stage.addChild(this.camera);
        this.renderer = new __WEBPACK_IMPORTED_MODULE_5__render_RenderEngine__["a" /* RendererEngine */](this.stage, this.camera, this.canvas, 800, 640);
        this.camera.Resize(this.renderer.width, this.renderer.height);
        this.textureManager = new __WEBPACK_IMPORTED_MODULE_6__texture_TextureManager__["a" /* TextureManager */](this.renderer.gl);
        this.frameListManager = new __WEBPACK_IMPORTED_MODULE_8__frame_FrameListManager__["a" /* FrameListManager */](this.textureManager);
        this.itemContainer = new __WEBPACK_IMPORTED_MODULE_7__displaylist_DisplayObjectContainer__["a" /* DisplayObjectContainer */]();
        this.itemContainer.id = "itemContainer";
        this.camera.addChild(this.itemContainer);
    }
    onEntityAdded(entity, position, graphics) {
        if (graphics.sprite == null) {
            graphics.sprite = new __WEBPACK_IMPORTED_MODULE_9__displaylist_Sprite__["a" /* Sprite */]();
            graphics.frameList = this.frameListManager.getFrameList(graphics.frameListId);
            if (graphics.initialFrameId != null) {
                graphics.setFrame(graphics.frameList.getFrame(graphics.initialFrameId));
            }
            else {
                graphics.setFrame(graphics.frameList.frames[0]);
            }
            graphics.sprite.position = position.coords;
        }
        this.itemContainer.addChild(graphics.sprite);
    }
    onEntityRemoved(entity, position, graphics) {
        this.itemContainer.removeChild(graphics.sprite);
    }
    updateSystem() {
        this.camera.Focus(this._cameraTarget.x, this._cameraTarget.y);
        this.renderer.Render(this.camera.viewPortAABB);
    }
    set cameraTarget(target) {
        this._cameraTarget = target;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GraphicsRenderSystem;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DisplayObjectContainer__ = __webpack_require__(5);

class Stage extends __WEBPACK_IMPORTED_MODULE_0__DisplayObjectContainer__["a" /* DisplayObjectContainer */] {
    constructor() {
        super();
        this.id = "Stage";
        this.worldAlpha = this.alpha;
    }
    updateTransform() {
        var child = this.head;
        while (child != null) {
            child.updateTransform();
            child = child.next;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stage;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_Matrix3__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geom_AABB2__ = __webpack_require__(6);



class DisplayObject {
    constructor() {
        this.position = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.scale = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](1, 1);
        this.pivot = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this._rotationComponents = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.rotation = 0;
        this.alpha = 1;
        this.visible = true;
        this.renderable = false;
        this.aabb = new __WEBPACK_IMPORTED_MODULE_2__geom_AABB2__["a" /* AABB2 */]();
        this.parent = null;
        this.worldTransform = Object(__WEBPACK_IMPORTED_MODULE_1__geom_Matrix3__["a" /* Create */])();
        this.localTransform = Object(__WEBPACK_IMPORTED_MODULE_1__geom_Matrix3__["a" /* Create */])();
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(v) {
        this._rotation = v;
        this._rotationComponents.x = Math.cos(this._rotation);
        this._rotationComponents.y = Math.sin(this._rotation);
    }
    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
    }
    RoundFunction(v) {
        return v;
        // return Math.round(v);
        // return Math.round( v * 10) / 10;
    }
    updateTransform() {
        //TODO Rounding at the moment...
        //position.x = Math.round(position.x);
        //position.y = Math.round(position.y);
        //JS hack, much faster...
        // var positionx:number = untyped{(0.5 + position.x) >> 0;};
        // var positiony:number = untyped{(0.5 + position.y) >> 0;};
        //positionx = cast Math.round( position.x * 10) / 10;
        //positiony = cast Math.round( position.y * 10) / 10;
        // var positionx = position.x;
        // var positiony = position.y;
        var positionx = Math.floor(this.position.x);
        var positiony = Math.floor(this.position.y);
        var sinR = this._rotationComponents.y; //Math.sin(rotation);
        var cosR = this._rotationComponents.x; //Math.cos(rotation);
        this.localTransform[0] = cosR * this.scale.x;
        this.localTransform[1] = -sinR * this.scale.y;
        this.localTransform[3] = sinR * this.scale.x;
        this.localTransform[4] = cosR * this.scale.y;
        var px = this.pivot.x;
        var py = this.pivot.y;
        var parentTransform = this.parent.worldTransform;
        var a00 = this.localTransform[0];
        var a01 = this.localTransform[1];
        var a02 = positionx - this.localTransform[0] * px - py * this.localTransform[1];
        var a10 = this.localTransform[3];
        var a11 = this.localTransform[4];
        var a12 = positiony - this.localTransform[4] * py - px * this.localTransform[3];
        var b00 = parentTransform[0];
        var b01 = parentTransform[1];
        var b02 = parentTransform[2];
        var b10 = parentTransform[3];
        var b11 = parentTransform[4];
        var b12 = parentTransform[5];
        this.localTransform[2] = a02;
        this.localTransform[5] = a12;
        this.worldTransform[0] = b00 * a00 + b01 * a10;
        this.worldTransform[1] = b00 * a01 + b01 * a11;
        this.worldTransform[2] = b00 * a02 + b01 * a12 + b02;
        this.worldTransform[3] = b10 * a00 + b11 * a10;
        this.worldTransform[4] = b10 * a01 + b11 * a11;
        this.worldTransform[5] = b10 * a02 + b11 * a12 + b12;
        this.worldAlpha = this.alpha * this.parent.worldAlpha;
    }
    calcExtents() {
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DisplayObject;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Create;
/* unused harmony export Identity */
/* unused harmony export Multiply */
/* unused harmony export Clone */
/* unused harmony export Transpose */
function Create() {
    return Identity(new Float32Array(9));
}
function Identity(matrix) {
    matrix[0] = 1;
    matrix[1] = 0;
    matrix[2] = 0;
    matrix[3] = 0;
    matrix[4] = 1;
    matrix[5] = 0;
    matrix[6] = 0;
    matrix[7] = 0;
    matrix[8] = 1;
    return matrix;
}
function Multiply(mat, mat2, dest) {
    if (dest != null)
        dest = mat;
    var a00 = mat[0], a01 = mat[1], a02 = mat[2], a10 = mat[3], a11 = mat[4], a12 = mat[5], a20 = mat[6], a21 = mat[7], a22 = mat[8], b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b10 = mat2[3], b11 = mat2[4], b12 = mat2[5], b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];
    dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
    dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
    dest[2] = b00 * a02 + b01 * a12 + b02 * a22;
    dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
    dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
    dest[5] = b10 * a02 + b11 * a12 + b12 * a22;
    dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
    dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
    dest[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return dest;
}
function Clone(mat) {
    var matrix = new Float32Array(9);
    matrix[0] = mat[0];
    matrix[1] = mat[1];
    matrix[2] = mat[2];
    matrix[3] = mat[3];
    matrix[4] = mat[4];
    matrix[5] = mat[5];
    matrix[6] = mat[6];
    matrix[7] = mat[7];
    matrix[8] = mat[8];
    return matrix;
}
function Transpose(mat, dest) {
    if (dest != null || mat == dest) {
        var a01 = mat[1], a02 = mat[2], a12 = mat[5];
        mat[1] = mat[3];
        mat[2] = mat[6];
        mat[3] = a01;
        mat[5] = mat[7];
        mat[6] = a02;
        mat[7] = a12;
        return mat;
    }
    dest[0] = mat[0];
    dest[1] = mat[3];
    dest[2] = mat[6];
    dest[3] = mat[1];
    dest[4] = mat[4];
    dest[5] = mat[7];
    dest[6] = mat[2];
    dest[7] = mat[5];
    dest[8] = mat[8];
    return dest;
}


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DisplayObjectContainer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geom_AABB2__ = __webpack_require__(6);



class Camera extends __WEBPACK_IMPORTED_MODULE_0__DisplayObjectContainer__["a" /* DisplayObjectContainer */] {
    constructor() {
        super();
        this.id = "Camera";
        this.realPosition = new __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__["a" /* Vector2 */]();
        this.viewportSize = new __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__["a" /* Vector2 */]();
        this.halfViewportSize = new __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__["a" /* Vector2 */]();
        this.shake = new __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__["a" /* Vector2 */]();
        this.viewPortAABB = new __WEBPACK_IMPORTED_MODULE_2__geom_AABB2__["a" /* AABB2 */]();
        this.worldExtentsAABB = new __WEBPACK_IMPORTED_MODULE_2__geom_AABB2__["a" /* AABB2 */]();
    }
    rf(v) {
        return v;
        // return Std.number(v);
    }
    Focus(x, y) {
        //Need to move the camera container the oposite way to the actual coords
        this.realPosition.x = x;
        this.realPosition.y = y;
        // realPosition.plusEquals(shake);
        //Clamp position inside shrunk camera extents
        this.cameraExtentsAABB.fitPoint(this.realPosition);
        var positionx = -this.realPosition.x + this.halfViewportSize.x;
        var positiony = -this.realPosition.y + this.halfViewportSize.y;
        // position.x = positionx;
        if (Math.abs(positionx - this.position.x) > 2)
            this.position.x = this.position.x + (positionx - this.position.x) * 0.1;
        if (Math.abs(positiony - this.position.y) > 2)
            this.position.y = this.position.y + (positiony - this.position.y) * 0.1;
        // position.y = positiony;
        this.position.plusEquals(this.shake);
        this.position.x = this.rf(this.position.x);
        this.position.y = this.rf(this.position.y);
        this.shake.setTo(0, 0);
    }
    Resize(width, height) {
        this.viewportSize.x = width;
        this.viewportSize.y = height;
        this.halfViewportSize.x = width / 2;
        this.halfViewportSize.y = height / 2;
        this.viewPortAABB.l = this.viewPortAABB.t = 0;
        this.viewPortAABB.r = this.viewportSize.x;
        this.viewPortAABB.b = this.viewportSize.y;
        //Clone the world size, then shrink it around the center by viewport size
        this.cameraExtentsAABB = this.worldExtentsAABB.clone();
        this.cameraExtentsAABB.expand2(width, height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class RendererEngine {
    constructor(stage, camera, view, width = 800, height = 600, transparent = false, antialias = false) {
        this.stage = stage;
        this.camera = camera;
        this.view = view;
        this.contextLost = false;
        this.contextAttributes = {};
        this.contextAttributes.alpha = transparent;
        this.contextAttributes.antialias = antialias;
        this.contextAttributes.premultipliedAlpha = true;
        this.contextAttributes.stencil = false;
        this.renderers = new Array();
        this.InitalizeWebGlContext();
        this.Resize(width, height);
    }
    InitalizeWebGlContext() {
        this.view.addEventListener("webglcontextlost", this.onContextLost, false);
        this.view.addEventListener("webglcontextrestored", this.onContextRestored, false);
        this.gl = this.view.getContext("webgl", this.contextAttributes);
        this.gl.disable(WebGLRenderingContext.DEPTH_TEST);
        this.gl.disable(WebGLRenderingContext.CULL_FACE);
        this.gl.enable(WebGLRenderingContext.BLEND);
        this.gl.colorMask(true, true, true, this.contextAttributes.alpha);
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.blendFunc(WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);
        if (!this.gl.getExtension("OES_texture_float"))
            console.log("New browser time: Float textures not supported");
    }
    Resize(width, height) {
        this.width = width;
        this.height = height;
        this.view.width = width;
        this.view.height = height;
        this.gl.viewport(0, 0, width, height);
        this.gl.scissor(0, 0, width, height);
    }
    AddRenderer(renderer) {
        renderer.Init(this.gl, this.camera);
        renderer.Resize(this.width, this.height);
        this.renderers.push(renderer);
    }
    Render(clip) {
        if (this.contextLost)
            return;
        // this.stage.updateTransform();
        // stage.PreRender();
        // gl.viewport(0,0,width,height);
        // gl.colorMask(true,true,true,contextAttributes.alpha);
        // gl.bindFramebuffer(RenderingContext.FRAMEBUFFER,null);
        // gl.clearColor(0.2,0.2,0.2,1.0);
        // gl.clear(RenderingContext.COLOR_BUFFER_BIT);
        // this.gl.colorMask(true, true, true, true);
        // gl.clearColor(1.0, 0.0, 0.0, 1.0);
        this.gl.clearColor(159 / 255, 188 / 255, 197 / 255, 1.0);
        this.gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
        this.gl.colorMask(true, true, true, false);
        //9FBCC5
        //159 188 197 1
        // this.gl.blendFunc(WebGLRenderingContext.SRC_ALPHA,WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);
        // return;
        // console.log("----");
        this.renderers.forEach(renderer => {
            renderer.Render(clip);
        });
    }
    onContextLost(event) {
        this.contextLost = true;
        console.log("webGL Context Lost");
    }
    onContextRestored(event) {
        this.contextLost = false;
        console.log("webGL Context Restored");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RendererEngine;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseTexture__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Texture__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geom_Rectangle__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geom_Vector2__ = __webpack_require__(0);




class TextureManager {
    constructor(gl) {
        this.gl = gl;
        this.baseTextures = new Map();
        this.textures = new Map();
    }
    AddTexture(id, image) {
        var baseTexture = __WEBPACK_IMPORTED_MODULE_0__BaseTexture__["a" /* BaseTexture */].FromImage(this.gl, image);
        // baseTexture.RegisterTexture();
        this.baseTextures.set(id, baseTexture);
        return baseTexture;
    }
    ParseTexturePackerJSON(textureConfig, id) {
        if (!(typeof textureConfig === "string")) {
            return;
        }
        var baseTexture = this.baseTextures.get(id);
        var textureData = JSON.parse(textureConfig);
        //var fields = Reflect.fields(textureData.frames);
        Object.keys(textureData.frames).forEach(prop => {
            // for (let prop:any in textureData.frames) {
            var frame = textureData.frames[prop]; // Reflect.field(textureData.frames, prop);
            this.textures.set(prop, new __WEBPACK_IMPORTED_MODULE_1__Texture__["a" /* Texture */](baseTexture, new __WEBPACK_IMPORTED_MODULE_2__geom_Rectangle__["a" /* Rectangle */](frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h), new __WEBPACK_IMPORTED_MODULE_3__geom_Vector2__["a" /* Vector2 */](frame.pivot.x, frame.pivot.y)));
        });
    }
    ParseTexturesFromTiles(tileSize, id) { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextureManager;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FrameList__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Frame__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_Animaton__ = __webpack_require__(47);



class FrameListManager {
    constructor(textureManager) {
        this.textureManager = textureManager;
        this.frameLists = new Map();
    }
    getFrameList(id) {
        return this.frameLists.get(id);
    }
    ParseFrameListJSON(frameListConfig) {
        if (typeof frameListConfig !== "string")
            return;
        var frameListConfigData = JSON.parse(frameListConfig);
        Object.keys(frameListConfigData).forEach(itemName => {
            var frameList = new __WEBPACK_IMPORTED_MODULE_0__FrameList__["a" /* FrameList */]();
            this.frameLists.set(itemName, frameList);
            const framelistItem = frameListConfigData[itemName];
            if (framelistItem.frames != null) {
                framelistItem.frames.forEach(frame => {
                    frameList.addFrame(new __WEBPACK_IMPORTED_MODULE_1__Frame__["a" /* Frame */](frame.id, this.textureManager.textures.get(frame.name), frame.scale));
                });
                if (framelistItem.animations != null) {
                    Object.keys(framelistItem.animations).forEach(animationName => {
                        var animation = framelistItem.animations[animationName];
                        frameList.addAnimation(new __WEBPACK_IMPORTED_MODULE_2__animation_Animaton__["a" /* Animation */](animationName, animation.frames.map(frameIndex => frameList.frames[frameIndex]), animation.fps, animation.looped, animation.flipX, animation.flipY));
                    });
                }
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FrameListManager;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FrameList {
    constructor() {
        this.frames = new Array();
        this.framesHash = new Map();
        this.animationsHash = new Map();
    }
    addFrame(frame) {
        this.frames.push(frame);
        this.framesHash.set(frame.name, frame);
    }
    getFrame(id) {
        return this.framesHash.get(id);
    }
    addAnimation(animation) {
        this.animationsHash.set(animation.name, animation);
    }
    getAnimation(id) {
        return this.animationsHash.get(id);
    }
    get numFrames() {
        return frames.length;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FrameList;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Frame {
    constructor(name, texture, scale) {
        this.name = name;
        this.texture = texture;
        this.scale = scale;
    }
    updateSprite(sprite, flipX = 1, flipY = 1) {
        sprite.texture = this.texture;
        sprite.pivot.x = sprite.texture.frame.width * sprite.texture.pivot.x;
        sprite.pivot.y = (sprite.texture.frame.height + 2) * sprite.texture.pivot.y;
        sprite.scale.x = this.scale.x * flipX;
        sprite.scale.y = this.scale.y * flipY;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Frame;



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Animation {
    constructor(name, frames, frameRate = 0, looped = true, flipX = false, flipY = false) {
        this.name = name;
        this.frameRate = frameRate;
        this.frames = frames;
        this.looped = looped;
        this.flipX = flipX;
        this.flipY = flipY;
        this.msPerFrame = 1000 / this.frameRate;
        this.length = this.frames.length;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Animation;



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_WebGLShaderUtil__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_ShaderWrapper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SpriteBatch__ = __webpack_require__(49);




class SpriteRenderer {
    constructor() {
        this.first = true;
    }
    Init(gl, camera) {
        this.gl = gl;
        this.camera = camera;
        this.projection = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.spriteShader = new __WEBPACK_IMPORTED_MODULE_2__util_ShaderWrapper__["a" /* ShaderWrapper */](gl, __WEBPACK_IMPORTED_MODULE_1__util_WebGLShaderUtil__["a" /* CompileProgram */](gl, SpriteRenderer.SPRITE_VERTEX_SHADER, SpriteRenderer.SPRITE_FRAGMENT_SHADER));
        this.spriteBatch = new __WEBPACK_IMPORTED_MODULE_3__SpriteBatch__["a" /* WebGLBatch */](gl);
        this.spriteBatch.ResizeBatch(1000);
    }
    Resize(width, height) {
        this.projection.x = width / 2;
        this.projection.y = height / 2;
    }
    AddStage(stage) {
        this.stage = stage;
    }
    Render(clip) {
        this.stage.updateTransform();
        this.gl.useProgram(this.spriteShader.program);
        // if (first) {
        this.gl.uniform2f(this.spriteShader.uniform.projectionVector, this.projection.x, this.projection.y);
        this.gl.enableVertexAttribArray(this.spriteShader.attribute.aVertexPosition);
        this.gl.enableVertexAttribArray(this.spriteShader.attribute.aTextureCoord);
        this.gl.enableVertexAttribArray(this.spriteShader.attribute.aColor);
        //     first=false;
        // }
        this.gl.vertexAttribPointer(this.spriteShader.attribute.aVertexPosition, 2, WebGLRenderingContext.FLOAT, false, 20, 0);
        this.gl.vertexAttribPointer(this.spriteShader.attribute.aTextureCoord, 2, WebGLRenderingContext.FLOAT, false, 20, 8);
        this.gl.vertexAttribPointer(this.spriteShader.attribute.aColor, 1, WebGLRenderingContext.FLOAT, false, 20, 16);
        this.spriteBatch.Render(this.spriteShader, this.stage, this.camera.viewPortAABB);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteRenderer;

SpriteRenderer.SPRITE_VERTEX_SHADER = `
        precision mediump float;
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        attribute float aColor;
        uniform vec2 projectionVector;
        varying vec2 vTextureCoord;
        varying float vColor;
        void main(void) {
            gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);
            vTextureCoord = aTextureCoord;
            vColor = aColor;
        }`;
SpriteRenderer.SPRITE_FRAGMENT_SHADER = `
        precision mediump float;
        varying vec2 vTextureCoord;
        varying float vColor;
        uniform sampler2D uSampler;
        void main(void) {
            gl_FragColor = texture2D(uSampler,vTextureCoord) * vColor;
        }`;


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class WebGLBatch {
    constructor(gl) {
        this.gl = gl;
        this.size = 1;
        this.indexBuffer = gl.createBuffer();
        this.dataBuffer = gl.createBuffer();
        this.blendMode = 0;
        this.dynamicSize = 1;
    }
    Clean() { }
    ResizeBatch(size) {
        this.size = size;
        this.dynamicSize = size;
        this.data = new Float32Array(this.dynamicSize * 20);
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.data, WebGLRenderingContext.DYNAMIC_DRAW);
        this.indices = new Uint16Array(this.dynamicSize * 6);
        for (let i = 0; i < this.dynamicSize; i++) {
            const index2 = i * 6;
            const index3 = i * 4;
            this.indices[index2 + 0] = index3 + 0;
            this.indices[index2 + 1] = index3 + 1;
            this.indices[index2 + 2] = index3 + 2;
            this.indices[index2 + 3] = index3 + 0;
            this.indices[index2 + 4] = index3 + 2;
            this.indices[index2 + 5] = index3 + 3;
        }
        this.gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, this.indices, WebGLRenderingContext.STATIC_DRAW);
    }
    Flush(shader, texture, size) {
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        // this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,data,WebGLRenderingContext.STATIC_DRAW);
        this.gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, 0, this.data);
        this.gl.vertexAttribPointer(shader.attribute.aVertexPosition, 2, WebGLRenderingContext.FLOAT, false, 20, 0);
        this.gl.vertexAttribPointer(shader.attribute.aTextureCoord, 2, WebGLRenderingContext.FLOAT, false, 20, 8);
        this.gl.vertexAttribPointer(shader.attribute.aColor, 1, WebGLRenderingContext.FLOAT, false, 20, 16);
        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
        this.gl.drawElements(WebGLRenderingContext.TRIANGLES, size * 6, WebGLRenderingContext.UNSIGNED_SHORT, 0);
    }
    AddSpriteToBatch(sprite, indexRun) {
        const index = indexRun * 20;
        const frame = sprite.texture.frame;
        const tw = sprite.texture.baseTexture.width;
        const th = sprite.texture.baseTexture.height;
        const uvs = sprite.texture.uvs;
        //0
        //Verts
        this.data[index + 0] = sprite.transformedVerts[0];
        this.data[index + 1] = sprite.transformedVerts[1];
        //UV
        this.data[index + 2] = uvs[0]; //frame.x / tw;
        this.data[index + 3] = uvs[1]; //frame.y / th;
        //Colour
        this.data[index + 4] = sprite.worldAlpha;
        //1
        //Verts
        this.data[index + 5] = sprite.transformedVerts[2];
        this.data[index + 6] = sprite.transformedVerts[3];
        //UV
        this.data[index + 7] = uvs[2]; //(frame.x + frame.width) / tw;
        this.data[index + 8] = uvs[3]; //frame.y / th;
        //Colour
        this.data[index + 9] = sprite.worldAlpha;
        //2
        //Verts
        this.data[index + 10] = sprite.transformedVerts[4];
        this.data[index + 11] = sprite.transformedVerts[5];
        //UV
        this.data[index + 12] = uvs[4]; //(frame.x + frame.width) / tw;
        this.data[index + 13] = uvs[5]; //(frame.y + frame.height) / th;
        //Colour
        this.data[index + 14] = sprite.worldAlpha;
        //3
        //Verts
        this.data[index + 15] = sprite.transformedVerts[6];
        this.data[index + 16] = sprite.transformedVerts[7];
        //UV
        this.data[index + 17] = uvs[6]; //frame.x / tw;
        this.data[index + 18] = uvs[7]; //(frame.y + frame.height) / th;
        //Colour
        this.data[index + 19] = sprite.worldAlpha;
    }
    Render(shader, stage, clip) {
        // this.gl.useProgram(shader.program);
        var node;
        var stack;
        var top;
        node = stage;
        stack = new Array();
        stack[0] = node;
        top = 1;
        var indexRun = 0;
        var currentTexture = null;
        while (top > 0) {
            var thisNode = stack[--top];
            //If there is an adjacent node, push it to the stack
            if (thisNode.next != null)
                stack[top++] = thisNode.next; //Big assumption is only DisplayListContainers, which it is for now.
            //If there is a child list, push the head (this will get processed first)
            if (thisNode.head != null)
                stack[top++] = thisNode.head; //Same assumption.
            //return the result
            if (thisNode.visible && thisNode.renderable) {
                var sprite = thisNode;
                if (sprite.texture.baseTexture.texture != currentTexture || indexRun == this.size) {
                    this.Flush(shader, currentTexture, indexRun);
                    indexRun = 0;
                    currentTexture = sprite.texture.baseTexture.texture;
                }
                if (clip == null || sprite.aabb.intersect(clip)) {
                    this.AddSpriteToBatch(sprite, indexRun);
                    indexRun++;
                }
            }
        }
        if (indexRun > 0)
            this.Flush(shader, currentTexture, indexRun);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WebGLBatch;



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = TMXdecodeLayer;
/* harmony export (immutable) */ __webpack_exports__["a"] = GetLayer;
/* harmony export (immutable) */ __webpack_exports__["b"] = GetTileSet;
/* harmony export (immutable) */ __webpack_exports__["d"] = LayerToCoordTexture;
/* harmony export (immutable) */ __webpack_exports__["c"] = LayerToCollisionData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ds_TypedArray2D__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ds_Bytes2D__ = __webpack_require__(51);


const decodeBase64 = function (input) {
    return window.atob(input.replace(/[^A-Za-z0-9\+\/\=]/g, ""));
};
const encode = function (input) {
    // make sure our input string has the right format
    return window.btoa(input.replace(/\r\n/g, "\n"));
};
const decodeBase64AsArray = function (input, bytes = 4) {
    var dec = decodeBase64(input), i, j, len;
    var ar = new Uint32Array(dec.length / bytes);
    for (i = 0, len = dec.length / bytes; i < len; i++) {
        ar[i] = 0;
        for (j = bytes - 1; j >= 0; --j) {
            ar[i] += dec.charCodeAt(i * bytes + j) << (j << 3);
        }
    }
    return ar;
};
function TMXdecodeLayer(layer) {
    const d = decodeBase64AsArray(layer.data);
    return new __WEBPACK_IMPORTED_MODULE_1__ds_Bytes2D__["a" /* Bytes2D */](layer.width, layer.height, 16, 4, d.buffer);
}
function GetLayer(map, name) {
    const layer = map.layers.filter(layer => layer.name === name);
    return layer.length === 1 ? layer[0] : null;
}
function GetTileSet(map, name) {
    const tileSet = map.tilesets.filter(tileSet => tileSet.name === name);
    return tileSet.length === 1 ? tileSet[0] : null;
}
function LayerToCoordTexture(layer) {
    //Assumes all tiles are from same set...function
    var tileSet = null;
    var textureData = new __WEBPACK_IMPORTED_MODULE_0__ds_TypedArray2D__["a" /* TypedArray2D */](layer.width, layer.height);
    for (var xp = 0; xp < layer.width; xp++) {
        for (var yp = 0; yp < layer.height; yp++) {
            var source = (layer.get(xp, yp, 3) << 24) |
                (layer.get(xp, yp, 2) << 16) |
                (layer.get(xp, yp, 1) << 8) |
                layer.get(xp, yp, 0);
            if (source > 0) {
                var superSet = Math.floor(source / 1024);
                var superY = Math.floor(superSet / 8);
                var superX = superSet % 8;
                var relativeID = source - superSet * 1024;
                relativeID--; //Not sure why ATM
                var y = Math.floor(relativeID / 32);
                var x = relativeID - 32 * y;
                var v = (superY << 24) | (superX << 16) | (y << 8) | x;
                textureData.set(xp, yp, v);
            }
            else {
                textureData.set(xp, yp, 0xffffffff);
            }
        }
    }
    return textureData;
}
function LayerToCollisionData(layer, guidOffset, tileSize) {
    //Assumes all tiles are from same set...function
    var collisionData = new __WEBPACK_IMPORTED_MODULE_1__ds_Bytes2D__["a" /* Bytes2D */](layer.width, layer.height, tileSize, 1);
    for (var xp = 0; xp < layer.width; xp++) {
        for (var yp = 0; yp < layer.height; yp++) {
            var source = layer.get(xp, yp, 0);
            if (source > 0) {
                var relativeID = source - guidOffset; //tileSet.firstGID;
                collisionData.set(xp, yp, 0, 1 << relativeID); //Implicit +1
            }
            else {
                collisionData.set(xp, yp, 0, 0);
            }
        }
    }
    for (var y = 0; y < 30; y++) {
        let row = "";
        for (var x = 0; x < 30; x++) {
            row += collisionData.get(x, y, 0) ? "X" : "0";
        }
        console.log(row);
    }
    return collisionData;
}


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Bytes2D {
    constructor(width, height, cellSize, bytesPerCell, data) {
        this.initalize(width, height, cellSize, bytesPerCell, data);
    }
    initalize(width, height, cellSize, bytesPerCell, data) {
        this.width = width;
        this.height = height;
        this.numberernalWidth = width * bytesPerCell;
        this.cellSize = cellSize;
        this.invCellSize = 1 / cellSize;
        this.bytesPerCell = bytesPerCell;
        if (data == null)
            this.data = new ArrayBuffer(width * height * bytesPerCell);
        else
            this.data = data;
        this.data8 = new Uint8Array(this.data);
    }
    get(x, y, offset) {
        return this.data8[y * this.numberernalWidth + x * this.bytesPerCell + offset];
    }
    set(x, y, offset, value) {
        this.data8[y * this.numberernalWidth + x * this.bytesPerCell + offset] = value;
    }
    getReal(x, y, offset) {
        return this.get(this.Index(x), this.Index(y), offset);
    }
    Index(value) {
        return (value * this.invCellSize) | 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bytes2D;



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TileLayer__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TileLayerRenderProxy__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_ShaderWrapper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ds_TypedArray2D__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_WebGLShaderUtil__ = __webpack_require__(10);






class TileMapRenderer {
    constructor(tileSize, tileScale) {
        this.tileSize = tileSize;
        this.tileScale = tileScale;
        this.layers = new Array();
        this.layersMap = new Map();
        this.renderLayers = new Array();
        this.renderLayersMap = new Map();
    }
    Init(gl, camera) {
        if (this.gl != null)
            return;
        this.gl = gl;
        this.camera = camera;
        //tileScale = 1.0;
        this.filtered = false;
        this.spriteSheet = this.gl.createTexture();
        this.viewportSize = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.scaledViewportSize = new Float32Array(2);
        this.inverseTileTextureSize = new Float32Array(2);
        this.inverseSpriteTextureSize = new Float32Array(2);
        this.quadVertBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.quadVertBuffer);
        var quadVerts = new Float32Array([
            -1,
            -1,
            0,
            1,
            1,
            -1,
            1,
            1,
            1,
            1,
            1,
            0,
            -1,
            -1,
            0,
            1,
            1,
            1,
            1,
            0,
            -1,
            1,
            0,
            0,
        ]);
        gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, quadVerts, WebGLRenderingContext.STATIC_DRAW);
        this.tilemapShader = new __WEBPACK_IMPORTED_MODULE_3__util_ShaderWrapper__["a" /* ShaderWrapper */](gl, __WEBPACK_IMPORTED_MODULE_5__util_WebGLShaderUtil__["a" /* CompileProgram */](gl, TileMapRenderer.TILEMAP_VERTEX_SHADER, TileMapRenderer.TILEMAP_FRAGMENT_SHADER));
        this.flip = false;
        this.writebuffer2 = new __WEBPACK_IMPORTED_MODULE_4__ds_TypedArray2D__["a" /* TypedArray2D */](3, 3); //Max 3x3 tileset changes
        this.renderLayers.forEach(renderLayer => renderLayer.Init(gl, camera));
    }
    Resize(width, height) {
        var expandedWidth = (Math.floor(width / (this.tileSize * this.tileScale)) + 2) * this.tileSize;
        var expandedHeight = (Math.floor(height / (this.tileSize * this.tileScale)) + 2) * this.tileSize;
        this.viewportSize.x = expandedWidth * this.tileScale;
        this.viewportSize.y = expandedHeight * this.tileScale;
        this.scaledViewportSize[0] = this.viewportSize.x / this.tileScale;
        this.scaledViewportSize[1] = this.viewportSize.y / this.tileScale;
        this.renderLayers.forEach(renderLayer => renderLayer.Resize(Math.floor(expandedWidth), Math.floor(expandedHeight)));
    }
    // public  TileScale(scale:Float) {
    //     this.tileScale = scale;
    //     scaledViewportSize[0] = viewportSize.x/scale;
    //     scaledViewportSize[1] = viewportSize.y/scale;
    // }
    SetSpriteSheet(image) {
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.spriteSheet);
        this.gl.pixelStorei(WebGLRenderingContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        // gl.texParameteri(WebGLRenderingContext.TEXTURE_2D,WebGLRenderingContext.TEXTURE_MAG_FILTER,WebGLRenderingContext.NEAREST);
        // gl.texParameteri(WebGLRenderingContext.TEXTURE_2D,WebGLRenderingContext.TEXTURE_MIN_FILTER,WebGLRenderingContext.NEAREST);
        this.gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, image);
        if (!this.filtered) {
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
        }
        else {
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR); // Worth it to mipmap here?
        }
        this.inverseSpriteTextureSize[0] = 1 / image.width;
        this.inverseSpriteTextureSize[1] = 1 / image.height;
    }
    SetTileLayer(image, layerId, scrollScaleX, scrollScaleY) {
        var layer = new __WEBPACK_IMPORTED_MODULE_1__TileLayer__["a" /* TileLayer */]();
        layer.setTexture(this.gl, image, false);
        layer.scrollScale.x = scrollScaleX;
        layer.scrollScale.y = scrollScaleY;
        this.layers.push(layer);
    }
    SetTileLayerFromData(data, sprite, layerId, scrollScaleX, scrollScaleY) {
        var layer = new __WEBPACK_IMPORTED_MODULE_1__TileLayer__["a" /* TileLayer */]();
        layer.setTextureFromMap(this.gl, data);
        layer.setSpriteTexture(sprite);
        layer.scrollScale.x = scrollScaleX;
        layer.scrollScale.y = scrollScaleY;
        this.layers.push(layer);
        this.layersMap.set(layerId, layer);
    }
    SetTileRenderLayer(id, layers) {
        var tileRenderLayer = new __WEBPACK_IMPORTED_MODULE_2__TileLayerRenderProxy__["a" /* TileLayerRenderProxy */](this, layers);
        this.renderLayers.push(tileRenderLayer);
        this.renderLayersMap.set(id, tileRenderLayer);
    }
    updateMap(x, y, data) {
        var startX = data[0];
        var startY = data[1];
        var width = data[2];
        var height = data[3];
        var centerX = data[4];
        var centerY = data[5];
        var superY = Math.floor(data[6] / 8);
        var superX = data[6] % 8;
        this.writebuffer2.h = height;
        this.writebuffer2.w = width;
        for (var ypos = 0; ypos < height; ypos++) {
            // for (ypos in 0...height) {
            // for (xpos in 0...width) {
            for (var xpos = 0; xpos < width; xpos++) {
                var _x = startX + xpos;
                var _y = startY + ypos;
                var value = (superY << 24) | (superX << 16) | (_y << 8) | _x;
                this.writebuffer2.set(xpos, ypos, value);
            }
        }
        var writeLayer = this.layers[2].tileDataTexture;
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, writeLayer);
        this.gl.texSubImage2D(WebGLRenderingContext.TEXTURE_2D, 0, x - centerX, y - centerY, width, height, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, this.writebuffer2.data8);
    }
    Render(clip) {
        this.renderLayers.forEach(renderLayer => renderLayer.Render(clip));
    }
    RenderLayers(renderLayer) {
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this.gl.colorMask(true, true, true, true);
        this.gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
        this.gl.useProgram(this.tilemapShader.program);
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.quadVertBuffer);
        this.gl.enableVertexAttribArray(this.tilemapShader.attribute.position);
        this.gl.enableVertexAttribArray(this.tilemapShader.attribute.texture);
        this.gl.vertexAttribPointer(this.tilemapShader.attribute.position, 2, WebGLRenderingContext.FLOAT, false, 16, 0);
        this.gl.vertexAttribPointer(this.tilemapShader.attribute.texture, 2, WebGLRenderingContext.FLOAT, false, 16, 8);
        this.gl.uniform2fv(this.tilemapShader.uniform.viewportSize, this.scaledViewportSize);
        this.gl.uniform1f(this.tilemapShader.uniform.tileSize, this.tileSize);
        this.gl.uniform1f(this.tilemapShader.uniform.inverseTileSize, 1 / this.tileSize);
        this.gl.uniform1i(this.tilemapShader.uniform.sprites, 0);
        this.gl.uniform1i(this.tilemapShader.uniform.tiles, 1);
        // for (i in renderLayer.layers) {
        for (var i = 0; i < renderLayer.layers.length; i++) {
            // var layer = this.layers[i];
            const layer = this.layersMap.get(renderLayer.layers[i]);
            const pX = renderLayer.thisSnap.x / 2;
            const pY = renderLayer.thisSnap.y / 2;
            this.gl.uniform2f(this.tilemapShader.uniform.viewOffset, pX, pY);
            this.gl.uniform2fv(this.tilemapShader.uniform.inverseSpriteTextureSize, layer.inverseSpriteTextureSize);
            this.gl.uniform2fv(this.tilemapShader.uniform.inverseTileTextureSize, layer.inverseTileDataTextureSize);
            this.gl.activeTexture(WebGLRenderingContext.TEXTURE0);
            this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, layer.spriteTexture);
            this.gl.activeTexture(WebGLRenderingContext.TEXTURE1);
            this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, layer.tileDataTexture);
            this.gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 6);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileMapRenderer;

/*

256*8=2048

8x8 supertiles = 64 supertiles

of

16*16 8*8 pixel tiles = 256 tiles

total = 64 * 256 = 16k tiles

p.y = index % 8;
p.x = Math.floor(index / 8);

*/
TileMapRenderer.TILEMAP_VERTEX_SHADER = `
        precision mediump float;
        attribute vec2 position;
        attribute vec2 texture;

        varying vec2 pixelCoord;
        varying vec2 texCoord;

        uniform vec2 viewOffset;
        uniform vec2 viewportSize;
        uniform vec2 inverseTileTextureSize;
        uniform float inverseTileSize;

        void main(void) {
           pixelCoord = (texture * viewportSize) + viewOffset;
           texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;
           gl_Position = vec4(position, 0.0, 1.0);
        }`;
TileMapRenderer.TILEMAP_FRAGMENT_SHADER = `
        precision mediump float;

        varying vec2 pixelCoord;
        varying vec2 texCoord;

        uniform sampler2D tiles;
        uniform sampler2D sprites;

        uniform vec2 inverseTileTextureSize;
        uniform vec2 inverseSpriteTextureSize;
        uniform float tileSize;

        void main(void) {
           vec4 tile = texture2D(tiles, texCoord);
            // if(tile.x == 1.0 && tile.y == 1.0) { discard; }
            if (tile.x == 1.0 && tile.y == 1.0) { 
                discard;
                // gl_FragColor = vec4(0.0,0.0,0.0,0.0);
            } else {
                vec2 superSpriteOffset = floor(tile.zw * 256.0) * 256.0;
                vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;
                vec2 spriteCoord = mod(pixelCoord, tileSize);

                //Works
                //    spriteCoord.x = (-1.0+(2.0* 0.0)) * (( 0.0*tileSize) - spriteCoord.x); //normal  0
                //    spriteCoord.x = (-1.0+(2.0* 1.0)) * (( 1.0*tileSize) - spriteCoord.x); //flip   1

                gl_FragColor = texture2D(sprites, (superSpriteOffset + spriteOffset + spriteCoord) * inverseSpriteTextureSize);
            }
        }`;


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);

class TileLayer {
    constructor() {
        this.scrollScale = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](1, 1);
        this.inverseTileDataTextureSize = new Float32Array(2);
        this.inverseSpriteTextureSize = new Float32Array(2);
    }
    setSpriteTexture(spriteTexture) {
        this.spriteTexture = spriteTexture.texture;
        this.inverseSpriteTextureSize[0] = 1 / spriteTexture.width;
        this.inverseSpriteTextureSize[1] = 1 / spriteTexture.height;
    }
    setTextureFromMap(gl, data) {
        if (this.tileDataTexture == null)
            this.tileDataTexture = gl.createTexture();
        gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.tileDataTexture);
        gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, data.w, data.h, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, data.data8);
        gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);
        gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
        gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.CLAMP_TO_EDGE);
        gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.CLAMP_TO_EDGE);
        this.inverseTileDataTextureSize[0] = 1 / data.w;
        this.inverseTileDataTextureSize[1] = 1 / data.h;
    }
    setTexture(gl, image, repeat) {
        if (this.tileDataTexture == null)
            this.tileDataTexture = gl.createTexture();
        gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.tileDataTexture);
        gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, image);
        gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);
        gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
        if (repeat) {
            gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.REPEAT);
            gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.REPEAT);
        }
        else {
            gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.CLAMP_TO_EDGE);
            gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.CLAMP_TO_EDGE);
        }
        this.inverseTileDataTextureSize[0] = 1 / image.width;
        this.inverseTileDataTextureSize[1] = 1 / image.height;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileLayer;



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__texture_BaseTexture__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__texture_Texture__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__displaylist_Sprite__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__geom_Rectangle__ = __webpack_require__(9);





//TODO: Get rid of this class eventually
//Its only to be able to split the tilemap renderer in the short term
class TileLayerRenderProxy {
    constructor(tileMap, layers) {
        this.tileMap = tileMap;
        this.layers = layers;
        this.lastSnap = new __WEBPACK_IMPORTED_MODULE_3__geom_Vector2__["a" /* Vector2 */](0, 0);
        this.thisSnap = new __WEBPACK_IMPORTED_MODULE_3__geom_Vector2__["a" /* Vector2 */](-1000, -1000);
        this.snapChanged = false;
        this.size = new __WEBPACK_IMPORTED_MODULE_3__geom_Vector2__["a" /* Vector2 */]();
        this.renderSurface = this.renderSurface.bind(this);
    }
    Init(gl, camera) {
        this.sprite = new __WEBPACK_IMPORTED_MODULE_2__displaylist_Sprite__["a" /* Sprite */]();
        this.sprite.id = "renderTexture";
    }
    Resize(width, height) {
        this.size.setTo(width, height);
        this.surface = new __WEBPACK_IMPORTED_MODULE_0__texture_BaseTexture__["a" /* BaseTexture */](this.tileMap.gl, width, height);
        this.texture = new __WEBPACK_IMPORTED_MODULE_1__texture_Texture__["a" /* Texture */](this.surface, new __WEBPACK_IMPORTED_MODULE_4__geom_Rectangle__["a" /* Rectangle */](0, 0, width, height), new __WEBPACK_IMPORTED_MODULE_3__geom_Vector2__["a" /* Vector2 */](0, 0));
        this.sprite.texture = this.texture;
        this.sprite.scale.setTo(2, -2);
        this.sprite.pivot.setTo(width / 2, height / 2);
    }
    calcSnap(cameraPos) {
        this.lastSnap.copy(this.thisSnap);
        this.thisSnap.x = (Math.floor(cameraPos.x / -16) - 1) * 16;
        // thisSnap.x*=16;
        // thisSnap.x-=16;
        this.thisSnap.y = (Math.floor(cameraPos.y / -16) - 1) * 16;
        // thisSnap.y*=16;
        // thisSnap.y-=16;
        this.snapChanged = this.lastSnap.x != this.thisSnap.x || this.lastSnap.y != this.thisSnap.y;
        return this.snapChanged;
    }
    Render(clip) {
        // if (calcSnap(tileMap.camera.position)) {
        this.calcSnap(this.tileMap.camera.position);
        this.sprite.position.copy(this.size);
        this.sprite.position.plusEquals(this.thisSnap);
        // sprite.position.setTo(416+thisSnap.x,336+thisSnap.y);
        this.surface.drawTo(this.renderSurface);
        // }
    }
    renderSurface() {
        this.tileMap.RenderLayers(this);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileLayerRenderProxy;



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecs_System__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_components_Position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Graphics__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_GraphicsAnimation__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animation_AnimationController__ = __webpack_require__(56);





class AnimationSystem extends __WEBPACK_IMPORTED_MODULE_0__ecs_System__["a" /* System */] {
    constructor(frameListManager) {
        super([__WEBPACK_IMPORTED_MODULE_1__core_components_Position__["a" /* Position */], __WEBPACK_IMPORTED_MODULE_2__components_Graphics__["a" /* Graphics */], __WEBPACK_IMPORTED_MODULE_3__components_GraphicsAnimation__["a" /* GraphicsAnimation */]]);
        this.frameListManager = frameListManager;
    }
    onEntityAdded(entity, position, graphics, animation) {
        const newAnimation = this.frameListManager
            .getFrameList(animation.frameListId)
            .getAnimation(animation.animationId);
        animation.animationController = new __WEBPACK_IMPORTED_MODULE_4__animation_AnimationController__["a" /* AnimationController */](newAnimation);
    }
    updateEntity(entity, position, graphics, animation) {
        animation.animationController
            .update(this.dt)
            .updateSprite(graphics.sprite, position.direction.x, position.direction.y);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnimationSystem;



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AnimationController {
    constructor(animation) {
        this.animation = animation;
        this.frameIndex = 0;
        this.accumulatedTime = 0;
    }
    update(dt) {
        this.accumulatedTime += dt;
        if (this.accumulatedTime > this.animation.msPerFrame) {
            this.frameIndex = ++this.frameIndex % this.animation.length;
            this.accumulatedTime = 0;
        }
        return this.animation.frames[this.frameIndex];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnimationController;



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_Segment__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Contact__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Intersect__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__geom_Plane__ = __webpack_require__(59);





const SOLID = 0x1 << 0;
const ONE_WAY = 0x1 << 1;
const STEP = 0x1 << 2;
const AABBCOLLIDABLE = SOLID | ONE_WAY | STEP;
const ONE_WAY_TOLLERANCE = -4.0;
const CORRECTION = 0.0;
const ROUNDDOWN = 0.01;
const ROUNDUP = 0.5;
class TileMapCollision {
    // public  debug:Int->Int->Void;
    constructor(data) {
        this.tilePosition = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.tileExtents = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.halftilePosition = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.halftileExtents = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.bias = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](1, 1);
        this.step = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](0, -1);
        this.plane = new __WEBPACK_IMPORTED_MODULE_4__geom_Plane__["a" /* Plane */]();
        this.segment = new __WEBPACK_IMPORTED_MODULE_1__geom_Segment__["a" /* Segment */]();
        this.data = data;
        this.tileSize = data.cellSize;
        this.tileHalfSize = this.tileSize / 2;
        this.tileExtents.setTo(this.tileHalfSize, this.tileHalfSize);
        this.halftileExtents.setTo(this.tileHalfSize / 4, this.tileHalfSize / 4);
        this.contact = new __WEBPACK_IMPORTED_MODULE_2__Contact__["a" /* Contact */]();
        this.closestContact = new __WEBPACK_IMPORTED_MODULE_2__Contact__["a" /* Contact */]();
    }
    //TODO
    //Can be improved
    testCollision(proxy) {
        var body = proxy.body;
        var startX = this.data.Index(Math.min(body.position.x, body.predictedPosition.x) - proxy.aabb.extents.x - CORRECTION);
        var startY = this.data.Index(Math.min(body.position.y, body.predictedPosition.y) - proxy.aabb.extents.y - CORRECTION);
        var endX = this.data.Index(Math.max(body.position.x, body.predictedPosition.x) + proxy.aabb.extents.x + CORRECTION - ROUNDDOWN) + 1;
        var endY = this.data.Index(Math.max(body.position.y, body.predictedPosition.y) + proxy.aabb.extents.y + CORRECTION) +
            1;
        var c = 0;
        if (body.isBullet) {
            this.plane.setFromSegment(body.predictedPosition, body.position);
            this.closestContact.time = Number.POSITIVE_INFINITY;
            for (var y = startY; y < endY; y++) {
                for (var x = startX; x < endX; x++) {
                    var cell = this.data.get(x, y, 0);
                    //Bullets dont collide with 1 ways at all
                    if ((cell & SOLID) == 1 && (cell & ONE_WAY) == 0) {
                        this.tilePosition.x = x * this.tileSize + this.tileHalfSize;
                        this.tilePosition.y = y * this.tileSize + this.tileHalfSize;
                        //yuk fix this,
                        c++;
                        if (Math.abs(this.plane.distancePoint(this.tilePosition)) < 40) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_3__Intersect__["f" /* StaticAABBvsSweeptAABB */])(this.tilePosition, this.tileExtents, body.position, proxy.aabb.extents, body.delta, this.contact) == true) {
                                if (body.respondBulletCollision(this.contact)) {
                                    this.closestContact.setTo(this.contact);
                                }
                            }
                        }
                    }
                }
            }
            if (this.closestContact.time < Number.POSITIVE_INFINITY) {
                proxy.collide(null, this.contact);
            }
        }
        else {
            // plane.setFromSegment(body.predictedPosition,body.position);
            for (var y = startY; y < endY; y++) {
                for (var x = startX; x < endX; x++) {
                    var cell = this.data.get(x, y, 0);
                    if ((cell & AABBCOLLIDABLE) > 0) {
                        this.tilePosition.x = x * this.tileSize + this.tileHalfSize;
                        this.tilePosition.y = y * this.tileSize + this.tileHalfSize;
                        if ((cell & STEP) == STEP && body.usesStairs) {
                            this.segment.set(body.position, body.predictedPosition);
                            // js.Lib.debug();
                            //-4,+4
                            //+4,-4
                            //step 8
                            var stairstep = 2;
                            // var stairSize = 4;
                            // var startStair = -6;
                            for (var stair = 0; stair < 8; stair++) {
                                var p = 8 - stair * stairstep;
                                this.halftilePosition.copy(this.tilePosition);
                                this.halftilePosition.x += p * -1;
                                this.halftilePosition.y += p;
                                if (Object(__WEBPACK_IMPORTED_MODULE_3__Intersect__["d" /* IsSegVsAABB */])(this.segment, this.halftilePosition, this.halftileExtents, proxy.aabb.extents.x, proxy.aabb.extents.y)) {
                                    Object(__WEBPACK_IMPORTED_MODULE_3__Intersect__["b" /* AABBvsStaticSolidAABBFixedNormal */])(body.position, proxy.aabb.extents, this.halftilePosition, this.halftileExtents, this.step, this.contact);
                                    body.respondStaticCollision(this.contact);
                                    proxy.collide(null, this.contact);
                                }
                            }
                            // Intersect.AABBvsStaticSolidAABBSlope(body.position,proxy.aabb.extents,tilePosition,tileExtents,bias,contact);
                        }
                        else {
                            Object(__WEBPACK_IMPORTED_MODULE_3__Intersect__["a" /* AABBvsStaticSolidAABB */])(body.position, proxy.aabb.extents, this.tilePosition, this.tileExtents, this.bias, this.contact);
                            // }
                            //if (Intersect.AABBvsStaticSolidAABB(body.position,proxy.aabb.extents,tilePosition,tileExtents,bias,contact)==true) {
                            //Check for 1 way platform?
                            if ((cell & ONE_WAY) == ONE_WAY) {
                                if (body.collideOneWay &&
                                    this.contact.normal.y < 0 &&
                                    this.contact.distance >= ONE_WAY_TOLLERANCE) {
                                    body.respondStaticCollision(this.contact);
                                    proxy.collide(null, this.contact);
                                }
                                // if ( contact.normal.x!=0 && contact.distance<16) {
                                //     contact.normal.setTo(0,-1);
                                // }
                                // body.respondStaticCollision(contact);
                            }
                            else {
                                var nextX = x + this.contact.normal.x;
                                var nextY = y + this.contact.normal.y;
                                var nextCell = this.data.get(nextX, nextY, 0);
                                if ((nextCell & AABBCOLLIDABLE) == 0) {
                                    body.respondStaticCollision(this.contact);
                                    proxy.collide(null, this.contact);
                                }
                            }
                        }
                        // if (cell&ONE_WAY==0 || ( contact.normal.y<0&&contact.distance>=-4 ) )
                        // {
                        // var nextX:Int = x + Std.int(contact.normal.x);
                        // var nextY:Int = y + Std.int(contact.normal.y);
                        // var nextCell = data.get(nextX,nextY,0);
                        // if (nextCell&AABBCOLLIDABLE==0) {
                        //     body.respondStaticCollision(contact);
                        //     proxy.collide(null,contact);
                        // }
                        // }
                        //}
                    }
                }
            }
        }
        // trace(c);
        // if (c>100) {
        //     trace(startX,endX,startX,endY);
        //     js.Lib.debug();
        // }
        // plane.setFromSegment(body.predictedPosition,body.position);
        // for (x in startX...endX) {
        //     for (y in startY...endY) {
        //         var cell = data.get(x,y,1);
        //         if (cell&COLLIDABLE==1) {
        //             tilePosition.x = (x*tileSize)+tileHalfSize;
        //             tilePosition.y = (y*tileSize)+tileHalfSize;
        //             if (body.isBullet) {
        //                 //FIXME
        //                 if (Math.abs(plane.distancePoint(tilePosition))<40) {
        //                     if (Intersect.StaticAABBvsSweeptAABB(tilePosition,tileExtents,body.position,proxy.aabb.extents,body.delta,contact)==true) {
        //                         body.respondBulletCollision(contact);
        //                         if (proxy.contactCallback!=null) {
        //                             proxy.contactCallback(proxy,null,contact);
        //                         }
        //                     }
        //                 }
        //             } else {
        //                 if (Intersect.AABBvsStaticSolidAABB(body.position,proxy.aabb.extents,tilePosition,tileExtents,contact)==true) {
        //                     var nextX:Int = x + Std.int(contact.normal.x);
        //                     var nextY:Int = y + Std.int(contact.normal.y);
        //                     var nextCell = data.get(nextX,nextY,1);
        //                     if (nextCell&COLLIDABLE==0) {
        //                         body.respondStaticCollision(contact);
        //                         if (proxy.contactCallback!=null) {
        //                             proxy.contactCallback(proxy,null,contact);
        //                         }
        //                     } else {
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }
    // public iterateCells(aabb:glaze.geom.AABB2,cb:glaze.geom.AABB->Void) {
    //     var startX = data.Index(aabb.l);
    //     var startY = data.Index(aabb.t);
    //     var endX = data.Index(aabb.r) + 1;
    //     var endY = data.Index(aabb.b) + 1;
    //     var aabbArg = new glaze.geom.AABB();
    //     aabbArg.extents.setTo(tileHalfSize,tileHalfSize);
    //     for (x in startX...endX) {
    //         for (y in startY...endY) {
    //             var cell = data.get(x,y,0);
    //             if (cell&SOLID==SOLID) {
    //                 aabbArg.position.setTo((x*tileSize)+tileHalfSize,(y*tileSize)+tileHalfSize);
    //                 cb(aabbArg);
    //             }
    //         }
    //     }
    // }
    castRay(ray) {
        var x = this.data.Index(ray.origin.x);
        var y = this.data.Index(ray.origin.y);
        var cX = x * this.tileSize;
        var cY = y * this.tileSize;
        var d = ray.direction;
        if (d.x == 0.0 && d.y == 0.0)
            return true;
        var stepX = 0;
        var tMaxX = 100000000;
        var tDeltaX = 0;
        if (d.x < 0) {
            stepX = -1;
            tMaxX = (cX - ray.origin.x) / d.x;
            tDeltaX = this.tileSize / -d.x;
        }
        else if (d.x > 0) {
            stepX = 1;
            tMaxX = (cX + this.tileSize - ray.origin.x) / d.x;
            tDeltaX = this.tileSize / d.x;
        }
        var stepY = 0;
        var tMaxY = 100000000;
        var tDeltaY = 0;
        if (d.y < 0) {
            stepY = -1;
            tMaxY = (cY - ray.origin.y) / d.y;
            tDeltaY = this.tileSize / -d.y;
        }
        else if (d.y > 0) {
            stepY = 1;
            tMaxY = (cY + this.tileSize - ray.origin.y) / d.y;
            tDeltaY = this.tileSize / d.y;
        }
        var distX = 0.0;
        var distY = 0.0;
        var transitionEdgeNormalX = 0;
        var transitionEdgeNormalY = 0;
        while (true) {
            if (tMaxX < tMaxY) {
                distX = tMaxX * d.x;
                distY = tMaxX * d.y;
                tMaxX += tDeltaX;
                x += stepX;
            }
            else {
                distX = tMaxY * d.x;
                distY = tMaxY * d.y;
                tMaxY += tDeltaY;
                y += stepY;
            }
            if (distX * distX + distY * distY > ray.range * ray.range)
                return false;
            var tile = this.data.get(x, y, 0);
            if ((tile & SOLID) == SOLID) {
                if (tMaxX < tMaxY) {
                    transitionEdgeNormalX = stepX < 0 ? 1 : -1;
                    transitionEdgeNormalY = 0;
                }
                else {
                    transitionEdgeNormalX = 0;
                    transitionEdgeNormalY = stepY < 0 ? 1 : -1;
                }
                ray.report(distX, distY, transitionEdgeNormalX, transitionEdgeNormalY);
                return true;
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileMapCollision;



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector2__ = __webpack_require__(0);

class Segment {
    constructor() {
        this.start = new __WEBPACK_IMPORTED_MODULE_0__Vector2__["a" /* Vector2 */]();
        this.end = new __WEBPACK_IMPORTED_MODULE_0__Vector2__["a" /* Vector2 */]();
        this.delta = new __WEBPACK_IMPORTED_MODULE_0__Vector2__["a" /* Vector2 */]();
        this.scale = new __WEBPACK_IMPORTED_MODULE_0__Vector2__["a" /* Vector2 */]();
        this.sign = new __WEBPACK_IMPORTED_MODULE_0__Vector2__["a" /* Vector2 */]();
    }
    set(s, e) {
        this.start.copy(s);
        this.end.copy(e);
        this.delta.copy(this.end);
        this.delta.minusEquals(this.start);
        this.scale.setTo(1 / this.delta.x, 1 / this.delta.y);
        this.sign.x = this.delta.x < 0 ? -1 : 1;
        this.sign.y = this.delta.y < 0 ? -1 : 1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Segment;



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector2__ = __webpack_require__(0);

class Plane {
    constructor() {
        this.n = new __WEBPACK_IMPORTED_MODULE_0__Vector2__["a" /* Vector2 */]();
        this.d = 0;
    }
    set(n, q) {
        this.n.copy(n);
        this.d = this.n.dot(q);
    }
    setFromSegment(s, e) {
        this.n.copy(s);
        this.n.minusEquals(e);
        this.n.normalize();
        this.n.leftHandNormalEquals();
        this.d = this.n.dot(s);
    }
    distancePoint(q) {
        return this.n.dot(q) - this.d;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Plane;



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Intersect__ = __webpack_require__(22);

class BruteforceBroadphase {
    constructor(map) {
        this.map = map;
        this.staticProxies = new Array();
        this.dynamicProxies = new Array();
        this.sleepingProxies = new Array();
    }
    addProxy(proxy) {
        var target = proxy.isStatic ? this.staticProxies : this.dynamicProxies;
        target.push(proxy);
    }
    removeProxy(proxy) {
        var target = proxy.isStatic ? this.staticProxies : this.dynamicProxies;
        target.splice(target.indexOf(proxy), 1);
        // target.remove(proxy);
    }
    collide() {
        //Loop back over the proxies
        var i = this.dynamicProxies.length;
        while (--i >= 0) {
            var dynamicProxy = this.dynamicProxies[i];
            //Has body (therefore is in control)
            if (dynamicProxy.body != null) {
                if (!dynamicProxy.isSensor)
                    //First test against map
                    this.map.testCollision(dynamicProxy);
                //if it can sleep, sleep it
                if (dynamicProxy.body.canSleep) {
                    this.sleep(dynamicProxy);
                }
            }
            //Next test against all static proxies
            for (let i = 0; i < this.staticProxies.length; i++) {
                Object(__WEBPACK_IMPORTED_MODULE_0__Intersect__["c" /* Collide */])(dynamicProxy, this.staticProxies[i]);
            }
            //Now check against the sleepers
            var k = this.sleepingProxies.length;
            while (--k >= 0) {
                var sleepingProxy = this.sleepingProxies[k];
                //its awake now?
                if (!sleepingProxy.body.canSleep) {
                    this.wake(sleepingProxy);
                }
                else {
                    Object(__WEBPACK_IMPORTED_MODULE_0__Intersect__["c" /* Collide */])(dynamicProxy, sleepingProxy);
                }
            }
            //Finally test against dynamic
            var j = i;
            while (--j >= 0) {
                var dynamicProxyB = this.dynamicProxies[j];
                Object(__WEBPACK_IMPORTED_MODULE_0__Intersect__["c" /* Collide */])(dynamicProxy, dynamicProxyB);
            }
        }
    }
    QueryArea(aabb, result, checkDynamic = true, checkStatic = true) {
        if (checkDynamic) {
            for (let i = 0; i < this.sleepingProxies.length; i++) {
                const proxy = this.sleepingProxies[i];
                if (!proxy.isSensor && aabb.overlap(proxy.aabb))
                    result(proxy);
            }
            for (let i = 0; i < this.dynamicProxies.length; i++) {
                const proxy = this.dynamicProxies[i];
                if (!proxy.isSensor && aabb.overlap(proxy.aabb))
                    result(proxy);
            }
        }
        if (checkStatic) {
            for (let i = 0; i < this.staticProxies.length; i++) {
                const proxy = this.staticProxies[i];
                if (!proxy.isSensor && aabb.overlap(proxy.aabb))
                    result(proxy);
            }
        }
    }
    CastRay(ray, result, checkDynamic = true, checkStatic = true) {
        this.map.castRay(ray);
        if (checkDynamic) {
            for (let i = 0; i < this.sleepingProxies.length; i++) {
                const proxy = this.sleepingProxies[i];
                if (!proxy.isSensor)
                    Object(__WEBPACK_IMPORTED_MODULE_0__Intersect__["e" /* RayAABB */])(ray, proxy);
            }
            for (let i = 0; i < this.dynamicProxies.length; i++) {
                const proxy = this.dynamicProxies[i];
                if (!proxy.isSensor)
                    Object(__WEBPACK_IMPORTED_MODULE_0__Intersect__["e" /* RayAABB */])(ray, proxy);
            }
        }
        if (checkStatic) {
            for (let i = 0; i < this.staticProxies.length; i++) {
                const proxy = this.staticProxies[i];
                if (!proxy.isSensor)
                    Object(__WEBPACK_IMPORTED_MODULE_0__Intersect__["e" /* RayAABB */])(ray, proxy);
            }
        }
    }
    wake(proxy) {
        this.sleepingProxies.splice(this.sleepingProxies.indexOf(proxy), 1);
        // this.sleepingProxies.remove(proxy);
        proxy.body.isSleeping = false;
        this.dynamicProxies.push(proxy);
    }
    sleep(proxy) {
        this.dynamicProxies.splice(this.dynamicProxies.indexOf(proxy), 1);
        //this.dynamicProxies.remove(proxy);
        proxy.body.isSleeping = true;
        this.sleepingProxies.push(proxy);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BruteforceBroadphase;



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecs_System__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_components_Extents__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_components_Position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_PhysicsCollision__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_components_Fixed__ = __webpack_require__(13);





class PhysicsStaticSystem extends __WEBPACK_IMPORTED_MODULE_0__ecs_System__["a" /* System */] {
    constructor(broadphase) {
        super([__WEBPACK_IMPORTED_MODULE_2__core_components_Position__["a" /* Position */], __WEBPACK_IMPORTED_MODULE_1__core_components_Extents__["a" /* Extents */], __WEBPACK_IMPORTED_MODULE_3__components_PhysicsCollision__["a" /* PhysicsCollision */], __WEBPACK_IMPORTED_MODULE_4__core_components_Fixed__["a" /* Fixed */]]);
        this.broadphase = broadphase;
    }
    onEntityAdded(entity, position, extents, physicsCollision, fixed) {
        // position.updatePosition = setPosition;
        physicsCollision.proxy.aabb.extents.copy(extents.halfWidths);
        physicsCollision.proxy.entity = entity;
        physicsCollision.proxy.isStatic = true;
        physicsCollision.proxy.aabb.position = position.coords; //Because its not linked to a body
        this.broadphase.addProxy(physicsCollision.proxy);
    }
    onEntityRemoved(entity, position, extents, physicsCollision, fixed) {
        this.broadphase.removeProxy(physicsCollision.proxy);
    }
    updateAllEntities() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsStaticSystem;



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_AABB__ = __webpack_require__(12);


class BFProxy {
    constructor() {
        this.isStatic = false;
        this.isSensor = false;
        this.isActive = true;
        this.limitToStaticCheck = false;
        this.userData1 = -1;
        this.userData2 = -1;
        this.contactCallbacks = [];
        this.aabb = new __WEBPACK_IMPORTED_MODULE_1__geom_AABB__["a" /* AABB */]();
        this.offset = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.responseBias = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */](1, 1);
        this.id = BFProxy.nextID++;
    }
    setBody(body) {
        this.body = body;
        this.aabb.position = body.position;
        this.isStatic = false; //bodies are always dynamic
    }
    collide(proxy, contact) {
        this.contactCallbacks.forEach(callback => callback(this, proxy, contact));
    }
    // public static inline  CreateStaticFeature(x:Float,y:Float,hw:Float,hh:Float,filter:Filter):BFProxy {
    //     var bfproxy = new BFProxy();
    //     bfproxy.aabb.extents.setTo(hw,hh);
    //     bfproxy.filter = filter;
    //     bfproxy.aabb.position.setTo(x,y);
    //     bfproxy.isStatic = true;
    //     return bfproxy;
    // }
    static HashBodyIDs(a, b) {
        return a < b ? (a << 16) | b : (b << 16) | a;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BFProxy;

BFProxy.nextID = 0;


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_components_Position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_components_Extents__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_PhysicsCollision__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_components_Moveable__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ecs_System__ = __webpack_require__(1);





class PhysicsMoveableSystem extends __WEBPACK_IMPORTED_MODULE_4__ecs_System__["a" /* System */] {
    constructor(broadphase) {
        super([__WEBPACK_IMPORTED_MODULE_0__core_components_Position__["a" /* Position */], __WEBPACK_IMPORTED_MODULE_1__core_components_Extents__["a" /* Extents */], __WEBPACK_IMPORTED_MODULE_2__components_PhysicsCollision__["a" /* PhysicsCollision */], __WEBPACK_IMPORTED_MODULE_3__core_components_Moveable__["a" /* Moveable */]]);
        this.broadphase = broadphase;
    }
    onEntityAdded(entity, position, extents, physicsCollision, moveable) {
        physicsCollision.proxy.aabb.extents.copy(extents.halfWidths);
        physicsCollision.proxy.isStatic = false;
        physicsCollision.proxy.entity = entity;
        physicsCollision.proxy.aabb.position = position.coords; //Because its not linked to a body BUT it could cause an issue?
        this.broadphase.addProxy(physicsCollision.proxy);
    }
    onEntityRemoved(entity, position, extents, physicsCollision, moveable) {
        this.broadphase.removeProxy(physicsCollision.proxy);
    }
    updateAllEntities() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsMoveableSystem;



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_PhysicsCollision__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_PhysicsBody__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_components_Moveable__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ecs_System__ = __webpack_require__(1);




class PhysicsCollisionSystem extends __WEBPACK_IMPORTED_MODULE_3__ecs_System__["a" /* System */] {
    constructor(broadphase) {
        super([__WEBPACK_IMPORTED_MODULE_0__components_PhysicsCollision__["a" /* PhysicsCollision */], __WEBPACK_IMPORTED_MODULE_1__components_PhysicsBody__["a" /* PhysicsBody */], __WEBPACK_IMPORTED_MODULE_2__core_components_Moveable__["a" /* Moveable */]]);
        this.broadphase = broadphase;
    }
    onEntityAdded(entity, physicsCollision, physicsBody, moveable) {
        //All this really does is add the body to the proxy and run the physics
        physicsCollision.proxy.setBody(physicsBody.body);
    }
    updateAllEntities() {
        this.broadphase.collide();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsCollisionSystem;



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecs_System__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_PhysicsBody__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_components_Extents__ = __webpack_require__(4);



class PhysicsMassSystem extends __WEBPACK_IMPORTED_MODULE_0__ecs_System__["a" /* System */] {
    constructor() {
        super([__WEBPACK_IMPORTED_MODULE_1__components_PhysicsBody__["a" /* PhysicsBody */], __WEBPACK_IMPORTED_MODULE_2__core_components_Extents__["a" /* Extents */]]);
    }
    onEntityAdded(entity, physicsBody, extents) {
        if (physicsBody.setMassFromVolume) {
            physicsBody.body.setMassFromVolumeMaterial(extents.halfWidths.x * extents.halfWidths.y * 4);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsMassSystem;



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecs_System__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_components_Position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_PhysicsBody__ = __webpack_require__(3);



class PhysicsPositionSystem extends __WEBPACK_IMPORTED_MODULE_0__ecs_System__["a" /* System */] {
    constructor() {
        super([__WEBPACK_IMPORTED_MODULE_1__core_components_Position__["a" /* Position */], __WEBPACK_IMPORTED_MODULE_2__components_PhysicsBody__["a" /* PhysicsBody */]]);
    }
    updateEntity(entity, position, physicsBody) {
        physicsBody.body.updatePosition();
        position.update(physicsBody.body.position);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsPositionSystem;



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Material__ = __webpack_require__(24);


const SLEEP_BIAS = 0.99332805041467;
const SLEEP_EPSILON = 0.0009;
const WAKE_MOTION = 10;
const MASS_SCALE = 1 / 10;
class Body {
    // public var sweep:AABB2 = new glaze.geom.AABB2();
    constructor(material = null, mass = 1) {
        this.position = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.positionCorrection = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.predictedPosition = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.delta = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.previousPosition = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.velocity = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.originalVelocity = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.previousVelocity = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.contactNormal = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.prevContactNormal = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.tangent = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.stepContactCount = 0;
        this.maxScalarVelocity = 1000;
        this.maxVelocity = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.forces = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.accumulatedForces = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.isBullet = false;
        this.damping = 1;
        this.globalForceFactor = 1;
        this.mass = 1;
        this.invMass = 1;
        this.dt = 0;
        this.motion = WAKE_MOTION;
        this.canSleep = false;
        this.isSleeping = false;
        this.onGround = false;
        this.onGroundPrev = false;
        this.inWater = false;
        this.inWaterPrev = false;
        this.usesStairs = true;
        this.collideOneWay = true;
        this.totalBounceCount = 0;
        this.bounceCount = 0;
        this.debug = 0;
        this.skip = false;
        this.material = material == null ? new __WEBPACK_IMPORTED_MODULE_1__Material__["a" /* Material */]() : material;
        this.setMass(mass);
    }
    update(dt, globalForces, globalDamping) {
        this.dt = dt;
        this.onGroundPrev = this.onGround;
        this.onGround = false;
        this.inWaterPrev = this.inWater;
        this.inWater = false;
        if (this.skip || this.isSleeping)
            return;
        this.motion = SLEEP_BIAS * this.motion + (1 - SLEEP_BIAS) * this.velocity.lengthSqrd();
        this.motion = Math.min(this.motion, 10 * SLEEP_EPSILON);
        this.canSleep = this.motion < SLEEP_EPSILON;
        this.previousVelocity.copy(this.velocity);
        //Add global forces to local ones
        this.forces.plusMultEquals(globalForces, this.globalForceFactor);
        this.velocity.plusEquals(this.forces);
        this.velocity.multEquals(globalDamping * this.damping);
        //Which velocity limiting type?
        // if (!isBullet) {
        if (this.maxScalarVelocity > 0) {
            this.velocity.clampScalar(this.maxScalarVelocity);
        }
        else {
            this.velocity.clampVector(this.maxVelocity);
        }
        // }
        this.originalVelocity.copy(this.velocity);
        this.predictedPosition.copy(this.position);
        this.predictedPosition.plusMultEquals(this.velocity, dt);
        this.previousPosition.copy(this.position);
        this.delta.copy(this.predictedPosition);
        this.delta.minusEquals(this.position);
        this.prevContactNormal.copy(this.contactNormal);
        this.contactNormal.setTo(0, 0);
        this.forces.setTo(0, 0);
        this.damping = 1;
        this.stepContactCount = 0;
        this.toi = Number.POSITIVE_INFINITY;
    }
    respondStaticCollision(contact) {
        if (this.skip)
            return false;
        var seperation = Math.max(contact.distance, 0);
        var penetration = Math.min(contact.distance, 0);
        //positionCorrection.x -= contact.normal.x * (penetration/dt);
        //positionCorrection.y -= contact.normal.y * (penetration/dt);
        this.positionCorrection.minusMultEquals(contact.normal, penetration / this.dt);
        var nv = this.velocity.dot(contact.normal) + seperation / this.dt;
        if (nv < 0) {
            this.stepContactCount++;
            //Cancel normal vel
            // velocity.x -= contact.normal.x * nv;
            // velocity.y -= contact.normal.y * nv;
            this.velocity.minusMultEquals(contact.normal, nv);
            //Item doesnt bounce? Surface is updwards?
            if (!this.canBounce && contact.normal.y < 0) {
                this.onGround = true;
                //Apply Friction here?
                // var tangent:Vector2 = contact.normal.rightHandNormal();
                // var tv:number = velocity.dot(tangent) * material.friction;
                // velocity.x -= tangent.x * tv;
                // velocity.y -= tangent.y * tv;
            }
            //store contact normal for later reflection
            this.contactNormal.copy(contact.normal);
            return true;
        }
        return false;
    }
    t(msg) {
        if (this.debug > 0) {
            this.debug--;
        }
    }
    respondBulletCollision(contact) {
        //Record the closest time
        if (contact.time <= this.toi) {
            this.toi = contact.time;
            this.positionCorrection.copy(contact.sweepPosition);
            this.contactNormal.copy(contact.normal);
            return true;
        }
        return false;
    }
    updatePosition() {
        if (this.skip || this.isSleeping)
            return;
        //Its a bullet and it hit something?
        if (this.isBullet) {
            if (this.toi < Number.POSITIVE_INFINITY) {
                this.position.copy(this.positionCorrection);
                this.originalVelocity.reflectEquals(this.contactNormal);
                //Fixme
                this.originalVelocity.multEquals(this.material.elasticity);
                this.velocity.copy(this.originalVelocity);
            }
            else {
                this.position.copy(this.predictedPosition);
            }
            return;
        }
        //This body isnt a bullet so...
        //apply Friction here
        if (this.stepContactCount > 0 && !this.canBounce && this.contactNormal.y < 0) {
            // if (stepContactCount>0 && contactNormal.y < 0) {
            //onGround = true;
            // var tangent:Vector2 = contactNormal.rightHandNormal();
            this.tangent.copy(this.contactNormal);
            this.tangent.rightHandNormalEquals();
            var tv = this.originalVelocity.dot(this.tangent) * this.material.friction;
            this.velocity.x -= this.tangent.x * tv;
            this.velocity.y -= this.tangent.y * tv;
        }
        this.positionCorrection.plusEquals(this.velocity);
        this.positionCorrection.multEquals(this.dt);
        this.position.plusEquals(this.positionCorrection);
        this.positionCorrection.setTo(0, 0);
        //Anything hit? Any bounces left?
        if (this.stepContactCount > 0 && this.canBounce) {
            //Reflect it...
            this.originalVelocity.reflectEquals(this.contactNormal);
            //Remove velocity
            this.originalVelocity.multEquals(this.material.elasticity);
            //Set the new velocity
            this.velocity.copy(this.originalVelocity);
            this.bounceCount++;
        }
    }
    addForce(f) {
        this.forces.plusMultEquals(f, this.invMass);
        this.wake();
    }
    addMasslessForce(f) {
        this.forces.plusEquals(f);
        this.wake();
    }
    addProportionalForce(f) {
        this.forces.plusMultEquals(f, this.mass);
        this.wake();
    }
    setMass(mass) {
        this.mass = mass;
        this.invMass = 1 / mass;
    }
    setMassFromVolumeMaterial(volume) {
        this.setMass(this.material.density * volume * MASS_SCALE);
    }
    setStaticPosition(x, y) {
        this.position.setTo(x, y);
        this.positionCorrection.setTo(0, 0);
        this.predictedPosition.setTo(0, 0);
        this.forces.setTo(0, 0);
        this.accumulatedForces.setTo(0, 0);
        this.velocity.setTo(0, 0);
        this.originalVelocity.setTo(0, 0);
        this.delta.setTo(0, 0);
        this.wake();
    }
    setBounces(count) {
        this.totalBounceCount = count;
        this.bounceCount = 0;
    }
    get canBounce() {
        return this.totalBounceCount != 0 && this.bounceCount < this.totalBounceCount;
    }
    wake() {
        this.canSleep = false;
        this.motion = WAKE_MOTION;
        this.bounceCount = 0;
    }
    get down() {
        return this.contactNormal.y < 0;
    }
    get downPrev() {
        return this.prevContactNormal.y < 0;
    }
    get up() {
        return this.contactNormal.y > 0;
    }
    get upPrev() {
        return this.prevContactNormal.y > 0;
    }
    get left() {
        return this.contactNormal.x < 0;
    }
    get leftPrev() {
        return this.prevContactNormal.x < 0;
    }
    get right() {
        return this.contactNormal.x > 0;
    }
    get rightPrev() {
        return this.prevContactNormal.x > 0;
    }
    static Create(material, mass, bounces, globalForceFactor, maxScalarVelocity) {
        var body = new Body(material);
        body.setMass(mass);
        body.setBounces(bounces);
        body.globalForceFactor = globalForceFactor;
        body.maxScalarVelocity = maxScalarVelocity;
        return body;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Body;



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecs_System__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_components_Position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_PhysicsBody__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_components_Active__ = __webpack_require__(15);





class PhysicsUpdateSystem extends __WEBPACK_IMPORTED_MODULE_0__ecs_System__["a" /* System */] {
    constructor() {
        super([__WEBPACK_IMPORTED_MODULE_2__core_components_Position__["a" /* Position */], __WEBPACK_IMPORTED_MODULE_3__components_PhysicsBody__["a" /* PhysicsBody */], __WEBPACK_IMPORTED_MODULE_4__core_components_Active__["a" /* Active */]]);
        this.globalForce = new __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__["a" /* Vector2 */](0, 10);
        this.globalDamping = 0.99;
    }
    onEntityAdded(entity, position, physicsBody, active) {
        physicsBody.body.position.copy(position.coords);
    }
    updateEntity(entity, position, physicsBody, active) {
        physicsBody.body.update(this.dt / 1000, this.globalForce, this.globalDamping);
        position.direction.x = physicsBody.body.velocity.x > 0 ? 1 : -1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsUpdateSystem;



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__physics_components_PhysicsBody__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Controllable__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ecs_System__ = __webpack_require__(1);



class ControllerSystem extends __WEBPACK_IMPORTED_MODULE_2__ecs_System__["a" /* System */] {
    constructor(input) {
        super([__WEBPACK_IMPORTED_MODULE_0__physics_components_PhysicsBody__["a" /* PhysicsBody */], __WEBPACK_IMPORTED_MODULE_1__components_Controllable__["a" /* Controllable */]]);
        this.input = input;
    }
    onEntityAdded(entity, physicsBody, controllable) { }
    updateEntity(entity, physicsBody, controllable) {
        this.input.JustPressed(38) ? (physicsBody.body.velocity.y -= controllable.force) : 0;
        this.input.JustPressed(40) ? (physicsBody.body.velocity.y += controllable.force) : 0;
        this.input.JustPressed(37) ? (physicsBody.body.velocity.x -= controllable.force) : 0;
        this.input.JustPressed(39) ? (physicsBody.body.velocity.x += controllable.force) : 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ControllerSystem;



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecs_System__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_TileGraphics__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_components_Position__ = __webpack_require__(2);



class TileGraphicsRenderSystem extends __WEBPACK_IMPORTED_MODULE_0__ecs_System__["a" /* System */] {
    constructor(tileFramesConfig, tileMap, map) {
        super([__WEBPACK_IMPORTED_MODULE_2__core_components_Position__["a" /* Position */], __WEBPACK_IMPORTED_MODULE_1__components_TileGraphics__["a" /* TileGraphics */]]);
        this.updates = new Array();
        this.frames = new Map();
        this.tileMap = tileMap;
        this.map = map;
        this.parseFramesConfig(tileFramesConfig);
    }
    //Format
    // "switchOn":[x,y,w,h,cx,cy] 64 32 32 32 32
    //                               5  4 4 4 4
    //                              16 12 8 4 0
    parseFramesConfig(config) {
        var data = JSON.parse(config);
        data.sheets.forEach((sheet, i) => {
            Object.keys(sheet).forEach(frameId => {
                sheet[frameId].push(i);
                this.frames.set(frameId, sheet[frameId]);
            });
        });
    }
    onEntityAdded(entity, position, tileGraphics) {
        tileGraphics.onChange = this.onChange.bind(this, entity);
        if (tileGraphics.tileFrameId != null)
            this.onChange(entity);
    }
    onChange(entity) {
        this.updates.push(entity);
    }
    updateAllEntities() {
        while (this.updates.length > 0) {
            var entity = this.updates.pop();
            var position = this.engine.getComponentForEntity(entity, __WEBPACK_IMPORTED_MODULE_2__core_components_Position__["a" /* Position */]);
            var tileDisplay = this.engine.getComponentForEntity(entity, __WEBPACK_IMPORTED_MODULE_1__components_TileGraphics__["a" /* TileGraphics */]);
            if (tileDisplay.tileFrameId != "")
                this.tileMap.updateMap(this.map.data.Index(position.coords.x), this.map.data.Index(position.coords.y), this.frames.get(tileDisplay.tileFrameId));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileGraphicsRenderSystem;



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphics_render_particle_PointBlockParticleRender__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BlockParticle__ = __webpack_require__(73);



class BlockParticleEngine2 {
    constructor(particleCount, deltaTime, map) {
        this.particleCount = particleCount;
        this.deltaTime = deltaTime;
        this.invDeltaTime = deltaTime / 1000;
        this.map = map;
        this.ZERO_FORCE = new __WEBPACK_IMPORTED_MODULE_1__geom_Vector2__["a" /* Vector2 */]();
        this.activeParticles = new Array();
        this.activeParticles[0] = new Array(this.particleCount);
        this.activeParticles[1] = new Array(this.particleCount);
        this.cachedParticles = new Array(this.particleCount);
        for (let i = 0; i < particleCount; i++) {
            this.cachedParticles[i] = new __WEBPACK_IMPORTED_MODULE_2__BlockParticle__["a" /* BlockParticle */]();
        }
        this.availableParticleCount = this.particleCount;
        this.activeParticlesCount = 0;
        this.activePool = 0;
        this.renderer = new __WEBPACK_IMPORTED_MODULE_0__graphics_render_particle_PointBlockParticleRender__["a" /* PointBlockParticleRender */](particleCount);
    }
    EmitParticle(x, y, vX, vY, fX, fY, ttl, damping, decayable, top, externalForce, data1, data2, data3, data4, data5) {
        if (this.availableParticleCount == 0)
            return false;
        var particle = this.cachedParticles[--this.availableParticleCount];
        this.activeParticles[this.activePool][this.activeParticlesCount++] = particle;
        particle.Initalize(x, y, vX, vY, fX, fY, ttl, damping, decayable ? this.deltaTime / ttl : 0, top, externalForce != null ? externalForce : this.ZERO_FORCE, data1, data2, data3, data4, data5);
        return true;
    }
    Update() {
        this.renderer.ResetBatch();
        const poolA = this.activeParticles[this.activePool];
        const poolB = this.activeParticles[this.activePool === 1 ? 0 : 1];
        let newCount = 0;
        for (var i = 0; i < this.activeParticlesCount; i++) {
            const particle = poolA[i];
            if (particle.Update(this.deltaTime, this.invDeltaTime) &&
                (this.map.getReal(particle.pX, particle.pY, 0) & 1) != 1) {
                this.renderer.AddSpriteToBatch(particle.pX, particle.pY, particle.size, (particle.alpha * 255) | 0, particle.red, particle.green, particle.blue);
                poolB[newCount++] = particle;
            }
            else {
                this.cachedParticles[this.availableParticleCount++] = particle;
            }
        }
        this.activeParticlesCount = newCount;
        this.activePool = this.activePool === 1 ? 0 : 1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlockParticleEngine2;



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_ShaderWrapper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_WebGLShaderUtil__ = __webpack_require__(10);



class PointBlockParticleRender {
    constructor(size) {
        this.first = true;
        this.maxSprites = size;
    }
    Init(gl, camera) {
        this.gl = gl;
        this.camera = camera;
        this.projection = new __WEBPACK_IMPORTED_MODULE_0__geom_Vector2__["a" /* Vector2 */]();
        this.pointSpriteShader = new __WEBPACK_IMPORTED_MODULE_1__util_ShaderWrapper__["a" /* ShaderWrapper */](gl, Object(__WEBPACK_IMPORTED_MODULE_2__util_WebGLShaderUtil__["a" /* CompileProgram */])(gl, PointBlockParticleRender.SPRITE_VERTEX_SHADER, PointBlockParticleRender.SPRITE_FRAGMENT_SHADER));
        this.dataBuffer = this.gl.createBuffer();
        this.arrayBuffer = new ArrayBuffer(20 * 4 * this.maxSprites);
        this.data = new Float32Array(this.arrayBuffer);
        this.data8 = new Uint8ClampedArray(this.arrayBuffer);
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.data, WebGLRenderingContext.DYNAMIC_DRAW);
        this.ResetBatch();
    }
    Resize(width, height) {
        this.projection.x = width / 2;
        this.projection.y = height / 2;
    }
    AddStage(stage) {
        this.stage = stage;
    }
    ResetBatch() {
        this.indexRun = 0;
    }
    AddSpriteToBatch(x, y, size, alpha, red, green, blue) {
        var index = this.indexRun * 4;
        this.data[index + 0] = x; //Math.floor(x);// + camera.position.x);
        this.data[index + 1] = y; //Math.floor(y);// + camera.position.y);
        this.data[index + 2] = size;
        index *= 4;
        this.data8[index + 12] = red;
        this.data8[index + 13] = green;
        this.data8[index + 14] = blue;
        this.data8[index + 15] = alpha;
        this.indexRun++;
    }
    Render(clip) {
        if (this.indexRun == 0)
            return;
        this.gl.enable(WebGLRenderingContext.BLEND);
        this.gl.blendFunc(WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);
        this.gl.useProgram(this.pointSpriteShader.program);
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        // this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,data,WebGLRenderingContext.DYNAMIC_DRAW);
        this.gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, 0, this.data);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.position);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.size);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.colour);
        this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.position, 2, WebGLRenderingContext.FLOAT, false, 16, 0);
        this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.size, 1, WebGLRenderingContext.FLOAT, false, 16, 8);
        this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.colour, 4, WebGLRenderingContext.UNSIGNED_BYTE, true, 16, 12);
        this.gl.uniform2f(this.pointSpriteShader.uniform.cameraPosition, this.camera.position.x, this.camera.position.y);
        this.gl.uniform2f(this.pointSpriteShader.uniform.projectionVector, this.projection.x, this.projection.y);
        this.gl.drawArrays(WebGLRenderingContext.POINTS, 0, this.indexRun);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PointBlockParticleRender;

PointBlockParticleRender.SPRITE_VERTEX_SHADER = `
        precision mediump float;
        uniform vec2 projectionVector;
        uniform vec2 cameraPosition;

        attribute vec2 position;
        attribute float size;
        attribute vec4 colour;
        varying vec4 vColor;
        void main() {
            gl_PointSize = size;
            vColor = colour;
            gl_Position = vec4( (cameraPosition.x + position.x) / projectionVector.x -1.0, (cameraPosition.y + position.y) / -projectionVector.y + 1.0 , 0.0, 1.0);            
        }
    `;
PointBlockParticleRender.SPRITE_FRAGMENT_SHADER = `
        precision mediump float;

        varying vec4 vColor;
        void main() {
            gl_FragColor = vColor;
        }
    `;


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const INV_ALPHA = 1 / 255;
class BlockParticle {
    constructor() { }
    Initalize(x, y, vX, vY, fX, fY, ttl, damping, decay, top, externalForce, data1, data2, data3, data4, data5) {
        this.pX = x;
        this.pY = y;
        this.vX = vX;
        this.vY = vY;
        this.fX = fX;
        this.fY = fY;
        this.ttl = ttl;
        this.age = ttl;
        this.damping = damping;
        this.decay = decay;
        this.externalForce = externalForce;
        this.size = data1;
        this.alpha = data2 * INV_ALPHA;
        this.red = data3;
        this.green = data4;
        this.blue = data5;
    }
    Update(deltaTime, invDeltaTime) {
        this.vX += this.fX + this.externalForce.x;
        this.vY += this.fY + this.externalForce.y;
        this.vX *= this.damping;
        this.vY *= this.damping;
        this.pX += this.vX * invDeltaTime;
        this.pY += this.vY * invDeltaTime;
        this.age -= deltaTime;
        this.alpha -= this.decay;
        return this.age > 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlockParticle;



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecs_System__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_components_Position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_components_Active__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_ParticleEmitter__ = __webpack_require__(75);




class ParticleSystem extends __WEBPACK_IMPORTED_MODULE_0__ecs_System__["a" /* System */] {
    constructor(blockParticleEngine) {
        super([__WEBPACK_IMPORTED_MODULE_1__core_components_Position__["a" /* Position */], __WEBPACK_IMPORTED_MODULE_2__core_components_Active__["a" /* Active */], __WEBPACK_IMPORTED_MODULE_3__components_ParticleEmitter__["a" /* ParticleEmitter */]]);
        this.blockParticleEngine = blockParticleEngine;
    }
    updateEntity(entity, position, active, particleEmitter) {
        particleEmitter.emitters.forEach(emitter => emitter.update(16, position.coords, this.blockParticleEngine));
    }
    postUpdate() {
        this.blockParticleEngine.Update();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ParticleSystem;



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ParticleEmitter {
    constructor(emitters) {
        this.emitters = emitters;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ParticleEmitter;



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ecs_System__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geom_AABB__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_components_Extents__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_components_Position__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_components_Fixed__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__RegularGridSpaceManager__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_components_Viewable__ = __webpack_require__(80);







class FixedViewManagementSystem extends __WEBPACK_IMPORTED_MODULE_0__ecs_System__["a" /* System */] {
    constructor(camera) {
        super([__WEBPACK_IMPORTED_MODULE_3__core_components_Position__["a" /* Position */], __WEBPACK_IMPORTED_MODULE_2__core_components_Extents__["a" /* Extents */], __WEBPACK_IMPORTED_MODULE_4__core_components_Fixed__["a" /* Fixed */]]);
        this.camera = camera;
        this.spaceManager = new __WEBPACK_IMPORTED_MODULE_5__RegularGridSpaceManager__["a" /* RegularGridSpaceManager */](10, 10, 500);
        this.activeSpaceAABB = new __WEBPACK_IMPORTED_MODULE_1__geom_AABB__["a" /* AABB */]();
        this.activeSpaceAABB.extents.setTo(800 / 2, 600 / 2);
        this.setEntityStatus = this.setEntityStatus.bind(this);
    }
    onEntityAdded(entity, position, extents, fixed) {
        this.spaceManager.addEntity(entity, position, extents);
    }
    updateAllEntities() {
        this.activeSpaceAABB.position.copy(this.camera.realPosition);
        this.spaceManager.search(this.activeSpaceAABB, this.setEntityStatus);
    }
    setEntityStatus(entity, status) {
        if (status == true) {
            this.engine.addComponentsToEntity(entity, [new __WEBPACK_IMPORTED_MODULE_6__core_components_Viewable__["a" /* Viewable */]()]);
        }
        else {
            this.engine.removeComponentsFromEntity(entity, [__WEBPACK_IMPORTED_MODULE_6__core_components_Viewable__["a" /* Viewable */]]);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FixedViewManagementSystem;



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ds_Array2D__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SpaceManagerProxy__ = __webpack_require__(79);


class RegularGridSpaceManager {
    constructor(gridWidth, gridHeight, gridCellSize) {
        this.count = 1;
        this.updateDistanceDelta = 100 * 100;
        this.grid = new __WEBPACK_IMPORTED_MODULE_0__ds_Array2D__["a" /* Array2D */](gridWidth, gridHeight, gridCellSize);
        this.currentCells = new Array();
        for (let y = 0; y < this.grid.gridWidth; y++) {
            for (let x = 0; x < this.grid.gridHeight; x++) {
                this.grid.set(x, y, new Cell());
            }
        }
    }
    addEntity(entity, position, extents) {
        var proxy = new __WEBPACK_IMPORTED_MODULE_1__SpaceManagerProxy__["a" /* SpaceManagerProxy */]();
        proxy.aabb.position = position.coords;
        proxy.aabb.extents = extents.halfWidths;
        proxy.isStatic = true;
        proxy.entity = entity;
        this.hashProxy(proxy);
    }
    hashProxy(proxy) {
        var startX = this.grid.Index(proxy.aabb.position.x - proxy.aabb.extents.x);
        var startY = this.grid.Index(proxy.aabb.position.y - proxy.aabb.extents.y);
        var endX = this.grid.Index(proxy.aabb.position.x + proxy.aabb.extents.x) + 1;
        var endY = this.grid.Index(proxy.aabb.position.y + proxy.aabb.extents.y) + 1;
        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                var cell = this.grid.get(x, y);
                cell.proxies.push(proxy);
            }
        }
    }
    addActiveCell(cell, viewAABB, callback) {
        cell.proxies.forEach(proxy => {
            if (proxy.referenceCount++ == 0) {
                callback(proxy.entity, true);
            }
        });
        cell.updateCount = this.count;
    }
    removeActiveCell(cell, viewAABB, callback) {
        cell.proxies.forEach(proxy => {
            if (--proxy.referenceCount == 0) {
                callback(proxy.entity, false);
            }
        });
        //Reset the update count
        cell.updateCount = 0;
    }
    search(viewAABB, callback) {
        if (this.lastUpdatePosition == null) {
            this.lastUpdatePosition = viewAABB.position.clone();
        }
        else {
            if (this.lastUpdatePosition.distSqrd(viewAABB.position) < this.updateDistanceDelta)
                return;
            this.lastUpdatePosition.copy(viewAABB.position);
        }
        var startX = this.grid.Index(viewAABB.position.x - viewAABB.extents.x);
        var startY = this.grid.Index(viewAABB.position.y - viewAABB.extents.y);
        var endX = this.grid.Index(viewAABB.position.x + viewAABB.extents.x) + 1;
        var endY = this.grid.Index(viewAABB.position.y + viewAABB.extents.y) + 1;
        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                var cell = this.grid.get(x, y);
                if (cell == null)
                    continue;
                if (cell.updateCount == 0)
                    this.currentCells.push(cell);
                else
                    cell.updateCount = this.count;
            }
        }
        var i = this.currentCells.length;
        while (i-- > 0) {
            var cell = this.currentCells[i];
            if (cell.updateCount == 0) {
                this.addActiveCell(cell, viewAABB, callback);
            }
            else if (cell.updateCount < this.count) {
                this.removeActiveCell(cell, viewAABB, callback);
                this.currentCells.splice(i, 1);
            }
        }
        this.count++;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RegularGridSpaceManager;

class Cell {
    constructor() {
        this.proxies = new Array();
        this.updateCount = 0;
    }
}


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Array2D {
    constructor(gridWidth, gridHeight, cellSize) {
        this.initalize(gridWidth, gridHeight, cellSize);
    }
    initalize(gridWidth, gridHeight, cellSize) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.cellSize = cellSize;
        this.invCellSize = 1 / cellSize;
        this.data = new Array(this.gridWidth * this.gridHeight);
    }
    get(x, y) {
        return this.data[y * this.gridWidth + x];
    }
    getSafe(x, y) {
        return x >= this.gridWidth || y >= this.gridHeight || x < 0 || y < 0 ? null : this.data[y * this.gridWidth + x];
    }
    set(x, y, value) {
        this.data[y * this.gridWidth + x] = value;
    }
    Index(value) {
        //FIXME Not sure this always works...
        //return Std.number(value / cellSize);
        //return Math.floor(value * invCellSize);
        return (value * this.invCellSize) | 0;
    }
    Width() {
        return this.gridWidth * this.cellSize;
    }
    Height() {
        return this.gridHeight * this.cellSize;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Array2D;



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geom_AABB__ = __webpack_require__(12);

class SpaceManagerProxy {
    constructor() {
        this.aabb = new __WEBPACK_IMPORTED_MODULE_0__geom_AABB__["a" /* AABB */]();
        this.isStatic = false;
        this.entity = null;
        this.active = false;
        this.referenceCount = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpaceManagerProxy;



/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Viewable {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Viewable;



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWZkODlhMzIzNDBiY2Q0MDUzMGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dlb20vVmVjdG9yMi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZWNzL1N5c3RlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvY29yZS9jb21wb25lbnRzL1Bvc2l0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9waHlzaWNzL2NvbXBvbmVudHMvUGh5c2ljc0JvZHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2NvcmUvY29tcG9uZW50cy9FeHRlbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9ncmFwaGljcy9kaXNwbGF5bGlzdC9EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9nZW9tL0FBQkIyLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9waHlzaWNzL2NvbXBvbmVudHMvUGh5c2ljc0NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvY29tcG9uZW50cy9HcmFwaGljcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ2VvbS9SZWN0YW5nbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dyYXBoaWNzL3JlbmRlci91dGlsL1dlYkdMU2hhZGVyVXRpbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvcmVuZGVyL3V0aWwvU2hhZGVyV3JhcHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ2VvbS9BQUJCLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9jb3JlL2NvbXBvbmVudHMvRml4ZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2NvcmUvY29tcG9uZW50cy9Nb3ZlYWJsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvY29yZS9jb21wb25lbnRzL0FjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvdGV4dHVyZS9CYXNlVGV4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvdGV4dHVyZS9UZXh0dXJlLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9ncmFwaGljcy9kaXNwbGF5bGlzdC9TcHJpdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2RzL1R5cGVkQXJyYXkyRC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvY29tcG9uZW50cy9HcmFwaGljc0FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvcGh5c2ljcy9jb2xsaXNpb24vQ29udGFjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvcGh5c2ljcy9jb2xsaXNpb24vSW50ZXJzZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9waHlzaWNzL2NvbGxpc2lvbi9GaWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL3BoeXNpY3MvTWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2NvcmUvY29tcG9uZW50cy9Db250cm9sbGFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dyYXBoaWNzL2NvbXBvbmVudHMvVGlsZUdyYXBoaWNzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC9HYW1lVGVzdEEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL0dsYXplRW5naW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS91dGlsL0RpZ2l0YWxJbnB1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZWNzL0VuZ2luZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvdXRpbC9Qb29sLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS91dGlsL0Fzc2V0TG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9zaWduYWxzL1NpZ25hbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvc2lnbmFscy9TaWduYWxCaW5kaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS91dGlsL0dhbWVMb29wLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9ncmFwaGljcy9zeXN0ZW1zL0dyYXBoaWNzUmVuZGVyU3lzdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9ncmFwaGljcy9kaXNwbGF5bGlzdC9TdGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvZGlzcGxheWxpc3QvRElzcGxheU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ2VvbS9NYXRyaXgzLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9ncmFwaGljcy9kaXNwbGF5bGlzdC9DYW1lcmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dyYXBoaWNzL3JlbmRlci9SZW5kZXJFbmdpbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dyYXBoaWNzL3RleHR1cmUvVGV4dHVyZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dyYXBoaWNzL2ZyYW1lL0ZyYW1lTGlzdE1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dyYXBoaWNzL2ZyYW1lL0ZyYW1lTGlzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvZnJhbWUvRnJhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dyYXBoaWNzL2FuaW1hdGlvbi9BbmltYXRvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvcmVuZGVyL3Nwcml0ZS9TcHJpdGVSZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvcmVuZGVyL3Nwcml0ZS9TcHJpdGVCYXRjaC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvdG14L1RNWE1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZHMvQnl0ZXMyRC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvcmVuZGVyL3RpbGUvVGlsZU1hcFJlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9ncmFwaGljcy9yZW5kZXIvdGlsZS9UaWxlTGF5ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dyYXBoaWNzL3JlbmRlci90aWxlL1RpbGVMYXllclJlbmRlclByb3h5LnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9ncmFwaGljcy9zeXN0ZW1zL0FuaW1hdGlvblN5c3RlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ3JhcGhpY3MvYW5pbWF0aW9uL0FuaW1hdGlvbkNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL3BoeXNpY3MvY29sbGlzaW9uL2Jyb2FkcGhhc2UvVGlsZU1hcENvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvZ2VvbS9TZWdtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9nZW9tL1BsYW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9waHlzaWNzL2NvbGxpc2lvbi9icm9hZHBoYXNlL0JydXRlZm9yY2VCcm9hZHBoYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9waHlzaWNzL3N5c3RlbXMvUGh5c2ljc1N0YXRpY1N5c3RlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvcGh5c2ljcy9jb2xsaXNpb24vQkZQcm94eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvcGh5c2ljcy9zeXN0ZW1zL1BoeXNpY3NNb3ZlYWJsZVN5c3RlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvcGh5c2ljcy9zeXN0ZW1zL1BoeXNpY3NDb2xsaXNpb25TeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL3BoeXNpY3Mvc3lzdGVtcy9QaHlzaWNzTWFzc1N5c3RlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvcGh5c2ljcy9zeXN0ZW1zL1BoeXNpY3NQb3NpdGlvblN5c3RlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvcGh5c2ljcy9Cb2R5LnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9waHlzaWNzL3N5c3RlbXMvUGh5c2ljc1VwZGF0ZVN5c3RlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvY29yZS9zeXN0ZW1zL0NvbnRyb2xsZXJTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2dyYXBoaWNzL3N5c3RlbXMvVGlsZUdyYXBoaWNzUmVuZGVyU3lzdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9wYXJ0aWNsZS9lbmdpbmVzL0Jsb2NrUGFydGljbGVFbmdpbmUyLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9ncmFwaGljcy9yZW5kZXIvcGFydGljbGUvUG9pbnRCbG9ja1BhcnRpY2xlUmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9wYXJ0aWNsZS9lbmdpbmVzL0Jsb2NrUGFydGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL3BhcnRpY2xlL3N5c3RlbXMvUGFydGljbGVTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL3BhcnRpY2xlL2NvbXBvbmVudHMvUGFydGljbGVFbWl0dGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9zcGFjZS9zeXN0ZW1zL0ZpeGVkVmlld01hbmFnZW1lbnRTeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL3NwYWNlL1JlZ3VsYXJHcmlkU3BhY2VNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9kcy9BcnJheTJELnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9zcGFjZS9TcGFjZU1hbmFnZXJQcm94eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xhemUvY29yZS9jb21wb25lbnRzL1Zp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Q0FBQztRQUN2QyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2QyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2QyxJQUFJO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVc7UUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7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QUMsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FDL0csQ0FBQztJQUNOLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBVTtRQUNsQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSTtRQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFVO1FBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBQUE7QUFBQTs7Ozs7Ozs7QUMxREs7Q0FDTDtBQUFBO0FBQUE7Ozs7Ozs7O0FDREs7Q0FDTDtBQUFBO0FBQUE7Ozs7Ozs7O0FDREs7Q0FDTDtBQUFBO0FBQUE7Ozs7Ozs7O0FDREs7SUFhRixZQUFZLEVBQXlCLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxtQkFBNEIsS0FBSztRQUNuRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sZUFBZSxDQUFDLEVBQVc7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUM7WUFBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDakUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RSxxRUFBcUU7UUFDckUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQ2pCLHFCQUFxQixDQUFDLFVBQVUsRUFDaEMscUJBQXFCLENBQUMsa0JBQWtCLEVBQ3hDLHFCQUFxQixDQUFDLE9BQU8sQ0FDaEMsQ0FBQztRQUNGLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUNqQixxQkFBcUIsQ0FBQyxVQUFVLEVBQ2hDLHFCQUFxQixDQUFDLGtCQUFrQixFQUN4QyxxQkFBcUIsQ0FBQyxPQUFPLENBQ2hDLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FDakIscUJBQXFCLENBQUMsVUFBVSxFQUNoQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQ3BDLHFCQUFxQixDQUFDLE1BQU0sQ0FDL0IsQ0FBQztZQUNGLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUNqQixxQkFBcUIsQ0FBQyxVQUFVLEVBQ2hDLHFCQUFxQixDQUFDLGNBQWMsRUFDcEMscUJBQXFCLENBQUMsTUFBTSxDQUMvQixDQUFDO1FBQ04sQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQ2pCLHFCQUFxQixDQUFDLFVBQVUsRUFDaEMscUJBQXFCLENBQUMsY0FBYyxFQUNwQyxxQkFBcUIsQ0FBQyxhQUFhLENBQ3RDLENBQUM7WUFDRixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FDakIscUJBQXFCLENBQUMsVUFBVSxFQUNoQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQ3BDLHFCQUFxQixDQUFDLGFBQWEsQ0FDdEMsQ0FBQztRQUNOLENBQUM7UUFDRCw4REFBOEQ7UUFDOUQsMEpBQTBKO1FBQzFKLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUNkLHFCQUFxQixDQUFDLFVBQVUsRUFDaEMsQ0FBQyxFQUNELHFCQUFxQixDQUFDLElBQUksRUFDMUIsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsTUFBTSxFQUNYLENBQUMsRUFDRCxxQkFBcUIsQ0FBQyxJQUFJLEVBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQ3RFLElBQUksQ0FDUCxDQUFDO0lBQ04sQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBeUIsRUFBRSxLQUFnQjtRQUMvRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsRUFBRSxDQUFDLFVBQVUsQ0FDVCxxQkFBcUIsQ0FBQyxVQUFVLEVBQ2hDLENBQUMsRUFDRCxxQkFBcUIsQ0FBQyxJQUFJLEVBQzFCLHFCQUFxQixDQUFDLElBQUksRUFDMUIscUJBQXFCLENBQUMsYUFBYSxFQUNuQyxLQUFLLENBQ1IsQ0FBQztRQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVNLElBQUksQ0FBQyxJQUFZO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBWTtRQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBYTtRQUN2QiwrREFBK0Q7UUFDL0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQztZQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2hGLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUssSUFBSSxDQUFDLFlBQW9CLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUssSUFBSSxDQUFDLFlBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwRyxJQUFJLENBQUMsWUFBb0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM3QyxJQUFJLENBQUMsWUFBb0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUN2QixxQkFBcUIsQ0FBQyxZQUFZLEVBQ2xDLHFCQUFxQixDQUFDLGlCQUFpQixFQUN2QyxJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxNQUFNLENBQ2QsQ0FBQztZQUNGLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQ3hCLHFCQUFxQixDQUFDLFdBQVcsRUFDakMscUJBQXFCLENBQUMsaUJBQWlCLEVBQ3ZDLHFCQUFxQixDQUFDLFVBQVUsRUFDaEMsSUFBSSxDQUFDLE9BQU8sRUFDWixDQUFDLENBQ0osQ0FBQztZQUNGLElBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQzNCLHFCQUFxQixDQUFDLFdBQVcsRUFDakMscUJBQXFCLENBQUMsZ0JBQWdCLEVBQ3RDLHFCQUFxQixDQUFDLFlBQVksRUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FDcEIsQ0FBQztRQUNOLENBQUM7UUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELFFBQVEsRUFBRSxDQUFDO1FBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0saUJBQWlCLENBQUMsRUFBeUI7UUFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7SUFDTCxDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7Ozs7O0FDM0lnRDtBQUNKO0FBR3ZDO0lBUUYsWUFBWSxXQUF3QixFQUFFLEtBQWdCLEVBQUUsUUFBaUIsSUFBSTtRQUN6RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUUvQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksa0VBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLDhEQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksOERBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLFNBQVM7UUFDWixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUVqQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVoQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUV0RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUQsQ0FBQztDQUNKO0FBQUE7QUFBQTs7Ozs7Ozs7OztBQzVDaUU7QUFDckI7QUFHdkMsWUFBYyxTQUFRLHVGQUFzQjtJQVE5QztRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDhEQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRXZDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxQixJQUFJLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFFckIsSUFBSSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLElBQUksRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUVoRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RixDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBQUE7QUFBQTs7Ozs7Ozs7QUN0REs7SUFRRixZQUFZLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBc0IsSUFBSTtRQUNqRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNmLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBRWhCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7WUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJO1lBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELEdBQUcsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBS0o7QUFBQTtBQUFBOzs7Ozs7OztBQzFCSztJQU9GLFlBQVksV0FBbUIsRUFBRSxXQUFtQjtRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7Ozs7QUNkNEM7QUFPdkM7SUFRRjtRQVBPLGFBQVEsR0FBWSxJQUFJLDhEQUFPLEVBQUUsQ0FBQztRQUNsQyxVQUFLLEdBQVksSUFBSSw4REFBTyxFQUFFLENBQUM7UUFDL0IsV0FBTSxHQUFZLElBQUksOERBQU8sRUFBRSxDQUFDO1FBQ2hDLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixrQkFBYSxHQUFZLElBQUksOERBQU8sRUFBRSxDQUFDO0lBRS9CLENBQUM7SUFFVCxLQUFLLENBQUMsT0FBZ0I7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7Ozs7OztBQzdCbUM7QUFFRjtBQUNXO0FBSzdDLE1BQU0sT0FBTyxHQUFZLElBQUkseURBQU8sRUFBRSxDQUFDO0FBRXZDLE1BQU0sT0FBTyxHQUFXLElBQUksQ0FBQztBQUU3QixJQUFJLFlBQVksR0FBVyxDQUFDLENBQUM7QUFFdEIsTUFBTSxPQUFPLEdBQUcsVUFBUyxNQUFlLEVBQUUsTUFBZTtJQUM1RCxZQUFZLEVBQUUsQ0FBQztJQUNmLHlFQUF5RTtJQUN6RSxvQ0FBb0M7SUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUUvRixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUV2RCxjQUFjO0lBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyx1REFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFFOUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBRXJCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckMsMkNBQTJDO1FBQzNDLFFBQVEsR0FBRyxzQkFBc0IsQ0FDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ25CLE9BQU8sQ0FDVixDQUFDO1FBRUYsaURBQWlEO0lBQ3JELENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUMsZ0RBQWdEO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQywrQkFBK0I7WUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM5QixvQkFBb0I7WUFDcEIsRUFBRSxDQUFDLENBQ0Msc0JBQXNCLENBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFDakIsT0FBTyxDQUNWLElBQUksSUFDVCxDQUFDLENBQUMsQ0FBQztnQkFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM5QixvQkFBb0I7WUFDcEIsRUFBRSxDQUFDLENBQ0Msc0JBQXNCLENBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFDakIsT0FBTyxDQUNWLElBQUksSUFDVCxDQUFDLENBQUMsQ0FBQztnQkFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSiwwQkFBMEI7WUFDMUIsUUFBUSxHQUFHLHNCQUFzQixDQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDbkIsT0FBTyxDQUNWLENBQUM7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osZ0RBQWdEO1FBQ2hELFlBQVk7UUFDWixJQUFJLFdBQVcsRUFBRSxZQUFZLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsV0FBVyxHQUFHLE1BQU0sQ0FBQztZQUNyQixZQUFZLEdBQUcsTUFBTSxDQUFDO1FBQzFCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDckIsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUMxQixDQUFDO1FBQ0QsTUFBTTtRQUNOLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3QixRQUFRLEdBQUcsVUFBVSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNYLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLHFCQUFxQixDQUNqQixZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFDMUIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUN6QixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDeEIsV0FBVyxDQUFDLFlBQVksRUFDeEIsT0FBTyxDQUNWLENBQUM7WUFDRixvREFBb0Q7WUFDcEQsUUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNMLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFBQTtBQUFBO0FBRUssTUFBTSxVQUFVLEdBQUcsVUFBUyxZQUFxQixFQUFFLFdBQW9CO0lBQzFFLHVKQUF1SjtJQUN2SixNQUFNLENBQUMsc0JBQXNCLENBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUN6QixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDeEIsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQzFCLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFDdkIsT0FBTyxDQUNWLENBQUM7QUFDTixDQUFDLENBQUM7QUFBQTtBQUFBO0FBRUssTUFBTSxPQUFPLEdBQUcsVUFBUyxHQUFRLEVBQUUsS0FBYztJQUNwRCxFQUFFLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0csR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUFBO0FBQUE7QUFFSyxNQUFNLE1BQU0sR0FBRyxVQUFTLEtBQVcsRUFBRSxLQUFXLEVBQUUsTUFBYyxFQUFFLENBQVM7SUFDOUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDN0MsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDN0MsNERBQTREO0lBQzVELG9GQUFvRjtJQUNwRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWTtJQUNyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQUMsTUFBTSxDQUFDO0lBQzFCLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDckIsSUFBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztJQUVyQixJQUFJLFdBQVcsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ2hDLElBQUksSUFBSSxXQUFXLENBQUM7SUFDcEIsSUFBSSxJQUFJLFdBQVcsQ0FBQztJQUNwQixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDbEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDhEQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDhEQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLHVEQUF1RDtJQUN2RCx5REFBeUQ7QUFDN0QsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUVLLE1BQU0sc0JBQXNCLEdBQUcsVUFDbEMsZUFBd0IsRUFDeEIsY0FBdUIsRUFDdkIsZUFBd0IsRUFDeEIsY0FBdUIsRUFDdkIsT0FBZ0I7SUFFaEIsSUFBSSxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQy9DLElBQUksRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVELEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzFCLElBQUksRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUMvQyxJQUFJLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1RCxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUMxQixFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNWLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDN0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0QixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbkUsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUVLLE1BQU0sV0FBVyxHQUFHLFVBQ3ZCLE9BQWdCLEVBQ2hCLGFBQXNCLEVBQ3RCLFlBQXFCLEVBQ3JCLFFBQWdCLEVBQ2hCLFFBQWdCO0lBRWhCLE1BQU0sQ0FBQywyQkFBMkIsQ0FDOUIsYUFBYSxFQUNiLFlBQVksRUFDWixPQUFPLENBQUMsS0FBSyxFQUNiLE9BQU8sQ0FBQyxLQUFLLEVBQ2IsT0FBTyxDQUFDLElBQUksRUFDWixRQUFRLEVBQ1IsUUFBUSxDQUNYLENBQUM7QUFDTixDQUFDLENBQUM7QUFBQTtBQUFBO0FBRUssTUFBTSwyQkFBMkIsR0FBRyxVQUN2QyxhQUFzQixFQUN0QixZQUFxQixFQUNyQixnQkFBeUIsRUFDekIsS0FBYyxFQUNkLElBQWEsRUFDYixRQUFnQixFQUNoQixRQUFnQjtJQUVoQixtQ0FBbUM7SUFDbkMsbUNBQW1DO0lBRW5DLG1DQUFtQztJQUNuQyxtQ0FBbUM7SUFFbkMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFeEcsSUFBSSxRQUFRLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkcsSUFBSSxRQUFRLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFdkcsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLFFBQVEsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUUvRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUUzQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBRWhELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUVLLE1BQU0seUJBQXlCLEdBQUcsVUFDckMsYUFBc0IsRUFDdEIsWUFBcUIsRUFDckIsZ0JBQXlCLEVBQ3pCLGFBQXNCLEVBQ3RCLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLE9BQWdCO0lBRWhCLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRWpDLElBQUksS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVoQyxJQUFJLFNBQVMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDdEcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBRXRHLElBQUksUUFBUSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNyRyxJQUFJLFFBQVEsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7SUFFckcsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLFFBQVEsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUUvRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUUzQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBRWhELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRWpELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxRCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFMUQsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUFBQTtBQUFBO0FBRUssTUFBTSxzQkFBc0IsR0FBRyxVQUNsQyxlQUF3QixFQUN4QixjQUF1QixFQUN2QixlQUF3QixFQUN4QixjQUF1QixFQUN2QixZQUFxQixFQUNyQixPQUFnQjtJQUVoQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixFQUFFLENBQUMsQ0FDQyx5QkFBeUIsQ0FDckIsZUFBZSxFQUNmLGNBQWMsRUFDZCxlQUFlLEVBQ2YsWUFBWSxFQUNaLGNBQWMsQ0FBQyxDQUFDLEVBQ2hCLGNBQWMsQ0FBQyxDQUFDLEVBQ2hCLE9BQU8sQ0FFZixDQUFDLENBQUMsQ0FBQztZQUNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzVFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzVFLG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDN0QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDLENBQUM7QUFBQTtBQUFBO0FBRUssTUFBTSxxQkFBcUIsR0FBRyxVQUNqQyxlQUF3QixFQUN4QixjQUF1QixFQUN2QixlQUF3QixFQUN4QixjQUF1QixFQUN2QixJQUFhLEVBQ2IsT0FBZ0I7SUFFaEIseUNBQXlDO0lBQ3pDLElBQUksRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUMvQyxJQUFJLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU1RCxJQUFJLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsSUFBSSxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUQsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDVixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTNCLGtEQUFrRDtJQUNsRCxrREFBa0Q7SUFFbEQscUJBQXFCO0lBQ3JCLHdDQUF3QztJQUN4Qyw0QkFBNEI7SUFDNUIsV0FBVztJQUNYLDRCQUE0QjtJQUM1Qix5Q0FBeUM7SUFDekMsSUFBSTtJQUNKLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUN2RixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFFdkYsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbEMsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFFbEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRW5FLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUVGLDRKQUE0SjtBQUU1SixpREFBaUQ7QUFDakQsdURBQXVEO0FBQ3ZELHNFQUFzRTtBQUV0RSx1REFBdUQ7QUFDdkQsc0VBQXNFO0FBRXRFLG9CQUFvQjtBQUNwQiw2Q0FBNkM7QUFDN0MsaUNBQWlDO0FBQ2pDLGdCQUFnQjtBQUNoQixpQ0FBaUM7QUFDakMsNkNBQTZDO0FBQzdDLFNBQVM7QUFFVCw2QkFBNkI7QUFDN0IsOEJBQThCO0FBRTlCLGdHQUFnRztBQUNoRyxnR0FBZ0c7QUFFaEcsMENBQTBDO0FBQzFDLDBDQUEwQztBQUUxQyx1RUFBdUU7QUFFdkUsb0JBQW9CO0FBQ3BCLGlDQUFpQztBQUNqQyxTQUFTO0FBQ1QsaUJBQWlCO0FBQ2pCLEtBQUs7QUFFTDs7TUFFTTtBQUNDLE1BQU0sZ0NBQWdDLEdBQUcsVUFDNUMsZUFBd0IsRUFDeEIsY0FBdUIsRUFDdkIsZUFBd0IsRUFDeEIsY0FBdUIsRUFDdkIsTUFBZSxFQUNmLE9BQWdCO0lBRWhCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUN2RixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFFdkYsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbEMsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFFbEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRW5FLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUVGLE1BQU0sMEJBQTBCLEdBQUcsVUFDL0IsZUFBd0IsRUFDeEIsY0FBdUIsRUFDdkIsZUFBd0IsRUFDeEIsY0FBdUIsRUFDdkIsSUFBYSxFQUNiLE9BQWdCO0lBRWhCLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDO0lBRTVCLHlDQUF5QztJQUN6QyxJQUFJLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsSUFBSSxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUQsSUFBSSxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQy9DLElBQUksRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVELGVBQWU7SUFDZix3Q0FBd0M7SUFDeEMsNEJBQTRCO0lBQzVCLFdBQVc7SUFDWCw0QkFBNEI7SUFDNUIsd0NBQXdDO0lBQ3hDLElBQUk7SUFFSiw4QkFBOEI7SUFDOUIsOEJBQThCO0lBRTlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRXpCLGtEQUFrRDtJQUNsRCxrREFBa0Q7SUFFbEQscUJBQXFCO0lBQ3JCLHdDQUF3QztJQUN4Qyw0QkFBNEI7SUFDNUIsV0FBVztJQUNYLDRCQUE0QjtJQUM1Qix5Q0FBeUM7SUFDekMsSUFBSTtJQUNKLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUN2RixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFFdkYsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRWxDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUVuRSxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQzs7Ozs7Ozs7QUM1ZUk7SUFXRixNQUFNO0lBQ04scUNBQXFDO0lBQ3JDLHFDQUFxQztJQUNyQyxFQUFFO0lBQ0YscUNBQXFDO0lBQ3JDLHFDQUFxQztJQUNyQyxFQUFFO0lBQ0YsdUNBQXVDO0lBQ3ZDLG9FQUFvRTtJQUVwRSxZQUFZLGVBQXVCLEdBQUcsRUFBRSxXQUFtQixVQUFVLEVBQUUsYUFBcUIsR0FBRztRQXBCL0Ysb0RBQW9EO1FBQ3BELG1EQUFtRDtRQUNuRCwwQ0FBMEM7UUFDbkMsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUU5QixpQ0FBaUM7UUFDMUIsaUJBQVksR0FBVyxNQUFNLENBQUM7UUFDckMsMkNBQTJDO1FBQ3BDLGFBQVEsR0FBVyxVQUFVLENBQUM7UUFhakMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBZSxFQUFFLE9BQWU7UUFDekMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUVwRCx3R0FBd0c7UUFDeEcsb0JBQW9CO1FBQ3BCLElBQUk7UUFFSixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFFdkcsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhHLFNBQVM7UUFDVCx3RUFBd0U7UUFDeEUsd0VBQXdFO1FBQ3hFLElBQUk7UUFDSixlQUFlO0lBQ25CLENBQUM7SUFFTSxLQUFLO1FBQ1IsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekUsQ0FBQztDQUNKO0FBQUE7QUFBQTs7Ozs7Ozs7QUNoREs7SUFTRixZQUFZLFVBQWtCLENBQUMsRUFBRSxhQUFxQixHQUFHLEVBQUUsV0FBbUIsR0FBRztRQUM3RSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDOzs7O0FBWk0sZUFBTSxHQUFhLElBQUksUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDN0MsbUJBQVUsR0FBYSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELGFBQUksR0FBYSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7OztBQ0hsRDtJQUVGLFlBQVksS0FBYTtRQURsQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQUFBO0FBQUE7Ozs7Ozs7O0FDTEs7SUFJRixZQUFZLGNBQXNCLEVBQUU7UUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sY0FBYyxDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7Ozs7O0FDZjRDO0FBRTdDLE1BQU0sSUFBSSxHQUFHLElBQUksa0VBQVMsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGc0I7QUFDbUM7QUFDMUM7QUFDaUI7QUFDSTtBQUVlO0FBU25EO0FBQ21EO0FBQ0c7QUFDUDtBQUNjO0FBQ1E7QUFDZjtBQUNJO0FBQ0U7QUFDVjtBQUNRO0FBQzVCO0FBQ3FCO0FBQ3JCO0FBQ047QUFDUjtBQUN5QjtBQUNUO0FBQ0o7QUFDMEI7QUFDZDtBQUNLO0FBQ29CO0FBQ3JCO0FBQ2xCO0FBQytCO0FBQ1o7QUFHbUI7QUFjN0YsTUFBTSxRQUFRLEdBQVcsaUJBQWlCLENBQUM7QUFDM0MsTUFBTSxjQUFjLEdBQVcsbUJBQW1CLENBQUM7QUFDbkQsTUFBTSxZQUFZLEdBQVcsa0JBQWtCLENBQUM7QUFDaEQsTUFBTSxhQUFhLEdBQVcsa0JBQWtCLENBQUM7QUFFakQsTUFBTSx1QkFBdUIsR0FBVyxxQkFBcUIsQ0FBQztBQUM5RCxNQUFNLHFCQUFxQixHQUFXLG9CQUFvQixDQUFDO0FBQzNELE1BQU0sc0JBQXNCLEdBQVcsMEJBQTBCLENBQUM7QUFDbEUsTUFBTSxrQkFBa0IsR0FBVyxzQkFBc0IsQ0FBQztBQUUxRCx1REFBdUQ7QUFDdkQsMERBQTBEO0FBQzFELDBEQUEwRDtBQUMxRCwwREFBMEQ7QUFFMUQsTUFBTSxpQkFBaUIsR0FBVyxtQkFBbUIsQ0FBQztBQUV0RCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFFZixlQUFpQixTQUFRLHVFQUFXO0lBR3RDO1FBQ0ksTUFBTSxNQUFNLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFzQixDQUFDO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QyxNQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBVyxDQUFDO1FBRTlFLElBQUksV0FBVyxHQUFHLElBQUksZ0VBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkYsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksMEdBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBRTFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM5RyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBRTdGLE1BQU0sVUFBVSxHQUFHLHNGQUFtQixDQUFDLGlGQUFjLENBQUMsMkVBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sV0FBVyxHQUFHLHNGQUFtQixDQUFDLGlGQUFjLENBQUMsMkVBQVEsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLE1BQU0sV0FBVyxHQUFHLHNGQUFtQixDQUFDLGlGQUFjLENBQUMsMkVBQVEsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpGLE1BQU0sYUFBYSxHQUFHLHVGQUFvQixDQUN0QyxpRkFBYyxDQUFDLDJFQUFRLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQzdDLDZFQUFVLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFDeEMsU0FBUyxDQUNaLENBQUM7UUFFRixJQUFJLGVBQWUsR0FBRyxJQUFJLG9HQUFlLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVyRCxlQUFlLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDeEUsZUFBZSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXhELGVBQWUsQ0FBQyxvQkFBb0IsQ0FDaEMsV0FBVyxFQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFDcEUsYUFBYSxFQUNiLENBQUMsRUFDRCxDQUFDLENBQ0osQ0FBQztRQUNGLGVBQWUsQ0FBQyxvQkFBb0IsQ0FDaEMsV0FBVyxFQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFDcEUsYUFBYSxFQUNiLENBQUMsRUFDRCxDQUFDLENBQ0osQ0FBQztRQUNGLGVBQWUsQ0FBQyxvQkFBb0IsQ0FDaEMsVUFBVSxFQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFDcEUsWUFBWSxFQUNaLENBQUMsRUFDRCxDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLElBQUksb0dBQWMsRUFBRSxDQUFDO1FBQzFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwRixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksZ0dBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUV2RixNQUFNLGdCQUFnQixHQUFHLElBQUksK0dBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDekIsSUFBSSxtSEFBd0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FDOUcsQ0FBQztRQUVGLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSwyR0FBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFckUsTUFBTSxVQUFVLEdBQUcsSUFBSSx1SEFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSx3R0FBbUIsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLHdHQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLDRHQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLDhHQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLG9HQUFpQixFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksNEdBQXFCLEVBQUUsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSwrRkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksK0ZBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLGtIQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUV2RixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFDckIsQ0FBQztZQUNELENBQUMsSUFBSSxFQUFFLENBQUM7WUFDUixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDVixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNOLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixDQUFDO1lBRUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxrRUFBSSxDQUFDLDBFQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixXQUFXLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBRXJDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFO2dCQUN2QyxJQUFJLGlGQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLGdGQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxxRkFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDdkIsSUFBSSx1R0FBaUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDO2dCQUN4QyxJQUFJLHFHQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLGdGQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQzdDLElBQUksMkZBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDO2dCQUNsQyxJQUFJLGtGQUFRLEVBQUU7Z0JBQ2QsSUFBSSw4RUFBTSxFQUFFO2dCQUNaLElBQUksMEZBQVksQ0FBQyxHQUFHLENBQUM7YUFFeEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELE1BQU0sR0FBRyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFDLGlGQUFRLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMseUJBQXlCO1FBRXRFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQzVCLElBQUksZ0ZBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pCLElBQUkscUdBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7WUFDckMsSUFBSSw0RUFBSyxFQUFFO1lBQ1gsSUFBSSw4RUFBTSxFQUFFO1lBQ1osSUFBSSw4RkFBWSxDQUFDLFdBQVcsQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBYyxFQUFFLE1BQWM7UUFDdEMsTUFBTSxDQUFDLElBQUksaUZBQVEsQ0FBQyxNQUFNLEdBQUcsU0FBUyxFQUFFLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRyxDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7O0FDcE9rRDtBQUNiO0FBQ1c7QUFDTjtBQUNGO0FBRW5DO0lBU0YsWUFBWSxNQUF3QjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZ0VBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx3RUFBWSxFQUFFLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBQyxJQUFJLDhEQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksMkRBQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTSxVQUFVLENBQUMsU0FBdUI7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHNFQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxTQUFTO0lBQ2hCLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBWSxFQUFDLEdBQVU7UUFDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLFNBQVM7SUFDaEIsQ0FBQztJQUVNLFVBQVU7SUFDakIsQ0FBQztDQUVKO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDakR5QztBQUVwQztJQVNGO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw4REFBTyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksOERBQU8sRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSw4REFBTyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVNLFdBQVcsQ0FBQyxNQUFtQixFQUFFLGVBQXdCO1FBQzVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLHdEQUF3RDtRQUV4RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkUsd0ZBQXdGO1FBQ3hGLG9GQUFvRjtRQUNwRixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUMzQyxDQUFDO0lBRU0sMEJBQTBCO1FBQzdCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTSxNQUFNLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsNkNBQTZDO1FBQzdDLDZDQUE2QztRQUM3QyxvREFBb0Q7UUFDcEQsb0RBQW9EO0lBQ3hELENBQUM7SUFFTSxPQUFPLENBQUMsS0FBb0I7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9DLENBQUM7UUFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFvQjtRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxTQUFTLENBQUMsS0FBb0I7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQW9CO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sU0FBUyxDQUFDLEtBQWlCO1FBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDOUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsOEJBQThCO0lBQzlCLElBQUk7SUFFSixvREFBb0Q7SUFDcEQsdUJBQXVCO0lBQ3ZCLElBQUk7SUFFRyxPQUFPLENBQUMsT0FBZTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLFdBQVcsQ0FBQyxPQUFlO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxlQUFlLENBQUMsT0FBZTtRQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLFFBQVEsQ0FBQyxPQUFlO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7Ozs7QUN4R21DO0FBRzlCO0lBTUY7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSx3REFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLG1CQUFtQixDQUFDLFdBQW1CO1FBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQVksRUFBRSxFQUFFLENBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQ3pHLENBQUM7SUFDTixDQUFDO0lBRU0sWUFBWTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxNQUFhLEVBQUUsU0FBMkI7UUFDbkUsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU0scUJBQXFCLENBQUMsTUFBYyxFQUFFLGVBQXNCO1FBQy9ELGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sMEJBQTBCLENBQUMsTUFBYyxFQUFFLGtCQUF1QztRQUNyRixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxNQUFjO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ3RFLENBQUM7SUFDTixDQUFDO0lBRU0sTUFBTSxDQUFDLEVBQVUsRUFBRSxTQUFpQjtRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU8sV0FBVyxDQUFDLE1BQWM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ2hCLE1BQU0sQ0FBQyxFQUFFLENBQ0wsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3BCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQ2xFLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUMzQixLQUFLLENBQUM7WUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FDeEMsQ0FBQztJQUNOLENBQUM7SUFFTyx5QkFBeUIsQ0FBQyxNQUFjLEVBQUUsTUFBYztRQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTywwQkFBMEIsQ0FBQyxhQUFxQjtRQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0NBQ0o7QUFBQTtBQUFBO0FBRUQsOEZBQThGO0FBQzlGLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUM1QixNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7O0FDbEZsRDtJQU1GLFlBQVksT0FBdUI7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLFdBQVcsQ0FBQyxRQUFnQjtRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLGtCQUFrQixJQUFJLFFBQVEsQ0FBQztJQUN4QyxDQUFDO0lBRU0sT0FBTztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDMUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sSUFBSSxDQUFDLElBQU87UUFDZixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzVCLENBQUM7Q0FDSjtBQUFBO0FBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQy9CLGNBQWMsQ0FBQyxHQUFHLENBQUM7S0FDZCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Ozs7Ozs7O0FDekNlO0FBU3JDO0lBUUY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLCtEQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFXLENBQUM7SUFDeEMsQ0FBQztJQUVNLGVBQWUsQ0FBQyxJQUFtQjtRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxRQUFRLENBQUMsR0FBVztRQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVPLGFBQWEsQ0FBQyxHQUFXO1FBQzdCLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sSUFBSTtRQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUM3RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUFhO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQUFBO0FBQUE7QUFFRDtJQUtJLFlBQVksR0FBZ0I7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFXO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0lBRU0sSUFBSTtRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBWTtRQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVNLFFBQVE7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBQ0o7QUFFRDtJQUtJLFlBQVksR0FBZ0I7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFXO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxJQUFJO1FBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQVk7UUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTTtRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFFTSxRQUFRO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQzdCLENBQUM7Q0FDSjs7Ozs7Ozs7O0FDdkkrQztBQUUxQztJQU9GO1FBTlEsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFDaEMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDcEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUN6QixxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDbEMsV0FBTSxHQUFZLElBQUksQ0FBQztJQUVmLENBQUM7SUFFVCxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTTtRQUNwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2hILENBQUM7SUFDTCxDQUFDO0lBRU8saUJBQWlCLENBQUMsUUFBUSxFQUFFLE1BQWUsRUFBRSxlQUFlLEVBQUUsUUFBZ0I7UUFDbEYsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN6RSxJQUFJLE9BQXNCLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FDWCxnQkFBZ0I7b0JBQ1osQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUN0QixhQUFhO29CQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUN2QiwrREFBK0QsQ0FDdEUsQ0FBQztZQUNOLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLEdBQUcsSUFBSSxxRUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUvRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTyxXQUFXLENBQUMsT0FBc0I7UUFDdEMsMkJBQTJCO1FBRTNCLElBQUksQ0FBQyxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBRXRDLEdBQUcsQ0FBQztZQUNBLEVBQUUsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUU5RSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE9BQU87UUFDdEMsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDdEMsSUFBSSxHQUFrQixDQUFDO1FBRXZCLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFlLElBQUk7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQXVCLElBQUksRUFBRSxXQUFtQixDQUFDO1FBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxrQkFBdUIsSUFBSSxFQUFFLFdBQW1CLENBQUM7UUFDdEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUzQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQWUsSUFBSTtRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxHQUFXLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxxRUFBcUU7WUFDbkcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxTQUFTO1FBQ1osSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFdEMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQyxDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxlQUFlO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRU0sSUFBSTtRQUNQLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxHQUFHLFNBQWdCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDdEMsSUFBSSxRQUF5QixDQUFDO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTCw0QkFBNEI7WUFDNUIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtRQUUxRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLENBQUMsNEVBQTRFO1FBRTFHLEdBQUcsQ0FBQztZQUNBLENBQUMsRUFBRSxDQUFDO1FBQ1IsQ0FBQyxRQUFRLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLEVBQUU7SUFDL0YsQ0FBQztJQUVNLE1BQU07UUFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTztRQUNWLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFTSxRQUFRO1FBQ1gsTUFBTSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUM3RixDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7OztBQzlKSztJQVVGLFlBQVksTUFBYyxFQUFFLFFBQVEsRUFBRSxNQUFlLEVBQUUsZUFBZSxFQUFFLFdBQW1CLENBQUM7UUFIckYsV0FBTSxHQUFZLElBQUksQ0FBQztRQUN2QixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBR2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sT0FBTyxDQUFDLFNBQWlCO1FBQzVCLElBQUksYUFBYSxDQUFDO1FBQ2xCLElBQUksTUFBTSxDQUFDO1FBRVgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFFakUsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRU0sTUFBTTtRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDckYsQ0FBQztJQUVNLE9BQU87UUFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQUVNLE1BQU07UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRU0sV0FBVztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTSxTQUFTO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVNLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRU0sUUFBUTtRQUNYLE1BQU0sQ0FBQyxDQUNILHdCQUF3QixHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQzVHLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7OztBQ3BFRCxNQUFNLFNBQVMsR0FBVyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUVyQztJQVNGO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQWlCO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUM7WUFDeEIsbUNBQW1DO1lBQ25DLDhEQUE4RDtZQUM5RCw2Q0FBNkM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxLQUFLO1FBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLElBQUk7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDSjtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDeUM7QUFDZ0I7QUFDUjtBQUVMO0FBQ0U7QUFDUztBQUVHO0FBQ29CO0FBRWxCO0FBQ2Q7QUFFekMsMEJBQTRCLFNBQVEsMkRBQU07SUFVNUMsWUFBWSxNQUF5QixFQUFFLFdBQWtCO1FBQ3JELEtBQUssQ0FBQyxDQUFDLDJFQUFRLEVBQUUsc0VBQVEsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGlFQUFLLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksbUVBQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsU0FBUztRQUNMLDRDQUE0QztRQUU1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDRFQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLCtFQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxpRkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLG1HQUFzQixFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEdBQUcsZUFBZSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWMsRUFBRSxRQUFrQixFQUFFLFFBQWtCO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksbUVBQU0sRUFBRSxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzVFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDL0MsQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsZUFBZSxDQUFDLE1BQWMsRUFBRSxRQUFrQixFQUFFLFFBQWtCO1FBQ2xFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsSUFBSSxZQUFZLENBQUMsTUFBZTtRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFBQTtBQUFBOzs7Ozs7Ozs7QUN6RWlFO0FBRzVELFdBQWEsU0FBUSx1RkFBc0I7SUFFN0M7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sS0FBSyxJQUFFLElBQUksRUFBRSxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztDQUVKO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7QUNuQjRDO0FBQ0Q7QUFFSDtBQUluQztJQXVCRjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSw4REFBTyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDhEQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSw4REFBTyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksOERBQU8sRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLDBEQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLHFFQUFNLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLHFFQUFNLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLENBQVE7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsQ0FBUztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ00sYUFBYSxDQUFDLENBQVE7UUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNULHdCQUF3QjtRQUN4QixtQ0FBbUM7SUFDdkMsQ0FBQztJQUVNLGVBQWU7UUFDbEIsZ0NBQWdDO1FBQ2hDLHNDQUFzQztRQUN0QyxzQ0FBc0M7UUFFdEMseUJBQXlCO1FBQ3hCLDREQUE0RDtRQUM1RCw0REFBNEQ7UUFDN0QscURBQXFEO1FBQ3JELHFEQUFxRDtRQUVyRCw4QkFBOEI7UUFDOUIsOEJBQThCO1FBRTlCLElBQUksU0FBUyxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLFNBQVMsR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxzQkFBcUI7UUFDM0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxzQkFBcUI7UUFFM0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU5QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV0QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUVqRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRXJELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVyRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFFeEQsQ0FBQztJQUVNLFdBQVc7SUFFbEIsQ0FBQztDQUdKO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7OztBQ25JSztJQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUssa0JBQW1CLE1BQW9CO0lBQ3pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNkLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVLLGtCQUFtQixHQUFpQixFQUFFLElBQWtCLEVBQUUsSUFBa0I7SUFDOUUsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFFN0IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1osR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDWixHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1osR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDWixHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1osR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDWixHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNiLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDYixHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNiLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDYixHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNiLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUU1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUU1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFSyxlQUFnQixHQUFpQjtJQUNuQyxJQUFJLE1BQU0sR0FB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LEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDNUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDNUUsMEJBQTBCO1FBRTFCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMs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QUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVNLEdBQUcsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQVE7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDOUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFhO1FBQ3RCLHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMseUNBQXlDO1FBQ3pDLE1BQU0sQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxLQUFLO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUMxQyxDQUFDO0lBRU0sTUFBTTtRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDakRtQztBQUc5QjtJQU9GO1FBTk8sU0FBSSxHQUFTLElBQUksd0RBQUksRUFBRSxDQUFDO1FBQ3hCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsV0FBTSxHQUFXLElBQUksQ0FBQztRQUN0QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0lBRW5CLENBQUM7Q0FDbkI7QUFBQTtBQUFBOzs7Ozs7OztBQ1hLO0NBQ0w7QUFBQTtBQUFBIiwiZmlsZSI6Ii4vZGlzdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZmQ4OWEzMjM0MGJjZDQwNTMwZiIsImV4cG9ydCBjbGFzcyBWZWN0b3IyIHtcblxuICAgIHB1YmxpYyB4OiBudW1iZXI7XG4gICAgcHVibGljIHk6IG51bWJlcjtcblxuICAgIHN0YXRpYyBaRVJPX1RPTEVSQU5DRSA9IDFlLTg7XG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLjAsIHk6IG51bWJlciA9IDAuMCkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIHNldFRvKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgY29weSh2OiBWZWN0b3IyKSB7XG4gICAgICAgIHRoaXMueCA9IHYueDtcbiAgICAgICAgdGhpcy55ID0gdi55O1xuICAgIH1cblxuICAgIGNsb25lKCk6IFZlY3RvcjIge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54LCB0aGlzLnkpO1xuICAgIH1cblxuICAgIG5vcm1hbGl6ZSgpOiBudW1iZXIge1xuICAgICAgICB2YXIgdCA9IE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpICsgVmVjdG9yMi5aRVJPX1RPTEVSQU5DRTtcbiAgICAgICAgdGhpcy54IC89IHQ7XG4gICAgICAgIHRoaXMueSAvPSB0O1xuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG5cbiAgICBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICAgIH1cblxuICAgIGxlbmd0aFNxcmQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgICB9XG5cbiAgICBjbGFtcFNjYWxhcihtYXg6IG51bWJlcikge1xuICAgICAgICB2YXIgbCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgICAgIGlmIChsID4gbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm11bHRFcXVhbHMobWF4IC8gbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFtcFZlY3Rvcih2OiBWZWN0b3IyKSB7XG4gICAgICAgIHRoaXMueCA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMueCwgLXYueCksIHYueCk7XG4gICAgICAgIHRoaXMueSA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMueSwgLXYueSksIHYueSk7XG4gICAgfVxuXG4gICAgcGx1c0VxdWFscyh2OiBWZWN0b3IyKSB7XG4gICAgICAgIHRoaXMueCArPSB2Lng7XG4gICAgICAgIHRoaXMueSArPSB2Lnk7XG4gICAgfVxuXG4gICAgbWludXNFcXVhbHModjogVmVjdG9yMikge1xuICAgICAgICB0aGlzLnggLT0gdi54O1xuICAgICAgICB0aGlzLnkgLT0gdi55O1xuICAgIH1cblxuICAgIG11bHRFcXVhbHMoczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCAqPSBzO1xuICAgICAgICB0aGlzLnkgKj0gcztcbiAgICB9XG5cbiAgICBwbHVzTXVsdEVxdWFscyh2OiBWZWN0b3IyLCBzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ICs9IHYueCAqIHM7XG4gICAgICAgIHRoaXMueSArPSB2LnkgKiBzO1xuICAgIH1cblxuICAgIG1pbnVzTXVsdEVxdWFscyh2OiBWZWN0b3IyLCBzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54IC09IHYueCAqIHM7XG4gICAgICAgIHRoaXMueSAtPSB2LnkgKiBzO1xuICAgIH1cblxuICAgIGRvdCh2OiBWZWN0b3IyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcbiAgICB9XG5cbiAgICBjcm9zcyh2OiBWZWN0b3IyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueDtcbiAgICB9XG5cbiAgICBsZWZ0SGFuZE5vcm1hbCgpOiBWZWN0b3IyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRoaXMueSwgLXRoaXMueCk7XG4gICAgfVxuXG4gICAgbGVmdEhhbmROb3JtYWxFcXVhbHMoKSB7XG4gICAgICAgIHZhciB0ID0gdGhpcy54O1xuICAgICAgICB0aGlzLnggPSB0aGlzLnk7XG4gICAgICAgIHRoaXMueSA9IC10O1xuICAgIH1cblxuICAgIHJpZ2h0SGFuZE5vcm1hbCgpOiBWZWN0b3IyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKC10aGlzLnksIHRoaXMueCk7XG4gICAgfVxuXG4gICAgcmlnaHRIYW5kTm9ybWFsRXF1YWxzKCkge1xuICAgICAgICB2YXIgdCA9IHRoaXMueDtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueTtcbiAgICAgICAgdGhpcy55ID0gdDtcbiAgICB9XG5cbiAgICByZWZsZWN0RXF1YWxzKG5vcm1hbDogVmVjdG9yMikge1xuICAgICAgICB2YXIgZCA9IHRoaXMuZG90KG5vcm1hbCk7XG4gICAgICAgIHRoaXMueCAtPSAyICogZCAqIG5vcm1hbC54O1xuICAgICAgICB0aGlzLnkgLT0gMiAqIGQgKiBub3JtYWwueTtcbiAgICB9XG5cbiAgICBpbnRlcnBvbGF0ZSh2MTogVmVjdG9yMiwgdjI6IFZlY3RvcjIsIHQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNvcHkodjEpO1xuICAgICAgICB0aGlzLm11bHRFcXVhbHMoMSAtIHQpO1xuICAgICAgICB0aGlzLnBsdXNNdWx0RXF1YWxzKHYyLCB0KTtcbiAgICAgICAgLy8gcmV0dXJuIHYxLm11bHQoMSAtIHQpLnBsdXModjIubXVsdCh0KSk7XG4gICAgfVxuXG4gICAgc2V0QW5nbGUoYW5nbGU6IG51bWJlcikge1xuICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgdGhpcy54ID0gTWF0aC5jb3MoYW5nbGUpICogbGVuO1xuICAgICAgICB0aGlzLnkgPSBNYXRoLnNpbihhbmdsZSkgKiBsZW47XG4gICAgfVxuXG4gICAgcm90YXRlRXF1YWxzKGFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgdmFyIGE6IG51bWJlciA9IGFuZ2xlICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICB2YXIgY29zOiBudW1iZXIgPSBNYXRoLmNvcyhhKTtcbiAgICAgICAgdmFyIHNpbjogbnVtYmVyID0gTWF0aC5zaW4oYSk7XG4gICAgICAgIHRoaXMueCA9IGNvcyAqIHRoaXMueCAtIHNpbiAqIHRoaXMueTtcbiAgICAgICAgdGhpcy55ID0gY29zICogdGhpcy55ICsgc2luICogdGhpcy54O1xuICAgIH1cblxuICAgIHNldFVuaXRSb3RhdGlvbihhbmdsZTogbnVtYmVyKSB7XG4gICAgICAgIHZhciBhOiBudW1iZXIgPSBhbmdsZSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGhpcy54ID0gTWF0aC5jb3MoYSk7XG4gICAgICAgIHRoaXMueSA9IE1hdGguc2luKGEpO1xuICAgIH1cblxuICAgIGhlYWRpbmcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgIH1cblxuICAgIGRpc3RTcXJkKHY6IFZlY3RvcjIpOiBudW1iZXIge1xuICAgICAgICB2YXIgZFggPSB0aGlzLnggLSB2Lng7XG4gICAgICAgIHZhciBkWSA9IHRoaXMueSAtIHYueTtcbiAgICAgICAgcmV0dXJuIGRYICogZFggKyBkWSAqIGRZO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9nZW9tL1ZlY3RvcjIudHMiLCJpbXBvcnQgeyBJQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuL0NvbXBvbmVudFwiO1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4vRW50aXR5XCI7XG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi9FbmdpbmVcIjtcblxuaW50ZXJmYWNlIEVudGl0eUVudHJ5IHtcbiAgICBjb21wb25lbnRzOiBhbnlbXTtcbiAgICBib3VuZFVwZGF0ZTogKCkgPT4gdm9pZDtcbn1cbmV4cG9ydCBjbGFzcyBTeXN0ZW0ge1xuICAgIHB1YmxpYyBlbmdpbmU6IEVuZ2luZTtcbiAgICBwdWJsaWMgY29tcG9uZW50czogc3RyaW5nW107XG4gICAgcHVibGljIG1lbWJlcnM6IE1hcDxFbnRpdHksIEVudGl0eUVudHJ5PjtcbiAgICAvLyBwcml2YXRlIG1lbWJlcnNBc0FycmF5OiBFbnRpdHlFbnRyeVtdO1xuXG4gICAgcHJvdGVjdGVkIGR0OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRzOiBJQ29tcG9uZW50RmFjdG9yeVtdKSB7XG4gICAgICAgIHRoaXMubWVtYmVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgLy8gdGhpcy5tZW1iZXJzQXNBcnJheSA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzLm1hcChmYWN0b3J5ID0+IGZhY3RvcnkubmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZEVudGl0eShlbnRpdHk6IEVudGl0eSwgY29tcG9uZW50czogYW55W10pIHtcbiAgICAgICAgY29uc3QgYm91bmRVcGRhdGUgPSB0aGlzLnVwZGF0ZUVudGl0eS5iaW5kKHRoaXMsIGVudGl0eSwgLi4uY29tcG9uZW50cyk7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0geyBjb21wb25lbnRzLCBib3VuZFVwZGF0ZSB9O1xuICAgICAgICB0aGlzLm1lbWJlcnMuc2V0KGVudGl0eSwgZW50cnkpO1xuICAgICAgICAvLyB0aGlzLm1lbWJlcnNBc0FycmF5LnB1c2goZW50cnkpO1xuICAgICAgICB0aGlzLm9uRW50aXR5QWRkZWQoZW50aXR5LCAuLi5jb21wb25lbnRzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25FbnRpdHlBZGRlZChlbnRpdHk6IEVudGl0eSwgLi4uY29tcG9uZW50czogYW55W10pIHt9XG5cbiAgICBwdWJsaWMgcmVtb3ZlRW50aXR5KGVudGl0eTogRW50aXR5KSB7XG4gICAgICAgIGlmICghdGhpcy5tZW1iZXJzLmhhcyhlbnRpdHkpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5tZW1iZXJzLmdldChlbnRpdHkpO1xuICAgICAgICB0aGlzLm9uRW50aXR5UmVtb3ZlZChlbnRpdHksIC4uLmVudHJ5LmNvbXBvbmVudHMpO1xuICAgICAgICB0aGlzLm1lbWJlcnMuZGVsZXRlKGVudGl0eSk7XG4gICAgICAgIC8vIHRoaXMubWVtYmVyc0FzQXJyYXkuc3BsaWNlKHRoaXMubWVtYmVyc0FzQXJyYXkuaW5kZXhPZihlbnRyeSksIDEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkVudGl0eVJlbW92ZWQoZW50aXR5OiBFbnRpdHksIC4uLmNvbXBvbmVudHM6IGFueVtdKSB7fVxuXG4gICAgcHVibGljIHVwZGF0ZVN5c3RlbShkdDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZHQgPSBkdDtcbiAgICAgICAgdGhpcy5wcmVVcGRhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVBbGxFbnRpdGllcygpO1xuICAgICAgICB0aGlzLnBvc3RVcGRhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlVXBkYXRlKCkge31cblxuICAgIHB1YmxpYyB1cGRhdGVBbGxFbnRpdGllcygpIHtcbiAgICAgICAgZm9yKGxldCBpIG9mIHRoaXMubWVtYmVycy5rZXlzKCkpIHtcbiAgICAgICAgICAgIHRoaXMubWVtYmVycy5nZXQoaSkuYm91bmRVcGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zdCBsZW4gPSB0aGlzLm1lbWJlcnNBc0FycmF5Lmxlbmd0aDtcbiAgICAgICAgLy8gZm9yIChsZXQgaT0wOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgIC8vICAgICB0aGlzLm1lbWJlcnNBc0FycmF5W2ldLmJvdW5kVXBkYXRlKCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zdFVwZGF0ZSgpIHt9XG5cbiAgICBwdWJsaWMgdXBkYXRlRW50aXR5KGVudGl0eTogRW50aXR5LCAuLi5jb21wb25lbnRzOiBhbnlbXSkge31cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9lY3MvU3lzdGVtLnRzIiwiaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi8uLi9nZW9tL1ZlY3RvcjJcIjtcblxuZXhwb3J0IGNsYXNzIFBvc2l0aW9uIHtcbiAgICBwdWJsaWMgY29vcmRzOiBWZWN0b3IyO1xuICAgIHB1YmxpYyBwcmV2Q29vcmRzOiBWZWN0b3IyO1xuICAgIHB1YmxpYyBkaXJlY3Rpb246IFZlY3RvcjI7XG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNvb3JkcyA9IG5ldyBWZWN0b3IyKHgsIHkpO1xuICAgICAgICB0aGlzLnByZXZDb29yZHMgPSBuZXcgVmVjdG9yMih4LCB5KTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBuZXcgVmVjdG9yMigxLCAxKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKHBvc2l0aW9uOiBWZWN0b3IyKSB7XG4gICAgICAgIHRoaXMucHJldkNvb3Jkcy5jb3B5KHRoaXMuY29vcmRzKTtcbiAgICAgICAgdGhpcy5jb29yZHMuY29weShwb3NpdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb25lKCk6IFBvc2l0aW9uIHtcbiAgICAgICAgdmFyIGNsb25lID0gbmV3IFBvc2l0aW9uKHRoaXMuY29vcmRzLngsIHRoaXMuY29vcmRzLnkpO1xuICAgICAgICBjbG9uZS5wcmV2Q29vcmRzLmNvcHkodGhpcy5wcmV2Q29vcmRzKTtcbiAgICAgICAgY2xvbmUuZGlyZWN0aW9uLmNvcHkodGhpcy5kaXJlY3Rpb24pO1xuICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2NvcmUvY29tcG9uZW50cy9Qb3NpdGlvbi50cyIsImltcG9ydCB7IEJvZHkgfSBmcm9tIFwiLi4vQm9keVwiO1xuXG5leHBvcnQgY2xhc3MgUGh5c2ljc0JvZHkge1xuICAgIHB1YmxpYyBib2R5OiBCb2R5O1xuICAgIHB1YmxpYyBzZXRNYXNzRnJvbVZvbHVtZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGJvZHk6IEJvZHksIHNldE1hc3NGcm9tVm9sdW1lOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICAgICAgdGhpcy5zZXRNYXNzRnJvbVZvbHVtZSA9IHNldE1hc3NGcm9tVm9sdW1lO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9waHlzaWNzL2NvbXBvbmVudHMvUGh5c2ljc0JvZHkudHMiLCJpbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uLy4uL2dlb20vVmVjdG9yMlwiO1xuXG5leHBvcnQgY2xhc3MgRXh0ZW50cyB7XG4gICAgcHVibGljIGhhbGZXaWR0aHM6IFZlY3RvcjI7XG4gICAgcHVibGljIG9mZnNldDogVmVjdG9yMjtcblxuICAgIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBvZmZzZXRYOiBudW1iZXIgPSAwLCBvZmZzZXRZOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuaGFsZldpZHRocyA9IG5ldyBWZWN0b3IyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLm9mZnNldCA9IG5ldyBWZWN0b3IyKG9mZnNldFgsIG9mZnNldFkpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9jb3JlL2NvbXBvbmVudHMvRXh0ZW50cy50cyIsImltcG9ydCB7IERpc3BsYXlPYmplY3QgfSBmcm9tIFwiLi9ESXNwbGF5T2JqZWN0XCI7XG5pbXBvcnQgeyBBQUJCMiB9IGZyb20gXCIuLi8uLi9nZW9tL0FBQkIyXCI7XG5pbXBvcnQgeyBTdGFnZSB9IGZyb20gXCIuL1N0YWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGV4dGVuZHMgRGlzcGxheU9iamVjdCB7XG4gICAgcHVibGljIGhlYWQ6IERpc3BsYXlPYmplY3Q7XG4gICAgcHVibGljIHRhaWw6IERpc3BsYXlPYmplY3Q7XG4gICAgcHVibGljIGNoaWxkQ291bnQ6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdWJUcmVlQUFCQjogQUFCQjI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdWJUcmVlQUFCQiA9IG5ldyBBQUJCMigpO1xuICAgICAgICB0aGlzLmNoaWxkQ291bnQgPSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDaGlsZChjaGlsZDogRGlzcGxheU9iamVjdCkge1xuICAgICAgICBpZiAoY2hpbGQucGFyZW50ICE9IG51bGwpIGNoaWxkLnBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0RW5kKGNoaWxkKTtcbiAgICAgICAgdGhpcy5jaGlsZEFkZGVkKGNoaWxkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2hpbGRBdChjaGlsZDogRGlzcGxheU9iamVjdCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5jaGlsZENvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRCZWdpbm5pbmcoY2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRCZWZvcmUodGhpcy5maW5kQ2hpbGRCeUluZGV4KGluZGV4KSwgY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRBZGRlZChjaGlsZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGlsZEFkZGVkKGNoaWxkOiBEaXNwbGF5T2JqZWN0KSB7XG4gICAgICAgIHRoaXMuY2hpbGRDb3VudCsrO1xuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZENoaWxkQnlJbmRleChpbmRleDogbnVtYmVyKTogRGlzcGxheU9iamVjdCB7XG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuaGVhZDtcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgd2hpbGUgKGNoaWxkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCsrID09IGluZGV4KSByZXR1cm4gY2hpbGQ7XG4gICAgICAgICAgICBjaGlsZCA9IGNoaWxkLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudGFpbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQoY2hpbGQ6IERpc3BsYXlPYmplY3QpIHtcbiAgICAgICAgaWYgKGNoaWxkLnBhcmVudCA9PSB0aGlzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShjaGlsZCk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkUmVtb3ZlZChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGRBdChpbmRleDogbnVtYmVyKTogRGlzcGxheU9iamVjdCB7XG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuZmluZENoaWxkQnlJbmRleChpbmRleCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGlsZFJlbW92ZWQoY2hpbGQ6IERpc3BsYXlPYmplY3QpIHtcbiAgICAgICAgdGhpcy5jaGlsZENvdW50LS07XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVRyYW5zZm9ybSgpIHtcbiAgICAgICAgLy9SZXNldCBBQUJCXG4gICAgICAgIHRoaXMuYWFiYi5yZXNldCgpO1xuICAgICAgICBzdXBlci51cGRhdGVUcmFuc2Zvcm0oKTtcbiAgICAgICAgdGhpcy5jYWxjRXh0ZW50cygpO1xuICAgICAgICB0aGlzLnN1YlRyZWVBQUJCLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuc3ViVHJlZUFBQkIuYWRkQUFCQih0aGlzLmFhYmIpO1xuICAgICAgICAvL0V4cGFuZCBBQUFCQiB0byB0aGlzIERpc3BsYXlPYmplY3QgLT4gTmV3IHJlcXVpcmVkXG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuaGVhZDtcbiAgICAgICAgd2hpbGUgKGNoaWxkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNoaWxkLnVwZGF0ZVRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgLy9JbmZsYXRlIHRoaXMgQUFCQiB0byBlbmNhcHN1bGF0ZSBjaGlsZFxuICAgICAgICAgICAgdGhpcy5zdWJUcmVlQUFCQi5hZGRBQUJCKGNoaWxkLmFhYmIpO1xuICAgICAgICAgICAgY2hpbGQgPSBjaGlsZC5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHVibGljIGFwcGx5KHNsb3Q6RGlzcGxheU9iamVjdC0+RHluYW1pYy0+Vm9pZCxwOkR5bmFtaWM9bnVsbCkge1xuXG4gICAgLy8gfVxuXG4gICAgLy9UT0RPIFByb2JhYmx5IGdldCByaWQgb2YgdGhpcy4uLlxuXG4gICAgLy9MaW5rZWQgTGlzdHNcbiAgICBwdWJsaWMgaW5zZXJ0QWZ0ZXIobm9kZTogRGlzcGxheU9iamVjdCwgbmV3Tm9kZTogRGlzcGxheU9iamVjdCkge1xuICAgICAgICBuZXdOb2RlLnByZXYgPSBub2RlO1xuICAgICAgICBuZXdOb2RlLm5leHQgPSBub2RlLm5leHQ7XG4gICAgICAgIGlmIChub2RlLm5leHQgPT0gbnVsbCkgdGhpcy50YWlsID0gbmV3Tm9kZTtcbiAgICAgICAgZWxzZSBub2RlLm5leHQucHJldiA9IG5ld05vZGU7XG4gICAgICAgIG5vZGUubmV4dCA9IG5ld05vZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGluc2VydEJlZm9yZShub2RlOiBEaXNwbGF5T2JqZWN0LCBuZXdOb2RlOiBEaXNwbGF5T2JqZWN0KSB7XG4gICAgICAgIG5ld05vZGUucHJldiA9IG5vZGUucHJldjtcbiAgICAgICAgbmV3Tm9kZS5uZXh0ID0gbm9kZTtcbiAgICAgICAgaWYgKG5vZGUucHJldiA9PSBudWxsKSB0aGlzLmhlYWQgPSBuZXdOb2RlO1xuICAgICAgICBlbHNlIG5vZGUucHJldi5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgbm9kZS5wcmV2ID0gbmV3Tm9kZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5zZXJ0QmVnaW5uaW5nKG5ld05vZGU6IERpc3BsYXlPYmplY3QpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVhZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy50YWlsID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIG5ld05vZGUucHJldiA9IG51bGw7XG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSBudWxsO1xuICAgICAgICB9IGVsc2UgdGhpcy5pbnNlcnRCZWZvcmUodGhpcy5oZWFkLCBuZXdOb2RlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5zZXJ0RW5kKG5ld05vZGU6IERpc3BsYXlPYmplY3QpIHtcbiAgICAgICAgaWYgKHRoaXMudGFpbCA9PSBudWxsKSB0aGlzLmluc2VydEJlZ2lubmluZyhuZXdOb2RlKTtcbiAgICAgICAgZWxzZSB0aGlzLmluc2VydEFmdGVyKHRoaXMudGFpbCwgbmV3Tm9kZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZShub2RlOiBEaXNwbGF5T2JqZWN0KSB7XG4gICAgICAgIGlmIChub2RlLnByZXYgPT0gbnVsbCkgdGhpcy5oZWFkID0gbm9kZS5uZXh0O1xuICAgICAgICBlbHNlIG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuICAgICAgICBpZiAobm9kZS5uZXh0ID09IG51bGwpIHRoaXMudGFpbCA9IG5vZGUucHJldjtcbiAgICAgICAgZWxzZSBub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcbiAgICAgICAgbm9kZS5wcmV2ID0gbm9kZS5uZXh0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVidWcoKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuaGVhZDtcbiAgICAgICAgd2hpbGUgKGNoaWxkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQubmV4dDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9ncmFwaGljcy9kaXNwbGF5bGlzdC9EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnRzIiwiaW1wb3J0IHsgQUFCQiB9IGZyb20gXCIuL0FBQkJcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi9WZWN0b3IyXCI7XG5cbmV4cG9ydCBjbGFzcyBBQUJCMiB7XG4gICAgcHVibGljIGw6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICBwdWJsaWMgdDogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIHB1YmxpYyByOiBudW1iZXIgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG4gICAgcHVibGljIGI6IG51bWJlciA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcblxuICAgIGNvbnN0cnVjdG9yKHQgPSAwLjAsIHIgPSAwLjAsIGIgPSAwLjAsIGwgPSAwLjApIHtcbiAgICAgICAgdGhpcy50ID0gdDtcbiAgICAgICAgdGhpcy5yID0gcjtcbiAgICAgICAgdGhpcy5iID0gYjtcbiAgICAgICAgdGhpcy5sID0gbDtcbiAgICB9XG5cbiAgICBzZXRUb1N3ZWVwdEFBQkIoYWFiYjogQUFCQiwgcHJlZGl0Y2VkUG9zaXRpb246IFZlY3RvcjIpIHtcbiAgICAgICAgdGhpcy5sID0gYWFiYi5wb3NpdGlvbi54IC0gYWFiYi5leHRlbnRzLng7XG4gICAgICAgIHRoaXMuciA9IGFhYmIucG9zaXRpb24ueCArIGFhYmIuZXh0ZW50cy54O1xuICAgICAgICB0aGlzLnQgPSBhYWJiLnBvc2l0aW9uLnkgLSBhYWJiLmV4dGVudHMueTtcbiAgICAgICAgdGhpcy5iID0gYWFiYi5wb3NpdGlvbi55ICsgYWFiYi5leHRlbnRzLnk7XG4gICAgfVxuXG4gICAgZnJvbUFBQkIoYWFiYjogQUFCQikge31cblxuICAgIGNsb25lKCk6IEFBQkIyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCMih0aGlzLnQsIHRoaXMuciwgdGhpcy5iLCB0aGlzLmwpO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnQgPSB0aGlzLmwgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgICAgIHRoaXMuciA9IHRoaXMuYiA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICB9XG5cbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuciAtIHRoaXMubDtcbiAgICB9XG5cbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmIgLSB0aGlzLnQ7XG4gICAgfVxuXG4gICAgaW50ZXJzZWN0KGFhYmI6IEFBQkIyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmwgPiBhYWJiLnIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5yIDwgYWFiYi5sKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudCA+IGFhYmIuYikgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbHNlIGlmICh0aGlzLmIgPCBhYWJiLnQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRBQUJCKGFhYmI6IEFBQkIyKSB7XG4gICAgICAgIGlmIChhYWJiLnQgPCB0aGlzLnQpIHRoaXMudCA9IGFhYmIudDtcbiAgICAgICAgaWYgKGFhYmIuciA+IHRoaXMucikgdGhpcy5yID0gYWFiYi5yO1xuICAgICAgICBpZiAoYWFiYi5iID4gdGhpcy5iKSB0aGlzLmIgPSBhYWJiLmI7XG4gICAgICAgIGlmIChhYWJiLmwgPCB0aGlzLmwpIHRoaXMubCA9IGFhYmIubDtcbiAgICB9XG5cbiAgICBhZGRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBpZiAoeCA8IHRoaXMubCkgdGhpcy5sID0geDtcbiAgICAgICAgaWYgKHggPiB0aGlzLnIpIHRoaXMuciA9IHg7XG4gICAgICAgIGlmICh5IDwgdGhpcy50KSB0aGlzLnQgPSB5O1xuICAgICAgICBpZiAoeSA+IHRoaXMuYikgdGhpcy5iID0geTtcbiAgICB9XG5cbiAgICBmaXRQb2ludChwb2ludDogVmVjdG9yMikge1xuICAgICAgICBpZiAocG9pbnQueCA8IHRoaXMubCkgcG9pbnQueCA9IHRoaXMubDtcbiAgICAgICAgaWYgKHBvaW50LnggPiB0aGlzLnIpIHBvaW50LnggPSB0aGlzLnI7XG4gICAgICAgIGlmIChwb2ludC55IDwgdGhpcy50KSBwb2ludC55ID0gdGhpcy50O1xuICAgICAgICBpZiAocG9pbnQueSA+IHRoaXMuYikgcG9pbnQueSA9IHRoaXMuYjtcbiAgICB9XG5cbiAgICBleHBhbmQoaTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubCAtPSBpIC8gMjtcbiAgICAgICAgdGhpcy5yICs9IGkgLyAyO1xuICAgICAgICB0aGlzLnQgLT0gaSAvIDI7XG4gICAgICAgIHRoaXMuYiArPSBpIC8gMjtcbiAgICB9XG5cbiAgICBleHBhbmQyKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubCArPSB3aWR0aCAvIDI7XG4gICAgICAgIHRoaXMuciAtPSB3aWR0aCAvIDI7XG4gICAgICAgIHRoaXMudCArPSBoZWlnaHQgLyAyO1xuICAgICAgICB0aGlzLmIgLT0gaGVpZ2h0IC8gMjtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ2VvbS9BQUJCMi50cyIsImltcG9ydCB7IEJGUHJveHkgfSBmcm9tIFwiLi4vY29sbGlzaW9uL0JGUHJveHlcIjtcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gXCIuLi9jb2xsaXNpb24vRmlsdGVyXCI7XG5pbXBvcnQgeyBDb250YWN0Q2FsbGJhY2sgfSBmcm9tIFwiLi4vY29sbGlzaW9uL0NvbnRhY3RcIjtcblxuZXhwb3J0IGNsYXNzIFBoeXNpY3NDb2xsaXNpb24ge1xuICAgIHB1YmxpYyBwcm94eTogQkZQcm94eTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpc1NlbnNvcjogYm9vbGVhbixcbiAgICAgICAgZmlsdGVyOiBGaWx0ZXIsXG4gICAgICAgIGNvbnRhY3RDYWxsYmFja3M6IEFycmF5PENvbnRhY3RDYWxsYmFjaz4sXG4gICAgICAgIGxpbWl0VG9TdGF0aWNDaGVjazogYm9vbGVhbiA9IGZhbHNlLFxuICAgICkge1xuICAgICAgICB0aGlzLnByb3h5ID0gbmV3IEJGUHJveHkoKTtcbiAgICAgICAgdGhpcy5wcm94eS5pc1NlbnNvciA9IGlzU2Vuc29yO1xuICAgICAgICB0aGlzLnByb3h5LmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5wcm94eS5jb250YWN0Q2FsbGJhY2tzID0gY29udGFjdENhbGxiYWNrcztcbiAgICAgICAgdGhpcy5wcm94eS5saW1pdFRvU3RhdGljQ2hlY2sgPSBsaW1pdFRvU3RhdGljQ2hlY2s7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3BoeXNpY3MvY29tcG9uZW50cy9QaHlzaWNzQ29sbGlzaW9uLnRzIiwiaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL2Rpc3BsYXlsaXN0L1Nwcml0ZVwiO1xuaW1wb3J0IHsgRnJhbWUgfSBmcm9tIFwiLi4vZnJhbWUvRnJhbWVcIjtcbmltcG9ydCB7IEZyYW1lTGlzdCB9IGZyb20gXCIuLi9mcmFtZS9GcmFtZUxpc3RcIjtcblxuZXhwb3J0IGNsYXNzIEdyYXBoaWNzIHtcbiAgICBwdWJsaWMgc3ByaXRlOiBTcHJpdGU7XG4gICAgcHVibGljIGZyYW1lTGlzdElkOiBzdHJpbmc7XG4gICAgcHVibGljIGluaXRpYWxGcmFtZUlkOiBzdHJpbmc7XG4gICAgcHVibGljIGZyYW1lOiBGcmFtZTtcbiAgICBwdWJsaWMgZnJhbWVMaXN0OiBGcmFtZUxpc3Q7XG5cbiAgICBjb25zdHJ1Y3RvcihmcmFtZUxpc3RJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZnJhbWVMaXN0SWQgPSBmcmFtZUxpc3RJZDtcbiAgICAgICAgdGhpcy5pbml0aWFsRnJhbWVJZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZyYW1lKHZhbHVlOiBGcmFtZSkge1xuICAgICAgICB0aGlzLmZyYW1lID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lLnVwZGF0ZVNwcml0ZSh0aGlzLnNwcml0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RnJhbWVJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSB0aGlzLmZyYW1lTGlzdC5nZXRGcmFtZShpZCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL2NvbXBvbmVudHMvR3JhcGhpY3MudHMiLCJleHBvcnQgY2xhc3MgUmVjdGFuZ2xlIHtcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xuICAgIHB1YmxpYyB5OiBudW1iZXI7XG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwLCB3aWR0aCA9IDAsIGhlaWdodCA9IDApIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ2VvbS9SZWN0YW5nbGUudHMiLCJleHBvcnQgZnVuY3Rpb24gQ29tcGlsZVZlcnRleFNoYWRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBzaGFkZXJTcmM6IHN0cmluZyk6IFdlYkdMU2hhZGVyIHtcbiAgICByZXR1cm4gQ29tcGlsZVNoYWRlcihnbCwgc2hhZGVyU3JjLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVkVSVEVYX1NIQURFUik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21waWxlRnJhZ21lbnRTaGFkZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgc2hhZGVyU3JjOiBzdHJpbmcpOiBXZWJHTFNoYWRlciB7XG4gICAgcmV0dXJuIENvbXBpbGVTaGFkZXIoZ2wsIHNoYWRlclNyYywgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkZSQUdNRU5UX1NIQURFUik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21waWxlU2hhZGVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIHNoYWRlclNyYzogc3RyaW5nLCBzaGFkZXJUeXBlOiBudW1iZXIpOiBXZWJHTFNoYWRlciB7XG4gICAgdmFyIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihzaGFkZXJUeXBlKTtcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzaGFkZXJTcmMpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgd2luZG93LmFsZXJ0KGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gc2hhZGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29tcGlsZVByb2dyYW0oZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgdmVydGV4U3JjOiBzdHJpbmcsIGZyYWdtZW50U3JjOiBzdHJpbmcpOiBXZWJHTFByb2dyYW0ge1xuICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSBDb21waWxlVmVydGV4U2hhZGVyKGdsLCB2ZXJ0ZXhTcmMpO1xuICAgIHZhciBmcmFnbWVudFNoYWRlciA9IENvbXBpbGVGcmFnbWVudFNoYWRlcihnbCwgZnJhZ21lbnRTcmMpO1xuICAgIHZhciBzaGFkZXJQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcblxuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihzaGFkZXJQcm9ncmFtLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuTElOS19TVEFUVVMpKSB7XG4gICAgICAgIHdpbmRvdy5hbGVydChcIkNvdWxkIG5vdCBpbml0aWFsaXplIHByb2dyYW1cIik7XG4gICAgfVxuICAgIHJldHVybiBzaGFkZXJQcm9ncmFtO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL3JlbmRlci91dGlsL1dlYkdMU2hhZGVyVXRpbC50cyIsImV4cG9ydCBjbGFzcyBTaGFkZXJXcmFwcGVyIHtcbiAgICBwdWJsaWMgcHJvZ3JhbTogV2ViR0xQcm9ncmFtO1xuICAgIHB1YmxpYyBhdHRyaWJ1dGU6IGFueTtcbiAgICBwdWJsaWMgdW5pZm9ybTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgcHJvZ3JhbTogV2ViR0xQcm9ncmFtKSB7XG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIGdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSB7fTtcbiAgICAgICAgdGhpcy51bmlmb3JtID0ge307XG4gICAgICAgIHZhciBjbnQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5BQ1RJVkVfQVRUUklCVVRFUyk7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBjbnQpIHtcbiAgICAgICAgICAgIHZhciBhdHRyaWIgPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSk7XG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZVthdHRyaWIubmFtZV0gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBhdHRyaWIubmFtZSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBjbnQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5BQ1RJVkVfVU5JRk9STVMpO1xuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBjbnQpIHtcbiAgICAgICAgICAgIHZhciBhdHRyaWIgPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHByb2dyYW0sIGkpO1xuICAgICAgICAgICAgdGhpcy51bmlmb3JtW2F0dHJpYi5uYW1lXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBhdHRyaWIubmFtZSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvcmVuZGVyL3V0aWwvU2hhZGVyV3JhcHBlci50cyIsImltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi9WZWN0b3IyXCI7XG5cbmV4cG9ydCBjbGFzcyBBQUJCIHtcbiAgICBwdWJsaWMgcG9zaXRpb246IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuICAgIHB1YmxpYyBleHRlbnRzOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGdldCBsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLmV4dGVudHMueDtcbiAgICB9XG4gICAgZ2V0IHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueSAtIHRoaXMuZXh0ZW50cy55O1xuICAgIH1cbiAgICBnZXQgcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5leHRlbnRzLng7XG4gICAgfVxuICAgIGdldCBiKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmV4dGVudHMueTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqICBTdGFuZGFyZCBBQUJCIG92ZXJsYXAuICBPbmx5IHJldHVybnMgYSBib29sZWFuLCB3aGljaCBpc250IG11Y2ggdXNlIGlmIHlvdSBuZWVkIHRvIGFjdHVhbGx5IHJlc29sdmUgYW55dGhpbmcuXG4gICAgICovXG4gICAgb3ZlcmxhcChhYWJiOiBBQUJCKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnBvc2l0aW9uLnggLSBhYWJiLnBvc2l0aW9uLngpID4gKHRoaXMuZXh0ZW50cy54ICsgYWFiYi5leHRlbnRzLngpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnBvc2l0aW9uLnkgLSBhYWJiLnBvc2l0aW9uLnkpID4gKHRoaXMuZXh0ZW50cy55ICsgYWFiYi5leHRlbnRzLnkpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnRhaW5zQUFCQihhYWJiOiBBQUJCKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb250YWluc1BvaW50KHBvaW50OiBWZWN0b3IyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBNYXRoLmFicyhwb2ludC54IC0gdGhpcy5wb3NpdGlvbi54KSA8IHRoaXMuZXh0ZW50cy54ICYmIE1hdGguYWJzKHBvaW50LnkgLSB0aGlzLnBvc2l0aW9uLnkpIDwgdGhpcy5leHRlbnRzLnlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvdmVybGFwQXJlYShhYWJiOiBBQUJCKTogbnVtYmVyIHtcbiAgICAgICAgdmFyIF9sID0gTWF0aC5tYXgodGhpcy5sLCBhYWJiLmwpO1xuICAgICAgICB2YXIgX3IgPSBNYXRoLm1pbih0aGlzLnIsIGFhYmIucik7XG4gICAgICAgIHZhciBfdCA9IE1hdGgubWF4KHRoaXMudCwgYWFiYi50KTtcbiAgICAgICAgdmFyIF9iID0gTWF0aC5taW4odGhpcy5iLCBhYWJiLmIpO1xuICAgICAgICByZXR1cm4gKF9yIC0gX2wpICogKF9iIC0gX3QpO1xuICAgIH1cblxuICAgIGFyZWEoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZW50cy54ICogdGhpcy5leHRlbnRzLnkgKiA0O1xuICAgIH1cblxuICAgIGNsb25lKGFhYmI6IEFBQkIpOiBBQUJCIHtcbiAgICAgICAgdmFyIGFhYmIgPSBuZXcgQUFCQigpO1xuICAgICAgICBhYWJiLnBvc2l0aW9uLmNvcHkodGhpcy5wb3NpdGlvbik7XG4gICAgICAgIGFhYmIuZXh0ZW50cy5jb3B5KHRoaXMuZXh0ZW50cyk7XG4gICAgICAgIHJldHVybiBhYWJiO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9nZW9tL0FBQkIudHMiLCJleHBvcnQgY2xhc3MgRml4ZWQge1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9jb3JlL2NvbXBvbmVudHMvRml4ZWQudHMiLCJleHBvcnQgY2xhc3MgTW92ZWFibGUge1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9jb3JlL2NvbXBvbmVudHMvTW92ZWFibGUudHMiLCJleHBvcnQgY2xhc3MgQWN0aXZlIHtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvY29yZS9jb21wb25lbnRzL0FjdGl2ZS50cyIsImV4cG9ydCBjbGFzcyBCYXNlVGV4dHVyZSB7XG4gICAgcHJpdmF0ZSBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICAgIHB1YmxpYyBzb3VyY2U6IEltYWdlRGF0YTtcbiAgICBwdWJsaWMgcG93ZXJPZlR3bzogYm9vbGVhbjtcblxuICAgIHB1YmxpYyB0ZXh0dXJlOiBXZWJHTFRleHR1cmU7XG5cbiAgICBwdWJsaWMgZnJhbWVidWZmZXI6IFdlYkdMRnJhbWVidWZmZXI7XG4gICAgcHVibGljIHJlbmRlcmJ1ZmZlcjogV2ViR0xSZW5kZXJidWZmZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZmxvYXRpbmdQb251bWJlcjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy5wb3dlck9mVHdvID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuUmVnaXN0ZXJUZXh0dXJlKGZsb2F0aW5nUG9udW1iZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBSZWdpc3RlclRleHR1cmUoZnA6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZSA9PSBudWxsKSB0aGlzLnRleHR1cmUgPSB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcbiAgICAgICAgdGhpcy5nbC5waXhlbFN0b3JlaShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMLCAwKTtcbiAgICAgICAgLy8gdGhpcy5nbC5waXhlbFN0b3JlaShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgMSk7XG4gICAgICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaShcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfTUFHX0ZJTFRFUixcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5ORUFSRVNULFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkoXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX01JTl9GSUxURVIsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuTkVBUkVTVCxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMucG93ZXJPZlR3bykge1xuICAgICAgICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX1dSQVBfUyxcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkVQRUFULFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaShcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9XUkFQX1QsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJFUEVBVCxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkoXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfMkQsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfV1JBUF9TLFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5DTEFNUF9UT19FREdFLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaShcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9XUkFQX1QsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkNMQU1QX1RPX0VER0UsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuZ2wuYmluZFRleHR1cmUoV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfMkQsbnVsbCk7XG4gICAgICAgIC8vdGhpcy5nbC50ZXhJbWFnZTJEKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELDAsV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsV2ViR0xSZW5kZXJpbmdDb250ZXh0LlVOU0lHTkVEX0JZVEUsc291cmNlKTtcbiAgICAgICAgdGhpcy5nbC50ZXhJbWFnZTJEKFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfMkQsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsXG4gICAgICAgICAgICB0aGlzLndpZHRoLFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsXG4gICAgICAgICAgICBmcCA/IFdlYkdMUmVuZGVyaW5nQ29udGV4dC5GTE9BVCA6IFdlYkdMUmVuZGVyaW5nQ29udGV4dC5VTlNJR05FRF9CWVRFLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEZyb21JbWFnZShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBpbWFnZTogSW1hZ2VEYXRhKSB7XG4gICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IEJhc2VUZXh0dXJlKGdsLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5SR0JBLFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVU5TSUdORURfQllURSxcbiAgICAgICAgICAgIGltYWdlLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gdGV4dHVyZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYmluZCh1bml0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5nbC5hY3RpdmVUZXh0dXJlKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFMCArIHVuaXQpO1xuICAgICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1bmJpbmQodW5pdDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZ2wuYWN0aXZlVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRTAgKyB1bml0KTtcbiAgICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCwgbnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdUbyhjYWxsYmFjazogYW55KSB7XG4gICAgICAgIC8vdmFyIHYgPSB0aGlzLmdsLmdldFBhcmFtZXRlcihXZWJHTFJlbmRlcmluZ0NvbnRleHQuVklFV1BPUlQpO1xuICAgICAgICBpZiAodGhpcy5mcmFtZWJ1ZmZlciA9PSBudWxsKSB0aGlzLmZyYW1lYnVmZmVyID0gdGhpcy5nbC5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuICAgICAgICBpZiAodGhpcy5yZW5kZXJidWZmZXIgPT0gbnVsbCkgdGhpcy5yZW5kZXJidWZmZXIgPSB0aGlzLmdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmdsLmJpbmRGcmFtZWJ1ZmZlcihXZWJHTFJlbmRlcmluZ0NvbnRleHQuRlJBTUVCVUZGRVIsIHRoaXMuZnJhbWVidWZmZXIpO1xuICAgICAgICB0aGlzLmdsLmJpbmRSZW5kZXJidWZmZXIoV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJFTkRFUkJVRkZFUiwgdGhpcy5yZW5kZXJidWZmZXIpO1xuICAgICAgICBpZiAodGhpcy53aWR0aCAhPSAodGhpcy5yZW5kZXJidWZmZXIgYXMgYW55KS53aWR0aCB8fCB0aGlzLmhlaWdodCAhPSAodGhpcy5yZW5kZXJidWZmZXIgYXMgYW55KS5oZWlnaHQpIHtcbiAgICAgICAgICAgICh0aGlzLnJlbmRlcmJ1ZmZlciBhcyBhbnkpLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgICh0aGlzLnJlbmRlcmJ1ZmZlciBhcyBhbnkpLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5nbC5yZW5kZXJidWZmZXJTdG9yYWdlKFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5SRU5ERVJCVUZGRVIsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkRFUFRIX0NPTVBPTkVOVDE2LFxuICAgICAgICAgICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5nbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRlJBTUVCVUZGRVIsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkNPTE9SX0FUVEFDSE1FTlQwLFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkZSQU1FQlVGRkVSLFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5ERVBUSF9BVFRBQ0hNRU5ULFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5SRU5ERVJCVUZGRVIsXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJidWZmZXIsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHRoaXMuZ2wuYmluZEZyYW1lYnVmZmVyKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5GUkFNRUJVRkZFUiwgbnVsbCk7XG4gICAgICAgIHRoaXMuZ2wuYmluZFJlbmRlcmJ1ZmZlcihXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkVOREVSQlVGRkVSLCBudWxsKTtcbiAgICAgICAgLy8gdGhpcy5nbC52aWV3cG9ydCh2WzBdLCB2WzFdLCB2WzJdLCB2WzNdKTtcbiAgICAgICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCA4MDAsIDY0MCk7XG4gICAgfVxuXG4gICAgcHVibGljIFVucmVnaXN0ZXJUZXh0dXJlKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZSAhPSBudWxsKSB7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvdGV4dHVyZS9CYXNlVGV4dHVyZS50cyIsImltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuLi8uLi9nZW9tL1JlY3RhbmdsZVwiO1xuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi8uLi9nZW9tL1ZlY3RvcjJcIjtcbmltcG9ydCB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcIi4vQmFzZVRleHR1cmVcIjtcblxuZXhwb3J0IGNsYXNzIFRleHR1cmUge1xuICAgIHB1YmxpYyBiYXNlVGV4dHVyZTogQmFzZVRleHR1cmU7XG4gICAgcHVibGljIGZyYW1lOiBSZWN0YW5nbGU7XG4gICAgcHVibGljIHRyaW06IFZlY3RvcjI7XG4gICAgcHVibGljIHBpdm90OiBWZWN0b3IyO1xuICAgIHB1YmxpYyBub0ZyYW1lOiBib29sZWFuO1xuICAgIHB1YmxpYyB1dnM6IEZsb2F0MzJBcnJheTtcblxuICAgIGNvbnN0cnVjdG9yKGJhc2VUZXh0dXJlOiBCYXNlVGV4dHVyZSwgZnJhbWU6IFJlY3RhbmdsZSwgcGl2b3Q6IFZlY3RvcjIgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubm9GcmFtZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJhc2VUZXh0dXJlID0gYmFzZVRleHR1cmU7XG5cbiAgICAgICAgaWYgKGZyYW1lID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubm9GcmFtZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gbmV3IFJlY3RhbmdsZSgwLCAwLCAxLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWUgPSBmcmFtZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyaW0gPSBuZXcgVmVjdG9yMigpO1xuICAgICAgICB0aGlzLnBpdm90ID0gcGl2b3QgPT0gbnVsbCA/IG5ldyBWZWN0b3IyKCkgOiBwaXZvdDtcbiAgICAgICAgdGhpcy51dnMgPSBuZXcgRmxvYXQzMkFycmF5KDgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVWUygpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVVVlMoKSB7XG4gICAgICAgIHZhciB0dyA9IHRoaXMuYmFzZVRleHR1cmUud2lkdGg7XG4gICAgICAgIHZhciB0aCA9IHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMudXZzWzBdID0gdGhpcy5mcmFtZS54IC8gdHc7XG4gICAgICAgIHRoaXMudXZzWzFdID0gdGhpcy5mcmFtZS55IC8gdGg7XG5cbiAgICAgICAgdGhpcy51dnNbMl0gPSAodGhpcy5mcmFtZS54ICsgdGhpcy5mcmFtZS53aWR0aCkgLyB0dztcbiAgICAgICAgdGhpcy51dnNbM10gPSB0aGlzLmZyYW1lLnkgLyB0aDtcblxuICAgICAgICB0aGlzLnV2c1s0XSA9ICh0aGlzLmZyYW1lLnggKyB0aGlzLmZyYW1lLndpZHRoKSAvIHR3O1xuICAgICAgICB0aGlzLnV2c1s1XSA9ICh0aGlzLmZyYW1lLnkgKyB0aGlzLmZyYW1lLmhlaWdodCkgLyB0aDtcblxuICAgICAgICB0aGlzLnV2c1s2XSA9IHRoaXMuZnJhbWUueCAvIHR3O1xuICAgICAgICB0aGlzLnV2c1s3XSA9ICh0aGlzLmZyYW1lLnkgKyB0aGlzLmZyYW1lLmhlaWdodCkgLyB0aDtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvdGV4dHVyZS9UZXh0dXJlLnRzIiwiaW1wb3J0IHsgRGlzcGxheU9iamVjdENvbnRhaW5lciB9IGZyb20gXCIuL0Rpc3BsYXlPYmplY3RDb250YWluZXJcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcIi4uL3RleHR1cmUvVGV4dHVyZVwiO1xuXG5leHBvcnQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgRGlzcGxheU9iamVjdENvbnRhaW5lciB7XG4gICBcbiAgICBwdWJsaWMgYW5jaG9yOiBWZWN0b3IyO1xuICAgIHB1YmxpYyB0ZXh0dXJlOiBUZXh0dXJlO1xuICAgIHB1YmxpYyBibGVuZE1vZGU6IG51bWJlcjtcblxuICAgIHB1YmxpYyB0cmFuc2Zvcm1lZFZlcnRzOiBGbG9hdDMyQXJyYXk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmNob3IgPSBuZXcgVmVjdG9yMigpO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybWVkVmVydHMgPSBuZXcgRmxvYXQzMkFycmF5KDgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYWxjRXh0ZW50cygpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcblxuICAgICAgICB2YXIgYVggPSB0aGlzLmFuY2hvci54O1xuICAgICAgICB2YXIgYVkgPSB0aGlzLmFuY2hvci55O1xuICAgICAgICB2YXIgdzAgPSB3aWR0aCAqICgxIC0gYVgpO1xuICAgICAgICB2YXIgdzEgPSB3aWR0aCAqIC1hWDtcblxuICAgICAgICB2YXIgaDAgPSBoZWlnaHQgKiAoMSAtIGFZKTtcbiAgICAgICAgdmFyIGgxID0gaGVpZ2h0ICogLWFZO1xuXG4gICAgICAgIHZhciBhID0gdGhpcy53b3JsZFRyYW5zZm9ybVswXTtcbiAgICAgICAgdmFyIGIgPSB0aGlzLndvcmxkVHJhbnNmb3JtWzNdO1xuICAgICAgICB2YXIgYyA9IHRoaXMud29ybGRUcmFuc2Zvcm1bMV07XG4gICAgICAgIHZhciBkID0gdGhpcy53b3JsZFRyYW5zZm9ybVs0XTtcbiAgICAgICAgdmFyIHR4ID0gdGhpcy53b3JsZFRyYW5zZm9ybVsyXTtcbiAgICAgICAgdmFyIHR5ID0gdGhpcy53b3JsZFRyYW5zZm9ybVs1XTtcblxuICAgICAgICB0aGlzLnRyYW5zZm9ybWVkVmVydHNbMF0gPSBhICogdzEgKyBjICogaDEgKyB0eDtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1lZFZlcnRzWzFdID0gZCAqIGgxICsgYiAqIHcxICsgdHk7XG5cbiAgICAgICAgdGhpcy50cmFuc2Zvcm1lZFZlcnRzWzJdID0gYSAqIHcwICsgYyAqIGgxICsgdHg7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtZWRWZXJ0c1szXSA9IGQgKiBoMSArIGIgKiB3MCArIHR5O1xuXG4gICAgICAgIHRoaXMudHJhbnNmb3JtZWRWZXJ0c1s0XSA9IGEgKiB3MCArIGMgKiBoMCArIHR4O1xuICAgICAgICB0aGlzLnRyYW5zZm9ybWVkVmVydHNbNV0gPSBkICogaDAgKyBiICogdzAgKyB0eTtcblxuICAgICAgICB0aGlzLnRyYW5zZm9ybWVkVmVydHNbNl0gPSBhICogdzEgKyBjICogaDAgKyB0eDtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1lZFZlcnRzWzddID0gZCAqIGgwICsgYiAqIHcxICsgdHk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYWFiYi5hZGRQb2ludCh0aGlzLnRyYW5zZm9ybWVkVmVydHNbaSAqIDJdLCB0aGlzLnRyYW5zZm9ybWVkVmVydHNbaSAqIDIgKyAxXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvZGlzcGxheWxpc3QvU3ByaXRlLnRzIiwiZXhwb3J0IGNsYXNzIFR5cGVkQXJyYXkyRCB7XG4gICAgcHVibGljIHc6IG51bWJlcjtcbiAgICBwdWJsaWMgaDogbnVtYmVyO1xuXG4gICAgcHVibGljIGJ1ZmZlcjogQXJyYXlCdWZmZXI7XG4gICAgcHVibGljIGRhdGEzMjogVWludDMyQXJyYXk7XG4gICAgcHVibGljIGRhdGE4OiBVaW50OEFycmF5O1xuXG4gICAgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGJ1ZmZlcjogQXJyYXlCdWZmZXIgPSBudWxsKSB7XG4gICAgICAgIHRoaXMudyA9IHdpZHRoO1xuICAgICAgICB0aGlzLmggPSBoZWlnaHQ7XG5cbiAgICAgICAgaWYgKGJ1ZmZlciA9PSBudWxsKSB0aGlzLmJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcih0aGlzLncgKiB0aGlzLmggKiA0KTtcbiAgICAgICAgZWxzZSB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgdGhpcy5kYXRhMzIgPSBuZXcgVWludDMyQXJyYXkodGhpcy5idWZmZXIpO1xuICAgICAgICB0aGlzLmRhdGE4ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIpO1xuICAgIH1cblxuICAgIGdldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEzMlt5ICogdGhpcy53ICsgeF07XG4gICAgfVxuXG4gICAgc2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCB2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhMzJbeSAqIHRoaXMudyArIHhdID0gdjtcbiAgICB9XG5cbiAgICAvLyBnZXRJbmRleCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciB7XG4gICAgLy8gICAgIHJldHVybiB5ICogdyArIHg7XG4gICAgLy8gfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2RzL1R5cGVkQXJyYXkyRC50cyIsImltcG9ydCB7IEFuaW1hdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vYW5pbWF0aW9uL0FuaW1hdGlvbkNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IEZyYW1lTGlzdCB9IGZyb20gXCIuLi9mcmFtZS9GcmFtZUxpc3RcIjtcblxuZXhwb3J0IGNsYXNzIEdyYXBoaWNzQW5pbWF0aW9uIHtcbiAgICBwdWJsaWMgZnJhbWVMaXN0SWQ6IHN0cmluZztcbiAgICBwdWJsaWMgYW5pbWF0aW9uSWQ6IHN0cmluZztcblxuICAgIHB1YmxpYyBhbmltYXRpb25Db250cm9sbGVyOiBBbmltYXRpb25Db250cm9sbGVyO1xuICAgIHB1YmxpYyBmcmFtZUxpc3Q6RnJhbWVMaXN0O1xuXG4gICAgY29uc3RydWN0b3IoZnJhbWVMaXN0SWQ6IHN0cmluZywgYW5pbWF0aW9uSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmZyYW1lTGlzdElkID0gZnJhbWVMaXN0SWQ7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uSWQgPSBhbmltYXRpb25JZDtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvY29tcG9uZW50cy9HcmFwaGljc0FuaW1hdGlvbi50cyIsImltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBCRlByb3h5IH0gZnJvbSBcIi4vQkZQcm94eVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRhY3RDYWxsYmFjayB7XG4gICAgKHByb3h5QTogQkZQcm94eSwgcHJveHlCOiBCRlByb3h5LCBjb250YWN0OiBDb250YWN0KTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRhY3Qge1xuICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG4gICAgcHVibGljIGRlbHRhOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoKTtcbiAgICBwdWJsaWMgbm9ybWFsOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoKTtcbiAgICBwdWJsaWMgZGlzdGFuY2U6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHRpbWU6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHN3ZWVwUG9zaXRpb246IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIHNldFRvKGNvbnRhY3Q6IENvbnRhY3QpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gY29udGFjdC5wb3NpdGlvbi54O1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSBjb250YWN0LnBvc2l0aW9uLnk7XG4gICAgICAgIHRoaXMuZGVsdGEueCA9IGNvbnRhY3QuZGVsdGEueDtcbiAgICAgICAgdGhpcy5kZWx0YS55ID0gY29udGFjdC5kZWx0YS55O1xuICAgICAgICB0aGlzLm5vcm1hbC54ID0gY29udGFjdC5ub3JtYWwueDtcbiAgICAgICAgdGhpcy5ub3JtYWwueSA9IGNvbnRhY3Qubm9ybWFsLnk7XG4gICAgICAgIHRoaXMudGltZSA9IGNvbnRhY3QudGltZTtcbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IGNvbnRhY3QuZGlzdGFuY2U7XG4gICAgICAgIHRoaXMuc3dlZXBQb3NpdGlvbi54ID0gY29udGFjdC5zd2VlcFBvc2l0aW9uLng7XG4gICAgICAgIHRoaXMuc3dlZXBQb3NpdGlvbi55ID0gY29udGFjdC5zd2VlcFBvc2l0aW9uLnk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3BoeXNpY3MvY29sbGlzaW9uL0NvbnRhY3QudHMiLCJpbXBvcnQgeyBDb250YWN0IH0gZnJvbSBcIi4vQ29udGFjdFwiO1xuaW1wb3J0IHsgQkZQcm94eSB9IGZyb20gXCIuL0JGUHJveHlcIjtcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gXCIuL0ZpbHRlclwiO1xuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi8uLi9nZW9tL1ZlY3RvcjJcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwiLi4vQm9keVwiO1xuaW1wb3J0IHsgUmF5IH0gZnJvbSBcIi4vUmF5XCI7XG5pbXBvcnQgeyBTZWdtZW50IH0gZnJvbSBcIi4uLy4uL2dlb20vU2VnbWVudFwiO1xuXG5jb25zdCBjb250YWN0OiBDb250YWN0ID0gbmV3IENvbnRhY3QoKTtcblxuY29uc3QgZXBzaWxvbjogbnVtYmVyID0gMWUtODtcblxubGV0IGNvbGxpZGVDb3VudDogbnVtYmVyID0gMDtcblxuZXhwb3J0IGNvbnN0IENvbGxpZGUgPSBmdW5jdGlvbihwcm94eUE6IEJGUHJveHksIHByb3h5QjogQkZQcm94eSk6IGJvb2xlYW4ge1xuICAgIGNvbGxpZGVDb3VudCsrO1xuICAgIC8vRXhpdCBvbiBzdGF0aWMgdnMgc3RhdGljcywgdGhleSBzaG91bGQgbmV2ZXIgYmUgc2VudCBidXQgeW91IG5ldmVyIGtub3dcbiAgICAvL1NlbnNvcnMgZG9udCB0cmlnZ2VyIG90aGVyIHNlbnNvcnNcbiAgICBpZiAoKHByb3h5QS5pc1N0YXRpYyAmJiBwcm94eUIuaXNTdGF0aWMpIHx8IChwcm94eUEuaXNTZW5zb3IgJiYgcHJveHlCLmlzU2Vuc29yKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKCFwcm94eUEuaXNBY3RpdmUgfHwgIXByb3h5Qi5pc0FjdGl2ZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy9EbyBmaWx0ZXJpbmdcbiAgICBpZiAoIUZpbHRlci5DSEVDSyhwcm94eUEuZmlsdGVyLCBwcm94eUIuZmlsdGVyKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGNvbGxpZGVkID0gZmFsc2U7XG5cbiAgICBpZiAocHJveHlBLmlzU2Vuc29yIHx8IHByb3h5Qi5pc1NlbnNvcikge1xuICAgICAgICAvL09uZSBpcyBhIHNlbnNvciBzbyBqdXN0IGNoZWNrIGZvciBvdmVybGFwXG4gICAgICAgIGNvbGxpZGVkID0gU3RhdGljQUFCQnZzU3RhdGljQUFCQihcbiAgICAgICAgICAgIHByb3h5QS5hYWJiLnBvc2l0aW9uLFxuICAgICAgICAgICAgcHJveHlBLmFhYmIuZXh0ZW50cyxcbiAgICAgICAgICAgIHByb3h5Qi5hYWJiLnBvc2l0aW9uLFxuICAgICAgICAgICAgcHJveHlCLmFhYmIuZXh0ZW50cyxcbiAgICAgICAgICAgIGNvbnRhY3QsXG4gICAgICAgICk7XG5cbiAgICAgICAgLy9UT0RPIHNob3VsZCB3ZSBtYWtlIGEgc3BlY2lhbCBjYXNlIGZvciBidWxsZXRzP1xuICAgIH0gZWxzZSBpZiAoIXByb3h5QS5pc1N0YXRpYyAmJiAhcHJveHlCLmlzU3RhdGljKSB7XG4gICAgICAgIC8vQm90aCBhcmUgZHluYW1pYywgd2hpY2ggbWVhbnMgYm90aCBoYXZlIGJvZGllc1xuICAgICAgICBpZiAocHJveHlBLmJvZHkuaXNCdWxsZXQgJiYgcHJveHlCLmJvZHkuaXNCdWxsZXQpIHtcbiAgICAgICAgICAgIC8vQm90aCBidWxsZXRzPyBmb3Igbm93IG5vdGhpbmdcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm94eUEuYm9keS5pc0J1bGxldCkge1xuICAgICAgICAgICAgLy9KdXN0IEEgaXMgYSBidWxsZXRcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBTdGF0aWNBQUJCdnNTd2VlcHRBQUJCKFxuICAgICAgICAgICAgICAgICAgICBwcm94eUIuYWFiYi5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgcHJveHlCLmFhYmIuZXh0ZW50cyxcbiAgICAgICAgICAgICAgICAgICAgcHJveHlBLmFhYmIucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHByb3h5QS5hYWJiLmV4dGVudHMsXG4gICAgICAgICAgICAgICAgICAgIHByb3h5QS5ib2R5LmRlbHRhLFxuICAgICAgICAgICAgICAgICAgICBjb250YWN0LFxuICAgICAgICAgICAgICAgICkgPT0gdHJ1ZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcHJveHlBLmJvZHkucmVzcG9uZEJ1bGxldENvbGxpc2lvbihjb250YWN0KTtcbiAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJveHlCLmJvZHkuaXNCdWxsZXQpIHtcbiAgICAgICAgICAgIC8vSnVzdCBCIGlzIGEgYnVsbGV0XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgU3RhdGljQUFCQnZzU3dlZXB0QUFCQihcbiAgICAgICAgICAgICAgICAgICAgcHJveHlBLmFhYmIucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHByb3h5QS5hYWJiLmV4dGVudHMsXG4gICAgICAgICAgICAgICAgICAgIHByb3h5Qi5hYWJiLnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBwcm94eUIuYWFiYi5leHRlbnRzLFxuICAgICAgICAgICAgICAgICAgICBwcm94eUIuYm9keS5kZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgY29udGFjdCxcbiAgICAgICAgICAgICAgICApID09IHRydWVcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHByb3h5Qi5ib2R5LnJlc3BvbmRCdWxsZXRDb2xsaXNpb24oY29udGFjdCk7XG4gICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9SZWd1bGFyIGR5bmFtaWM8PmR5bmFtaWNcbiAgICAgICAgICAgIGNvbGxpZGVkID0gU3RhdGljQUFCQnZzU3RhdGljQUFCQihcbiAgICAgICAgICAgICAgICBwcm94eUEuYWFiYi5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICBwcm94eUEuYWFiYi5leHRlbnRzLFxuICAgICAgICAgICAgICAgIHByb3h5Qi5hYWJiLnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIHByb3h5Qi5hYWJiLmV4dGVudHMsXG4gICAgICAgICAgICAgICAgY29udGFjdCxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvL1dlcmUganVzdCBsZWZ0IHdpdGggc3RhdGljPD5keW5hbWljIGNvbGxpc2lvbnNcbiAgICAgICAgLy9PcmRlciB0aGVtXG4gICAgICAgIHZhciBzdGF0aWNQcm94eSwgZHluYW1pY1Byb3h5O1xuICAgICAgICBpZiAocHJveHlBLmlzU3RhdGljKSB7XG4gICAgICAgICAgICBzdGF0aWNQcm94eSA9IHByb3h5QTtcbiAgICAgICAgICAgIGR5bmFtaWNQcm94eSA9IHByb3h5QjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRpY1Byb3h5ID0gcHJveHlCO1xuICAgICAgICAgICAgZHluYW1pY1Byb3h5ID0gcHJveHlBO1xuICAgICAgICB9XG4gICAgICAgIC8vVGVzdFxuICAgICAgICBpZiAoZHluYW1pY1Byb3h5LmJvZHkuaXNCdWxsZXQpIHtcbiAgICAgICAgICAgIGNvbGxpZGVkID0gQnVsbGV0QUFCQihkeW5hbWljUHJveHksIHN0YXRpY1Byb3h5KTtcbiAgICAgICAgICAgIGlmIChjb2xsaWRlZCkge1xuICAgICAgICAgICAgICAgIGR5bmFtaWNQcm94eS5ib2R5LnJlc3BvbmRCdWxsZXRDb2xsaXNpb24oY29udGFjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBQUJCdnNTdGF0aWNTb2xpZEFBQkIoXG4gICAgICAgICAgICAgICAgZHluYW1pY1Byb3h5LmFhYmIucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgZHluYW1pY1Byb3h5LmFhYmIuZXh0ZW50cyxcbiAgICAgICAgICAgICAgICBzdGF0aWNQcm94eS5hYWJiLnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIHN0YXRpY1Byb3h5LmFhYmIuZXh0ZW50cyxcbiAgICAgICAgICAgICAgICBzdGF0aWNQcm94eS5yZXNwb25zZUJpYXMsXG4gICAgICAgICAgICAgICAgY29udGFjdCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvL1dlIGhhdmUgdG8gdGhlIHJlc3BvbnNlIHByb2Nlc3MgYW5kIGdldCB0aGUgcmVzdWx0XG4gICAgICAgICAgICBjb2xsaWRlZCA9IGR5bmFtaWNQcm94eS5ib2R5LnJlc3BvbmRTdGF0aWNDb2xsaXNpb24oY29udGFjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29sbGlkZWQgPT0gdHJ1ZSkge1xuICAgICAgICBwcm94eUEuY29sbGlkZShwcm94eUIsIGNvbnRhY3QpO1xuICAgICAgICBwcm94eUIuY29sbGlkZShwcm94eUEsIGNvbnRhY3QpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsaWRlZDtcbn07XG5cbmV4cG9ydCBjb25zdCBCdWxsZXRBQUJCID0gZnVuY3Rpb24oc2VnbWVudFByb3h5OiBCRlByb3h5LCBzdGF0aWNQcm94eTogQkZQcm94eSk6IGJvb2xlYW4ge1xuICAgIC8vIHJldHVybiBTdGF0aWNTZWdtZW50dnNTdGF0aWNBQUJCKHN0YXRpY1Byb3h5LmFhYmIucG9zaXRpb24sc3RhdGljUHJveHkuYWFiYi5leHRlbnRzLHNlZ21lbnRQcm94eS5ib2R5LnBvc2l0aW9uLHNlZ21lbnRQcm94eS5ib2R5LmRlbHRhLDAsMCxjb250YWN0KTtcbiAgICByZXR1cm4gU3RhdGljQUFCQnZzU3dlZXB0QUFCQihcbiAgICAgICAgc3RhdGljUHJveHkuYWFiYi5wb3NpdGlvbixcbiAgICAgICAgc3RhdGljUHJveHkuYWFiYi5leHRlbnRzLFxuICAgICAgICBzZWdtZW50UHJveHkuYWFiYi5wb3NpdGlvbixcbiAgICAgICAgc2VnbWVudFByb3h5LmFhYmIuZXh0ZW50cyxcbiAgICAgICAgc2VnbWVudFByb3h5LmJvZHkuZGVsdGEsXG4gICAgICAgIGNvbnRhY3QsXG4gICAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBSYXlBQUJCID0gZnVuY3Rpb24ocmF5OiBSYXksIHByb3h5OiBCRlByb3h5KTogYm9vbGVhbiB7XG4gICAgaWYgKFN0YXRpY1NlZ21lbnR2c1N0YXRpY0FBQkIocHJveHkuYWFiYi5wb3NpdGlvbiwgcHJveHkuYWFiYi5leHRlbnRzLCByYXkub3JpZ2luLCByYXkuZGVsdGEsIDAsIDAsIGNvbnRhY3QpKSB7XG4gICAgICAgIHJheS5yZXBvcnQoY29udGFjdC5kZWx0YS54LCBjb250YWN0LmRlbHRhLnksIGNvbnRhY3Qubm9ybWFsLngsIGNvbnRhY3Qubm9ybWFsLnksIHByb3h5KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBTcHJpbmcgPSBmdW5jdGlvbihib2R5QTogQm9keSwgYm9keUI6IEJvZHksIGxlbmd0aDogbnVtYmVyLCBrOiBudW1iZXIpIHtcbiAgICB2YXIgZHggPSBib2R5QS5wb3NpdGlvbi54IC0gYm9keUIucG9zaXRpb24ueDtcbiAgICB2YXIgZHkgPSBib2R5QS5wb3NpdGlvbi55IC0gYm9keUIucG9zaXRpb24ueTtcbiAgICAvLyBCdXQsIHdlIG5lZWQgdG8gYWNjb3VudCBmb3IgJ3Jlc3QgbGVuZ3RoJyBiZWluZyBgbGAgbm90IDBcbiAgICAvLyBOb3JtYWxpemUgZHggYW5kIGR5IHRvIGxlbmd0aCAxOyBwdXJlbHkgZGlyZWN0aW9uYWwuIGBfbmAgbWVhbnMgJ25vcm1hbGl6ZWQnIGhlcmVcbiAgICB2YXIgZGlzdCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7IC8vKzAuMDAwMDAxO1xuICAgIGlmIChkaXN0IDwgbGVuZ3RoKSByZXR1cm47XG4gICAgdmFyIGR4X24gPSBkeCAvIGRpc3Q7XG4gICAgdmFyIGR5X24gPSBkeSAvIGRpc3Q7XG5cbiAgICB2YXIgdHJ1ZV9vZmZzZXQgPSBkaXN0IC0gbGVuZ3RoO1xuICAgIGR4X24gKj0gdHJ1ZV9vZmZzZXQ7XG4gICAgZHlfbiAqPSB0cnVlX29mZnNldDtcbiAgICB2YXIgZnggPSBrICogZHhfbjtcbiAgICB2YXIgZnkgPSBrICogZHlfbjtcbiAgICBib2R5QS5hZGRGb3JjZShuZXcgVmVjdG9yMihmeCwgZnkpKTtcbiAgICBib2R5Qi5hZGRGb3JjZShuZXcgVmVjdG9yMigtZngsIC1meSkpO1xuICAgIC8vIGJvZHlBLmNvbGxpc2lvbkZvcmNlLnBsdXNFcXVhbHMobmV3IFZlY3RvcjIoZngsZnkpKTtcbiAgICAvLyBib2R5Qi5jb2xsaXNpb25Gb3JjZS5wbHVzRXF1YWxzKG5ldyBWZWN0b3IyKC1meCwtZnkpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBTdGF0aWNBQUJCdnNTdGF0aWNBQUJCID0gZnVuY3Rpb24oXG4gICAgYWFiYl9wb3NpdGlvbl9BOiBWZWN0b3IyLFxuICAgIGFhYmJfZXh0ZW50c19BOiBWZWN0b3IyLFxuICAgIGFhYmJfcG9zaXRpb25fQjogVmVjdG9yMixcbiAgICBhYWJiX2V4dGVudHNfQjogVmVjdG9yMixcbiAgICBjb250YWN0OiBDb250YWN0LFxuKTogYm9vbGVhbiB7XG4gICAgdmFyIGR4ID0gYWFiYl9wb3NpdGlvbl9CLnggLSBhYWJiX3Bvc2l0aW9uX0EueDtcbiAgICB2YXIgcHggPSBhYWJiX2V4dGVudHNfQi54ICsgYWFiYl9leHRlbnRzX0EueCAtIE1hdGguYWJzKGR4KTtcbiAgICBpZiAocHggPD0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIHZhciBkeSA9IGFhYmJfcG9zaXRpb25fQi55IC0gYWFiYl9wb3NpdGlvbl9BLnk7XG4gICAgdmFyIHB5ID0gYWFiYl9leHRlbnRzX0IueSArIGFhYmJfZXh0ZW50c19BLnkgLSBNYXRoLmFicyhkeSk7XG4gICAgaWYgKHB5IDw9IDApIHJldHVybiBmYWxzZTtcbiAgICBpZiAocHggPCBweSkge1xuICAgICAgICB2YXIgc3ggPSBkeCA8IDAgPyAtMSA6IDE7XG4gICAgICAgIGNvbnRhY3QuZGlzdGFuY2UgPSBjb250YWN0LmRlbHRhLnggPSBweCAqIHN4O1xuICAgICAgICBjb250YWN0LmRlbHRhLnkgPSAwO1xuICAgICAgICBjb250YWN0Lm5vcm1hbC54ID0gc3g7XG4gICAgICAgIGNvbnRhY3Qubm9ybWFsLnkgPSAwO1xuICAgICAgICBjb250YWN0LnBvc2l0aW9uLnggPSBhYWJiX3Bvc2l0aW9uX0EueCArIGFhYmJfZXh0ZW50c19BLnggKiBzeDtcbiAgICAgICAgY29udGFjdC5wb3NpdGlvbi55ID0gYWFiYl9wb3NpdGlvbl9CLnk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHN5ID0gZHkgPCAwID8gLTEgOiAxO1xuICAgICAgICBjb250YWN0LmRlbHRhLnggPSAwO1xuICAgICAgICBjb250YWN0LmRpc3RhbmNlID0gY29udGFjdC5kZWx0YS55ID0gcHkgKiBzeTtcbiAgICAgICAgY29udGFjdC5ub3JtYWwueCA9IDA7XG4gICAgICAgIGNvbnRhY3Qubm9ybWFsLnkgPSBzeTtcbiAgICAgICAgY29udGFjdC5wb3NpdGlvbi54ID0gYWFiYl9wb3NpdGlvbl9CLng7XG4gICAgICAgIGNvbnRhY3QucG9zaXRpb24ueSA9IGFhYmJfcG9zaXRpb25fQS55ICsgYWFiYl9leHRlbnRzX0EueSAqIHN5O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBJc1NlZ1ZzQUFCQiA9IGZ1bmN0aW9uKFxuICAgIHNlZ21lbnQ6IFNlZ21lbnQsXG4gICAgYWFiYl9wb3NpdGlvbjogVmVjdG9yMixcbiAgICBhYWJiX2V4dGVudHM6IFZlY3RvcjIsXG4gICAgcGFkZGluZ1g6IG51bWJlcixcbiAgICBwYWRkaW5nWTogbnVtYmVyLFxuKSB7XG4gICAgcmV0dXJuIElzU3RhdGljU2VnbWVudHZzU3RhdGljQUFCQihcbiAgICAgICAgYWFiYl9wb3NpdGlvbixcbiAgICAgICAgYWFiYl9leHRlbnRzLFxuICAgICAgICBzZWdtZW50LnN0YXJ0LFxuICAgICAgICBzZWdtZW50LnNjYWxlLFxuICAgICAgICBzZWdtZW50LnNpZ24sXG4gICAgICAgIHBhZGRpbmdYLFxuICAgICAgICBwYWRkaW5nWSxcbiAgICApO1xufTtcblxuZXhwb3J0IGNvbnN0IElzU3RhdGljU2VnbWVudHZzU3RhdGljQUFCQiA9IGZ1bmN0aW9uKFxuICAgIGFhYmJfcG9zaXRpb246IFZlY3RvcjIsXG4gICAgYWFiYl9leHRlbnRzOiBWZWN0b3IyLFxuICAgIHNlZ21lbnRfcG9zaXRpb246IFZlY3RvcjIsXG4gICAgc2NhbGU6IFZlY3RvcjIsXG4gICAgc2lnbjogVmVjdG9yMixcbiAgICBwYWRkaW5nWDogbnVtYmVyLFxuICAgIHBhZGRpbmdZOiBudW1iZXIsXG4pOiBib29sZWFuIHtcbiAgICAvLyB2YXIgc2NhbGUueCA9IDEvc2VnbWVudF9kZWx0YS54O1xuICAgIC8vIHZhciBzY2FsZS55ID0gMS9zZWdtZW50X2RlbHRhLnk7XG5cbiAgICAvLyB2YXIgc2lnbi54ID0gc2NhbGUueDwwID8gLTEgOiAxO1xuICAgIC8vIHZhciBzaWduLnkgPSBzY2FsZS55PDAgPyAtMSA6IDE7XG5cbiAgICB2YXIgbmVhclRpbWVYID0gKGFhYmJfcG9zaXRpb24ueCAtIHNpZ24ueCAqIChhYWJiX2V4dGVudHMueCArIHBhZGRpbmdYKSAtIHNlZ21lbnRfcG9zaXRpb24ueCkgKiBzY2FsZS54O1xuICAgIHZhciBuZWFyVGltZVkgPSAoYWFiYl9wb3NpdGlvbi55IC0gc2lnbi55ICogKGFhYmJfZXh0ZW50cy55ICsgcGFkZGluZ1kpIC0gc2VnbWVudF9wb3NpdGlvbi55KSAqIHNjYWxlLnk7XG5cbiAgICB2YXIgZmFyVGltZVggPSAoYWFiYl9wb3NpdGlvbi54ICsgc2lnbi54ICogKGFhYmJfZXh0ZW50cy54ICsgcGFkZGluZ1gpIC0gc2VnbWVudF9wb3NpdGlvbi54KSAqIHNjYWxlLng7XG4gICAgdmFyIGZhclRpbWVZID0gKGFhYmJfcG9zaXRpb24ueSArIHNpZ24ueSAqIChhYWJiX2V4dGVudHMueSArIHBhZGRpbmdZKSAtIHNlZ21lbnRfcG9zaXRpb24ueSkgKiBzY2FsZS55O1xuXG4gICAgaWYgKG5lYXJUaW1lWCA+IGZhclRpbWVZIHx8IG5lYXJUaW1lWSA+IGZhclRpbWVYKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgbmVhclRpbWUgPSBNYXRoLm1heChuZWFyVGltZVgsIG5lYXJUaW1lWSk7XG4gICAgdmFyIGZhclRpbWUgPSBNYXRoLm1pbihmYXJUaW1lWCwgZmFyVGltZVkpO1xuXG4gICAgaWYgKG5lYXJUaW1lID49IDEgfHwgZmFyVGltZSA8PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBTdGF0aWNTZWdtZW50dnNTdGF0aWNBQUJCID0gZnVuY3Rpb24oXG4gICAgYWFiYl9wb3NpdGlvbjogVmVjdG9yMixcbiAgICBhYWJiX2V4dGVudHM6IFZlY3RvcjIsXG4gICAgc2VnbWVudF9wb3NpdGlvbjogVmVjdG9yMixcbiAgICBzZWdtZW50X2RlbHRhOiBWZWN0b3IyLFxuICAgIHBhZGRpbmdYOiBudW1iZXIsXG4gICAgcGFkZGluZ1k6IG51bWJlcixcbiAgICBjb250YWN0OiBDb250YWN0LFxuKTogYm9vbGVhbiB7XG4gICAgdmFyIHNjYWxlWCA9IDEgLyBzZWdtZW50X2RlbHRhLng7XG4gICAgdmFyIHNjYWxlWSA9IDEgLyBzZWdtZW50X2RlbHRhLnk7XG5cbiAgICB2YXIgc2lnblggPSBzY2FsZVggPCAwID8gLTEgOiAxO1xuICAgIHZhciBzaWduWSA9IHNjYWxlWSA8IDAgPyAtMSA6IDE7XG5cbiAgICB2YXIgbmVhclRpbWVYID0gKGFhYmJfcG9zaXRpb24ueCAtIHNpZ25YICogKGFhYmJfZXh0ZW50cy54ICsgcGFkZGluZ1gpIC0gc2VnbWVudF9wb3NpdGlvbi54KSAqIHNjYWxlWDtcbiAgICB2YXIgbmVhclRpbWVZID0gKGFhYmJfcG9zaXRpb24ueSAtIHNpZ25ZICogKGFhYmJfZXh0ZW50cy55ICsgcGFkZGluZ1kpIC0gc2VnbWVudF9wb3NpdGlvbi55KSAqIHNjYWxlWTtcblxuICAgIHZhciBmYXJUaW1lWCA9IChhYWJiX3Bvc2l0aW9uLnggKyBzaWduWCAqIChhYWJiX2V4dGVudHMueCArIHBhZGRpbmdYKSAtIHNlZ21lbnRfcG9zaXRpb24ueCkgKiBzY2FsZVg7XG4gICAgdmFyIGZhclRpbWVZID0gKGFhYmJfcG9zaXRpb24ueSArIHNpZ25ZICogKGFhYmJfZXh0ZW50cy55ICsgcGFkZGluZ1kpIC0gc2VnbWVudF9wb3NpdGlvbi55KSAqIHNjYWxlWTtcblxuICAgIGlmIChuZWFyVGltZVggPiBmYXJUaW1lWSB8fCBuZWFyVGltZVkgPiBmYXJUaW1lWCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIG5lYXJUaW1lID0gTWF0aC5tYXgobmVhclRpbWVYLCBuZWFyVGltZVkpO1xuICAgIHZhciBmYXJUaW1lID0gTWF0aC5taW4oZmFyVGltZVgsIGZhclRpbWVZKTtcblxuICAgIGlmIChuZWFyVGltZSA+PSAxIHx8IGZhclRpbWUgPD0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29udGFjdC50aW1lID0gTWF0aC5taW4oTWF0aC5tYXgobmVhclRpbWUsIDApLCAxKTtcbiAgICBpZiAobmVhclRpbWVYID4gbmVhclRpbWVZKSB7XG4gICAgICAgIGNvbnRhY3Qubm9ybWFsLnggPSAtc2lnblg7XG4gICAgICAgIGNvbnRhY3Qubm9ybWFsLnkgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhY3Qubm9ybWFsLnggPSAwO1xuICAgICAgICBjb250YWN0Lm5vcm1hbC55ID0gLXNpZ25ZO1xuICAgIH1cblxuICAgIGNvbnRhY3QuZGVsdGEueCA9IGNvbnRhY3QudGltZSAqIHNlZ21lbnRfZGVsdGEueDtcbiAgICBjb250YWN0LmRlbHRhLnkgPSBjb250YWN0LnRpbWUgKiBzZWdtZW50X2RlbHRhLnk7XG5cbiAgICBjb250YWN0LnBvc2l0aW9uLnggPSBzZWdtZW50X3Bvc2l0aW9uLnggKyBjb250YWN0LmRlbHRhLng7XG4gICAgY29udGFjdC5wb3NpdGlvbi55ID0gc2VnbWVudF9wb3NpdGlvbi55ICsgY29udGFjdC5kZWx0YS55O1xuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgU3RhdGljQUFCQnZzU3dlZXB0QUFCQiA9IGZ1bmN0aW9uKFxuICAgIGFhYmJfcG9zaXRpb25fQTogVmVjdG9yMixcbiAgICBhYWJiX2V4dGVudHNfQTogVmVjdG9yMixcbiAgICBhYWJiX3Bvc2l0aW9uX0I6IFZlY3RvcjIsXG4gICAgYWFiYl9leHRlbnRzX0I6IFZlY3RvcjIsXG4gICAgYWFiYl9kZWx0YV9COiBWZWN0b3IyLFxuICAgIGNvbnRhY3Q6IENvbnRhY3QsXG4pOiBib29sZWFuIHtcbiAgICBpZiAoYWFiYl9kZWx0YV9CLnggPT0gMCAmJiBhYWJiX2RlbHRhX0IueSA9PSAwKSB7XG4gICAgICAgIGNvbnRhY3Quc3dlZXBQb3NpdGlvbi54ID0gYWFiYl9wb3NpdGlvbl9CLng7XG4gICAgICAgIGNvbnRhY3Quc3dlZXBQb3NpdGlvbi55ID0gYWFiYl9wb3NpdGlvbl9CLnk7XG4gICAgICAgIGlmIChTdGF0aWNBQUJCdnNTdGF0aWNBQUJCKGFhYmJfcG9zaXRpb25fQSwgYWFiYl9leHRlbnRzX0EsIGFhYmJfcG9zaXRpb25fQiwgYWFiYl9leHRlbnRzX0IsIGNvbnRhY3QpKSB7XG4gICAgICAgICAgICBjb250YWN0LnRpbWUgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWN0LnRpbWUgPSAxO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgU3RhdGljU2VnbWVudHZzU3RhdGljQUFCQihcbiAgICAgICAgICAgICAgICBhYWJiX3Bvc2l0aW9uX0EsXG4gICAgICAgICAgICAgICAgYWFiYl9leHRlbnRzX0EsXG4gICAgICAgICAgICAgICAgYWFiYl9wb3NpdGlvbl9CLFxuICAgICAgICAgICAgICAgIGFhYmJfZGVsdGFfQixcbiAgICAgICAgICAgICAgICBhYWJiX2V4dGVudHNfQi54LFxuICAgICAgICAgICAgICAgIGFhYmJfZXh0ZW50c19CLnksXG4gICAgICAgICAgICAgICAgY29udGFjdCxcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250YWN0LnRpbWUgPSBNYXRoLm1pbihNYXRoLm1heChjb250YWN0LnRpbWUgLSBlcHNpbG9uLCAwKSwgMSk7XG4gICAgICAgICAgICBjb250YWN0LnN3ZWVwUG9zaXRpb24ueCA9IGFhYmJfcG9zaXRpb25fQi54ICsgYWFiYl9kZWx0YV9CLnggKiBjb250YWN0LnRpbWU7XG4gICAgICAgICAgICBjb250YWN0LnN3ZWVwUG9zaXRpb24ueSA9IGFhYmJfcG9zaXRpb25fQi55ICsgYWFiYl9kZWx0YV9CLnkgKiBjb250YWN0LnRpbWU7XG4gICAgICAgICAgICAvL0lubGluZSBleHBhbmRlZCBub3JtYWxpemUgdG8gYXZvaWQgb2JqZWN0IGNyZWF0aW9uXG4gICAgICAgICAgICB2YXIgdCA9IE1hdGguc3FydChhYWJiX2RlbHRhX0IueCAqIGFhYmJfZGVsdGFfQi54ICsgYWFiYl9kZWx0YV9CLnkgKiBhYWJiX2RlbHRhX0IueSk7XG4gICAgICAgICAgICBjb250YWN0LnBvc2l0aW9uLnggKz0gYWFiYl9kZWx0YV9CLnggLyB0ICogYWFiYl9leHRlbnRzX0IueDtcbiAgICAgICAgICAgIGNvbnRhY3QucG9zaXRpb24ueSArPSBhYWJiX2RlbHRhX0IueSAvIHQgKiBhYWJiX2V4dGVudHNfQi55O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWN0LnN3ZWVwUG9zaXRpb24ueCA9IGFhYmJfcG9zaXRpb25fQi54ICogYWFiYl9kZWx0YV9CLng7XG4gICAgICAgICAgICBjb250YWN0LnN3ZWVwUG9zaXRpb24ueSA9IGFhYmJfcG9zaXRpb25fQi55ICogYWFiYl9kZWx0YV9CLnk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgQUFCQnZzU3RhdGljU29saWRBQUJCID0gZnVuY3Rpb24oXG4gICAgYWFiYl9wb3NpdGlvbl9BOiBWZWN0b3IyLFxuICAgIGFhYmJfZXh0ZW50c19BOiBWZWN0b3IyLFxuICAgIGFhYmJfcG9zaXRpb25fQjogVmVjdG9yMixcbiAgICBhYWJiX2V4dGVudHNfQjogVmVjdG9yMixcbiAgICBiaWFzOiBWZWN0b3IyLFxuICAgIGNvbnRhY3Q6IENvbnRhY3QsXG4pOiBib29sZWFuIHtcbiAgICAvL05ldyBvdmVybGFwIGNvZGUsIGhhbmRsZSBjb3JuZXJzIGJldHRlclxuICAgIHZhciBkeCA9IGFhYmJfcG9zaXRpb25fQi54IC0gYWFiYl9wb3NpdGlvbl9BLng7XG4gICAgdmFyIHB4ID0gYWFiYl9leHRlbnRzX0IueCArIGFhYmJfZXh0ZW50c19BLnggLSBNYXRoLmFicyhkeCk7XG5cbiAgICB2YXIgZHkgPSBhYWJiX3Bvc2l0aW9uX0IueSAtIGFhYmJfcG9zaXRpb25fQS55O1xuICAgIHZhciBweSA9IGFhYmJfZXh0ZW50c19CLnkgKyBhYWJiX2V4dGVudHNfQS55IC0gTWF0aC5hYnMoZHkpO1xuXG4gICAgaWYgKHB4IDwgcHkpIHtcbiAgICAgICAgY29udGFjdC5ub3JtYWwueCA9IGR4IDwgMCA/IDEgOiAtMTtcbiAgICAgICAgY29udGFjdC5ub3JtYWwueSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGFjdC5ub3JtYWwueCA9IDA7XG4gICAgICAgIGNvbnRhY3Qubm9ybWFsLnkgPSBkeSA8IDAgPyAxIDogLTE7XG4gICAgfVxuXG4gICAgY29udGFjdC5ub3JtYWwueCAqPSBiaWFzLng7XG4gICAgY29udGFjdC5ub3JtYWwueSAqPSBiaWFzLnk7XG5cbiAgICAvLyB2YXIgZHggPSBhYWJiX3Bvc2l0aW9uX0IueCAtIGFhYmJfcG9zaXRpb25fQS54O1xuICAgIC8vIHZhciBkeSA9IGFhYmJfcG9zaXRpb25fQi55IC0gYWFiYl9wb3NpdGlvbl9BLnk7XG5cbiAgICAvLyBpZiAoZHgqZHg+ZHkqZHkpIHtcbiAgICAvLyAgICAgY29udGFjdC5ub3JtYWwueCA9IGR4Pj0wID8gLTE6IDE7XG4gICAgLy8gICAgIGNvbnRhY3Qubm9ybWFsLnkgPSAwO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAgIGNvbnRhY3Qubm9ybWFsLnggPSAwO1xuICAgIC8vICAgICBjb250YWN0Lm5vcm1hbC55ID0gZHk+PTAgPyAtMSA6IDE7XG4gICAgLy8gfVxuICAgIHZhciBwY3ggPSBjb250YWN0Lm5vcm1hbC54ICogKGFhYmJfZXh0ZW50c19BLnggKyBhYWJiX2V4dGVudHNfQi54KSArIGFhYmJfcG9zaXRpb25fQi54O1xuICAgIHZhciBwY3kgPSBjb250YWN0Lm5vcm1hbC55ICogKGFhYmJfZXh0ZW50c19BLnkgKyBhYWJiX2V4dGVudHNfQi55KSArIGFhYmJfcG9zaXRpb25fQi55O1xuXG4gICAgdmFyIHBkeCA9IGFhYmJfcG9zaXRpb25fQS54IC0gcGN4O1xuICAgIHZhciBwZHkgPSBhYWJiX3Bvc2l0aW9uX0EueSAtIHBjeTtcblxuICAgIGNvbnRhY3QuZGlzdGFuY2UgPSBwZHggKiBjb250YWN0Lm5vcm1hbC54ICsgcGR5ICogY29udGFjdC5ub3JtYWwueTtcblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLy8gcHVibGljIHN0YXRpYyBTdGFpcnMoYWFiYl9wb3NpdGlvbl9BOlZlY3RvcjIsYWFiYl9leHRlbnRzX0E6VmVjdG9yMixhYWJiX3Bvc2l0aW9uX0I6VmVjdG9yMixhYWJiX2V4dGVudHNfQjpWZWN0b3IyLGJpYXM6VmVjdG9yMixjb250YWN0OkNvbnRhY3QpOm51bWJlciB7XG5cbi8vICAgICAgLy9OZXcgb3ZlcmxhcCBjb2RlLCBoYW5kbGUgY29ybmVycyBiZXR0ZXJcbi8vICAgICAgdmFyIGR4ID0gYWFiYl9wb3NpdGlvbl9CLnggLSBhYWJiX3Bvc2l0aW9uX0EueDtcbi8vICAgICAgdmFyIHB4ID0gKGFhYmJfZXh0ZW50c19CLnggKyBhYWJiX2V4dGVudHNfQS54KSAtIE1hdGguYWJzKGR4KTtcblxuLy8gICAgICB2YXIgZHkgPSBhYWJiX3Bvc2l0aW9uX0IueSAtIGFhYmJfcG9zaXRpb25fQS55O1xuLy8gICAgICB2YXIgcHkgPSAoYWFiYl9leHRlbnRzX0IueSArIGFhYmJfZXh0ZW50c19BLnkpIC0gTWF0aC5hYnMoZHkpO1xuXG4vLyAgICAgIGlmIChweDxweSkge1xuLy8gICAgICAgICAgY29udGFjdC5ub3JtYWwueCA9IGR4PDAgPyAxIDogLTE7XG4vLyAgICAgICAgICBjb250YWN0Lm5vcm1hbC55ID0gMDtcbi8vICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgIGNvbnRhY3Qubm9ybWFsLnggPSAwO1xuLy8gICAgICAgICAgY29udGFjdC5ub3JtYWwueSA9IGR5PDAgPyAxIDogLTE7XG4vLyAgICAgIH1cblxuLy8gICAgICBjb250YWN0Lm5vcm1hbC54ID0gMDtcbi8vICAgICAgY29udGFjdC5ub3JtYWwueSA9IC0xO1xuXG4vLyAgICAgIHZhciBwY3ggPSAoY29udGFjdC5ub3JtYWwueCAqIChhYWJiX2V4dGVudHNfQS54K2FhYmJfZXh0ZW50c19CLngpICkgKyBhYWJiX3Bvc2l0aW9uX0IueDtcbi8vICAgICAgdmFyIHBjeSA9IChjb250YWN0Lm5vcm1hbC55ICogKGFhYmJfZXh0ZW50c19BLnkrYWFiYl9leHRlbnRzX0IueSkgKSArIGFhYmJfcG9zaXRpb25fQi55O1xuXG4vLyAgICAgIHZhciBwZHggPSBhYWJiX3Bvc2l0aW9uX0EueCAtIHBjeDtcbi8vICAgICAgdmFyIHBkeSA9IGFhYmJfcG9zaXRpb25fQS55IC0gcGN5O1xuXG4vLyAgICAgIGNvbnRhY3QuZGlzdGFuY2UgPSBwZHgqY29udGFjdC5ub3JtYWwueCArIHBkeSpjb250YWN0Lm5vcm1hbC55O1xuXG4vLyAgICAgIGlmIChweDxweSkge1xuLy8gICAgICAgICAgcmV0dXJuIGR4PDAgPyAxIDogLTE7XG4vLyAgICAgIH1cbi8vICAgICAgcmV0dXJuIDA7XG4vLyAgfVxuXG4vKlxuICAgIFRoaXMgaXMgc2VwZXJhdGUgdG8gYXZvaWQgb3ZlcmNvbXBsaWNhdGluZyB0aGUgYWJvdmUgd2l0aCB0b28gbXVjaCBicmFuY2hpbmdcbiAgICAqL1xuZXhwb3J0IGNvbnN0IEFBQkJ2c1N0YXRpY1NvbGlkQUFCQkZpeGVkTm9ybWFsID0gZnVuY3Rpb24oXG4gICAgYWFiYl9wb3NpdGlvbl9BOiBWZWN0b3IyLFxuICAgIGFhYmJfZXh0ZW50c19BOiBWZWN0b3IyLFxuICAgIGFhYmJfcG9zaXRpb25fQjogVmVjdG9yMixcbiAgICBhYWJiX2V4dGVudHNfQjogVmVjdG9yMixcbiAgICBub3JtYWw6IFZlY3RvcjIsXG4gICAgY29udGFjdDogQ29udGFjdCxcbik6IGJvb2xlYW4ge1xuICAgIGNvbnRhY3Qubm9ybWFsLmNvcHkobm9ybWFsKTtcblxuICAgIHZhciBwY3ggPSBjb250YWN0Lm5vcm1hbC54ICogKGFhYmJfZXh0ZW50c19BLnggKyBhYWJiX2V4dGVudHNfQi54KSArIGFhYmJfcG9zaXRpb25fQi54O1xuICAgIHZhciBwY3kgPSBjb250YWN0Lm5vcm1hbC55ICogKGFhYmJfZXh0ZW50c19BLnkgKyBhYWJiX2V4dGVudHNfQi55KSArIGFhYmJfcG9zaXRpb25fQi55O1xuXG4gICAgdmFyIHBkeCA9IGFhYmJfcG9zaXRpb25fQS54IC0gcGN4O1xuICAgIHZhciBwZHkgPSBhYWJiX3Bvc2l0aW9uX0EueSAtIHBjeTtcblxuICAgIGNvbnRhY3QuZGlzdGFuY2UgPSBwZHggKiBjb250YWN0Lm5vcm1hbC54ICsgcGR5ICogY29udGFjdC5ub3JtYWwueTtcblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgQUFCQnZzU3RhdGljU29saWRBQUJCU2xvcGUgPSBmdW5jdGlvbihcbiAgICBhYWJiX3Bvc2l0aW9uX0E6IFZlY3RvcjIsXG4gICAgYWFiYl9leHRlbnRzX0E6IFZlY3RvcjIsXG4gICAgYWFiYl9wb3NpdGlvbl9COiBWZWN0b3IyLFxuICAgIGFhYmJfZXh0ZW50c19COiBWZWN0b3IyLFxuICAgIGJpYXM6IFZlY3RvcjIsXG4gICAgY29udGFjdDogQ29udGFjdCxcbik6IGJvb2xlYW4ge1xuICAgIHZhciBfc3FyID0gMC43MDcxMDY3ODExODY1NTtcblxuICAgIC8vTmV3IG92ZXJsYXAgY29kZSwgaGFuZGxlIGNvcm5lcnMgYmV0dGVyXG4gICAgdmFyIGR4ID0gYWFiYl9wb3NpdGlvbl9CLnggLSBhYWJiX3Bvc2l0aW9uX0EueDtcbiAgICB2YXIgcHggPSBhYWJiX2V4dGVudHNfQi54ICsgYWFiYl9leHRlbnRzX0EueCAtIE1hdGguYWJzKGR4KTtcblxuICAgIHZhciBkeSA9IGFhYmJfcG9zaXRpb25fQi55IC0gYWFiYl9wb3NpdGlvbl9BLnk7XG4gICAgdmFyIHB5ID0gYWFiYl9leHRlbnRzX0IueSArIGFhYmJfZXh0ZW50c19BLnkgLSBNYXRoLmFicyhkeSk7XG5cbiAgICAvLyBpZiAocHg8cHkpIHtcbiAgICAvLyAgICAgY29udGFjdC5ub3JtYWwueCA9IGR4PDAgPyAxIDogLTE7XG4gICAgLy8gICAgIGNvbnRhY3Qubm9ybWFsLnkgPSAwO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAgIGNvbnRhY3Qubm9ybWFsLnggPSAwO1xuICAgIC8vICAgICBjb250YWN0Lm5vcm1hbC55ID0gZHk8MCA/IDEgOiAtMTtcbiAgICAvLyB9XG5cbiAgICAvLyBjb250YWN0Lm5vcm1hbC54ICo9IGJpYXMueDtcbiAgICAvLyBjb250YWN0Lm5vcm1hbC55ICo9IGJpYXMueTtcblxuICAgIGNvbnRhY3Qubm9ybWFsLnggPSAtX3NxcjtcbiAgICBjb250YWN0Lm5vcm1hbC55ID0gLV9zcXI7XG5cbiAgICAvLyB2YXIgZHggPSBhYWJiX3Bvc2l0aW9uX0IueCAtIGFhYmJfcG9zaXRpb25fQS54O1xuICAgIC8vIHZhciBkeSA9IGFhYmJfcG9zaXRpb25fQi55IC0gYWFiYl9wb3NpdGlvbl9BLnk7XG5cbiAgICAvLyBpZiAoZHgqZHg+ZHkqZHkpIHtcbiAgICAvLyAgICAgY29udGFjdC5ub3JtYWwueCA9IGR4Pj0wID8gLTE6IDE7XG4gICAgLy8gICAgIGNvbnRhY3Qubm9ybWFsLnkgPSAwO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAgIGNvbnRhY3Qubm9ybWFsLnggPSAwO1xuICAgIC8vICAgICBjb250YWN0Lm5vcm1hbC55ID0gZHk+PTAgPyAtMSA6IDE7XG4gICAgLy8gfVxuICAgIHZhciBwY3ggPSBjb250YWN0Lm5vcm1hbC54ICogKGFhYmJfZXh0ZW50c19BLnggKyBhYWJiX2V4dGVudHNfQi54KSArIGFhYmJfcG9zaXRpb25fQi54O1xuICAgIHZhciBwY3kgPSBjb250YWN0Lm5vcm1hbC55ICogKGFhYmJfZXh0ZW50c19BLnkgKyBhYWJiX2V4dGVudHNfQi55KSArIGFhYmJfcG9zaXRpb25fQi55O1xuXG4gICAgdmFyIHBkeCA9IGFhYmJfcG9zaXRpb25fQS54IC0gcGN4IC0gODtcbiAgICB2YXIgcGR5ID0gYWFiYl9wb3NpdGlvbl9BLnkgLSBwY3k7XG5cbiAgICBjb250YWN0LmRpc3RhbmNlID0gcGR4ICogY29udGFjdC5ub3JtYWwueCArIHBkeSAqIGNvbnRhY3Qubm9ybWFsLnk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvcGh5c2ljcy9jb2xsaXNpb24vSW50ZXJzZWN0LnRzIiwiZXhwb3J0IGNsYXNzIEZpbHRlciB7XG4gICAgLy9Ud28gcG9zaXRpdmUgYW5kIGVxdWFsIGdyb3VwIGluZGV4cyBhbHdheXMgY29sbGlkZVxuICAgIC8vVHdvIG5lZ2F0aXZlIGFuZCBlcXVhbCBncm91cCBpbmRleHMgbmV2ZXIgY29sbGlkZVxuICAgIC8vVHdvIHplcm8gZ3JvdXAgaW5kZXhzIGFyZSBwYXNzZWQgdGhyb3VnaFxuICAgIHB1YmxpYyBncm91cEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgLy9XaGF0IGNhdGVnb3J5IHRoaXMgZmlsdGVyIGlzIGluXG4gICAgcHVibGljIGNhdGVnb3J5Qml0czogbnVtYmVyID0gMHgwMDAxO1xuICAgIC8vV2hhdCBvdGhlciBjYXRlZ29yaWVzIGl0IGNhbiBjb2xsaWRlIHdpdGhcbiAgICBwdWJsaWMgbWFza0JpdHM6IG51bWJlciA9IDB4ZmZmZmZmZmY7XG5cbiAgICAvL2UuZy5cbiAgICAvL3BsYXllci5maWx0ZXIuY2F0ZWdvcnlCaXRzID0gMHgwMDAyXG4gICAgLy9wbGF5ZXIuZmlsdGVyLm1hc2tCaXRzICAgICA9IDB4MDAwNFxuICAgIC8vXG4gICAgLy9lbmVteS5maWx0ZXIuY2F0ZWdvcnlCaXRzICA9IDB4MDAwNFxuICAgIC8vZW5lbXkuZmlsdGVyLm1hc2tCaXRzICAgICAgPSAweDAwMDJcbiAgICAvL1xuICAgIC8vSGVyZSwgcGxheWVycyBhbiBlbmVtaWVzIHdpbGwgY29sbGlkZVxuICAgIC8vb3ZlcmV2ZXIgcGxheWVycyB3b250IGNvbGxpZGUgd2l0aCBwbGF5ZXIgb3IgbW9uc3RlcnMgd2l0aCBtb3N0ZXJzXG5cbiAgICBjb25zdHJ1Y3RvcihjYXRlZ29yeUJpdHM6IG51bWJlciA9IDB4MSwgbWFza0JpdHM6IG51bWJlciA9IDB4ZmZmZmZmZmYsIGdyb3VwSW5kZXg6IG51bWJlciA9IDB4MCkge1xuICAgICAgICB0aGlzLmNhdGVnb3J5Qml0cyA9IGNhdGVnb3J5Qml0cztcbiAgICAgICAgdGhpcy5tYXNrQml0cyA9IG1hc2tCaXRzO1xuICAgICAgICB0aGlzLmdyb3VwSW5kZXggPSBncm91cEluZGV4O1xuICAgIH1cblxuICAgIHN0YXRpYyBDSEVDSyhmaWx0ZXJBOiBGaWx0ZXIsIGZpbHRlckI6IEZpbHRlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmlsdGVyQSA9PSBudWxsIHx8IGZpbHRlckIgPT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgLy8gaWYgKChmaWx0ZXJBLmdyb3VwSW5kZXggPiAwICYmIGZpbHRlckIuZ3JvdXBJbmRleCA+IDAgJiYgZmlsdGVyQS5ncm91cEluZGV4ID09IGZpbHRlckIuZ3JvdXBJbmRleCkpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmIChmaWx0ZXJBLmdyb3VwSW5kZXggPT0gZmlsdGVyQi5ncm91cEluZGV4ICYmIGZpbHRlckEuZ3JvdXBJbmRleCAhPSAwKSByZXR1cm4gZmlsdGVyQS5ncm91cEluZGV4ID4gMDtcblxuICAgICAgICByZXR1cm4gKGZpbHRlckEubWFza0JpdHMgJiBmaWx0ZXJCLmNhdGVnb3J5Qml0cykgIT0gMCAmJiAoZmlsdGVyQS5jYXRlZ29yeUJpdHMgJiBmaWx0ZXJCLm1hc2tCaXRzKSAhPSAwO1xuXG4gICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAvLyAgICAgaWYgKChmaWx0ZXJBLm1hc2tCaXRzICYgZmlsdGVyQi5jYXRlZ29yeUJpdHMpID09IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gICAgIGlmICgoZmlsdGVyQS5jYXRlZ29yeUJpdHMgJiBmaWx0ZXJCLm1hc2tCaXRzKSA9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb25lKCk6IEZpbHRlciB7XG4gICAgICAgIHJldHVybiBuZXcgRmlsdGVyKHRoaXMuY2F0ZWdvcnlCaXRzLCB0aGlzLm1hc2tCaXRzLCB0aGlzLmdyb3VwSW5kZXgpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9waHlzaWNzL2NvbGxpc2lvbi9GaWx0ZXIudHMiLCJleHBvcnQgY2xhc3MgTWF0ZXJpYWwge1xuICAgIHN0YXRpYyBOT1JNQUw6IE1hdGVyaWFsID0gbmV3IE1hdGVyaWFsKDEsIDAuMywgMC4xKTtcbiAgICBzdGF0aWMgTElHSFRNRVRBTDogTWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwoMS40LCAwLjMsIDAuMSk7XG4gICAgc3RhdGljIFJPQ0s6IE1hdGVyaWFsID0gbmV3IE1hdGVyaWFsKDIuMCwgMC4yLCAwLjEpO1xuXG4gICAgcHVibGljIGRlbnNpdHk6IG51bWJlcjtcbiAgICBwdWJsaWMgZWxhc3RpY2l0eTogbnVtYmVyO1xuICAgIHB1YmxpYyBmcmljdGlvbjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoZGVuc2l0eTogbnVtYmVyID0gMSwgZWxhc3RpY2l0eTogbnVtYmVyID0gMC4zLCBmcmljdGlvbjogbnVtYmVyID0gMC4xKSB7XG4gICAgICAgIHRoaXMuZGVuc2l0eSA9IGRlbnNpdHk7XG4gICAgICAgIHRoaXMuZWxhc3RpY2l0eSA9IGVsYXN0aWNpdHk7XG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSBmcmljdGlvbjtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvcGh5c2ljcy9NYXRlcmlhbC50cyIsImV4cG9ydCBjbGFzcyBDb250cm9sbGFibGUge1xuICAgIHB1YmxpYyBmb3JjZTogbnVtYmVyID0gMTtcbiAgICBjb25zdHJ1Y3Rvcihmb3JjZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZm9yY2UgPSBmb3JjZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvY29yZS9jb21wb25lbnRzL0NvbnRyb2xsYWJsZS50cyIsImV4cG9ydCBjbGFzcyBUaWxlR3JhcGhpY3Mge1xuICAgIHB1YmxpYyB0aWxlRnJhbWVJZDogc3RyaW5nO1xuICAgIHB1YmxpYyBvbkNoYW5nZTogKCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKHRpbGVGcmFtZUlkOiBzdHJpbmcgPSBcIlwiKSB7XG4gICAgICAgIHRoaXMuc2V0VGlsZUZyYW1lSWQodGlsZUZyYW1lSWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRUaWxlRnJhbWVJZCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgdGhpcy50aWxlRnJhbWVJZCA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5vbkNoYW5nZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9ncmFwaGljcy9jb21wb25lbnRzL1RpbGVHcmFwaGljcy50cyIsImltcG9ydCB7IEdhbWVUZXN0QSB9IGZyb20gXCIuL3Rlc3QvR2FtZVRlc3RBXCI7XG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZVRlc3RBKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiLCJpbXBvcnQgeyBHbGF6ZUVuZ2luZSB9IGZyb20gXCIuLi9nbGF6ZS9HbGF6ZUVuZ2luZVwiO1xuaW1wb3J0IHsgR3JhcGhpY3NSZW5kZXJTeXN0ZW0gfSBmcm9tIFwiLi4vZ2xhemUvZ3JhcGhpY3Mvc3lzdGVtcy9HcmFwaGljc1JlbmRlclN5c3RlbVwiO1xuaW1wb3J0IHsgQUFCQjIgfSBmcm9tIFwiLi4vZ2xhemUvZ2VvbS9BQUJCMlwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vZ2xhemUvY29yZS9jb21wb25lbnRzL1Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBHcmFwaGljcyB9IGZyb20gXCIuLi9nbGF6ZS9ncmFwaGljcy9jb21wb25lbnRzL0dyYXBoaWNzXCI7XG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uL2dsYXplL2dlb20vVmVjdG9yMlwiO1xuaW1wb3J0IHsgU3ByaXRlUmVuZGVyZXIgfSBmcm9tIFwiLi4vZ2xhemUvZ3JhcGhpY3MvcmVuZGVyL3Nwcml0ZS9TcHJpdGVSZW5kZXJlclwiO1xuaW1wb3J0IHtcbiAgICBUTVhNYXAsXG4gICAgVE1YTGF5ZXIsXG4gICAgVE1YZGVjb2RlTGF5ZXIsXG4gICAgR2V0TGF5ZXIsXG4gICAgTGF5ZXJUb0Nvb3JkVGV4dHVyZSxcbiAgICBMYXllclRvQ29sbGlzaW9uRGF0YSxcbiAgICBHZXRUaWxlU2V0LFxufSBmcm9tIFwiLi4vZ2xhemUvdG14L1RNWE1hcFwiO1xuaW1wb3J0IHsgVGlsZU1hcFJlbmRlcmVyIH0gZnJvbSBcIi4uL2dsYXplL2dyYXBoaWNzL3JlbmRlci90aWxlL1RpbGVNYXBSZW5kZXJlclwiO1xuaW1wb3J0IHsgR3JhcGhpY3NBbmltYXRpb24gfSBmcm9tIFwiLi4vZ2xhemUvZ3JhcGhpY3MvY29tcG9uZW50cy9HcmFwaGljc0FuaW1hdGlvblwiO1xuaW1wb3J0IHsgQW5pbWF0aW9uU3lzdGVtIH0gZnJvbSBcIi4uL2dsYXplL2dyYXBoaWNzL3N5c3RlbXMvQW5pbWF0aW9uU3lzdGVtXCI7XG5pbXBvcnQgeyBUaWxlTWFwQ29sbGlzaW9uIH0gZnJvbSBcIi4uL2dsYXplL3BoeXNpY3MvY29sbGlzaW9uL2Jyb2FkcGhhc2UvVGlsZU1hcENvbGxpc2lvblwiO1xuaW1wb3J0IHsgQnJ1dGVmb3JjZUJyb2FkcGhhc2UgfSBmcm9tIFwiLi4vZ2xhemUvcGh5c2ljcy9jb2xsaXNpb24vYnJvYWRwaGFzZS9CcnV0ZWZvcmNlQnJvYWRwaGFzZVwiO1xuaW1wb3J0IHsgUGh5c2ljc1N0YXRpY1N5c3RlbSB9IGZyb20gXCIuLi9nbGF6ZS9waHlzaWNzL3N5c3RlbXMvUGh5c2ljc1N0YXRpY1N5c3RlbVwiO1xuaW1wb3J0IHsgUGh5c2ljc01vdmVhYmxlU3lzdGVtIH0gZnJvbSBcIi4uL2dsYXplL3BoeXNpY3Mvc3lzdGVtcy9QaHlzaWNzTW92ZWFibGVTeXN0ZW1cIjtcbmltcG9ydCB7IFBoeXNpY3NDb2xsaXNpb25TeXN0ZW0gfSBmcm9tIFwiLi4vZ2xhemUvcGh5c2ljcy9zeXN0ZW1zL1BoeXNpY3NDb2xsaXNpb25TeXN0ZW1cIjtcbmltcG9ydCB7IFBoeXNpY3NNYXNzU3lzdGVtIH0gZnJvbSBcIi4uL2dsYXplL3BoeXNpY3Mvc3lzdGVtcy9QaHlzaWNzTWFzc1N5c3RlbVwiO1xuaW1wb3J0IHsgUGh5c2ljc1Bvc2l0aW9uU3lzdGVtIH0gZnJvbSBcIi4uL2dsYXplL3BoeXNpY3Mvc3lzdGVtcy9QaHlzaWNzUG9zaXRpb25TeXN0ZW1cIjtcbmltcG9ydCB7IEV4dGVudHMgfSBmcm9tIFwiLi4vZ2xhemUvY29yZS9jb21wb25lbnRzL0V4dGVudHNcIjtcbmltcG9ydCB7IFBoeXNpY3NDb2xsaXNpb24gfSBmcm9tIFwiLi4vZ2xhemUvcGh5c2ljcy9jb21wb25lbnRzL1BoeXNpY3NDb2xsaXNpb25cIjtcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gXCIuLi9nbGF6ZS9waHlzaWNzL2NvbGxpc2lvbi9GaWx0ZXJcIjtcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL2dsYXplL3BoeXNpY3MvTWF0ZXJpYWxcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwiLi4vZ2xhemUvcGh5c2ljcy9Cb2R5XCI7XG5pbXBvcnQgeyBQaHlzaWNzQm9keSB9IGZyb20gXCIuLi9nbGF6ZS9waHlzaWNzL2NvbXBvbmVudHMvUGh5c2ljc0JvZHlcIjtcbmltcG9ydCB7IE1vdmVhYmxlIH0gZnJvbSBcIi4uL2dsYXplL2NvcmUvY29tcG9uZW50cy9Nb3ZlYWJsZVwiO1xuaW1wb3J0IHsgQWN0aXZlIH0gZnJvbSBcIi4uL2dsYXplL2NvcmUvY29tcG9uZW50cy9BY3RpdmVcIjtcbmltcG9ydCB7IFBoeXNpY3NVcGRhdGVTeXN0ZW0gfSBmcm9tIFwiLi4vZ2xhemUvcGh5c2ljcy9zeXN0ZW1zL1BoeXNpY3NVcGRhdGVTeXN0ZW1cIjtcbmltcG9ydCB7IENvbnRyb2xsYWJsZSB9IGZyb20gXCIuLi9nbGF6ZS9jb3JlL2NvbXBvbmVudHMvQ29udHJvbGxhYmxlXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyU3lzdGVtIH0gZnJvbSBcIi4uL2dsYXplL2NvcmUvc3lzdGVtcy9Db250cm9sbGVyU3lzdGVtXCI7XG5pbXBvcnQgeyBUaWxlR3JhcGhpY3NSZW5kZXJTeXN0ZW0gfSBmcm9tIFwiLi4vZ2xhemUvZ3JhcGhpY3Mvc3lzdGVtcy9UaWxlR3JhcGhpY3NSZW5kZXJTeXN0ZW1cIjtcbmltcG9ydCB7IFRpbGVHcmFwaGljcyB9IGZyb20gXCIuLi9nbGF6ZS9ncmFwaGljcy9jb21wb25lbnRzL1RpbGVHcmFwaGljc1wiO1xuaW1wb3J0IHsgRml4ZWQgfSBmcm9tIFwiLi4vZ2xhemUvY29yZS9jb21wb25lbnRzL0ZpeGVkXCI7XG5pbXBvcnQgeyBCbG9ja1BhcnRpY2xlRW5naW5lMiB9IGZyb20gXCIuLi9nbGF6ZS9wYXJ0aWNsZS9lbmdpbmVzL0Jsb2NrUGFydGljbGVFbmdpbmUyXCI7XG5pbXBvcnQgeyBQYXJ0aWNsZVN5c3RlbSB9IGZyb20gXCIuLi9nbGF6ZS9wYXJ0aWNsZS9zeXN0ZW1zL1BhcnRpY2xlU3lzdGVtXCI7XG5pbXBvcnQgeyBQYXJ0aWNsZUVtaXR0ZXIgfSBmcm9tIFwiLi4vZ2xhemUvcGFydGljbGUvY29tcG9uZW50cy9QYXJ0aWNsZUVtaXR0ZXJcIjtcbmltcG9ydCB7IEV4cGxvc2lvbiB9IGZyb20gXCIuLi9nbGF6ZS9wYXJ0aWNsZS9lbWl0dGVyL0V4cGxvc2lvblwiO1xuaW1wb3J0IHsgRml4ZWRWaWV3TWFuYWdlbWVudFN5c3RlbSB9IGZyb20gXCIuLi9nbGF6ZS9zcGFjZS9zeXN0ZW1zL0ZpeGVkVmlld01hbmFnZW1lbnRTeXN0ZW1cIjtcblxuaW50ZXJmYWNlIEdsYXplTWFwTGF5ZXJDb25maWcge31cblxuaW50ZXJmYWNlIEdsYXplR2FtZUNvbmZpZyB7XG4gICAgdGlsZVNpemU6IG51bWJlcjtcbiAgICBtYXA6IHN0cmluZztcbiAgICBzcHJpdGVDb25maWc6IHN0cmluZztcbiAgICBzcHJpdGVUZXh0dXJlOiBzdHJpbmc7XG4gICAgc3ByaXRlRnJhbWVzOiBzdHJpbmc7XG4gICAgdGlsZXNUZXh0dXJlOiBzdHJpbmc7XG4gICAgbWFwTGF5ZXJzOiBHbGF6ZU1hcExheWVyQ29uZmlnW107XG59XG5cbmNvbnN0IE1BUF9EQVRBOiBzdHJpbmcgPSBcImRhdGEvMTZtYXAuanNvblwiO1xuY29uc3QgVEVYVFVSRV9DT05GSUc6IHN0cmluZyA9IFwiZGF0YS9zcHJpdGVzLmpzb25cIjtcbmNvbnN0IFRFWFRVUkVfREFUQTogc3RyaW5nID0gXCJkYXRhL3Nwcml0ZXMucG5nXCI7XG5jb25zdCBGUkFNRVNfQ09ORklHOiBzdHJpbmcgPSBcImRhdGEvZnJhbWVzLmpzb25cIjtcblxuY29uc3QgUEFSVElDTEVfVEVYVFVSRV9DT05GSUc6IHN0cmluZyA9IFwiZGF0YS9wYXJ0aWNsZXMuanNvblwiO1xuY29uc3QgUEFSVElDTEVfVEVYVFVSRV9EQVRBOiBzdHJpbmcgPSBcImRhdGEvcGFydGljbGVzLnBuZ1wiO1xuY29uc3QgUEFSVElDTEVfRlJBTUVTX0NPTkZJRzogc3RyaW5nID0gXCJkYXRhL3BhcnRpY2xlRnJhbWVzLmpzb25cIjtcbmNvbnN0IFRJTEVfRlJBTUVTX0NPTkZJRzogc3RyaW5nID0gXCJkYXRhL3RpbGVGcmFtZXMuanNvblwiO1xuXG4vLyBjb25zdCBDT0xfU1BSSVRFX1NIRUVUOnN0cmluZyA9IFwiZGF0YS9zdXBlclNldC5wbmdcIjtcbi8vIGNvbnN0IFRJTEVfU1BSSVRFX1NIRUVUXzE6c3RyaW5nID0gXCJkYXRhL3N1cGVyU2V0LnBuZ1wiO1xuLy8gY29uc3QgVElMRV9TUFJJVEVfU0hFRVRfMjpzdHJpbmcgPSBcImRhdGEvc3VwZXJTZXQucG5nXCI7XG4vLyBjb25zdCBUSUxFX1NQUklURV9TSEVFVF9COnN0cmluZyA9IFwiZGF0YS9zdXBlclNldC5wbmdcIjtcblxuY29uc3QgVElMRV9TUFJJVEVfU0hFRVQ6IHN0cmluZyA9IFwiZGF0YS9zdXBlclNldC5wbmdcIjtcblxuY29uc3QgVElMRV9TSVpFID0gMTY7XG5cbmV4cG9ydCBjbGFzcyBHYW1lVGVzdEEgZXh0ZW5kcyBHbGF6ZUVuZ2luZSB7XG4gICAgcHJpdmF0ZSByZW5kZXJTeXN0ZW06IEdyYXBoaWNzUmVuZGVyU3lzdGVtO1xuICAgIHByaXZhdGUgdG14TWFwOiBUTVhNYXA7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXdcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgIHN1cGVyKGNhbnZhcyk7XG4gICAgICAgIHRoaXMubG9hZEFzc2V0cyhbVEVYVFVSRV9DT05GSUcsIFRFWFRVUkVfREFUQSwgRlJBTUVTX0NPTkZJRywgTUFQX0RBVEEsIFRJTEVfU1BSSVRFX1NIRUVULCBUSUxFX0ZSQU1FU19DT05GSUddKTtcbiAgICB9XG5cbiAgICBpbml0YWxpemUoKSB7XG4gICAgICAgIHRoaXMuZW5naW5lLmFkZENhcGFjaXR5VG9FbmdpbmUoMTAwMCk7XG5cbiAgICAgICAgY29uc3QgdG14TWFwOiBUTVhNYXAgPSBKU09OLnBhcnNlKHRoaXMuYXNzZXRzLmFzc2V0cy5nZXQoTUFQX0RBVEEpKSBhcyBUTVhNYXA7XG5cbiAgICAgICAgdmFyIGNhbWVyYVJhbmdlID0gbmV3IEFBQkIyKDAsIFRJTEVfU0laRSAqIHRteE1hcC53aWR0aCwgVElMRV9TSVpFICogdG14TWFwLmhlaWdodCwgMCk7XG4gICAgICAgIGNhbWVyYVJhbmdlLmV4cGFuZCgtVElMRV9TSVpFICogMik7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW0gPSBuZXcgR3JhcGhpY3NSZW5kZXJTeXN0ZW0odGhpcy5jYW52YXMsIGNhbWVyYVJhbmdlKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW0udGV4dHVyZU1hbmFnZXIuQWRkVGV4dHVyZShURVhUVVJFX0RBVEEsIHRoaXMuYXNzZXRzLmFzc2V0cy5nZXQoVEVYVFVSRV9EQVRBKSk7XG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtLnRleHR1cmVNYW5hZ2VyLkFkZFRleHR1cmUoVElMRV9TUFJJVEVfU0hFRVQsIHRoaXMuYXNzZXRzLmFzc2V0cy5nZXQoVElMRV9TUFJJVEVfU0hFRVQpKTtcblxuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbS50ZXh0dXJlTWFuYWdlci5QYXJzZVRleHR1cmVQYWNrZXJKU09OKHRoaXMuYXNzZXRzLmFzc2V0cy5nZXQoVEVYVFVSRV9DT05GSUcpLCBURVhUVVJFX0RBVEEpO1xuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbS5mcmFtZUxpc3RNYW5hZ2VyLlBhcnNlRnJhbWVMaXN0SlNPTih0aGlzLmFzc2V0cy5hc3NldHMuZ2V0KEZSQU1FU19DT05GSUcpKTtcblxuICAgICAgICBjb25zdCBiYWNrZ3JvdW5kID0gTGF5ZXJUb0Nvb3JkVGV4dHVyZShUTVhkZWNvZGVMYXllcihHZXRMYXllcih0bXhNYXAsIFwiQmFja2dyb3VuZFwiKSkpO1xuICAgICAgICBjb25zdCBmb3JlZ3JvdW5kMSA9IExheWVyVG9Db29yZFRleHR1cmUoVE1YZGVjb2RlTGF5ZXIoR2V0TGF5ZXIodG14TWFwLCBcIkZvcmVncm91bmQxXCIpKSk7XG4gICAgICAgIGNvbnN0IGZvcmVncm91bmQyID0gTGF5ZXJUb0Nvb3JkVGV4dHVyZShUTVhkZWNvZGVMYXllcihHZXRMYXllcih0bXhNYXAsIFwiRm9yZWdyb3VuZDJcIikpKTtcblxuICAgICAgICBjb25zdCBjb2xsaXNpb25EYXRhID0gTGF5ZXJUb0NvbGxpc2lvbkRhdGEoXG4gICAgICAgICAgICBUTVhkZWNvZGVMYXllcihHZXRMYXllcih0bXhNYXAsIFwiQ29sbGlzaW9uXCIpKSxcbiAgICAgICAgICAgIEdldFRpbGVTZXQodG14TWFwLCBcIkNvbGxpc2lvblwiKS5maXJzdGdpZCxcbiAgICAgICAgICAgIFRJTEVfU0laRSxcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgdGlsZU1hcFJlbmRlcmVyID0gbmV3IFRpbGVNYXBSZW5kZXJlcigxNiAvIDIsIDIpO1xuXG4gICAgICAgIHRpbGVNYXBSZW5kZXJlci5TZXRUaWxlUmVuZGVyTGF5ZXIoXCJiZ1wiLCBbXCJCYWNrZ3JvdW5kXCIsIFwiRm9yZWdyb3VuZDFcIl0pO1xuICAgICAgICB0aWxlTWFwUmVuZGVyZXIuU2V0VGlsZVJlbmRlckxheWVyKFwiZmdcIiwgW1wiRm9yZWdyb3VuZDJcIl0pO1xuXG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtLnJlbmRlcmVyLkFkZFJlbmRlcmVyKHRpbGVNYXBSZW5kZXJlcik7XG5cbiAgICAgICAgdGlsZU1hcFJlbmRlcmVyLlNldFRpbGVMYXllckZyb21EYXRhKFxuICAgICAgICAgICAgZm9yZWdyb3VuZDIsXG4gICAgICAgICAgICB0aGlzLnJlbmRlclN5c3RlbS50ZXh0dXJlTWFuYWdlci5iYXNlVGV4dHVyZXMuZ2V0KFRJTEVfU1BSSVRFX1NIRUVUKSxcbiAgICAgICAgICAgIFwiRm9yZWdyb3VuZDJcIixcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAxLFxuICAgICAgICApO1xuICAgICAgICB0aWxlTWFwUmVuZGVyZXIuU2V0VGlsZUxheWVyRnJvbURhdGEoXG4gICAgICAgICAgICBmb3JlZ3JvdW5kMSxcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU3lzdGVtLnRleHR1cmVNYW5hZ2VyLmJhc2VUZXh0dXJlcy5nZXQoVElMRV9TUFJJVEVfU0hFRVQpLFxuICAgICAgICAgICAgXCJGb3JlZ3JvdW5kMVwiLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICk7XG4gICAgICAgIHRpbGVNYXBSZW5kZXJlci5TZXRUaWxlTGF5ZXJGcm9tRGF0YShcbiAgICAgICAgICAgIGJhY2tncm91bmQsXG4gICAgICAgICAgICB0aGlzLnJlbmRlclN5c3RlbS50ZXh0dXJlTWFuYWdlci5iYXNlVGV4dHVyZXMuZ2V0KFRJTEVfU1BSSVRFX1NIRUVUKSxcbiAgICAgICAgICAgIFwiQmFja2dyb3VuZFwiLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3Qgc3ByaXRlUmVuZGVyID0gbmV3IFNwcml0ZVJlbmRlcmVyKCk7XG4gICAgICAgIHNwcml0ZVJlbmRlci5BZGRTdGFnZSh0aGlzLnJlbmRlclN5c3RlbS5zdGFnZSk7XG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtLnJlbmRlcmVyLkFkZFJlbmRlcmVyKHNwcml0ZVJlbmRlcik7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW0uaXRlbUNvbnRhaW5lci5hZGRDaGlsZCh0aWxlTWFwUmVuZGVyZXIucmVuZGVyTGF5ZXJzTWFwLmdldChcImJnXCIpLnNwcml0ZSk7XG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtLmNhbWVyYS5hZGRDaGlsZCh0aWxlTWFwUmVuZGVyZXIucmVuZGVyTGF5ZXJzTWFwLmdldChcImZnXCIpLnNwcml0ZSk7XG5cbiAgICAgICAgdGhpcy5lbmdpbmUuYWRkU3lzdGVtVG9FbmdpbmUodGhpcy5yZW5kZXJTeXN0ZW0pO1xuICAgICAgICB0aGlzLmVuZ2luZS5hZGRTeXN0ZW1Ub0VuZ2luZShuZXcgQW5pbWF0aW9uU3lzdGVtKHRoaXMucmVuZGVyU3lzdGVtLmZyYW1lTGlzdE1hbmFnZXIpKTtcblxuICAgICAgICBjb25zdCB0aWxlTWFwQ29sbGlzaW9uID0gbmV3IFRpbGVNYXBDb2xsaXNpb24oY29sbGlzaW9uRGF0YSk7XG5cbiAgICAgICAgdGhpcy5lbmdpbmUuYWRkU3lzdGVtVG9FbmdpbmUoXG4gICAgICAgICAgICBuZXcgVGlsZUdyYXBoaWNzUmVuZGVyU3lzdGVtKHRoaXMuYXNzZXRzLmFzc2V0cy5nZXQoVElMRV9GUkFNRVNfQ09ORklHKSwgdGlsZU1hcFJlbmRlcmVyLCB0aWxlTWFwQ29sbGlzaW9uKSxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBibG9ja1BhcnRpY2xlRW5naW5lID0gbmV3IEJsb2NrUGFydGljbGVFbmdpbmUyKDQwMDAsIDEwMDAgLyA2MCwgY29sbGlzaW9uRGF0YSk7XG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtLnJlbmRlcmVyLkFkZFJlbmRlcmVyKGJsb2NrUGFydGljbGVFbmdpbmUucmVuZGVyZXIpO1xuXG4gICAgICAgIGNvbnN0IGJyb2FkcGhhc2UgPSBuZXcgQnJ1dGVmb3JjZUJyb2FkcGhhc2UodGlsZU1hcENvbGxpc2lvbik7XG4gICAgICAgIHRoaXMuZW5naW5lLmFkZFN5c3RlbVRvRW5naW5lKG5ldyBQaHlzaWNzVXBkYXRlU3lzdGVtKCkpO1xuICAgICAgICB0aGlzLmVuZ2luZS5hZGRTeXN0ZW1Ub0VuZ2luZShuZXcgUGh5c2ljc1N0YXRpY1N5c3RlbShicm9hZHBoYXNlKSk7XG4gICAgICAgIHRoaXMuZW5naW5lLmFkZFN5c3RlbVRvRW5naW5lKG5ldyBQaHlzaWNzTW92ZWFibGVTeXN0ZW0oYnJvYWRwaGFzZSkpO1xuICAgICAgICB0aGlzLmVuZ2luZS5hZGRTeXN0ZW1Ub0VuZ2luZShuZXcgUGh5c2ljc0NvbGxpc2lvblN5c3RlbShicm9hZHBoYXNlKSk7XG4gICAgICAgIHRoaXMuZW5naW5lLmFkZFN5c3RlbVRvRW5naW5lKG5ldyBQaHlzaWNzTWFzc1N5c3RlbSgpKTtcbiAgICAgICAgdGhpcy5lbmdpbmUuYWRkU3lzdGVtVG9FbmdpbmUobmV3IFBoeXNpY3NQb3NpdGlvblN5c3RlbSgpKTtcblxuICAgICAgICB0aGlzLmVuZ2luZS5hZGRTeXN0ZW1Ub0VuZ2luZShuZXcgQ29udHJvbGxlclN5c3RlbSh0aGlzLmlucHV0KSk7XG5cbiAgICAgICAgdGhpcy5lbmdpbmUuYWRkU3lzdGVtVG9FbmdpbmUobmV3IFBhcnRpY2xlU3lzdGVtKGJsb2NrUGFydGljbGVFbmdpbmUpKTtcblxuICAgICAgICB0aGlzLmVuZ2luZS5hZGRTeXN0ZW1Ub0VuZ2luZShuZXcgRml4ZWRWaWV3TWFuYWdlbWVudFN5c3RlbSh0aGlzLnJlbmRlclN5c3RlbS5jYW1lcmEpKTtcblxuICAgICAgICBsZXQgeCA9IDA7XG4gICAgICAgIGxldCB5ID0gMDtcbiAgICAgICAgbGV0IHBsYXllciA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGNvdW50ID0gMDsgY291bnQgPCAxOyBjb3VudCsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlja2VuID0gdGhpcy5lbmdpbmUuY3JlYXRlRW50aXR5KCk7XG4gICAgICAgICAgICBpZiAocGxheWVyPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyID0gY2hpY2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHggKz0gMjA7XG4gICAgICAgICAgICBpZiAoeCA+IDcwMCkge1xuICAgICAgICAgICAgICAgIHggPSAwO1xuICAgICAgICAgICAgICAgIHkgKz0gMjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjaGlja2VuQm9keSA9IG5ldyBCb2R5KE1hdGVyaWFsLk5PUk1BTCk7XG4gICAgICAgICAgICBjaGlja2VuQm9keS5zZXRCb3VuY2VzKDMpO1xuICAgICAgICAgICAgY2hpY2tlbkJvZHkubWF4U2NhbGFyVmVsb2NpdHkgPSAxMDAwO1xuXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5hZGRDb21wb25lbnRzVG9FbnRpdHkoY2hpY2tlbiwgW1xuICAgICAgICAgICAgICAgIG5ldyBQb3NpdGlvbigxMDAgKyB4LCAxMDAgKyB5KSxcbiAgICAgICAgICAgICAgICBuZXcgRXh0ZW50cygxMiwgMTIpLFxuICAgICAgICAgICAgICAgIG5ldyBHcmFwaGljcyhcImNoaWNrZW5cIiksXG4gICAgICAgICAgICAgICAgbmV3IEdyYXBoaWNzQW5pbWF0aW9uKFwiY2hpY2tlblwiLCBcIndhbGtcIiksXG4gICAgICAgICAgICAgICAgbmV3IFBoeXNpY3NDb2xsaXNpb24oZmFsc2UsIG5ldyBGaWx0ZXIoKSwgW10pLFxuICAgICAgICAgICAgICAgIG5ldyBQaHlzaWNzQm9keShjaGlja2VuQm9keSwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgbmV3IE1vdmVhYmxlKCksXG4gICAgICAgICAgICAgICAgbmV3IEFjdGl2ZSgpLFxuICAgICAgICAgICAgICAgIG5ldyBDb250cm9sbGFibGUoMTUwKSxcbiAgICAgICAgICAgICAgICAvLyBuZXcgUGFydGljbGVFbWl0dGVyKFtuZXcgRXhwbG9zaW9uKDEwLDEwMCldKVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3M6UG9zaXRpb24gPSB0aGlzLmVuZ2luZS5nZXRDb21wb25lbnRGb3JFbnRpdHkocGxheWVyLFBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW0uY2FtZXJhVGFyZ2V0ID0gcG9zLmNvb3JkczsgLy8gbmV3IFZlY3RvcjIoNDAwLCA0MDApO1xuXG4gICAgICAgIGNvbnN0IGRvb3JTd2l0Y2ggPSB0aGlzLmVuZ2luZS5jcmVhdGVFbnRpdHkoKTtcbiAgICAgICAgdGhpcy5lbmdpbmUuYWRkQ29tcG9uZW50c1RvRW50aXR5KGRvb3JTd2l0Y2gsIFtcbiAgICAgICAgICAgIHRoaXMubWFwUG9zaXRpb24oMTAuNSwgMTguNSksXG4gICAgICAgICAgICBuZXcgRXh0ZW50cyg4LCA4KSxcbiAgICAgICAgICAgIG5ldyBQaHlzaWNzQ29sbGlzaW9uKGZhbHNlLCBudWxsLCBbXSksXG4gICAgICAgICAgICBuZXcgRml4ZWQoKSxcbiAgICAgICAgICAgIG5ldyBBY3RpdmUoKSxcbiAgICAgICAgICAgIG5ldyBUaWxlR3JhcGhpY3MoXCJzd2l0Y2hPZmZcIiksXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMubG9vcC5zdGFydCgpO1xuICAgIH1cblxuICAgIG1hcFBvc2l0aW9uKHhUaWxlczogbnVtYmVyLCB5VGlsZXM6IG51bWJlcik6IFBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3NpdGlvbih4VGlsZXMgKiBUSUxFX1NJWkUsIHlUaWxlcyAqIFRJTEVfU0laRSk7XG4gICAgfVxuXG4gICAgcHJlVXBkYXRlKCkge1xuICAgICAgICB0aGlzLmlucHV0LlVwZGF0ZSgtdGhpcy5yZW5kZXJTeXN0ZW0uY2FtZXJhLnBvc2l0aW9uLngsIC10aGlzLnJlbmRlclN5c3RlbS5jYW1lcmEucG9zaXRpb24ueSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Rlc3QvR2FtZVRlc3RBLnRzIiwiaW1wb3J0IHsgRGlnaXRhbElucHV0IH0gZnJvbSBcIi4vdXRpbC9EaWdpdGFsSW5wdXRcIjtcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCIuL2Vjcy9FbmdpbmVcIjtcbmltcG9ydCB7IEFzc2V0TG9hZGVyIH0gZnJvbSBcIi4vdXRpbC9Bc3NldExvYWRlclwiO1xuaW1wb3J0IHsgR2FtZUxvb3AgfSBmcm9tIFwiLi91dGlsL0dhbWVMb29wXCI7XG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4vZ2VvbS9WZWN0b3IyXCI7XG5cbmV4cG9ydCBjbGFzcyBHbGF6ZUVuZ2luZSB7XG5cbiAgICBwdWJsaWMgYXNzZXRzOkFzc2V0TG9hZGVyO1xuICAgIHB1YmxpYyBsb29wOkdhbWVMb29wO1xuICAgIHB1YmxpYyBpbnB1dDpEaWdpdGFsSW5wdXQ7XG4gICAgcHVibGljIGVuZ2luZTpFbmdpbmU7XG5cbiAgICBwdWJsaWMgY2FudmFzOkhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoY2FudmFzOkhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmxvb3AgPSBuZXcgR2FtZUxvb3AoKTtcbiAgICAgICAgdGhpcy5sb29wLnVwZGF0ZUZ1bmMgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xuIFxuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IERpZ2l0YWxJbnB1dCgpO1xuICAgICAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5pbnB1dC5JbnB1dFRhcmdldCh3aW5kb3cuZG9jdW1lbnQsbmV3IFZlY3RvcjIocmVjdC5sZWZ0LHJlY3QudG9wKSk7XG5cbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgRW5naW5lKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRBc3NldHMoYXNzZXRMaXN0OkFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgdGhpcy5hc3NldHMgPSBuZXcgQXNzZXRMb2FkZXIoKTsgXG4gICAgICAgIHRoaXMuYXNzZXRzLmxvYWRlZC5hZGQodGhpcy5pbml0YWxpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuYXNzZXRzLlNldEltYWdlc1RvTG9hZChhc3NldExpc3QpO1xuICAgICAgICB0aGlzLmFzc2V0cy5Mb2FkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRhbGl6ZSgpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOm51bWJlcixub3c6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMucHJlVXBkYXRlKCk7XG4gICAgICAgIHRoaXMuZW5naW5lLnVwZGF0ZShkZWx0YSxub3cpO1xuICAgICAgICB0aGlzLnBvc3RVcGRhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlVXBkYXRlKCl7XG4gICAgfSAgICBcblxuICAgIHB1YmxpYyBwb3N0VXBkYXRlKCl7XG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL0dsYXplRW5naW5lLnRzIiwiaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi9nZW9tL1ZlY3RvcjJcIjtcblxuZXhwb3J0IGNsYXNzIERpZ2l0YWxJbnB1dCB7XG4gICAgcHVibGljIGtleU1hcDogQXJyYXk8bnVtYmVyPjtcbiAgICBwdWJsaWMgbW91c2VQb3NpdGlvbjogVmVjdG9yMjtcbiAgICBwdWJsaWMgbW91c2VQcmV2aW91c1Bvc2l0aW9uOiBWZWN0b3IyO1xuICAgIHB1YmxpYyBtb3VzZU9mZnNldDogVmVjdG9yMjtcbiAgICBwdWJsaWMgaW5wdXRDb3JyZWN0aW9uOiBWZWN0b3IyO1xuICAgIHByaXZhdGUgZnJhbWVSZWY6IG51bWJlcjtcbiAgICBwcml2YXRlIHRhcmdldDogRXZlbnRUYXJnZXQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5rZXlNYXAgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5rZXlNYXBbaV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW91c2VQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKCk7XG4gICAgICAgIHRoaXMubW91c2VQcmV2aW91c1Bvc2l0aW9uID0gbmV3IFZlY3RvcjIoKTtcbiAgICAgICAgdGhpcy5tb3VzZU9mZnNldCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgICAgIHRoaXMuZnJhbWVSZWYgPSAyO1xuICAgIH1cblxuICAgIHB1YmxpYyBJbnB1dFRhcmdldCh0YXJnZXQ6IEV2ZW50VGFyZ2V0LCBpbnB1dENvcnJlY3Rpb246IFZlY3RvcjIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLktleURvd24uYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuS2V5VXAuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLk1vdXNlRG93bi5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIC8vdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsTW91c2VEb3duLGZhbHNlKTtcblxuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5Nb3VzZVVwLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5Nb3VzZU1vdmUuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICAvLyB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihNb3VzZUV2ZW50LlJJR0hUX01PVVNFX0RPV04sIFJpZ2h0TW91c2VEb3duLCBmYWxzZSwgMCwgdHJ1ZSk7XG4gICAgICAgIC8vIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKE1vdXNlRXZlbnQuUklHSFRfTU9VU0VfVVAsIFJpZ2h0TW91c2VVcCwgZmFsc2UsIDAsIHRydWUpO1xuICAgICAgICB0aGlzLmlucHV0Q29ycmVjdGlvbiA9IGlucHV0Q29ycmVjdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgVmlld0NvcnJlY3RlZE1vdXNlUG9zaXRpb24oKSB7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLm1vdXNlUG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgcG9zLnBsdXNFcXVhbHModGhpcy5tb3VzZU9mZnNldCk7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgcHVibGljIFVwZGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm1vdXNlT2Zmc2V0LnggPSB4O1xuICAgICAgICB0aGlzLm1vdXNlT2Zmc2V0LnkgPSB5O1xuICAgICAgICB0aGlzLmZyYW1lUmVmKys7XG4gICAgICAgIC8vIG1vdXNlUHJldmlvdXNQb3NpdGlvbi54ID0gbW91c2VQb3NpdGlvbi54O1xuICAgICAgICAvLyBtb3VzZVByZXZpb3VzUG9zaXRpb24ueSA9IG1vdXNlUG9zaXRpb24ueTtcbiAgICAgICAgLy8gbW91c2VQb3NpdGlvbi54ID0gdGFyZ2V0Lm1vdXNlWCArIHNjcmVlbk9mZnNldC54O1xuICAgICAgICAvLyBtb3VzZVBvc2l0aW9uLnkgPSB0YXJnZXQubW91c2VZICsgc2NyZWVuT2Zmc2V0Lnk7XG4gICAgfVxuXG4gICAgcHVibGljIEtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMua2V5TWFwW2V2ZW50LmtleUNvZGVdID09IDApIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFwW2V2ZW50LmtleUNvZGVdID0gdGhpcy5mcmFtZVJlZjtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBLZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmtleU1hcFtldmVudC5rZXlDb2RlXSA9IDA7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIE1vdXNlRG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmtleU1hcFsyMDBdID0gdGhpcy5mcmFtZVJlZjtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgTW91c2VVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmtleU1hcFsyMDBdID0gMDtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMubW91c2VQcmV2aW91c1Bvc2l0aW9uLnggPSB0aGlzLm1vdXNlUG9zaXRpb24ueDtcbiAgICAgICAgdGhpcy5tb3VzZVByZXZpb3VzUG9zaXRpb24ueSA9IHRoaXMubW91c2VQb3NpdGlvbi55O1xuICAgICAgICB0aGlzLm1vdXNlUG9zaXRpb24ueCA9IGV2ZW50LmNsaWVudFggLSB0aGlzLmlucHV0Q29ycmVjdGlvbi54O1xuICAgICAgICB0aGlzLm1vdXNlUG9zaXRpb24ueSA9IGV2ZW50LmNsaWVudFkgLSB0aGlzLmlucHV0Q29ycmVjdGlvbi55O1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8vIHB1YmxpYyAgUmlnaHRNb3VzZURvd24oZXZlbnQgOiBNb3VzZUV2ZW50KSA6IFZvaWQge1xuICAgIC8vICAgICBrZXlNYXBbMjAxXSA9IGZyYW1lUmVmO1xuICAgIC8vIH1cblxuICAgIC8vIHB1YmxpYyAgUmlnaHRNb3VzZVVwKGV2ZW50IDogTW91c2VFdmVudCkgOiBWb2lkIHtcbiAgICAvLyAgICAga2V5TWFwWzIwMV0gPSAwO1xuICAgIC8vIH1cblxuICAgIHB1YmxpYyBQcmVzc2VkKGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlNYXBba2V5Q29kZV0gPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBKdXN0UHJlc3NlZChrZXlDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5TWFwW2tleUNvZGVdID09IHRoaXMuZnJhbWVSZWYgLSAxO1xuICAgIH1cblxuICAgIHB1YmxpYyBQcmVzc2VkRHVyYXRpb24oa2V5Q29kZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gdGhpcy5rZXlNYXBba2V5Q29kZV07XG4gICAgICAgIHJldHVybiBkdXJhdGlvbiA+IDAgPyB0aGlzLmZyYW1lUmVmIC0gZHVyYXRpb24gOiAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgUmVsZWFzZWQoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleU1hcFtrZXlDb2RlXSA9PSAwO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS91dGlsL0RpZ2l0YWxJbnB1dC50cyIsImltcG9ydCB7IElDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4vQ29tcG9uZW50XCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9FbnRpdHlcIjtcbmltcG9ydCB7IFBvb2wgfSBmcm9tIFwiLi4vdXRpbC9Qb29sXCI7XG5pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tIFwiLi9TeXN0ZW1cIjtcblxuZXhwb3J0IGNsYXNzIEVuZ2luZSB7XG4gICAgcHJpdmF0ZSBjb21wb25lbnRzOiBNYXA8c3RyaW5nLCBhbnlbXT47XG4gICAgcHJpdmF0ZSBlbnRpdGllczogRW50aXR5W107XG4gICAgcHJpdmF0ZSBzeXN0ZW1zOiBTeXN0ZW1bXTtcbiAgICBwcml2YXRlIGVudGl0eVBvb2w6IFBvb2w8RW50aXR5PjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc3lzdGVtcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmVudGl0eVBvb2wgPSBuZXcgUG9vbChpID0+IGkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYXBhY2l0eVRvRW5naW5lKGVudGl0eUNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlQb29sLmFkZENhcGFjaXR5KGVudGl0eUNvdW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKF8sIG5hbWU6IHN0cmluZykgPT5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQobmFtZSwgWy4uLnRoaXMuY29tcG9uZW50cy5nZXQobmFtZSksIC4uLmVtcHR5TnVsbEFycmF5KHRoaXMuZW50aXR5UG9vbC5jYXBhY2l0eSldKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlRW50aXR5KCk6IEVudGl0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eVBvb2wucmVzZXJ2ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRGb3JFbnRpdHkoZW50aXR5OkVudGl0eSwgY29tcG9uZW50OklDb21wb25lbnRGYWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBjb21wb25lbnQubmFtZTtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50cy5oYXMobmFtZSkpIHJldHVybiB0aGlzLmNvbXBvbmVudHMuZ2V0KG5hbWUpW2VudGl0eV07XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENvbXBvbmVudHNUb0VudGl0eShlbnRpdHk6IEVudGl0eSwgY29tcG9uZW50c1RvQWRkOiBhbnlbXSkge1xuICAgICAgICBjb21wb25lbnRzVG9BZGQuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50cy5oYXMobmFtZSkpIHRoaXMuY29tcG9uZW50cy5nZXQobmFtZSlbZW50aXR5XSA9IGNvbXBvbmVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWF0Y2hFbnRpdHkoZW50aXR5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQ29tcG9uZW50c0Zyb21FbnRpdHkoZW50aXR5OiBFbnRpdHksIGNvbXBvbmVudHNUb1JlbW92ZTogSUNvbXBvbmVudEZhY3RvcnlbXSkge1xuICAgICAgICBjb21wb25lbnRzVG9SZW1vdmUuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGNvbXBvbmVudC5uYW1lO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50cy5oYXMobmFtZSkpIHRoaXMuY29tcG9uZW50cy5nZXQobmFtZSlbZW50aXR5XSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1hdGNoRW50aXR5KGVudGl0eSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFN5c3RlbVRvRW5naW5lKHN5c3RlbTogU3lzdGVtKSB7XG4gICAgICAgIHN5c3RlbS5lbmdpbmUgPSB0aGlzO1xuICAgICAgICB0aGlzLnN5c3RlbXMucHVzaChzeXN0ZW0pO1xuICAgICAgICBzeXN0ZW0uY29tcG9uZW50cy5mb3JFYWNoKChuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KG5hbWUsIGVtcHR5TnVsbEFycmF5KHRoaXMuZW50aXR5UG9vbC5jYXBhY2l0eSkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlciwgdGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zeXN0ZW1zLmZvckVhY2goc3lzdGVtID0+IHN5c3RlbS51cGRhdGVTeXN0ZW0oZHQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hdGNoRW50aXR5KGVudGl0eTogRW50aXR5KSB7XG4gICAgICAgIHRoaXMuc3lzdGVtcy5mb3JFYWNoKFxuICAgICAgICAgICAgc3lzdGVtID0+XG4gICAgICAgICAgICAgICAgc3lzdGVtLmNvbXBvbmVudHMucmVkdWNlKFxuICAgICAgICAgICAgICAgICAgICAoc3VtLCBuYW1lKSA9PiAodGhpcy5jb21wb25lbnRzLmdldChuYW1lKVtlbnRpdHldID8gc3VtIC0gMSA6IHN1bSksXG4gICAgICAgICAgICAgICAgICAgIHN5c3RlbS5jb21wb25lbnRzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICApID09PSAwXG4gICAgICAgICAgICAgICAgICAgID8gc3lzdGVtLmFkZEVudGl0eShlbnRpdHksIHRoaXMuZW50aXR5Q29tcG9uZW50c0ZvclN5c3RlbShlbnRpdHksIHN5c3RlbSkpXG4gICAgICAgICAgICAgICAgICAgIDogc3lzdGVtLnJlbW92ZUVudGl0eShlbnRpdHkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW50aXR5Q29tcG9uZW50c0ZvclN5c3RlbShlbnRpdHk6IEVudGl0eSwgc3lzdGVtOiBTeXN0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHN5c3RlbS5jb21wb25lbnRzLm1hcChuYW1lID0+IHRoaXMuY29tcG9uZW50cy5nZXQobmFtZSlbZW50aXR5XSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRFbnRpdGllc1RvQ29tcG9uZW50TGlzdChjb21wb25lbnROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChjb21wb25lbnROYW1lLCBlbXB0eU51bGxBcnJheSh0aGlzLmVudGl0eVBvb2wuY2FwYWNpdHkpKTtcbiAgICB9XG59XG5cbi8vIGNvbnN0IHNldElkT25Db21wb25lbnQgPSAoY29tcG9uZW50OiBJQ29tcG9uZW50PGFueT4sIGlkOiBudW1iZXIpID0+IChjb21wb25lbnQuX2lkXyA9IGlkKTtcbmNvbnN0IGVtcHR5QXJyYXkgPSAoKSA9PiBbXTtcbmNvbnN0IGVtcHR5TnVsbEFycmF5ID0gY291bnQgPT4gQXJyYXkoY291bnQpLmZpbGwobnVsbCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZWNzL0VuZ2luZS50cyIsInR5cGUgcG9vbEZhY3Rvcnk8VD4gPSAoaW5kZXg6IG51bWJlcikgPT4gVDtcblxuZXhwb3J0IGNsYXNzIFBvb2w8VD4ge1xuXG4gICAgcHJpdmF0ZSBwb29sOiBUW107XG4gICAgcHJpdmF0ZSBmYWN0b3J5OiBwb29sRmFjdG9yeTxUPjtcbiAgICBwcml2YXRlIG5leHRBdmFpbGFibGVJbmRleDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoZmFjdG9yeTogcG9vbEZhY3Rvcnk8VD4pIHtcbiAgICAgICAgdGhpcy5wb29sID0gW107XG4gICAgICAgIHRoaXMuZmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgICAgIHRoaXMubmV4dEF2YWlsYWJsZUluZGV4ID0gLTE7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENhcGFjaXR5KGNhcGFjaXR5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wb29sID0gWy4uLmVudGl0eVJhbmdlKHRoaXMucG9vbC5sZW5ndGgsIGNhcGFjaXR5KSwgLi4udGhpcy5wb29sXTtcbiAgICAgICAgdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXggKz0gY2FwYWNpdHk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2VydmUoKTogVCB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnBvb2xbdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXhdO1xuICAgICAgICB0aGlzLnBvb2xbdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXhdID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXgtLTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgcHVibGljIGZyZWUoaXRlbTogVCkge1xuICAgICAgICB0aGlzLm5leHRBdmFpbGFibGVJbmRleCsrO1xuICAgICAgICB0aGlzLnBvb2xbdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXhdID0gaXRlbTtcbiAgICB9XG5cbiAgICBnZXQgY2FwYWNpdHkoKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5wb29sLmxlbmd0aDtcbiAgICB9XG59XG5cbmNvbnN0IGVtcHR5TnVsbEFycmF5ID0gY291bnQgPT4gQXJyYXkoY291bnQpLmZpbGwobnVsbCk7XG5jb25zdCByZXZlcnNlT3JkZXIgPSAoYSwgYikgPT4gYiAtIGE7XG5jb25zdCBlbnRpdHlSYW5nZSA9IChzdGFydCwgbGVuKSA9PlxuICAgIGVtcHR5TnVsbEFycmF5KGxlbilcbiAgICAgICAgLm1hcCgoXywgaSkgPT4gc3RhcnQgKyBpKVxuICAgICAgICAuc29ydChyZXZlcnNlT3JkZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3V0aWwvUG9vbC50cyIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi9zaWduYWxzL1NpZ25hbFwiO1xuXG5pbnRlcmZhY2UgSUxvYWRlciB7XG4gICAgSW5pdCh1cmw6IHN0cmluZyk6IHZvaWQ7XG4gICAgTG9hZCgpOiB2b2lkO1xuICAgIGdldEtleSgpOiBzdHJpbmc7XG4gICAgZ2V0VmFsdWUoKTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQXNzZXRMb2FkZXIge1xuICAgIHB1YmxpYyBhc3NldHM6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgcHVibGljIGxvYWRlcnM6IEFycmF5PElMb2FkZXI+O1xuICAgIHB1YmxpYyBjb21wbGV0ZUNvdW50OiBudW1iZXI7XG4gICAgcHVibGljIHJ1bm5pbmc6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgbG9hZGVkOiBTaWduYWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hc3NldHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubG9hZGVkID0gbmV3IFNpZ25hbCgpO1xuICAgICAgICB0aGlzLlJlc2V0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIFJlc2V0KCkge1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2FkZXJzID0gbmV3IEFycmF5PElMb2FkZXI+KCk7XG4gICAgfVxuXG4gICAgcHVibGljIFNldEltYWdlc1RvTG9hZCh1cmxzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIHVybHMuZm9yRWFjaCh1cmwgPT4gdGhpcy5BZGRBc3NldCh1cmwpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgQWRkQXNzZXQodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucnVubmluZyA9PSB0cnVlKSByZXR1cm47XG4gICAgICAgIHZhciBsb2FkZXIgPSB0aGlzLkxvYWRlckZhY3RvcnkodXJsKTtcbiAgICAgICAgbG9hZGVyLkluaXQodXJsKTtcbiAgICAgICAgdGhpcy5sb2FkZXJzLnB1c2gobG9hZGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIExvYWRlckZhY3RvcnkodXJsOiBzdHJpbmcpOiBJTG9hZGVyIHtcbiAgICAgICAgdmFyIGV4dGVudGlvbiA9IHVybC5zdWJzdHJpbmcodXJsLmxlbmd0aCAtIDMsIHVybC5sZW5ndGgpO1xuICAgICAgICBpZiAoZXh0ZW50aW9uID09IFwicG5nXCIpIHJldHVybiBuZXcgSW1hZ2VBc3NldCh0aGlzKTtcbiAgICAgICAgaWYgKGV4dGVudGlvbiA9PSBcInRteFwiIHx8IGV4dGVudGlvbiA9PSBcInhtbFwiIHx8IGV4dGVudGlvbiA9PSBcInNvblwiKSByZXR1cm4gbmV3IEJsb2JBc3NldCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIExvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcgPT0gdHJ1ZSB8fCB0aGlzLmxvYWRlcnMubGVuZ3RoID09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5jb21wbGV0ZUNvdW50ID0gdGhpcy5sb2FkZXJzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkZXJzLmZvckVhY2gobG9hZGVyID0+IGxvYWRlci5Mb2FkKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkxvYWQoaXRlbTogSUxvYWRlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbXBsZXRlQ291bnQtLTtcbiAgICAgICAgdGhpcy5hc3NldHMuc2V0KGl0ZW0uZ2V0S2V5KCksIGl0ZW0uZ2V0VmFsdWUoKSk7XG4gICAgICAgIGlmICh0aGlzLmNvbXBsZXRlQ291bnQgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQuZGlzcGF0Y2goKTtcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBJbWFnZUFzc2V0IGltcGxlbWVudHMgSUxvYWRlciB7XG4gICAgcHVibGljIG1ncjogQXNzZXRMb2FkZXI7XG4gICAgcHVibGljIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKG1ncjogQXNzZXRMb2FkZXIpIHtcbiAgICAgICAgdGhpcy5tZ3IgPSBtZ3I7XG4gICAgfVxuXG4gICAgcHVibGljIEluaXQodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSB0aGlzLm9uTG9hZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmltYWdlLmNyb3NzT3JpZ2luID0gXCJhbm9ueW1vdXNcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgTG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLnVybCArIFwiP2NiPVwiICsgRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UuY29tcGxldGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5vbkxvYWQobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Mb2FkKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tZ3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tZ3Iub25Mb2FkKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEtleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy51cmw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xuICAgIH1cbn1cblxuY2xhc3MgQmxvYkFzc2V0IGltcGxlbWVudHMgSUxvYWRlciB7XG4gICAgcHVibGljIG1ncjogQXNzZXRMb2FkZXI7XG4gICAgcHVibGljIHhocjogWE1MSHR0cFJlcXVlc3Q7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IobWdyOiBBc3NldExvYWRlcikge1xuICAgICAgICB0aGlzLm1nciA9IG1ncjtcbiAgICB9XG5cbiAgICBwdWJsaWMgSW5pdCh1cmw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdGhpcy54aHIucmVzcG9uc2VUeXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIHRoaXMueGhyLm9ubG9hZCA9IHRoaXMub25Mb2FkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMueGhyLm9wZW4oXCJHRVRcIiwgdGhpcy51cmwgKyBcIj9jYj1cIiArIERhdGUubm93KCksIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBMb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnhoci5zZW5kKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTG9hZChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubWdyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubWdyLm9uTG9hZCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRLZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy54aHIucmVzcG9uc2U7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3V0aWwvQXNzZXRMb2FkZXIudHMiLCJpbXBvcnQgeyBTaWduYWxCaW5kaW5nIH0gZnJvbSBcIi4vU2lnbmFsQmluZGluZ1wiO1xuXG5leHBvcnQgY2xhc3MgU2lnbmFsIHtcbiAgICBwcml2YXRlIF9iaW5kaW5nczogU2lnbmFsQmluZGluZ1tdID0gW107XG4gICAgcHJpdmF0ZSBfcHJldlBhcmFtcyA9IG51bGw7XG4gICAgcHVibGljIG1lbW9yaXplOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfc2hvdWxkUHJvcGFnYXRlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgYWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHB1YmxpYyB2YWxpZGF0ZUxpc3RlbmVyKGxpc3RlbmVyLCBmbk5hbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJsaXN0ZW5lciBpcyBhIHJlcXVpcmVkIHBhcmFtIG9mIHtmbn0oKSBhbmQgc2hvdWxkIGJlIGEgRnVuY3Rpb24uXCIucmVwbGFjZShcIntmbn1cIiwgZm5OYW1lKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWdpc3Rlckxpc3RlbmVyKGxpc3RlbmVyLCBpc09uY2U6IGJvb2xlYW4sIGxpc3RlbmVyQ29udGV4dCwgcHJpb3JpdHk6IG51bWJlcik6IFNpZ25hbEJpbmRpbmcge1xuICAgICAgICB2YXIgcHJldkluZGV4OiBudW1iZXIgPSB0aGlzLl9pbmRleE9mTGlzdGVuZXIobGlzdGVuZXIsIGxpc3RlbmVyQ29udGV4dCk7XG4gICAgICAgIHZhciBiaW5kaW5nOiBTaWduYWxCaW5kaW5nO1xuXG4gICAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBiaW5kaW5nID0gdGhpcy5fYmluZGluZ3NbcHJldkluZGV4XTtcblxuICAgICAgICAgICAgaWYgKGJpbmRpbmcuaXNPbmNlKCkgIT09IGlzT25jZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgXCJZb3UgY2Fubm90IGFkZFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChpc09uY2UgPyBcIlwiIDogXCJPbmNlXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKCkgdGhlbiBhZGRcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAoIWlzT25jZSA/IFwiXCIgOiBcIk9uY2VcIikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIoKSB0aGUgc2FtZSBsaXN0ZW5lciB3aXRob3V0IHJlbW92aW5nIHRoZSByZWxhdGlvbnNoaXAgZmlyc3QuXCIsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJpbmRpbmcgPSBuZXcgU2lnbmFsQmluZGluZyh0aGlzLCBsaXN0ZW5lciwgaXNPbmNlLCBsaXN0ZW5lckNvbnRleHQsIHByaW9yaXR5KTtcblxuICAgICAgICAgICAgdGhpcy5fYWRkQmluZGluZyhiaW5kaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1lbW9yaXplICYmIHRoaXMuX3ByZXZQYXJhbXMpIHtcbiAgICAgICAgICAgIGJpbmRpbmcuZXhlY3V0ZSh0aGlzLl9wcmV2UGFyYW1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiaW5kaW5nO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZEJpbmRpbmcoYmluZGluZzogU2lnbmFsQmluZGluZykge1xuICAgICAgICAvL3NpbXBsaWZpZWQgaW5zZXJ0aW9uIHNvcnRcblxuICAgICAgICB2YXIgbjogbnVtYmVyID0gdGhpcy5fYmluZGluZ3MubGVuZ3RoO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC0tbjtcbiAgICAgICAgfSB3aGlsZSAodGhpcy5fYmluZGluZ3Nbbl0gJiYgYmluZGluZy5wcmlvcml0eSA8PSB0aGlzLl9iaW5kaW5nc1tuXS5wcmlvcml0eSk7XG5cbiAgICAgICAgdGhpcy5fYmluZGluZ3Muc3BsaWNlKG4gKyAxLCAwLCBiaW5kaW5nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbmRleE9mTGlzdGVuZXIobGlzdGVuZXIsIGNvbnRleHQpOiBudW1iZXIge1xuICAgICAgICB2YXIgbjogbnVtYmVyID0gdGhpcy5fYmluZGluZ3MubGVuZ3RoO1xuICAgICAgICB2YXIgY3VyOiBTaWduYWxCaW5kaW5nO1xuXG4gICAgICAgIHdoaWxlIChuLS0pIHtcbiAgICAgICAgICAgIGN1ciA9IHRoaXMuX2JpbmRpbmdzW25dO1xuXG4gICAgICAgICAgICBpZiAoY3VyLmdldExpc3RlbmVyKCkgPT09IGxpc3RlbmVyICYmIGN1ci5jb250ZXh0ID09PSBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgcHVibGljIGhhcyhsaXN0ZW5lciwgY29udGV4dDogYW55ID0gbnVsbCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyLCBjb250ZXh0KSAhPT0gLTE7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZChsaXN0ZW5lciwgbGlzdGVuZXJDb250ZXh0OiBhbnkgPSBudWxsLCBwcmlvcml0eTogbnVtYmVyID0gMCk6IFNpZ25hbEJpbmRpbmcge1xuICAgICAgICB0aGlzLnZhbGlkYXRlTGlzdGVuZXIobGlzdGVuZXIsIFwiYWRkXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3Rlckxpc3RlbmVyKGxpc3RlbmVyLCBmYWxzZSwgbGlzdGVuZXJDb250ZXh0LCBwcmlvcml0eSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZE9uY2UobGlzdGVuZXIsIGxpc3RlbmVyQ29udGV4dDogYW55ID0gbnVsbCwgcHJpb3JpdHk6IG51bWJlciA9IDApOiBTaWduYWxCaW5kaW5nIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUxpc3RlbmVyKGxpc3RlbmVyLCBcImFkZE9uY2VcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdGVyTGlzdGVuZXIobGlzdGVuZXIsIHRydWUsIGxpc3RlbmVyQ29udGV4dCwgcHJpb3JpdHkpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUobGlzdGVuZXIsIGNvbnRleHQ6IGFueSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUxpc3RlbmVyKGxpc3RlbmVyLCBcInJlbW92ZVwiKTtcblxuICAgICAgICB2YXIgaTogbnVtYmVyID0gdGhpcy5faW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2JpbmRpbmdzW2ldLl9kZXN0cm95KCk7IC8vbm8gcmVhc29uIHRvIGEgU2lnbmFsQmluZGluZyBleGlzdCBpZiBpdCBpc24ndCBhdHRhY2hlZCB0byBhIHNpZ25hbFxuICAgICAgICAgICAgdGhpcy5fYmluZGluZ3Muc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVBbGwoKSB7XG4gICAgICAgIHZhciBuOiBudW1iZXIgPSB0aGlzLl9iaW5kaW5ncy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKG4tLSkge1xuICAgICAgICAgICAgdGhpcy5fYmluZGluZ3Nbbl0uX2Rlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2JpbmRpbmdzLmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE51bUxpc3RlbmVycygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ3MubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYWx0KCkge1xuICAgICAgICB0aGlzLl9zaG91bGRQcm9wYWdhdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzcGF0Y2goLi4ucGFyYW1zQXJyOiBhbnlbXSkge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbjogbnVtYmVyID0gdGhpcy5fYmluZGluZ3MubGVuZ3RoO1xuICAgICAgICB2YXIgYmluZGluZ3M6IFNpZ25hbEJpbmRpbmdbXTtcblxuICAgICAgICBpZiAodGhpcy5tZW1vcml6ZSkge1xuICAgICAgICAgICAgdGhpcy5fcHJldlBhcmFtcyA9IHBhcmFtc0FycjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbikge1xuICAgICAgICAgICAgLy9zaG91bGQgY29tZSBhZnRlciBtZW1vcml6ZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluZGluZ3MgPSB0aGlzLl9iaW5kaW5ncy5zbGljZSgwKTsgLy9jbG9uZSBhcnJheSBpbiBjYXNlIGFkZC9yZW1vdmUgaXRlbXMgZHVyaW5nIGRpc3BhdGNoXG5cbiAgICAgICAgdGhpcy5fc2hvdWxkUHJvcGFnYXRlID0gdHJ1ZTsgLy9pbiBjYXNlIGBoYWx0YCB3YXMgY2FsbGVkIGJlZm9yZSBkaXNwYXRjaCBvciBkdXJpbmcgdGhlIHByZXZpb3VzIGRpc3BhdGNoLlxuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfSB3aGlsZSAoYmluZGluZ3Nbbl0gJiYgdGhpcy5fc2hvdWxkUHJvcGFnYXRlICYmIGJpbmRpbmdzW25dLmV4ZWN1dGUocGFyYW1zQXJyKSAhPT0gZmFsc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmb3JnZXQoKSB7XG4gICAgICAgIHRoaXMuX3ByZXZQYXJhbXMgPSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9iaW5kaW5ncztcbiAgICAgICAgZGVsZXRlIHRoaXMuX3ByZXZQYXJhbXM7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIltTaWduYWwgYWN0aXZlOlwiICsgdGhpcy5hY3RpdmUgKyBcIiBudW1MaXN0ZW5lcnM6XCIgKyB0aGlzLmdldE51bUxpc3RlbmVycygpICsgXCJdXCI7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3NpZ25hbHMvU2lnbmFsLnRzIiwiaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4vU2lnbmFsXCI7XG5cbmV4cG9ydCBjbGFzcyBTaWduYWxCaW5kaW5nIHtcbiAgICBwcml2YXRlIF9saXN0ZW5lcjtcbiAgICBwcml2YXRlIF9pc09uY2U6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgY29udGV4dDtcbiAgICBwcml2YXRlIF9zaWduYWw6IFNpZ25hbDtcbiAgICBwdWJsaWMgcHJpb3JpdHk6IG51bWJlcjtcbiAgICBwdWJsaWMgYWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgcGFyYW1zID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHNpZ25hbDogU2lnbmFsLCBsaXN0ZW5lciwgaXNPbmNlOiBib29sZWFuLCBsaXN0ZW5lckNvbnRleHQsIHByaW9yaXR5OiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHRoaXMuX2lzT25jZSA9IGlzT25jZTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbGlzdGVuZXJDb250ZXh0O1xuICAgICAgICB0aGlzLl9zaWduYWwgPSBzaWduYWw7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBleGVjdXRlKHBhcmFtc0Fycj86IGFueVtdKSB7XG4gICAgICAgIHZhciBoYW5kbGVyUmV0dXJuO1xuICAgICAgICB2YXIgcGFyYW1zO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSAmJiAhIXRoaXMuX2xpc3RlbmVyKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB0aGlzLnBhcmFtcyA/IHRoaXMucGFyYW1zLmNvbmNhdChwYXJhbXNBcnIpIDogcGFyYW1zQXJyO1xuXG4gICAgICAgICAgICBoYW5kbGVyUmV0dXJuID0gdGhpcy5fbGlzdGVuZXIuYXBwbHkodGhpcy5jb250ZXh0LCBwYXJhbXMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5faXNPbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoYW5kbGVyUmV0dXJuO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXRhY2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQm91bmQoKSA/IHRoaXMuX3NpZ25hbC5yZW1vdmUodGhpcy5fbGlzdGVuZXIsIHRoaXMuY29udGV4dCkgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0JvdW5kKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9zaWduYWwgJiYgISF0aGlzLl9saXN0ZW5lcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNPbmNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNPbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMaXN0ZW5lcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTaWduYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduYWw7XG4gICAgfVxuXG4gICAgcHVibGljIF9kZXN0cm95KCkge1xuICAgICAgICBkZWxldGUgdGhpcy5fc2lnbmFsO1xuICAgICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXI7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvbnRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBcIltTaWduYWxCaW5kaW5nIGlzT25jZTpcIiArIHRoaXMuX2lzT25jZSArIFwiLCBpc0JvdW5kOlwiICsgdGhpcy5pc0JvdW5kKCkgKyBcIiwgYWN0aXZlOlwiICsgdGhpcy5hY3RpdmUgKyBcIl1cIlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9zaWduYWxzL1NpZ25hbEJpbmRpbmcudHMiLCJjb25zdCBNSU5fREVMVEE6IG51bWJlciA9IDEwMDAgLyA2MCArIDFlLTg7XG5cbmV4cG9ydCBjbGFzcyBHYW1lTG9vcCB7XG4gICAgcHVibGljIGlzUnVubmluZzogYm9vbGVhbjtcbiAgICBwdWJsaWMgYW5pbWF0aW9uU3RhcnRUaW1lc3RhbXA6IG51bWJlcjtcbiAgICBwdWJsaWMgcHJldkFuaW1hdGlvblRpbWU6IG51bWJlcjtcbiAgICBwdWJsaWMgZGVsdGE6IG51bWJlcjtcbiAgICBwcml2YXRlIHJhZklEOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgdXBkYXRlRnVuYzogKGR0OiBudW1iZXIsIHRpbWVzdGFtcDogbnVtYmVyKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKHRpbWVzdGFtcDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHRoaXMuZGVsdGEgPSB0aGlzLnByZXZBbmltYXRpb25UaW1lID09IDAgPyBNSU5fREVMVEEgOiB0aW1lc3RhbXAgLSB0aGlzLnByZXZBbmltYXRpb25UaW1lO1xuICAgICAgICB0aGlzLnByZXZBbmltYXRpb25UaW1lID0gdGltZXN0YW1wO1xuICAgICAgICBpZiAodGhpcy51cGRhdGVGdW5jICE9IG51bGwpXG4gICAgICAgICAgICAvL3RyYWNlKE1hdGgubWF4KGRlbHRhLE1JTl9ERUxUQSkpO1xuICAgICAgICAgICAgLy91cGRhdGVGdW5jKE1hdGgubWF4KGRlbHRhLE1JTl9ERUxUQSksTWF0aC5mbG9vcih0aW1lc3RhbXApKTtcbiAgICAgICAgICAgIC8vIHVwZGF0ZUZ1bmMoMTAwMC82MCxNYXRoLmZsb29yKHRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGdW5jKE1JTl9ERUxUQSwgTWF0aC5mbG9vcih0aW1lc3RhbXApKTtcbiAgICAgICAgdGhpcy5yYWZJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0KCkge1xuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcgPT0gdHJ1ZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucHJldkFuaW1hdGlvblRpbWUgPSAwO1xuICAgICAgICB0aGlzLnJhZklEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUnVubmluZyA9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yYWZJRCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3V0aWwvR2FtZUxvb3AudHMiLCJpbXBvcnQgeyBTeXN0ZW0gfSBmcm9tIFwiLi4vLi4vZWNzL1N5c3RlbVwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vY29yZS9jb21wb25lbnRzL1Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBHcmFwaGljcyB9IGZyb20gXCIuLi9jb21wb25lbnRzL0dyYXBoaWNzXCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi4vLi4vZWNzL0VudGl0eVwiO1xuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tIFwiLi4vZGlzcGxheWxpc3QvU3RhZ2VcIjtcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuLi9kaXNwbGF5bGlzdC9DYW1lcmFcIjtcbmltcG9ydCB7IFJlbmRlcmVyRW5naW5lIH0gZnJvbSBcIi4uL3JlbmRlci9SZW5kZXJFbmdpbmVcIjtcbmltcG9ydCB7IEFBQkIyIH0gZnJvbSBcIi4uLy4uL2dlb20vQUFCQjJcIjtcbmltcG9ydCB7IFRleHR1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uL3RleHR1cmUvVGV4dHVyZU1hbmFnZXJcIjtcbmltcG9ydCB7IERpc3BsYXlPYmplY3RDb250YWluZXIgfSBmcm9tIFwiLi4vZGlzcGxheWxpc3QvRGlzcGxheU9iamVjdENvbnRhaW5lclwiO1xuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi8uLi9nZW9tL1ZlY3RvcjJcIjtcbmltcG9ydCB7IEZyYW1lTGlzdE1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWUvRnJhbWVMaXN0TWFuYWdlclwiO1xuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uL2Rpc3BsYXlsaXN0L1Nwcml0ZVwiO1xuXG5leHBvcnQgY2xhc3MgR3JhcGhpY3NSZW5kZXJTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwdWJsaWMgc3RhZ2U6IFN0YWdlO1xuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXJFbmdpbmU7XG4gICAgcHVibGljIGNhbWVyYTogQ2FtZXJhO1xuICAgIHB1YmxpYyB0ZXh0dXJlTWFuYWdlcjogVGV4dHVyZU1hbmFnZXI7XG4gICAgcHVibGljIGl0ZW1Db250YWluZXI6IERpc3BsYXlPYmplY3RDb250YWluZXI7XG4gICAgcHVibGljIGZyYW1lTGlzdE1hbmFnZXI6IEZyYW1lTGlzdE1hbmFnZXI7XG4gICAgcHJpdmF0ZSBfY2FtZXJhVGFyZ2V0OiBWZWN0b3IyO1xuXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgY2FtZXJhUmFuZ2U6IEFBQkIyKSB7XG4gICAgICAgIHN1cGVyKFtQb3NpdGlvbiwgR3JhcGhpY3NdKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgU3RhZ2UoKTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG4gICAgICAgIHRoaXMuY2FtZXJhLndvcmxkRXh0ZW50c0FBQkIgPSBjYW1lcmFSYW5nZTtcbiAgICAgICAgdGhpcy5pbml0YWxpemUoKTtcbiAgICB9XG5cbiAgICBpbml0YWxpemUoKSB7XG4gICAgICAgIC8vIHRoaXMuY2FtZXJhLndvcmxkRXh0ZW50c0FBQkIuZXhwYW5kKC0xNik7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmNhbWVyYSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXJFbmdpbmUodGhpcy5zdGFnZSwgdGhpcy5jYW1lcmEsIHRoaXMuY2FudmFzLCA4MDAsIDY0MCk7XG4gICAgICAgIHRoaXMuY2FtZXJhLlJlc2l6ZSh0aGlzLnJlbmRlcmVyLndpZHRoLCB0aGlzLnJlbmRlcmVyLmhlaWdodCk7XG4gICAgICAgIHRoaXMudGV4dHVyZU1hbmFnZXIgPSBuZXcgVGV4dHVyZU1hbmFnZXIodGhpcy5yZW5kZXJlci5nbCk7XG4gICAgICAgIHRoaXMuZnJhbWVMaXN0TWFuYWdlciA9IG5ldyBGcmFtZUxpc3RNYW5hZ2VyKHRoaXMudGV4dHVyZU1hbmFnZXIpO1xuXG4gICAgICAgIHRoaXMuaXRlbUNvbnRhaW5lciA9IG5ldyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuaXRlbUNvbnRhaW5lci5pZCA9IFwiaXRlbUNvbnRhaW5lclwiO1xuICAgICAgICB0aGlzLmNhbWVyYS5hZGRDaGlsZCh0aGlzLml0ZW1Db250YWluZXIpO1xuICAgIH1cblxuICAgIG9uRW50aXR5QWRkZWQoZW50aXR5OiBFbnRpdHksIHBvc2l0aW9uOiBQb3NpdGlvbiwgZ3JhcGhpY3M6IEdyYXBoaWNzKSB7XG4gICAgICAgIGlmIChncmFwaGljcy5zcHJpdGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgZ3JhcGhpY3Muc3ByaXRlID0gbmV3IFNwcml0ZSgpO1xuICAgICAgICAgICAgZ3JhcGhpY3MuZnJhbWVMaXN0ID0gdGhpcy5mcmFtZUxpc3RNYW5hZ2VyLmdldEZyYW1lTGlzdChncmFwaGljcy5mcmFtZUxpc3RJZCk7XG4gICAgICAgICAgICBpZiAoZ3JhcGhpY3MuaW5pdGlhbEZyYW1lSWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGdyYXBoaWNzLnNldEZyYW1lKGdyYXBoaWNzLmZyYW1lTGlzdC5nZXRGcmFtZShncmFwaGljcy5pbml0aWFsRnJhbWVJZCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBncmFwaGljcy5zZXRGcmFtZShncmFwaGljcy5mcmFtZUxpc3QuZnJhbWVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdyYXBoaWNzLnNwcml0ZS5wb3NpdGlvbiA9IHBvc2l0aW9uLmNvb3JkcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW1Db250YWluZXIuYWRkQ2hpbGQoZ3JhcGhpY3Muc3ByaXRlKTtcbiAgICB9XG5cbiAgICBvbkVudGl0eVJlbW92ZWQoZW50aXR5OiBFbnRpdHksIHBvc2l0aW9uOiBQb3NpdGlvbiwgZ3JhcGhpY3M6IEdyYXBoaWNzKSB7XG4gICAgICAgIHRoaXMuaXRlbUNvbnRhaW5lci5yZW1vdmVDaGlsZChncmFwaGljcy5zcHJpdGUpO1xuICAgIH1cblxuICAgIHVwZGF0ZVN5c3RlbSgpIHtcbiAgICAgICAgdGhpcy5jYW1lcmEuRm9jdXModGhpcy5fY2FtZXJhVGFyZ2V0LngsIHRoaXMuX2NhbWVyYVRhcmdldC55KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5SZW5kZXIodGhpcy5jYW1lcmEudmlld1BvcnRBQUJCKTtcbiAgICB9XG5cbiAgICBzZXQgY2FtZXJhVGFyZ2V0KHRhcmdldDogVmVjdG9yMikge1xuICAgICAgICB0aGlzLl9jYW1lcmFUYXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL3N5c3RlbXMvR3JhcGhpY3NSZW5kZXJTeXN0ZW0udHMiLCJpbXBvcnQgeyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIH0gZnJvbSBcIi4vRGlzcGxheU9iamVjdENvbnRhaW5lclwiO1xuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vU3ByaXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBTdGFnZSBleHRlbmRzIERpc3BsYXlPYmplY3RDb250YWluZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaWQgPSBcIlN0YWdlXCI7XG4gICAgICAgIHRoaXMud29ybGRBbHBoYSA9IHRoaXMuYWxwaGE7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVRyYW5zZm9ybSgpIHsgXG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuaGVhZDtcbiAgICAgICAgd2hpbGUgKGNoaWxkIT1udWxsKSB7XG4gICAgICAgICAgICBjaGlsZC51cGRhdGVUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQubmV4dDtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9ncmFwaGljcy9kaXNwbGF5bGlzdC9TdGFnZS50cyIsImltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBDcmVhdGUgfSBmcm9tIFwiLi4vLi4vZ2VvbS9NYXRyaXgzXCI7XG5pbXBvcnQgeyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIH0gZnJvbSBcIi4vRGlzcGxheU9iamVjdENvbnRhaW5lclwiO1xuaW1wb3J0IHsgQUFCQjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9BQUJCMlwiO1xuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tIFwiLi9TdGFnZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBEaXNwbGF5T2JqZWN0IFxue1xuICAgIHB1YmxpYyBpZDpzdHJpbmc7XG4gICAgcHVibGljIHBvc2l0aW9uOlZlY3RvcjI7XG4gICAgcHVibGljIHNjYWxlOlZlY3RvcjI7XG4gICAgcHVibGljIHBpdm90OlZlY3RvcjI7XG4gICAgcHJpdmF0ZSBfcm90YXRpb246bnVtYmVyO1xuICAgIHByaXZhdGUgX3JvdGF0aW9uQ29tcG9uZW50czpWZWN0b3IyO1xuICAgIHB1YmxpYyBhbHBoYTpudW1iZXI7XG4gICAgcHJpdmF0ZSBfdmlzaWJsZTpib29sZWFuO1xuICAgIHB1YmxpYyByZW5kZXJhYmxlOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgYWFiYjpBQUJCMjtcblxuICAgIHB1YmxpYyBwYXJlbnQ6RGlzcGxheU9iamVjdENvbnRhaW5lcjtcblxuICAgIHB1YmxpYyB3b3JsZFRyYW5zZm9ybTpGbG9hdDMyQXJyYXk7XG4gICAgcHVibGljIHdvcmxkQWxwaGE6bnVtYmVyO1xuICAgIHB1YmxpYyBsb2NhbFRyYW5zZm9ybTpGbG9hdDMyQXJyYXk7XG5cbiAgICBwdWJsaWMgcHJldjpEaXNwbGF5T2JqZWN0O1xuICAgIHB1YmxpYyBuZXh0OkRpc3BsYXlPYmplY3Q7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IyKCk7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBuZXcgVmVjdG9yMigxLDEpO1xuICAgICAgICB0aGlzLnBpdm90ID0gbmV3IFZlY3RvcjIoKTtcbiAgICAgICAgdGhpcy5fcm90YXRpb25Db21wb25lbnRzID0gbmV3IFZlY3RvcjIoKTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hYWJiID0gbmV3IEFBQkIyKCk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybSA9IENyZWF0ZSgpO1xuICAgICAgICB0aGlzLmxvY2FsVHJhbnNmb3JtID0gQ3JlYXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHJvdGF0aW9uKCk6bnVtYmVyIHsgIFxuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgfVxuXG4gICAgc2V0IHJvdGF0aW9uKHY6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gdjtcbiAgICAgICAgdGhpcy5fcm90YXRpb25Db21wb25lbnRzLnggPSBNYXRoLmNvcyh0aGlzLl9yb3RhdGlvbik7XG4gICAgICAgIHRoaXMuX3JvdGF0aW9uQ29tcG9uZW50cy55ID0gTWF0aC5zaW4odGhpcy5fcm90YXRpb24pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZSgpOmJvb2xlYW4geyAgXG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdmlzaWJsZSh2OmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHY7XG4gICAgfVxuICAgIHB1YmxpYyBSb3VuZEZ1bmN0aW9uKHY6bnVtYmVyKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgLy8gcmV0dXJuIE1hdGgucm91bmQodik7XG4gICAgICAgIC8vIHJldHVybiBNYXRoLnJvdW5kKCB2ICogMTApIC8gMTA7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVRyYW5zZm9ybSgpIHtcbiAgICAgICAgLy9UT0RPIFJvdW5kaW5nIGF0IHRoZSBtb21lbnQuLi5cbiAgICAgICAgLy9wb3NpdGlvbi54ID0gTWF0aC5yb3VuZChwb3NpdGlvbi54KTtcbiAgICAgICAgLy9wb3NpdGlvbi55ID0gTWF0aC5yb3VuZChwb3NpdGlvbi55KTtcblxuICAgICAgICAvL0pTIGhhY2ssIG11Y2ggZmFzdGVyLi4uXG4gICAgICAgICAvLyB2YXIgcG9zaXRpb254Om51bWJlciA9IHVudHlwZWR7KDAuNSArIHBvc2l0aW9uLngpID4+IDA7fTtcbiAgICAgICAgIC8vIHZhciBwb3NpdGlvbnk6bnVtYmVyID0gdW50eXBlZHsoMC41ICsgcG9zaXRpb24ueSkgPj4gMDt9O1xuICAgICAgICAvL3Bvc2l0aW9ueCA9IGNhc3QgTWF0aC5yb3VuZCggcG9zaXRpb24ueCAqIDEwKSAvIDEwO1xuICAgICAgICAvL3Bvc2l0aW9ueSA9IGNhc3QgTWF0aC5yb3VuZCggcG9zaXRpb24ueSAqIDEwKSAvIDEwO1xuXG4gICAgICAgIC8vIHZhciBwb3NpdGlvbnggPSBwb3NpdGlvbi54O1xuICAgICAgICAvLyB2YXIgcG9zaXRpb255ID0gcG9zaXRpb24ueTtcblxuICAgICAgICB2YXIgcG9zaXRpb254Om51bWJlciA9IE1hdGguZmxvb3IodGhpcy5wb3NpdGlvbi54KTtcbiAgICAgICAgdmFyIHBvc2l0aW9ueTpudW1iZXIgPSBNYXRoLmZsb29yKHRoaXMucG9zaXRpb24ueSk7XG5cbiAgICAgICAgdmFyIHNpblIgPSB0aGlzLl9yb3RhdGlvbkNvbXBvbmVudHMueTsvL01hdGguc2luKHJvdGF0aW9uKTtcbiAgICAgICAgdmFyIGNvc1IgPSB0aGlzLl9yb3RhdGlvbkNvbXBvbmVudHMueDsvL01hdGguY29zKHJvdGF0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9jYWxUcmFuc2Zvcm1bMF0gPSAgY29zUiAqIHRoaXMuc2NhbGUueDtcbiAgICAgICAgdGhpcy5sb2NhbFRyYW5zZm9ybVsxXSA9IC1zaW5SICogdGhpcy5zY2FsZS55O1xuICAgICAgICB0aGlzLmxvY2FsVHJhbnNmb3JtWzNdID0gIHNpblIgKiB0aGlzLnNjYWxlLng7XG4gICAgICAgIHRoaXMubG9jYWxUcmFuc2Zvcm1bNF0gPSAgY29zUiAqIHRoaXMuc2NhbGUueTtcblxuICAgICAgICB2YXIgcHggPSB0aGlzLnBpdm90Lng7XG4gICAgICAgIHZhciBweSA9IHRoaXMucGl2b3QueTtcblxuICAgICAgICB2YXIgcGFyZW50VHJhbnNmb3JtID0gdGhpcy5wYXJlbnQud29ybGRUcmFuc2Zvcm07XG5cbiAgICAgICAgdmFyIGEwMCA9IHRoaXMubG9jYWxUcmFuc2Zvcm1bMF07XG4gICAgICAgIHZhciBhMDEgPSB0aGlzLmxvY2FsVHJhbnNmb3JtWzFdO1xuICAgICAgICB2YXIgYTAyID0gcG9zaXRpb254IC0gdGhpcy5sb2NhbFRyYW5zZm9ybVswXSAqIHB4IC0gcHkgKiB0aGlzLmxvY2FsVHJhbnNmb3JtWzFdO1xuICAgICAgICB2YXIgYTEwID0gdGhpcy5sb2NhbFRyYW5zZm9ybVszXTtcbiAgICAgICAgdmFyIGExMSA9IHRoaXMubG9jYWxUcmFuc2Zvcm1bNF07XG4gICAgICAgIHZhciBhMTIgPSBwb3NpdGlvbnkgLSB0aGlzLmxvY2FsVHJhbnNmb3JtWzRdICogcHkgLSBweCAqIHRoaXMubG9jYWxUcmFuc2Zvcm1bM107XG4gICAgICAgIHZhciBiMDAgPSBwYXJlbnRUcmFuc2Zvcm1bMF07XG4gICAgICAgIHZhciBiMDEgPSBwYXJlbnRUcmFuc2Zvcm1bMV07XG4gICAgICAgIHZhciBiMDIgPSBwYXJlbnRUcmFuc2Zvcm1bMl07XG4gICAgICAgIHZhciBiMTAgPSBwYXJlbnRUcmFuc2Zvcm1bM107XG4gICAgICAgIHZhciBiMTEgPSBwYXJlbnRUcmFuc2Zvcm1bNF07XG4gICAgICAgIHZhciBiMTIgPSBwYXJlbnRUcmFuc2Zvcm1bNV07XG5cbiAgICAgICAgdGhpcy5sb2NhbFRyYW5zZm9ybVsyXSA9IGEwMjtcbiAgICAgICAgdGhpcy5sb2NhbFRyYW5zZm9ybVs1XSA9IGExMjtcblxuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtWzBdID0gYjAwICogYTAwICsgYjAxICogYTEwO1xuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtWzFdID0gYjAwICogYTAxICsgYjAxICogYTExO1xuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtWzJdID0gYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyO1xuXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm1bM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTA7XG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm1bNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTE7XG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm1bNV0gPSBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTI7XG5cbiAgICAgICAgdGhpcy53b3JsZEFscGhhID0gdGhpcy5hbHBoYSp0aGlzLnBhcmVudC53b3JsZEFscGhhO1xuXG4gICAgfVxuXG4gICAgcHVibGljIGNhbGNFeHRlbnRzKCkge1xuICAgICAgICBcbiAgICB9XG5cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9ncmFwaGljcy9kaXNwbGF5bGlzdC9ESXNwbGF5T2JqZWN0LnRzIiwiZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZSgpOiBGbG9hdDMyQXJyYXkge1xuICAgIHJldHVybiBJZGVudGl0eShuZXcgRmxvYXQzMkFycmF5KDkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElkZW50aXR5KG1hdHJpeDogRmxvYXQzMkFycmF5KTogRmxvYXQzMkFycmF5IHtcbiAgICBtYXRyaXhbMF0gPSAxO1xuICAgIG1hdHJpeFsxXSA9IDA7XG4gICAgbWF0cml4WzJdID0gMDtcbiAgICBtYXRyaXhbM10gPSAwO1xuICAgIG1hdHJpeFs0XSA9IDE7XG4gICAgbWF0cml4WzVdID0gMDtcbiAgICBtYXRyaXhbNl0gPSAwO1xuICAgIG1hdHJpeFs3XSA9IDA7XG4gICAgbWF0cml4WzhdID0gMTtcbiAgICByZXR1cm4gbWF0cml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTXVsdGlwbHkobWF0OiBGbG9hdDMyQXJyYXksIG1hdDI6IEZsb2F0MzJBcnJheSwgZGVzdDogRmxvYXQzMkFycmF5KTogRmxvYXQzMkFycmF5IHtcbiAgICBpZiAoZGVzdCAhPSBudWxsKSBkZXN0ID0gbWF0O1xuXG4gICAgdmFyIGEwMCA9IG1hdFswXSxcbiAgICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgICBhMDIgPSBtYXRbMl0sXG4gICAgICAgIGExMCA9IG1hdFszXSxcbiAgICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgICBhMTIgPSBtYXRbNV0sXG4gICAgICAgIGEyMCA9IG1hdFs2XSxcbiAgICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgICBhMjIgPSBtYXRbOF0sXG4gICAgICAgIGIwMCA9IG1hdDJbMF0sXG4gICAgICAgIGIwMSA9IG1hdDJbMV0sXG4gICAgICAgIGIwMiA9IG1hdDJbMl0sXG4gICAgICAgIGIxMCA9IG1hdDJbM10sXG4gICAgICAgIGIxMSA9IG1hdDJbNF0sXG4gICAgICAgIGIxMiA9IG1hdDJbNV0sXG4gICAgICAgIGIyMCA9IG1hdDJbNl0sXG4gICAgICAgIGIyMSA9IG1hdDJbN10sXG4gICAgICAgIGIyMiA9IG1hdDJbOF07XG5cbiAgICBkZXN0WzBdID0gYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwO1xuICAgIGRlc3RbMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjE7XG4gICAgZGVzdFsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcblxuICAgIGRlc3RbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjA7XG4gICAgZGVzdFs0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMTtcbiAgICBkZXN0WzVdID0gYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyO1xuXG4gICAgZGVzdFs2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMDtcbiAgICBkZXN0WzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxO1xuICAgIGRlc3RbOF0gPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XG5cbiAgICByZXR1cm4gZGVzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENsb25lKG1hdDogRmxvYXQzMkFycmF5KTogRmxvYXQzMkFycmF5IHtcbiAgICB2YXIgbWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSg5KTtcbiAgICBtYXRyaXhbMF0gPSBtYXRbMF07XG4gICAgbWF0cml4WzFdID0gbWF0WzFdO1xuICAgIG1hdHJpeFsyXSA9IG1hdFsyXTtcbiAgICBtYXRyaXhbM10gPSBtYXRbM107XG4gICAgbWF0cml4WzRdID0gbWF0WzRdO1xuICAgIG1hdHJpeFs1XSA9IG1hdFs1XTtcbiAgICBtYXRyaXhbNl0gPSBtYXRbNl07XG4gICAgbWF0cml4WzddID0gbWF0WzddO1xuICAgIG1hdHJpeFs4XSA9IG1hdFs4XTtcblxuICAgIHJldHVybiBtYXRyaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc3Bvc2UobWF0OiBGbG9hdDMyQXJyYXksIGRlc3Q6IEZsb2F0MzJBcnJheSk6IEZsb2F0MzJBcnJheSB7XG4gICAgaWYgKGRlc3QgIT0gbnVsbCB8fCBtYXQgPT0gZGVzdCkge1xuICAgICAgICB2YXIgYTAxID0gbWF0WzFdLFxuICAgICAgICAgICAgYTAyID0gbWF0WzJdLFxuICAgICAgICAgICAgYTEyID0gbWF0WzVdO1xuICAgICAgICBtYXRbMV0gPSBtYXRbM107XG4gICAgICAgIG1hdFsyXSA9IG1hdFs2XTtcbiAgICAgICAgbWF0WzNdID0gYTAxO1xuICAgICAgICBtYXRbNV0gPSBtYXRbN107XG4gICAgICAgIG1hdFs2XSA9IGEwMjtcbiAgICAgICAgbWF0WzddID0gYTEyO1xuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH1cbiAgICBkZXN0WzBdID0gbWF0WzBdO1xuICAgIGRlc3RbMV0gPSBtYXRbM107XG4gICAgZGVzdFsyXSA9IG1hdFs2XTtcbiAgICBkZXN0WzNdID0gbWF0WzFdO1xuICAgIGRlc3RbNF0gPSBtYXRbNF07XG4gICAgZGVzdFs1XSA9IG1hdFs3XTtcbiAgICBkZXN0WzZdID0gbWF0WzJdO1xuICAgIGRlc3RbN10gPSBtYXRbNV07XG4gICAgZGVzdFs4XSA9IG1hdFs4XTtcblxuICAgIHJldHVybiBkZXN0O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dlb20vTWF0cml4My50cyIsImltcG9ydCB7IERpc3BsYXlPYmplY3RDb250YWluZXIgfSBmcm9tIFwiLi9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCI7XG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uLy4uL2dlb20vVmVjdG9yMlwiO1xuaW1wb3J0IHsgQUFCQjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9BQUJCMlwiO1xuXG5leHBvcnQgY2xhc3MgQ2FtZXJhIGV4dGVuZHMgRGlzcGxheU9iamVjdENvbnRhaW5lciB7XG4gICAgcHVibGljIHJlYWxQb3NpdGlvbjogVmVjdG9yMjtcbiAgICBwdWJsaWMgdmlld3BvcnRTaXplOiBWZWN0b3IyO1xuICAgIHB1YmxpYyBoYWxmVmlld3BvcnRTaXplOiBWZWN0b3IyO1xuICAgIHB1YmxpYyB2aWV3UG9ydEFBQkI6IEFBQkIyO1xuICAgIHB1YmxpYyB3b3JsZEV4dGVudHNBQUJCOiBBQUJCMjtcbiAgICBwcml2YXRlIGNhbWVyYUV4dGVudHNBQUJCOiBBQUJCMjtcbiAgICBwdWJsaWMgc2hha2U6IFZlY3RvcjI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pZCA9IFwiQ2FtZXJhXCI7XG4gICAgICAgIHRoaXMucmVhbFBvc2l0aW9uID0gbmV3IFZlY3RvcjIoKTtcbiAgICAgICAgdGhpcy52aWV3cG9ydFNpemUgPSBuZXcgVmVjdG9yMigpO1xuICAgICAgICB0aGlzLmhhbGZWaWV3cG9ydFNpemUgPSBuZXcgVmVjdG9yMigpO1xuICAgICAgICB0aGlzLnNoYWtlID0gbmV3IFZlY3RvcjIoKTtcbiAgICAgICAgdGhpcy52aWV3UG9ydEFBQkIgPSBuZXcgQUFCQjIoKTtcbiAgICAgICAgdGhpcy53b3JsZEV4dGVudHNBQUJCID0gbmV3IEFBQkIyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZih2OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIC8vIHJldHVybiBTdGQubnVtYmVyKHYpO1xuICAgIH1cblxuICAgIHB1YmxpYyBGb2N1cyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICAvL05lZWQgdG8gbW92ZSB0aGUgY2FtZXJhIGNvbnRhaW5lciB0aGUgb3Bvc2l0ZSB3YXkgdG8gdGhlIGFjdHVhbCBjb29yZHNcbiAgICAgICAgdGhpcy5yZWFsUG9zaXRpb24ueCA9IHg7XG4gICAgICAgIHRoaXMucmVhbFBvc2l0aW9uLnkgPSB5O1xuICAgICAgICAvLyByZWFsUG9zaXRpb24ucGx1c0VxdWFscyhzaGFrZSk7XG4gICAgICAgIC8vQ2xhbXAgcG9zaXRpb24gaW5zaWRlIHNocnVuayBjYW1lcmEgZXh0ZW50c1xuICAgICAgICB0aGlzLmNhbWVyYUV4dGVudHNBQUJCLmZpdFBvaW50KHRoaXMucmVhbFBvc2l0aW9uKTtcblxuICAgICAgICB2YXIgcG9zaXRpb254ID0gLXRoaXMucmVhbFBvc2l0aW9uLnggKyB0aGlzLmhhbGZWaWV3cG9ydFNpemUueDtcbiAgICAgICAgdmFyIHBvc2l0aW9ueSA9IC10aGlzLnJlYWxQb3NpdGlvbi55ICsgdGhpcy5oYWxmVmlld3BvcnRTaXplLnk7XG5cbiAgICAgICAgLy8gcG9zaXRpb24ueCA9IHBvc2l0aW9ueDtcbiAgICAgICAgaWYgKE1hdGguYWJzKHBvc2l0aW9ueCAtIHRoaXMucG9zaXRpb24ueCkgPiAyKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvbi54ICsgKHBvc2l0aW9ueCAtIHRoaXMucG9zaXRpb24ueCkgKiAwLjE7XG4gICAgICAgIGlmIChNYXRoLmFicyhwb3NpdGlvbnkgLSB0aGlzLnBvc2l0aW9uLnkpID4gMilcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb24ueSArIChwb3NpdGlvbnkgLSB0aGlzLnBvc2l0aW9uLnkpICogMC4xO1xuICAgICAgICAvLyBwb3NpdGlvbi55ID0gcG9zaXRpb255O1xuXG4gICAgICAgIHRoaXMucG9zaXRpb24ucGx1c0VxdWFscyh0aGlzLnNoYWtlKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gdGhpcy5yZih0aGlzLnBvc2l0aW9uLngpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLnJmKHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgIHRoaXMuc2hha2Uuc2V0VG8oMCwgMCk7XG4gICAgfVxuXG4gICAgcHVibGljIFJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLnZpZXdwb3J0U2l6ZS54ID0gd2lkdGg7XG4gICAgICAgIHRoaXMudmlld3BvcnRTaXplLnkgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuaGFsZlZpZXdwb3J0U2l6ZS54ID0gd2lkdGggLyAyO1xuICAgICAgICB0aGlzLmhhbGZWaWV3cG9ydFNpemUueSA9IGhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMudmlld1BvcnRBQUJCLmwgPSB0aGlzLnZpZXdQb3J0QUFCQi50ID0gMDtcbiAgICAgICAgdGhpcy52aWV3UG9ydEFBQkIuciA9IHRoaXMudmlld3BvcnRTaXplLng7XG4gICAgICAgIHRoaXMudmlld1BvcnRBQUJCLmIgPSB0aGlzLnZpZXdwb3J0U2l6ZS55O1xuICAgICAgICAvL0Nsb25lIHRoZSB3b3JsZCBzaXplLCB0aGVuIHNocmluayBpdCBhcm91bmQgdGhlIGNlbnRlciBieSB2aWV3cG9ydCBzaXplXG4gICAgICAgIHRoaXMuY2FtZXJhRXh0ZW50c0FBQkIgPSB0aGlzLndvcmxkRXh0ZW50c0FBQkIuY2xvbmUoKTtcbiAgICAgICAgdGhpcy5jYW1lcmFFeHRlbnRzQUFCQi5leHBhbmQyKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9ncmFwaGljcy9kaXNwbGF5bGlzdC9DYW1lcmEudHMiLCJpbXBvcnQgeyBTdGFnZSB9IGZyb20gXCIuLi9kaXNwbGF5bGlzdC9TdGFnZVwiO1xuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcIi4uL2Rpc3BsYXlsaXN0L0NhbWVyYVwiO1xuaW1wb3J0IHsgQUFCQjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9BQUJCMlwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZW5kZXJlciB7XG4gICAgSW5pdChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBjYW1lcmE6IENhbWVyYSk6IHZvaWQ7XG4gICAgUmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZDtcbiAgICBSZW5kZXIoY2xpcDogQUFCQjIpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJFbmdpbmUge1xuICAgIHB1YmxpYyBzdGFnZTogU3RhZ2U7XG4gICAgcHVibGljIGNhbWVyYTogQ2FtZXJhO1xuICAgIHB1YmxpYyB2aWV3OiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbiAgICBwdWJsaWMgY29udGV4dEF0dHJpYnV0ZXM6IFdlYkdMQ29udGV4dEF0dHJpYnV0ZXM7XG5cbiAgICBwcml2YXRlIGNvbnRleHRMb3N0OiBib29sZWFuO1xuXG4gICAgcHVibGljIHJlbmRlcmVyczogQXJyYXk8SVJlbmRlcmVyPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzdGFnZTogU3RhZ2UsXG4gICAgICAgIGNhbWVyYTogQ2FtZXJhLFxuICAgICAgICB2aWV3OiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICAgICAgd2lkdGg6IG51bWJlciA9IDgwMCxcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIgPSA2MDAsXG4gICAgICAgIHRyYW5zcGFyZW50OiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgIGFudGlhbGlhczogYm9vbGVhbiA9IGZhbHNlLFxuICAgICkge1xuICAgICAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLmNvbnRleHRMb3N0ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0QXR0cmlidXRlcyA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRleHRBdHRyaWJ1dGVzLmFscGhhID0gdHJhbnNwYXJlbnQ7XG4gICAgICAgIHRoaXMuY29udGV4dEF0dHJpYnV0ZXMuYW50aWFsaWFzID0gYW50aWFsaWFzO1xuICAgICAgICB0aGlzLmNvbnRleHRBdHRyaWJ1dGVzLnByZW11bHRpcGxpZWRBbHBoYSA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGV4dEF0dHJpYnV0ZXMuc3RlbmNpbCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXJzID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5Jbml0YWxpemVXZWJHbENvbnRleHQoKTtcbiAgICAgICAgdGhpcy5SZXNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIEluaXRhbGl6ZVdlYkdsQ29udGV4dCgpIHtcbiAgICAgICAgdGhpcy52aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJnbGNvbnRleHRsb3N0XCIsIHRoaXMub25Db250ZXh0TG9zdCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmdsY29udGV4dHJlc3RvcmVkXCIsIHRoaXMub25Db250ZXh0UmVzdG9yZWQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5nbCA9IHRoaXMudmlldy5nZXRDb250ZXh0KFwid2ViZ2xcIiwgdGhpcy5jb250ZXh0QXR0cmlidXRlcyk7XG5cbiAgICAgICAgdGhpcy5nbC5kaXNhYmxlKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5ERVBUSF9URVNUKTtcbiAgICAgICAgdGhpcy5nbC5kaXNhYmxlKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5DVUxMX0ZBQ0UpO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuQkxFTkQpO1xuICAgICAgICB0aGlzLmdsLmNvbG9yTWFzayh0cnVlLCB0cnVlLCB0cnVlLCB0aGlzLmNvbnRleHRBdHRyaWJ1dGVzLmFscGhhKTtcbiAgICAgICAgdGhpcy5nbC5jbGVhckNvbG9yKDAsIDAsIDAsIDEpO1xuICAgICAgICB0aGlzLmdsLmJsZW5kRnVuYyhXZWJHTFJlbmRlcmluZ0NvbnRleHQuU1JDX0FMUEhBLFdlYkdMUmVuZGVyaW5nQ29udGV4dC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgICAgICBpZiAoIXRoaXMuZ2wuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRcIikpIGNvbnNvbGUubG9nKFwiTmV3IGJyb3dzZXIgdGltZTogRmxvYXQgdGV4dHVyZXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgUmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudmlldy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnZpZXcuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLmdsLnNjaXNzb3IoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICAgIHB1YmxpYyBBZGRSZW5kZXJlcihyZW5kZXJlcjogSVJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLkluaXQodGhpcy5nbCwgdGhpcy5jYW1lcmEpO1xuICAgICAgICByZW5kZXJlci5SZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVycy5wdXNoKHJlbmRlcmVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgUmVuZGVyKGNsaXA6IEFBQkIyKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRMb3N0KSByZXR1cm47XG4gICAgICAgIC8vIHRoaXMuc3RhZ2UudXBkYXRlVHJhbnNmb3JtKCk7XG4gICAgICAgIC8vIHN0YWdlLlByZVJlbmRlcigpO1xuXG4gICAgICAgIC8vIGdsLnZpZXdwb3J0KDAsMCx3aWR0aCxoZWlnaHQpO1xuICAgICAgICAvLyBnbC5jb2xvck1hc2sodHJ1ZSx0cnVlLHRydWUsY29udGV4dEF0dHJpYnV0ZXMuYWxwaGEpO1xuICAgICAgICAvLyBnbC5iaW5kRnJhbWVidWZmZXIoUmVuZGVyaW5nQ29udGV4dC5GUkFNRUJVRkZFUixudWxsKTtcbiAgICAgICAgLy8gZ2wuY2xlYXJDb2xvcigwLjIsMC4yLDAuMiwxLjApO1xuICAgICAgICAvLyBnbC5jbGVhcihSZW5kZXJpbmdDb250ZXh0LkNPTE9SX0JVRkZFUl9CSVQpO1xuXG4gICAgICAgIC8vIHRoaXMuZ2wuY29sb3JNYXNrKHRydWUsIHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgICAvLyBnbC5jbGVhckNvbG9yKDEuMCwgMC4wLCAwLjAsIDEuMCk7XG4gICAgICAgIHRoaXMuZ2wuY2xlYXJDb2xvcigxNTkgLyAyNTUsIDE4OCAvIDI1NSwgMTk3IC8gMjU1LCAxLjApO1xuICAgICAgICB0aGlzLmdsLmNsZWFyKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICAgICAgdGhpcy5nbC5jb2xvck1hc2sodHJ1ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAvLzlGQkNDNVxuICAgICAgICAvLzE1OSAxODggMTk3IDFcblxuICAgICAgICAvLyB0aGlzLmdsLmJsZW5kRnVuYyhXZWJHTFJlbmRlcmluZ0NvbnRleHQuU1JDX0FMUEhBLFdlYkdMUmVuZGVyaW5nQ29udGV4dC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS1cIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXJzLmZvckVhY2gocmVuZGVyZXIgPT4ge1xuICAgICAgICAgICAgcmVuZGVyZXIuUmVuZGVyKGNsaXApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29udGV4dExvc3QoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuY29udGV4dExvc3QgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyhcIndlYkdMIENvbnRleHQgTG9zdFwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29udGV4dFJlc3RvcmVkKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmNvbnRleHRMb3N0ID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKFwid2ViR0wgQ29udGV4dCBSZXN0b3JlZFwiKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvcmVuZGVyL1JlbmRlckVuZ2luZS50cyIsImltcG9ydCB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcIi4vQmFzZVRleHR1cmVcIjtcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiLi9UZXh0dXJlXCI7XG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tIFwiLi4vLi4vZ2VvbS9SZWN0YW5nbGVcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dHVyZVBhY2tlckZyYW1lIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHc6IG51bWJlcjtcbiAgICBoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dHVyZVBhY2tlckl0ZW0ge1xuICAgIGZyYW1lOiBUZXh0dXJlUGFja2VyRnJhbWU7XG4gICAgcm90YXRlZDogYm9vbGVhbjtcbiAgICB0cmltbWVkOiBib29sZWFuO1xuICAgIHNwcml0ZVNvdXJjZVNpemU6IFRleHR1cmVQYWNrZXJGcmFtZTtcbiAgICBzb3VyY2VTaXplOiBhbnk7IC8ve1wid1wiOjE1LFwiaFwiOjExfVxuICAgIHBpdm90OiBhbnk7IC8ve1wieFwiOjAuNSxcInlcIjowLjV9XG59XG5cbmV4cG9ydCBjbGFzcyBUZXh0dXJlTWFuYWdlciB7XG4gICAgcHVibGljIGJhc2VUZXh0dXJlczogTWFwPFN0cmluZywgQmFzZVRleHR1cmU+O1xuICAgIHB1YmxpYyB0ZXh0dXJlczogTWFwPFN0cmluZywgVGV4dHVyZT47XG4gICAgcHVibGljIHRvdGFsOiBudW1iZXI7XG4gICAgcHVibGljIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG5cbiAgICBjb25zdHJ1Y3RvcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy5iYXNlVGV4dHVyZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudGV4dHVyZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgcHVibGljIEFkZFRleHR1cmUoaWQ6IFN0cmluZywgaW1hZ2U6IEltYWdlRGF0YSk6IEJhc2VUZXh0dXJlIHtcbiAgICAgICAgdmFyIGJhc2VUZXh0dXJlID0gQmFzZVRleHR1cmUuRnJvbUltYWdlKHRoaXMuZ2wsIGltYWdlKTtcbiAgICAgICAgLy8gYmFzZVRleHR1cmUuUmVnaXN0ZXJUZXh0dXJlKCk7XG4gICAgICAgIHRoaXMuYmFzZVRleHR1cmVzLnNldChpZCwgYmFzZVRleHR1cmUpO1xuICAgICAgICByZXR1cm4gYmFzZVRleHR1cmU7XG4gICAgfVxuXG4gICAgcHVibGljIFBhcnNlVGV4dHVyZVBhY2tlckpTT04odGV4dHVyZUNvbmZpZzogYW55LCBpZDogU3RyaW5nKSB7XG4gICAgICAgIGlmICghKHR5cGVvZiB0ZXh0dXJlQ29uZmlnID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJhc2VUZXh0dXJlID0gdGhpcy5iYXNlVGV4dHVyZXMuZ2V0KGlkKTtcblxuICAgICAgICB2YXIgdGV4dHVyZURhdGEgPSBKU09OLnBhcnNlKHRleHR1cmVDb25maWcpO1xuXG4gICAgICAgIC8vdmFyIGZpZWxkcyA9IFJlZmxlY3QuZmllbGRzKHRleHR1cmVEYXRhLmZyYW1lcyk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRleHR1cmVEYXRhLmZyYW1lcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIC8vIGZvciAobGV0IHByb3A6YW55IGluIHRleHR1cmVEYXRhLmZyYW1lcykge1xuXG4gICAgICAgICAgICB2YXIgZnJhbWUgPSB0ZXh0dXJlRGF0YS5mcmFtZXNbcHJvcF07IC8vIFJlZmxlY3QuZmllbGQodGV4dHVyZURhdGEuZnJhbWVzLCBwcm9wKTtcblxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlcy5zZXQoXG4gICAgICAgICAgICAgICAgcHJvcCxcbiAgICAgICAgICAgICAgICBuZXcgVGV4dHVyZShcbiAgICAgICAgICAgICAgICAgICAgYmFzZVRleHR1cmUsXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoZnJhbWUuZnJhbWUueCwgZnJhbWUuZnJhbWUueSwgZnJhbWUuZnJhbWUudywgZnJhbWUuZnJhbWUuaCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IyKGZyYW1lLnBpdm90LngsIGZyYW1lLnBpdm90LnkpLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgUGFyc2VUZXh0dXJlc0Zyb21UaWxlcyh0aWxlU2l6ZTogbnVtYmVyLCBpZDogU3RyaW5nKSB7fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL3RleHR1cmUvVGV4dHVyZU1hbmFnZXIudHMiLCJpbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uLy4uL2dlb20vVmVjdG9yMlwiO1xuaW1wb3J0IHsgVGV4dHVyZU1hbmFnZXIgfSBmcm9tIFwiLi4vdGV4dHVyZS9UZXh0dXJlTWFuYWdlclwiO1xuaW1wb3J0IHsgRnJhbWVMaXN0IH0gZnJvbSBcIi4vRnJhbWVMaXN0XCI7XG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gXCIuL0ZyYW1lXCI7XG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiLi4vYW5pbWF0aW9uL0FuaW1hdG9uXCI7XG5cbmludGVyZmFjZSBKU09ORnJhbWVzIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzY2FsZTogVmVjdG9yMjtcbn1cblxuaW50ZXJmYWNlIEpTT05BbmltYXRpb24ge1xuICAgIGZyYW1lczogQXJyYXk8bnVtYmVyPjtcbiAgICBmcHM6IG51bWJlcjtcbiAgICBsb29wZWQ6IGJvb2xlYW47XG4gICAgZmxpcFg6IGJvb2xlYW47XG4gICAgZmxpcFk6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBKU09ORnJhbWVMaXN0IHtcbiAgICBmcmFtZXM6IEFycmF5PEpTT05GcmFtZXM+O1xuICAgIGFuaW1hdGlvbnM6IE1hcDxzdHJpbmcsIEpTT05BbmltYXRpb24+O1xufVxuXG5pbnRlcmZhY2UgSlNPTkZyYW1lQ29uZmlnIHtcbiAgICBpdGVtczogTWFwPHN0cmluZywgSlNPTkZyYW1lTGlzdD47XG59XG5cbmV4cG9ydCBjbGFzcyBGcmFtZUxpc3RNYW5hZ2VyIHtcbiAgICBwdWJsaWMgdGV4dHVyZU1hbmFnZXI6IFRleHR1cmVNYW5hZ2VyO1xuICAgIHB1YmxpYyBmcmFtZUxpc3RzOiBNYXA8c3RyaW5nLCBGcmFtZUxpc3Q+O1xuXG4gICAgY29uc3RydWN0b3IodGV4dHVyZU1hbmFnZXI6IFRleHR1cmVNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMudGV4dHVyZU1hbmFnZXIgPSB0ZXh0dXJlTWFuYWdlcjtcbiAgICAgICAgdGhpcy5mcmFtZUxpc3RzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGcmFtZUxpc3QoaWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZUxpc3RzLmdldChpZCk7XG4gICAgfVxuXG4gICAgcHVibGljIFBhcnNlRnJhbWVMaXN0SlNPTihmcmFtZUxpc3RDb25maWc6IGFueSkge1xuICAgICAgICBpZiAodHlwZW9mIGZyYW1lTGlzdENvbmZpZyAhPT0gXCJzdHJpbmdcIikgcmV0dXJuO1xuXG4gICAgICAgIHZhciBmcmFtZUxpc3RDb25maWdEYXRhOiBKU09ORnJhbWVDb25maWcgPSBKU09OLnBhcnNlKGZyYW1lTGlzdENvbmZpZyk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoZnJhbWVMaXN0Q29uZmlnRGF0YSkuZm9yRWFjaChpdGVtTmFtZSA9PiB7XG4gICAgICAgICAgICB2YXIgZnJhbWVMaXN0ID0gbmV3IEZyYW1lTGlzdCgpO1xuICAgICAgICAgICAgdGhpcy5mcmFtZUxpc3RzLnNldChpdGVtTmFtZSwgZnJhbWVMaXN0KTtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lbGlzdEl0ZW06IEpTT05GcmFtZUxpc3QgPSBmcmFtZUxpc3RDb25maWdEYXRhW2l0ZW1OYW1lXTtcbiAgICAgICAgICAgIGlmIChmcmFtZWxpc3RJdGVtLmZyYW1lcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZnJhbWVsaXN0SXRlbS5mcmFtZXMuZm9yRWFjaChmcmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lTGlzdC5hZGRGcmFtZShuZXcgRnJhbWUoZnJhbWUuaWQsIHRoaXMudGV4dHVyZU1hbmFnZXIudGV4dHVyZXMuZ2V0KGZyYW1lLm5hbWUpLCBmcmFtZS5zY2FsZSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChmcmFtZWxpc3RJdGVtLmFuaW1hdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhmcmFtZWxpc3RJdGVtLmFuaW1hdGlvbnMpLmZvckVhY2goYW5pbWF0aW9uTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYW5pbWF0aW9uOiBKU09OQW5pbWF0aW9uID0gZnJhbWVsaXN0SXRlbS5hbmltYXRpb25zW2FuaW1hdGlvbk5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVMaXN0LmFkZEFuaW1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQW5pbWF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25OYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJhbWVzLm1hcChmcmFtZUluZGV4PT5mcmFtZUxpc3QuZnJhbWVzW2ZyYW1lSW5kZXhdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLmxvb3BlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZsaXBYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uZmxpcFksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL2ZyYW1lL0ZyYW1lTGlzdE1hbmFnZXIudHMiLCJpbXBvcnQgeyBGcmFtZSB9IGZyb20gXCIuL0ZyYW1lXCI7XG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiLi4vYW5pbWF0aW9uL0FuaW1hdG9uXCI7XG5cbmV4cG9ydCBjbGFzcyBGcmFtZUxpc3Qge1xuICAgIHB1YmxpYyBmcmFtZXM6IEFycmF5PEZyYW1lPjtcbiAgICBwdWJsaWMgZnJhbWVzSGFzaDogTWFwPHN0cmluZywgRnJhbWU+O1xuXG4gICAgcHVibGljIGFuaW1hdGlvbnNIYXNoOiBNYXA8c3RyaW5nLCBBbmltYXRpb24+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMuZnJhbWVzSGFzaCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zSGFzaCA9IG5ldyBNYXA8c3RyaW5nLCBBbmltYXRpb24+KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZEZyYW1lKGZyYW1lOiBGcmFtZSkge1xuICAgICAgICB0aGlzLmZyYW1lcy5wdXNoKGZyYW1lKTtcbiAgICAgICAgdGhpcy5mcmFtZXNIYXNoLnNldChmcmFtZS5uYW1lLCBmcmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZyYW1lKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVzSGFzaC5nZXQoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBbmltYXRpb24oYW5pbWF0aW9uOiBBbmltYXRpb24pIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zSGFzaC5zZXQoYW5pbWF0aW9uLm5hbWUsIGFuaW1hdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFuaW1hdGlvbihpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbnNIYXNoLmdldChpZCk7XG4gICAgfVxuXG4gICAgZ2V0IG51bUZyYW1lcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZnJhbWVzLmxlbmd0aDtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvZnJhbWUvRnJhbWVMaXN0LnRzIiwiaW1wb3J0IHsgVGV4dHVyZSB9IGZyb20gXCIuLi90ZXh0dXJlL1RleHR1cmVcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vZGlzcGxheWxpc3QvU3ByaXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBGcmFtZSB7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgdGV4dHVyZTogVGV4dHVyZTtcbiAgICBwdWJsaWMgc2NhbGU6IFZlY3RvcjI7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHRleHR1cmU6IFRleHR1cmUsIHNjYWxlOiBWZWN0b3IyKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlU3ByaXRlKHNwcml0ZTogU3ByaXRlLCBmbGlwWDogbnVtYmVyID0gMSwgZmxpcFk6IG51bWJlciA9IDEpIHtcbiAgICAgICAgc3ByaXRlLnRleHR1cmUgPSB0aGlzLnRleHR1cmU7XG4gICAgICAgIHNwcml0ZS5waXZvdC54ID0gc3ByaXRlLnRleHR1cmUuZnJhbWUud2lkdGggKiBzcHJpdGUudGV4dHVyZS5waXZvdC54O1xuICAgICAgICBzcHJpdGUucGl2b3QueSA9IChzcHJpdGUudGV4dHVyZS5mcmFtZS5oZWlnaHQgKyAyKSAqIHNwcml0ZS50ZXh0dXJlLnBpdm90Lnk7XG4gICAgICAgIHNwcml0ZS5zY2FsZS54ID0gdGhpcy5zY2FsZS54ICogZmxpcFg7XG4gICAgICAgIHNwcml0ZS5zY2FsZS55ID0gdGhpcy5zY2FsZS55ICogZmxpcFk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL2ZyYW1lL0ZyYW1lLnRzIiwiaW1wb3J0IHsgUmFuZG9tbnVtYmVyIH0gZnJvbSBcIi4uLy4uL3V0aWwvUmFuZG9tXCI7XG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gXCIuLi9mcmFtZS9GcmFtZVwiO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uIHtcblxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIGZyYW1lUmF0ZTpudW1iZXI7ICAgIFxuICAgIHB1YmxpYyBmcmFtZXM6IEFycmF5PEZyYW1lPjtcbiAgICBwdWJsaWMgbG9vcGVkOiBib29sZWFuO1xuICAgIHB1YmxpYyBmbGlwWDogYm9vbGVhbjtcbiAgICBwdWJsaWMgZmxpcFk6IGJvb2xlYW47XG4gICAgcHVibGljIG1zUGVyRnJhbWU6IG51bWJlcjtcbiAgICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICBmcmFtZXM6IEFycmF5PEZyYW1lPixcbiAgICAgICAgZnJhbWVSYXRlOiBudW1iZXIgPSAwLFxuICAgICAgICBsb29wZWQ6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICBmbGlwWDogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICBmbGlwWTogYm9vbGVhbiA9IGZhbHNlLFxuICAgICkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmZyYW1lUmF0ZSA9IGZyYW1lUmF0ZTtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XG4gICAgICAgIHRoaXMubG9vcGVkID0gbG9vcGVkO1xuICAgICAgICB0aGlzLmZsaXBYID0gZmxpcFg7XG4gICAgICAgIHRoaXMuZmxpcFkgPSBmbGlwWTtcbiAgICAgICAgdGhpcy5tc1BlckZyYW1lID0gMTAwMC90aGlzLmZyYW1lUmF0ZTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmZyYW1lcy5sZW5ndGg7IFxuICAgIH1cblxuICAgXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvYW5pbWF0aW9uL0FuaW1hdG9uLnRzIiwiaW1wb3J0IHsgSVJlbmRlcmVyIH0gZnJvbSBcIi4uL1JlbmRlckVuZ2luZVwiO1xuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tIFwiLi4vLi4vZGlzcGxheWxpc3QvU3RhZ2VcIjtcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuLi8uLi9kaXNwbGF5bGlzdC9DYW1lcmFcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBBQUJCMiB9IGZyb20gXCIuLi8uLi8uLi9nZW9tL0FBQkIyXCI7XG5pbXBvcnQgKiBhcyBXZWJHTFNoYWRlclV0aWxzIGZyb20gXCIuLi91dGlsL1dlYkdMU2hhZGVyVXRpbFwiO1xuaW1wb3J0IHsgU2hhZGVyV3JhcHBlciB9IGZyb20gXCIuLi91dGlsL1NoYWRlcldyYXBwZXJcIjtcbmltcG9ydCB7IFdlYkdMQmF0Y2ggfSBmcm9tIFwiLi9TcHJpdGVCYXRjaFwiO1xuXG5leHBvcnQgY2xhc3MgU3ByaXRlUmVuZGVyZXIgaW1wbGVtZW50cyBJUmVuZGVyZXIge1xuICAgIHB1YmxpYyBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuICAgIHB1YmxpYyBzdGFnZTogU3RhZ2U7XG4gICAgcHVibGljIGNhbWVyYTogQ2FtZXJhO1xuXG4gICAgcHVibGljIHByb2plY3Rpb246IFZlY3RvcjI7XG4gICAgcHVibGljIHNwcml0ZVNoYWRlcjogU2hhZGVyV3JhcHBlcjtcblxuICAgIHB1YmxpYyBzcHJpdGVCYXRjaDogV2ViR0xCYXRjaDtcblxuICAgIHB1YmxpYyBmaXJzdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgSW5pdChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBjYW1lcmE6IENhbWVyYSkge1xuICAgICAgICB0aGlzLmdsID0gZ2w7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLnByb2plY3Rpb24gPSBuZXcgVmVjdG9yMigpO1xuICAgICAgICB0aGlzLnNwcml0ZVNoYWRlciA9IG5ldyBTaGFkZXJXcmFwcGVyKFxuICAgICAgICAgICAgZ2wsXG4gICAgICAgICAgICBXZWJHTFNoYWRlclV0aWxzLkNvbXBpbGVQcm9ncmFtKFxuICAgICAgICAgICAgICAgIGdsLFxuICAgICAgICAgICAgICAgIFNwcml0ZVJlbmRlcmVyLlNQUklURV9WRVJURVhfU0hBREVSLFxuICAgICAgICAgICAgICAgIFNwcml0ZVJlbmRlcmVyLlNQUklURV9GUkFHTUVOVF9TSEFERVIsXG4gICAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNwcml0ZUJhdGNoID0gbmV3IFdlYkdMQmF0Y2goZ2wpO1xuICAgICAgICB0aGlzLnNwcml0ZUJhdGNoLlJlc2l6ZUJhdGNoKDEwMDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBSZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uLnggPSB3aWR0aCAvIDI7XG4gICAgICAgIHRoaXMucHJvamVjdGlvbi55ID0gaGVpZ2h0IC8gMjtcbiAgICB9XG5cbiAgICBwdWJsaWMgQWRkU3RhZ2Uoc3RhZ2U6IFN0YWdlKSB7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgUmVuZGVyKGNsaXA6IEFBQkIyKSB7XG4gICAgICAgIHRoaXMuc3RhZ2UudXBkYXRlVHJhbnNmb3JtKCk7XG5cbiAgICAgICAgdGhpcy5nbC51c2VQcm9ncmFtKHRoaXMuc3ByaXRlU2hhZGVyLnByb2dyYW0pO1xuICAgICAgICAvLyBpZiAoZmlyc3QpIHtcbiAgICAgICAgdGhpcy5nbC51bmlmb3JtMmYodGhpcy5zcHJpdGVTaGFkZXIudW5pZm9ybS5wcm9qZWN0aW9uVmVjdG9yLCB0aGlzLnByb2plY3Rpb24ueCwgdGhpcy5wcm9qZWN0aW9uLnkpO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3ByaXRlU2hhZGVyLmF0dHJpYnV0ZS5hVmVydGV4UG9zaXRpb24pO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc3ByaXRlU2hhZGVyLmF0dHJpYnV0ZS5hVGV4dHVyZUNvb3JkKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNwcml0ZVNoYWRlci5hdHRyaWJ1dGUuYUNvbG9yKTtcbiAgICAgICAgLy8gICAgIGZpcnN0PWZhbHNlO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU2hhZGVyLmF0dHJpYnV0ZS5hVmVydGV4UG9zaXRpb24sXG4gICAgICAgICAgICAyLFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkZMT0FULFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlU2hhZGVyLmF0dHJpYnV0ZS5hVGV4dHVyZUNvb3JkLFxuICAgICAgICAgICAgMixcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5GTE9BVCxcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICA4LFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zcHJpdGVTaGFkZXIuYXR0cmlidXRlLmFDb2xvciwgMSwgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkZMT0FULCBmYWxzZSwgMjAsIDE2KTtcblxuICAgICAgICB0aGlzLnNwcml0ZUJhdGNoLlJlbmRlcih0aGlzLnNwcml0ZVNoYWRlciwgdGhpcy5zdGFnZSwgdGhpcy5jYW1lcmEudmlld1BvcnRBQUJCKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgU1BSSVRFX1ZFUlRFWF9TSEFERVI6IHN0cmluZyA9IGBcbiAgICAgICAgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4gICAgICAgIGF0dHJpYnV0ZSB2ZWMyIGFWZXJ0ZXhQb3NpdGlvbjtcbiAgICAgICAgYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcbiAgICAgICAgYXR0cmlidXRlIGZsb2F0IGFDb2xvcjtcbiAgICAgICAgdW5pZm9ybSB2ZWMyIHByb2plY3Rpb25WZWN0b3I7XG4gICAgICAgIHZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xuICAgICAgICB2YXJ5aW5nIGZsb2F0IHZDb2xvcjtcbiAgICAgICAgdm9pZCBtYWluKHZvaWQpIHtcbiAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggYVZlcnRleFBvc2l0aW9uLnggLyBwcm9qZWN0aW9uVmVjdG9yLnggLTEuMCwgYVZlcnRleFBvc2l0aW9uLnkgLyAtcHJvamVjdGlvblZlY3Rvci55ICsgMS4wICwgMC4wLCAxLjApO1xuICAgICAgICAgICAgdlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XG4gICAgICAgICAgICB2Q29sb3IgPSBhQ29sb3I7XG4gICAgICAgIH1gO1xuXG4gICAgc3RhdGljIFNQUklURV9GUkFHTUVOVF9TSEFERVI6IHN0cmluZyA9IGBcbiAgICAgICAgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4gICAgICAgIHZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1xuICAgICAgICB2YXJ5aW5nIGZsb2F0IHZDb2xvcjtcbiAgICAgICAgdW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XG4gICAgICAgIHZvaWQgbWFpbih2b2lkKSB7XG4gICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsdlRleHR1cmVDb29yZCkgKiB2Q29sb3I7XG4gICAgICAgIH1gO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL3JlbmRlci9zcHJpdGUvU3ByaXRlUmVuZGVyZXIudHMiLCJpbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcIi4uLy4uL3RleHR1cmUvVGV4dHVyZVwiO1xuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4uLy4uL2Rpc3BsYXlsaXN0L1Nwcml0ZVwiO1xuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tIFwiLi4vLi4vZGlzcGxheWxpc3QvU3RhZ2VcIjtcbmltcG9ydCB7IEFBQkIyIH0gZnJvbSBcIi4uLy4uLy4uL2dlb20vQUFCQjJcIjtcbmltcG9ydCB7IERpc3BsYXlPYmplY3RDb250YWluZXIgfSBmcm9tIFwiLi4vLi4vZGlzcGxheWxpc3QvRGlzcGxheU9iamVjdENvbnRhaW5lclwiO1xuaW1wb3J0IHsgRGlzcGxheU9iamVjdCB9IGZyb20gXCIuLi8uLi9kaXNwbGF5bGlzdC9ESXNwbGF5T2JqZWN0XCI7XG5pbXBvcnQgeyBTaGFkZXJXcmFwcGVyIH0gZnJvbSBcIi4uL3V0aWwvU2hhZGVyV3JhcHBlclwiO1xuXG5leHBvcnQgY2xhc3MgV2ViR0xCYXRjaCB7XG4gICAgcHVibGljIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG5cbiAgICBwdWJsaWMgc2l6ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBkeW5hbWljU2l6ZTogbnVtYmVyO1xuXG4gICAgcHVibGljIGluZGV4QnVmZmVyOiBXZWJHTEJ1ZmZlcjtcbiAgICBwdWJsaWMgaW5kaWNlczogVWludDE2QXJyYXk7XG5cbiAgICBwdWJsaWMgZGF0YUJ1ZmZlcjogV2ViR0xCdWZmZXI7XG4gICAgcHVibGljIGRhdGE6IEZsb2F0MzJBcnJheTtcblxuICAgIHB1YmxpYyBibGVuZE1vZGU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xuICAgICAgICB0aGlzLnNpemUgPSAxO1xuICAgICAgICB0aGlzLmluZGV4QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgIHRoaXMuZGF0YUJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmJsZW5kTW9kZSA9IDA7XG4gICAgICAgIHRoaXMuZHluYW1pY1NpemUgPSAxO1xuICAgIH1cblxuICAgIHB1YmxpYyBDbGVhbigpIHt9XG5cbiAgICBwdWJsaWMgUmVzaXplQmF0Y2goc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuZHluYW1pY1NpemUgPSBzaXplO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5keW5hbWljU2l6ZSAqIDIwKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5BUlJBWV9CVUZGRVIsIHRoaXMuZGF0YUJ1ZmZlcik7XG4gICAgICAgIHRoaXMuZ2wuYnVmZmVyRGF0YShXZWJHTFJlbmRlcmluZ0NvbnRleHQuQVJSQVlfQlVGRkVSLCB0aGlzLmRhdGEsIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5EWU5BTUlDX0RSQVcpO1xuXG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IG5ldyBVaW50MTZBcnJheSh0aGlzLmR5bmFtaWNTaXplICogNik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmR5bmFtaWNTaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4MiA9IGkgKiA2O1xuICAgICAgICAgICAgY29uc3QgaW5kZXgzID0gaSAqIDQ7XG4gICAgICAgICAgICB0aGlzLmluZGljZXNbaW5kZXgyICsgMF0gPSBpbmRleDMgKyAwO1xuICAgICAgICAgICAgdGhpcy5pbmRpY2VzW2luZGV4MiArIDFdID0gaW5kZXgzICsgMTtcbiAgICAgICAgICAgIHRoaXMuaW5kaWNlc1tpbmRleDIgKyAyXSA9IGluZGV4MyArIDI7XG4gICAgICAgICAgICB0aGlzLmluZGljZXNbaW5kZXgyICsgM10gPSBpbmRleDMgKyAwO1xuICAgICAgICAgICAgdGhpcy5pbmRpY2VzW2luZGV4MiArIDRdID0gaW5kZXgzICsgMjtcbiAgICAgICAgICAgIHRoaXMuaW5kaWNlc1tpbmRleDIgKyA1XSA9IGluZGV4MyArIDM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIoV2ViR0xSZW5kZXJpbmdDb250ZXh0LkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmluZGV4QnVmZmVyKTtcbiAgICAgICAgdGhpcy5nbC5idWZmZXJEYXRhKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5pbmRpY2VzLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuU1RBVElDX0RSQVcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBGbHVzaChzaGFkZXI6IFNoYWRlcldyYXBwZXIsIHRleHR1cmU6IFRleHR1cmUsIHNpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIoV2ViR0xSZW5kZXJpbmdDb250ZXh0LkFSUkFZX0JVRkZFUiwgdGhpcy5kYXRhQnVmZmVyKTtcbiAgICAgICAgLy8gdGhpcy5nbC5idWZmZXJEYXRhKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5BUlJBWV9CVUZGRVIsZGF0YSxXZWJHTFJlbmRlcmluZ0NvbnRleHQuU1RBVElDX0RSQVcpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlclN1YkRhdGEoV2ViR0xSZW5kZXJpbmdDb250ZXh0LkFSUkFZX0JVRkZFUiwgMCwgdGhpcy5kYXRhKTtcbiAgICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoYWRlci5hdHRyaWJ1dGUuYVZlcnRleFBvc2l0aW9uLCAyLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRkxPQVQsIGZhbHNlLCAyMCwgMCk7XG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcihzaGFkZXIuYXR0cmlidXRlLmFUZXh0dXJlQ29vcmQsIDIsIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5GTE9BVCwgZmFsc2UsIDIwLCA4KTtcbiAgICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHNoYWRlci5hdHRyaWJ1dGUuYUNvbG9yLCAxLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRkxPQVQsIGZhbHNlLCAyMCwgMTYpO1xuICAgICAgICB0aGlzLmdsLmFjdGl2ZVRleHR1cmUoV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkUwKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5UUklBTkdMRVMsIHNpemUgKiA2LCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVU5TSUdORURfU0hPUlQsIDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBBZGRTcHJpdGVUb0JhdGNoKHNwcml0ZTogU3ByaXRlLCBpbmRleFJ1bjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaW5kZXhSdW4gKiAyMDtcbiAgICAgICAgY29uc3QgZnJhbWUgPSBzcHJpdGUudGV4dHVyZS5mcmFtZTtcbiAgICAgICAgY29uc3QgdHcgPSBzcHJpdGUudGV4dHVyZS5iYXNlVGV4dHVyZS53aWR0aDtcbiAgICAgICAgY29uc3QgdGggPSBzcHJpdGUudGV4dHVyZS5iYXNlVGV4dHVyZS5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IHV2cyA9IHNwcml0ZS50ZXh0dXJlLnV2cztcbiAgICAgICAgLy8wXG4gICAgICAgIC8vVmVydHNcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgMF0gPSBzcHJpdGUudHJhbnNmb3JtZWRWZXJ0c1swXTtcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgMV0gPSBzcHJpdGUudHJhbnNmb3JtZWRWZXJ0c1sxXTtcbiAgICAgICAgLy9VVlxuICAgICAgICB0aGlzLmRhdGFbaW5kZXggKyAyXSA9IHV2c1swXTsgLy9mcmFtZS54IC8gdHc7XG4gICAgICAgIHRoaXMuZGF0YVtpbmRleCArIDNdID0gdXZzWzFdOyAvL2ZyYW1lLnkgLyB0aDtcbiAgICAgICAgLy9Db2xvdXJcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgNF0gPSBzcHJpdGUud29ybGRBbHBoYTtcblxuICAgICAgICAvLzFcbiAgICAgICAgLy9WZXJ0c1xuICAgICAgICB0aGlzLmRhdGFbaW5kZXggKyA1XSA9IHNwcml0ZS50cmFuc2Zvcm1lZFZlcnRzWzJdO1xuICAgICAgICB0aGlzLmRhdGFbaW5kZXggKyA2XSA9IHNwcml0ZS50cmFuc2Zvcm1lZFZlcnRzWzNdO1xuICAgICAgICAvL1VWXG4gICAgICAgIHRoaXMuZGF0YVtpbmRleCArIDddID0gdXZzWzJdOyAvLyhmcmFtZS54ICsgZnJhbWUud2lkdGgpIC8gdHc7XG4gICAgICAgIHRoaXMuZGF0YVtpbmRleCArIDhdID0gdXZzWzNdOyAvL2ZyYW1lLnkgLyB0aDtcbiAgICAgICAgLy9Db2xvdXJcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgOV0gPSBzcHJpdGUud29ybGRBbHBoYTtcblxuICAgICAgICAvLzJcbiAgICAgICAgLy9WZXJ0c1xuICAgICAgICB0aGlzLmRhdGFbaW5kZXggKyAxMF0gPSBzcHJpdGUudHJhbnNmb3JtZWRWZXJ0c1s0XTtcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgMTFdID0gc3ByaXRlLnRyYW5zZm9ybWVkVmVydHNbNV07XG4gICAgICAgIC8vVVZcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgMTJdID0gdXZzWzRdOyAvLyhmcmFtZS54ICsgZnJhbWUud2lkdGgpIC8gdHc7XG4gICAgICAgIHRoaXMuZGF0YVtpbmRleCArIDEzXSA9IHV2c1s1XTsgLy8oZnJhbWUueSArIGZyYW1lLmhlaWdodCkgLyB0aDtcbiAgICAgICAgLy9Db2xvdXJcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgMTRdID0gc3ByaXRlLndvcmxkQWxwaGE7XG5cbiAgICAgICAgLy8zXG4gICAgICAgIC8vVmVydHNcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgMTVdID0gc3ByaXRlLnRyYW5zZm9ybWVkVmVydHNbNl07XG4gICAgICAgIHRoaXMuZGF0YVtpbmRleCArIDE2XSA9IHNwcml0ZS50cmFuc2Zvcm1lZFZlcnRzWzddO1xuICAgICAgICAvL1VWXG4gICAgICAgIHRoaXMuZGF0YVtpbmRleCArIDE3XSA9IHV2c1s2XTsgLy9mcmFtZS54IC8gdHc7XG4gICAgICAgIHRoaXMuZGF0YVtpbmRleCArIDE4XSA9IHV2c1s3XTsgLy8oZnJhbWUueSArIGZyYW1lLmhlaWdodCkgLyB0aDtcbiAgICAgICAgLy9Db2xvdXJcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgMTldID0gc3ByaXRlLndvcmxkQWxwaGE7XG4gICAgfVxuXG4gICAgcHVibGljIFJlbmRlcihzaGFkZXI6IFNoYWRlcldyYXBwZXIsIHN0YWdlOiBTdGFnZSwgY2xpcDogQUFCQjIpIHtcbiAgICAgICAgLy8gdGhpcy5nbC51c2VQcm9ncmFtKHNoYWRlci5wcm9ncmFtKTtcblxuICAgICAgICB2YXIgbm9kZTogRGlzcGxheU9iamVjdENvbnRhaW5lcjtcbiAgICAgICAgdmFyIHN0YWNrOiBBcnJheTxEaXNwbGF5T2JqZWN0Q29udGFpbmVyPjtcbiAgICAgICAgdmFyIHRvcDogbnVtYmVyO1xuXG4gICAgICAgIG5vZGUgPSBzdGFnZTtcbiAgICAgICAgc3RhY2sgPSBuZXcgQXJyYXk8RGlzcGxheU9iamVjdENvbnRhaW5lcj4oKTtcblxuICAgICAgICBzdGFja1swXSA9IG5vZGU7XG4gICAgICAgIHRvcCA9IDE7XG5cbiAgICAgICAgdmFyIGluZGV4UnVuID0gMDtcbiAgICAgICAgdmFyIGN1cnJlbnRUZXh0dXJlID0gbnVsbDtcblxuICAgICAgICB3aGlsZSAodG9wID4gMCkge1xuICAgICAgICAgICAgdmFyIHRoaXNOb2RlID0gc3RhY2tbLS10b3BdO1xuICAgICAgICAgICAgLy9JZiB0aGVyZSBpcyBhbiBhZGphY2VudCBub2RlLCBwdXNoIGl0IHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgaWYgKHRoaXNOb2RlLm5leHQgIT0gbnVsbCkgc3RhY2tbdG9wKytdID0gdGhpc05vZGUubmV4dCBhcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyOyAvL0JpZyBhc3N1bXB0aW9uIGlzIG9ubHkgRGlzcGxheUxpc3RDb250YWluZXJzLCB3aGljaCBpdCBpcyBmb3Igbm93LlxuICAgICAgICAgICAgLy9JZiB0aGVyZSBpcyBhIGNoaWxkIGxpc3QsIHB1c2ggdGhlIGhlYWQgKHRoaXMgd2lsbCBnZXQgcHJvY2Vzc2VkIGZpcnN0KVxuICAgICAgICAgICAgaWYgKHRoaXNOb2RlLmhlYWQgIT0gbnVsbCkgc3RhY2tbdG9wKytdID0gdGhpc05vZGUuaGVhZCBhcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyOyAvL1NhbWUgYXNzdW1wdGlvbi5cbiAgICAgICAgICAgIC8vcmV0dXJuIHRoZSByZXN1bHRcblxuICAgICAgICAgICAgaWYgKHRoaXNOb2RlLnZpc2libGUgJiYgdGhpc05vZGUucmVuZGVyYWJsZSkge1xuICAgICAgICAgICAgICAgIHZhciBzcHJpdGU6IFNwcml0ZSA9IHRoaXNOb2RlIGFzIFNwcml0ZTtcblxuICAgICAgICAgICAgICAgIGlmIChzcHJpdGUudGV4dHVyZS5iYXNlVGV4dHVyZS50ZXh0dXJlICE9IGN1cnJlbnRUZXh0dXJlIHx8IGluZGV4UnVuID09IHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkZsdXNoKHNoYWRlciwgY3VycmVudFRleHR1cmUsIGluZGV4UnVuKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhSdW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dHVyZSA9IHNwcml0ZS50ZXh0dXJlLmJhc2VUZXh0dXJlLnRleHR1cmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjbGlwID09IG51bGwgfHwgc3ByaXRlLmFhYmIuaW50ZXJzZWN0KGNsaXApKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWRkU3ByaXRlVG9CYXRjaChzcHJpdGUsIGluZGV4UnVuKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhSdW4rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXhSdW4gPiAwKSB0aGlzLkZsdXNoKHNoYWRlciwgY3VycmVudFRleHR1cmUsIGluZGV4UnVuKTtcbiAgICB9XG4gICAgXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvcmVuZGVyL3Nwcml0ZS9TcHJpdGVCYXRjaC50cyIsImltcG9ydCB7IFR5cGVkQXJyYXkyRCB9IGZyb20gXCIuLi9kcy9UeXBlZEFycmF5MkRcIjtcbmltcG9ydCB7IEJ5dGVzMkQgfSBmcm9tIFwiLi4vZHMvQnl0ZXMyRFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRNWE1hcCB7XG4gICAgYmFja2dyb3VuZGNvbG9yOiBzdHJpbmc7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgaW5maW5pdGU6IGJvb2xlYW47XG4gICAgbGF5ZXJzOiBUTVhMYXllcltdO1xuICAgIG5leHRvYmplY3RpZDogbnVtYmVyO1xuICAgIG9yaWVudGF0aW9uOiBzdHJpbmc7XG4gICAgcHJvcGVydGllczogVE1YUHJvcGVydHlbXTtcbiAgICByZW5kZXJvcmRlcjogc3RyaW5nO1xuICAgIHRpbGVkdmVyc2lvbjogc3RyaW5nO1xuICAgIHRpbGVoZWlnaHQ6IG51bWJlcjtcbiAgICB0aWxlc2V0czogVE1YVGlsZVNldFtdO1xuICAgIHRpbGV3aWR0aDogbnVtYmVyO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICB2ZXJzaW9uOiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUTVhMYXllciB7XG4gICAgZGF0YTogc3RyaW5nO1xuICAgIGRyYXdvcmRlcjogc3RyaW5nO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGxheWVyczogVE1YTGF5ZXJbXTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgb2JqZWN0czogb2JqZWN0O1xuICAgIG9wYWNpdHk6IG51bWJlcjtcbiAgICBwcm9wZXJ0aWVzOiBUTVhQcm9wZXJ0eTtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgdmlzaWJsZTogYm9vbGVhbjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVE1YUHJvcGVydHkge31cblxuZXhwb3J0IGludGVyZmFjZSBUTVhUaWxlU2V0IHtcbiAgICBjb2x1bW5zOiBudW1iZXI7XG4gICAgZmlyc3RnaWQ6IG51bWJlcjtcbiAgICBncmlkOiBvYmplY3Q7XG4gICAgaW1hZ2U6IHN0cmluZztcbiAgICBpbWFnZXdpZHRoOiBudW1iZXI7XG4gICAgaW1hZ2VoZWlnaHQ6IG51bWJlcjtcbiAgICBtYXJnaW46IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcHJvcGVydGllczogVE1YUHJvcGVydHlbXTtcbiAgICBzcGFjaW5nOiBudW1iZXI7XG4gICAgdGVycmFpbnM6IFRNWFRlcnJhaW5bXTtcbiAgICB0aWxlY291bnQ6IG51bWJlcjtcbiAgICB0aWxlaGVpZ2h0OiBudW1iZXI7XG4gICAgdGlsZW9mZnNldDogb2JqZWN0O1xuICAgIHRpbGVzOiBUTVhUaWxlW107XG4gICAgdGlsZXdpZHRoOiBudW1iZXI7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRNWFRpbGUge1xuICAgIGlkOiBudW1iZXI7XG4gICAgcHJvcGVydGllczogVE1YUHJvcGVydHlbXTtcbiAgICB0ZXJyYWluOiBUTVhUZXJyYWluW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVE1YVGVycmFpbiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHRpbGU6IG51bWJlcjtcbn1cblxuY29uc3QgZGVjb2RlQmFzZTY0ID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICByZXR1cm4gd2luZG93LmF0b2IoaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csIFwiXCIpKTtcbn07XG5cbmNvbnN0IGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgLy8gbWFrZSBzdXJlIG91ciBpbnB1dCBzdHJpbmcgaGFzIHRoZSByaWdodCBmb3JtYXRcbiAgICByZXR1cm4gd2luZG93LmJ0b2EoaW5wdXQucmVwbGFjZSgvXFxyXFxuL2csIFwiXFxuXCIpKTtcbn07XG5cbmNvbnN0IGRlY29kZUJhc2U2NEFzQXJyYXkgPSBmdW5jdGlvbihpbnB1dCwgYnl0ZXMgPSA0KSB7XG4gICAgdmFyIGRlYyA9IGRlY29kZUJhc2U2NChpbnB1dCksXG4gICAgICAgIGksXG4gICAgICAgIGosXG4gICAgICAgIGxlbjtcbiAgICB2YXIgYXIgPSBuZXcgVWludDMyQXJyYXkoZGVjLmxlbmd0aCAvIGJ5dGVzKTtcblxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGRlYy5sZW5ndGggLyBieXRlczsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGFyW2ldID0gMDtcbiAgICAgICAgZm9yIChqID0gYnl0ZXMgLSAxOyBqID49IDA7IC0taikge1xuICAgICAgICAgICAgYXJbaV0gKz0gZGVjLmNoYXJDb2RlQXQoaSAqIGJ5dGVzICsgaikgPDwgKGogPDwgMyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFRNWGRlY29kZUxheWVyKGxheWVyOiBUTVhMYXllcik6IGFueSB7XG4gICAgY29uc3QgZCA9IGRlY29kZUJhc2U2NEFzQXJyYXkobGF5ZXIuZGF0YSk7XG4gICAgcmV0dXJuIG5ldyBCeXRlczJEKGxheWVyLndpZHRoLCBsYXllci5oZWlnaHQsIDE2LCA0LCBkLmJ1ZmZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHZXRMYXllcihtYXA6IFRNWE1hcCwgbmFtZTogc3RyaW5nKTogVE1YTGF5ZXIgfCBudWxsIHtcbiAgICBjb25zdCBsYXllciA9IG1hcC5sYXllcnMuZmlsdGVyKGxheWVyID0+IGxheWVyLm5hbWUgPT09IG5hbWUpO1xuICAgIHJldHVybiBsYXllci5sZW5ndGggPT09IDEgPyBsYXllclswXSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHZXRUaWxlU2V0KG1hcDogVE1YTWFwLCBuYW1lOiBzdHJpbmcpOiBUTVhUaWxlU2V0IHwgbnVsbCB7XG4gICAgY29uc3QgdGlsZVNldCA9IG1hcC50aWxlc2V0cy5maWx0ZXIodGlsZVNldCA9PiB0aWxlU2V0Lm5hbWUgPT09IG5hbWUpO1xuICAgIHJldHVybiB0aWxlU2V0Lmxlbmd0aCA9PT0gMSA/IHRpbGVTZXRbMF0gOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTGF5ZXJUb0Nvb3JkVGV4dHVyZShsYXllcjogQnl0ZXMyRCk6IFR5cGVkQXJyYXkyRCB7XG4gICAgLy9Bc3N1bWVzIGFsbCB0aWxlcyBhcmUgZnJvbSBzYW1lIHNldC4uLmZ1bmN0aW9uXG4gICAgdmFyIHRpbGVTZXQ6IFRNWFRpbGVTZXQgPSBudWxsO1xuICAgIHZhciB0ZXh0dXJlRGF0YSA9IG5ldyBUeXBlZEFycmF5MkQobGF5ZXIud2lkdGgsIGxheWVyLmhlaWdodCk7XG5cbiAgICBmb3IgKHZhciB4cCA9IDA7IHhwIDwgbGF5ZXIud2lkdGg7IHhwKyspIHtcbiAgICAgICAgZm9yICh2YXIgeXAgPSAwOyB5cCA8IGxheWVyLmhlaWdodDsgeXArKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9XG4gICAgICAgICAgICAgICAgKGxheWVyLmdldCh4cCwgeXAsIDMpIDw8IDI0KSB8XG4gICAgICAgICAgICAgICAgKGxheWVyLmdldCh4cCwgeXAsIDIpIDw8IDE2KSB8XG4gICAgICAgICAgICAgICAgKGxheWVyLmdldCh4cCwgeXAsIDEpIDw8IDgpIHxcbiAgICAgICAgICAgICAgICBsYXllci5nZXQoeHAsIHlwLCAwKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1cGVyU2V0ID0gTWF0aC5mbG9vcihzb3VyY2UgLyAxMDI0KTtcbiAgICAgICAgICAgICAgICB2YXIgc3VwZXJZID0gTWF0aC5mbG9vcihzdXBlclNldCAvIDgpO1xuICAgICAgICAgICAgICAgIHZhciBzdXBlclggPSBzdXBlclNldCAlIDg7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVsYXRpdmVJRCA9IHNvdXJjZSAtIHN1cGVyU2V0ICogMTAyNDtcbiAgICAgICAgICAgICAgICByZWxhdGl2ZUlELS07IC8vTm90IHN1cmUgd2h5IEFUTVxuICAgICAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihyZWxhdGl2ZUlEIC8gMzIpO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gcmVsYXRpdmVJRCAtIDMyICogeTtcbiAgICAgICAgICAgICAgICB2YXIgdjogbnVtYmVyID0gKHN1cGVyWSA8PCAyNCkgfCAoc3VwZXJYIDw8IDE2KSB8ICh5IDw8IDgpIHwgeDtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlRGF0YS5zZXQoeHAsIHlwLCB2KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGV4dHVyZURhdGEuc2V0KHhwLCB5cCwgMHhmZmZmZmZmZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRleHR1cmVEYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTGF5ZXJUb0NvbGxpc2lvbkRhdGEobGF5ZXI6IEJ5dGVzMkQsIGd1aWRPZmZzZXQ6IG51bWJlciwgdGlsZVNpemU6IG51bWJlcik6IEJ5dGVzMkQge1xuICAgIC8vQXNzdW1lcyBhbGwgdGlsZXMgYXJlIGZyb20gc2FtZSBzZXQuLi5mdW5jdGlvblxuICAgIHZhciBjb2xsaXNpb25EYXRhID0gbmV3IEJ5dGVzMkQobGF5ZXIud2lkdGgsIGxheWVyLmhlaWdodCwgdGlsZVNpemUsIDEpO1xuXG4gICAgZm9yICh2YXIgeHAgPSAwOyB4cCA8IGxheWVyLndpZHRoOyB4cCsrKSB7XG4gICAgICAgIGZvciAodmFyIHlwID0gMDsgeXAgPCBsYXllci5oZWlnaHQ7IHlwKyspIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBsYXllci5nZXQoeHAsIHlwLCAwKTtcblxuICAgICAgICAgICAgaWYgKHNvdXJjZSA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVsYXRpdmVJRCA9IHNvdXJjZSAtIGd1aWRPZmZzZXQ7IC8vdGlsZVNldC5maXJzdEdJRDtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25EYXRhLnNldCh4cCwgeXAsIDAsIDEgPDwgcmVsYXRpdmVJRCk7IC8vSW1wbGljaXQgKzFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9uRGF0YS5zZXQoeHAsIHlwLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDMwOyB5KyspIHtcbiAgICAgICAgbGV0IHJvdyA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgMzA7IHgrKykge1xuICAgICAgICAgICAgcm93ICs9IGNvbGxpc2lvbkRhdGEuZ2V0KHgsIHksIDApID8gXCJYXCIgOiBcIjBcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGlzaW9uRGF0YTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS90bXgvVE1YTWFwLnRzIiwiZXhwb3J0IGNsYXNzIEJ5dGVzMkQge1xuICAgIHB1YmxpYyBkYXRhOiBBcnJheUJ1ZmZlcjtcbiAgICBwcml2YXRlIGRhdGE4OiBVaW50OEFycmF5O1xuXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBudW1iZXJlcm5hbFdpZHRoOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY2VsbFNpemU6IG51bWJlcjtcbiAgICBwdWJsaWMgaW52Q2VsbFNpemU6IG51bWJlcjtcblxuICAgIHB1YmxpYyBieXRlc1BlckNlbGw6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjZWxsU2l6ZTogbnVtYmVyLCBieXRlc1BlckNlbGw6IG51bWJlciwgZGF0YT86IEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdGFsaXplKHdpZHRoLCBoZWlnaHQsIGNlbGxTaXplLCBieXRlc1BlckNlbGwsIGRhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0YWxpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNlbGxTaXplOiBudW1iZXIsIGJ5dGVzUGVyQ2VsbDogbnVtYmVyLCBkYXRhPzogQXJyYXlCdWZmZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLm51bWJlcmVybmFsV2lkdGggPSB3aWR0aCAqIGJ5dGVzUGVyQ2VsbDtcblxuICAgICAgICB0aGlzLmNlbGxTaXplID0gY2VsbFNpemU7XG4gICAgICAgIHRoaXMuaW52Q2VsbFNpemUgPSAxIC8gY2VsbFNpemU7XG5cbiAgICAgICAgdGhpcy5ieXRlc1BlckNlbGwgPSBieXRlc1BlckNlbGw7XG5cbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkgdGhpcy5kYXRhID0gbmV3IEFycmF5QnVmZmVyKHdpZHRoICogaGVpZ2h0ICogYnl0ZXNQZXJDZWxsKTtcbiAgICAgICAgZWxzZSB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmRhdGE4ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE4W3kgKiB0aGlzLm51bWJlcmVybmFsV2lkdGggKyB4ICogdGhpcy5ieXRlc1BlckNlbGwgKyBvZmZzZXRdO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YThbeSAqIHRoaXMubnVtYmVyZXJuYWxXaWR0aCArIHggKiB0aGlzLmJ5dGVzUGVyQ2VsbCArIG9mZnNldF0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmVhbCh4OiBudW1iZXIsIHk6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQodGhpcy5JbmRleCh4KSwgdGhpcy5JbmRleCh5KSwgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgSW5kZXgodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodmFsdWUgKiB0aGlzLmludkNlbGxTaXplKSB8IDA7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZHMvQnl0ZXMyRC50cyIsImltcG9ydCB7IElSZW5kZXJlciB9IGZyb20gXCIuLi9SZW5kZXJFbmdpbmVcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcIi4uLy4uL3RleHR1cmUvVGV4dHVyZVwiO1xuaW1wb3J0IHsgVGlsZUxheWVyIH0gZnJvbSBcIi4vVGlsZUxheWVyXCI7XG5pbXBvcnQgeyBUaWxlTGF5ZXJSZW5kZXJQcm94eSB9IGZyb20gXCIuL1RpbGVMYXllclJlbmRlclByb3h5XCI7XG5pbXBvcnQgeyBTaGFkZXJXcmFwcGVyIH0gZnJvbSBcIi4uL3V0aWwvU2hhZGVyV3JhcHBlclwiO1xuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcIi4uLy4uL2Rpc3BsYXlsaXN0L0NhbWVyYVwiO1xuaW1wb3J0IHsgVHlwZWRBcnJheTJEIH0gZnJvbSBcIi4uLy4uLy4uL2RzL1R5cGVkQXJyYXkyRFwiO1xuaW1wb3J0ICogYXMgV2ViR0xTaGFkZXJVdGlscyBmcm9tIFwiLi4vdXRpbC9XZWJHTFNoYWRlclV0aWxcIjtcbmltcG9ydCB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcIi4uLy4uL3RleHR1cmUvQmFzZVRleHR1cmVcIjtcbmltcG9ydCB7IEFBQkIyIH0gZnJvbSBcIi4uLy4uLy4uL2dlb20vQUFCQjJcIjtcblxuZXhwb3J0IGNsYXNzIFRpbGVNYXBSZW5kZXJlciBpbXBsZW1lbnRzIElSZW5kZXJlciB7XG4gICAgcHVibGljIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgcHVibGljIHZpZXdwb3J0U2l6ZTogVmVjdG9yMjtcbiAgICBwdWJsaWMgc2NhbGVkVmlld3BvcnRTaXplOiBGbG9hdDMyQXJyYXk7XG4gICAgcHVibGljIGludmVyc2VUaWxlVGV4dHVyZVNpemU6IEZsb2F0MzJBcnJheTtcbiAgICBwdWJsaWMgaW52ZXJzZVNwcml0ZVRleHR1cmVTaXplOiBGbG9hdDMyQXJyYXk7XG5cbiAgICBwdWJsaWMgdGlsZVNjYWxlOiBudW1iZXI7XG4gICAgcHVibGljIHRpbGVTaXplOiBudW1iZXI7XG4gICAgcHVibGljIGZpbHRlcmVkOiBib29sZWFuO1xuXG4gICAgcHVibGljIHNwcml0ZVNoZWV0OiBXZWJHTFRleHR1cmU7XG5cbiAgICBwdWJsaWMgcXVhZFZlcnRCdWZmZXI6IFdlYkdMQnVmZmVyO1xuXG4gICAgcHVibGljIGxheWVyczogQXJyYXk8VGlsZUxheWVyPjtcbiAgICBwdWJsaWMgbGF5ZXJzTWFwOiBNYXA8c3RyaW5nLCBUaWxlTGF5ZXI+O1xuXG4gICAgcHVibGljIHJlbmRlckxheWVyczogQXJyYXk8VGlsZUxheWVyUmVuZGVyUHJveHk+O1xuICAgIHB1YmxpYyByZW5kZXJMYXllcnNNYXA6IE1hcDxzdHJpbmcsIFRpbGVMYXllclJlbmRlclByb3h5PjtcblxuICAgIHB1YmxpYyB0aWxlbWFwU2hhZGVyOiBTaGFkZXJXcmFwcGVyO1xuXG4gICAgcHVibGljIGNhbWVyYTogQ2FtZXJhO1xuXG4gICAgcHVibGljIHdyaXRlYnVmZmVyMjogVHlwZWRBcnJheTJEO1xuXG4gICAgcHVibGljIGZsaXA6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcih0aWxlU2l6ZTogbnVtYmVyLCB0aWxlU2NhbGU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnRpbGVTaXplID0gdGlsZVNpemU7XG4gICAgICAgIHRoaXMudGlsZVNjYWxlID0gdGlsZVNjYWxlO1xuICAgICAgICB0aGlzLmxheWVycyA9IG5ldyBBcnJheTxUaWxlTGF5ZXI+KCk7XG4gICAgICAgIHRoaXMubGF5ZXJzTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnJlbmRlckxheWVycyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLnJlbmRlckxheWVyc01hcCA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgSW5pdChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBjYW1lcmE6IENhbWVyYSkge1xuICAgICAgICBpZiAodGhpcy5nbCAhPSBudWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIC8vdGlsZVNjYWxlID0gMS4wO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcHJpdGVTaGVldCA9IHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpO1xuXG4gICAgICAgIHRoaXMudmlld3BvcnRTaXplID0gbmV3IFZlY3RvcjIoKTtcbiAgICAgICAgdGhpcy5zY2FsZWRWaWV3cG9ydFNpemUgPSBuZXcgRmxvYXQzMkFycmF5KDIpO1xuICAgICAgICB0aGlzLmludmVyc2VUaWxlVGV4dHVyZVNpemUgPSBuZXcgRmxvYXQzMkFycmF5KDIpO1xuICAgICAgICB0aGlzLmludmVyc2VTcHJpdGVUZXh0dXJlU2l6ZSA9IG5ldyBGbG9hdDMyQXJyYXkoMik7XG5cbiAgICAgICAgdGhpcy5xdWFkVmVydEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcihXZWJHTFJlbmRlcmluZ0NvbnRleHQuQVJSQVlfQlVGRkVSLCB0aGlzLnF1YWRWZXJ0QnVmZmVyKTtcblxuICAgICAgICB2YXIgcXVhZFZlcnRzID0gbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAtMSxcbiAgICAgICAgICAgIC0xLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgLTEsXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG5cbiAgICAgICAgICAgIC0xLFxuICAgICAgICAgICAgLTEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAtMSxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgZ2wuYnVmZmVyRGF0YShXZWJHTFJlbmRlcmluZ0NvbnRleHQuQVJSQVlfQlVGRkVSLCBxdWFkVmVydHMsIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5TVEFUSUNfRFJBVyk7XG4gICAgICAgIHRoaXMudGlsZW1hcFNoYWRlciA9IG5ldyBTaGFkZXJXcmFwcGVyKFxuICAgICAgICAgICAgZ2wsXG4gICAgICAgICAgICBXZWJHTFNoYWRlclV0aWxzLkNvbXBpbGVQcm9ncmFtKGdsLCBUaWxlTWFwUmVuZGVyZXIuVElMRU1BUF9WRVJURVhfU0hBREVSLCBUaWxlTWFwUmVuZGVyZXIuVElMRU1BUF9GUkFHTUVOVF9TSEFERVIpLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZmxpcCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMud3JpdGVidWZmZXIyID0gbmV3IFR5cGVkQXJyYXkyRCgzLCAzKTsgLy9NYXggM3gzIHRpbGVzZXQgY2hhbmdlc1xuXG4gICAgICAgIHRoaXMucmVuZGVyTGF5ZXJzLmZvckVhY2gocmVuZGVyTGF5ZXIgPT4gcmVuZGVyTGF5ZXIuSW5pdChnbCwgY2FtZXJhKSk7XG4gICAgfVxuXG4gICAgcHVibGljIFJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgICAgICB2YXIgZXhwYW5kZWRXaWR0aDogbnVtYmVyID0gKE1hdGguZmxvb3Iod2lkdGggLyAodGhpcy50aWxlU2l6ZSAqIHRoaXMudGlsZVNjYWxlKSkgKyAyKSAqIHRoaXMudGlsZVNpemU7XG4gICAgICAgIHZhciBleHBhbmRlZEhlaWdodDogbnVtYmVyID0gKE1hdGguZmxvb3IoaGVpZ2h0IC8gKHRoaXMudGlsZVNpemUgKiB0aGlzLnRpbGVTY2FsZSkpICsgMikgKiB0aGlzLnRpbGVTaXplO1xuXG4gICAgICAgIHRoaXMudmlld3BvcnRTaXplLnggPSBleHBhbmRlZFdpZHRoICogdGhpcy50aWxlU2NhbGU7XG4gICAgICAgIHRoaXMudmlld3BvcnRTaXplLnkgPSBleHBhbmRlZEhlaWdodCAqIHRoaXMudGlsZVNjYWxlO1xuICAgICAgICB0aGlzLnNjYWxlZFZpZXdwb3J0U2l6ZVswXSA9IHRoaXMudmlld3BvcnRTaXplLnggLyB0aGlzLnRpbGVTY2FsZTtcbiAgICAgICAgdGhpcy5zY2FsZWRWaWV3cG9ydFNpemVbMV0gPSB0aGlzLnZpZXdwb3J0U2l6ZS55IC8gdGhpcy50aWxlU2NhbGU7XG4gICAgICAgIHRoaXMucmVuZGVyTGF5ZXJzLmZvckVhY2gocmVuZGVyTGF5ZXIgPT5cbiAgICAgICAgICAgIHJlbmRlckxheWVyLlJlc2l6ZShNYXRoLmZsb29yKGV4cGFuZGVkV2lkdGgpLCBNYXRoLmZsb29yKGV4cGFuZGVkSGVpZ2h0KSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gcHVibGljICBUaWxlU2NhbGUoc2NhbGU6RmxvYXQpIHtcbiAgICAvLyAgICAgdGhpcy50aWxlU2NhbGUgPSBzY2FsZTtcbiAgICAvLyAgICAgc2NhbGVkVmlld3BvcnRTaXplWzBdID0gdmlld3BvcnRTaXplLngvc2NhbGU7XG4gICAgLy8gICAgIHNjYWxlZFZpZXdwb3J0U2l6ZVsxXSA9IHZpZXdwb3J0U2l6ZS55L3NjYWxlO1xuICAgIC8vIH1cblxuICAgIHB1YmxpYyBTZXRTcHJpdGVTaGVldChpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELCB0aGlzLnNwcml0ZVNoZWV0KTtcbiAgICAgICAgdGhpcy5nbC5waXhlbFN0b3JlaShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMLCAwKTtcbiAgICAgICAgLy8gZ2wudGV4UGFyYW1ldGVyaShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9NQUdfRklMVEVSLFdlYkdMUmVuZGVyaW5nQ29udGV4dC5ORUFSRVNUKTtcbiAgICAgICAgLy8gZ2wudGV4UGFyYW1ldGVyaShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9NSU5fRklMVEVSLFdlYkdMUmVuZGVyaW5nQ29udGV4dC5ORUFSRVNUKTtcbiAgICAgICAgdGhpcy5nbC50ZXhJbWFnZTJEKFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfMkQsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkdCQSxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5VTlNJR05FRF9CWVRFLFxuICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICk7XG4gICAgICAgIGlmICghdGhpcy5maWx0ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX01BR19GSUxURVIsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0Lk5FQVJFU1QsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX01JTl9GSUxURVIsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0Lk5FQVJFU1QsXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX01BR19GSUxURVIsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkxJTkVBUixcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkoXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfMkQsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfTUlOX0ZJTFRFUixcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuTElORUFSLFxuICAgICAgICAgICAgKTsgLy8gV29ydGggaXQgdG8gbWlwbWFwIGhlcmU/XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnZlcnNlU3ByaXRlVGV4dHVyZVNpemVbMF0gPSAxIC8gaW1hZ2Uud2lkdGg7XG4gICAgICAgIHRoaXMuaW52ZXJzZVNwcml0ZVRleHR1cmVTaXplWzFdID0gMSAvIGltYWdlLmhlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgU2V0VGlsZUxheWVyKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCBsYXllcklkOiBTdHJpbmcsIHNjcm9sbFNjYWxlWDogbnVtYmVyLCBzY3JvbGxTY2FsZVk6IG51bWJlcikge1xuICAgICAgICB2YXIgbGF5ZXIgPSBuZXcgVGlsZUxheWVyKCk7XG4gICAgICAgIGxheWVyLnNldFRleHR1cmUodGhpcy5nbCwgaW1hZ2UsIGZhbHNlKTtcbiAgICAgICAgbGF5ZXIuc2Nyb2xsU2NhbGUueCA9IHNjcm9sbFNjYWxlWDtcbiAgICAgICAgbGF5ZXIuc2Nyb2xsU2NhbGUueSA9IHNjcm9sbFNjYWxlWTtcbiAgICAgICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XG4gICAgfVxuXG4gICAgcHVibGljIFNldFRpbGVMYXllckZyb21EYXRhKFxuICAgICAgICBkYXRhOiBUeXBlZEFycmF5MkQsXG4gICAgICAgIHNwcml0ZTogQmFzZVRleHR1cmUsXG4gICAgICAgIGxheWVySWQ6IHN0cmluZyxcbiAgICAgICAgc2Nyb2xsU2NhbGVYOiBudW1iZXIsXG4gICAgICAgIHNjcm9sbFNjYWxlWTogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB2YXIgbGF5ZXIgPSBuZXcgVGlsZUxheWVyKCk7XG4gICAgICAgIGxheWVyLnNldFRleHR1cmVGcm9tTWFwKHRoaXMuZ2wsIGRhdGEpO1xuICAgICAgICBsYXllci5zZXRTcHJpdGVUZXh0dXJlKHNwcml0ZSk7XG4gICAgICAgIGxheWVyLnNjcm9sbFNjYWxlLnggPSBzY3JvbGxTY2FsZVg7XG4gICAgICAgIGxheWVyLnNjcm9sbFNjYWxlLnkgPSBzY3JvbGxTY2FsZVk7XG4gICAgICAgIHRoaXMubGF5ZXJzLnB1c2gobGF5ZXIpO1xuICAgICAgICB0aGlzLmxheWVyc01hcC5zZXQobGF5ZXJJZCwgbGF5ZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBTZXRUaWxlUmVuZGVyTGF5ZXIoaWQ6c3RyaW5nLCBsYXllcnM6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgdmFyIHRpbGVSZW5kZXJMYXllciA9IG5ldyBUaWxlTGF5ZXJSZW5kZXJQcm94eSh0aGlzLCBsYXllcnMpO1xuICAgICAgICB0aGlzLnJlbmRlckxheWVycy5wdXNoKHRpbGVSZW5kZXJMYXllcik7XG4gICAgICAgIHRoaXMucmVuZGVyTGF5ZXJzTWFwLnNldChpZCx0aWxlUmVuZGVyTGF5ZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVNYXAoeDogbnVtYmVyLCB5OiBudW1iZXIsIGRhdGE6IEFycmF5PG51bWJlcj4pIHtcblxuICAgICAgICB2YXIgc3RhcnRYID0gZGF0YVswXTtcbiAgICAgICAgdmFyIHN0YXJ0WSA9IGRhdGFbMV07XG4gICAgICAgIHZhciB3aWR0aCA9IGRhdGFbMl07XG4gICAgICAgIHZhciBoZWlnaHQgPSBkYXRhWzNdO1xuICAgICAgICB2YXIgY2VudGVyWCA9IGRhdGFbNF07XG4gICAgICAgIHZhciBjZW50ZXJZID0gZGF0YVs1XTtcbiAgICAgICAgdmFyIHN1cGVyWSA9IE1hdGguZmxvb3IoZGF0YVs2XSAvIDgpO1xuICAgICAgICB2YXIgc3VwZXJYID0gZGF0YVs2XSAlIDg7XG5cbiAgICAgICAgdGhpcy53cml0ZWJ1ZmZlcjIuaCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy53cml0ZWJ1ZmZlcjIudyA9IHdpZHRoO1xuXG4gICAgICAgIGZvciAodmFyIHlwb3MgPSAwOyB5cG9zIDwgaGVpZ2h0OyB5cG9zKyspIHtcbiAgICAgICAgICAgIC8vIGZvciAoeXBvcyBpbiAwLi4uaGVpZ2h0KSB7XG4gICAgICAgICAgICAvLyBmb3IgKHhwb3MgaW4gMC4uLndpZHRoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4cG9zID0gMDsgeHBvcyA8IHdpZHRoOyB4cG9zKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgX3ggPSBzdGFydFggKyB4cG9zO1xuICAgICAgICAgICAgICAgIHZhciBfeSA9IHN0YXJ0WSArIHlwb3M7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gKHN1cGVyWSA8PCAyNCkgfCAoc3VwZXJYIDw8IDE2KSB8IChfeSA8PCA4KSB8IF94O1xuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVidWZmZXIyLnNldCh4cG9zLCB5cG9zLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd3JpdGVMYXllciA9IHRoaXMubGF5ZXJzWzJdLnRpbGVEYXRhVGV4dHVyZTtcbiAgICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCwgd3JpdGVMYXllcik7XG4gICAgICAgIHRoaXMuZ2wudGV4U3ViSW1hZ2UyRChcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHggLSBjZW50ZXJYLFxuICAgICAgICAgICAgeSAtIGNlbnRlclksXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5SR0JBLFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlVOU0lHTkVEX0JZVEUsXG4gICAgICAgICAgICB0aGlzLndyaXRlYnVmZmVyMi5kYXRhOCxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgUmVuZGVyKGNsaXA6IEFBQkIyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyTGF5ZXJzLmZvckVhY2gocmVuZGVyTGF5ZXIgPT4gcmVuZGVyTGF5ZXIuUmVuZGVyKGNsaXApKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgUmVuZGVyTGF5ZXJzKHJlbmRlckxheWVyOiBUaWxlTGF5ZXJSZW5kZXJQcm94eSkge1xuICAgICAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMC4wKTtcbiAgICAgICAgdGhpcy5nbC5jb2xvck1hc2sodHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZ2wuY2xlYXIoV2ViR0xSZW5kZXJpbmdDb250ZXh0LkNPTE9SX0JVRkZFUl9CSVQpO1xuXG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnRpbGVtYXBTaGFkZXIucHJvZ3JhbSk7XG5cbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5BUlJBWV9CVUZGRVIsIHRoaXMucXVhZFZlcnRCdWZmZXIpO1xuXG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy50aWxlbWFwU2hhZGVyLmF0dHJpYnV0ZS5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy50aWxlbWFwU2hhZGVyLmF0dHJpYnV0ZS50ZXh0dXJlKTtcbiAgICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICAgICAgdGhpcy50aWxlbWFwU2hhZGVyLmF0dHJpYnV0ZS5wb3NpdGlvbixcbiAgICAgICAgICAgIDIsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRkxPQVQsXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIDE2LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMudGlsZW1hcFNoYWRlci5hdHRyaWJ1dGUudGV4dHVyZSwgMiwgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkZMT0FULCBmYWxzZSwgMTYsIDgpO1xuXG4gICAgICAgIHRoaXMuZ2wudW5pZm9ybTJmdih0aGlzLnRpbGVtYXBTaGFkZXIudW5pZm9ybS52aWV3cG9ydFNpemUsIHRoaXMuc2NhbGVkVmlld3BvcnRTaXplKTtcbiAgICAgICAgdGhpcy5nbC51bmlmb3JtMWYodGhpcy50aWxlbWFwU2hhZGVyLnVuaWZvcm0udGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0xZih0aGlzLnRpbGVtYXBTaGFkZXIudW5pZm9ybS5pbnZlcnNlVGlsZVNpemUsIDEgLyB0aGlzLnRpbGVTaXplKTtcblxuICAgICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnRpbGVtYXBTaGFkZXIudW5pZm9ybS5zcHJpdGVzLCAwKTtcbiAgICAgICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy50aWxlbWFwU2hhZGVyLnVuaWZvcm0udGlsZXMsIDEpO1xuXG4gICAgICAgIC8vIGZvciAoaSBpbiByZW5kZXJMYXllci5sYXllcnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW5kZXJMYXllci5sYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIHZhciBsYXllciA9IHRoaXMubGF5ZXJzW2ldO1xuICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSB0aGlzLmxheWVyc01hcC5nZXQocmVuZGVyTGF5ZXIubGF5ZXJzW2ldKTtcbiAgICAgICAgICAgIGNvbnN0IHBYID0gcmVuZGVyTGF5ZXIudGhpc1NuYXAueCAvIDI7XG4gICAgICAgICAgICBjb25zdCBwWSA9IHJlbmRlckxheWVyLnRoaXNTbmFwLnkgLyAyO1xuXG4gICAgICAgICAgICB0aGlzLmdsLnVuaWZvcm0yZih0aGlzLnRpbGVtYXBTaGFkZXIudW5pZm9ybS52aWV3T2Zmc2V0LCBwWCwgcFkpO1xuICAgICAgICAgICAgdGhpcy5nbC51bmlmb3JtMmZ2KHRoaXMudGlsZW1hcFNoYWRlci51bmlmb3JtLmludmVyc2VTcHJpdGVUZXh0dXJlU2l6ZSwgbGF5ZXIuaW52ZXJzZVNwcml0ZVRleHR1cmVTaXplKTtcbiAgICAgICAgICAgIHRoaXMuZ2wudW5pZm9ybTJmdih0aGlzLnRpbGVtYXBTaGFkZXIudW5pZm9ybS5pbnZlcnNlVGlsZVRleHR1cmVTaXplLCBsYXllci5pbnZlcnNlVGlsZURhdGFUZXh0dXJlU2l6ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2wuYWN0aXZlVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRTApO1xuICAgICAgICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCwgbGF5ZXIuc3ByaXRlVGV4dHVyZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2wuYWN0aXZlVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRTEpO1xuICAgICAgICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCwgbGF5ZXIudGlsZURhdGFUZXh0dXJlKTtcblxuICAgICAgICAgICAgdGhpcy5nbC5kcmF3QXJyYXlzKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5UUklBTkdMRVMsIDAsIDYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcblxuICAgIDI1Nio4PTIwNDhcblxuICAgIDh4OCBzdXBlcnRpbGVzID0gNjQgc3VwZXJ0aWxlc1xuXG4gICAgb2YgXG5cbiAgICAxNioxNiA4KjggcGl4ZWwgdGlsZXMgPSAyNTYgdGlsZXNcblxuICAgIHRvdGFsID0gNjQgKiAyNTYgPSAxNmsgdGlsZXNcblxucC55ID0gaW5kZXggJSA4O1xucC54ID0gTWF0aC5mbG9vcihpbmRleCAvIDgpO1xuXG4gICAgKi9cblxuICAgIHN0YXRpYyBUSUxFTUFQX1ZFUlRFWF9TSEFERVI6IHN0cmluZyA9IGBcbiAgICAgICAgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4gICAgICAgIGF0dHJpYnV0ZSB2ZWMyIHBvc2l0aW9uO1xuICAgICAgICBhdHRyaWJ1dGUgdmVjMiB0ZXh0dXJlO1xuXG4gICAgICAgIHZhcnlpbmcgdmVjMiBwaXhlbENvb3JkO1xuICAgICAgICB2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7XG5cbiAgICAgICAgdW5pZm9ybSB2ZWMyIHZpZXdPZmZzZXQ7XG4gICAgICAgIHVuaWZvcm0gdmVjMiB2aWV3cG9ydFNpemU7XG4gICAgICAgIHVuaWZvcm0gdmVjMiBpbnZlcnNlVGlsZVRleHR1cmVTaXplO1xuICAgICAgICB1bmlmb3JtIGZsb2F0IGludmVyc2VUaWxlU2l6ZTtcblxuICAgICAgICB2b2lkIG1haW4odm9pZCkge1xuICAgICAgICAgICBwaXhlbENvb3JkID0gKHRleHR1cmUgKiB2aWV3cG9ydFNpemUpICsgdmlld09mZnNldDtcbiAgICAgICAgICAgdGV4Q29vcmQgPSBwaXhlbENvb3JkICogaW52ZXJzZVRpbGVUZXh0dXJlU2l6ZSAqIGludmVyc2VUaWxlU2l6ZTtcbiAgICAgICAgICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAwLjAsIDEuMCk7XG4gICAgICAgIH1gO1xuXG4gICAgc3RhdGljIFRJTEVNQVBfRlJBR01FTlRfU0hBREVSOiBzdHJpbmcgPSBgXG4gICAgICAgIHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuXG4gICAgICAgIHZhcnlpbmcgdmVjMiBwaXhlbENvb3JkO1xuICAgICAgICB2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7XG5cbiAgICAgICAgdW5pZm9ybSBzYW1wbGVyMkQgdGlsZXM7XG4gICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHNwcml0ZXM7XG5cbiAgICAgICAgdW5pZm9ybSB2ZWMyIGludmVyc2VUaWxlVGV4dHVyZVNpemU7XG4gICAgICAgIHVuaWZvcm0gdmVjMiBpbnZlcnNlU3ByaXRlVGV4dHVyZVNpemU7XG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdGlsZVNpemU7XG5cbiAgICAgICAgdm9pZCBtYWluKHZvaWQpIHtcbiAgICAgICAgICAgdmVjNCB0aWxlID0gdGV4dHVyZTJEKHRpbGVzLCB0ZXhDb29yZCk7XG4gICAgICAgICAgICAvLyBpZih0aWxlLnggPT0gMS4wICYmIHRpbGUueSA9PSAxLjApIHsgZGlzY2FyZDsgfVxuICAgICAgICAgICAgaWYgKHRpbGUueCA9PSAxLjAgJiYgdGlsZS55ID09IDEuMCkgeyBcbiAgICAgICAgICAgICAgICBkaXNjYXJkO1xuICAgICAgICAgICAgICAgIC8vIGdsX0ZyYWdDb2xvciA9IHZlYzQoMC4wLDAuMCwwLjAsMC4wKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVjMiBzdXBlclNwcml0ZU9mZnNldCA9IGZsb29yKHRpbGUuencgKiAyNTYuMCkgKiAyNTYuMDtcbiAgICAgICAgICAgICAgICB2ZWMyIHNwcml0ZU9mZnNldCA9IGZsb29yKHRpbGUueHkgKiAyNTYuMCkgKiB0aWxlU2l6ZTtcbiAgICAgICAgICAgICAgICB2ZWMyIHNwcml0ZUNvb3JkID0gbW9kKHBpeGVsQ29vcmQsIHRpbGVTaXplKTtcblxuICAgICAgICAgICAgICAgIC8vV29ya3NcbiAgICAgICAgICAgICAgICAvLyAgICBzcHJpdGVDb29yZC54ID0gKC0xLjArKDIuMCogMC4wKSkgKiAoKCAwLjAqdGlsZVNpemUpIC0gc3ByaXRlQ29vcmQueCk7IC8vbm9ybWFsICAwXG4gICAgICAgICAgICAgICAgLy8gICAgc3ByaXRlQ29vcmQueCA9ICgtMS4wKygyLjAqIDEuMCkpICogKCggMS4wKnRpbGVTaXplKSAtIHNwcml0ZUNvb3JkLngpOyAvL2ZsaXAgICAxXG5cbiAgICAgICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQoc3ByaXRlcywgKHN1cGVyU3ByaXRlT2Zmc2V0ICsgc3ByaXRlT2Zmc2V0ICsgc3ByaXRlQ29vcmQpICogaW52ZXJzZVNwcml0ZVRleHR1cmVTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWA7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvcmVuZGVyL3RpbGUvVGlsZU1hcFJlbmRlcmVyLnRzIiwiaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi8uLi8uLi9nZW9tL1ZlY3RvcjJcIjtcbmltcG9ydCB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcIi4uLy4uL3RleHR1cmUvQmFzZVRleHR1cmVcIjtcbmltcG9ydCB7IFR5cGVkQXJyYXkyRCB9IGZyb20gXCIuLi8uLi8uLi9kcy9UeXBlZEFycmF5MkRcIjtcblxuZXhwb3J0IGNsYXNzIFRpbGVMYXllciB7XG4gICAgcHVibGljIHNjcm9sbFNjYWxlOiBWZWN0b3IyO1xuXG4gICAgcHVibGljIHRpbGVEYXRhVGV4dHVyZTogV2ViR0xUZXh0dXJlO1xuICAgIHB1YmxpYyBpbnZlcnNlVGlsZURhdGFUZXh0dXJlU2l6ZTogRmxvYXQzMkFycmF5O1xuXG4gICAgcHVibGljIHNwcml0ZVRleHR1cmU6IFdlYkdMVGV4dHVyZTtcbiAgICBwdWJsaWMgaW52ZXJzZVNwcml0ZVRleHR1cmVTaXplOiBGbG9hdDMyQXJyYXk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxTY2FsZSA9IG5ldyBWZWN0b3IyKDEsIDEpO1xuICAgICAgICB0aGlzLmludmVyc2VUaWxlRGF0YVRleHR1cmVTaXplID0gbmV3IEZsb2F0MzJBcnJheSgyKTtcbiAgICAgICAgdGhpcy5pbnZlcnNlU3ByaXRlVGV4dHVyZVNpemUgPSBuZXcgRmxvYXQzMkFycmF5KDIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTcHJpdGVUZXh0dXJlKHNwcml0ZVRleHR1cmU6IEJhc2VUZXh0dXJlKSB7XG4gICAgICAgIHRoaXMuc3ByaXRlVGV4dHVyZSA9IHNwcml0ZVRleHR1cmUudGV4dHVyZTtcbiAgICAgICAgdGhpcy5pbnZlcnNlU3ByaXRlVGV4dHVyZVNpemVbMF0gPSAxIC8gc3ByaXRlVGV4dHVyZS53aWR0aDtcbiAgICAgICAgdGhpcy5pbnZlcnNlU3ByaXRlVGV4dHVyZVNpemVbMV0gPSAxIC8gc3ByaXRlVGV4dHVyZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRleHR1cmVGcm9tTWFwKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGRhdGE6IFR5cGVkQXJyYXkyRCkge1xuICAgICAgICBpZiAodGhpcy50aWxlRGF0YVRleHR1cmUgPT0gbnVsbCkgdGhpcy50aWxlRGF0YVRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELCB0aGlzLnRpbGVEYXRhVGV4dHVyZSk7XG4gICAgICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkdCQSxcbiAgICAgICAgICAgIGRhdGEudyxcbiAgICAgICAgICAgIGRhdGEuaCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkdCQSxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5VTlNJR05FRF9CWVRFLFxuICAgICAgICAgICAgZGF0YS5kYXRhOCxcbiAgICAgICAgKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfTUFHX0ZJTFRFUixcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5ORUFSRVNULFxuICAgICAgICApO1xuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfMkQsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9NSU5fRklMVEVSLFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0Lk5FQVJFU1QsXG4gICAgICAgICk7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX1dSQVBfUyxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5DTEFNUF9UT19FREdFLFxuICAgICAgICApO1xuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfMkQsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9XUkFQX1QsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuQ0xBTVBfVE9fRURHRSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbnZlcnNlVGlsZURhdGFUZXh0dXJlU2l6ZVswXSA9IDEgLyBkYXRhLnc7XG4gICAgICAgIHRoaXMuaW52ZXJzZVRpbGVEYXRhVGV4dHVyZVNpemVbMV0gPSAxIC8gZGF0YS5oO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRUZXh0dXJlKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCByZXBlYXQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMudGlsZURhdGFUZXh0dXJlID09IG51bGwpIHRoaXMudGlsZURhdGFUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCwgdGhpcy50aWxlRGF0YVRleHR1cmUpO1xuICAgICAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfMkQsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkdCQSxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5VTlNJR05FRF9CWVRFLFxuICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICk7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX01BR19GSUxURVIsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuTkVBUkVTVCxcbiAgICAgICAgKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfTUlOX0ZJTFRFUixcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5ORUFSRVNULFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVwZWF0KSB7XG4gICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX1dSQVBfUyxcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkVQRUFULFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfMkQsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfV1JBUF9ULFxuICAgICAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5SRVBFQVQsXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9XUkFQX1MsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkNMQU1QX1RPX0VER0UsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRCxcbiAgICAgICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9XUkFQX1QsXG4gICAgICAgICAgICAgICAgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkNMQU1QX1RPX0VER0UsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnZlcnNlVGlsZURhdGFUZXh0dXJlU2l6ZVswXSA9IDEgLyBpbWFnZS53aWR0aDtcbiAgICAgICAgdGhpcy5pbnZlcnNlVGlsZURhdGFUZXh0dXJlU2l6ZVsxXSA9IDEgLyBpbWFnZS5oZWlnaHQ7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL3JlbmRlci90aWxlL1RpbGVMYXllci50cyIsImltcG9ydCB7IElSZW5kZXJlciB9IGZyb20gXCIuLi9SZW5kZXJFbmdpbmVcIjtcbmltcG9ydCB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcIi4uLy4uL3RleHR1cmUvQmFzZVRleHR1cmVcIjtcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiLi4vLi4vdGV4dHVyZS9UZXh0dXJlXCI7XG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vLi4vZGlzcGxheWxpc3QvU3ByaXRlXCI7XG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uLy4uLy4uL2dlb20vVmVjdG9yMlwiO1xuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcIi4uLy4uL2Rpc3BsYXlsaXN0L0NhbWVyYVwiO1xuaW1wb3J0IHsgVGlsZU1hcFJlbmRlcmVyIH0gZnJvbSBcIi4vVGlsZU1hcFJlbmRlcmVyXCI7XG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tIFwiLi4vLi4vLi4vZ2VvbS9SZWN0YW5nbGVcIjtcbmltcG9ydCB7IEFBQkIyIH0gZnJvbSBcIi4uLy4uLy4uL2dlb20vQUFCQjJcIjtcblxuLy9UT0RPOiBHZXQgcmlkIG9mIHRoaXMgY2xhc3MgZXZlbnR1YWxseVxuLy9JdHMgb25seSB0byBiZSBhYmxlIHRvIHNwbGl0IHRoZSB0aWxlbWFwIHJlbmRlcmVyIGluIHRoZSBzaG9ydCB0ZXJtXG5cbmV4cG9ydCBjbGFzcyBUaWxlTGF5ZXJSZW5kZXJQcm94eSBpbXBsZW1lbnRzIElSZW5kZXJlciB7XG4gICAgcHVibGljIHRpbGVNYXA6IFRpbGVNYXBSZW5kZXJlcjtcbiAgICBwdWJsaWMgbGF5ZXJzOiBBcnJheTxzdHJpbmc+O1xuXG4gICAgcHVibGljIHN1cmZhY2U6IEJhc2VUZXh0dXJlO1xuICAgIHB1YmxpYyB0ZXh0dXJlOiBUZXh0dXJlO1xuICAgIHB1YmxpYyBzcHJpdGU6IFNwcml0ZTtcblxuICAgIHB1YmxpYyBsYXN0U25hcDogVmVjdG9yMjtcbiAgICBwdWJsaWMgdGhpc1NuYXA6IFZlY3RvcjI7XG4gICAgcHVibGljIHNuYXBDaGFuZ2VkOiBib29sZWFuO1xuXG4gICAgcHVibGljIHNpemU6IFZlY3RvcjI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aWxlTWFwOiBUaWxlTWFwUmVuZGVyZXIsIGxheWVyczogQXJyYXk8c3RyaW5nPikge1xuICAgICAgICB0aGlzLnRpbGVNYXAgPSB0aWxlTWFwO1xuICAgICAgICB0aGlzLmxheWVycyA9IGxheWVycztcblxuICAgICAgICB0aGlzLmxhc3RTbmFwID0gbmV3IFZlY3RvcjIoMCwgMCk7XG4gICAgICAgIHRoaXMudGhpc1NuYXAgPSBuZXcgVmVjdG9yMigtMTAwMCwgLTEwMDApO1xuICAgICAgICB0aGlzLnNuYXBDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zaXplID0gbmV3IFZlY3RvcjIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTdXJmYWNlID0gdGhpcy5yZW5kZXJTdXJmYWNlLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIEluaXQoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgY2FtZXJhOiBDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKCk7XG4gICAgICAgIHRoaXMuc3ByaXRlLmlkID0gXCJyZW5kZXJUZXh0dXJlXCI7XG4gICAgfVxuXG4gICAgcHVibGljIFJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNpemUuc2V0VG8od2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuc3VyZmFjZSA9IG5ldyBCYXNlVGV4dHVyZSh0aGlzLnRpbGVNYXAuZ2wsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLnRleHR1cmUgPSBuZXcgVGV4dHVyZSh0aGlzLnN1cmZhY2UsIG5ldyBSZWN0YW5nbGUoMCwgMCwgd2lkdGgsIGhlaWdodCksIG5ldyBWZWN0b3IyKDAsIDApKTtcbiAgICAgICAgdGhpcy5zcHJpdGUudGV4dHVyZSA9IHRoaXMudGV4dHVyZTtcbiAgICAgICAgdGhpcy5zcHJpdGUuc2NhbGUuc2V0VG8oMiwgLTIpO1xuICAgICAgICB0aGlzLnNwcml0ZS5waXZvdC5zZXRUbyh3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYWxjU25hcChjYW1lcmFQb3M6IFZlY3RvcjIpOiBib29sZWFuIHtcbiAgICAgICAgdGhpcy5sYXN0U25hcC5jb3B5KHRoaXMudGhpc1NuYXApO1xuXG4gICAgICAgIHRoaXMudGhpc1NuYXAueCA9IChNYXRoLmZsb29yKGNhbWVyYVBvcy54IC8gLTE2KSAtIDEpICogMTY7XG4gICAgICAgIC8vIHRoaXNTbmFwLngqPTE2O1xuICAgICAgICAvLyB0aGlzU25hcC54LT0xNjtcbiAgICAgICAgdGhpcy50aGlzU25hcC55ID0gKE1hdGguZmxvb3IoY2FtZXJhUG9zLnkgLyAtMTYpIC0gMSkgKiAxNjtcbiAgICAgICAgLy8gdGhpc1NuYXAueSo9MTY7XG4gICAgICAgIC8vIHRoaXNTbmFwLnktPTE2O1xuXG4gICAgICAgIHRoaXMuc25hcENoYW5nZWQgPSB0aGlzLmxhc3RTbmFwLnggIT0gdGhpcy50aGlzU25hcC54IHx8IHRoaXMubGFzdFNuYXAueSAhPSB0aGlzLnRoaXNTbmFwLnk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc25hcENoYW5nZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIFJlbmRlcihjbGlwOiBBQUJCMikge1xuICAgICAgICAvLyBpZiAoY2FsY1NuYXAodGlsZU1hcC5jYW1lcmEucG9zaXRpb24pKSB7XG4gICAgICAgIHRoaXMuY2FsY1NuYXAodGhpcy50aWxlTWFwLmNhbWVyYS5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuc3ByaXRlLnBvc2l0aW9uLmNvcHkodGhpcy5zaXplKTtcbiAgICAgICAgdGhpcy5zcHJpdGUucG9zaXRpb24ucGx1c0VxdWFscyh0aGlzLnRoaXNTbmFwKTtcbiAgICAgICAgLy8gc3ByaXRlLnBvc2l0aW9uLnNldFRvKDQxNit0aGlzU25hcC54LDMzNit0aGlzU25hcC55KTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmRyYXdUbyh0aGlzLnJlbmRlclN1cmZhY2UpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlclN1cmZhY2UoKSB7XG4gICAgICAgIHRoaXMudGlsZU1hcC5SZW5kZXJMYXllcnModGhpcyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL3JlbmRlci90aWxlL1RpbGVMYXllclJlbmRlclByb3h5LnRzIiwiaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSBcIi4uLy4uL2Vjcy9TeXN0ZW1cIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29tcG9uZW50cy9Qb3NpdGlvblwiO1xuaW1wb3J0IHsgR3JhcGhpY3MgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9HcmFwaGljc1wiO1xuaW1wb3J0IHsgR3JhcGhpY3NBbmltYXRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9HcmFwaGljc0FuaW1hdGlvblwiO1xuaW1wb3J0IHsgRnJhbWVMaXN0TWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZS9GcmFtZUxpc3RNYW5hZ2VyXCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi4vLi4vZWNzL0VudGl0eVwiO1xuaW1wb3J0IHsgQW5pbWF0aW9uQ29udHJvbGxlciB9IGZyb20gXCIuLi9hbmltYXRpb24vQW5pbWF0aW9uQ29udHJvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICBwcml2YXRlIGZyYW1lTGlzdE1hbmFnZXI6IEZyYW1lTGlzdE1hbmFnZXI7XG4gICAgY29uc3RydWN0b3IoZnJhbWVMaXN0TWFuYWdlcjogRnJhbWVMaXN0TWFuYWdlcikge1xuICAgICAgICBzdXBlcihbUG9zaXRpb24sIEdyYXBoaWNzLCBHcmFwaGljc0FuaW1hdGlvbl0pO1xuICAgICAgICB0aGlzLmZyYW1lTGlzdE1hbmFnZXIgPSBmcmFtZUxpc3RNYW5hZ2VyO1xuICAgIH1cbiAgICBvbkVudGl0eUFkZGVkKGVudGl0eTogRW50aXR5LCBwb3NpdGlvbjogUG9zaXRpb24sIGdyYXBoaWNzOiBHcmFwaGljcywgYW5pbWF0aW9uOiBHcmFwaGljc0FuaW1hdGlvbikge1xuICAgICAgICBjb25zdCBuZXdBbmltYXRpb24gPSB0aGlzLmZyYW1lTGlzdE1hbmFnZXJcbiAgICAgICAgICAgIC5nZXRGcmFtZUxpc3QoYW5pbWF0aW9uLmZyYW1lTGlzdElkKVxuICAgICAgICAgICAgLmdldEFuaW1hdGlvbihhbmltYXRpb24uYW5pbWF0aW9uSWQpO1xuICAgICAgICBhbmltYXRpb24uYW5pbWF0aW9uQ29udHJvbGxlciA9IG5ldyBBbmltYXRpb25Db250cm9sbGVyKG5ld0FuaW1hdGlvbik7XG4gICAgfVxuXG4gICAgdXBkYXRlRW50aXR5KGVudGl0eTogRW50aXR5LCBwb3NpdGlvbjogUG9zaXRpb24sIGdyYXBoaWNzOiBHcmFwaGljcywgYW5pbWF0aW9uOiBHcmFwaGljc0FuaW1hdGlvbikge1xuICAgICAgICBhbmltYXRpb24uYW5pbWF0aW9uQ29udHJvbGxlclxuICAgICAgICAgICAgLnVwZGF0ZSh0aGlzLmR0KVxuICAgICAgICAgICAgLnVwZGF0ZVNwcml0ZShncmFwaGljcy5zcHJpdGUsIHBvc2l0aW9uLmRpcmVjdGlvbi54LCBwb3NpdGlvbi5kaXJlY3Rpb24ueSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL3N5c3RlbXMvQW5pbWF0aW9uU3lzdGVtLnRzIiwiaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcIi4vQW5pbWF0b25cIjtcbmltcG9ydCB7IEZyYW1lIH0gZnJvbSBcIi4uL2ZyYW1lL0ZyYW1lXCI7XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25Db250cm9sbGVyIHtcblxuICAgIHB1YmxpYyBhbmltYXRpb246QW5pbWF0aW9uO1xuICAgIHB1YmxpYyBmcmFtZUluZGV4Om51bWJlcjtcbiAgICBwdWJsaWMgYWNjdW11bGF0ZWRUaW1lOm51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGFuaW1hdGlvbjpBbmltYXRpb24pIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBhbmltYXRpb247XG4gICAgICAgIHRoaXMuZnJhbWVJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZWRUaW1lID0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGR0Om51bWJlcik6RnJhbWUge1xuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkVGltZSArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMuYWNjdW11bGF0ZWRUaW1lPnRoaXMuYW5pbWF0aW9uLm1zUGVyRnJhbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVJbmRleCA9ICsrdGhpcy5mcmFtZUluZGV4ICUgdGhpcy5hbmltYXRpb24ubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZFRpbWUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbi5mcmFtZXNbdGhpcy5mcmFtZUluZGV4XTtcbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ3JhcGhpY3MvYW5pbWF0aW9uL0FuaW1hdGlvbkNvbnRyb2xsZXIudHMiLCJpbXBvcnQgeyBCeXRlczJEIH0gZnJvbSBcIi4uLy4uLy4uL2RzL0J5dGVzMkRcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBTZWdtZW50IH0gZnJvbSBcIi4uLy4uLy4uL2dlb20vU2VnbWVudFwiO1xuaW1wb3J0IHsgQ29udGFjdCB9IGZyb20gXCIuLi9Db250YWN0XCI7XG5pbXBvcnQgeyBCRlByb3h5IH0gZnJvbSBcIi4uL0JGUHJveHlcIjtcbmltcG9ydCB7IFJheSB9IGZyb20gXCIuLi9SYXlcIjtcbmltcG9ydCB7IFN0YXRpY0FBQkJ2c1N3ZWVwdEFBQkIsIElzU2VnVnNBQUJCLCBBQUJCdnNTdGF0aWNTb2xpZEFBQkJGaXhlZE5vcm1hbCwgQUFCQnZzU3RhdGljU29saWRBQUJCIH0gZnJvbSBcIi4uL0ludGVyc2VjdFwiO1xuaW1wb3J0IHsgUGxhbmUgfSBmcm9tIFwiLi4vLi4vLi4vZ2VvbS9QbGFuZVwiO1xuXG5jb25zdCBTT0xJRDogbnVtYmVyID0gMHgxIDw8IDA7XG5jb25zdCBPTkVfV0FZOiBudW1iZXIgPSAweDEgPDwgMTtcbmNvbnN0IFNURVA6IG51bWJlciA9IDB4MSA8PCAyO1xuY29uc3QgQUFCQkNPTExJREFCTEU6IG51bWJlciA9IFNPTElEIHwgT05FX1dBWSB8IFNURVA7XG5cbmNvbnN0IE9ORV9XQVlfVE9MTEVSQU5DRTogbnVtYmVyID0gLTQuMDtcblxuY29uc3QgQ09SUkVDVElPTjogbnVtYmVyID0gMC4wO1xuY29uc3QgUk9VTkRET1dOOiBudW1iZXIgPSAwLjAxO1xuY29uc3QgUk9VTkRVUDogbnVtYmVyID0gMC41O1xuXG5leHBvcnQgY2xhc3MgVGlsZU1hcENvbGxpc2lvbiB7XG4gICAgcHVibGljIHRpbGVTaXplOiBudW1iZXI7XG4gICAgcHVibGljIHRpbGVIYWxmU2l6ZTogbnVtYmVyO1xuXG4gICAgcHVibGljIGRhdGE6IEJ5dGVzMkQ7XG5cbiAgICBwdWJsaWMgdGlsZVBvc2l0aW9uOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoKTtcbiAgICBwdWJsaWMgdGlsZUV4dGVudHM6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgcHVibGljIGhhbGZ0aWxlUG9zaXRpb246IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuICAgIHB1YmxpYyBoYWxmdGlsZUV4dGVudHM6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgcHVibGljIGJpYXM6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigxLCAxKTtcbiAgICBwdWJsaWMgc3RlcDogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKDAsIC0xKTtcblxuICAgIHB1YmxpYyBwbGFuZTogUGxhbmUgPSBuZXcgUGxhbmUoKTtcbiAgICBwdWJsaWMgc2VnbWVudDogU2VnbWVudCA9IG5ldyBTZWdtZW50KCk7XG5cbiAgICBwdWJsaWMgY29udGFjdDogQ29udGFjdDtcbiAgICBwdWJsaWMgY2xvc2VzdENvbnRhY3Q6IENvbnRhY3Q7XG5cbiAgICAvLyBwdWJsaWMgIGRlYnVnOkludC0+SW50LT5Wb2lkO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogQnl0ZXMyRCkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnRpbGVTaXplID0gZGF0YS5jZWxsU2l6ZTtcbiAgICAgICAgdGhpcy50aWxlSGFsZlNpemUgPSB0aGlzLnRpbGVTaXplIC8gMjtcbiAgICAgICAgdGhpcy50aWxlRXh0ZW50cy5zZXRUbyh0aGlzLnRpbGVIYWxmU2l6ZSwgdGhpcy50aWxlSGFsZlNpemUpO1xuICAgICAgICB0aGlzLmhhbGZ0aWxlRXh0ZW50cy5zZXRUbyh0aGlzLnRpbGVIYWxmU2l6ZSAvIDQsIHRoaXMudGlsZUhhbGZTaXplIC8gNCk7XG4gICAgICAgIHRoaXMuY29udGFjdCA9IG5ldyBDb250YWN0KCk7XG4gICAgICAgIHRoaXMuY2xvc2VzdENvbnRhY3QgPSBuZXcgQ29udGFjdCgpO1xuICAgIH1cblxuICAgIC8vVE9ET1xuICAgIC8vQ2FuIGJlIGltcHJvdmVkXG4gICAgcHVibGljIHRlc3RDb2xsaXNpb24ocHJveHk6IEJGUHJveHkpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBwcm94eS5ib2R5O1xuXG4gICAgICAgIHZhciBzdGFydFggPSB0aGlzLmRhdGEuSW5kZXgoXG4gICAgICAgICAgICBNYXRoLm1pbihib2R5LnBvc2l0aW9uLngsIGJvZHkucHJlZGljdGVkUG9zaXRpb24ueCkgLSBwcm94eS5hYWJiLmV4dGVudHMueCAtIENPUlJFQ1RJT04sXG4gICAgICAgICk7XG4gICAgICAgIHZhciBzdGFydFkgPSB0aGlzLmRhdGEuSW5kZXgoXG4gICAgICAgICAgICBNYXRoLm1pbihib2R5LnBvc2l0aW9uLnksIGJvZHkucHJlZGljdGVkUG9zaXRpb24ueSkgLSBwcm94eS5hYWJiLmV4dGVudHMueSAtIENPUlJFQ1RJT04sXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGVuZFggPVxuICAgICAgICAgICAgdGhpcy5kYXRhLkluZGV4KFxuICAgICAgICAgICAgICAgIE1hdGgubWF4KGJvZHkucG9zaXRpb24ueCwgYm9keS5wcmVkaWN0ZWRQb3NpdGlvbi54KSArIHByb3h5LmFhYmIuZXh0ZW50cy54ICsgQ09SUkVDVElPTiAtIFJPVU5ERE9XTixcbiAgICAgICAgICAgICkgKyAxO1xuICAgICAgICB2YXIgZW5kWSA9XG4gICAgICAgICAgICB0aGlzLmRhdGEuSW5kZXgoTWF0aC5tYXgoYm9keS5wb3NpdGlvbi55LCBib2R5LnByZWRpY3RlZFBvc2l0aW9uLnkpICsgcHJveHkuYWFiYi5leHRlbnRzLnkgKyBDT1JSRUNUSU9OKSArXG4gICAgICAgICAgICAxO1xuXG4gICAgICAgIHZhciBjID0gMDtcbiAgICAgICAgaWYgKGJvZHkuaXNCdWxsZXQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhbmUuc2V0RnJvbVNlZ21lbnQoYm9keS5wcmVkaWN0ZWRQb3NpdGlvbiwgYm9keS5wb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLmNsb3Nlc3RDb250YWN0LnRpbWUgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gc3RhcnRZOyB5IDwgZW5kWTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IHN0YXJ0WDsgeCA8IGVuZFg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZGF0YS5nZXQoeCwgeSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIC8vQnVsbGV0cyBkb250IGNvbGxpZGUgd2l0aCAxIHdheXMgYXQgYWxsXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY2VsbCAmIFNPTElEKSA9PSAxICYmIChjZWxsICYgT05FX1dBWSkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlUG9zaXRpb24ueCA9IHggKiB0aGlzLnRpbGVTaXplICsgdGhpcy50aWxlSGFsZlNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVQb3NpdGlvbi55ID0geSAqIHRoaXMudGlsZVNpemUgKyB0aGlzLnRpbGVIYWxmU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8veXVrIGZpeCB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMucGxhbmUuZGlzdGFuY2VQb2ludCh0aGlzLnRpbGVQb3NpdGlvbikpIDwgNDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN0YXRpY0FBQkJ2c1N3ZWVwdEFBQkIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZUV4dGVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJveHkuYWFiYi5leHRlbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5kZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA9PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2R5LnJlc3BvbmRCdWxsZXRDb2xsaXNpb24odGhpcy5jb250YWN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZXN0Q29udGFjdC5zZXRUbyh0aGlzLmNvbnRhY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VzdENvbnRhY3QudGltZSA8IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgICAgICAgICAgIHByb3h5LmNvbGxpZGUobnVsbCwgdGhpcy5jb250YWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHBsYW5lLnNldEZyb21TZWdtZW50KGJvZHkucHJlZGljdGVkUG9zaXRpb24sYm9keS5wb3NpdGlvbik7XG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gc3RhcnRZOyB5IDwgZW5kWTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IHN0YXJ0WDsgeCA8IGVuZFg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZGF0YS5nZXQoeCwgeSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoY2VsbCAmIEFBQkJDT0xMSURBQkxFKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZVBvc2l0aW9uLnggPSB4ICogdGhpcy50aWxlU2l6ZSArIHRoaXMudGlsZUhhbGZTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlUG9zaXRpb24ueSA9IHkgKiB0aGlzLnRpbGVTaXplICsgdGhpcy50aWxlSGFsZlNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY2VsbCAmIFNURVApID09IFNURVAgJiYgYm9keS51c2VzU3RhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50LnNldChib2R5LnBvc2l0aW9uLCBib2R5LnByZWRpY3RlZFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBqcy5MaWIuZGVidWcoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLTQsKzRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLys0LC00XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zdGVwIDhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhaXJzdGVwID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgc3RhaXJTaXplID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgc3RhcnRTdGFpciA9IC02O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHN0YWlyID0gMDsgc3RhaXIgPCA4OyBzdGFpcisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwID0gOCAtIHN0YWlyICogc3RhaXJzdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbGZ0aWxlUG9zaXRpb24uY29weSh0aGlzLnRpbGVQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFsZnRpbGVQb3NpdGlvbi54ICs9IHAgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYWxmdGlsZVBvc2l0aW9uLnkgKz0gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXNTZWdWc0FBQkIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFsZnRpbGVQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbGZ0aWxlRXh0ZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm94eS5hYWJiLmV4dGVudHMueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm94eS5hYWJiLmV4dGVudHMueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBQUJCdnNTdGF0aWNTb2xpZEFBQkJGaXhlZE5vcm1hbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5LmFhYmIuZXh0ZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbGZ0aWxlUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYWxmdGlsZUV4dGVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnJlc3BvbmRTdGF0aWNDb2xsaXNpb24odGhpcy5jb250YWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5LmNvbGxpZGUobnVsbCwgdGhpcy5jb250YWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEludGVyc2VjdC5BQUJCdnNTdGF0aWNTb2xpZEFBQkJTbG9wZShib2R5LnBvc2l0aW9uLHByb3h5LmFhYmIuZXh0ZW50cyx0aWxlUG9zaXRpb24sdGlsZUV4dGVudHMsYmlhcyxjb250YWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQUFCQnZzU3RhdGljU29saWRBQUJCKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm94eS5hYWJiLmV4dGVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZVBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVFeHRlbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpYXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKEludGVyc2VjdC5BQUJCdnNTdGF0aWNTb2xpZEFBQkIoYm9keS5wb3NpdGlvbixwcm94eS5hYWJiLmV4dGVudHMsdGlsZVBvc2l0aW9uLHRpbGVFeHRlbnRzLGJpYXMsY29udGFjdCk9PXRydWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgZm9yIDEgd2F5IHBsYXRmb3JtP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY2VsbCAmIE9ORV9XQVkpID09IE9ORV9XQVkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jb2xsaWRlT25lV2F5ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3Qubm9ybWFsLnkgPCAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3QuZGlzdGFuY2UgPj0gT05FX1dBWV9UT0xMRVJBTkNFXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5yZXNwb25kU3RhdGljQ29sbGlzaW9uKHRoaXMuY29udGFjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm94eS5jb2xsaWRlKG51bGwsIHRoaXMuY29udGFjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCBjb250YWN0Lm5vcm1hbC54IT0wICYmIGNvbnRhY3QuZGlzdGFuY2U8MTYpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29udGFjdC5ub3JtYWwuc2V0VG8oMCwtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm9keS5yZXNwb25kU3RhdGljQ29sbGlzaW9uKGNvbnRhY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0WDogbnVtYmVyID0geCArIHRoaXMuY29udGFjdC5ub3JtYWwueDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRZOiBudW1iZXIgPSB5ICsgdGhpcy5jb250YWN0Lm5vcm1hbC55O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dENlbGwgPSB0aGlzLmRhdGEuZ2V0KG5leHRYLCBuZXh0WSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobmV4dENlbGwgJiBBQUJCQ09MTElEQUJMRSkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5yZXNwb25kU3RhdGljQ29sbGlzaW9uKHRoaXMuY29udGFjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm94eS5jb2xsaWRlKG51bGwsIHRoaXMuY29udGFjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoY2VsbCZPTkVfV0FZPT0wIHx8ICggY29udGFjdC5ub3JtYWwueTwwJiZjb250YWN0LmRpc3RhbmNlPj0tNCApIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBuZXh0WDpJbnQgPSB4ICsgU3RkLmludChjb250YWN0Lm5vcm1hbC54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBuZXh0WTpJbnQgPSB5ICsgU3RkLmludChjb250YWN0Lm5vcm1hbC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBuZXh0Q2VsbCA9IGRhdGEuZ2V0KG5leHRYLG5leHRZLDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKG5leHRDZWxsJkFBQkJDT0xMSURBQkxFPT0wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYm9keS5yZXNwb25kU3RhdGljQ29sbGlzaW9uKGNvbnRhY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHByb3h5LmNvbGxpZGUobnVsbCxjb250YWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRyYWNlKGMpO1xuICAgICAgICAvLyBpZiAoYz4xMDApIHtcbiAgICAgICAgLy8gICAgIHRyYWNlKHN0YXJ0WCxlbmRYLHN0YXJ0WCxlbmRZKTtcbiAgICAgICAgLy8gICAgIGpzLkxpYi5kZWJ1ZygpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHBsYW5lLnNldEZyb21TZWdtZW50KGJvZHkucHJlZGljdGVkUG9zaXRpb24sYm9keS5wb3NpdGlvbik7XG5cbiAgICAgICAgLy8gZm9yICh4IGluIHN0YXJ0WC4uLmVuZFgpIHtcbiAgICAgICAgLy8gICAgIGZvciAoeSBpbiBzdGFydFkuLi5lbmRZKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGNlbGwgPSBkYXRhLmdldCh4LHksMSk7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGNlbGwmQ09MTElEQUJMRT09MSkge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aWxlUG9zaXRpb24ueCA9ICh4KnRpbGVTaXplKSt0aWxlSGFsZlNpemU7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRpbGVQb3NpdGlvbi55ID0gKHkqdGlsZVNpemUpK3RpbGVIYWxmU2l6ZTtcblxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAoYm9keS5pc0J1bGxldCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy9GSVhNRVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHBsYW5lLmRpc3RhbmNlUG9pbnQodGlsZVBvc2l0aW9uKSk8NDApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAoSW50ZXJzZWN0LlN0YXRpY0FBQkJ2c1N3ZWVwdEFBQkIodGlsZVBvc2l0aW9uLHRpbGVFeHRlbnRzLGJvZHkucG9zaXRpb24scHJveHkuYWFiYi5leHRlbnRzLGJvZHkuZGVsdGEsY29udGFjdCk9PXRydWUpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5yZXNwb25kQnVsbGV0Q29sbGlzaW9uKGNvbnRhY3QpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJveHkuY29udGFjdENhbGxiYWNrIT1udWxsKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm94eS5jb250YWN0Q2FsbGJhY2socHJveHksbnVsbCxjb250YWN0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmIChJbnRlcnNlY3QuQUFCQnZzU3RhdGljU29saWRBQUJCKGJvZHkucG9zaXRpb24scHJveHkuYWFiYi5leHRlbnRzLHRpbGVQb3NpdGlvbix0aWxlRXh0ZW50cyxjb250YWN0KT09dHJ1ZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0WDpJbnQgPSB4ICsgU3RkLmludChjb250YWN0Lm5vcm1hbC54KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFk6SW50ID0geSArIFN0ZC5pbnQoY29udGFjdC5ub3JtYWwueSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRDZWxsID0gZGF0YS5nZXQobmV4dFgsbmV4dFksMSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsJkNPTExJREFCTEU9PTApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5yZXNwb25kU3RhdGljQ29sbGlzaW9uKGNvbnRhY3QpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJveHkuY29udGFjdENhbGxiYWNrIT1udWxsKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm94eS5jb250YWN0Q2FsbGJhY2socHJveHksbnVsbCxjb250YWN0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gcHVibGljIGl0ZXJhdGVDZWxscyhhYWJiOmdsYXplLmdlb20uQUFCQjIsY2I6Z2xhemUuZ2VvbS5BQUJCLT5Wb2lkKSB7XG4gICAgLy8gICAgIHZhciBzdGFydFggPSBkYXRhLkluZGV4KGFhYmIubCk7XG4gICAgLy8gICAgIHZhciBzdGFydFkgPSBkYXRhLkluZGV4KGFhYmIudCk7XG5cbiAgICAvLyAgICAgdmFyIGVuZFggPSBkYXRhLkluZGV4KGFhYmIucikgKyAxO1xuICAgIC8vICAgICB2YXIgZW5kWSA9IGRhdGEuSW5kZXgoYWFiYi5iKSArIDE7XG5cbiAgICAvLyAgICAgdmFyIGFhYmJBcmcgPSBuZXcgZ2xhemUuZ2VvbS5BQUJCKCk7XG4gICAgLy8gICAgIGFhYmJBcmcuZXh0ZW50cy5zZXRUbyh0aWxlSGFsZlNpemUsdGlsZUhhbGZTaXplKTtcblxuICAgIC8vICAgICBmb3IgKHggaW4gc3RhcnRYLi4uZW5kWCkge1xuICAgIC8vICAgICAgICAgZm9yICh5IGluIHN0YXJ0WS4uLmVuZFkpIHtcbiAgICAvLyAgICAgICAgICAgICB2YXIgY2VsbCA9IGRhdGEuZ2V0KHgseSwwKTtcbiAgICAvLyAgICAgICAgICAgICBpZiAoY2VsbCZTT0xJRD09U09MSUQpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgYWFiYkFyZy5wb3NpdGlvbi5zZXRUbygoeCp0aWxlU2l6ZSkrdGlsZUhhbGZTaXplLCh5KnRpbGVTaXplKSt0aWxlSGFsZlNpemUpO1xuICAgIC8vICAgICAgICAgICAgICAgICBjYihhYWJiQXJnKTtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBwdWJsaWMgY2FzdFJheShyYXk6IFJheSk6IGJvb2xlYW4ge1xuICAgICAgICB2YXIgeCA9IHRoaXMuZGF0YS5JbmRleChyYXkub3JpZ2luLngpO1xuICAgICAgICB2YXIgeSA9IHRoaXMuZGF0YS5JbmRleChyYXkub3JpZ2luLnkpO1xuICAgICAgICB2YXIgY1ggPSB4ICogdGhpcy50aWxlU2l6ZTtcbiAgICAgICAgdmFyIGNZID0geSAqIHRoaXMudGlsZVNpemU7XG4gICAgICAgIHZhciBkID0gcmF5LmRpcmVjdGlvbjtcbiAgICAgICAgaWYgKGQueCA9PSAwLjAgJiYgZC55ID09IDAuMCkgcmV0dXJuIHRydWU7XG4gICAgICAgIHZhciBzdGVwWDogbnVtYmVyID0gMDtcbiAgICAgICAgdmFyIHRNYXhYOiBudW1iZXIgPSAxMDAwMDAwMDA7XG4gICAgICAgIHZhciB0RGVsdGFYOiBudW1iZXIgPSAwO1xuICAgICAgICBpZiAoZC54IDwgMCkge1xuICAgICAgICAgICAgc3RlcFggPSAtMTtcbiAgICAgICAgICAgIHRNYXhYID0gKGNYIC0gcmF5Lm9yaWdpbi54KSAvIGQueDtcbiAgICAgICAgICAgIHREZWx0YVggPSB0aGlzLnRpbGVTaXplIC8gLWQueDtcbiAgICAgICAgfSBlbHNlIGlmIChkLnggPiAwKSB7XG4gICAgICAgICAgICBzdGVwWCA9IDE7XG4gICAgICAgICAgICB0TWF4WCA9IChjWCArIHRoaXMudGlsZVNpemUgLSByYXkub3JpZ2luLngpIC8gZC54O1xuICAgICAgICAgICAgdERlbHRhWCA9IHRoaXMudGlsZVNpemUgLyBkLng7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RlcFk6IG51bWJlciA9IDA7XG4gICAgICAgIHZhciB0TWF4WTogbnVtYmVyID0gMTAwMDAwMDAwO1xuICAgICAgICB2YXIgdERlbHRhWTogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKGQueSA8IDApIHtcbiAgICAgICAgICAgIHN0ZXBZID0gLTE7XG4gICAgICAgICAgICB0TWF4WSA9IChjWSAtIHJheS5vcmlnaW4ueSkgLyBkLnk7XG4gICAgICAgICAgICB0RGVsdGFZID0gdGhpcy50aWxlU2l6ZSAvIC1kLnk7XG4gICAgICAgIH0gZWxzZSBpZiAoZC55ID4gMCkge1xuICAgICAgICAgICAgc3RlcFkgPSAxO1xuICAgICAgICAgICAgdE1heFkgPSAoY1kgKyB0aGlzLnRpbGVTaXplIC0gcmF5Lm9yaWdpbi55KSAvIGQueTtcbiAgICAgICAgICAgIHREZWx0YVkgPSB0aGlzLnRpbGVTaXplIC8gZC55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRpc3RYID0gMC4wO1xuICAgICAgICB2YXIgZGlzdFkgPSAwLjA7XG5cbiAgICAgICAgdmFyIHRyYW5zaXRpb25FZGdlTm9ybWFsWCA9IDA7XG4gICAgICAgIHZhciB0cmFuc2l0aW9uRWRnZU5vcm1hbFkgPSAwO1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBpZiAodE1heFggPCB0TWF4WSkge1xuICAgICAgICAgICAgICAgIGRpc3RYID0gdE1heFggKiBkLng7XG4gICAgICAgICAgICAgICAgZGlzdFkgPSB0TWF4WCAqIGQueTtcbiAgICAgICAgICAgICAgICB0TWF4WCArPSB0RGVsdGFYO1xuICAgICAgICAgICAgICAgIHggKz0gc3RlcFg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc3RYID0gdE1heFkgKiBkLng7XG4gICAgICAgICAgICAgICAgZGlzdFkgPSB0TWF4WSAqIGQueTtcbiAgICAgICAgICAgICAgICB0TWF4WSArPSB0RGVsdGFZO1xuICAgICAgICAgICAgICAgIHkgKz0gc3RlcFk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkaXN0WCAqIGRpc3RYICsgZGlzdFkgKiBkaXN0WSA+IHJheS5yYW5nZSAqIHJheS5yYW5nZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMuZGF0YS5nZXQoeCwgeSwgMCk7XG4gICAgICAgICAgICBpZiAoKHRpbGUgJiBTT0xJRCkgPT0gU09MSUQpIHtcbiAgICAgICAgICAgICAgICBpZiAodE1heFggPCB0TWF4WSkge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRWRnZU5vcm1hbFggPSBzdGVwWCA8IDAgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25FZGdlTm9ybWFsWSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVkZ2VOb3JtYWxYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVkZ2VOb3JtYWxZID0gc3RlcFkgPCAwID8gMSA6IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByYXkucmVwb3J0KGRpc3RYLCBkaXN0WSwgdHJhbnNpdGlvbkVkZ2VOb3JtYWxYLCB0cmFuc2l0aW9uRWRnZU5vcm1hbFkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3BoeXNpY3MvY29sbGlzaW9uL2Jyb2FkcGhhc2UvVGlsZU1hcENvbGxpc2lvbi50cyIsImltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi9WZWN0b3IyXCI7XG5cbmV4cG9ydCBjbGFzcyBTZWdtZW50IHtcbiAgICBwdWJsaWMgc3RhcnQ6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuICAgIHB1YmxpYyBlbmQ6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuICAgIHB1YmxpYyBkZWx0YTogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG4gICAgcHVibGljIHNjYWxlOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoKTtcbiAgICBwdWJsaWMgc2lnbjogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgc2V0KHM6IFZlY3RvcjIsIGU6IFZlY3RvcjIpIHtcbiAgICAgICAgdGhpcy5zdGFydC5jb3B5KHMpO1xuICAgICAgICB0aGlzLmVuZC5jb3B5KGUpO1xuICAgICAgICB0aGlzLmRlbHRhLmNvcHkodGhpcy5lbmQpO1xuICAgICAgICB0aGlzLmRlbHRhLm1pbnVzRXF1YWxzKHRoaXMuc3RhcnQpO1xuICAgICAgICB0aGlzLnNjYWxlLnNldFRvKDEgLyB0aGlzLmRlbHRhLngsIDEgLyB0aGlzLmRlbHRhLnkpO1xuICAgICAgICB0aGlzLnNpZ24ueCA9IHRoaXMuZGVsdGEueCA8IDAgPyAtMSA6IDE7XG4gICAgICAgIHRoaXMuc2lnbi55ID0gdGhpcy5kZWx0YS55IDwgMCA/IC0xIDogMTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZ2VvbS9TZWdtZW50LnRzIiwiaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuL1ZlY3RvcjJcIjtcblxuZXhwb3J0IGNsYXNzIFBsYW5lIHtcbiAgICBwdWJsaWMgbjogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG4gICAgcHVibGljIGQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgc2V0KG46IFZlY3RvcjIsIHE6IFZlY3RvcjIpIHtcbiAgICAgICAgdGhpcy5uLmNvcHkobik7XG4gICAgICAgIHRoaXMuZCA9IHRoaXMubi5kb3QocSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZyb21TZWdtZW50KHM6IFZlY3RvcjIsIGU6IFZlY3RvcjIpIHtcbiAgICAgICAgdGhpcy5uLmNvcHkocyk7XG4gICAgICAgIHRoaXMubi5taW51c0VxdWFscyhlKTtcbiAgICAgICAgdGhpcy5uLm5vcm1hbGl6ZSgpO1xuICAgICAgICB0aGlzLm4ubGVmdEhhbmROb3JtYWxFcXVhbHMoKTtcbiAgICAgICAgdGhpcy5kID0gdGhpcy5uLmRvdChzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzdGFuY2VQb2ludChxOiBWZWN0b3IyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubi5kb3QocSkgLSB0aGlzLmQ7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dlb20vUGxhbmUudHMiLCJpbXBvcnQgeyBJQnJvYWRwaGFzZSwgUXVlcnlDYWxsYmFjayB9IGZyb20gXCIuL0lCcm9hZHBoYXNlXCI7XG5pbXBvcnQgeyBCRlByb3h5IH0gZnJvbSBcIi4uL0JGUHJveHlcIjtcbmltcG9ydCB7IENvbGxpZGUsIFJheUFBQkIgfSBmcm9tIFwiLi4vSW50ZXJzZWN0XCI7XG5pbXBvcnQgeyBUaWxlTWFwQ29sbGlzaW9uIH0gZnJvbSBcIi4vVGlsZU1hcENvbGxpc2lvblwiO1xuaW1wb3J0IHsgQUFCQiB9IGZyb20gXCIuLi8uLi8uLi9nZW9tL0FBQkJcIjtcbmltcG9ydCB7IFJheSB9IGZyb20gXCIuLi9SYXlcIjtcblxuZXhwb3J0IGNsYXNzIEJydXRlZm9yY2VCcm9hZHBoYXNlIGltcGxlbWVudHMgSUJyb2FkcGhhc2Uge1xuICAgIHB1YmxpYyBzdGF0aWNQcm94aWVzOiBBcnJheTxCRlByb3h5PjtcbiAgICBwdWJsaWMgZHluYW1pY1Byb3hpZXM6IEFycmF5PEJGUHJveHk+O1xuICAgIHB1YmxpYyBzbGVlcGluZ1Byb3hpZXM6IEFycmF5PEJGUHJveHk+O1xuXG4gICAgcHVibGljIG1hcDogVGlsZU1hcENvbGxpc2lvbjtcblxuICAgIGNvbnN0cnVjdG9yKG1hcDogVGlsZU1hcENvbGxpc2lvbikge1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbiAgICAgICAgdGhpcy5zdGF0aWNQcm94aWVzID0gbmV3IEFycmF5PEJGUHJveHk+KCk7XG4gICAgICAgIHRoaXMuZHluYW1pY1Byb3hpZXMgPSBuZXcgQXJyYXk8QkZQcm94eT4oKTtcbiAgICAgICAgdGhpcy5zbGVlcGluZ1Byb3hpZXMgPSBuZXcgQXJyYXk8QkZQcm94eT4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUHJveHkocHJveHk6IEJGUHJveHkpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHByb3h5LmlzU3RhdGljID8gdGhpcy5zdGF0aWNQcm94aWVzIDogdGhpcy5keW5hbWljUHJveGllcztcbiAgICAgICAgdGFyZ2V0LnB1c2gocHJveHkpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVQcm94eShwcm94eTogQkZQcm94eSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gcHJveHkuaXNTdGF0aWMgPyB0aGlzLnN0YXRpY1Byb3hpZXMgOiB0aGlzLmR5bmFtaWNQcm94aWVzO1xuICAgICAgICB0YXJnZXQuc3BsaWNlKHRhcmdldC5pbmRleE9mKHByb3h5KSwgMSk7XG4gICAgICAgIC8vIHRhcmdldC5yZW1vdmUocHJveHkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xsaWRlKCkge1xuICAgICAgICAvL0xvb3AgYmFjayBvdmVyIHRoZSBwcm94aWVzXG4gICAgICAgIHZhciBpID0gdGhpcy5keW5hbWljUHJveGllcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgICAgICAgdmFyIGR5bmFtaWNQcm94eSA9IHRoaXMuZHluYW1pY1Byb3hpZXNbaV07XG5cbiAgICAgICAgICAgIC8vSGFzIGJvZHkgKHRoZXJlZm9yZSBpcyBpbiBjb250cm9sKVxuICAgICAgICAgICAgaWYgKGR5bmFtaWNQcm94eS5ib2R5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWR5bmFtaWNQcm94eS5pc1NlbnNvcilcbiAgICAgICAgICAgICAgICAgICAgLy9GaXJzdCB0ZXN0IGFnYWluc3QgbWFwXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLnRlc3RDb2xsaXNpb24oZHluYW1pY1Byb3h5KTtcbiAgICAgICAgICAgICAgICAvL2lmIGl0IGNhbiBzbGVlcCwgc2xlZXAgaXRcbiAgICAgICAgICAgICAgICBpZiAoZHluYW1pY1Byb3h5LmJvZHkuY2FuU2xlZXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGVlcChkeW5hbWljUHJveHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9OZXh0IHRlc3QgYWdhaW5zdCBhbGwgc3RhdGljIHByb3hpZXNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0aWNQcm94aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgQ29sbGlkZShkeW5hbWljUHJveHksIHRoaXMuc3RhdGljUHJveGllc1tpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vTm93IGNoZWNrIGFnYWluc3QgdGhlIHNsZWVwZXJzXG4gICAgICAgICAgICB2YXIgayA9IHRoaXMuc2xlZXBpbmdQcm94aWVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgtLWsgPj0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBzbGVlcGluZ1Byb3h5ID0gdGhpcy5zbGVlcGluZ1Byb3hpZXNba107XG4gICAgICAgICAgICAgICAgLy9pdHMgYXdha2Ugbm93P1xuICAgICAgICAgICAgICAgIGlmICghc2xlZXBpbmdQcm94eS5ib2R5LmNhblNsZWVwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FrZShzbGVlcGluZ1Byb3h5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBDb2xsaWRlKGR5bmFtaWNQcm94eSwgc2xlZXBpbmdQcm94eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0ZpbmFsbHkgdGVzdCBhZ2FpbnN0IGR5bmFtaWNcbiAgICAgICAgICAgIHZhciBqID0gaTtcbiAgICAgICAgICAgIHdoaWxlICgtLWogPj0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBkeW5hbWljUHJveHlCID0gdGhpcy5keW5hbWljUHJveGllc1tqXTtcbiAgICAgICAgICAgICAgICBDb2xsaWRlKGR5bmFtaWNQcm94eSwgZHluYW1pY1Byb3h5Qik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgUXVlcnlBcmVhKGFhYmI6IEFBQkIsIHJlc3VsdDogUXVlcnlDYWxsYmFjaywgY2hlY2tEeW5hbWljOiBib29sZWFuID0gdHJ1ZSwgY2hlY2tTdGF0aWM6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIGlmIChjaGVja0R5bmFtaWMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGVlcGluZ1Byb3hpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm94eSA9IHRoaXMuc2xlZXBpbmdQcm94aWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghcHJveHkuaXNTZW5zb3IgJiYgYWFiYi5vdmVybGFwKHByb3h5LmFhYmIpKSByZXN1bHQocHJveHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmR5bmFtaWNQcm94aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJveHkgPSB0aGlzLmR5bmFtaWNQcm94aWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghcHJveHkuaXNTZW5zb3IgJiYgYWFiYi5vdmVybGFwKHByb3h5LmFhYmIpKSByZXN1bHQocHJveHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrU3RhdGljKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGljUHJveGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gdGhpcy5zdGF0aWNQcm94aWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghcHJveHkuaXNTZW5zb3IgJiYgYWFiYi5vdmVybGFwKHByb3h5LmFhYmIpKSByZXN1bHQocHJveHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIENhc3RSYXkocmF5OiBSYXksIHJlc3VsdDogUXVlcnlDYWxsYmFjaywgY2hlY2tEeW5hbWljOiBib29sZWFuID0gdHJ1ZSwgY2hlY2tTdGF0aWM6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIHRoaXMubWFwLmNhc3RSYXkocmF5KTtcbiAgICAgICAgaWYgKGNoZWNrRHluYW1pYykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsZWVwaW5nUHJveGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gdGhpcy5zbGVlcGluZ1Byb3hpZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFwcm94eS5pc1NlbnNvcikgUmF5QUFCQihyYXksIHByb3h5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5keW5hbWljUHJveGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gdGhpcy5keW5hbWljUHJveGllc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXByb3h5LmlzU2Vuc29yKSBSYXlBQUJCKHJheSwgcHJveHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrU3RhdGljKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGljUHJveGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gdGhpcy5zdGF0aWNQcm94aWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghcHJveHkuaXNTZW5zb3IpIFJheUFBQkIocmF5LCBwcm94eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHVibGljIHdha2UocHJveHk6IEJGUHJveHkpIHtcbiAgICAgICAgdGhpcy5zbGVlcGluZ1Byb3hpZXMuc3BsaWNlKHRoaXMuc2xlZXBpbmdQcm94aWVzLmluZGV4T2YocHJveHkpLCAxKTtcbiAgICAgICAgLy8gdGhpcy5zbGVlcGluZ1Byb3hpZXMucmVtb3ZlKHByb3h5KTtcbiAgICAgICAgcHJveHkuYm9keS5pc1NsZWVwaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHluYW1pY1Byb3hpZXMucHVzaChwcm94eSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNsZWVwKHByb3h5OiBCRlByb3h5KSB7XG4gICAgICAgIHRoaXMuZHluYW1pY1Byb3hpZXMuc3BsaWNlKHRoaXMuZHluYW1pY1Byb3hpZXMuaW5kZXhPZihwcm94eSksIDEpO1xuICAgICAgICAvL3RoaXMuZHluYW1pY1Byb3hpZXMucmVtb3ZlKHByb3h5KTtcbiAgICAgICAgcHJveHkuYm9keS5pc1NsZWVwaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zbGVlcGluZ1Byb3hpZXMucHVzaChwcm94eSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3BoeXNpY3MvY29sbGlzaW9uL2Jyb2FkcGhhc2UvQnJ1dGVmb3JjZUJyb2FkcGhhc2UudHMiLCJpbXBvcnQgeyBTeXN0ZW0gfSBmcm9tIFwiLi4vLi4vZWNzL1N5c3RlbVwiO1xuaW1wb3J0IHsgSUJyb2FkcGhhc2UgfSBmcm9tIFwiLi4vY29sbGlzaW9uL2Jyb2FkcGhhc2UvSUJyb2FkcGhhc2VcIjtcbmltcG9ydCB7IEV4dGVudHMgfSBmcm9tIFwiLi4vLi4vY29yZS9jb21wb25lbnRzL0V4dGVudHNcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29tcG9uZW50cy9Qb3NpdGlvblwiO1xuaW1wb3J0IHsgUGh5c2ljc0NvbGxpc2lvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL1BoeXNpY3NDb2xsaXNpb25cIjtcbmltcG9ydCB7IEZpeGVkIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29tcG9uZW50cy9GaXhlZFwiO1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4uLy4uL2Vjcy9FbnRpdHlcIjtcblxuZXhwb3J0IGNsYXNzIFBoeXNpY3NTdGF0aWNTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHB1YmxpYyBicm9hZHBoYXNlOiBJQnJvYWRwaGFzZTtcblxuICAgIGNvbnN0cnVjdG9yKGJyb2FkcGhhc2U6IElCcm9hZHBoYXNlKSB7XG4gICAgICAgIHN1cGVyKFtQb3NpdGlvbiwgRXh0ZW50cywgUGh5c2ljc0NvbGxpc2lvbiwgRml4ZWRdKTtcbiAgICAgICAgdGhpcy5icm9hZHBoYXNlID0gYnJvYWRwaGFzZTtcbiAgICB9XG5cbiAgICBvbkVudGl0eUFkZGVkKFxuICAgICAgICBlbnRpdHk6IEVudGl0eSxcbiAgICAgICAgcG9zaXRpb246IFBvc2l0aW9uLFxuICAgICAgICBleHRlbnRzOiBFeHRlbnRzLFxuICAgICAgICBwaHlzaWNzQ29sbGlzaW9uOiBQaHlzaWNzQ29sbGlzaW9uLFxuICAgICAgICBmaXhlZDogRml4ZWQsXG4gICAgKSB7XG4gICAgICAgIC8vIHBvc2l0aW9uLnVwZGF0ZVBvc2l0aW9uID0gc2V0UG9zaXRpb247XG5cbiAgICAgICAgcGh5c2ljc0NvbGxpc2lvbi5wcm94eS5hYWJiLmV4dGVudHMuY29weShleHRlbnRzLmhhbGZXaWR0aHMpO1xuICAgICAgICBwaHlzaWNzQ29sbGlzaW9uLnByb3h5LmVudGl0eSA9IGVudGl0eTtcbiAgICAgICAgcGh5c2ljc0NvbGxpc2lvbi5wcm94eS5pc1N0YXRpYyA9IHRydWU7XG4gICAgICAgIHBoeXNpY3NDb2xsaXNpb24ucHJveHkuYWFiYi5wb3NpdGlvbiA9IHBvc2l0aW9uLmNvb3JkczsgLy9CZWNhdXNlIGl0cyBub3QgbGlua2VkIHRvIGEgYm9keVxuXG4gICAgICAgIHRoaXMuYnJvYWRwaGFzZS5hZGRQcm94eShwaHlzaWNzQ29sbGlzaW9uLnByb3h5KTtcbiAgICB9XG5cbiAgICBvbkVudGl0eVJlbW92ZWQoXG4gICAgICAgIGVudGl0eTogRW50aXR5LFxuICAgICAgICBwb3NpdGlvbjogUG9zaXRpb24sXG4gICAgICAgIGV4dGVudHM6IEV4dGVudHMsXG4gICAgICAgIHBoeXNpY3NDb2xsaXNpb246IFBoeXNpY3NDb2xsaXNpb24sXG4gICAgICAgIGZpeGVkOiBGaXhlZCxcbiAgICApIHtcbiAgICAgICAgdGhpcy5icm9hZHBoYXNlLnJlbW92ZVByb3h5KHBoeXNpY3NDb2xsaXNpb24ucHJveHkpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFsbEVudGl0aWVzKCkge31cblxuICAgIC8vIHB1YmxpYyBmdW5jdGlvbiBzZXRQb3NpdGlvbihlbnRpdHk6RW50aXR5LHBvc2l0aW9uOlZlY3RvcjIpIHtcbiAgICAvLyAgICAgdmFyIGJmcCA9IGVudGl0eS5nZXRDb21wb25lbnQoUGh5c2ljc0NvbGxpc2lvbikucHJveHk7XG4gICAgLy8gICAgIGJyb2FkcGhhc2UucmVtb3ZlUHJveHkoYmZwKTtcbiAgICAvLyAgICAgYmZwLmFhYmIucG9zaXRpb24gPSBlbnRpdHkuZ2V0Q29tcG9uZW50KFBvc2l0aW9uKS5jb29yZHM7XG4gICAgLy8gICAgIGJyb2FkcGhhc2UuYWRkUHJveHkoYmZwKTtcbiAgICAvLyB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvcGh5c2ljcy9zeXN0ZW1zL1BoeXNpY3NTdGF0aWNTeXN0ZW0udHMiLCJpbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uLy4uL2dlb20vVmVjdG9yMlwiO1xuaW1wb3J0IHsgQUFCQjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9BQUJCMlwiO1xuaW1wb3J0IHsgQUFCQiB9IGZyb20gXCIuLi8uLi9nZW9tL0FBQkJcIjtcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi8uLi9lY3MvRW50aXR5XCI7XG5pbXBvcnQgeyBDb250YWN0LCBDb250YWN0Q2FsbGJhY2sgfSBmcm9tIFwiLi9Db250YWN0XCI7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tIFwiLi9GaWx0ZXJcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwiLi4vQm9keVwiO1xuXG5leHBvcnQgY2xhc3MgQkZQcm94eSB7XG4gICAgcHVibGljIGlkOiBudW1iZXI7XG4gICAgc3RhdGljIG5leHRJRDogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBhYWJiOiBBQUJCO1xuXG4gICAgcHVibGljIG9mZnNldDogVmVjdG9yMjtcbiAgICBwdWJsaWMgcmVzcG9uc2VCaWFzOiBWZWN0b3IyO1xuXG4gICAgcHVibGljIGJvZHk6IEJvZHk7XG4gICAgcHVibGljIGVudGl0eTogRW50aXR5O1xuXG4gICAgcHVibGljIGlzU3RhdGljOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzU2Vuc29yOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzQWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgbGltaXRUb1N0YXRpY0NoZWNrOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgZmlsdGVyOiBGaWx0ZXI7XG5cbiAgICBwdWJsaWMgdXNlckRhdGExOiBudW1iZXIgPSAtMTtcbiAgICBwdWJsaWMgdXNlckRhdGEyOiBudW1iZXIgPSAtMTtcblxuICAgIHB1YmxpYyBjb250YWN0Q2FsbGJhY2tzOiBBcnJheTxDb250YWN0Q2FsbGJhY2s+ID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hYWJiID0gbmV3IEFBQkIoKTtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBuZXcgVmVjdG9yMigpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQmlhcyA9IG5ldyBWZWN0b3IyKDEsIDEpO1xuICAgICAgICB0aGlzLmlkID0gQkZQcm94eS5uZXh0SUQrKztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Qm9keShib2R5OiBCb2R5KSB7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHRoaXMuYWFiYi5wb3NpdGlvbiA9IGJvZHkucG9zaXRpb247XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTsgLy9ib2RpZXMgYXJlIGFsd2F5cyBkeW5hbWljXG4gICAgfVxuXG4gICAgcHVibGljIGNvbGxpZGUocHJveHk6IEJGUHJveHksIGNvbnRhY3Q6IENvbnRhY3QpIHtcbiAgICAgICAgdGhpcy5jb250YWN0Q2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodGhpcywgcHJveHksIGNvbnRhY3QpKTtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgc3RhdGljIGlubGluZSAgQ3JlYXRlU3RhdGljRmVhdHVyZSh4OkZsb2F0LHk6RmxvYXQsaHc6RmxvYXQsaGg6RmxvYXQsZmlsdGVyOkZpbHRlcik6QkZQcm94eSB7XG4gICAgLy8gICAgIHZhciBiZnByb3h5ID0gbmV3IEJGUHJveHkoKTtcbiAgICAvLyAgICAgYmZwcm94eS5hYWJiLmV4dGVudHMuc2V0VG8oaHcsaGgpO1xuICAgIC8vICAgICBiZnByb3h5LmZpbHRlciA9IGZpbHRlcjtcbiAgICAvLyAgICAgYmZwcm94eS5hYWJiLnBvc2l0aW9uLnNldFRvKHgseSk7XG4gICAgLy8gICAgIGJmcHJveHkuaXNTdGF0aWMgPSB0cnVlO1xuICAgIC8vICAgICByZXR1cm4gYmZwcm94eTtcbiAgICAvLyB9XG5cbiAgICBzdGF0aWMgSGFzaEJvZHlJRHMoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gYSA8IGIgPyAoYSA8PCAxNikgfCBiIDogKGIgPDwgMTYpIHwgYTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvcGh5c2ljcy9jb2xsaXNpb24vQkZQcm94eS50cyIsImltcG9ydCB7IElCcm9hZHBoYXNlIH0gZnJvbSBcIi4uL2NvbGxpc2lvbi9icm9hZHBoYXNlL0lCcm9hZHBoYXNlXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbXBvbmVudHMvUG9zaXRpb25cIjtcbmltcG9ydCB7IEV4dGVudHMgfSBmcm9tIFwiLi4vLi4vY29yZS9jb21wb25lbnRzL0V4dGVudHNcIjtcbmltcG9ydCB7IFBoeXNpY3NDb2xsaXNpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9QaHlzaWNzQ29sbGlzaW9uXCI7XG5pbXBvcnQgeyBNb3ZlYWJsZSB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbXBvbmVudHMvTW92ZWFibGVcIjtcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi8uLi9lY3MvRW50aXR5XCI7XG5pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tIFwiLi4vLi4vZWNzL1N5c3RlbVwiO1xuXG5leHBvcnQgY2xhc3MgUGh5c2ljc01vdmVhYmxlU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICBwdWJsaWMgYnJvYWRwaGFzZTogSUJyb2FkcGhhc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihicm9hZHBoYXNlOiBJQnJvYWRwaGFzZSkge1xuICAgICAgICBzdXBlcihbUG9zaXRpb24sIEV4dGVudHMsIFBoeXNpY3NDb2xsaXNpb24sIE1vdmVhYmxlXSk7XG4gICAgICAgIHRoaXMuYnJvYWRwaGFzZSA9IGJyb2FkcGhhc2U7XG4gICAgfVxuXG4gICAgb25FbnRpdHlBZGRlZChcbiAgICAgICAgZW50aXR5OiBFbnRpdHksXG4gICAgICAgIHBvc2l0aW9uOiBQb3NpdGlvbixcbiAgICAgICAgZXh0ZW50czogRXh0ZW50cyxcbiAgICAgICAgcGh5c2ljc0NvbGxpc2lvbjogUGh5c2ljc0NvbGxpc2lvbixcbiAgICAgICAgbW92ZWFibGU6IE1vdmVhYmxlLFxuICAgICkge1xuICAgICAgICBwaHlzaWNzQ29sbGlzaW9uLnByb3h5LmFhYmIuZXh0ZW50cy5jb3B5KGV4dGVudHMuaGFsZldpZHRocyk7XG4gICAgICAgIHBoeXNpY3NDb2xsaXNpb24ucHJveHkuaXNTdGF0aWMgPSBmYWxzZTtcbiAgICAgICAgcGh5c2ljc0NvbGxpc2lvbi5wcm94eS5lbnRpdHkgPSBlbnRpdHk7XG4gICAgICAgIHBoeXNpY3NDb2xsaXNpb24ucHJveHkuYWFiYi5wb3NpdGlvbiA9IHBvc2l0aW9uLmNvb3JkczsgLy9CZWNhdXNlIGl0cyBub3QgbGlua2VkIHRvIGEgYm9keSBCVVQgaXQgY291bGQgY2F1c2UgYW4gaXNzdWU/XG5cbiAgICAgICAgdGhpcy5icm9hZHBoYXNlLmFkZFByb3h5KHBoeXNpY3NDb2xsaXNpb24ucHJveHkpO1xuICAgIH1cblxuICAgIG9uRW50aXR5UmVtb3ZlZChcbiAgICAgICAgZW50aXR5OiBFbnRpdHksXG4gICAgICAgIHBvc2l0aW9uOiBQb3NpdGlvbixcbiAgICAgICAgZXh0ZW50czogRXh0ZW50cyxcbiAgICAgICAgcGh5c2ljc0NvbGxpc2lvbjogUGh5c2ljc0NvbGxpc2lvbixcbiAgICAgICAgbW92ZWFibGU6IE1vdmVhYmxlLFxuICAgICkge1xuICAgICAgICB0aGlzLmJyb2FkcGhhc2UucmVtb3ZlUHJveHkocGh5c2ljc0NvbGxpc2lvbi5wcm94eSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWxsRW50aXRpZXMoKSB7fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3BoeXNpY3Mvc3lzdGVtcy9QaHlzaWNzTW92ZWFibGVTeXN0ZW0udHMiLCJpbXBvcnQgeyBJQnJvYWRwaGFzZSB9IGZyb20gXCIuLi9jb2xsaXNpb24vYnJvYWRwaGFzZS9JQnJvYWRwaGFzZVwiO1xuaW1wb3J0IHsgUGh5c2ljc0NvbGxpc2lvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL1BoeXNpY3NDb2xsaXNpb25cIjtcbmltcG9ydCB7IFBoeXNpY3NCb2R5IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUGh5c2ljc0JvZHlcIjtcbmltcG9ydCB7IE1vdmVhYmxlIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29tcG9uZW50cy9Nb3ZlYWJsZVwiO1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4uLy4uL2Vjcy9FbnRpdHlcIjtcbmltcG9ydCB7IFN5c3RlbSB9IGZyb20gXCIuLi8uLi9lY3MvU3lzdGVtXCI7XG5cbmV4cG9ydCBjbGFzcyBQaHlzaWNzQ29sbGlzaW9uU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICBwdWJsaWMgYnJvYWRwaGFzZTogSUJyb2FkcGhhc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihicm9hZHBoYXNlOiBJQnJvYWRwaGFzZSkge1xuICAgICAgICBzdXBlcihbUGh5c2ljc0NvbGxpc2lvbiwgUGh5c2ljc0JvZHksIE1vdmVhYmxlXSk7XG4gICAgICAgIHRoaXMuYnJvYWRwaGFzZSA9IGJyb2FkcGhhc2U7XG4gICAgfVxuXG4gICAgb25FbnRpdHlBZGRlZChlbnRpdHk6IEVudGl0eSwgcGh5c2ljc0NvbGxpc2lvbjogUGh5c2ljc0NvbGxpc2lvbiwgcGh5c2ljc0JvZHk6IFBoeXNpY3NCb2R5LCBtb3ZlYWJsZTogTW92ZWFibGUpIHtcbiAgICAgICAgLy9BbGwgdGhpcyByZWFsbHkgZG9lcyBpcyBhZGQgdGhlIGJvZHkgdG8gdGhlIHByb3h5IGFuZCBydW4gdGhlIHBoeXNpY3NcbiAgICAgICAgcGh5c2ljc0NvbGxpc2lvbi5wcm94eS5zZXRCb2R5KHBoeXNpY3NCb2R5LmJvZHkpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFsbEVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLmJyb2FkcGhhc2UuY29sbGlkZSgpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9waHlzaWNzL3N5c3RlbXMvUGh5c2ljc0NvbGxpc2lvblN5c3RlbS50cyIsImltcG9ydCB7IFN5c3RlbSB9IGZyb20gXCIuLi8uLi9lY3MvU3lzdGVtXCI7XG5pbXBvcnQgeyBQaHlzaWNzQm9keSB9IGZyb20gXCIuLi9jb21wb25lbnRzL1BoeXNpY3NCb2R5XCI7XG5pbXBvcnQgeyBFeHRlbnRzIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29tcG9uZW50cy9FeHRlbnRzXCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi4vLi4vZWNzL0VudGl0eVwiO1xuXG5leHBvcnQgY2xhc3MgUGh5c2ljc01hc3NTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihbUGh5c2ljc0JvZHksIEV4dGVudHNdKTtcbiAgICB9XG5cbiAgICBvbkVudGl0eUFkZGVkKGVudGl0eTogRW50aXR5LCBwaHlzaWNzQm9keTogUGh5c2ljc0JvZHksIGV4dGVudHM6IEV4dGVudHMpIHtcbiAgICAgICAgaWYgKHBoeXNpY3NCb2R5LnNldE1hc3NGcm9tVm9sdW1lKSB7XG4gICAgICAgICAgICBwaHlzaWNzQm9keS5ib2R5LnNldE1hc3NGcm9tVm9sdW1lTWF0ZXJpYWwoZXh0ZW50cy5oYWxmV2lkdGhzLnggKiBleHRlbnRzLmhhbGZXaWR0aHMueSAqIDQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3BoeXNpY3Mvc3lzdGVtcy9QaHlzaWNzTWFzc1N5c3RlbS50cyIsImltcG9ydCB7IFN5c3RlbSB9IGZyb20gXCIuLi8uLi9lY3MvU3lzdGVtXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbXBvbmVudHMvUG9zaXRpb25cIjtcbmltcG9ydCB7IFBoeXNpY3NCb2R5IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUGh5c2ljc0JvZHlcIjtcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi8uLi9lY3MvRW50aXR5XCI7XG5cbmV4cG9ydCBjbGFzcyBQaHlzaWNzUG9zaXRpb25TeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihbUG9zaXRpb24sIFBoeXNpY3NCb2R5XSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRW50aXR5KGVudGl0eTogRW50aXR5LCBwb3NpdGlvbjogUG9zaXRpb24sIHBoeXNpY3NCb2R5OiBQaHlzaWNzQm9keSkge1xuICAgICAgICBwaHlzaWNzQm9keS5ib2R5LnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHBvc2l0aW9uLnVwZGF0ZShwaHlzaWNzQm9keS5ib2R5LnBvc2l0aW9uKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvcGh5c2ljcy9zeXN0ZW1zL1BoeXNpY3NQb3NpdGlvblN5c3RlbS50cyIsImltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL01hdGVyaWFsXCI7XG5pbXBvcnQgeyBDb250YWN0IH0gZnJvbSBcIi4vY29sbGlzaW9uL0NvbnRhY3RcIjtcblxuY29uc3QgU0xFRVBfQklBUzogbnVtYmVyID0gMC45OTMzMjgwNTA0MTQ2NztcbmNvbnN0IFNMRUVQX0VQU0lMT046IG51bWJlciA9IDAuMDAwOTtcbmNvbnN0IFdBS0VfTU9USU9OOiBudW1iZXIgPSAxMDtcbmNvbnN0IE1BU1NfU0NBTEU6IG51bWJlciA9IDEgLyAxMDtcblxuZXhwb3J0IGNsYXNzIEJvZHkge1xuICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG4gICAgcHVibGljIHBvc2l0aW9uQ29ycmVjdGlvbjogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG4gICAgcHVibGljIHByZWRpY3RlZFBvc2l0aW9uOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoKTtcbiAgICBwdWJsaWMgZGVsdGE6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuICAgIHB1YmxpYyBwcmV2aW91c1Bvc2l0aW9uOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIHB1YmxpYyB2ZWxvY2l0eTogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG4gICAgcHVibGljIG9yaWdpbmFsVmVsb2NpdHk6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuICAgIHB1YmxpYyBwcmV2aW91c1ZlbG9jaXR5OiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoKTtcblxuICAgIHB1YmxpYyBjb250YWN0Tm9ybWFsOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoKTtcbiAgICBwdWJsaWMgcHJldkNvbnRhY3ROb3JtYWw6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgcHVibGljIHRhbmdlbnQ6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xuICAgIHB1YmxpYyB0b2k6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGVwQ29udGFjdENvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIG1heFNjYWxhclZlbG9jaXR5OiBudW1iZXIgPSAxMDAwO1xuICAgIHB1YmxpYyBtYXhWZWxvY2l0eTogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBwdWJsaWMgbWF0ZXJpYWw6IE1hdGVyaWFsO1xuXG4gICAgcHVibGljIGZvcmNlczogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG4gICAgcHJpdmF0ZSBhY2N1bXVsYXRlZEZvcmNlczogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKCk7XG5cbiAgICBwdWJsaWMgaXNCdWxsZXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBkYW1waW5nOiBudW1iZXIgPSAxO1xuICAgIHB1YmxpYyBnbG9iYWxGb3JjZUZhY3RvcjogbnVtYmVyID0gMTtcblxuICAgIHB1YmxpYyBtYXNzOiBudW1iZXIgPSAxO1xuICAgIHB1YmxpYyBpbnZNYXNzOiBudW1iZXIgPSAxO1xuXG4gICAgcHVibGljIGR0OiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIG1vdGlvbjogbnVtYmVyID0gV0FLRV9NT1RJT047XG4gICAgcHVibGljIGNhblNsZWVwOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzU2xlZXBpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBvbkdyb3VuZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBvbkdyb3VuZFByZXY6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBpbldhdGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGluV2F0ZXJQcmV2OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHVzZXNTdGFpcnM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBjb2xsaWRlT25lV2F5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHB1YmxpYyB0b3RhbEJvdW5jZUNvdW50OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBib3VuY2VDb3VudDogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBkZWJ1ZzogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBza2lwOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBwdWJsaWMgdmFyIHN3ZWVwOkFBQkIyID0gbmV3IGdsYXplLmdlb20uQUFCQjIoKTtcblxuICAgIGNvbnN0cnVjdG9yKG1hdGVyaWFsOiBNYXRlcmlhbCA9IG51bGwsIG1hc3M6IG51bWJlciA9IDEpIHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsID09IG51bGwgPyBuZXcgTWF0ZXJpYWwoKSA6IG1hdGVyaWFsO1xuICAgICAgICB0aGlzLnNldE1hc3MobWFzcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyLCBnbG9iYWxGb3JjZXM6IFZlY3RvcjIsIGdsb2JhbERhbXBpbmc6IG51bWJlcikge1xuICAgICAgICB0aGlzLmR0ID0gZHQ7XG4gICAgICAgIHRoaXMub25Hcm91bmRQcmV2ID0gdGhpcy5vbkdyb3VuZDtcbiAgICAgICAgdGhpcy5vbkdyb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluV2F0ZXJQcmV2ID0gdGhpcy5pbldhdGVyO1xuICAgICAgICB0aGlzLmluV2F0ZXIgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5za2lwIHx8IHRoaXMuaXNTbGVlcGluZykgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMubW90aW9uID0gU0xFRVBfQklBUyAqIHRoaXMubW90aW9uICsgKDEgLSBTTEVFUF9CSUFTKSAqIHRoaXMudmVsb2NpdHkubGVuZ3RoU3FyZCgpO1xuICAgICAgICB0aGlzLm1vdGlvbiA9IE1hdGgubWluKHRoaXMubW90aW9uLCAxMCAqIFNMRUVQX0VQU0lMT04pO1xuICAgICAgICB0aGlzLmNhblNsZWVwID0gdGhpcy5tb3Rpb24gPCBTTEVFUF9FUFNJTE9OO1xuXG4gICAgICAgIHRoaXMucHJldmlvdXNWZWxvY2l0eS5jb3B5KHRoaXMudmVsb2NpdHkpO1xuXG4gICAgICAgIC8vQWRkIGdsb2JhbCBmb3JjZXMgdG8gbG9jYWwgb25lc1xuICAgICAgICB0aGlzLmZvcmNlcy5wbHVzTXVsdEVxdWFscyhnbG9iYWxGb3JjZXMsIHRoaXMuZ2xvYmFsRm9yY2VGYWN0b3IpO1xuICAgICAgICB0aGlzLnZlbG9jaXR5LnBsdXNFcXVhbHModGhpcy5mb3JjZXMpO1xuICAgICAgICB0aGlzLnZlbG9jaXR5Lm11bHRFcXVhbHMoZ2xvYmFsRGFtcGluZyAqIHRoaXMuZGFtcGluZyk7XG5cbiAgICAgICAgLy9XaGljaCB2ZWxvY2l0eSBsaW1pdGluZyB0eXBlP1xuICAgICAgICAvLyBpZiAoIWlzQnVsbGV0KSB7XG4gICAgICAgIGlmICh0aGlzLm1heFNjYWxhclZlbG9jaXR5ID4gMCkge1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS5jbGFtcFNjYWxhcih0aGlzLm1heFNjYWxhclZlbG9jaXR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkuY2xhbXBWZWN0b3IodGhpcy5tYXhWZWxvY2l0eSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMub3JpZ2luYWxWZWxvY2l0eS5jb3B5KHRoaXMudmVsb2NpdHkpO1xuXG4gICAgICAgIHRoaXMucHJlZGljdGVkUG9zaXRpb24uY29weSh0aGlzLnBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5wcmVkaWN0ZWRQb3NpdGlvbi5wbHVzTXVsdEVxdWFscyh0aGlzLnZlbG9jaXR5LCBkdCk7XG4gICAgICAgIHRoaXMucHJldmlvdXNQb3NpdGlvbi5jb3B5KHRoaXMucG9zaXRpb24pO1xuXG4gICAgICAgIHRoaXMuZGVsdGEuY29weSh0aGlzLnByZWRpY3RlZFBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5kZWx0YS5taW51c0VxdWFscyh0aGlzLnBvc2l0aW9uKTtcblxuICAgICAgICB0aGlzLnByZXZDb250YWN0Tm9ybWFsLmNvcHkodGhpcy5jb250YWN0Tm9ybWFsKTtcbiAgICAgICAgdGhpcy5jb250YWN0Tm9ybWFsLnNldFRvKDAsIDApO1xuXG4gICAgICAgIHRoaXMuZm9yY2VzLnNldFRvKDAsIDApO1xuICAgICAgICB0aGlzLmRhbXBpbmcgPSAxO1xuXG4gICAgICAgIHRoaXMuc3RlcENvbnRhY3RDb3VudCA9IDA7XG5cbiAgICAgICAgdGhpcy50b2kgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc3BvbmRTdGF0aWNDb2xsaXNpb24oY29udGFjdDogQ29udGFjdCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5za2lwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBzZXBlcmF0aW9uID0gTWF0aC5tYXgoY29udGFjdC5kaXN0YW5jZSwgMCk7XG4gICAgICAgIHZhciBwZW5ldHJhdGlvbiA9IE1hdGgubWluKGNvbnRhY3QuZGlzdGFuY2UsIDApO1xuXG4gICAgICAgIC8vcG9zaXRpb25Db3JyZWN0aW9uLnggLT0gY29udGFjdC5ub3JtYWwueCAqIChwZW5ldHJhdGlvbi9kdCk7XG4gICAgICAgIC8vcG9zaXRpb25Db3JyZWN0aW9uLnkgLT0gY29udGFjdC5ub3JtYWwueSAqIChwZW5ldHJhdGlvbi9kdCk7XG4gICAgICAgIHRoaXMucG9zaXRpb25Db3JyZWN0aW9uLm1pbnVzTXVsdEVxdWFscyhjb250YWN0Lm5vcm1hbCwgcGVuZXRyYXRpb24gLyB0aGlzLmR0KTtcblxuICAgICAgICB2YXIgbnYgPSB0aGlzLnZlbG9jaXR5LmRvdChjb250YWN0Lm5vcm1hbCkgKyBzZXBlcmF0aW9uIC8gdGhpcy5kdDtcblxuICAgICAgICBpZiAobnYgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXBDb250YWN0Q291bnQrKztcblxuICAgICAgICAgICAgLy9DYW5jZWwgbm9ybWFsIHZlbFxuICAgICAgICAgICAgLy8gdmVsb2NpdHkueCAtPSBjb250YWN0Lm5vcm1hbC54ICogbnY7XG4gICAgICAgICAgICAvLyB2ZWxvY2l0eS55IC09IGNvbnRhY3Qubm9ybWFsLnkgKiBudjtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkubWludXNNdWx0RXF1YWxzKGNvbnRhY3Qubm9ybWFsLCBudik7XG5cbiAgICAgICAgICAgIC8vSXRlbSBkb2VzbnQgYm91bmNlPyBTdXJmYWNlIGlzIHVwZHdhcmRzP1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbkJvdW5jZSAmJiBjb250YWN0Lm5vcm1hbC55IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Hcm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vQXBwbHkgRnJpY3Rpb24gaGVyZT9cbiAgICAgICAgICAgICAgICAvLyB2YXIgdGFuZ2VudDpWZWN0b3IyID0gY29udGFjdC5ub3JtYWwucmlnaHRIYW5kTm9ybWFsKCk7XG4gICAgICAgICAgICAgICAgLy8gdmFyIHR2Om51bWJlciA9IHZlbG9jaXR5LmRvdCh0YW5nZW50KSAqIG1hdGVyaWFsLmZyaWN0aW9uO1xuICAgICAgICAgICAgICAgIC8vIHZlbG9jaXR5LnggLT0gdGFuZ2VudC54ICogdHY7XG4gICAgICAgICAgICAgICAgLy8gdmVsb2NpdHkueSAtPSB0YW5nZW50LnkgKiB0djtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9zdG9yZSBjb250YWN0IG5vcm1hbCBmb3IgbGF0ZXIgcmVmbGVjdGlvblxuICAgICAgICAgICAgdGhpcy5jb250YWN0Tm9ybWFsLmNvcHkoY29udGFjdC5ub3JtYWwpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHQobXNnOiBTdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVidWcgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlYnVnLS07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzcG9uZEJ1bGxldENvbGxpc2lvbihjb250YWN0OiBDb250YWN0KTogYm9vbGVhbiB7XG4gICAgICAgIC8vUmVjb3JkIHRoZSBjbG9zZXN0IHRpbWVcbiAgICAgICAgaWYgKGNvbnRhY3QudGltZSA8PSB0aGlzLnRvaSkge1xuICAgICAgICAgICAgdGhpcy50b2kgPSBjb250YWN0LnRpbWU7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uQ29ycmVjdGlvbi5jb3B5KGNvbnRhY3Quc3dlZXBQb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLmNvbnRhY3ROb3JtYWwuY29weShjb250YWN0Lm5vcm1hbCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5za2lwIHx8IHRoaXMuaXNTbGVlcGluZykgcmV0dXJuO1xuICAgICAgICAvL0l0cyBhIGJ1bGxldCBhbmQgaXQgaGl0IHNvbWV0aGluZz9cbiAgICAgICAgaWYgKHRoaXMuaXNCdWxsZXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRvaSA8IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24uY29weSh0aGlzLnBvc2l0aW9uQ29ycmVjdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFZlbG9jaXR5LnJlZmxlY3RFcXVhbHModGhpcy5jb250YWN0Tm9ybWFsKTtcbiAgICAgICAgICAgICAgICAvL0ZpeG1lXG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFZlbG9jaXR5Lm11bHRFcXVhbHModGhpcy5tYXRlcmlhbC5lbGFzdGljaXR5KTtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5LmNvcHkodGhpcy5vcmlnaW5hbFZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHRoaXMucHJlZGljdGVkUG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9UaGlzIGJvZHkgaXNudCBhIGJ1bGxldCBzby4uLlxuXG4gICAgICAgIC8vYXBwbHkgRnJpY3Rpb24gaGVyZVxuICAgICAgICBpZiAodGhpcy5zdGVwQ29udGFjdENvdW50ID4gMCAmJiAhdGhpcy5jYW5Cb3VuY2UgJiYgdGhpcy5jb250YWN0Tm9ybWFsLnkgPCAwKSB7XG4gICAgICAgICAgICAvLyBpZiAoc3RlcENvbnRhY3RDb3VudD4wICYmIGNvbnRhY3ROb3JtYWwueSA8IDApIHtcbiAgICAgICAgICAgIC8vb25Hcm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gdmFyIHRhbmdlbnQ6VmVjdG9yMiA9IGNvbnRhY3ROb3JtYWwucmlnaHRIYW5kTm9ybWFsKCk7XG4gICAgICAgICAgICB0aGlzLnRhbmdlbnQuY29weSh0aGlzLmNvbnRhY3ROb3JtYWwpO1xuICAgICAgICAgICAgdGhpcy50YW5nZW50LnJpZ2h0SGFuZE5vcm1hbEVxdWFscygpO1xuICAgICAgICAgICAgdmFyIHR2OiBudW1iZXIgPSB0aGlzLm9yaWdpbmFsVmVsb2NpdHkuZG90KHRoaXMudGFuZ2VudCkgKiB0aGlzLm1hdGVyaWFsLmZyaWN0aW9uO1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS54IC09IHRoaXMudGFuZ2VudC54ICogdHY7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnkgLT0gdGhpcy50YW5nZW50LnkgKiB0djtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9zaXRpb25Db3JyZWN0aW9uLnBsdXNFcXVhbHModGhpcy52ZWxvY2l0eSk7XG4gICAgICAgIHRoaXMucG9zaXRpb25Db3JyZWN0aW9uLm11bHRFcXVhbHModGhpcy5kdCk7XG4gICAgICAgIHRoaXMucG9zaXRpb24ucGx1c0VxdWFscyh0aGlzLnBvc2l0aW9uQ29ycmVjdGlvbik7XG4gICAgICAgIHRoaXMucG9zaXRpb25Db3JyZWN0aW9uLnNldFRvKDAsIDApO1xuXG4gICAgICAgIC8vQW55dGhpbmcgaGl0PyBBbnkgYm91bmNlcyBsZWZ0P1xuICAgICAgICBpZiAodGhpcy5zdGVwQ29udGFjdENvdW50ID4gMCAmJiB0aGlzLmNhbkJvdW5jZSkge1xuICAgICAgICAgICAgLy9SZWZsZWN0IGl0Li4uXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsVmVsb2NpdHkucmVmbGVjdEVxdWFscyh0aGlzLmNvbnRhY3ROb3JtYWwpO1xuICAgICAgICAgICAgLy9SZW1vdmUgdmVsb2NpdHlcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxWZWxvY2l0eS5tdWx0RXF1YWxzKHRoaXMubWF0ZXJpYWwuZWxhc3RpY2l0eSk7XG4gICAgICAgICAgICAvL1NldCB0aGUgbmV3IHZlbG9jaXR5XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LmNvcHkodGhpcy5vcmlnaW5hbFZlbG9jaXR5KTtcbiAgICAgICAgICAgIHRoaXMuYm91bmNlQ291bnQrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRGb3JjZShmOiBWZWN0b3IyKSB7XG4gICAgICAgIHRoaXMuZm9yY2VzLnBsdXNNdWx0RXF1YWxzKGYsIHRoaXMuaW52TWFzcyk7XG4gICAgICAgIHRoaXMud2FrZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRNYXNzbGVzc0ZvcmNlKGY6IFZlY3RvcjIpIHtcbiAgICAgICAgdGhpcy5mb3JjZXMucGx1c0VxdWFscyhmKTtcbiAgICAgICAgdGhpcy53YWtlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFByb3BvcnRpb25hbEZvcmNlKGY6IFZlY3RvcjIpIHtcbiAgICAgICAgdGhpcy5mb3JjZXMucGx1c011bHRFcXVhbHMoZiwgdGhpcy5tYXNzKTtcbiAgICAgICAgdGhpcy53YWtlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1hc3MobWFzcykge1xuICAgICAgICB0aGlzLm1hc3MgPSBtYXNzO1xuICAgICAgICB0aGlzLmludk1hc3MgPSAxIC8gbWFzcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TWFzc0Zyb21Wb2x1bWVNYXRlcmlhbCh2b2x1bWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldE1hc3ModGhpcy5tYXRlcmlhbC5kZW5zaXR5ICogdm9sdW1lICogTUFTU19TQ0FMRSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFN0YXRpY1Bvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24uc2V0VG8oeCwgeSk7XG4gICAgICAgIHRoaXMucG9zaXRpb25Db3JyZWN0aW9uLnNldFRvKDAsIDApO1xuICAgICAgICB0aGlzLnByZWRpY3RlZFBvc2l0aW9uLnNldFRvKDAsIDApO1xuICAgICAgICB0aGlzLmZvcmNlcy5zZXRUbygwLCAwKTtcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlZEZvcmNlcy5zZXRUbygwLCAwKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5zZXRUbygwLCAwKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFZlbG9jaXR5LnNldFRvKDAsIDApO1xuICAgICAgICB0aGlzLmRlbHRhLnNldFRvKDAsIDApO1xuICAgICAgICB0aGlzLndha2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Qm91bmNlcyhjb3VudDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudG90YWxCb3VuY2VDb3VudCA9IGNvdW50O1xuICAgICAgICB0aGlzLmJvdW5jZUNvdW50ID0gMDtcbiAgICB9XG5cbiAgICBnZXQgY2FuQm91bmNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50b3RhbEJvdW5jZUNvdW50ICE9IDAgJiYgdGhpcy5ib3VuY2VDb3VudCA8IHRoaXMudG90YWxCb3VuY2VDb3VudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FrZSgpIHtcbiAgICAgICAgdGhpcy5jYW5TbGVlcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdGlvbiA9IFdBS0VfTU9USU9OO1xuICAgICAgICB0aGlzLmJvdW5jZUNvdW50ID0gMDtcbiAgICB9XG5cbiAgICBnZXQgZG93bigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFjdE5vcm1hbC55IDwgMDtcbiAgICB9XG4gICAgZ2V0IGRvd25QcmV2KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmV2Q29udGFjdE5vcm1hbC55IDwgMDtcbiAgICB9XG4gICAgZ2V0IHVwKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWN0Tm9ybWFsLnkgPiAwO1xuICAgIH1cbiAgICBnZXQgdXBQcmV2KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmV2Q29udGFjdE5vcm1hbC55ID4gMDtcbiAgICB9XG4gICAgZ2V0IGxlZnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhY3ROb3JtYWwueCA8IDA7XG4gICAgfVxuICAgIGdldCBsZWZ0UHJldigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldkNvbnRhY3ROb3JtYWwueCA8IDA7XG4gICAgfVxuICAgIGdldCByaWdodCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFjdE5vcm1hbC54ID4gMDtcbiAgICB9XG4gICAgZ2V0IHJpZ2h0UHJldigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldkNvbnRhY3ROb3JtYWwueCA+IDA7XG4gICAgfVxuXG4gICAgc3RhdGljIENyZWF0ZShcbiAgICAgICAgbWF0ZXJpYWw6IE1hdGVyaWFsLFxuICAgICAgICBtYXNzOiBudW1iZXIsXG4gICAgICAgIGJvdW5jZXM6IG51bWJlcixcbiAgICAgICAgZ2xvYmFsRm9yY2VGYWN0b3I6IG51bWJlcixcbiAgICAgICAgbWF4U2NhbGFyVmVsb2NpdHk6IG51bWJlcixcbiAgICApOiBCb2R5IHtcbiAgICAgICAgdmFyIGJvZHkgPSBuZXcgQm9keShtYXRlcmlhbCk7XG4gICAgICAgIGJvZHkuc2V0TWFzcyhtYXNzKTtcbiAgICAgICAgYm9keS5zZXRCb3VuY2VzKGJvdW5jZXMpO1xuICAgICAgICBib2R5Lmdsb2JhbEZvcmNlRmFjdG9yID0gZ2xvYmFsRm9yY2VGYWN0b3I7XG4gICAgICAgIGJvZHkubWF4U2NhbGFyVmVsb2NpdHkgPSBtYXhTY2FsYXJWZWxvY2l0eTtcbiAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3BoeXNpY3MvQm9keS50cyIsImltcG9ydCB7IFN5c3RlbSB9IGZyb20gXCIuLi8uLi9lY3MvU3lzdGVtXCI7XG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uLy4uL2dlb20vVmVjdG9yMlwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vY29yZS9jb21wb25lbnRzL1Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBQaHlzaWNzQm9keSB9IGZyb20gXCIuLi9jb21wb25lbnRzL1BoeXNpY3NCb2R5XCI7XG5pbXBvcnQgeyBBY3RpdmUgfSBmcm9tIFwiLi4vLi4vY29yZS9jb21wb25lbnRzL0FjdGl2ZVwiO1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4uLy4uL2Vjcy9FbnRpdHlcIjtcblxuZXhwb3J0IGNsYXNzIFBoeXNpY3NVcGRhdGVTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHB1YmxpYyBnbG9iYWxGb3JjZTogVmVjdG9yMjtcbiAgICBwdWJsaWMgZ2xvYmFsRGFtcGluZzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFtQb3NpdGlvbiwgUGh5c2ljc0JvZHksIEFjdGl2ZV0pO1xuICAgICAgICB0aGlzLmdsb2JhbEZvcmNlID0gbmV3IFZlY3RvcjIoMCwgMTApO1xuICAgICAgICB0aGlzLmdsb2JhbERhbXBpbmcgPSAwLjk5O1xuICAgIH1cblxuICAgIG9uRW50aXR5QWRkZWQoZW50aXR5OiBFbnRpdHksIHBvc2l0aW9uOiBQb3NpdGlvbiwgcGh5c2ljc0JvZHk6IFBoeXNpY3NCb2R5LCBhY3RpdmU6IEFjdGl2ZSkge1xuICAgICAgICBwaHlzaWNzQm9keS5ib2R5LnBvc2l0aW9uLmNvcHkocG9zaXRpb24uY29vcmRzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVFbnRpdHkoZW50aXR5OiBFbnRpdHksIHBvc2l0aW9uOiBQb3NpdGlvbiwgcGh5c2ljc0JvZHk6IFBoeXNpY3NCb2R5LCBhY3RpdmU6IEFjdGl2ZSkge1xuICAgICAgICBwaHlzaWNzQm9keS5ib2R5LnVwZGF0ZSh0aGlzLmR0IC8gMTAwMCwgdGhpcy5nbG9iYWxGb3JjZSwgdGhpcy5nbG9iYWxEYW1waW5nKTtcbiAgICAgICAgcG9zaXRpb24uZGlyZWN0aW9uLnggPSBwaHlzaWNzQm9keS5ib2R5LnZlbG9jaXR5LnggPiAwID8gMSA6IC0xO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9waHlzaWNzL3N5c3RlbXMvUGh5c2ljc1VwZGF0ZVN5c3RlbS50cyIsImltcG9ydCB7IFBoeXNpY3NCb2R5IH0gZnJvbSBcIi4uLy4uL3BoeXNpY3MvY29tcG9uZW50cy9QaHlzaWNzQm9keVwiO1xuaW1wb3J0IHsgQ29udHJvbGxhYmxlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQ29udHJvbGxhYmxlXCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi4vLi4vZWNzL0VudGl0eVwiO1xuaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSBcIi4uLy4uL2Vjcy9TeXN0ZW1cIjtcbmltcG9ydCB7IERpZ2l0YWxJbnB1dCB9IGZyb20gXCIuLi8uLi91dGlsL0RpZ2l0YWxJbnB1dFwiO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlclN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XG4gICAgcHJpdmF0ZSBpbnB1dDogRGlnaXRhbElucHV0O1xuXG4gICAgY29uc3RydWN0b3IoaW5wdXQ6IERpZ2l0YWxJbnB1dCkge1xuICAgICAgICBzdXBlcihbUGh5c2ljc0JvZHksIENvbnRyb2xsYWJsZV0pO1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgfVxuXG4gICAgb25FbnRpdHlBZGRlZChlbnRpdHk6IEVudGl0eSwgcGh5c2ljc0JvZHk6IFBoeXNpY3NCb2R5LCBjb250cm9sbGFibGU6IENvbnRyb2xsYWJsZSkge31cblxuICAgIHVwZGF0ZUVudGl0eShlbnRpdHk6IEVudGl0eSwgcGh5c2ljc0JvZHk6IFBoeXNpY3NCb2R5LCBjb250cm9sbGFibGU6IENvbnRyb2xsYWJsZSkge1xuICAgICAgICB0aGlzLmlucHV0Lkp1c3RQcmVzc2VkKDM4KSA/IChwaHlzaWNzQm9keS5ib2R5LnZlbG9jaXR5LnkgLT0gY29udHJvbGxhYmxlLmZvcmNlKSA6IDA7XG4gICAgICAgIHRoaXMuaW5wdXQuSnVzdFByZXNzZWQoNDApID8gKHBoeXNpY3NCb2R5LmJvZHkudmVsb2NpdHkueSArPSBjb250cm9sbGFibGUuZm9yY2UpIDogMDtcbiAgICAgICAgdGhpcy5pbnB1dC5KdXN0UHJlc3NlZCgzNykgPyAocGh5c2ljc0JvZHkuYm9keS52ZWxvY2l0eS54IC09IGNvbnRyb2xsYWJsZS5mb3JjZSkgOiAwO1xuICAgICAgICB0aGlzLmlucHV0Lkp1c3RQcmVzc2VkKDM5KSA/IChwaHlzaWNzQm9keS5ib2R5LnZlbG9jaXR5LnggKz0gY29udHJvbGxhYmxlLmZvcmNlKSA6IDA7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2NvcmUvc3lzdGVtcy9Db250cm9sbGVyU3lzdGVtLnRzIiwiaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSBcIi4uLy4uL2Vjcy9TeXN0ZW1cIjtcbmltcG9ydCB7IFRpbGVNYXBSZW5kZXJlciB9IGZyb20gXCIuLi9yZW5kZXIvdGlsZS9UaWxlTWFwUmVuZGVyZXJcIjtcbmltcG9ydCB7IFRpbGVNYXBDb2xsaXNpb24gfSBmcm9tIFwiLi4vLi4vcGh5c2ljcy9jb2xsaXNpb24vYnJvYWRwaGFzZS9UaWxlTWFwQ29sbGlzaW9uXCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi4vLi4vZWNzL0VudGl0eVwiO1xuaW1wb3J0IHsgVGlsZUdyYXBoaWNzIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVGlsZUdyYXBoaWNzXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbXBvbmVudHMvUG9zaXRpb25cIjtcblxuaW50ZXJmYWNlIFRpbGVGcmFtZXMge1xuICAgIHNoZWV0czogVGlsZUZyYW1lQ29uZmlnW107XG59XG5cbmludGVyZmFjZSBUaWxlRnJhbWVDb25maWcge1xuICAgIFtrZXk6IHN0cmluZ106IG51bWJlcltdO1xufVxuXG5leHBvcnQgY2xhc3MgVGlsZUdyYXBoaWNzUmVuZGVyU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICBwdWJsaWMgdXBkYXRlczogQXJyYXk8RW50aXR5PjtcblxuICAgIHB1YmxpYyBmcmFtZXM6IE1hcDxzdHJpbmcsIEFycmF5PG51bWJlcj4+O1xuXG4gICAgcHVibGljIHRpbGVNYXA6IFRpbGVNYXBSZW5kZXJlcjtcbiAgICBwdWJsaWMgbWFwOiBUaWxlTWFwQ29sbGlzaW9uO1xuXG4gICAgY29uc3RydWN0b3IodGlsZUZyYW1lc0NvbmZpZzogYW55LCB0aWxlTWFwOiBUaWxlTWFwUmVuZGVyZXIsIG1hcDogVGlsZU1hcENvbGxpc2lvbikge1xuICAgICAgICBzdXBlcihbUG9zaXRpb24sIFRpbGVHcmFwaGljc10pO1xuICAgICAgICB0aGlzLnVwZGF0ZXMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudGlsZU1hcCA9IHRpbGVNYXA7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuICAgICAgICB0aGlzLnBhcnNlRnJhbWVzQ29uZmlnKHRpbGVGcmFtZXNDb25maWcpO1xuICAgIH1cblxuICAgIC8vRm9ybWF0XG4gICAgLy8gXCJzd2l0Y2hPblwiOlt4LHksdyxoLGN4LGN5XSA2NCAzMiAzMiAzMiAzMlxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUgIDQgNCA0IDRcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE2IDEyIDggNCAwXG5cbiAgICBwdWJsaWMgcGFyc2VGcmFtZXNDb25maWcoY29uZmlnOiBhbnkpIHtcbiAgICAgICAgdmFyIGRhdGE6IFRpbGVGcmFtZXMgPSBKU09OLnBhcnNlKGNvbmZpZyk7XG4gICAgICAgIGRhdGEuc2hlZXRzLmZvckVhY2goKHNoZWV0LCBpKSA9PiB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzaGVldCkuZm9yRWFjaChmcmFtZUlkID0+IHtcbiAgICAgICAgICAgICAgICBzaGVldFtmcmFtZUlkXS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVzLnNldChmcmFtZUlkLCBzaGVldFtmcmFtZUlkXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25FbnRpdHlBZGRlZChlbnRpdHk6IEVudGl0eSwgcG9zaXRpb246IFBvc2l0aW9uLCB0aWxlR3JhcGhpY3M6IFRpbGVHcmFwaGljcykge1xuICAgICAgICB0aWxlR3JhcGhpY3Mub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgZW50aXR5KTtcbiAgICAgICAgaWYgKHRpbGVHcmFwaGljcy50aWxlRnJhbWVJZCAhPSBudWxsKSB0aGlzLm9uQ2hhbmdlKGVudGl0eSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2hhbmdlKGVudGl0eTogRW50aXR5KSB7XG4gICAgICAgIHRoaXMudXBkYXRlcy5wdXNoKGVudGl0eSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWxsRW50aXRpZXMoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLnVwZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIGVudGl0eSA9IHRoaXMudXBkYXRlcy5wb3AoKTtcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuZW5naW5lLmdldENvbXBvbmVudEZvckVudGl0eShlbnRpdHksIFBvc2l0aW9uKTtcbiAgICAgICAgICAgIHZhciB0aWxlRGlzcGxheSA9IHRoaXMuZW5naW5lLmdldENvbXBvbmVudEZvckVudGl0eShlbnRpdHksIFRpbGVHcmFwaGljcyk7XG4gICAgICAgICAgICBpZiAodGlsZURpc3BsYXkudGlsZUZyYW1lSWQgIT0gXCJcIilcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVNYXAudXBkYXRlTWFwKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5kYXRhLkluZGV4KHBvc2l0aW9uLmNvb3Jkcy54KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuZGF0YS5JbmRleChwb3NpdGlvbi5jb29yZHMueSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVzLmdldCh0aWxlRGlzcGxheS50aWxlRnJhbWVJZCksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9ncmFwaGljcy9zeXN0ZW1zL1RpbGVHcmFwaGljc1JlbmRlclN5c3RlbS50cyIsImltcG9ydCB7IElQYXJ0aWNsZUVuZ2luZSB9IGZyb20gXCIuL0lQYXJ0aWNsZUVuZ2luZVwiO1xuaW1wb3J0IHsgUG9pbnRCbG9ja1BhcnRpY2xlUmVuZGVyIH0gZnJvbSBcIi4uLy4uL2dyYXBoaWNzL3JlbmRlci9wYXJ0aWNsZS9Qb2ludEJsb2NrUGFydGljbGVSZW5kZXJcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBCeXRlczJEIH0gZnJvbSBcIi4uLy4uL2RzL0J5dGVzMkRcIjtcbmltcG9ydCB7IEJsb2NrUGFydGljbGUgfSBmcm9tIFwiLi9CbG9ja1BhcnRpY2xlXCI7XG5cbmV4cG9ydCBjbGFzcyBCbG9ja1BhcnRpY2xlRW5naW5lMiBpbXBsZW1lbnRzIElQYXJ0aWNsZUVuZ2luZSB7XG4gICAgcHVibGljIHBhcnRpY2xlQ291bnQ6IG51bWJlcjtcbiAgICBwdWJsaWMgZGVsdGFUaW1lOiBudW1iZXI7XG4gICAgcHVibGljIGludkRlbHRhVGltZTogbnVtYmVyO1xuXG4gICAgcHVibGljIGFjdGl2ZVBhcnRpY2xlczogQmxvY2tQYXJ0aWNsZVtdW107XG4gICAgcHVibGljIGFjdGl2ZVBhcnRpY2xlc0NvdW50OiBudW1iZXI7XG4gICAgcHVibGljIGFjdGl2ZVBvb2w6IG51bWJlcjtcblxuICAgIHB1YmxpYyBjYWNoZWRQYXJ0aWNsZXM6IEJsb2NrUGFydGljbGVbXTtcbiAgICBwdWJsaWMgYXZhaWxhYmxlUGFydGljbGVDb3VudDogbnVtYmVyO1xuXG4gICAgcHVibGljIHJlbmRlcmVyOiBQb2ludEJsb2NrUGFydGljbGVSZW5kZXI7XG4gICAgcHVibGljIFpFUk9fRk9SQ0U6IFZlY3RvcjI7XG5cbiAgICBwdWJsaWMgbWFwOiBCeXRlczJEO1xuXG4gICAgY29uc3RydWN0b3IocGFydGljbGVDb3VudDogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlciwgbWFwOiBCeXRlczJEKSB7XG4gICAgICAgIHRoaXMucGFydGljbGVDb3VudCA9IHBhcnRpY2xlQ291bnQ7XG4gICAgICAgIHRoaXMuZGVsdGFUaW1lID0gZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLmludkRlbHRhVGltZSA9IGRlbHRhVGltZSAvIDEwMDA7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuICAgICAgICB0aGlzLlpFUk9fRk9SQ0UgPSBuZXcgVmVjdG9yMigpO1xuICAgICAgICB0aGlzLmFjdGl2ZVBhcnRpY2xlcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmFjdGl2ZVBhcnRpY2xlc1swXSA9IG5ldyBBcnJheSh0aGlzLnBhcnRpY2xlQ291bnQpO1xuICAgICAgICB0aGlzLmFjdGl2ZVBhcnRpY2xlc1sxXSA9IG5ldyBBcnJheSh0aGlzLnBhcnRpY2xlQ291bnQpO1xuICAgICAgICB0aGlzLmNhY2hlZFBhcnRpY2xlcyA9IG5ldyBBcnJheSh0aGlzLnBhcnRpY2xlQ291bnQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jYWNoZWRQYXJ0aWNsZXNbaV0gPSBuZXcgQmxvY2tQYXJ0aWNsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUGFydGljbGVDb3VudCA9IHRoaXMucGFydGljbGVDb3VudDtcbiAgICAgICAgdGhpcy5hY3RpdmVQYXJ0aWNsZXNDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuYWN0aXZlUG9vbCA9IDA7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUG9pbnRCbG9ja1BhcnRpY2xlUmVuZGVyKHBhcnRpY2xlQ291bnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBFbWl0UGFydGljbGUoXG4gICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgeTogbnVtYmVyLFxuICAgICAgICB2WDogbnVtYmVyLFxuICAgICAgICB2WTogbnVtYmVyLFxuICAgICAgICBmWDogbnVtYmVyLFxuICAgICAgICBmWTogbnVtYmVyLFxuICAgICAgICB0dGw6IG51bWJlcixcbiAgICAgICAgZGFtcGluZzogbnVtYmVyLFxuICAgICAgICBkZWNheWFibGU6IGJvb2xlYW4sXG4gICAgICAgIHRvcDogYm9vbGVhbixcbiAgICAgICAgZXh0ZXJuYWxGb3JjZTogVmVjdG9yMixcbiAgICAgICAgZGF0YTE6IG51bWJlcixcbiAgICAgICAgZGF0YTI6IG51bWJlcixcbiAgICAgICAgZGF0YTM6IG51bWJlcixcbiAgICAgICAgZGF0YTQ6IG51bWJlcixcbiAgICAgICAgZGF0YTU6IG51bWJlcixcbiAgICApOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlUGFydGljbGVDb3VudCA9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBwYXJ0aWNsZSA9IHRoaXMuY2FjaGVkUGFydGljbGVzWy0tdGhpcy5hdmFpbGFibGVQYXJ0aWNsZUNvdW50XTtcbiAgICAgICAgdGhpcy5hY3RpdmVQYXJ0aWNsZXNbdGhpcy5hY3RpdmVQb29sXVt0aGlzLmFjdGl2ZVBhcnRpY2xlc0NvdW50KytdID0gcGFydGljbGU7XG5cbiAgICAgICAgcGFydGljbGUuSW5pdGFsaXplKFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICB2WCxcbiAgICAgICAgICAgIHZZLFxuICAgICAgICAgICAgZlgsXG4gICAgICAgICAgICBmWSxcbiAgICAgICAgICAgIHR0bCxcbiAgICAgICAgICAgIGRhbXBpbmcsXG4gICAgICAgICAgICBkZWNheWFibGUgPyB0aGlzLmRlbHRhVGltZSAvIHR0bCA6IDAsXG4gICAgICAgICAgICB0b3AsXG4gICAgICAgICAgICBleHRlcm5hbEZvcmNlICE9IG51bGwgPyBleHRlcm5hbEZvcmNlIDogdGhpcy5aRVJPX0ZPUkNFLFxuICAgICAgICAgICAgZGF0YTEsXG4gICAgICAgICAgICBkYXRhMixcbiAgICAgICAgICAgIGRhdGEzLFxuICAgICAgICAgICAgZGF0YTQsXG4gICAgICAgICAgICBkYXRhNSxcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLlJlc2V0QmF0Y2goKTtcbiAgICAgICAgY29uc3QgcG9vbEEgPSB0aGlzLmFjdGl2ZVBhcnRpY2xlc1t0aGlzLmFjdGl2ZVBvb2xdO1xuICAgICAgICBjb25zdCBwb29sQiA9IHRoaXMuYWN0aXZlUGFydGljbGVzW3RoaXMuYWN0aXZlUG9vbCA9PT0gMSA/IDAgOiAxXTtcbiAgICAgICAgbGV0IG5ld0NvdW50ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVBhcnRpY2xlc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRpY2xlID0gcG9vbEFbaV07XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgcGFydGljbGUuVXBkYXRlKHRoaXMuZGVsdGFUaW1lLCB0aGlzLmludkRlbHRhVGltZSkgJiZcbiAgICAgICAgICAgICAgICAodGhpcy5tYXAuZ2V0UmVhbChwYXJ0aWNsZS5wWCwgcGFydGljbGUucFksIDApICYgMSkgIT0gMVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5BZGRTcHJpdGVUb0JhdGNoKFxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5wWCxcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUucFksXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLnNpemUsXG4gICAgICAgICAgICAgICAgICAgIChwYXJ0aWNsZS5hbHBoYSAqIDI1NSkgfCAwLFxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlLmdyZWVuLFxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5ibHVlLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcG9vbEJbbmV3Q291bnQrK10gPSBwYXJ0aWNsZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRQYXJ0aWNsZXNbdGhpcy5hdmFpbGFibGVQYXJ0aWNsZUNvdW50KytdID0gcGFydGljbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3RpdmVQYXJ0aWNsZXNDb3VudCA9IG5ld0NvdW50O1xuICAgICAgICB0aGlzLmFjdGl2ZVBvb2wgPSB0aGlzLmFjdGl2ZVBvb2wgPT09IDEgPyAwIDogMTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvcGFydGljbGUvZW5naW5lcy9CbG9ja1BhcnRpY2xlRW5naW5lMi50cyIsImltcG9ydCB7IElSZW5kZXJlciB9IGZyb20gXCIuLi9SZW5kZXJFbmdpbmVcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vLi4vLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBTaGFkZXJXcmFwcGVyIH0gZnJvbSBcIi4uL3V0aWwvU2hhZGVyV3JhcHBlclwiO1xuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tIFwiLi4vLi4vZGlzcGxheWxpc3QvU3RhZ2VcIjtcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuLi8uLi9kaXNwbGF5bGlzdC9DYW1lcmFcIjtcbmltcG9ydCB7IEFBQkIyIH0gZnJvbSBcIi4uLy4uLy4uL2dlb20vQUFCQjJcIjtcbmltcG9ydCB7IENvbXBpbGVQcm9ncmFtIH0gZnJvbSBcIi4uL3V0aWwvV2ViR0xTaGFkZXJVdGlsXCI7XG5cbmV4cG9ydCBjbGFzcyBQb2ludEJsb2NrUGFydGljbGVSZW5kZXIgaW1wbGVtZW50cyBJUmVuZGVyZXIge1xuICAgIHB1YmxpYyBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuXG4gICAgcHVibGljIHByb2plY3Rpb246IFZlY3RvcjI7XG5cbiAgICBwdWJsaWMgcG9pbnRTcHJpdGVTaGFkZXI6IFNoYWRlcldyYXBwZXI7XG5cbiAgICBwdWJsaWMgZGF0YUJ1ZmZlcjogV2ViR0xCdWZmZXI7XG4gICAgcHJpdmF0ZSBhcnJheUJ1ZmZlcjogQXJyYXlCdWZmZXI7XG4gICAgcHVibGljIGRhdGE6IEZsb2F0MzJBcnJheTtcbiAgICBwdWJsaWMgZGF0YTg6IFVpbnQ4Q2xhbXBlZEFycmF5O1xuXG4gICAgcHVibGljIHN0YWdlOiBTdGFnZTtcbiAgICBwdWJsaWMgY2FtZXJhOiBDYW1lcmE7XG4gICAgcHVibGljIHRleHR1cmU6IFdlYkdMVGV4dHVyZTtcblxuICAgIHB1YmxpYyBpbmRleFJ1bjogbnVtYmVyO1xuXG4gICAgcHVibGljIGZpcnN0OiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgbWF4U3ByaXRlczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubWF4U3ByaXRlcyA9IHNpemU7XG4gICAgfVxuXG4gICAgcHVibGljIEluaXQoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgY2FtZXJhOiBDYW1lcmEpIHtcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uID0gbmV3IFZlY3RvcjIoKTtcbiAgICAgICAgdGhpcy5wb2ludFNwcml0ZVNoYWRlciA9IG5ldyBTaGFkZXJXcmFwcGVyKFxuICAgICAgICAgICAgZ2wsXG4gICAgICAgICAgICBDb21waWxlUHJvZ3JhbShcbiAgICAgICAgICAgICAgICBnbCxcbiAgICAgICAgICAgICAgICBQb2ludEJsb2NrUGFydGljbGVSZW5kZXIuU1BSSVRFX1ZFUlRFWF9TSEFERVIsXG4gICAgICAgICAgICAgICAgUG9pbnRCbG9ja1BhcnRpY2xlUmVuZGVyLlNQUklURV9GUkFHTUVOVF9TSEFERVIsXG4gICAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRhdGFCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmFycmF5QnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKDIwICogNCAqIHRoaXMubWF4U3ByaXRlcyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5hcnJheUJ1ZmZlcik7XG4gICAgICAgIHRoaXMuZGF0YTggPSBuZXcgVWludDhDbGFtcGVkQXJyYXkodGhpcy5hcnJheUJ1ZmZlcik7XG4gICAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcihXZWJHTFJlbmRlcmluZ0NvbnRleHQuQVJSQVlfQlVGRkVSLCB0aGlzLmRhdGFCdWZmZXIpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoV2ViR0xSZW5kZXJpbmdDb250ZXh0LkFSUkFZX0JVRkZFUiwgdGhpcy5kYXRhLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRFlOQU1JQ19EUkFXKTtcbiAgICAgICAgdGhpcy5SZXNldEJhdGNoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIFJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLnByb2plY3Rpb24ueCA9IHdpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uLnkgPSBoZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIHB1YmxpYyBBZGRTdGFnZShzdGFnZTogU3RhZ2UpIHtcbiAgICAgICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIH1cblxuICAgIHB1YmxpYyBSZXNldEJhdGNoKCkge1xuICAgICAgICB0aGlzLmluZGV4UnVuID0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgQWRkU3ByaXRlVG9CYXRjaChcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgIHNpemU6IG51bWJlcixcbiAgICAgICAgYWxwaGE6IG51bWJlcixcbiAgICAgICAgcmVkOiBudW1iZXIsXG4gICAgICAgIGdyZWVuOiBudW1iZXIsXG4gICAgICAgIGJsdWU6IG51bWJlcixcbiAgICApIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleFJ1biAqIDQ7XG4gICAgICAgIHRoaXMuZGF0YVtpbmRleCArIDBdID0geDsgLy9NYXRoLmZsb29yKHgpOy8vICsgY2FtZXJhLnBvc2l0aW9uLngpO1xuICAgICAgICB0aGlzLmRhdGFbaW5kZXggKyAxXSA9IHk7IC8vTWF0aC5mbG9vcih5KTsvLyArIGNhbWVyYS5wb3NpdGlvbi55KTtcbiAgICAgICAgdGhpcy5kYXRhW2luZGV4ICsgMl0gPSBzaXplO1xuICAgICAgICBpbmRleCAqPSA0O1xuICAgICAgICB0aGlzLmRhdGE4W2luZGV4ICsgMTJdID0gcmVkO1xuICAgICAgICB0aGlzLmRhdGE4W2luZGV4ICsgMTNdID0gZ3JlZW47XG4gICAgICAgIHRoaXMuZGF0YThbaW5kZXggKyAxNF0gPSBibHVlO1xuICAgICAgICB0aGlzLmRhdGE4W2luZGV4ICsgMTVdID0gYWxwaGE7XG4gICAgICAgIHRoaXMuaW5kZXhSdW4rKztcbiAgICB9XG5cbiAgICBwdWJsaWMgUmVuZGVyKGNsaXA6IEFBQkIyKSB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4UnVuID09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5nbC5lbmFibGUoV2ViR0xSZW5kZXJpbmdDb250ZXh0LkJMRU5EKTtcbiAgICAgICAgdGhpcy5nbC5ibGVuZEZ1bmMoV2ViR0xSZW5kZXJpbmdDb250ZXh0LlNSQ19BTFBIQSwgV2ViR0xSZW5kZXJpbmdDb250ZXh0Lk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuXG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnBvaW50U3ByaXRlU2hhZGVyLnByb2dyYW0pO1xuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIoV2ViR0xSZW5kZXJpbmdDb250ZXh0LkFSUkFZX0JVRkZFUiwgdGhpcy5kYXRhQnVmZmVyKTtcbiAgICAgICAgLy8gdGhpcy5nbC5idWZmZXJEYXRhKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5BUlJBWV9CVUZGRVIsZGF0YSxXZWJHTFJlbmRlcmluZ0NvbnRleHQuRFlOQU1JQ19EUkFXKTtcbiAgICAgICAgdGhpcy5nbC5idWZmZXJTdWJEYXRhKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5BUlJBWV9CVUZGRVIsIDAsIHRoaXMuZGF0YSk7XG5cbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnBvaW50U3ByaXRlU2hhZGVyLmF0dHJpYnV0ZS5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5wb2ludFNwcml0ZVNoYWRlci5hdHRyaWJ1dGUuc2l6ZSk7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5wb2ludFNwcml0ZVNoYWRlci5hdHRyaWJ1dGUuY29sb3VyKTtcblxuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgICAgICB0aGlzLnBvaW50U3ByaXRlU2hhZGVyLmF0dHJpYnV0ZS5wb3NpdGlvbixcbiAgICAgICAgICAgIDIsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRkxPQVQsXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIDE2LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICAgICAgdGhpcy5wb2ludFNwcml0ZVNoYWRlci5hdHRyaWJ1dGUuc2l6ZSxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRkxPQVQsXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIDE2LFxuICAgICAgICAgICAgOCxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICAgICAgdGhpcy5wb2ludFNwcml0ZVNoYWRlci5hdHRyaWJ1dGUuY29sb3VyLFxuICAgICAgICAgICAgNCxcbiAgICAgICAgICAgIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5VTlNJR05FRF9CWVRFLFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIDE2LFxuICAgICAgICAgICAgMTIsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2wudW5pZm9ybTJmKFxuICAgICAgICAgICAgdGhpcy5wb2ludFNwcml0ZVNoYWRlci51bmlmb3JtLmNhbWVyYVBvc2l0aW9uLFxuICAgICAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueCxcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5nbC51bmlmb3JtMmYodGhpcy5wb2ludFNwcml0ZVNoYWRlci51bmlmb3JtLnByb2plY3Rpb25WZWN0b3IsIHRoaXMucHJvamVjdGlvbi54LCB0aGlzLnByb2plY3Rpb24ueSk7XG5cbiAgICAgICAgdGhpcy5nbC5kcmF3QXJyYXlzKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5QT0lOVFMsIDAsIHRoaXMuaW5kZXhSdW4pO1xuICAgIH1cblxuICAgIHN0YXRpYyBTUFJJVEVfVkVSVEVYX1NIQURFUjogc3RyaW5nID0gYFxuICAgICAgICBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiAgICAgICAgdW5pZm9ybSB2ZWMyIHByb2plY3Rpb25WZWN0b3I7XG4gICAgICAgIHVuaWZvcm0gdmVjMiBjYW1lcmFQb3NpdGlvbjtcblxuICAgICAgICBhdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjtcbiAgICAgICAgYXR0cmlidXRlIGZsb2F0IHNpemU7XG4gICAgICAgIGF0dHJpYnV0ZSB2ZWM0IGNvbG91cjtcbiAgICAgICAgdmFyeWluZyB2ZWM0IHZDb2xvcjtcbiAgICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAgICAgZ2xfUG9pbnRTaXplID0gc2l6ZTtcbiAgICAgICAgICAgIHZDb2xvciA9IGNvbG91cjtcbiAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggKGNhbWVyYVBvc2l0aW9uLnggKyBwb3NpdGlvbi54KSAvIHByb2plY3Rpb25WZWN0b3IueCAtMS4wLCAoY2FtZXJhUG9zaXRpb24ueSArIHBvc2l0aW9uLnkpIC8gLXByb2plY3Rpb25WZWN0b3IueSArIDEuMCAsIDAuMCwgMS4wKTsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIGA7XG5cbiAgICBzdGF0aWMgU1BSSVRFX0ZSQUdNRU5UX1NIQURFUjogc3RyaW5nID0gYFxuICAgICAgICBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcblxuICAgICAgICB2YXJ5aW5nIHZlYzQgdkNvbG9yO1xuICAgICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2Q29sb3I7XG4gICAgICAgIH1cbiAgICBgO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2dyYXBoaWNzL3JlbmRlci9wYXJ0aWNsZS9Qb2ludEJsb2NrUGFydGljbGVSZW5kZXIudHMiLCJpbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uLy4uL2dlb20vVmVjdG9yMlwiO1xuXG5jb25zdCBJTlZfQUxQSEE6IG51bWJlciA9IDEgLyAyNTU7XG5cbmV4cG9ydCBjbGFzcyBCbG9ja1BhcnRpY2xlIHtcbiAgICBwdWJsaWMgcFg6IG51bWJlcjtcbiAgICBwdWJsaWMgcFk6IG51bWJlcjtcblxuICAgIHB1YmxpYyB2WDogbnVtYmVyO1xuICAgIHB1YmxpYyB2WTogbnVtYmVyO1xuXG4gICAgcHVibGljIGZYOiBudW1iZXI7XG4gICAgcHVibGljIGZZOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgZXh0ZXJuYWxGb3JjZTogVmVjdG9yMjtcblxuICAgIHB1YmxpYyBhZ2U6IG51bWJlcjtcbiAgICBwdWJsaWMgdHRsOiBudW1iZXI7XG4gICAgcHVibGljIGRhbXBpbmc6IG51bWJlcjtcblxuICAgIHB1YmxpYyBkZWNheTogbnVtYmVyO1xuXG4gICAgcHVibGljIHNpemU6IG51bWJlcjtcbiAgICBwdWJsaWMgYWxwaGE6IG51bWJlcjtcbiAgICBwdWJsaWMgcmVkOiBudW1iZXI7XG4gICAgcHVibGljIGdyZWVuOiBudW1iZXI7XG4gICAgcHVibGljIGJsdWU6IG51bWJlcjtcblxuICAgIHB1YmxpYyBuZXh0OiBCbG9ja1BhcnRpY2xlO1xuICAgIHB1YmxpYyBwcmV2OiBCbG9ja1BhcnRpY2xlO1xuXG4gICAgcHVibGljIGFscGhhUGVyVXBkYXRlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgSW5pdGFsaXplKFxuICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgIHk6IG51bWJlcixcbiAgICAgICAgdlg6IG51bWJlcixcbiAgICAgICAgdlk6IG51bWJlcixcbiAgICAgICAgZlg6IG51bWJlcixcbiAgICAgICAgZlk6IG51bWJlcixcbiAgICAgICAgdHRsOiBudW1iZXIsXG4gICAgICAgIGRhbXBpbmc6IG51bWJlcixcbiAgICAgICAgZGVjYXk6IG51bWJlcixcbiAgICAgICAgdG9wOiBib29sZWFuLFxuICAgICAgICBleHRlcm5hbEZvcmNlOiBWZWN0b3IyLFxuICAgICAgICBkYXRhMTogbnVtYmVyLFxuICAgICAgICBkYXRhMjogbnVtYmVyLFxuICAgICAgICBkYXRhMzogbnVtYmVyLFxuICAgICAgICBkYXRhNDogbnVtYmVyLFxuICAgICAgICBkYXRhNTogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLnBYID0geDtcbiAgICAgICAgdGhpcy5wWSA9IHk7XG4gICAgICAgIHRoaXMudlggPSB2WDtcbiAgICAgICAgdGhpcy52WSA9IHZZO1xuICAgICAgICB0aGlzLmZYID0gZlg7XG4gICAgICAgIHRoaXMuZlkgPSBmWTtcbiAgICAgICAgdGhpcy50dGwgPSB0dGw7XG4gICAgICAgIHRoaXMuYWdlID0gdHRsO1xuICAgICAgICB0aGlzLmRhbXBpbmcgPSBkYW1waW5nO1xuICAgICAgICB0aGlzLmRlY2F5ID0gZGVjYXk7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxGb3JjZSA9IGV4dGVybmFsRm9yY2U7XG4gICAgICAgIHRoaXMuc2l6ZSA9IGRhdGExO1xuICAgICAgICB0aGlzLmFscGhhID0gZGF0YTIgKiBJTlZfQUxQSEE7XG4gICAgICAgIHRoaXMucmVkID0gZGF0YTM7XG4gICAgICAgIHRoaXMuZ3JlZW4gPSBkYXRhNDtcbiAgICAgICAgdGhpcy5ibHVlID0gZGF0YTU7XG4gICAgfVxuXG4gICAgcHVibGljIFVwZGF0ZShkZWx0YVRpbWU6IG51bWJlciwgaW52RGVsdGFUaW1lOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgdGhpcy52WCArPSB0aGlzLmZYICsgdGhpcy5leHRlcm5hbEZvcmNlLng7XG4gICAgICAgIHRoaXMudlkgKz0gdGhpcy5mWSArIHRoaXMuZXh0ZXJuYWxGb3JjZS55O1xuICAgICAgICB0aGlzLnZYICo9IHRoaXMuZGFtcGluZztcbiAgICAgICAgdGhpcy52WSAqPSB0aGlzLmRhbXBpbmc7XG4gICAgICAgIHRoaXMucFggKz0gdGhpcy52WCAqIGludkRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wWSArPSB0aGlzLnZZICogaW52RGVsdGFUaW1lO1xuICAgICAgICB0aGlzLmFnZSAtPSBkZWx0YVRpbWU7XG4gICAgICAgIHRoaXMuYWxwaGEgLT0gdGhpcy5kZWNheTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdlID4gMDtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvcGFydGljbGUvZW5naW5lcy9CbG9ja1BhcnRpY2xlLnRzIiwiaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSBcIi4uLy4uL2Vjcy9TeXN0ZW1cIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29tcG9uZW50cy9Qb3NpdGlvblwiO1xuaW1wb3J0IHsgQmxvY2tQYXJ0aWNsZUVuZ2luZTIgfSBmcm9tIFwiLi4vZW5naW5lcy9CbG9ja1BhcnRpY2xlRW5naW5lMlwiO1xuaW1wb3J0IHsgQWN0aXZlIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29tcG9uZW50cy9BY3RpdmVcIjtcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi8uLi9lY3MvRW50aXR5XCI7XG5pbXBvcnQgeyBQYXJ0aWNsZUVtaXR0ZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9QYXJ0aWNsZUVtaXR0ZXJcIjtcblxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcbiAgICBwcml2YXRlIGJsb2NrUGFydGljbGVFbmdpbmU6IEJsb2NrUGFydGljbGVFbmdpbmUyO1xuICAgIGNvbnN0cnVjdG9yKGJsb2NrUGFydGljbGVFbmdpbmU6IEJsb2NrUGFydGljbGVFbmdpbmUyKSB7XG4gICAgICAgIHN1cGVyKFtQb3NpdGlvbiwgQWN0aXZlLCBQYXJ0aWNsZUVtaXR0ZXJdKTtcbiAgICAgICAgdGhpcy5ibG9ja1BhcnRpY2xlRW5naW5lID0gYmxvY2tQYXJ0aWNsZUVuZ2luZTtcbiAgICB9XG5cbiAgICB1cGRhdGVFbnRpdHkoZW50aXR5OiBFbnRpdHksIHBvc2l0aW9uOlBvc2l0aW9uLCBhY3RpdmU6IEFjdGl2ZSwgcGFydGljbGVFbWl0dGVyOiBQYXJ0aWNsZUVtaXR0ZXIpIHtcbiAgICAgICAgcGFydGljbGVFbWl0dGVyLmVtaXR0ZXJzLmZvckVhY2goZW1pdHRlciA9PiBlbWl0dGVyLnVwZGF0ZSgxNiwgcG9zaXRpb24uY29vcmRzLCB0aGlzLmJsb2NrUGFydGljbGVFbmdpbmUpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zdFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5ibG9ja1BhcnRpY2xlRW5naW5lLlVwZGF0ZSgpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9wYXJ0aWNsZS9zeXN0ZW1zL1BhcnRpY2xlU3lzdGVtLnRzIiwiaW1wb3J0IHsgSVBhcnRpY2xlRW1pdHRlciB9IGZyb20gXCIuLi9lbWl0dGVyL0lQYXJ0aWNsZUVtaXR0ZXJcIjtcblxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlRW1pdHRlciB7XG4gICAgcHVibGljIGVtaXR0ZXJzOiBBcnJheTxJUGFydGljbGVFbWl0dGVyPjtcbiAgICBjb25zdHJ1Y3RvcihlbWl0dGVyczogQXJyYXk8SVBhcnRpY2xlRW1pdHRlcj4pIHtcbiAgICAgICAgdGhpcy5lbWl0dGVycyA9IGVtaXR0ZXJzO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9wYXJ0aWNsZS9jb21wb25lbnRzL1BhcnRpY2xlRW1pdHRlci50cyIsImltcG9ydCB7IFN5c3RlbSB9IGZyb20gXCIuLi8uLi9lY3MvU3lzdGVtXCI7XG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiLi4vLi4vZ3JhcGhpY3MvZGlzcGxheWxpc3QvQ2FtZXJhXCI7XG5pbXBvcnQgeyBJU3BhY2VNYW5hZ2VyIH0gZnJvbSBcIi4uL0lTcGFjZU1hbmFnZXJcIjtcbmltcG9ydCB7IEFBQkIgfSBmcm9tIFwiLi4vLi4vZ2VvbS9BQUJCXCI7XG5pbXBvcnQgeyBFeHRlbnRzIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29tcG9uZW50cy9FeHRlbnRzXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbXBvbmVudHMvUG9zaXRpb25cIjtcbmltcG9ydCB7IEZpeGVkIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29tcG9uZW50cy9GaXhlZFwiO1xuaW1wb3J0IHsgUmVndWxhckdyaWRTcGFjZU1hbmFnZXIgfSBmcm9tIFwiLi4vUmVndWxhckdyaWRTcGFjZU1hbmFnZXJcIjtcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi8uLi9lY3MvRW50aXR5XCI7XG5pbXBvcnQgeyBWaWV3YWJsZSB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbXBvbmVudHMvVmlld2FibGVcIjtcblxuZXhwb3J0IGNsYXNzIEZpeGVkVmlld01hbmFnZW1lbnRTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xuICAgIHByaXZhdGUgY2FtZXJhOiBDYW1lcmE7XG4gICAgcHJpdmF0ZSBzcGFjZU1hbmFnZXI6IElTcGFjZU1hbmFnZXI7XG4gICAgcHJpdmF0ZSBhY3RpdmVTcGFjZUFBQkI6IEFBQkI7XG5cbiAgICBjb25zdHJ1Y3RvcihjYW1lcmE6IENhbWVyYSkge1xuICAgICAgICBzdXBlcihbUG9zaXRpb24sIEV4dGVudHMsIEZpeGVkXSk7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB0aGlzLnNwYWNlTWFuYWdlciA9IG5ldyBSZWd1bGFyR3JpZFNwYWNlTWFuYWdlcigxMCwgMTAsIDUwMCk7XG4gICAgICAgIHRoaXMuYWN0aXZlU3BhY2VBQUJCID0gbmV3IEFBQkIoKTtcbiAgICAgICAgdGhpcy5hY3RpdmVTcGFjZUFBQkIuZXh0ZW50cy5zZXRUbyg4MDAgLyAyLCA2MDAgLyAyKTtcbiAgICAgICAgdGhpcy5zZXRFbnRpdHlTdGF0dXMgPSB0aGlzLnNldEVudGl0eVN0YXR1cy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIG9uRW50aXR5QWRkZWQoZW50aXR5OiBFbnRpdHksIHBvc2l0aW9uOiBQb3NpdGlvbiwgZXh0ZW50czogRXh0ZW50cywgZml4ZWQ6IEZpeGVkKSB7XG4gICAgICAgIHRoaXMuc3BhY2VNYW5hZ2VyLmFkZEVudGl0eShlbnRpdHksIHBvc2l0aW9uLCBleHRlbnRzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBbGxFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVTcGFjZUFBQkIucG9zaXRpb24uY29weSh0aGlzLmNhbWVyYS5yZWFsUG9zaXRpb24pO1xuICAgICAgICB0aGlzLnNwYWNlTWFuYWdlci5zZWFyY2godGhpcy5hY3RpdmVTcGFjZUFBQkIsIHRoaXMuc2V0RW50aXR5U3RhdHVzKTtcbiAgICB9XG5cbiAgICBzZXRFbnRpdHlTdGF0dXMoZW50aXR5OiBFbnRpdHksIHN0YXR1czogYm9vbGVhbikge1xuICAgICAgICBpZiAoc3RhdHVzID09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLmFkZENvbXBvbmVudHNUb0VudGl0eShlbnRpdHksIFtuZXcgVmlld2FibGUoKV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUucmVtb3ZlQ29tcG9uZW50c0Zyb21FbnRpdHkoZW50aXR5LCBbVmlld2FibGVdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nbGF6ZS9zcGFjZS9zeXN0ZW1zL0ZpeGVkVmlld01hbmFnZW1lbnRTeXN0ZW0udHMiLCJpbXBvcnQgeyBJU3BhY2VNYW5hZ2VyLCBTcGFjZU1hbmFnZXJDYiB9IGZyb20gXCIuL0lTcGFjZU1hbmFnZXJcIjtcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vZ2VvbS9WZWN0b3IyXCI7XG5pbXBvcnQgeyBBcnJheTJEIH0gZnJvbSBcIi4uL2RzL0FycmF5MkRcIjtcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuLi9lY3MvRW50aXR5XCI7XG5pbXBvcnQgeyBTcGFjZU1hbmFnZXJQcm94eSB9IGZyb20gXCIuL1NwYWNlTWFuYWdlclByb3h5XCI7XG5pbXBvcnQgeyBBQUJCIH0gZnJvbSBcIi4uL2dlb20vQUFCQlwiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vY29yZS9jb21wb25lbnRzL1Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBFeHRlbnRzIH0gZnJvbSBcIi4uL2NvcmUvY29tcG9uZW50cy9FeHRlbnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBSZWd1bGFyR3JpZFNwYWNlTWFuYWdlciBpbXBsZW1lbnRzIElTcGFjZU1hbmFnZXIge1xuICAgIHB1YmxpYyBncmlkOiBBcnJheTJEPENlbGw+O1xuICAgIHB1YmxpYyBjdXJyZW50Q2VsbHM6IEFycmF5PENlbGw+O1xuICAgIHB1YmxpYyBjb3VudDogbnVtYmVyID0gMTtcbiAgICBwdWJsaWMgbGFzdFVwZGF0ZVBvc2l0aW9uOiBWZWN0b3IyO1xuICAgIHB1YmxpYyB1cGRhdGVEaXN0YW5jZURlbHRhOiBudW1iZXIgPSAxMDAgKiAxMDA7XG5cbiAgICBjb25zdHJ1Y3RvcihncmlkV2lkdGg6IG51bWJlciwgZ3JpZEhlaWdodDogbnVtYmVyLCBncmlkQ2VsbFNpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkyRChncmlkV2lkdGgsIGdyaWRIZWlnaHQsIGdyaWRDZWxsU2l6ZSk7XG4gICAgICAgIHRoaXMuY3VycmVudENlbGxzID0gbmV3IEFycmF5PENlbGw+KCk7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmdyaWQuZ3JpZFdpZHRoOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5ncmlkLmdyaWRIZWlnaHQ7IHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5zZXQoeCx5LG5ldyBDZWxsKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFkZEVudGl0eShlbnRpdHk6IEVudGl0eSwgcG9zaXRpb246IFBvc2l0aW9uLCBleHRlbnRzOiBFeHRlbnRzKSB7XG4gICAgICAgIHZhciBwcm94eSA9IG5ldyBTcGFjZU1hbmFnZXJQcm94eSgpO1xuICAgICAgICBwcm94eS5hYWJiLnBvc2l0aW9uID0gcG9zaXRpb24uY29vcmRzO1xuICAgICAgICBwcm94eS5hYWJiLmV4dGVudHMgPSBleHRlbnRzLmhhbGZXaWR0aHM7XG4gICAgICAgIHByb3h5LmlzU3RhdGljID0gdHJ1ZTtcbiAgICAgICAgcHJveHkuZW50aXR5ID0gZW50aXR5O1xuICAgICAgICB0aGlzLmhhc2hQcm94eShwcm94eSk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhc2hQcm94eShwcm94eTogU3BhY2VNYW5hZ2VyUHJveHkpIHtcbiAgICAgICAgdmFyIHN0YXJ0WCA9IHRoaXMuZ3JpZC5JbmRleChwcm94eS5hYWJiLnBvc2l0aW9uLnggLSBwcm94eS5hYWJiLmV4dGVudHMueCk7XG4gICAgICAgIHZhciBzdGFydFkgPSB0aGlzLmdyaWQuSW5kZXgocHJveHkuYWFiYi5wb3NpdGlvbi55IC0gcHJveHkuYWFiYi5leHRlbnRzLnkpO1xuXG4gICAgICAgIHZhciBlbmRYID0gdGhpcy5ncmlkLkluZGV4KHByb3h5LmFhYmIucG9zaXRpb24ueCArIHByb3h5LmFhYmIuZXh0ZW50cy54KSArIDE7XG4gICAgICAgIHZhciBlbmRZID0gdGhpcy5ncmlkLkluZGV4KHByb3h5LmFhYmIucG9zaXRpb24ueSArIHByb3h5LmFhYmIuZXh0ZW50cy55KSArIDE7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IHN0YXJ0WTsgeSA8IGVuZFk7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IHN0YXJ0WDsgeCA8IGVuZFg7IHgrKykge1xuICAgICAgICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5ncmlkLmdldCh4LCB5KTtcbiAgICAgICAgICAgICAgICBjZWxsLnByb3hpZXMucHVzaChwcm94eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQWN0aXZlQ2VsbChjZWxsOiBDZWxsLCB2aWV3QUFCQjogQUFCQiwgY2FsbGJhY2s6IFNwYWNlTWFuYWdlckNiKSB7XG4gICAgICAgIGNlbGwucHJveGllcy5mb3JFYWNoKHByb3h5ID0+IHtcbiAgICAgICAgICAgIGlmIChwcm94eS5yZWZlcmVuY2VDb3VudCsrID09IDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm94eS5lbnRpdHksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY2VsbC51cGRhdGVDb3VudCA9IHRoaXMuY291bnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUFjdGl2ZUNlbGwoY2VsbDogQ2VsbCwgdmlld0FBQkI6IEFBQkIsIGNhbGxiYWNrOiBTcGFjZU1hbmFnZXJDYikge1xuICAgICAgICBjZWxsLnByb3hpZXMuZm9yRWFjaChwcm94eSA9PiB7XG4gICAgICAgICAgICBpZiAoLS1wcm94eS5yZWZlcmVuY2VDb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socHJveHkuZW50aXR5LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL1Jlc2V0IHRoZSB1cGRhdGUgY291bnRcbiAgICAgICAgY2VsbC51cGRhdGVDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHNlYXJjaCh2aWV3QUFCQjogQUFCQiwgY2FsbGJhY2s6IChlbnRpdHk6IEVudGl0eSwgYjogYm9vbGVhbikgPT4gdm9pZCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0VXBkYXRlUG9zaXRpb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0VXBkYXRlUG9zaXRpb24gPSB2aWV3QUFCQi5wb3NpdGlvbi5jbG9uZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubGFzdFVwZGF0ZVBvc2l0aW9uLmRpc3RTcXJkKHZpZXdBQUJCLnBvc2l0aW9uKSA8IHRoaXMudXBkYXRlRGlzdGFuY2VEZWx0YSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5sYXN0VXBkYXRlUG9zaXRpb24uY29weSh2aWV3QUFCQi5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0WCA9IHRoaXMuZ3JpZC5JbmRleCh2aWV3QUFCQi5wb3NpdGlvbi54IC0gdmlld0FBQkIuZXh0ZW50cy54KTtcbiAgICAgICAgdmFyIHN0YXJ0WSA9IHRoaXMuZ3JpZC5JbmRleCh2aWV3QUFCQi5wb3NpdGlvbi55IC0gdmlld0FBQkIuZXh0ZW50cy55KTtcblxuICAgICAgICB2YXIgZW5kWCA9IHRoaXMuZ3JpZC5JbmRleCh2aWV3QUFCQi5wb3NpdGlvbi54ICsgdmlld0FBQkIuZXh0ZW50cy54KSArIDE7XG4gICAgICAgIHZhciBlbmRZID0gdGhpcy5ncmlkLkluZGV4KHZpZXdBQUJCLnBvc2l0aW9uLnkgKyB2aWV3QUFCQi5leHRlbnRzLnkpICsgMTtcblxuICAgICAgICBmb3IgKGxldCB5ID0gc3RhcnRZOyB5IDwgZW5kWTsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gc3RhcnRYOyB4IDwgZW5kWDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmdyaWQuZ2V0KHgsIHkpO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsID09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsLnVwZGF0ZUNvdW50ID09IDApIHRoaXMuY3VycmVudENlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgZWxzZSBjZWxsLnVwZGF0ZUNvdW50ID0gdGhpcy5jb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gdGhpcy5jdXJyZW50Q2VsbHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmN1cnJlbnRDZWxsc1tpXTtcbiAgICAgICAgICAgIGlmIChjZWxsLnVwZGF0ZUNvdW50ID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEFjdGl2ZUNlbGwoY2VsbCwgdmlld0FBQkIsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbC51cGRhdGVDb3VudCA8IHRoaXMuY291bnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFjdGl2ZUNlbGwoY2VsbCwgdmlld0FBQkIsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDZWxscy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvdW50Kys7XG4gICAgfVxufVxuXG5jbGFzcyBDZWxsIHtcbiAgICBwdWJsaWMgcHJveGllczogQXJyYXk8U3BhY2VNYW5hZ2VyUHJveHk+O1xuICAgIHB1YmxpYyB1cGRhdGVDb3VudDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJveGllcyA9IG5ldyBBcnJheTxTcGFjZU1hbmFnZXJQcm94eT4oKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudCA9IDA7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3NwYWNlL1JlZ3VsYXJHcmlkU3BhY2VNYW5hZ2VyLnRzIiwiZXhwb3J0IGNsYXNzIEFycmF5MkQ8VD4ge1xuICAgIHB1YmxpYyBkYXRhOiBBcnJheTxUPjtcblxuICAgIHB1YmxpYyBncmlkV2lkdGg6IG51bWJlcjtcbiAgICBwdWJsaWMgZ3JpZEhlaWdodDogbnVtYmVyO1xuXG4gICAgcHVibGljIGNlbGxTaXplOiBudW1iZXI7XG4gICAgcHVibGljIGludkNlbGxTaXplOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihncmlkV2lkdGg6IG51bWJlciwgZ3JpZEhlaWdodDogbnVtYmVyLCBjZWxsU2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdGFsaXplKGdyaWRXaWR0aCwgZ3JpZEhlaWdodCwgY2VsbFNpemUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0YWxpemUoZ3JpZFdpZHRoOiBudW1iZXIsIGdyaWRIZWlnaHQ6IG51bWJlciwgY2VsbFNpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmdyaWRXaWR0aCA9IGdyaWRXaWR0aDtcbiAgICAgICAgdGhpcy5ncmlkSGVpZ2h0ID0gZ3JpZEhlaWdodDtcblxuICAgICAgICB0aGlzLmNlbGxTaXplID0gY2VsbFNpemU7XG4gICAgICAgIHRoaXMuaW52Q2VsbFNpemUgPSAxIC8gY2VsbFNpemU7XG5cbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IEFycmF5PFQ+KHRoaXMuZ3JpZFdpZHRoICogdGhpcy5ncmlkSGVpZ2h0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KHg6IG51bWJlciwgeTogbnVtYmVyKTogVCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFbeSAqIHRoaXMuZ3JpZFdpZHRoICsgeF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNhZmUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBUIHtcbiAgICAgICAgcmV0dXJuIHggPj0gdGhpcy5ncmlkV2lkdGggfHwgeSA+PSB0aGlzLmdyaWRIZWlnaHQgfHwgeCA8IDAgfHwgeSA8IDAgPyBudWxsIDogdGhpcy5kYXRhW3kgKiB0aGlzLmdyaWRXaWR0aCArIHhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHZhbHVlOiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YVt5ICogdGhpcy5ncmlkV2lkdGggKyB4XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBJbmRleCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgLy9GSVhNRSBOb3Qgc3VyZSB0aGlzIGFsd2F5cyB3b3Jrcy4uLlxuICAgICAgICAvL3JldHVybiBTdGQubnVtYmVyKHZhbHVlIC8gY2VsbFNpemUpO1xuICAgICAgICAvL3JldHVybiBNYXRoLmZsb29yKHZhbHVlICogaW52Q2VsbFNpemUpO1xuICAgICAgICByZXR1cm4gKHZhbHVlICogdGhpcy5pbnZDZWxsU2l6ZSkgfCAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5ncmlkV2lkdGggKiB0aGlzLmNlbGxTaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZEhlaWdodCAqIHRoaXMuY2VsbFNpemU7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL2RzL0FycmF5MkQudHMiLCJpbXBvcnQgeyBBQUJCIH0gZnJvbSBcIi4uL2dlb20vQUFCQlwiO1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4uL2Vjcy9FbnRpdHlcIjtcblxuZXhwb3J0IGNsYXNzIFNwYWNlTWFuYWdlclByb3h5IHtcbiAgICBwdWJsaWMgYWFiYjogQUFCQiA9IG5ldyBBQUJCKCk7XG4gICAgcHVibGljIGlzU3RhdGljOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGVudGl0eTogRW50aXR5ID0gbnVsbDtcbiAgICBwdWJsaWMgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHJlZmVyZW5jZUNvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3NwYWNlL1NwYWNlTWFuYWdlclByb3h5LnRzIiwiZXhwb3J0IGNsYXNzIFZpZXdhYmxlIHtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvY29yZS9jb21wb25lbnRzL1ZpZXdhYmxlLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==