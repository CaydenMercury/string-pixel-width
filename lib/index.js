'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash.deburr');

var _lodash2 = _interopRequireDefault(_lodash);

var _widthsMap = require('./widthsMap');
var _widthsMapDef = _interopRequireDefault(_widthsMap);

var _widthsMapV2 = require('./widthsMapV2');
var _widthsMapV2Def = _interopRequireDefault(_widthsMapV2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settingsDefaults = { font: 'Arial', size: 100, fontWeight: 400, version: 1 };
var availableFontWeights = [400, 500, 600, 700];

var getWidth = function getWidth(string, settings) {
  var sett = _extends({}, settingsDefaults, settings);
  var font = sett.font.toLowerCase();
  var version = typeof sett.version == 'undefined' ? 1 : sett.version;
  var variant = typeof sett.fontWeight != 'undefined' && availableFontWeights.indexOf(sett.fontWeight) > -1 ? availableFontWeights.indexOf(sett.fontWeight) : 0;

  var map = version > 1 ? _widthsMapV2Def.default : _widthsMapDef.default;
  var available = Object.keys(map);
  if (available.indexOf(font) === -1) {
    throw new Error('This font is not supported. Supported fonts are: ' + available.join(', '));
  }
  var totalWidth = 0;
  (0, _lodash2.default)(string).split('').forEach(function (char) {
    if (/[\x00-\x1F]/.test(char)) {
      // non-printable character
      return true;
    }
    // use width of 'x' as fallback for unregistered char
    var widths = map[font][char] || map[font].x;
    var width = widths[variant];
    totalWidth += width;
    return true;
  });
  return totalWidth * (size / 100);
};

exports.default = getWidth;
module.exports = exports['default'];