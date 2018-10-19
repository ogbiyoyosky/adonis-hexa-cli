'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseGenerator2 = require('./BaseGenerator');

var _BaseGenerator3 = _interopRequireDefault(_BaseGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * adonis-hexa-cli
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) Emmanuel Ogbiyoyo <ogbiyoyosky@yahoo.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * file that was distributed with this source code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

/**
 * The GenApp exxtends from BaseGenerator.
 *
 * @class Command
 * @static
 */

var GenApp = function (_BaseGenerator) {
  _inherits(GenApp, _BaseGenerator);

  /**
   * @constructor
   *
   * @param {*} args
   */
  function GenApp(args) {
    _classCallCheck(this, GenApp);

    var _this = _possibleConstructorReturn(this, (GenApp.__proto__ || Object.getPrototypeOf(GenApp)).call(this, args));

    _this.args = args;
    _this.appName = args.appName || _this.args._[1];
    _this.installing(_this.appName);
    return _this;
  }

  /**
   * This methods runs installation
   *
   * @method installing
   *
   * @param {*} appName
   *
   * @returns function
   */


  _createClass(GenApp, [{
    key: 'installing',
    value: function installing(appName) {
      this.display(appName, 'Adonis Hexa');
    }
  }]);

  return GenApp;
}(_BaseGenerator3.default);

exports.default = GenApp;