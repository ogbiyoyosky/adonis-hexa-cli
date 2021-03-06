#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

/*
 * adonis-hexa-cli
 *
 * (c) Emmanuel Ogbiyoyo <ogbiyoyosky@yahoo.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

var _GenApp = require('./bin/GenApp');

var _GenApp2 = _interopRequireDefault(_GenApp);

var _Version = require('./bin/Version');

var _Version2 = _interopRequireDefault(_Version);

var _TemplateGenerator = require('./bin/TemplateGenerator');

var _TemplateGenerator2 = _interopRequireDefault(_TemplateGenerator);

var _Help = require('./bin/Help');

var _Help2 = _interopRequireDefault(_Help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var minimist = require('minimist');

var Init = function () {
  function Init() {
    _classCallCheck(this, Init);

    this.args = minimist(process.argv.slice(2));
    this.cmd = this.args._[0] || 'help';
    this.switchCommand(this.cmd);
  }
  /** The method listens for various command
  *
  * @method
  *
  * @param {String} cmd
  *
  * @return class
  *
  */


  _createClass(Init, [{
    key: 'switchCommand',
    value: function switchCommand(cmd) {
      switch (cmd) {
        case 'new':
          new _GenApp2.default(this.args);
          break;
        case 'version':
          new _Version2.default(this.args);
          break;
        case 'help':
          new _Help2.default(this.args);
          break;
        case 'make:service':
          new _TemplateGenerator2.default(this.args);
          break;
      }
    }
  }]);

  return Init;
}();

new Init();

exports.default = Init;