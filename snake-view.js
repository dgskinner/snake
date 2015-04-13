(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var KEYS = {37: 'left', 38: 'up', 39: 'right', 40: 'down'}

  var StartView = SnakeGame.StartView = function ($el, score) {
    this.$el = $el;
	if (score >= 0) {
		this.$el.html("<div class='game-over'><h1>Game Over</h1><h2>Score: " + score + 
		"</h2><h3>Press any arrow key to play again</h3></div>");
	} else {
		this.$el.html("<div class='start'><h2>Press any arrow key to play Rattlesnake</h2></div>");
	}
	
	$(window).on('keydown', (function (event) {
	var dir = KEYS[event.keyCode];
	  if (dir) {
	    event.preventDefault();
		this.$el.empty();
		$(window).off('keydown');
  	    new SnakeGame.PlayView($el);
	  }
	}).bind(this));
  } 
  
  var PlayView = SnakeGame.PlayView = function ($el) {
	this.$el = $el;
  	this.snake = new SnakeGame.Snake;
	this.board = new SnakeGame.Board(this.snake);
	this.turnedThisInterval = false;
    this.bindEvents();
    this.renderBoard();
	this.intervalId = setInterval(this.makeMove.bind(this), 100);
  }
  	  
  PlayView.prototype.bindEvents = function () {
    $(window).on('keydown', (function (event) {
	  if (!this.turnedThisInterval) {
		var dir = KEYS[event.keyCode];
        if (dir) {
	  	  event.preventDefault();
          this.snake.turn(dir);
  		  this.turnedThisInterval = true;
		}
	  }
    }).bind(this));
  }

  PlayView.prototype.makeMove = function () {
	  if (this.board.gameOver) {
		this.renderGameOver();
		return;
	  }
	  var apple = this.board.apple;
	  var score = this.board.score;
	  var turds = this.board.turds;
	  this.board = new SnakeGame.Board(this.snake.move(), apple, turds, score);
	  this.turnedThisInterval = false;
	  this.renderBoard();
  }

  PlayView.prototype.renderBoard = function () {
    var that = this;
    var megaString = "";
    for (var i = 0; i < 25; i++) {
      for (var j = 0; j < 25; j++) {
        var pos = [i, j];
        if (that.board.grid[i][j] == "S") {
          megaString += "<div data-pos=[" + pos + "] data-snake='true' class='square'><div class='diamond'></div></div>";
        } else if (that.board.grid[i][j] == "A") {
          megaString += "<div data-pos=[" + pos + "] data-snake='apple' class='square'></div>";	
        } else if (that.board.grid[i][j] == "T") {
          megaString += "<div data-pos=[" + pos + "] data-snake='turd' class='square'></div>";
		} else {
          megaString += "<div data-pos=[" + pos + "] data-snake='false' class='square'></div>";
        }
      }
    }
	$("#score").html("Score: " + this.board.score);
    this.$el.html(megaString);
  }
  
  PlayView.prototype.renderGameOver = function () {
	  clearInterval(this.intervalId);
      this.$el.empty();
	  new SnakeGame.StartView(this.$el, this.board.score);
  }
})();
