document.addEventListener("DOMContentLoaded", function () {
  var mapLoader = new MapLoader();

  function playLevel(num) {
    //TODO show maps screen and start game after level is chosen
    var level = mapLoader.getLevel(num);

    if(!level) {
      throw new Error('Unknown level #' + num);
      return;
    }

    //crate new game
    var game = new Game(level);

    //set up new HTML board
    var htmlBoard = new HTMLBoard({
      game: game,
      container: document.querySelector('.board-wrapper')
    });

    //TODO show win screen
    game.on('game-won', function () {
      //clean up
      game.destroy();
      htmlBoard.destroy();

      playLevel(num + 1);
    });

    //TODO show loose screen
    game.on('game-lost', function () {
      document.querySelector('#result').innerText = 'You lost :(';
    });

    game.start();
  }

  playLevel(1);
}, false);