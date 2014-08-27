(function () {
  window.HTMLBoard = function (options) {
    var that = this, game = options.game;

    function onKeyDown(e) {
        switch(e.keyCode) {
          case 38: game.nextMoleMove('up'); break;
          case 40: game.nextMoleMove('down'); break;
          case 37: game.nextMoleMove('left'); break;
          case 39: game.nextMoleMove('right'); break;
        }
    }

    function init() {
      that.draw();
      addListeners();
    }

    function addListeners() {
      document.addEventListener('keydown', onKeyDown);
    }

    this.draw = function () {
      var container = options.container;
      var board = game.getBoard();

      var boardNode = document.createDocumentFragment();

      var tileNode = document.createElement('div');
      tileNode.classList.add('tile');
      tileNode.style.width = (100 / board.getWidth()) + "%";

      var tileInnerNode = document.createElement('div');
      tileInnerNode.classList.add('tile__inner');
      tileNode.appendChild(tileInnerNode);

      for (var i = 0, h = board.getHeight(); i < h; i++) {
        for (var j = 0, w = board.getWidth(); j < w; j++) {
          var newNode = tileNode.cloneNode(true);
          newNode.classList.add('tile--' + board.getTile(j,i).getType());
          boardNode.appendChild(newNode);
        }
      }

      DOMHelper.purgeElement(container);
      container.appendChild(boardNode);
    };

    this.destroy = function () {
      document.removeEventListener('keydown', onKeyDown);
    };

    init();
  };
}());