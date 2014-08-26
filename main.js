document.addEventListener("DOMContentLoaded", function () {
  var mapLoader = new MapLoader();

  var level = mapLoader.load(0);

  //crate new game
  var game = new Game(level);

  game.on('game-won', function() {
    document.querySelector('#result').innerText = 'You won!';
  });
  game.on('game-lost', function() {
    document.querySelector('#result').innerText = 'You lost :(';
  });

  //DEBUG print board to console
  var printer = new TextBoardPrinter();
  printer.print(game.getBoard());

  //print board to screen
  var htmlBoard = new HTMLBoard({
    board: game.getBoard(),
    container: document.querySelector('.board-wrapper')
  });

  //TODO clean this up
  document.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
      case 38: game.moveMole('up'); break;//up
      case 40: game.moveMole('down'); break;//down
      case 37: game.moveMole('left'); break;//left
      case 39: game.moveMole('right'); break;//right
    }
  });

  //TODO clean this up
  setInterval(function() {
    game.update();
    htmlBoard.draw();
  }, 100);
}, false);