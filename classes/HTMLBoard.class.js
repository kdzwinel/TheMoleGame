(function () {
  window.HTMLBoard = function (options) {
    var that = this;

    function init() {
      that.draw();
      addListeners();
    }

    function addListeners() {

    }

    this.draw = function () {
      var container = options.container;
      var board = options.board;

      var tileClasses = {
        'X': 'tile--wall',
        '#': 'tile--ground',
        'O': 'tile--rock',
        'E': 'tile--start',
        '*': 'tile--catch',
        'S': 'tile--end'
      }

      var boardNode = document.createElement('div');
      boardNode.setAttribute('class', 'board-wrapper');

      for (var i = 0, h = board.getHeight(); i < h; i++) {
        for (var j = 0, w = board.getWidth(); j < w; j++) {

          var tileNode = document.createElement('div');
          tileNode.setAttribute('class', 'tile ' + tileClasses[board.getTile(j, i)._type]);
          tileNode.style.width = (100 / board.getWidth()) + "%";

          var tileInnerNode = document.createElement('div');
          tileInnerNode.setAttribute('class', 'tile__inner');

          tileNode.appendChild(tileInnerNode);
          boardNode.appendChild(tileNode);
        }
      }

      container.appendChild(boardNode);


    };

    this.destroy = function () {

    };

    init();
  };
}());