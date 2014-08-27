document.addEventListener("DOMContentLoaded", function () {
  var mapLoader = new MapLoader();

  //TODO show maps screen and start game after level is chosen
  var level = mapLoader.getLevel(0);

  //crate new game
  var game = new Game(level);

  //set up new HTML board
  var htmlBoard = new HTMLBoard({
    game: game,
    container: document.querySelector('.board-wrapper')
  });

  //TODO show win screen
  game.on('game-won', function() {
    document.querySelector('#result').innerText = 'You won!';
  });

  //TODO show loose screen
  game.on('game-lost', function() {
    document.querySelector('#result').innerText = 'You lost :(';
  });

  game.start();

  //to clean up after the game call:
  //game.destroy();
  //htmlBoard.destroy();

}, false);