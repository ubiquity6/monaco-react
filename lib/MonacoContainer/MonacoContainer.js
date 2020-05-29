"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Loading = _interopRequireDefault(require("../Loading"));

var _styles = _interopRequireDefault(require("./styles"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ** forwardref render functions do not support proptypes or defaultprops **
// one of the reasons why we use a separate prop for passing ref instead of using forwardref
var MonacoContainer = function MonacoContainer(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      isEditorReady = _ref2.isEditorReady,
      loading = _ref2.loading,
      _ref = _ref2._ref;
  return /*#__PURE__*/_react["default"].createElement("section", {
    style: _objectSpread(_objectSpread({}, _styles["default"].wrapper), {}, {
      width: width,
      height: height
    })
  }, !isEditorReady && /*#__PURE__*/_react["default"].createElement(_Loading["default"], {
    content: loading
  }), /*#__PURE__*/_react["default"].createElement("div", {
    ref: _ref,
    style: _objectSpread(_objectSpread({}, _styles["default"].fullWidth), !isEditorReady && _styles["default"].hide)
  }));
};

MonacoContainer.propTypes = {
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  loading: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].string]).isRequired,
  isEditorReady: _propTypes["default"].bool.isRequired
};
var _default = MonacoContainer;
exports["default"] = _default;