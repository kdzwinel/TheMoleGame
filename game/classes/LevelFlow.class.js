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

    function centerTheBoard(num) {
      var game = levels[num].game;
      var boardDiv = levels[num].boardDiv;

      var containerWidth = (options.container).parentNode.clientWidth;
      var boardWidth = game.getBoard().getWidth() * 50;
      var boardOffset = boardDiv.offsetLeft;

      //TODO change to transform-translate
      (options.container).scrollLeft = boardOffset - (containerWidth - boardWidth) / 2;
    }

    this.playLevel = function (num) {
      var game = levels[num].game;
      var htmlBoard = levels[num].htmlBoard;
      var requestId;

      htmlBoard.enable();

      function gameLoop() {
        game.update();

        requestId = requestAnimationFrame(gameLoop);
      }

      gameLoop();

      document.querySelector('#title').innerText = game.getName();

      //TODO show win screen
      game.on('game-won', function (stars) {
        document.querySelector('#result').innerText = 'Level won with ' + stars + ' stars!';

        setTimeout(function () {
          //clean up
          game.destroy();
          htmlBoard.disable();
          cancelAnimationFrame(requestId);

          that.playLevel(num + 1);
        }, 500);
      });

      //TODO show loose screen
      game.on('game-lost', function () {
        document.querySelector('#result').innerText = 'You lost :(';
      });

      game.start();

      centerTheBoard(num);
    }

  };

})();