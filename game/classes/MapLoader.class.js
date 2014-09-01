/**
 * JSON level definition.
 *
 * @class JSONLevel
 * @property {String} name
 * @property {JSONMap} map
 */

/**
 * JSON map definition.
 *
 * @class JSONMap
 * @property {Number} height
 * @property {Number} width
 * @property {String} map
 */

(function () {
  "use strict";
  var levels = [];

  window.MapLoader = function () {
    this.getLevel = function (id) {
      return levels[id] || null;
    };
  };

  levels = [{
    name: "Test 1",
    stars: [15,17,20],
    map: {
      width: 7,
      height: 7,
      tiles: "" +
        "XXXXXXX" +
        "XOO###X" +
        "X#*O##S" +
        "X ####X" +
        "X O#O#X" +
        "E ##*#X" +
        "XXXXXXX"
    }
  }, {
    name: "Test 2",
    map: {
      width: 10,
      height: 7,
      tiles: "" +
        "XXXXXXXXXX" +
        "X###O####X" +
        "X*#O##O##S" +
        "X##O###OOX" +
        "X#O#OO ##E" +
        "X#*##O   X" +
        "XXXXXXXXXX"
    }
  }];
}());