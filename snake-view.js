(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
    this.board = new SnakeGame.Board(new SnakeGame.Snake);
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    // install a handler on the `li` elements inside the board.
    this.$el.on('click', 'div.cell', (function (event) {
      var $square = $(event.currentTarget);
      this.makeMove($square);
    }).bind(this));
  };

  View.prototype.makeMove = function ($square) {

  };

  View.prototype.setupBoard = function () {
    var that = this;
    var megaString = "";
    for (var i = 0; i < 24; i++) {
      for (var j = 0; j < 24; j++) {
        var pos = [i, j];
        if (that.board.grid[i][j] == "S") {
          alert('SNAKE!');
          megaString += "<div data-pos=[" + pos + "] data-snake='true' class='square'></div>";
        } else {
          megaString += "<div data-pos=[" + pos + "] data-snake='false' class='square'></div>";
        }
      }
    };

    this.$el.html(megaString);
  };
})();
