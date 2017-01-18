/**
 * Created by zhaofeng on 2016/10/31.
 */
export default class Config {
    static getOptions(options = {}) {
        let opt = {};
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
}