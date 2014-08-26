(function () {
  "use strict";

  /**
   * @param {JSONLevel} level
   * @constructor
   */
  window.Game = function (level) {
    var listenersMgr,
      board,
      state = 'waiting',
      nextMoleMove = null;

    function init() {
      listenersMgr = new EventListenersManager([
        'game-started',
        'game-won',
        'game-lost'
      ]);

      board = new Board(level.map);

      board.getStartTile().setType('mole');

      state = 'running';
      listenersMgr.trigger('game-started');
    }

    init();

    /**
     * Stops all timeouts
     */
    this.pause = function () {
    };

    /**
     * Resumes all timeouts
     */
    this.resume = function () {

    };

    /**
     * Returns game board.
     * @returns {Board}
     */
    this.getBoard = function () {
      return board;
    };

    /**
     * Returns true if game has already ended (either was won or lost)
     * @returns {boolean}
     */
    this.hasEnded = function () {
      return (state === 'lost' || state === 'won');
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
      listenersMgr.removeEventListener();
    };

    this.moveMole = function(direction) {
      console.log('moveMole', direction);
      nextMoleMove = direction;
    };

    this.update = function() {
      //TODO clean this up
      for (var y = board.getHeight() - 1; y >= 0; y--) {
        for (var x = board.getWidth() - 1; x >= 0; x--) {
          var tile = board.getTile(x, y), nextTile;

          if(tile.getType() === 'mole' && nextMoleMove) {
            if(nextMoleMove === 'up') {
              nextTile = board.getTile(x, y - 1);
            } else if(nextMoleMove === 'down') {
              nextTile = board.getTile(x, y + 1);
            } else if(nextMoleMove === 'left') {
              nextTile = board.getTile(x - 1, y);
            } else if(nextMoleMove === 'right') {
              nextTile = board.getTile(x + 1, y);
            }

            var validMoves = ['dirt', 'end', 'bug', 'empty'];
            if(validMoves.indexOf(nextTile.getType()) !== -1) {
              if(nextTile.getType() === 'end') {
                listenersMgr.trigger('game-won');
              }

              nextTile.setType('mole');
              tile.setType('empty');
            }

            nextMoleMove = null;
          } else if(tile.getType() === 'rock') {
            nextTile = board.getTile(x, y + 1);

            if(nextTile.getType() === 'empty') {
              nextTile.setType('falling-rock');
              tile.setType('empty');
            }
          } else if(tile.getType() === 'falling-rock') {
            nextTile = board.getTile(x, y + 1);

            if(nextTile.getType() === 'empty' || nextTile.getType() === 'mole') {
              if(nextTile.getType() === 'mole') {
                listenersMgr.trigger('game-lost');
              }

              nextTile.setType('falling-rock');
              tile.setType('empty');
            } else {
              tile.setType('rock');
            }
          }

        }
      }
    };
  }
})();