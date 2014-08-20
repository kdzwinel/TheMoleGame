(function () {
  window.TextBoardPrinter = function () {

    /**
     * Prints simple text representation of the Board object
     * @param board Board
     */
    this.print = function (board) {
      var w = board.getWidth(),
        h = board.getHeight(),
        x, y, tile, stringOutput = "";

      for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
          tile = board.getTile(x, y);

          if (tile.isDirt()) {
            stringOutput += '#';
          } else if(tile.isRock()) {
            stringOutput += 'O';
          } else if(tile.isMole()) {
            stringOutput += '@';
          } else if(tile.isBug()) {
            stringOutput += '*';
          } else if(tile.isEmpty()) {
            stringOutput += ' ';
          } else if(tile.isWall()) {
            stringOutput += 'X';
          } else if(tile.isStart()) {
            stringOutput += ' ';
          } else if(tile.isEnd()) {
            stringOutput += 'E';
          }
        }
        stringOutput += '\n';
      }

      console.log(stringOutput);
    };
  };
}());