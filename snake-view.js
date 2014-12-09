(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
	this.snake = new SnakeGame.Snake;
    this.board = new SnakeGame.Board(this.snake);
    this.$el = $el;

    this.bindEvents();
    this.renderBoard();
	setInterval(this.makeMove.bind(this), 200);
  }
  
  var KEYS = {37: 'left', 38: 'up', 39: 'right', 40: 'down'}
	  
  View.prototype.bindEvents = function () {
    $(window).on('keydown', (function (event) {
	  event.preventDefault();
	  var dir = KEYS[event.keyCode];
	  if (dir) {
	    this.snake.turn(dir);
	  }
    }).bind(this));
  }

  View.prototype.makeMove = function () {
	  if (this.board.gameOver) {
		this.renderGameOver();
		return;
	  }
	  var apple = this.board.apple;
	  this.board = new SnakeGame.Board(this.snake.move(), apple);
	  this.renderBoard();
  }

  View.prototype.renderBoard = function () {
    var that = this;
    var megaString = "";
    for (var i = 0; i < 25; i++) {
      for (var j = 0; j < 25; j++) {
        var pos = [i, j];
        if (that.board.grid[i][j] == "S") {
          megaString += "<div data-pos=[" + pos + "] data-snake='true' class='square'></div>";
        } else if (that.board.grid[i][j] == "A") {
          megaString += "<div data-pos=[" + pos + "] data-snake='apple' class='square'></div>";	
		} else {
          megaString += "<div data-pos=[" + pos + "] data-snake='false' class='square'></div>";
        }
      }
    }

    this.$el.html(megaString);
  }
  
  View.prototype.renderGameOver = function () {
	  this.$el.html("<div class='game-over'><h1>Game Over</h1><h3>Score: " +  + "</h3></div>");
  }
})();
