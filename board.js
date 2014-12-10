(function () {
  if(typeof SnakeGame == "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(snake, apple, turds, score) {
    this.snake = snake;
	this.snakeHead = snake.segments[0];
    this.apple = apple || this.placeApple();
	this.turds = turds || [];
	this.score = score || 0;
    this.grid = this.generateGrid();
	
	if (this.appleIsConsumed()) {
		this.apple = this.placeApple();
		this.snake.grow = true;
		this.score += 10;
		this.turds.push(this.snake.segments[this.snake.segments.length - 1]);
    }
	
  	if (this.snakeCollidesWithSelf()   ||  
	    this.snakeCollidesWithBorder() ||
		this.snakeCollidesWithTurd()     ) {
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
	  if (this.coordsInArray(newAppleCoords, this.snake.segments)) {
		return this.placeApple();
	  } else {
		return newAppleCoords;
	  }
  }
  
  Board.prototype.coordsInArray = function (coords, array) {
	  var inArray = false;
	  array.forEach(function (item) {
		  if (String(item) === String(coords)) {
			  inArray = true;
			  return;
		  }
	  });
	  return inArray;
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
	this.turds.forEach(function (turd) {
		debugger
      that.grid[turd[0]][turd[1]] = "T";
	});
	this.grid[this.apple[0]][this.apple[1]] = "A";
  }
  
  Board.prototype.appleIsConsumed = function () {
	return String(this.snake.segments[0]) === String(this.apple); // JS is weird
  }
  
  Board.prototype.snakeCollidesWithSelf = function () {
	  return this.coordsInArray(this.snakeHead, this.snake.segments.slice(3)); 
	  // check if head collides with body
  }
  
  Board.prototype.snakeCollidesWithBorder = function () {
	  var snakeHead = this.snake.segments[0];
  	  return (this.snakeHead[0] > 24 || this.snakeHead[0] < 0) || 
	  		 (this.snakeHead[1] > 24 || this.snakeHead[1] < 0)
  }
  
  Board.prototype.snakeCollidesWithTurd = function () {
	  return this.coordsInArray(this.snakeHead, this.turds);
  }
})();