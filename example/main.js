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
            // small
            {
                alpha: 0.1,
                yOffset: 40,
                speed: 0.02 * 0.4,
                angleStep: 0.0075,
                peak: 35,
                isPositive: true
            },
            // large
            {
                alpha: 0.1,
                yOffset: -20,
                speed: 0.05 * 0.4,
                angleStep: 0.0055,
                peak: 45,
                isPositive: true
            },
            // middle
            {
                alpha: 0.2,
                yOffset: 0,
                speed: 0.025 * 0.4,
                angleStep: 0.0055,
                peak: 30,
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