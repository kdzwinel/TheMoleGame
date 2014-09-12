(function () {
  window.HTMLBoard = function (options) {
    var that = this, game = options.game, container = options.container, moleClass = 'down', tileSize = 50;

    function onKeyDown(e) {


      switch (e.keyCode) {
        case 38:
          game.nextMoleMove('up');
          changeMoleLook('up');
          break;
        case 40:
          game.nextMoleMove('down');
          changeMoleLook('down');
          break;
        case 37:
          game.nextMoleMove('left');
          changeMoleLook('left');
          break;
        case 39:
          game.nextMoleMove('right');
          changeMoleLook('right');
          break;
      }

      e.preventDefault();
    }

    function onMouseDown(e) {
      goByClick(e);
      e.preventDefault();

      // TODO continious mole move implement
    }

    function onMouseUp() {
      // TODO continious mole move cancel
    }

    function goByClick(e) {
      var molePosition = document.querySelector(".board-wrapper.active .tile.tile--mole").getBoundingClientRect(),
        molePositionRight = molePosition.left + molePosition.width,
        molePositionBottom = molePosition.top + molePosition.height;

      if (molePosition.left < e.clientX && e.clientX < molePositionRight) {
        if (molePosition.top < e.clientY && e.clientY < molePositionBottom) {
          console.log("mole clicked"); // collision with mole
        } else if (molePosition.top < e.y) {
          // collision X only
          game.nextMoleMove('down');
          changeMoleLook('down');
        } else {
          game.nextMoleMove('up');
          changeMoleLook('up');
        }
      } else if (molePosition.top < e.clientY && e.clientY < molePositionBottom) {
        // collision Y only
        if (molePosition.left < e.clientX) {
          game.nextMoleMove('right');
          changeMoleLook('right');
        } else {
          game.nextMoleMove('left');
          changeMoleLook('left');
        }
      }
    }

    function init() {
      var w = window,
        e = document.documentElement,
        g = e.getElementsByTagName('body')[0],
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

      tileSize = Math.floor(y / 7);
      that.draw();
    }

    //TODO move it elsewhere
    function addListeners() {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('mousedown', onMouseDown);
//      document.addEventListener('mouseup', onMouseUp);

      game.on('game-started', that.draw);

      //TODO instead of redrawing whole thing, mov
      game.on('object-moved', function (data) {
        console.log('object ', data.type, ' (#', data.id, ') moved from X:', data.from.x, ', Y:', data.from.y, ' to X:', data.to.x, ', Y:', data.to.y);

        //Moving objects animation
        var el = container.querySelector("#item_" + data.id);

        el.classList.add('anim');
        el.style.transform = 'translate(' + tileSize * data.to.x +'px, '+ tileSize * data.to.y + 'px)';
      });

      game.on('bug-eaten', function (id) {
        console.log('bug ', id, ' eaten');
        //TODO add more exciting anim
        document.querySelector('#item_' + id).classList.add('remove-anim');
      });

      game.on('dirt-removed', function (id) {
        console.log('dirt ', id, ' removed');
        //TODO add more exciting anim
        document.querySelector('#item_' + id).classList.add('remove-anim');
      });

      game.on('mole-killed', function (id) {
        console.log('mole ', id, ' killed');
        //TODO add more exciting anim
        document.querySelector('#item_' + id).classList.add('remove-anim');
      });

      game.on('rock-pushed', function (id) {
        console.log('rock', id, 'rock');
      });

      //TODO add animation
      game.on('cant-push-that-rock', function (id) {
        console.log('cant-push-that-rock', id, 'cant-push-that-rock');
      });

      game.on('door-opened', function (id) {
        console.log('door ', id, ' are now open');
        //TODO add more exciting anim
        document.querySelector('#item_' + id).classList.add('remove-anim');
      });
    }

    this.getTileSize = function () {
      return tileSize;
    };

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
          var tile = board.getTile(j, i);
          var newNode = tileNode.cloneNode(true);
          newNode.classList.add('tile--' + tile.getType());
          if (tile.getType() === "mole") {
            newNode.classList.add(moleClass);
          }
          newNode.id = 'item_' + tile.getId();
          newNode.style.width = tileSize + 'px';
          newNode.style.height = tileSize + 'px';
          newNode.style.transform = 'translate(' + tileSize * j +'px, '+ tileSize * i + 'px)';
          boardNode.appendChild(newNode);
        }
      }

      if (container.firstChild) {
        DOMHelper.purgeElement(container);
      } else {
        container.style.marginLeft = '-' + tileSize + 'px';
        container.style.width = tileSize * board.getWidth() + "px";
        container.style.height = tileSize * board.getHeight() + "px";
      }

      container.appendChild(boardNode);
    };

    var changeMoleLook = function (direction) {
      moleClass = direction;
      var mole = container.querySelector(".tile--mole");
      if (mole) {
        mole.classList.remove('up');
        mole.classList.remove('down');
        mole.classList.remove('left');
        mole.classList.remove('right');
        mole.classList.add(moleClass);
      }
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