"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = _interopRequireDefault(require(".."));

var _utils = require("../utils");

var ControlledEditor = function ControlledEditor(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      editorDidMount = _ref.editorDidMount,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["value", "onChange", "editorDidMount"]);
  var previousValue = (0, _react.useRef)(value);

  var handleEditorDidMount = function handleEditorDidMount(getValue, editor) {
    editor.onDidChangeModelContent(function (ev) {
      var currentValue = editor.getValue();

      if (currentValue !== previousValue.current && !(ev.isUndoing || ev.isRedoing)) {
        previousValue.current = currentValue;

        var _value = onChange(ev, currentValue);

        if (typeof _value === 'string') {
          if (currentValue !== _value) {
            editor.setValue(_value);
          }
        }
      }
    });
    editorDidMount(getValue, editor);
  };

  return /*#__PURE__*/_react["default"].createElement(_["default"], (0, _extends2["default"])({
    value: value,
    editorDidMount: handleEditorDidMount,
    _isControlledMode: true
  }, props));
};

ControlledEditor.propTypes = {
  value: _propTypes["default"].string,
  editorDidMount: _propTypes["default"].func,
  onChange: _propTypes["default"].func
};
ControlledEditor.defaultProps = {
  editorDidMount: _utils.noop,
  onChange: _utils.noop
};
var _default = ControlledEditor;
exports["default"] = _default;