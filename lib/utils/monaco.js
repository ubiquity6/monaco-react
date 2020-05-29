"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _config2 = _interopRequireDefault(require("../config"));

var _utils = require("../utils");

var Monaco = /*#__PURE__*/function () {
  function Monaco() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Monaco);
    (0, _defineProperty2["default"])(this, "handleMainScriptLoad", function (_) {
      document.removeEventListener('monaco_init', _this.handleMainScriptLoad);

      _this.resolve(window.monaco);
    });
    (0, _defineProperty2["default"])(this, "isInitialized", false);
    (0, _defineProperty2["default"])(this, "wrapperPromise", new Promise(function (res, rej) {
      _this.resolve = res;
      _this.reject = rej;
    }));
    this.__config = config;
  }

  (0, _createClass2["default"])(Monaco, [{
    key: "config",
    value: function config(_config) {
      if (_config) {
        this.__config = (0, _utils.deepMerge)(this.__config, this.validateConfig(_config));
      }

      return this;
    }
  }, {
    key: "validateConfig",
    value: function validateConfig(config) {
      if (config.urls) {
        this.informAboutDepreciation();
        return {
          paths: {
            vs: config.urls.monacoBase
          }
        };
      }

      return config;
    }
  }, {
    key: "informAboutDepreciation",
    value: function informAboutDepreciation() {
      console.warn("Deprecation warning!\n      You are using deprecated way of configuration.\n\n      Instead of using\n        monaco.config({ urls: { monacoBase: '...' } })\n      use\n        monaco.config({ paths: { vs: '...' } })\n\n      For more please check the link https://github.com/suren-atoyan/monaco-react#config\n    ");
    }
  }, {
    key: "injectScripts",
    value: function injectScripts(script) {
      document.body.appendChild(script);
    }
  }, {
    key: "createScript",
    value: function createScript(src) {
      var script = document.createElement('script');
      return src && (script.src = src), script;
    }
  }, {
    key: "createMonacoLoaderScript",
    value: function createMonacoLoaderScript(mainScript) {
      var _this2 = this;

      var loaderScript = this.createScript("".concat(this.__config.paths.vs, "/loader.js"));

      loaderScript.onload = function (_) {
        return _this2.injectScripts(mainScript);
      };

      loaderScript.onerror = this.reject;
      return loaderScript;
    }
  }, {
    key: "createMainScript",
    value: function createMainScript() {
      var mainScript = this.createScript();
      mainScript.innerHTML = "\n      require.config(".concat(JSON.stringify(this.__config), ");\n      require(['vs/editor/editor.main'], function() {\n        document.dispatchEvent(new Event('monaco_init'));\n      });\n    ");
      mainScript.onerror = this.reject;
      return mainScript;
    }
  }, {
    key: "init",
    value: function init() {
      if (!this.isInitialized) {
        if (window.monaco && window.monaco.editor) {
          return new Promise(function (res, rej) {
            return res(window.monaco);
          });
        }

        document.addEventListener('monaco_init', this.handleMainScriptLoad);
        var mainScript = this.createMainScript();
        var loaderScript = this.createMonacoLoaderScript(mainScript);
        this.injectScripts(loaderScript);
      }

      this.isInitialized = true;
      return (0, _utils.makeCancelable)(this.wrapperPromise);
    }
  }]);
  return Monaco;
}();

var _default = new Monaco(_config2["default"]);

exports["default"] = _default;