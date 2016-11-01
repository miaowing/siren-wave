/**
 * Created by zhaofeng on 2016/10/31.
 */
import Config from './config';
import Wave from './wave';
import {extend} from './utils';

export default class Siren {
    constructor(options = {}) {
        this.options = Config.getOptions(options);
        this.ctx = this.getCanvasContext();
        this.timerId = null;

        this.ctx.strokeStyle = this.options.color;
        this.ctx.lineWidth = 1;
        this.ctx.translate(this.options.width / 2, this.options.height / 2);

        this.createWaves();
    }

    getCanvasContext() {
        this.canvas = null;
        let targetEl = document.getElementById(this.options.target);
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

    createWaves() {
        this.waveFront = new Wave({
            alpha: this.options.alpha[0],
            yOffset: 0,
            yEnd: this.options.height,
            xEnd: this.options.width,
            speed: 0.06 * this.options.speed
        });

        this.waveBehind = new Wave({
            alpha: this.options.alpha[1],
            yOffset: -4,
            yEnd: this.options.height,
            xEnd: this.options.width,
            speed: 0.07 * this.options.speed
        });
    }

    update(options) {
        extend(this.options, options);
        cancelAnimationFrame(this.timerId);

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
        this.draw();
    }

    draw() {
        this.ctx.clearRect(
            -this.options.width / 2,
            -this.options.height / 2,
            this.options.width,
            this.options.height);

        this.waveBehind.render(this.ctx);
        this.waveFront.render(this.ctx);

        this.timerId = requestAnimationFrame(this.draw.bind(this));
    }
}