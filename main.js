document.addEventListener("DOMContentLoaded", function () {
  var mapLoader = new MapLoader();

  var level = mapLoader.getLevel(0);

  //crate new game
  var game = new Game(level);

  game.on('game-won', function() {
    document.querySelector('#result').innerText = 'You won!';
  });
  game.on('game-lost', function() {
    document.querySelector('#result').innerText = 'You lost :(';
  });

  //print board to screen
  var htmlBoard = new HTMLBoard({
    game: game,
    container: document.querySelector('.board-wrapper')
  });

  var gameLoop = setInterval(function() {
    //draw only if anything has changed
    if(game.update()) {
      htmlBoard.draw();
    }
  }, 100);
}, false);