/**
 * Created by zhaofeng on 2016/11/1.
 */
window.onload = function () {
    var width = document.getElementById('targetElement').clientWidth;
    window.siren = new Siren({
        target: 'targetElement',
        height: 200,
        width: width,
        speed: [0.01 * 0.4, 0.08 * 0.4],
        peak: 40,
        angleStep: 0.005,
        isPositive: true
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