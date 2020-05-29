"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MonacoContainer = _interopRequireDefault(require("../MonacoContainer"));

var _utils = require("../utils");

var _hooks = require("../utils/hooks");

var _themes = _interopRequireDefault(require("../config/themes"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DiffEditor = function DiffEditor(_ref) {
  var original = _ref.original,
      modified = _ref.modified,
      language = _ref.language,
      originalLanguage = _ref.originalLanguage,
      modifiedLanguage = _ref.modifiedLanguage,
      editorDidMount = _ref.editorDidMount,
      theme = _ref.theme,
      width = _ref.width,
      height = _ref.height,
      loading = _ref.loading,
      options = _ref.options;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isEditorReady = _useState2[0],
      setIsEditorReady = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      isMonacoMounting = _useState4[0],
      setIsMonacoMounting = _useState4[1];

  var editorRef = (0, _react.useRef)();
  var monacoRef = (0, _react.useRef)();
  var containerRef = (0, _react.useRef)();
  (0, _hooks.useMount)(function (_) {
    var cancelable = _utils.monaco.init();

    cancelable.then(function (monaco) {
      return (monacoRef.current = monaco) && setIsMonacoMounting(false);
    })["catch"](function (error) {
      return console.error('An error occurred during initialization of Monaco:', error);
    });
    return function (_) {
      return editorRef.current ? disposeEditor() : cancelable.cancel();
    };
  });
  (0, _hooks.useUpdate)(function (_) {
    editorRef.current.getModel().modified.setValue(modified);
  }, [modified], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    editorRef.current.getModel().original.setValue(original);
  }, [original], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    var _editorRef$current$ge = editorRef.current.getModel(),
        original = _editorRef$current$ge.original,
        modified = _editorRef$current$ge.modified;

    monacoRef.current.editor.setModelLanguage(original, originalLanguage || language);
    monacoRef.current.editor.setModelLanguage(modified, modifiedLanguage || language);
  }, [language, originalLanguage, modifiedLanguage], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    monacoRef.current.editor.setTheme(theme);
  }, [theme], isEditorReady);
  (0, _hooks.useUpdate)(function (_) {
    editorRef.current.updateOptions(options);
  }, [options], isEditorReady);
  var setModels = (0, _react.useCallback)(function (_) {
    var originalModel = monacoRef.current.editor.createModel(original, originalLanguage || language);
    var modifiedModel = monacoRef.current.editor.createModel(modified, modifiedLanguage || language);
    editorRef.current.setModel({
      original: originalModel,
      modified: modifiedModel
    });
  }, [language, modified, modifiedLanguage, original, originalLanguage]);
  var createEditor = (0, _react.useCallback)(function (_) {
    editorRef.current = monacoRef.current.editor.createDiffEditor(containerRef.current, _objectSpread({
      automaticLayout: true
    }, options));
    setModels();

    var _editorRef$current$ge2 = editorRef.current.getModel(),
        original = _editorRef$current$ge2.original,
        modified = _editorRef$current$ge2.modified;

    editorDidMount(modified.getValue.bind(modified), original.getValue.bind(original), editorRef.current);
    monacoRef.current.editor.defineTheme('dark', _themes["default"]['night-dark']);
    monacoRef.current.editor.setTheme(theme);
    setIsEditorReady(true);
  }, [editorDidMount, options, theme, setModels]);
  (0, _react.useEffect)(function (_) {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);

  var disposeEditor = function disposeEditor(_) {
    return editorRef.current.dispose();
  };

  return /*#__PURE__*/_react["default"].createElement(_MonacoContainer["default"], {
    width: width,
    height: height,
    isEditorReady: isEditorReady,
    loading: loading,
    _ref: containerRef
  });
};

DiffEditor.propTypes = {
  original: _propTypes["default"].string,
  modified: _propTypes["default"].string,
  language: _propTypes["default"].string,
  originalLanguage: _propTypes["default"].string,
  modifiedLanguage: _propTypes["default"].string,
  editorDidMount: _propTypes["default"].func,
  theme: _propTypes["default"].string,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  loading: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].string]),
  options: _propTypes["default"].object
};
DiffEditor.defaultProps = {
  editorDidMount: _utils.noop,
  theme: 'light',
  width: '100%',
  height: '100%',
  loading: 'Loading...',
  options: {}
};
var _default = DiffEditor;
exports["default"] = _default;