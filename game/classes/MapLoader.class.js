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
        "X###OOX" +
        "S##O*#X" +
        "X#### X" +
        "X#O#O X" +
        "X##*# E" +
        "XXXXXXX"
    }
  }, {
    name: "Test 2",
    map: {
      width: 10,
      height: 7,
      tiles: "" +
        "XXXXXXXXXX" +
        "XOOO###OOX" +
        "X*#OO###*X" +
        "X#OO###OOE" +
        "X####O ##X" +
        "S#O##O###X" +
        "XXXXXXXXXX"
    }
  }];
}());