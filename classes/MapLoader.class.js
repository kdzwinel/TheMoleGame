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
    this.load = function (id) {
      return levels[id] || null;
    };
  };

  levels[0] = {
    name: "Test 1",
    map: {
      width: 7,
      height: 7,
      tiles: "" +
        "XXXXXXX" +
        "X#O###X" +
        "X#*O##S" +
        "X#####X" +
        "E##OO#X" +
        "X###*#X" +
        "XXXXXXX"
    }
  };
}());