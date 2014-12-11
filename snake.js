(function () {

  if(typeof SnakeGame == "undefined") {
    window.SnakeGame = {};
  }

  var DIR = {up: [-1, 0], down: [1, 0], right: [0, 1], left: [0, -1]}

  var Snake = SnakeGame.Snake = function() {
    this.dir = DIR['up'];
    this.segments = [[12, 12],[13, 12],[14, 12]];
	this.grow = false;
  }

  Snake.prototype.move = function() {
    var newSeg = [this.segments[0][0] + this.dir[0], this.segments[0][1] + this.dir[1]];
    this.segments.unshift(newSeg);
	
    if (this.grow) {
	  this.grow = false;
	} else {	
      this.segments.pop();
	}
	
	return this;
  }

  Snake.prototype.turn = function(direction) {
	if (!this.isOpposite(direction)) {
      this.dir = DIR[direction];
    } // otherwise the turn is not valid; do nothing
  }
  
  Snake.prototype.isOpposite = function (newDir) {
	  return (this.dir[0] === (DIR[newDir][0] * -1)) && 
	  		 (this.dir[1] === (DIR[newDir][1] * -1))
  }
})();


