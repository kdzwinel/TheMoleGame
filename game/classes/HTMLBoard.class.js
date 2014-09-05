(function () {
  window.HTMLBoard = function (options) {
    var that = this, game = options.game, container = options.container, moleClass = 'down', objectsInMove = [];

    function onKeyDown(e) {
        switch(e.keyCode) {
          case 38: game.nextMoleMove('up'); changeMoleLook('up'); break;
          case 40: game.nextMoleMove('down'); changeMoleLook('down'); break;
          case 37: game.nextMoleMove('left'); changeMoleLook('left'); break;
          case 39: game.nextMoleMove('right'); changeMoleLook('right'); break;
        }

      e.preventDefault();
    }

    function init() {
      that.draw();
    }

    //TODO move it elsewhere
    function addListeners() {
      document.addEventListener('keydown', onKeyDown);

      game.on('game-started', that.draw);

      //TODO instead of redrawing whole thing, move objects smoothly
      game.on('object-moved', function(data) {
        console.log('object ', data.id, ' moved from X:', data.from.x, ', Y:', data.from.y, '  to X:', data.to.x, ', Y:', data.to.y);

        //Moving objects animation
        var el = container.querySelector("#item_" + data.id);
        el.classList.add('anim');
        objectsInMove.push(el);

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
          that.draw();

          //Erasing this element from array of moving objects
          var index = objectsInMove.indexOf(this);
          if (index > -1) {
            objectsInMove.splice(index, 1);
          }

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
      game.on('rock-pushed', function(id) {
        console.log('rock', id, 'rock');
      });

      //TODO add animation
      game.on('cant-push-that-rock', function(id) {
        console.log('cant-push-that-rock', id, 'cant-push-that-rock');
      });

      //TODO add animation
      game.on('door-opened', function(id) {
        console.log('door ', id, ' are now open');
        var el = container.querySelector("#item_" + id);
        el.classList.add('opening');
      });
    }

    this.draw = function () {
      var container = options.container;
      var board = game.getBoard();

      var boardNode = document.createDocumentFragment();

      var tileNode = document.createElement('div');
      tileNode.classList.add('tile');

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
      container.style.width = 50 * board.getWidth() + "px";
      container.appendChild(boardNode);
    };

    var changeMoleLook  = function(direction) {
      moleClass = direction;
      var mole = container.querySelector(".tile--mole");
      mole.classList.remove('up');
      mole.classList.remove('down');
      mole.classList.remove('left');
      mole.classList.remove('right');
      mole.classList.add(moleClass);
    };

    this.ifMovingEnded = function() {
      return (objectsInMove.length === 0);
    };

    this.enable = function () {
      (options.container).classList.add('active');

      addListeners();
    };

    this.disable = function () {
      (options.container).classList.remove('active');

      document.removeEventListener('keydown', onKeyDown);
    };

    init();
  };

}());