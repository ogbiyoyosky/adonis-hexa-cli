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

var Git = require('nodegit');
var figlet = require('figlet');
var kleur = require('kleur');
var execSync = require('child_process').execSync;
var minimist = require('minimist');
var spawn = require('cross-spawn');

require('shelljs/global');

/**
 * The BaseGenerator is supposed to be extended by
 * every other command to work properly.
 *
 * @class Command
 * @static
 */

var BaseGenerator = function () {
  function BaseGenerator() {
    _classCallCheck(this, BaseGenerator);

    this.chalk = kleur;

    /**
     * List of icons
     *
     * @type {Object}
     */

    this.iconsMain = {
      info: this.chalk.cyan('ℹ'),
      success: this.chalk.green('✔'),
      warn: this.chalk.yellow('⚠'),
      error: this.chalk.red('✖')

      /**
       * The icons to be used on windows
       *
       * @type {Object}
       */

    };this.iconsWin = {
      info: this.chalk.cyan('i'),
      success: this.chalk.green('√'),
      warn: this.chalk.yellow('‼'),
      error: this.chalk.red('×')

      /**
       * Get Args
       */

    };this.args = minimist(process.argv.slice(2));
  }

  /**
   * Returns a colored icon for a given type. Allowed
   * types are `info`, `warn`, `success` and `error`.
   *
   * @method icon
   *
   * @param  {String} type
   *
   * @return {String}
   */

  _createClass(BaseGenerator, [{
    key: 'icon',
    value: function icon(type) {
      return process.platform === 'win32' ? this.iconsWin[type] : this.iconsMain[type];
    }

    /**
     * @method display
     *
     * @param {String} appName
     *
     * @param {String} projectName
     *
     * @return String
     */

  }, {
    key: 'display',
    value: async function display(appName, projectName) {
      var _this = this;

      try {
        console.log(this.chalk.magenta.bold('-------------------------' + appName + '-----------------------------------'));
        console.log(this.chalk.green.bold.underline('-------------------------------------------------------------------'));
        console.log(this.chalk.green.bold.underline('---------------------------------------------------------------------'));
        console.log(this.chalk.magenta.bold.underline('-------------------------------------------------------------------'));

        /**
        * Returns ascil reprensentation of text
        *
        * @param {String}
        *
        * @param {Function}
        *
        * @Return {String}
        */
        figlet(projectName, function (err, data) {
          if (err) {
            console.log(kleur.red.bold('something went wrong'));
            return;
          }
          console.log(data);
          console.log(_this.chalk.magenta.bold.underline('-------------------------------------------------------------------'));
          console.log(_this.chalk.green.bold.underline('-------------------------------------------------------------------'));
          console.log(_this.chalk.green.bold.underline('-------------------------------------------------------------------'));
          console.log(kleur.magenta.bold.underline('-------------------------' + projectName + '---------------------------'));
        });

        await Git.Clone('https://github.com/ogbiyoyosky/test-repo.git', appName).then(async function () {
          cd(appName);
          await _this.installingPackages(_this.args = ['install']);
        });
      } catch (e) {
        console.log('directory already exist');
      }
    }
    /**
    * This method install the packages in the newly created adonis-hexa application
    *
    * @method installingPackages
    *
    * @async
    *
    * @param {String} args
    *
    * @return {promise}
    */

  }, {
    key: 'installingPackages',
    value: async function installingPackages(args) {
      console.log('installing  packages------ ' + this.icon('success'));
      return;
      try {
        var command = void 0;

        this.shouldUseYarn() ? command = 'yarn' : command = 'npm';

        var child = spawn(command, args, { stdio: 'inherit' });
        child.on('close', function (code) {
          if (code !== 0) {
            reject({
              command: command + ' ' + args.join(' ')
            });
          }
        });
      } catch (e) {}
    }

    /**
     * This method check if yarn was used for installation
     *
     * @method shouldUseYarn
     *
     * @param {Void}
     *
     * @return Boolean
     */

  }, {
    key: 'shouldUseYarn',
    value: function shouldUseYarn() {
      try {
        execSync('yarnpkg --version', { stdio: 'ignore' });
        return true;
      } catch (e) {
        return false;
      }
    }
  }]);

  return BaseGenerator;
}();

exports.default = BaseGenerator;