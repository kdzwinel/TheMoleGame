(function () {
  "use strict";

  window.LevelFlow = function (options) {
    var mapLoader = new MapLoader();
    var levels = [];
    var that = this;

    function loadLevel(num) {
      var level = mapLoader.getLevel(num);

      if (!level) {
        throw new Error('Unknown level #' + num);
        return;
      }

      //crate new game
      var game = new Game(level);

      var boardDiv = document.createElement('div');
      boardDiv.classList.add('board-wrapper');
      boardDiv.id = 'level_' + num;

      //set up new HTML board
      var htmlBoard = new HTMLBoard({
        game: game,
        container: boardDiv
      });

      (options.container).appendChild(boardDiv);

      levels.push({
        level: level,
        game: game,
        htmlBoard: htmlBoard,
        boardDiv: boardDiv
      })
    }

    function init() {
      for (var i = 0, l = mapLoader.getNumberOfLevels(); i < l; i++) {
        loadLevel(i);
      }
    }

    init();

    function centerTheBoard() {
      var game = levels[currentLevel].game;
      var boardDiv = levels[currentLevel].boardDiv;
      var scrollContainer = (options.container).parentNode;
      var htmlBoard = levels[currentLevel].htmlBoard;
      var tileSize = htmlBoard.getTileSize();

      var containerWidth = scrollContainer.clientWidth;
      var boardWidth = game.getBoard().getWidth() * htmlBoard.getTileSize();
      var boardOffset = boardDiv.offsetLeft;

//      var to = - (boardOffset - (containerWidth - boardWidth) / 2);
      var to = - (boardOffset + playerXPos * tileSize - containerWidth/2);

      (options.container).style.transform = 'translate3d(' + to + 'px, 0, 0)';
      (options.container).style.webkitTransform = 'translate3d(' + to + 'px, 0, 0)';
      (options.container).style.mozTransform = 'translate3d(' + to + 'px, 0, 0)';
    }

    var currentLevel = null;
    var playerXPos = 0;
    var rafRequestId = null;

    this.playLevel = function (num) {
      currentLevel = num;

      var game = levels[currentLevel].game;
      var htmlBoard = levels[currentLevel].htmlBoard;

      htmlBoard.enable();

      function gameLoop() {
        game.update();

        rafRequestId = requestAnimationFrame(gameLoop);
      }

      gameLoop();

      document.getElementById('title').innerHTML = game.getName();

      game.on('object-moved', function(item) {
        if(item.type === 'mole') {
          playerXPos = item.to.x;
          centerTheBoard();
        }
      });

      //TODO show win screen
      game.on('game-won', function (stars) {
        console.log('Level won with ' + stars + ' stars!');

        setTimeout(function () {
          //clean up
          game.destroy();
          htmlBoard.disable();
          cancelAnimationFrame(rafRequestId);

          that.playLevel(currentLevel + 1);
        }, 500);
      });

      //TODO show loose screen
      game.on('game-lost', function () {
        console.log('You lost :(');
      });

      game.start();

      playerXPos = 0;
      centerTheBoard();
    };

    this.resetCurrentLevel = function() {
      var game = levels[currentLevel].game;

      game.reset();
      cancelAnimationFrame(rafRequestId);

      this.playLevel(currentLevel);
    };

  };

})();