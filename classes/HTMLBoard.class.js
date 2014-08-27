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
      addListeners();
    }

    function addListeners() {
      document.addEventListener('keydown', onKeyDown);

      game.on('game-started', that.draw);

      //TODO instead of redrawing whole thing, move objects smoothly
      game.on('object-moved', function(data) {
        console.log('object ', data.id, ' moved from X:', data.old_x, ', Y:', data.old_y, '  to X:', data.x, ', Y:', data.y);


//        document.querySelector('#item_' + data.id).style.position = 'absolute';
//        document.querySelector('#item_' + data.id).style.zIndex = 10;
//        document.querySelector('#item_' + data.id).style.left = data.x * 69 + 'px';
//        document.querySelector('#item_' + data.id).style.top = data.y * 69 + 'px';


        var el = document.querySelector('.tile--mole');
        el.classList.add('anim');

        if (data.old_x > data.x) {
          el.classList.add('anim--left');
        }
        if (data.old_x < data.x) {
          el.classList.add('anim--right');
        }
        if (data.old_y > data.y) {
          el.classList.add('anim--up');
        }
        if (data.old_y < data.y) {
          el.classList.add('anim--down');
        }


        /* Listen for a transition! */
        /* Solution taken from http://davidwalsh.name/css-animation-callback */
        var transitionEvent = whichTransitionEvent(el);
        transitionEvent && el.addEventListener(transitionEvent, function() {
          //console.log('Transition complete!  This is the callback, no library needed!');
          that.draw();
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
          newNode.id = 'item_' + tile.getId();
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



  //Where to put this function?
  //
  /* Solution taken from http://davidwalsh.name/css-animation-callback */
  function whichTransitionEvent(element){
    var t;
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
      if(element.style[t] !== undefined ){
        return transitions[t];
      }
    }
  }
}());