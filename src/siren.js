/**
 * Created by zhaofeng on 2016/10/31.
 */
import Config from './config';
import Wave from './wave';
import {extend} from './utils';

export default class Siren {
    constructor(options = {}) {
        this.options = Config.getOptions(options);
        this.waveList = [];
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
        this.waveList = [];
        this.waves = this.options.waves;

        this.waves.forEach(opt => {
            this.waveList.push(new Wave({
                alpha: opt.alpha,
                yOffset: opt.yOffset,
                yEnd: this.options.height,
                xEnd: this.options.width,
                speed: opt.speed,
                angleStep: opt.angleStep,
                peak: opt.peak,
                isPositive: opt.isPositive
            }));
        });
    }

    update(options) {
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

    draw() {
        this.ctx.clearRect(
            -this.options.width / 2,
            -this.options.height / 2,
            this.options.width,
            this.options.height);

        this.waveList.forEach(wave => wave.render(this.ctx));

        cancelAnimationFrame(this.timerId);
        this.timerId = requestAnimationFrame(this.draw.bind(this));
    }

    stop() {
        if (this.timerId) {
            cancelAnimationFrame(this.timerId);
            this.timerId = null;
        }
    }
}