(function () {
  "use strict";
  var TILE_TYPES = {
    'S': 'start',
    'E': 'end',
    'X': 'wall',
    '#': 'dirt',
    'O': 'rock',
    '@': 'mole',
    '*': 'bug',
    ' ': 'empty'
  };

  window.Tile = function (x, y, type) {
    this._x = x;
    this._y = y;

    if(!TILE_TYPES[type]) {
      throw 'Unknown type of tile: "' + type + '".';
    }

    //Debug only
    this._symbol = type;

    this._type = TILE_TYPES[type];
  };

  /**
   * Returns tile's X position on board.
   * @returns {number}
   */
  Tile.prototype.getX = function () {
    return this._x;
  };

  /**
   * Returns tile's Y position on board.
   * @returns {number}
   */
  Tile.prototype.getY = function () {
    return this._y;
  };

  Tile.prototype.getType = function() {
    return this._type;
  };
}());