(function () {
  "use strict";

  /**
   * @param {JSONLevel} level
   * @constructor
   */
  window.Game = function (level) {
    var listenersMgr,
      board,
      state = 'waiting';

    function init() {
      listenersMgr = new EventListenersManager([
        'game-started',
        'game-won',
        'game-lost'
      ]);

      board = new Board(level.map);

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
    }
  }
})();