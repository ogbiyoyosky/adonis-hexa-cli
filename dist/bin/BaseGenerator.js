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
var mustache = require('mustache');
var fs = require('fs-extra');

require('shelljs/global');

/**
 * The BaseGenerator is supposed to be extended by
 * every other command to work properly.
 *
 * @class BaseGenerator
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
        console.log(this.chalk.gray.bold('------------------------- ' + this.chalk.cyan(appName) + ' -----------------------------------'));
        console.log(this.chalk.gray.bold('-------------------------------------------------------------------'));
        console.log(this.chalk.gray.bold('---------------------------------------------------------------------'));
        console.log(this.chalk.gray.bold('-------------------------------------------------------------------'));

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
            console.log(_this.chalk.red.bold('something went wrong'));
            return;
          }
          console.log(data);
          console.log(_this.chalk.gray.bold('-------------------------------------------------------------------'));
          console.log(_this.chalk.gray.bold('-------------------------------------------------------------------'));
          console.log(_this.chalk.gray.bold('-------------------------------------------------------------------'));
        });

        await Git.Clone('https://github.com/creatrixity/adonis-hexa', appName).then(async function () {
          cd(appName);
          _this.removeDir(".git");

          console.log(_this.chalk.bold.green.italic('Creating project directory        ') + ' ' + _this.icon('success'));

          console.log(_this.chalk.bold.green.italic('Cloning from repository           ') + ' ' + _this.icon('success'));

          await _this.installingPackages(_this.args = ['install']).then(function () {
            console.log(_this.chalk.bold.green.italic('Successfully installed            ') + ' ' + _this.icon('success'));
            console.log(_this.chalk.bold.magenta.italic('Cd into ' + appName + '                     ') + ' ' + _this.icon('info'));
            console.log(_this.chalk.bold.magenta.italic('run the command npm serve --dev     ') + ' ' + _this.icon('info'));
          });
        });
      } catch (e) {
        console.log(console.log(this.chalk.bold.red.italic('diectory already exit          ') + ' ' + this.icon('error')));
      }
    }
    /**
    * This method install the packages in the newly created adonis-hexa application
    *
    * @method installingPackages
    *
    * @async
    *
    * @param [String] args
    *
    * @return {promise}
    */

  }, {
    key: 'installingPackages',
    value: async function installingPackages(args) {
      try {
        var command = void 0;

        this.shouldUseYarn() ? command = 'npm' : command = 'npm';

        var child = spawn(command, args, { stdio: 'inherit' });
        child.on('close', function (code) {
          if (code !== 0) {
            reject({
              command: command + ' ' + args.join(' ')
            });
          }
        });
      } catch (e) {
        process.exit(1);
      }
    }

    /**
     * This method checks if Yarn was used in package installation.
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
  }, {
    key: 'emptyDir',
    value: function emptyDir(dir) {
      return fs.emptyDir(dir);
    }

    /* istanbul ignore next */
    /**
     * Make sure the file exists, otherwise create the
     * empty file.
     *
     * @method ensureFile
     * @async
     *
     * @param  {String}   file
     *
     * @return {Promise}
     */

  }, {
    key: 'ensureFile',
    value: function ensureFile(file) {
      return fs.ensureFile(file);
    }

    /* istanbul ignore next */
    /**
     * Ensure a directory exists or create one
     *
     * @method ensureDir
     * @async
     *
     * @param  {String}  dir
     *
     * @return {Promise}
     */

  }, {
    key: 'ensureDir',
    value: function ensureDir(dir) {
      return fs.ensureDir(dir);
    }

    /**
     * Returns a boolean indicating whether file
     * exists or not.
     *
     * @method pathExists
     * @async
     *
     * @param  {String}   file
     *
     * @return {Promise}
     */

  }, {
    key: 'pathExists',
    value: function pathExists(file) {
      return fs.pathExists(file);
    }

    /**
     * Removes the file from the disk
     *
     * @method removeFile
     * @async
     *
     * @param  {String}   file
     *
     * @return {Promise}
     */

  }, {
    key: 'removeFile',
    value: function removeFile(file) {
      return fs.remove(file);
    }

    /**
     * Read file from the disk
     *
     * @method readFile
     * @async
     *
     * @param  {String} file
     * @param  {String} [encoding]
     *
     * @return {String}
     */

  }, {
    key: 'readFile',
    value: function readFile(file, encoding) {
      return fs.readFile(file, encoding);
    }

    /* istanbul ignore next */
    /**
     * Removes directory
     *
     * @method removeDir
     * @async
     *
     * @param  {String}  dir
     *
     * @return {Promsie}
     */

  }, {
    key: 'removeDir',
    value: function removeDir(dir) {
      return fs.remove(dir);
    }

    /* istanbul ignore next */
    /**
     * Copy file from src directory to destination
     *
     * @method copy
     * @async
     *
     * @param  {String} src
     * @param  {String} dest
     * @param  {Object} [options = {}]
     *
     * @return {Promise}
     */

  }, {
    key: 'copy',
    value: function copy(src, dest, options) {
      return fs.copy(src, dest, options);
    }

    /* istanbul ignore next */
    /**
     * Move file from src directory to destination
     *
     * @method move
     * @async
     *
     * @param  {String} src
     * @param  {String} dest
     * @param  {Object} [options = {}]
     *
     * @return {Promise}
     */

  }, {
    key: 'move',
    value: function move(src, dest, options) {
      return fs.move(src, dest, options);
    }

    /**
     * Generate file from a mustache template. In the process
     * it will make sure that file does not exists before
     * creating it.
     *
     * @method generateFile
     * @async
     *
     * @param  {String}     file
     * @param  {String}     template
     * @param  {Object}     data
     *
     * @return {Promise}
     *
     * @throws {Error} If file already exists.
     */

  }, {
    key: 'generateFile',
    value: async function generateFile(file, template, data) {
      var exists = await this.pathExists(file);
      if (exists) {
        throw new Error(file + ' already exists');
      }

      var output = mustache.render(template, data);
      return this.writeFile(file, output);
    }

    /**
     * Write file to a given location if parent
     * directory/directories does not exists
     * they will be created
     *
     * @method writeFile
     * @async
     *
     * @param  {String}  file
     * @param  {String}  content
     * @param  {Object}  options
     *
     * @return {Promise}
     */

  }, {
    key: 'writeFile',
    value: function writeFile(file, content, options) {
      return fs.outputFile(file, content, options);
    }
  }]);

  return BaseGenerator;
}();

exports.default = BaseGenerator;