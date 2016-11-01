# Siren Wave
![wave animation](https://raw.githubusercontent.com/i5sing/i5sing-images/master/siren/wave.gif)   

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
    target: 'targetElement',
    height: 100,
    width: 300
});

siren.draw();
```
## Exapmle
[demo](http://miaowing.me/siren-wave/example/index.html) 

## API

### new Siren(options)
1. target    
the element id.
2. width    
it's optional, if it does not exist, the canvas's width will be it parent's width.
3. height    
it's optional.
4. color    
wave's color.
5. bgColor    
background color.
6. alpha   
the alpha of two waves, such as [0.6, 0.3].
7. speed   
wave's speed.

### siren.draw()
start wave animation.

### siren.update(options)
update some params.

## Feedback
If you any questions, use [Issues](https://github.com/miaowing/siren-wave/issues).

Sina Weibo: [@miaowingz](http://weibo.com/zfeng217)

## License
MIT Licence.
