/*!
 * siren-wave v0.1.0
 * (c) 2018 miaowing
 * Released under the MIT License.
 */
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * Created by zhaofeng on 2016/10/31.
 */
var Config = function () {
    function Config() {
        classCallCheck(this, Config);
    }

    createClass(Config, null, [{
        key: 'getOptions',
        value: function getOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var opt = {};
            opt.params = options;

            opt.target = options.target;
            opt.width = options.width;
            opt.height = options.height;
            opt.bgColor = options.bgColor ? options.bgColor : 'white';
            opt.waves = options.waves || [];
            opt.color = options.color ? options.color : '#7cd5f4';
            opt.callback = options.callback;

            /*
             move in waves.
              opt.alpha = options.alpha && options.alpha.length > 1 ? options.alpha : [0.4, 0.2];
             opt.speed = options.speed && options.speed.length > 1 ? options.speed : [0.01 * 0.4, 0.08 * 0.4];
             opt.angleStep = options.angleStep || 0.01;
             opt.peak = options.peak || 18;
             opt.isPositive = options.isPositive || true;
             */

            return opt;
        }
    }]);
    return Config;
}();

/**
 * Created by zhaofeng on 2016/11/1.
 */
function extend(to, from) {
    var keys = Object.keys(from);
    var i = keys.length;
    while (i--) {
        to[keys[i]] = from[keys[i]];
    }
    return to;
}

/**
 * Created by zhaofeng on 2016/10/31.
 */
var Wave = function () {
    function Wave() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, Wave);

        this.xPos = 0;
        this.yPos = 0;
        this.yEnd = options.yEnd || 0;
        this.xEnd = options.xEnd || 0;
        this.xStep = 1;
        this.angleStep = options.angleStep || 0.01;
        this.angle = 0;
        this.alpha = options.alpha ? options.alpha : 1;
        this.peak = options.peak ? options.peak : 18;
        this.yOffset = options.yOffset ? options.yOffset : 0;
        this.speed = options.speed ? options.speed : 0.06;
        this.count = Math.PI / 2;
        this.isPositive = options.isPositive || true;
    }

    createClass(Wave, [{
        key: 'getAngle',
        value: function getAngle() {
            this.count += this.speed;
            return this.count;
        }
    }, {
        key: 'dist',
        value: function dist(x1, y1, x2, y2) {
            x2 = x2 ? x2 : 0;
            y2 = y2 ? y2 : 0;
            return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        }
    }, {
        key: 'render',
        value: function render(ctx) {
            ctx.save();
            ctx.globalAlpha = this.alpha;

            this.angle = this.getAngle();
            this.xPos = -this.xEnd / 2;
            this.yPos = 0;

            ctx.beginPath();

            while (this.xPos < this.xEnd) {
                var nextXPos = this.xPos + this.xStep;
                var nextYPos = Math.sin(this.angle) * this.peak + this.yOffset;
                var nextAngle = this.isPositive ? this.angle - this.angleStep : this.angle + this.angleStep;

                ctx.moveTo(this.xPos - 0.5, this.yPos);
                ctx.lineTo(this.xPos - 0.5, this.yEnd);

                this.xPos = nextXPos;
                this.yPos = this.dist(nextXPos, nextYPos) < this.xEnd ? nextYPos : this.yEnd * (this.yOffset > 0 ? 1 : -1);
                this.angle = nextAngle;
            }

            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
    }, {
        key: 'update',
        value: function update(options) {
            extend(this, options);
        }
    }]);
    return Wave;
}();

/**
 * Created by zhaofeng on 2016/10/31.
 */
var Siren = function () {
    function Siren() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, Siren);

        this.options = Config.getOptions(options);
        this.waveList = [];
        this.ctx = this.getCanvasContext();
        this.timerId = null;

        this.ctx.strokeStyle = this.options.color;
        this.ctx.lineWidth = 1;
        this.ctx.translate(this.options.width / 2, this.options.height / 2);

        this.createWaves();
    }

    createClass(Siren, [{
        key: 'getCanvasContext',
        value: function getCanvasContext() {
            this.canvas = null;
            var targetEl = document.getElementById(this.options.target);
            if (targetEl) {
                this.canvas = document.createElement("canvas");
                this.canvas.setAttribute("height", this.options.height || targetEl.offsetHeight);
                this.canvas.setAttribute("width", this.options.width || targetEl.offsetWidth);
                targetEl.appendChild(this.canvas);
            } else {
                this.canvas = document.querySelector('canvas');
            }

            if (!this.canvas) throw new Error('cannot find canvas');

            return this.canvas.getContext('2d');
        }
    }, {
        key: 'createWaves',
        value: function createWaves() {
            var _this = this;

            this.waveList = [];
            this.waves = this.options.waves;

            this.waves.forEach(function (opt) {
                _this.waveList.push(new Wave({
                    alpha: opt.alpha,
                    yOffset: opt.yOffset,
                    yEnd: _this.options.height,
                    xEnd: _this.options.width,
                    speed: opt.speed,
                    angleStep: opt.angleStep,
                    peak: opt.peak,
                    isPositive: opt.isPositive
                }));
            });
        }
    }, {
        key: 'update',
        value: function update(options) {
            extend(this.options, options);

            if (options.height) {
                this.canvas.setAttribute('height', options.height);
            }

            if (options.width) {
                this.canvas.setAttribute('width', options.width + '');
            }

            this.ctx.strokeStyle = this.options.color;
            this.ctx.lineWidth = 1;
            this.ctx.translate(this.options.width / 2, this.options.height / 2);
            this.createWaves();
        }
    }, {
        key: 'draw',
        value: function draw() {
            var _this2 = this;

            this.ctx.clearRect(-this.options.width / 2, -this.options.height / 2, this.options.width, this.options.height);

            this.waveList.forEach(function (wave) {
                return wave.render(_this2.ctx);
            });

            cancelAnimationFrame(this.timerId);
            this.timerId = requestAnimationFrame(this.draw.bind(this));
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.timerId) {
                cancelAnimationFrame(this.timerId);
                this.timerId = null;
            }
        }
    }]);
    return Siren;
}();

module.exports = Siren;
