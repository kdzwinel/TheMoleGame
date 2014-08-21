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

      var boardNode = document.createElement('div');
      boardNode.classList.add('board-wrapper');

      var tileNode = document.createElement('div');
      tileNode.classList.add('tile');
      tileNode.style.width = (100 / board.getWidth()) + "%";

      var tileInnerNode = document.createElement('div');
      tileInnerNode.classList.add('tile__inner');
      tileNode.appendChild(tileInnerNode);

      for (var i = 0, h = board.getHeight(); i < h; i++) {
        for (var j = 0, w = board.getWidth(); j < w; j++) {
          var newNode = tileNode.cloneNode(true);
          newNode.classList.add('tile--' + board.getTile(j,i)._type);
          boardNode.appendChild(newNode);
        }
      }

      container.appendChild(boardNode);
    };

    this.destroy = function () {

    };

    init();
  };
}());