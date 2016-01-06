draw = new (function(){

  var _this = this;

	this.wh = window.innerHeight;
	this.ww = window.innerWidth;

  this.c = [];
  this.c['mountain'] = document.getElementById('cm');
  this.c['trees'] = document.getElementById('ct');
  this.c['rails'] = document.getElementById('cr');
  this.c['near'] = document.getElementById('cn');

  this.ctx = [];
  this.ctx['mountain'] = this.c['mountain'].getContext('2d');
  this.ctx['trees'] = this.c['trees'].getContext('2d');
  this.ctx['rails'] = this.c['rails'].getContext('2d');
  this.ctx['near'] = this.c['near'].getContext('2d');

  for(var i in this.ctx){
    this.ctx[i].width = 2 * window.innerWidth;
    this.ctx[i].height = window.innerHeight+50;
    this.c[i].width = 2 * window.innerWidth;
    this.c[i].height = window.innerHeight+50;
    this.c[i].style.width = (2 * window.innerWidth) +'px';
    this.c[i].style.height = (window.innerHeight+50)+'px';
  }

  console.log(this.ctx)

  this.init = []
  _this.mountain = [];
  this.init['mountain'] = function(){
    var w = 2 * window.innerWidth;
    _this.minc = 150;
    for(var i = -50 - (2 * _this.minc); i <= w + (4*_this.minc) -50 - (2 * _this.minc); i += (2*_this.minc)){
      _this.mountain.push([i,(Math.random() * 50) + 180]);
      _this.mountain.push([i + _this.minc,(Math.random() * 50) - 50]);
    }

  };
  _this.treesFar = []
  this.init['trees'] = function(){
    _this.farTree = _this.tree( 100, 100, 3, 30);
    for(var i = -350; i < (window.innerWidth + 350); i += 50){
      _this.treesFar.push({
        x: i + (Math.random() * 15) - 30,
        y: (Math.random() * 20)
      });
    }


    var c = document.createElement('canvas');
    c.height = 300;
    c.width = _this.ww * 2;
    var context = c.getContext("2d");
    context.shadowColor = '#222';
    context.shadowBlur = 4;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = -1;
    context.lineWidth = 2;
    context.fillStyle = 'rgb(120, 156, 105)';
    context.beginPath();
    context.rect(0, 4, _this.ww * 2, 300);
    context.stroke();
    context.fill();
    _this.farGround = c;

  };

  _this.treesNear = []
  this.init['near'] = function(){
    _this.nearTree = _this.tree( 150, 150, 5, 50);
    for(var i = -400; i < (window.innerWidth + 400); i += 80){
      _this.treesNear.push({
        x: i + (Math.random() * 30) - 50,
        y: (Math.random() * 20)
      });
    }


    var c = document.createElement('canvas');
    c.height = 100;
    c.width = _this.ww * 2;
    var context = c.getContext("2d");
    context.shadowColor = '#222';
    context.shadowBlur = 6;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = -1;
    context.lineWidth = 2;
    context.fillStyle = 'rgb(124, 168, 106)';
    context.beginPath();
    context.rect(0, 4, _this.ww * 2, 300);
    context.stroke();
    context.fill();
    _this.nearGround = c;

  };

  this.init['rails'] = function(){
    _this.engine = _this.trainEngine();
    _this.car = _this.trainCar();

    var c = document.createElement('canvas');
    c.height = 100;
    c.width = _this.ww * 2;
    var context = c.getContext("2d");
    context.shadowColor = '#222';
    context.shadowBlur = 6;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = -1;
    context.lineWidth = 2;
    context.fillStyle = 'rgb(135, 125, 83)';
    context.beginPath();
    context.rect(0, 4, _this.ww * 2, 300);
    context.stroke();
    context.fill();
    _this.railGround = c;
  }

  this.trainEngine = function(){
  	var ncnv = document.createElement('canvas');
  	ncnv.height = 300;
  	ncnv.width = 500;
  	var nctx = ncnv.getContext("2d");
    nctx.scale(.15,.15);

  	nctx.strikeStyle = '#222';
  	nctx.lineWidth = 4;

  	nctx.fillStyle = '#222';
  	roundRect(nctx,10,220,460,50,10)
  	nctx.fillRect(400,40,20,40)

  	nctx.fillStyle = '#aaa';
  	nctx.beginPath();
    nctx.arc(80, 260, 40, 0, 2 * Math.PI, false);
    nctx.arc(380, 260, 40, 0, 2 * Math.PI, false);
  	nctx.stroke();
  	nctx.fill();

  	nctx.beginPath();
  	nctx.moveTo(4,14);
  	nctx.quadraticCurveTo(4,4,14,4)
  	nctx.lineTo(210,4);
  	nctx.quadraticCurveTo(220,4,220,14);
  	nctx.lineTo(220,230);
  	nctx.lineTo(222,230);
  	nctx.lineTo(222,80);
  	nctx.lineTo(470,80);
  	nctx.quadraticCurveTo(480,80,480,90);
  	nctx.lineTo(480,230);
  	nctx.lineTo(4,230);
  	nctx.closePath();
  	nctx.fillStyle = '#FF9933'
  	nctx.stroke();
  	nctx.fill();


  	nctx.fillStyle = '#222'
  	roundRect(nctx,160,20,40,120,5)

  	return nctx.canvas;
  }

  this.trainCar = function(){
  	var ncnv = document.createElement('canvas');
  	ncnv.height = 300;
  	ncnv.width = 500;
  	var nctx = ncnv.getContext("2d");
    nctx.scale(.15,.15);

  	nctx.fillStyle = '#222';
  	nctx.fillRect(380,160,50,50);

  	nctx.strikeStyle = '#222';
  	nctx.lineWidth = 4;

  	nctx.fillStyle = '#222';
  	roundRect(nctx,20,210,440,50,10);
  	nctx.fillStyle = 'rgb(135, 114, 66)';
  	roundRect(nctx,4,185,480,30,0);

  	nctx.fillStyle = '#aaa';
  	nctx.beginPath();
    nctx.arc(80, 260, 40, 0, 2 * Math.PI, false);
    nctx.arc(380, 260, 40, 0, 2 * Math.PI, false);
  	nctx.stroke();
  	nctx.fill();

  	return ncnv;
  }


  roundRect = function (mctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    mctx.beginPath();
    mctx.moveTo(x+r, y);
    mctx.arcTo(x+w, y,   x+w, y+h, r);
    mctx.arcTo(x+w, y+h, x,   y+h, r);
    mctx.arcTo(x,   y+h, x,   y,   r);
    mctx.arcTo(x,   y,   x+w, y,   r);
    mctx.closePath();
  	mctx.stroke();
  	mctx.fill();
  	return mctx
  }

  //http://www.williammalone.com/briefs/how-to-draw-ellipse-html5-canvas/
  this.drawEllipse = function(context, centerX, centerY, width, height) {

    context.moveTo(centerX, centerY - height/2); // A1

    context.bezierCurveTo(
      centerX + width/2, centerY - height/2, // C1
      centerX + width/2, centerY + height/2, // C2
      centerX, centerY + height/2
    ); // A2

    context.bezierCurveTo(
      centerX - width/2, centerY + height/2, // C3
      centerX - width/2, centerY - height/2, // C4
      centerX, centerY - height/2
    ); // A1
  }

  this.tree = function(x,y,w,h){

    var c = document.createElement('canvas');
    c.height = x;
    c.width = y;

    var context = c.getContext("2d");

    context.strokeStyle = '#222';

    context.shadowColor = '#222';
    context.shadowBlur = w;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = -1;

    context.lineWidth = 1;
    context.fillStyle = 'rgb(134, 115, 80)';
    context.beginPath();
    context.rect((x/2) - (w/2), y/2, w, h);
    context.stroke();
    context.fill();

    context.lineWidth = 2;
    context.fillStyle = 'rgb(68, 99, 53)';
    context.beginPath();
    _this.drawEllipse(context, x/2, y/2, x/4, y/2);
    context.stroke();
    context.fill();

    return c;
  }

  this.draw = [];
  this.draw['mountain'] = function(speed){
    context = _this.ctx['mountain'];
    context.clearRect(0,0,2 * _this.ww,_this.wh);

    for(var i = 0; i < _this.mountain.length; i++)
      _this.mountain[i][0] -= speed;

    if(_this.mountain[0][0] < -50 - (2 * _this.minc) || _this.mc === undefined){
      console.log('poke');
      _this.mountain.shift();
      _this.mountain.shift();
      var x = _this.mountain[_this.mountain.length - 1][0];
      _this.mountain.push([x + _this.minc,      (Math.random() * 20) + 150]);
      _this.mountain.push([x + (2 * _this.minc),(Math.random() * 50)]);
      console.log(x,x+_this.minc,x + (2 * _this.minc))

    	_this.mc = document.createElement('canvas');
    	_this.mc.height = _this.wh,
    	_this.mc.width = 2 * _this.ww,_this.wh;
    	var context = _this.mc.getContext("2d");

    	context.lineWidth = 4;
    	context.strokeStyle = '#222';
    	context.fillStyle = 'rgb(86, 129, 68)';

      context.beginPath();
      context.moveTo(-10, _this.wh + 10);
      context.lineTo[_this.mountain[0],_this.wh - _this.mountain[1]]

      for(var i = 0; i < _this.mountain.length - 2; i += 2)
        context.bezierCurveTo(
          _this.mountain[i][0],  _this.wh - 380 + _this.mountain[i][1],
          _this.mountain[i+1][0],_this.wh - 380 + _this.mountain[i+1][1],
          _this.mountain[i+2][0],_this.wh - 380 + _this.mountain[i+2][1]
      )

      context.lineTo(_this.ww*2+10, _this.wh + 10);
      context.closePath();

      context.shadowColor = '#222';
      context.shadowBlur = 20;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 5;

      context.stroke();
      context.fill();

    }

    _this.ctx['mountain'].drawImage(_this.mc, _this.mountain[0][0], 0);

  }
  this.draw['trees'] = function(speed){
    _this.ctx['trees'].clearRect(0,0,2 * _this.ww,_this.wh);
    _this.ctx['trees'].drawImage(_this.farGround, 0, _this.wh - 140);

    for(var i = 0; i < _this.treesFar.length; i++){

      _this.treesFar[i].x -= speed;
      if(_this.treesFar[i].x <= -350)
        _this.treesFar[i].x = _this.ww + 350;

      _this.ctx['trees'].drawImage(
        _this.farTree,
        _this.ww / 2 +  _this.treesFar[i].x,
        _this.wh - 190 - _this.treesFar[i].y
      );
    }
  }
  var asdf = 0;
  this.draw['rails'] = function(speed){
    _this.ctx['rails'].clearRect(0,0,2 * _this.ww,_this.wh);
    _this.ctx['rails'].drawImage(_this.railGround, 0, _this.wh - 98);
    _this.ctx['rails'].drawImage(_this.engine, _this.ww, _this.wh - 140);
    _this.ctx['rails'].drawImage(_this.car, _this.ww - 80, _this.wh - 140);
    _this.ctx['rails'].drawImage(_this.car, _this.ww - 165, _this.wh - 140);
    _this.ctx['rails'].drawImage(_this.car, _this.ww - 250, _this.wh - 140);
  }

  this.draw['near'] = function(speed){
    _this.ctx['near'].clearRect(0,0,2 * _this.ww,_this.wh);
    _this.ctx['near'].drawImage(_this.nearGround, 0, _this.wh - 70);

    for(var i = 0; i < _this.treesNear.length; i++){
      _this.treesNear[i].x -= speed;
      if(_this.treesNear[i].x <= -400)
        _this.treesNear[i].x = _this.ww + 400;

      _this.ctx['near'].drawImage(
        _this.nearTree,
        _this.ww / 2 +  _this.treesNear[i].x,
        _this.wh - 170 - _this.treesNear[i].y
      );
    }
  }

  this.init['mountain']();
  this.init['trees']();
  this.init['rails']();
  this.init['near']();

  _this.frame = function(){
    _this.draw['mountain'](1);
    _this.draw['trees'](2);
    _this.draw['rails'](2.5);
    _this.draw['near'](3);
    //setTimeout(_this.frame, 1000/18);
    requestAnimationFrame(_this.frame)
  };

})();

setTimeout(draw.frame,100);
//console.log(draw.points['mountain']());
