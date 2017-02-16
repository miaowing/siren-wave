# Siren Wave  
This is a graphic wave animational effect library implemented by canvas.

## Usage
```
$ npm install siren-wave --save
```
or
```html
<script src="./node_modules/siren_wave/dist/siren-wave.min.js"></script>
```

```javascript
var Siren = require('siren-wave');

var siren = new Siren({
    target: 'wave',
    height: 200,
    color: '#96ddf6',
    width: 600,
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

siren.draw();
```
## Exapmle
* [demo](http://miaow.io/siren-wave/example/index.html) 
* [i5SING](http://i5sing.com) 

## API

### new Siren(options)
###### 1. target
the element id.

###### 2. width [number]
it's optional, if it does not exist, the canvas's width will be it parent's width.

###### 3. height [number]
it's optional.

###### 4. color [#rgb]
wave's color.

###### 5. bgColor [#rgb]
background color.

###### 6. waves [array]

### wave
###### 1. alpha [array]
the alpha of two waves, such as [0.6, 0.3].

###### 2. speed [array]
wave's speed, such as [0.01 * 0.4, 0.08 * 0.4].

###### 3. angleStep [number]
wave's angle, default is 0.01.

###### 4. peak [number]
wave's height.

###### 5. isPositive [boolean]
wave moves from left to right or moves right to left.

### siren.draw()
start wave animation.

### siren.update(options)
update some params.

## Feedback
If you any questions, use [Issues](https://github.com/miaowing/siren-wave/issues).

Sina Weibo: [@miaowingz](http://weibo.com/zfeng217)

## License
MIT Licence.
