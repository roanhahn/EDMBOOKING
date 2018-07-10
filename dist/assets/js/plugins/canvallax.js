/*! Canvallax, v1.2.1 (built 2015-11-13) https://github.com/shshaw/Canvallax.js @preserve */
(function(){

  var win = window,
      doc = document,
      root = doc.documentElement,
      body = doc.body,
      requestAnimationFrame = win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || win.msRequestAnimationFrame || win.oRequestAnimationFrame || function(callback){ win.setTimeout(callback, 20); },

      noop = function(){},

      // Default options
      defaults = {

        tracking: 'scroll',
        // (false||'scroll'||'pointer')
        // If 'scroll', the `x` and `y` of the scene are tied to document's scroll for a typical parallax experience.
        // If 'pointer', the `x` and `y` of the scene will be tied to the pointer (mouse or touch)
        // Set to false if you want to control the scene's X and Y manually, perfect for animating with GSAP.

        trackingInvert: false,
        // (true||'invertx'||'inverty')
        // Inversion of the tracking values.
        // If true, 'invertx' or 'inverty', the appropriate axes will be reversed on scroll.

        x: 0,
        // (Number)
        // Starting x position.
        // If `tracking` is enabled, this will be overridden on render.

        y: 0,
        // (Number)
        // Starting y position.
        // If `tracking` is enabled, this will be overridden on render.

        damping: 1,
        // (Number)
        // The 'easing' of the x & y position when updated. 1 = none, higher is longer.
        // If you're syncing parallax items to regular items in the scroll, then you'll probably want a low damping.

        canvas: undefined,
        // (Node)
        // Use Canvallax on an existing canvas node, otherwise one is created.

        className: '',
        // (String)
        // Classes to add to the canvas, in addition to the 'canvallax' class automatically added.

        parent: document.body,
        // (Node)
        // Canvas is prepended to document.body by default. Override with your own node if you want it within a certain container.

        elements: undefined,
        // (Array)
        // Collection of elements to render on the Canvallax instance

        animating: true,
        // (Boolean)
        // Update canvas every requestAnimationFrame call.

        fullscreen: true,
        // (Boolean)
        // Set the canvas width and height to the size of the window, and update on window resize. Otherwise, the provided with and height will be used.

        preRender: noop,
        // (Function)
        // Callback before elements are rendered.

        postRender: noop
        // (Function)
        // Callback after elements are rendered.

      },

      // Only one scroll tracker that works for every Canvallax instance
      watchingScroll = false,
      winScrollX = 0,
      winScrollY = 0,
      onScroll = function(){
        winScrollX = root.scrollLeft || body.scrollLeft;
        winScrollY = root.scrollTop || body.scrollTop;
      },

      // Only one pointer tracker that works for every Canvallax instance
      watchingPointer = false,
      winPointerX = 0,
      winPointerY = 0,
      onPointerMove = function(e){
        winPointerX = ( e.touches ? e.touches[0].clientX : e.clientX ); // touch support
        winPointerY = ( e.touches ? e.touches[0].clientY : e.clientY ); // touch support
      };


  // Check for canvas support, exit out if no supprt
  if ( !win.CanvasRenderingContext2D ) { return win.Canvallax = function(){ return false; }; }

  win.Canvallax = function Canvallax(options) {
    // Make new instance if not called with `new Canvallax`
    if ( !(this instanceof Canvallax) ) { return new Canvallax(options); }

    var C = this;

    Canvallax.extend(this,defaults,options);

    C.canvas = C.canvas || doc.createElement('canvas');
    C.canvas.className += ' canvallax ' + C.className;

    C.parent.insertBefore(C.canvas, C.parent.firstChild);

    if ( C.fullscreen ) {
      C.resizeFullscreen();
      win.addEventListener('resize', C.resizeFullscreen.bind(C));
    } else {
      C.resize(C.width,C.height);
    }

    C.ctx = C.canvas.getContext('2d');

    C.elements = [];
    if ( options && options.elements ) { C.addElements(options.elements); }

    C.damping = ( !C.damping || C.damping < 1 ? 1 : C.damping );

    C.render();

    return C;
  }

////////////////////////////////////////

  function _zIndexSort(a,b){
    return (a.zIndex === b.zIndex ? 0 : a.zIndex < b.zIndex ? -1 : 1 );
  }

  Canvallax.prototype = {

    _x: 0,
    _y: 0,

    add: function(el){

      var elements = el.length ? el : arguments,
          len = elements.length,
          i = 0;

      for ( ; i < len; i++ ) {
        this.elements.push(elements[i]);
      }

      this.elements.sort(_zIndexSort);
      return this;
    },

    remove: function(element){
      var index = this.elements.indexOf(element);

      if ( index > -1 ) {
        this.elements.splice(index, 1);
      }
      return this;
    },

    render: function() {
      var C = this,
          i = 0,
          len = C.elements.length,
          offsetLeft = 0,
          offsetTop = 0,
          inBounds = C.fullscreen || C.tracking !== 'pointer';

      if ( C.animating ) { C.animating = requestAnimationFrame(C.render.bind(C)); }

      if ( C.tracking ) {

        if ( C.tracking === 'scroll' ) {

          if ( !watchingScroll ) {
            watchingScroll = true;
            onScroll();
            win.addEventListener('scroll', onScroll);
            win.addEventListener('touchmove', onScroll);
          }

          C.x = winScrollX;
          C.y = winScrollY;

        } else if ( C.tracking === 'pointer' ) {

          if ( !watchingPointer ) {
            watchingPointer = true;
            win.addEventListener('mousemove', onPointerMove);
            win.addEventListener('touchmove', onPointerMove);
          }

          if ( !inBounds ) {
            offsetLeft = C.canvas.offsetLeft;
            offsetTop = C.canvas.offsetTop;

            inBounds = winPointerX >= offsetLeft && winPointerX <= offsetLeft + C.width && winPointerY >= offsetTop && winPointerY <= offsetTop + C.height;
          }

          if ( inBounds ) {
            C.x = -winPointerX + offsetLeft;
            C.y = -winPointerY + offsetTop;
          }

        }

        C.x = ( inBounds && (C.trackingInvert === true || C.trackingInvert === 'invertx') ? -C.x : C.x );
        C.y = ( inBounds && (C.trackingInvert === true || C.trackingInvert === 'inverty') ? -C.y : C.y );

      }

      C._x += ( -C.x - C._x ) / C.damping;
      C._y += ( -C.y - C._y ) / C.damping;

      C.ctx.clearRect(0, 0, C.width, C.height);
      //C.ctx.scale(C.zoom,C.zoom);

      C.preRender(C.ctx,C);

      for ( ; i < len; i++ ){
        C.ctx.save();
        C.elements[i]._render(C.ctx,C);
        C.ctx.restore();
      }

      C.postRender(C.ctx,C);

      return this;
    },

    resize: function(width,height){
      this.width = this.canvas.width = width;
      this.height = this.canvas.height = height;
      return this;
    },

    resizeFullscreen: function() {
      return this.resize(win.innerWidth,win.innerHeight);
    },

    play: function(){
      this.animating = true;
      return this.render();
    },

    pause: function(){
      this.animating = false;
      return this;
    }
  };

////////////////////////////////////////

  Canvallax.createElement = (function(){

    function _getTransformPoint(el){

      var checksum = _makePointChecksum(el);

      if ( !el._pointCache || el._pointChecksum !== checksum ) {
        el._pointCache = el.getTransformPoint();
        el._pointChecksum = checksum;
      }

      return el._pointCache;
    }

    function _makePointChecksum(el){
      return [el.transformOrigin,el.x,el.y,el.width,el.height,el.size].join(' ');
    }

    var rad = Math.PI / 180,
        elementPrototype = {

          x: 0,
          // (Number)
          // Horizontal position within the Canvallax canvas

          y: 0,
          // (Number)
          // Vertical position within the Canvallax canvas

          distance: 1,
          // (Number)
          // How far away from the camera, essentially controlling the speed of the elements movement.
          // If `scale` is not set to `false`, the element's distance value also affects the size, making elements appear closer or farther away.
          // `1` means the element will move at the same speed as the Canvallax instance, `0.5` means half speed, `2` means twice the speed.

          fixed: false,
          // (Boolean)
          // If `false`, the element will move with Canvallax
          // If `true`, the element will remain locked into its `x` and `y` positions.

          opacity: 1,
          // (Number)
          // Element's transparency. `0` is invisible, `1` is fully visible.

          fill: false,
          // (Color||`false`)
          // Fill in the element with a color.

          stroke: false,
          // (Color||`false`)
          // Add a stroke to the element.

          lineWidth: false,
          // (Number)
          // Width of the stroke.

          transformOrigin: 'center center',
          // (String)
          // Where the element's transforms will occur, two keywords separated by a space.
          // The default of `'center center'` means that `rotation` and `scale` transforms will occur from the center of the element.
          // The first keyword can be `left`, `center` or `right` cooresponding to the appropriate horizontal position.
          // The second keyword can be `top`, `center` or `bottom` cooresponding to the appropriate vertical position.

          scale: 1,
          // (Number||`false`)
          // How large the element should be rendered relative to its natural size, affected by the `transformOrigin` property.
          // Scaling will be in addition to the `distance` property's scaling.
          // If `false`, the element will not be scaled with the `distance` property.

          rotation: 0,
          // (Number)
          // Amount of rotation in degrees (0-360), affected by the `transformOrigin` property.

          preRender: noop,
          // (Function)
          // Arguments: (C.context,C) where C is the Canvallax instance that the element is being rendered on.
          // Callback function triggered before the element is rendered.

          render: noop,
          // (Function)
          // Arguments: (C.context,C) where C is the Canvallax instance that the element is being rendered on.
          // Callback function to actually draw the element.
          // If you're using a built-in element type, you usually won't want to overwrite this.

          postRender: noop,
          // (Function)
          // Arguments: (C.context,C) where C is the Canvallax instance that the element is being rendered on.
          // Callback function triggered after the element is rendered.

          init: noop,
          // (Function)
          // Callback function triggered when the element is first created.
          // Receives all arguments passed to the element's creation function.

          crop: false,
          // (Object||Function)
          // Crop the element by providing an object with the `x`, `y`, `width` and `height` of a rectangle, relative to the canvas origin.
          // A callback function can also be used to draw the path for cropping the element.

          getTransformPoint: function(){
            var el = this,
                origin = el.transformOrigin.split(' '),
                point = {
                  x: el.x,
                  y: el.y
                };

            if ( origin[0] === 'center' ) {
              point.x += ( el.width ? el.width / 2 : el.size );
            } else if ( origin[0] === 'right' ) {
              point.x += ( el.width ? el.width : el.size * 2 );
            }

            if ( origin[1] === 'center' ) {
              point.y += ( el.height ? el.height / 2 : el.size );
            } else if ( origin[1] === 'bottom' ) {
              point.y += ( el.height ? el.height : el.size * 2 );
            }

            return point;
          },

          _render: function(ctx,C) {
            var el = this,
                distance = el.distance || 1,
                x = C._x,
                y = C._y,
                transformPoint = _getTransformPoint(el);

            el.preRender.call(el,ctx,C);

            if ( el.blend ) { C.ctx.globalCompositeOperation = el.blend; }
            C.ctx.globalAlpha = el.opacity;

            C.ctx.translate(transformPoint.x, transformPoint.y);

            if ( el.scale === false ) {
              x *= distance;
              y *= distance;
            } else {
              C.ctx.scale(distance, distance);
            }

            if ( !el.fixed ) { C.ctx.translate(x, y); }
            if ( el.scale !== false ) { C.ctx.scale(el.scale, el.scale); }
            if ( el.rotation ) { C.ctx.rotate(el.rotation * rad); }

            C.ctx.translate(-transformPoint.x, -transformPoint.y);

            if ( el.crop ) {
              ctx.beginPath();
              if ( typeof el.crop === 'function' ) {
                el.crop.call(el,ctx,C);
              } else {
                ctx.rect(el.crop.x, el.crop.y, el.crop.width, el.crop.height);
              }
              ctx.clip();
              ctx.closePath();
            }

            if ( el.outline ) {
              ctx.beginPath();
              ctx.rect(el.x, el.y, el.width || el.size * 2, el.height || el.size * 2);
              ctx.closePath();
              ctx.strokeStyle = el.outline;
              ctx.stroke();
            }

            el.render.call(el,ctx,C);

            if ( this.fill ) {
              ctx.fillStyle = this.fill;
              ctx.fill();
            }

            if ( this.stroke ) {
              if ( this.lineWidth ) { ctx.lineWidth = this.lineWidth; }
              ctx.strokeStyle = this.stroke;
              ctx.stroke();
            }

            el.postRender.call(el,ctx,C);

            return el;
          },

          clone: function(props){

            var props = Canvallax.extend({}, this, props);

            return new this.constructor(props);
          }

        };

    return function(defaults){

      function El(options) {
        if ( !(this instanceof El) ) { return new El(options); }

        Canvallax.extend(this,options);
        this.init.apply(this,arguments);

        return this;
      }

      El.prototype = Canvallax.extend({},elementPrototype,defaults);
      El.prototype.constructor = El;
      El.clone = El.prototype.clone;

      return El;
    };

  })();

////////////////////////////////////////

  Canvallax.extend = function(target) {
    target = target || {};

    var length = arguments.length,
        i = 1;

    if ( arguments.length === 1 ) {
      target = this;
      i = 0;
    }

    for ( ; i < length; i++ ) {
      if ( !arguments[i] ) { continue; }
      for ( var key in arguments[i] ) {
        if ( arguments[i].hasOwnProperty(key) ) { target[key] = arguments[i][key]; }
      }
    }

    return target;
  };

////////////////////////////////////////

  var twoPI = 2 * Math.PI;

  Canvallax.Circle = Canvallax.createElement({

    size: 20,
    // (Number)
    // Radius of the circle.

    render: function(ctx) {
      ctx.beginPath();
      ctx.arc(this.x + this.size, this.y + this.size, this.size, 0, twoPI);
      ctx.closePath();
    }

  });

////////////////////////////////////////

  Canvallax.Element = Canvallax.createElement();

////////////////////////////////////////

  function imageOnload(){
    this.width = ( this.width ? this.width : this.image.width );
    this.height = ( this.height ? this.height : this.image.height );
  }

  Canvallax.Image = Canvallax.createElement({

    src: null,
    // (String)
    // URL of the image to be rendered. Not necessary if an image node is provided

    image: null,
    // (Node)
    // Image node to be drawn on the canvas. If not provided, a new Image node will be created.

    width: null,
    // (Number)
    // Width to render the image. Will be set to the `src` image's width if not provided.

    height: null,
    // (Number)
    // Height to render the image. Will be set to the `src` image's height if not provided.

    init: function(options){

      this.image = ( this.image && this.image.nodeType === 1 ? this.image : options && options.nodeType === 1 ? options : (new Image) );

      // Ensure we get width/height of image for best draw performance
      imageOnload.bind(this)();
      this.image.onload = imageOnload.bind(this);

      this.image.src = this.image.src || options.src || options;

    },

    render: function(ctx){
      if ( this.image ) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }
  });

////////////////////////////////////////

  var twoPI = 2 * Math.PI;

  Canvallax.Polygon = Canvallax.createElement({

    sides: 6,
    // (Number)
    // Number of the polygon's sides. `3` is a triangle, `4` is a square, etc.

    size: 20,
    // (Number)
    // Radius of the polygon.

    render: function(ctx) {
      // Polygon math adapted from http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
      var i = this.sides;

      ctx.translate(this.x + this.size,this.y + this.size);

      ctx.beginPath();
      ctx.moveTo(this.size, 0);

      while (i--) {
        ctx.lineTo(
          this.size * Math.cos((i * twoPI) / this.sides),
          this.size * Math.sin((i * twoPI) / this.sides)
        );
      }

      ctx.closePath();
    }

  });

////////////////////////////////////////

  Canvallax.Rectangle = Canvallax.createElement({

    width: 100,
    // (Number)
    // Width of the rectangle.

    height: 100,
    // (Number)
    // Height of the rectangle.

    render: function(ctx) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.closePath();
    }

  });

})();



var can = Canvallax({
  className: 'bg-canvas',
  damping: 40
});

// Clouds
(function(){

  ////////////////////////////////////////


  var origWidth = width = document.body.clientWidth,
      origHeight = height = document.getElementById("main").clientHeight;

  // var gradient = Canvallax.Rectangle({
  //   width: width * 1.5,
  //   height: height * 1.1,
  //   zIndex: 1,

  //   })()
  // });

  // can.add(gradient);

  function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

  var stars = [],
      number = 300,
      i = 0,
      distance;

  for (; i < number; i++) {
    distance = randomRange(0.1,0.3);
    stars.push(
      Canvallax.Circle({
        x: Math.random() * width,
        y: Math.random() * height * 0.9,
        distance: distance,
        size: 4,
        fill: '#FFF',
      })
    );
  }

  can.add(stars);

  window.addEventListener('resize', function(){

    height = document.body.clientHeight;

    var i = can.elements.length,
        max = document.body.clientWidth,
        heightScale = height / origHeight;

    console.log(height,origHeight,heightScale);

    while (i--){
      can.elements[i].maxX = max; //document.body.clientWidth;
      can.elements[i].origY = can.elements[i].origY || can.elements[i].y;
      can.elements[i].y = can.elements[i].origY * heightScale;
    }
  });

  ////////////////////////////////////////

  // Adapted from https://bost.ocks.org/mike/algorithms/
  function bestCandidateSampler(width, height, numCandidates) {

    var samples = [];

    function findDistance(a, b) {
      var dx = a[0] - b[0],
          dy = a[1] - b[1];
      return dx * dx + dy * dy;
    }

    function findClosest(c){
      var i = samples.length,
          sample,
          closest,
          distance,
          closestDistance;

      while(i--){
        sample = samples[i];
        distance = findDistance(sample,c);

        if ( !closestDistance || distance < closestDistance ) {
          closest = sample;
          closestDistance = distance;
        }
      }

      return closest;
    }

    function getSample() {
      var bestCandidate,
          bestDistance = 0,
          i = 0,
          c, d;

      c = [Math.random() * width, Math.random() * height];

      if ( samples.length < 1 ) {
        bestCandidate = c;
      } else {
        for (; i < numCandidates; i++) {
          c = [Math.random() * width, Math.random() * height];
          d = findDistance(findClosest(c), c);

          if (d > bestDistance) {
            bestDistance = d;
            bestCandidate = c;
          }
        }
      }

      samples.push(bestCandidate);
      //console.log('bestCandidate',bestCandidate);
      return bestCandidate;
    }

    getSample.all = function(){ return samples; };
    getSample.samples = samples;

    return getSample;
  }

  var getCandidate = bestCandidateSampler(width,height,10);

  var CLOUD_COUNT = 1000,
      CLOUD_WIDTH = 510,
      CLOUD_HEIGHT = 260;

  CLOUD_COUNT = Math.floor(( width * height ) / (CLOUD_WIDTH * CLOUD_HEIGHT));
    CLOUD_COUNT = 8;

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomizedCloud(image){

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = randomRange(400,700), //CLOUD_WIDTH,
        height = canvas.height = randomRange(200,260),//CLOUD_HEIGHT,
        w = image.width,
        h = image.height,
        halfw = w / 2,
        halfh = h / 2,
        i = Math.ceil(randomRange(20,90)), //60
        flip,
        randScale,
        randTex,
        maxScale = 2.5,
        fullPi = Math.PI / 2;

    while (i--){
      randScale = randomRange(0.4,maxScale);
      ctx.globalAlpha = Math.random() - 0.2;
      ctx.translate(randomRange(halfw, width - ( w * maxScale * 1.3)),randomRange(halfh + halfh / 4,height - (h* maxScale)));
      ctx.scale(randScale,randomRange(randScale - 0.3,randScale));
      ctx.translate(halfw,halfh);
      ctx.rotate(randomRange(0,fullPi));
      ctx.drawImage(image, -halfw, -halfh);//, w, h, 0, 0, w, h);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    return canvas;//.toDataURL();
  }

  var cloudImg = new Image();

  cloudImg.addEventListener('load',function(){

    var i = CLOUD_COUNT, //Math.ceil(CLOUD_COUNT * 0.5),
        el, rand, pos, tex;

    while(i--) {
      rand = randomRange(0.4, 1.2);
      pos = getCandidate();
      tex = randomizedCloud(cloudImg);

      cloud = Canvallax.Image({
        image: tex,
        width: tex.width,
        height: tex.height,
        //init: function(){},

        zIndex: rand * 13,
        x: pos[0],
        y: pos[1],
        opacity: (rand < 0.8 ? 0.8 : rand ),
        distance: rand,

        maxX: width,
        speed: rand * randomRange(0.2,0.4),
        postRender: function(){
          this.x = (this.x * this.distance) > -this.width ? this.x - this.speed : this.maxX + (this.width * 2) ;
        }
      });

      can.add(cloud);
    }

    can.render();
  });

  cloudImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAAAYFBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GYpHzAAAAIHRSTlMAAwcLDxIWGh8kKzI5QEhPVl9qc3uEi5Sdpa64wcrV4c6KdP8AAAOeSURBVHgBndQJkvM8DoNhS+nv/ieONBH8FIs1nb83ZLfF1wBFZ17vNMZ8fPz79/GY46Xre8F85kRzzhdk/A2TOpSARpF/g0mdaI8XZjg47leA32Jo3wbEooNE/SFGrPOAiPxC+xaDAxBTxQqFoW8wGGof89E4j8nQUceo621h/KY8GuXx4Mg10vRZlPd55JCEnXlIQX7cE8pNp8Dob4oY8LjZTny8QEMo2o2hSqT5YImxchVNbpgZ3oVR4xVUgOlGS5fFKCPSWDY4Yu1xIKyEEqLfE0UUKcoJ9MFVsAhnaOpEGW4gyxFyLitOeRhZO8NJur1hKpWWCV03oaG9yYcYXvD7UPbetVOMNwqlWH6/b7sp29G1Z5g6LFGaY9uYB2A6M7evtVco3U3M1CCopOlNY8Q7cdZahxIMTpv7meR2NghWDqdu8MTZzwMqN+RaBkmdUgf7wMfN1d1cNSAFMdhQ3tLXu2STuclylwYL5QYhsGyLz499bcgxK1F5SmumvaoRrIwSjYutaGbVZIgze6wegLO6i8MD2kJ1N1cYKAUXTLnRWxtnYrMONWRRD+EsA3utw4mnKxNCZRgplK5T05ycvaaZCmtAOEKl+p4ge70k06mcdrQoPgGpbY1EboNyY7/ZHVsfK1BLhBAdCA5MGd719b0gUOJmg9vc5hf3E+K2y1EQDnCjxoGs3t84WiA6zI253rVy6MRnSKNxJtQcRY3xL90MkN6DYGZHI3zBMaF1NcoUQ3Oll+9RBqHb1uIzSTmv9LtQOJbC7Ci/fRsivh0+sBrYwix3GKe8No5yHJTDaZqhqOp8KC6BdmXrFKFaXUUWk7uCLsRPbuAZrmsPjCANBKChIZj/97IBzSJq3pgpymiYRmnxMLG9YbinUGCk5rxbUhJDy/yH+C5U3wP1FQWDL5AtWpNQm0IRz/ys+psCTSKuCObTjY3KhLoCrbUY7ZgIqHRXrTSFHxwfFjcM1fWF8devtJPK2XtM6nAOpcrCXDlVR967qRi6XOY78NJsi95gcsJynMXF2k6gAFFhVFGLz0loz5u0HGoEGF6qOoVgC6cOB6iBb0Ixue66p+p8F+v17VkhUTqGXP6pVptC8JU07z0Ga5VqjmUpvBvuC8wpej4bJiXK+ZHnazfXyfUSipxPVJQvMTjppUKlFUVvv8PIVftrSIRD+Q6DQ7a47wzE9xjaYJk1Fty1v8CYauOLm+fv3Cikjv4lBqVCAP6n/gfZhdXQlm1mfwAAAABJRU5ErkJggg==';

})();