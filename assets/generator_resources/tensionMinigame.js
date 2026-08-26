var firstLayer = project.activeLayer;
var secondLayer = new Layer();
secondLayer.activate();

//CROSSHAIRS
targetIn = new Path.Circle(view.center, 25);
targetIn.strokeColor = 'white';
targetIn.strokeWidth = 6;

targetOut = new Path.Circle(view.center, 25);
targetOut.strokeColor = 'black';
targetOut.strokeWidth = 3;

cross1 = new Path.Line({
  from: [view.center.x + 15, view.center.y - 15],
  to: [view.center.x + 5, view.center.y - 5],
  strokeColor: 'white',
  strokeWidth: 4
});

cross1dark = new Path.Line({
  from: [view.center.x + 15, view.center.y - 15],
  to: [view.center.x + 5, view.center.y - 5],
  strokeColor: 'black',
  strokeWidth: 2
});

cross2 = new Path.Line({
  from: [view.center.x + 15, view.center.y + 15],
  to: [view.center.x + 5, view.center.y + 5],
  strokeColor: 'white',
  strokeWidth: 4
});

cross2dark = new Path.Line({
  from: [view.center.x + 15, view.center.y + 15],
  to: [view.center.x + 5, view.center.y + 5],
  strokeColor: 'black',
  strokeWidth: 2
});

cross3 = new Path.Line({
  from: [view.center.x - 15, view.center.y - 15],
  to: [view.center.x - 5, view.center.y - 5],
  strokeColor: 'white',
  strokeWidth: 4
});

cross3dark = new Path.Line({
  from: [view.center.x - 15, view.center.y - 15],
  to: [view.center.x - 5, view.center.y - 5],
  strokeColor: 'black',
  strokeWidth: 2
});

cross4 = new Path.Line({
  from: [view.center.x - 15, view.center.y + 15],
  to: [view.center.x - 5, view.center.y + 5],
  strokeColor: 'white',
  strokeWidth: 4
});


cross4dark = new Path.Line({
  from: [view.center.x - 15, view.center.y + 15],
  to: [view.center.x - 5, view.center.y + 5],
  strokeColor: 'black',
  strokeWidth: 2
});

firstLayer.activate();

// kynd.info 2014

function Ball(r, p, v, color) {
  this.radius = r;
  this.point = p;
  this.vector = v;
  this.maxVec = ballSpeed;
  this.numSegment = Math.floor(r / 3 + 2);
  this.boundOffset = [];
  this.boundOffsetBuff = [];
  this.sidePoints = [];
  this.path = new Path({
    fillColor: color
  });

  for (var i = 0; i < this.numSegment; i++) {
    this.boundOffset.push(this.radius);
    this.boundOffsetBuff.push(this.radius);
    this.path.add(new Point());
    this.sidePoints.push(new Point({
      angle: 360 / this.numSegment * i,
      length: 1
    }));
  }
}

Ball.prototype = {
  iterate: function () {
    this.checkBorders();
    if (this.vector.length > this.maxVec)
      this.vector.length = this.maxVec;
    this.point += this.vector;
    this.updateShape();
  },

  checkBorders: function () {
    var size = view.size;
    if (this.point.x < -this.radius)
      this.point.x = size.width + this.radius;
    if (this.point.x > size.width + this.radius)
      this.point.x = -this.radius;
    if (this.point.y < -this.radius)
      this.point.y = size.height + this.radius;
    if (this.point.y > size.height + this.radius)
      this.point.y = -this.radius;
  },

  updateShape: function () {
    var segments = this.path.segments;
    for (var i = 0; i < this.numSegment; i++)
      segments[i].point = this.getSidePoint(i);

    this.path.smooth();
    for (var i = 0; i < this.numSegment; i++) {
      if (this.boundOffset[i] < this.radius / 4)
        this.boundOffset[i] = this.radius / 4;
      var next = (i + 1) % this.numSegment;
      var prev = (i > 0) ? i - 1 : this.numSegment - 1;
      var offset = this.boundOffset[i];
      offset += (this.radius - offset) / 15;
      offset += ((this.boundOffset[next] + this.boundOffset[prev]) / 2 - offset) / 3;
      this.boundOffsetBuff[i] = this.boundOffset[i] = offset;
    }
  },

  react: function (b) {
    var dist = this.point.getDistance(b.point);
    if (dist < this.radius + b.radius && dist != 0) {
      var overlap = this.radius + b.radius - dist;
      var direc = (this.point - b.point).normalize(overlap * ballSquish);
      this.vector += direc;
      b.vector -= direc;

      this.calcBounds(b);
      b.calcBounds(this);
      this.updateBounds();
      b.updateBounds();
    }
  },

  getBoundOffset: function (b) {
    var diff = this.point - b;
    var angle = (diff.angle + 180) % 360;
    return this.boundOffset[Math.floor(angle / 360 * this.boundOffset.length)];
  },

  calcBounds: function (b) {
    for (var i = 0; i < this.numSegment; i++) {
      var tp = this.getSidePoint(i);
      var bLen = b.getBoundOffset(tp);
      var td = tp.getDistance(b.point);
      if (td < bLen) {
        this.boundOffsetBuff[i] -= (bLen - td) / 2;
      }
    }
  },

  getSidePoint: function (index) {
    return this.point + this.sidePoints[index] * this.boundOffset[index];
  },

  updateBounds: function () {
    for (var i = 0; i < this.numSegment; i++)
      this.boundOffset[i] = this.boundOffsetBuff[i];
  },

  removeBall: function () {
    this.vector = 0;
    deathFade = this.path.tween({
      'opacity': 0
    }, 2000);
  }
};

//--------------------- main ---------------------

var gameType = "dread"; //the global game type to remember.
var balls = [];
var score = 0;
var ballColors = [];
var ballSpeed = 0;
var ballSquish = 0.015;

window.newGame = function (gameName, numBalls, ballSize){
  deleteBalls();
  score = 0;
  document.getElementById("jengaScore").innerHTML = "Press Enter to Shoot Blobs<br>Score: " + score;
  gameType = gameName;
  if (gameType == "dread") {
    ballColors = [new Color("#a93226"), new Color("#c0392b"), new Color("#cd6155"), new Color("#ecf0f1"), new Color("#d0d3d4"), new Color("#f2f3f4")];
    ballSpeed = 6;
    ballSquish = 0.015;
  } else if (gameType == "star") {
    ballColors = [new Color("#d9328b"), new Color("#ffffff"), new Color("#c794c1"), new Color("#eddfec"), new Color("#cfafd2"), new Color("#eddfeb"), new Color("#e6c0d7"), new Color("#f3bf77"), new Color("#6f519c"), new Color("#a27ab2")];
    ballSquish = 0.005;
    ballSpeed = 10;
  } else if (gameType == "wretched") {
    ballColors = [new Color("#6dbeaf"), new Color("#5faf9e"), new Color("#b1fcfe"), new Color("#a2fcfe"), new Color("#72fafc"), new Color("#82d3be")];
    ballSpeed = 4;
    ballSquish = 0.03;
  } else {
    ballColors = [new Color(255, 255, 255)];
  }
  throwBalls(numBalls, ballSize);
}

throwBalls = function (numBalls, ballSize) {
  firstLayer.activate();

  for (i = 0; i < numBalls; i++) {
    position = Point.random() * view.size;
    vector = new Point({
      angle: 360 * Math.random(),
      length: Math.random() * 10
    });
    radius = Math.random() * 30 + ballSize;
    balls.push(new Ball(radius, position, vector, ballColors[Math.floor(Math.random() * ballColors.length)]));
  }
}

deleteBalls = function () {
  score = 0;
  while (balls.length > 0) {
    var deadBall = balls.splice(0, 1); //remove the ball
    //remove it
    deadBall[0].removeBall();
  }
}

//SPACEBAR
tool.onKeyDown = function (event) {
  if (event.key == 'enter') {
    firstLayer.activate();
    var blobHit = false;

    for (i = 0; i < balls.length; i++) {
      if (balls[i].path.contains(view.center)) {
        var oldBall = balls.splice(i, 1); //remove the ball from list
        oldBall[0].removeBall();
        blobHit = true;
      }
    }

    //SCORING STUFF
    if (blobHit) {
      score = score + 1;
      document.getElementById("jengaScore").innerHTML = "Press Enter to Shoot Blobs<br>Score: " + score;
      //add two smaller balls
      window.throwBalls(2, oldBall[0].radius / 3);
    } else {
      document.getElementById("jengaScore").innerHTML = "Game Over!<br>Score: " + score;
      deleteBalls();
    }
  }
}

function onFrame() {
  for (var i = 0; i < balls.length - 1; i++) {
    for (var j = i + 1; j < balls.length; j++) {
      balls[i].react(balls[j]);
    }
  }
  for (var i = 0, l = balls.length; i < l; i++) {
    balls[i].iterate();
  }
}

function onResize(event) {
  secondLayer.activate();

  //CROSSHAIRS
  targetIn.remove();
  targetIn = new Path.Circle(view.center, 20);
  targetIn.strokeColor = 'white';
  targetIn.strokeWidth = 6;

  targetOut.remove();
  targetOut = new Path.Circle(view.center, 20);
  targetOut.strokeColor = 'black';
  targetOut.strokeWidth = 3;

  cross1.remove();
  cross1 = new Path.Line({
    from: [view.center.x + 13, view.center.y - 13],
    to: [view.center.x + 2, view.center.y - 2],
    strokeColor: 'white',
    strokeWidth: 4
  });

  cross1dark.remove();
  cross1dark = new Path.Line({
    from: [view.center.x + 13, view.center.y - 13],
    to: [view.center.x + 2, view.center.y - 2],
    strokeColor: 'black',
    strokeWidth: 2
  });

  cross2.remove();
  cross2 = new Path.Line({
    from: [view.center.x + 13, view.center.y + 13],
    to: [view.center.x + 2, view.center.y + 2],
    strokeColor: 'white',
    strokeWidth: 4
  });

  cross2dark.remove();
  cross2dark = new Path.Line({
    from: [view.center.x + 13, view.center.y + 13],
    to: [view.center.x + 2, view.center.y + 2],
    strokeColor: 'black',
    strokeWidth: 2
  });

  cross3.remove();
  cross3 = new Path.Line({
    from: [view.center.x - 13, view.center.y - 13],
    to: [view.center.x - 2, view.center.y - 2],
    strokeColor: 'white',
    strokeWidth: 4
  });

  cross3dark.remove();
  cross3dark = new Path.Line({
    from: [view.center.x - 13, view.center.y - 13],
    to: [view.center.x - 2, view.center.y - 2],
    strokeColor: 'black',
    strokeWidth: 2
  });

  cross4.remove();
  cross4 = new Path.Line({
    from: [view.center.x - 13, view.center.y + 13],
    to: [view.center.x - 2, view.center.y + 2],
    strokeColor: 'white',
    strokeWidth: 4
  });

  cross4dark.remove();
  cross4dark = new Path.Line({
    from: [view.center.x - 13, view.center.y + 13],
    to: [view.center.x - 2, view.center.y + 2],
    strokeColor: 'black',
    strokeWidth: 2
  });

  firstLayer.activate();
}