(function () {
  "use strict";

  /**
   * @param {JSONLevel} level
   * @constructor
   */
  window.Game = function (level) {
    var listenersMgr,
      board,
      nextMoleMove = null,
      gameLoop,
      bugsEaten = 0,
      movesMade = 0;

    function init() {
      listenersMgr = new EventListenersManager([
        'game-started',
        'game-won',
        'game-lost',

        'object-moved',
        'mole-killed',
        'bug-eaten',
        'dirt-removed',
        'rock-pushed',
        'cant-push-that-rock',
        'door-opened'
      ]);

    }

    init();

    this.start = function() {
      board = new Board(level.map);

      board.getStartTile().setType('mole');

      if(gameLoop) {
        clearInterval(gameLoop);
      }

      gameLoop = setInterval(update, 100);

      listenersMgr.trigger('game-started');
    };

    /**
     * Returns game board.
     * @returns {Board}
     */
    this.getBoard = function () {
      return board;
    };

    /**
     * Allows to listen for various in-game events.
     * @param {string} event
     * @param {function} callback
     */
    this.on = function (event, callback) {
      listenersMgr.addEventListener(event, callback);
    };

    /**
     * Destroys object (cleans all timeouts and listeners).
     */
    this.destroy = function () {
      if(gameLoop) {
        clearInterval(gameLoop);
      }

      listenersMgr.removeEventListener();
    };

    this.nextMoleMove = function (direction) {
      nextMoleMove = direction;
    };

    function getNumberOfStars() {
      for(var i = 0, max = level.stars.length; i < max; i++) {
        if(movesMade <= level.stars[i]) {
          return (max - i);
        }
      }

      return 0;
    }

    function moveMole(tile) {
      if (nextMoleMove) {
        var nextTile,
          x = tile.getX(),
          y = tile.getY(),
          stepX,
          stepY,
          rockPushToTile;

        if (nextMoleMove === 'up') {
          stepX = 0;
          stepY = -1;
        } else if (nextMoleMove === 'down') {
          stepX = 0;
          stepY = 1;
        } else if (nextMoleMove === 'left') {
          stepX = -1;
          stepY = 0;
        } else if (nextMoleMove === 'right') {
          stepX = 1;
          stepY = 0;
        }

        nextTile = board.getTile(x + stepX,y + stepY);

        var validMoves = ['dirt', 'end-open', 'bug', 'empty'];

        if (validMoves.indexOf(nextTile.getType()) !== -1) {
          movesMade++;

          if (nextTile.getType() === 'end-open') {
            listenersMgr.trigger('game-won', getNumberOfStars());
          }

          if(nextTile.getType() === 'dirt') {
            listenersMgr.trigger('dirt-removed', nextTile.getId());
          } else if(nextTile.getType() === 'bug') {
            eatABug(nextTile);
          }

          nextTile.set(tile);
          tile.setEmpty();

          listenersMgr.trigger('object-moved', {
            id: nextTile.getId(),
            x: nextTile.getX(),
            y: nextTile.getY()
          });
        }

        // push rock
        if (nextTile.getType() === 'rock') {
          x = nextTile.getX();
          y = nextTile.getY();
          rockPushToTile = board.getTile(x+stepX,y+stepY);

          if(rockPushToTile.getType() === 'empty'){
            movesMade++;

            nextTile.set(tile);
            tile.setEmpty();
            pushRock(rockPushToTile);
          } else {
            listenersMgr.trigger('cant-push-that-rock', tile.getId());
          }
        }

        nextMoleMove = null;
      }
    }

    function pushRock(pushToTile){
      pushToTile.setType("rock");
      listenersMgr.trigger('object-moved', {
        id: pushToTile.getId(),
        x: pushToTile.getX(),
        y: pushToTile.getY()
      });
    }

    function eatABug(tile) {
      listenersMgr.trigger('bug-eaten', tile.getId());
      bugsEaten++;

      if(bugsEaten === board.getNumberOfBugs()) {
        board.getEndTiles().forEach(function(tile) {
          listenersMgr.trigger('door-opened', tile.getId());
          tile.setType('end-open');
        });
      }
    }

    function moveRock(tile) {
      var x = tile.getX(),
        y = tile.getY(),
        nextTile = board.getTile(x, y + 1);
      if (tile.getType() === 'rock') {
        if (nextTile.getType() === 'empty') {
         console.log(nextTile);
          nextTile.set(tile);
          nextTile.setType('falling-rock');
          tile.setEmpty();

          listenersMgr.trigger('object-moved', {
            id: nextTile.getId(),
            x: nextTile.getX(),
            y: nextTile.getY()
          });
        }
      } else if (tile.getType() === 'falling-rock') {
        if (nextTile.getType() === 'empty' || nextTile.getType() === 'mole') {
          if (nextTile.getType() === 'mole') {
            listenersMgr.trigger('mole-killed', nextTile.getId());
            listenersMgr.trigger('game-lost');
          }

          nextTile.set(tile);
          tile.setEmpty();

          listenersMgr.trigger('object-moved', {
            id: nextTile.getId(),
            x: nextTile.getX(),
            y: nextTile.getY()
          });
        } else {
          tile.setType('rock');
        }
      }
    }

    function update () {
      var change = false;

      for (var y = board.getHeight() - 1; y >= 0; y--) {
        for (var x = board.getWidth() - 1; x >= 0; x--) {
          var tile = board.getTile(x, y);

          if (tile.getType() === 'mole') {
            moveMole(tile);
          } else if (tile.getType() === 'rock' || tile.getType() === 'falling-rock') {
            moveRock(tile);
          }
        }
      }

      return change;
    }
  }
})();