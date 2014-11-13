(function () {
  if(typeof SnakeGame == "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(snake) {
    this.snake = snake;
    this.apples = [];
    this.grid = this.generateGrid();
    // .render();
  };

  Board.prototype.generateGrid = function() {
    var grid = new Array(24);
    for (var i = 0; i < 24; i++) {
      grid[i] = new Array(24);
    }

    return grid;
  }

  Board.prototype.render = function() {
    var that = this
    for (var i = 0; i < 24; i ++) {
      for (var j = 0; j < 24; j ++) {
        this.grid[i][j] = '';
      }
    }
    this.snake.segments.forEach(function(segment) {
      that.grid[segment[0]][segment[1]] = "S";
    });
  }

})();