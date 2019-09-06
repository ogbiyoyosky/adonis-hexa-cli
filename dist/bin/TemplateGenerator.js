'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseGenerator2 = require('./BaseGenerator');

var _BaseGenerator3 = _interopRequireDefault(_BaseGenerator2);

var _Helper = require('./Helper');

var _Helper2 = _interopRequireDefault(_Helper);

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

var fs = require('fs-extra');
var path = require('path');

/**
 * The TemplateGenerator exxtends from BaseGenerator.
 *
 * @class Command
 * @static
 */

var TemplateGenerator = function (_BaseGenerator) {
    _inherits(TemplateGenerator, _BaseGenerator);

    /**
     * @constructor
     *
     * @param {*} args
     */
    function TemplateGenerator(args) {
        _classCallCheck(this, TemplateGenerator);

        var _this = _possibleConstructorReturn(this, (TemplateGenerator.__proto__ || Object.getPrototypeOf(TemplateGenerator)).call(this, args));

        _this.args = args;
        _this.command = args._[0];
        _this.serviceName = args.serviceName || _this.args._[1];
        _this.generateService(_this.serviceName);
        return _this;
    }

    /**
     * @method generateService -  this method invokes the generation of a Adonis Hexa service structure
     * 
     * @params { String } serviceName - the of the service
     * 
     * @return {Promise}
     */


    _createClass(TemplateGenerator, [{
        key: 'generateService',
        value: async function generateService(serviceName) {

            try {

                var help = new _Helper2.default();
                await this.ensureProjectDir('ace');
                var appRoot = await help.appRoot();
                console.log(appRoot);
            } catch (e) {
                console.log(e);
            }
        }
    }, {
        key: 'ensureProjectDir',
        value: async function ensureProjectDir(dir) {
            try {
                var acePath = path.join(process.cwd(), dir);
                var exists = await this.pathExists(acePath);

                if (!exists) {
                    console.log(this.chalk.red.bold(' ' + this.iconsMain.error + ' Oops! Make sure you are inside an AdonisHexa app to run the ' + this.command + ' command.'));
                }
            } catch (e) {
                console.log(e);
            }
        }
    }]);

    return TemplateGenerator;
}(_BaseGenerator3.default);

exports.default = TemplateGenerator;