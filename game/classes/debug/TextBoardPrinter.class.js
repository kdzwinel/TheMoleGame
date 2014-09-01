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

          stringOutput += tile._symbol;
        }
        stringOutput += '\n';
      }

      console.log('%c' + stringOutput, 'font-family: courier; font-size: 16px');
    };
  };
}());