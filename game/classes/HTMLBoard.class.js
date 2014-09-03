(function () {
  window.HTMLBoard = function (options) {
    var that = this, game = options.game, moleClass = 'down';

    function onKeyDown(e) {
        switch(e.keyCode) {
          case 38: game.nextMoleMove('up'); changeMoleLook('up'); break;
          case 40: game.nextMoleMove('down'); changeMoleLook('down'); break;
          case 37: game.nextMoleMove('left'); changeMoleLook('left'); break;
          case 39: game.nextMoleMove('right'); changeMoleLook('right'); break;
        }
    }

    function init() {
      addListeners();
    }

    function addListeners() {
      document.addEventListener('keydown', onKeyDown);

      game.on('game-started', that.draw);

      //TODO instead of redrawing whole thing, move objects smoothly
      game.on('object-moved', function(data) {

        drawFinished = false;

        console.log('object ', data.id, ' moved from X:', data.from.x, ', Y:', data.from.y, '  to X:', data.to.x, ', Y:', data.to.y);

        //Moving objects animation
        var el = document.querySelector("#item_" + data.id);
        el.classList.add('anim');

        //transformations for moving
        if (data.from.x > data.to.x) {
          el.classList.add('anim--left');
        }
        if (data.from.x < data.to.x) {
          el.classList.add('anim--right');
        }
        if (data.from.y > data.to.y) {
          el.classList.add('anim--up');
        }
        if (data.from.y < data.to.y) {
          el.classList.add('anim--down');
        }

        /* Listen for a transition! */
        /* Solution taken from http://davidwalsh.name/css-animation-callback */
        var transitionEvent = whichTransitionEvent(el);
        transitionEvent && el.addEventListener(transitionEvent, function() {
          console.log('Transition complete!  This is the callback, no library needed!');
          that.draw();
          drawFinished = true;
        });

      });

      //TODO add animation
      game.on('bug-eaten', function(id) {
        console.log('bug ', id, ' eaten');
        //document.querySelector('#item_' + id).classList.add('bug-eaten-animation');
      });

      //TODO add animation
      game.on('dirt-removed', function(id) {
        console.log('dirt ', id, ' removed');
        //document.querySelector('#item_' + id).classList.add('dirt-removed-animation');
      });

      //TODO add animation
      game.on('mole-killed', function(id) {
        console.log('mole ', id, ' killed');
        //document.querySelector('#item_' + id).classList.add('kill-animation');
      });

      //TODO add animation
      game.on('door-opened', function(id) {
        console.log('door ', id, ' are now open');
      });
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
          var tile = board.getTile(j,i);
          var newNode = tileNode.cloneNode(true);
          newNode.classList.add('tile--' + tile.getType());
          if (tile.getType()==="mole") {
            newNode.classList.add(moleClass);
          }
          newNode.id = 'item_' + tile.getId();
          boardNode.appendChild(newNode);
        }
      }

      DOMHelper.purgeElement(container);
      container.appendChild(boardNode);
    };

    var changeMoleLook  = function(direction) {
      moleClass = direction;
      var mole = document.querySelector(".tile--mole");
      mole.classList.remove('up');
      mole.classList.remove('down');
      mole.classList.remove('left');
      mole.classList.remove('right');
      mole.classList.add(moleClass);
    };

    this.destroy = function () {
      document.removeEventListener('keydown', onKeyDown);
    };

    init();
  };

}());