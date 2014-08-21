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

  /**
   * Returns true if tile is a start tile.
   * @returns {boolean}
   */
  Tile.prototype.isStart = function () {
    return this._type === 'start';
  };

  /**
   * Returns true is tile is an ending tile.
   * @returns {boolean}
   */
  Tile.prototype.isEnd = function () {
    return this._type === 'end';
  };

  /**
   * Returns true is tile is a wall.
   * @returns {boolean}
   */
  Tile.prototype.isWall = function () {
    return this._type === 'wall';
  };

  /**
   * Returns true is tile is a bug.
   * @returns {boolean}
   */
  Tile.prototype.isBug = function () {
    return this._type === 'bug';
  };

  /**
   * Returns true is tile is dirt.
   * @returns {boolean}
   */
  Tile.prototype.isDirt = function () {
    return this._type === 'dirt';
  };

  /**
   * Returns true is tile is a rock.
   * @returns {boolean}
   */
  Tile.prototype.isRock = function () {
    return this._type === 'rock';
  };

  /**
   * Returns true is tile is a mole (player).
   * @returns {boolean}
   */
  Tile.prototype.isMole = function () {
    return this._type === 'mole';
  };

  /**
   * Returns true is tile is empty
   * @returns {boolean}
   */
  Tile.prototype.isEmpty = function () {
    return this._type === 'empty';
  };
}());