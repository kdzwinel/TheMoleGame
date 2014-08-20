(function () {
  "use strict";

  window.Tile = function (x, y, type) {
    this._x = x;
    this._y = y;
    this._type = type;
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

  /**
   * Returns true if tile is a start tile.
   * @returns {boolean}
   */
  Tile.prototype.isStart = function () {
    return this._type === 'S';
  };

  /**
   * Returns true is tile is an ending tile.
   * @returns {boolean}
   */
  Tile.prototype.isEnd = function () {
    return this._type === 'E';
  };

  /**
   * Returns true is tile is a wall.
   * @returns {boolean}
   */
  Tile.prototype.isWall = function () {
    return this._type === 'X';
  };

  /**
   * Returns true is tile is a bug.
   * @returns {boolean}
   */
  Tile.prototype.isBug = function () {
    return this._type === '*';
  };

  /**
   * Returns true is tile is dirt.
   * @returns {boolean}
   */
  Tile.prototype.isDirt = function () {
    return this._type === '#';
  };

  /**
   * Returns true is tile is a rock.
   * @returns {boolean}
   */
  Tile.prototype.isRock = function () {
    return this._type === 'O';
  };

  /**
   * Returns true is tile is a mole (player).
   * @returns {boolean}
   */
  Tile.prototype.isMole = function () {
    return this._type === '@';
  };

  /**
   * Returns true is tile is empty
   * @returns {boolean}
   */
  Tile.prototype.isEmpty = function () {
    return this._type === ' ';
  };
}());