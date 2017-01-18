/**
 * Created by zhaofeng on 2016/10/31.
 */
import {extend} from './utils';

export default class Wave {
    constructor(options = {}) {
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

    getAngle() {
        this.count += this.speed;
        return this.count;
    }

    dist(x1, y1, x2, y2) {
        x2 = x2 ? x2 : 0;
        y2 = y2 ? y2 : 0;
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }

    render(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;

        this.angle = this.getAngle();
        this.xPos = -this.xEnd / 2;
        this.yPos = 0;

        ctx.beginPath();

        while (this.xPos < this.xEnd) {
            const nextXPos = this.xPos + this.xStep;
            const nextYPos = Math.sin(this.angle) * this.peak + this.yOffset;
            const nextAngle = this.isPositive ? (this.angle - this.angleStep) : (this.angle + this.angleStep);

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

    update(options) {
        extend(this, options);
    }
}