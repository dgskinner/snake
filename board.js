(function () {
  if(typeof SnakeGame == "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(snake, apple) {
    this.snake = snake;
    this.apple = apple || this.placeApple();
    this.grid = this.generateGrid();
	
	if (this.appleIsConsumed()) {
		this.apple = this.placeApple();
		this.snake.grow = true;
    }
	
  	if (this.snakeCollidesWithSelf() || this.snakeCollidesWithBorder()) {
  		this.gameOver = true;
  	} else {
		this.render();
	}
  };
  
  Board.prototype.placeApple = function () {
	  var newAppleCoords = [
	  	Math.floor(Math.random() * 25),
	    Math.floor(Math.random() * 25)
	  ];
	  if (this.coordsInSnake(newAppleCoords, 0)) {
		return this.placeApple();
	  } else {
		return newAppleCoords;
	  }
  }
  
  Board.prototype.coordsInSnake = function (appleCoords, slicePoint) {
	  var inSnake = false;
	  this.snake.segments.slice(slicePoint).forEach( function (segment) {
		  if (String(segment) === String(appleCoords)) {
			  inSnake = true;
			  return;
		  }
	  });
	  return inSnake;
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
    var that = this;
    this.snake.segments.forEach(function (segment) {
      that.grid[segment[0]][segment[1]] = "S";
    });
	this.grid[this.apple[0]][this.apple[1]] = "A";
  }
  
  Board.prototype.appleIsConsumed = function () {
	return String(this.snake.segments[0]) === String(this.apple); // JS is weird
  }
  
  Board.prototype.snakeCollidesWithSelf = function () {
	  var snakeHead = this.snake.segments[0];
	  return this.coordsInSnake(snakeHead, 3); // check if head collides with body
  }
  
  Board.prototype.snakeCollidesWithBorder = function () {
	  var snakeHead = this.snake.segments[0];
  	  return (snakeHead[0] > 24 || snakeHead[0] < 0) || 
	  		 (snakeHead[1] > 24 || snakeHead[1] < 0)
  }
})();