(function () {

  // _ = require('underscore')

  if(typeof SnakeGame == "undefined") {
    window.SnakeGame = {};
  }

  var DIR = {up: [0, -1], down: [0, 1], right: [1, 0], left: [-1, 0]}

  var Snake = SnakeGame.Snake = function() {
    // this.dir = _.sample(DIR);
    this.dir = DIR['up'];
    this.segments = [[12, 12],[12, 13],[12, 14]];
  }

  Snake.prototype.move = function() {
    this.segments.pop();
    var newSeg = [this.segments[0][0] + this.dir[0], this.segments[0][1] + this.dir[1]];
    this.segments.unshift(newSeg);
  }

  Snake.prototype.turn = function(direction) {
    this.dir = DIR[direction];
  }



})();


