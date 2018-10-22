'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * adonis-hexa-cli
 *
 * (c) Emmanuel Ogbiyoyo <ogbiyoyosky@yahoo.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

var kleur = require('kleur');
var figlet = require('figlet');

/** This class is responsible for show the help command
 *
 * @class help
 */

var Help = function () {
  function Help(args) {
    _classCallCheck(this, Help);

    this.menu = {
      command: ['help', 'new', 'version']
    };
    this.displayHelp(this.menu);
  }

  /** This method display the help conmmand to the console.
  *
  * @method displayHelp
  *
  * @param {Object} menu
  */


  _createClass(Help, [{
    key: 'displayHelp',
    value: function displayHelp(menu) {
      figlet('help', function (err, data) {
        if (err) {
          console.log('' + kleur.red('something went wrong'));
          return;
        }
        console.log(data);
        console.log(' ' + kleur.white.italic('The help command for adonis-hexa is') + ':   ' + kleur.magenta.italic('adonis-hexa') + ' ' + kleur.green.italic(menu.command[0]));
        console.log(' ' + kleur.white.italic('The command to create a new project') + ':   ' + kleur.magenta.italic('adonis-hexa') + ' ' + kleur.green.italic(menu.command[1]) + ' App');
        console.log(' ' + kleur.white.italic('The command to check version is ') + ':   ' + kleur.magenta.italic('adonis-hexa') + ' ' + kleur.green.italic(menu.command[2]));
      });
    }
  }]);

  return Help;
}();

exports.default = Help;