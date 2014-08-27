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

  var idx = 0;

  window.Tile = function (x, y, type) {
    this._id = idx++;
    this._x = x;
    this._y = y;

    if(!TILE_TYPES[type]) {
      throw 'Unknown type of tile: "' + type + '".';
    }

    //Debug only
    this._symbol = type;

    this._type = TILE_TYPES[type];
  };


  Tile.prototype.set = function(tile) {
    this._id = tile._id;
    this._type = tile._type;
  };

  Tile.prototype.setEmpty = function() {
    this._id = null;
    this._type = 'empty';
  };

  Tile.prototype.getId = function () {
    return this._id;
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

  Tile.prototype.setType = function(type) {
    this._type = type;
  };
}());