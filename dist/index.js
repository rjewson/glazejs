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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__glaze_ecs_Engine__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__glaze_ecs_System__ = __webpack_require__(3);


class Position {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
class Graphics {
    constructor(ref) {
        this.ref = ref;
    }
}
class GraphicsSystem extends __WEBPACK_IMPORTED_MODULE_1__glaze_ecs_System__["a" /* System */] {
    constructor() {
        super([Position, Graphics]);
    }
    onEntityAdded(entity, position, graphics) {
        console.log("added ", position);
    }
    updateEntity(entity, dt, position, graphics) {
        console.log(entity, dt, a);
    }
}
const engine = new __WEBPACK_IMPORTED_MODULE_0__glaze_ecs_Engine__["a" /* Engine */]();
engine.addCapacityToEngine(10);
engine.addSystemToEngine(new GraphicsSystem());
const e = engine.createEntity();
engine.addComponentsToEntity(e, [new Position(), new Graphics(1)]);
console.log(engine);
let a = 2;
engine.update(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Pool__ = __webpack_require__(2);

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
    addComponentsToEntity(entity, componentsToAdd) {
        componentsToAdd.forEach(component => {
            const name = component.constructor.name;
            if (this.components.has(name))
                this.components.get(name)[entity] = component;
        });
        this.matchEntity(entity);
    }
    addSystemToEngine(system) {
        this.systems.push(system);
        system.components.forEach((name) => this.components.set(name, emptyNullArray(this.entityPool.capacity)));
    }
    update(dt) {
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
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class System {
    constructor(components) {
        this.members = new Map();
        this.components = components.map(factory => factory.name);
    }
    addEntity(entity, components) {
        this.members.set(entity, components);
        this.onEntityAdded(entity, ...components);
    }
    onEntityAdded(entity, ...components) { }
    removeEntity(entity) {
        if (!this.members.has(entity))
            return;
        this.onEntityRemoved(entity, ...this.members.get(entity));
        this.members.delete(entity);
    }
    onEntityRemoved(entity, ...components) { }
    updateSystem(dt) {
        this.members.forEach((components, entity) => {
            this.updateEntity(entity, dt, ...components);
        });
    }
    updateEntity(entity, dt, ...components) { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = System;



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTdhNWE2NDE4OTdjODk5MDZhMjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS9lY3MvRW5naW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9nbGF6ZS91dGlsL1Bvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsYXplL2Vjcy9TeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdENEM7QUFDQTtBQUc1QztJQUdJO1FBQ0ksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQUVEO0lBRUksWUFBWSxHQUFHO1FBQ1gsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBRUQsb0JBQXFCLFNBQVEsaUVBQU07SUFDL0I7UUFDSSxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWMsRUFBRSxRQUFrQixFQUFFLFFBQWtCO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENB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SSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLGVBQWUsQ0FBQyxNQUFjLEVBQUUsR0FBRyxVQUFpQixJQUFHLENBQUM7SUFFeEQsWUFBWSxDQUFDLEVBQVU7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sWUFBWSxDQUFDLE1BQWMsRUFBRSxFQUFVLEVBQUUsR0FBRyxVQUFpQixJQUFHLENBQUM7Q0FDM0U7QUFBQTtBQUFBIiwiZmlsZSI6Ii4vZGlzdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU3YTVhNjQxODk3Yzg5OTA2YTI0IiwiaW1wb3J0IHsgRW5naW5lIH0gZnJvbSBcIi4vZ2xhemUvZWNzL0VuZ2luZVwiO1xuaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSBcIi4vZ2xhemUvZWNzL1N5c3RlbVwiO1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4vZ2xhemUvZWNzL0VudGl0eVwiO1xuXG5jbGFzcyBQb3NpdGlvbiB7XG4gICAgcHVibGljIHg7XG4gICAgcHVibGljIHk7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgfVxufVxuXG5jbGFzcyBHcmFwaGljcyB7XG4gICAgcHVibGljIHJlZjtcbiAgICBjb25zdHJ1Y3RvcihyZWYpIHtcbiAgICAgICAgdGhpcy5yZWYgPSByZWY7XG4gICAgfVxufVxuXG5jbGFzcyBHcmFwaGljc1N5c3RlbSBleHRlbmRzIFN5c3RlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFtQb3NpdGlvbiwgR3JhcGhpY3NdKTtcbiAgICB9XG5cbiAgICBvbkVudGl0eUFkZGVkKGVudGl0eTogRW50aXR5LCBwb3NpdGlvbjogUG9zaXRpb24sIGdyYXBoaWNzOiBHcmFwaGljcykge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFkZGVkIFwiLCBwb3NpdGlvbik7XG4gICAgfVxuXG4gICAgdXBkYXRlRW50aXR5KGVudGl0eTogRW50aXR5LCBkdDogbnVtYmVyLCBwb3NpdGlvbjogUG9zaXRpb24sIGdyYXBoaWNzOiBHcmFwaGljcykge1xuICAgICAgICBjb25zb2xlLmxvZyhlbnRpdHksIGR0LCBhKTtcbiAgICB9XG59XG5cbmNvbnN0IGVuZ2luZSA9IG5ldyBFbmdpbmUoKTtcbmVuZ2luZS5hZGRDYXBhY2l0eVRvRW5naW5lKDEwKTtcbmVuZ2luZS5hZGRTeXN0ZW1Ub0VuZ2luZShuZXcgR3JhcGhpY3NTeXN0ZW0oKSk7XG5cbmNvbnN0IGUgPSBlbmdpbmUuY3JlYXRlRW50aXR5KCk7XG5lbmdpbmUuYWRkQ29tcG9uZW50c1RvRW50aXR5KGUsIFtuZXcgUG9zaXRpb24oKSwgbmV3IEdyYXBoaWNzKDEpXSk7XG5cbmNvbnNvbGUubG9nKGVuZ2luZSk7XG5sZXQgYSA9IDI7XG5lbmdpbmUudXBkYXRlKDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW1wb3J0IHsgSUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi9Db21wb25lbnRcIjtcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCIuL0VudGl0eVwiO1xuaW1wb3J0IHsgUG9vbCB9IGZyb20gXCIuLi91dGlsL1Bvb2xcIjtcbmltcG9ydCB7IFN5c3RlbSB9IGZyb20gXCIuL1N5c3RlbVwiO1xuXG5leHBvcnQgY2xhc3MgRW5naW5lIHtcbiAgICBwcml2YXRlIGNvbXBvbmVudHM6IE1hcDxzdHJpbmcsIGFueVtdPjtcbiAgICBwcml2YXRlIGVudGl0aWVzOiBFbnRpdHlbXTtcbiAgICBwcml2YXRlIHN5c3RlbXM6IFN5c3RlbVtdO1xuICAgIHByaXZhdGUgZW50aXR5UG9vbDogUG9vbDxFbnRpdHk+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5zeXN0ZW1zID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMuZW50aXR5UG9vbCA9IG5ldyBQb29sKGkgPT4gaSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENhcGFjaXR5VG9FbmdpbmUoZW50aXR5Q291bnQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmVudGl0eVBvb2wuYWRkQ2FwYWNpdHkoZW50aXR5Q291bnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoXywgbmFtZTogc3RyaW5nKSA9PlxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChuYW1lLCBbLi4udGhpcy5jb21wb25lbnRzLmdldChuYW1lKSwgLi4uZW1wdHlOdWxsQXJyYXkodGhpcy5lbnRpdHlQb29sLmNhcGFjaXR5KV0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVFbnRpdHkoKTogRW50aXR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5UG9vbC5yZXNlcnZlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENvbXBvbmVudHNUb0VudGl0eShlbnRpdHk6IEVudGl0eSwgY29tcG9uZW50c1RvQWRkOiBhbnlbXSkge1xuICAgICAgICBjb21wb25lbnRzVG9BZGQuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50cy5oYXMobmFtZSkpIHRoaXMuY29tcG9uZW50cy5nZXQobmFtZSlbZW50aXR5XSA9IGNvbXBvbmVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWF0Y2hFbnRpdHkoZW50aXR5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkU3lzdGVtVG9FbmdpbmUoc3lzdGVtOiBTeXN0ZW0pIHtcbiAgICAgICAgdGhpcy5zeXN0ZW1zLnB1c2goc3lzdGVtKTtcbiAgICAgICAgc3lzdGVtLmNvbXBvbmVudHMuZm9yRWFjaCgobmFtZTogc3RyaW5nKSA9PlxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChuYW1lLCBlbXB0eU51bGxBcnJheSh0aGlzLmVudGl0eVBvb2wuY2FwYWNpdHkpKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zeXN0ZW1zLmZvckVhY2goc3lzdGVtID0+IHN5c3RlbS51cGRhdGVTeXN0ZW0oZHQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hdGNoRW50aXR5KGVudGl0eTogRW50aXR5KSB7XG4gICAgICAgIHRoaXMuc3lzdGVtcy5mb3JFYWNoKFxuICAgICAgICAgICAgc3lzdGVtID0+XG4gICAgICAgICAgICAgICAgc3lzdGVtLmNvbXBvbmVudHMucmVkdWNlKFxuICAgICAgICAgICAgICAgICAgICAoc3VtLCBuYW1lKSA9PiAodGhpcy5jb21wb25lbnRzLmdldChuYW1lKVtlbnRpdHldID8gc3VtIC0gMSA6IHN1bSksXG4gICAgICAgICAgICAgICAgICAgIHN5c3RlbS5jb21wb25lbnRzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICApID09PSAwXG4gICAgICAgICAgICAgICAgICAgID8gc3lzdGVtLmFkZEVudGl0eShlbnRpdHksIHRoaXMuZW50aXR5Q29tcG9uZW50c0ZvclN5c3RlbShlbnRpdHksIHN5c3RlbSkpXG4gICAgICAgICAgICAgICAgICAgIDogc3lzdGVtLnJlbW92ZUVudGl0eShlbnRpdHkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW50aXR5Q29tcG9uZW50c0ZvclN5c3RlbShlbnRpdHk6IEVudGl0eSwgc3lzdGVtOiBTeXN0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHN5c3RlbS5jb21wb25lbnRzLm1hcChuYW1lID0+IHRoaXMuY29tcG9uZW50cy5nZXQobmFtZSlbZW50aXR5XSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRFbnRpdGllc1RvQ29tcG9uZW50TGlzdChjb21wb25lbnROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChjb21wb25lbnROYW1lLCBlbXB0eU51bGxBcnJheSh0aGlzLmVudGl0eVBvb2wuY2FwYWNpdHkpKTtcbiAgICB9XG59XG5cbi8vIGNvbnN0IHNldElkT25Db21wb25lbnQgPSAoY29tcG9uZW50OiBJQ29tcG9uZW50PGFueT4sIGlkOiBudW1iZXIpID0+IChjb21wb25lbnQuX2lkXyA9IGlkKTtcbmNvbnN0IGVtcHR5QXJyYXkgPSAoKSA9PiBbXTtcbmNvbnN0IGVtcHR5TnVsbEFycmF5ID0gY291bnQgPT4gQXJyYXkoY291bnQpLmZpbGwobnVsbCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZWNzL0VuZ2luZS50cyIsInR5cGUgcG9vbEZhY3Rvcnk8VD4gPSAoaW5kZXg6IG51bWJlcikgPT4gVDtcblxuZXhwb3J0IGNsYXNzIFBvb2w8VD4ge1xuXG4gICAgcHJpdmF0ZSBwb29sOiBUW107XG4gICAgcHJpdmF0ZSBmYWN0b3J5OiBwb29sRmFjdG9yeTxUPjtcbiAgICBwcml2YXRlIG5leHRBdmFpbGFibGVJbmRleDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoZmFjdG9yeTogcG9vbEZhY3Rvcnk8VD4pIHtcbiAgICAgICAgdGhpcy5wb29sID0gW107XG4gICAgICAgIHRoaXMuZmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgICAgIHRoaXMubmV4dEF2YWlsYWJsZUluZGV4ID0gLTE7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENhcGFjaXR5KGNhcGFjaXR5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wb29sID0gWy4uLmVudGl0eVJhbmdlKHRoaXMucG9vbC5sZW5ndGgsIGNhcGFjaXR5KSwgLi4udGhpcy5wb29sXTtcbiAgICAgICAgdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXggKz0gY2FwYWNpdHk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2VydmUoKTogVCB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnBvb2xbdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXhdO1xuICAgICAgICB0aGlzLnBvb2xbdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXhdID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXgtLTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgcHVibGljIGZyZWUoaXRlbTogVCkge1xuICAgICAgICB0aGlzLm5leHRBdmFpbGFibGVJbmRleCsrO1xuICAgICAgICB0aGlzLnBvb2xbdGhpcy5uZXh0QXZhaWxhYmxlSW5kZXhdID0gaXRlbTtcbiAgICB9XG5cbiAgICBnZXQgY2FwYWNpdHkoKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5wb29sLmxlbmd0aDtcbiAgICB9XG59XG5cbmNvbnN0IGVtcHR5TnVsbEFycmF5ID0gY291bnQgPT4gQXJyYXkoY291bnQpLmZpbGwobnVsbCk7XG5jb25zdCByZXZlcnNlT3JkZXIgPSAoYSwgYikgPT4gYiAtIGE7XG5jb25zdCBlbnRpdHlSYW5nZSA9IChzdGFydCwgbGVuKSA9PlxuICAgIGVtcHR5TnVsbEFycmF5KGxlbilcbiAgICAgICAgLm1hcCgoXywgaSkgPT4gc3RhcnQgKyBpKVxuICAgICAgICAuc29ydChyZXZlcnNlT3JkZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dsYXplL3V0aWwvUG9vbC50cyIsImltcG9ydCB7IElDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4vQ29tcG9uZW50XCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiLi9FbnRpdHlcIjtcblxuZXhwb3J0IGNsYXNzIFN5c3RlbSB7XG4gICAgcHVibGljIGNvbXBvbmVudHM6IHN0cmluZ1tdO1xuICAgIHB1YmxpYyBtZW1iZXJzOiBNYXA8RW50aXR5LCBhbnlbXT47XG5cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRzOiBJQ29tcG9uZW50RmFjdG9yeVtdKSB7XG4gICAgICAgIHRoaXMubWVtYmVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cy5tYXAoZmFjdG9yeSA9PiBmYWN0b3J5Lm5hbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRFbnRpdHkoZW50aXR5OiBFbnRpdHksIGNvbXBvbmVudHM6IGFueVtdKSB7XG4gICAgICAgIHRoaXMubWVtYmVycy5zZXQoZW50aXR5LCBjb21wb25lbnRzKTtcbiAgICAgICAgdGhpcy5vbkVudGl0eUFkZGVkKGVudGl0eSwgLi4uY29tcG9uZW50cyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRW50aXR5QWRkZWQoZW50aXR5OiBFbnRpdHksIC4uLmNvbXBvbmVudHM6IGFueVtdKSB7fVxuXG4gICAgcHVibGljIHJlbW92ZUVudGl0eShlbnRpdHk6IEVudGl0eSkge1xuICAgICAgICBpZiAoIXRoaXMubWVtYmVycy5oYXMoZW50aXR5KSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm9uRW50aXR5UmVtb3ZlZChlbnRpdHksIC4uLnRoaXMubWVtYmVycy5nZXQoZW50aXR5KSk7XG4gICAgICAgIHRoaXMubWVtYmVycy5kZWxldGUoZW50aXR5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25FbnRpdHlSZW1vdmVkKGVudGl0eTogRW50aXR5LCAuLi5jb21wb25lbnRzOiBhbnlbXSkge31cblxuICAgIHB1YmxpYyB1cGRhdGVTeXN0ZW0oZHQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1lbWJlcnMuZm9yRWFjaCgoY29tcG9uZW50cywgZW50aXR5KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVudGl0eShlbnRpdHksIGR0LCAuLi5jb21wb25lbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUVudGl0eShlbnRpdHk6IEVudGl0eSwgZHQ6IG51bWJlciwgLi4uY29tcG9uZW50czogYW55W10pIHt9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2xhemUvZWNzL1N5c3RlbS50cyJdLCJzb3VyY2VSb290IjoiIn0=