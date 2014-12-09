(function () {
  if(typeof SnakeGame == "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(snake, apple) {
    this.snake = snake;
    this.apple = apple || this.placeApple();
    this.grid = this.generateGrid();
    this.render();
	if (this.appleIsConsumed()) {
		this.apple = this.placeApple();
		this.snake.grow = true;
    };
  };
  
  Board.prototype.placeApple = function () {
	  var coords = [
	  	Math.floor(Math.random() * 25), //random number 0-24
   	    Math.floor(Math.random() * 25)
	  ];
	  if ($.inArray(coords, this.snake.segments) === -1) {
		return coords;
	  } else {
		  return this.placeApple(); // this doesn't seem to be working
	  }
  }
  
  Board.prototype.generateGrid = function () {
    var grid = new Array(25);
    for (var i = 0; i < 25; i++) {
      grid[i] = new Array(25);
    }
    return grid;
  }

  Board.prototype.render = function() {
    for (var i = 0; i < 25; i ++) {
      for (var j = 0; j < 25; j ++) {
        this.grid[i][j] = '';
      }
    }
    var that = this
    this.snake.segments.forEach(function(segment) {
      that.grid[segment[0]][segment[1]] = "S";
    });
	this.grid[this.apple[0]][this.apple[1]] = "A";
  }
  
  Board.prototype.appleIsConsumed = function () {
	return String(this.snake.segments[0]) === String(this.apple); // JS is weird
  }
})();