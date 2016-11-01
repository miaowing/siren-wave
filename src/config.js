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
        opt.color = options.color ? options.color : '#7cd5f4';
        opt.bgColor = options.bgColor ? options.bgColor : 'white';
        opt.alpha = options.alpha && options.alpha.length > 1 ? options.alpha : [0.4, 0.2];
        opt.callback = options.callback;
        opt.speed = options.speed ? options.speed : 1;

        return opt;
    }
}