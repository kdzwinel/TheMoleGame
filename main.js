document.addEventListener("DOMContentLoaded", function () {
  var mapLoader = new MapLoader();

  var level = mapLoader.load(0);

  //crate new game
  var game = new Game(level);

  //DEBUG print board to console
  var printer = new TextBoardPrinter();
  printer.print(game.getBoard());

  //print board to screen
  var htmlBoard = new HTMLBoard({
    board: game.getBoard(),
    container: document.querySelector('#screen-wrapper')
  });
}, false);