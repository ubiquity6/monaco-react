"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _ = _interopRequireDefault(require("."));

var _react2 = require("@testing-library/react");

require("@testing-library/jest-dom/extend-expect");

describe('<ControlledEditor />', function () {
  it('should check render with snapshot', function () {
    var component = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_["default"], null));
    expect(component).toMatchSnapshot();
  });
});