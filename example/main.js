/**
 * Created by zhaofeng on 2016/11/1.
 */
window.onload = function () {
    var width = document.getElementById('targetElement').clientWidth;
    window.siren = new Siren({
        target: 'targetElement',
        height: 200,
        width: width,
        waves: [
            {
                alpha: 0.2,
                yOffset: 0,
                speed: 0.03 * 0.4,
                angleStep: 0.006,
                peak: 48,
                isPositive: true
            },
            {
                alpha: 0.2,
                yOffset: 30,
                speed: 0.01 * 0.4,
                angleStep: 0.01,
                peak: 18,
                isPositive: true
            },
            {
                alpha: 0.2,
                yOffset: 0,
                speed: 0.02 * 0.4,
                angleStep: 0.009,
                peak: 25,
                isPositive: true
            }
        ]
    });
    window.siren.draw();
};

window.onresize = function () {
    var width = document.getElementById('targetElement').clientWidth;
    window.siren.update({
        width: width
    });

    window.siren.draw();
}