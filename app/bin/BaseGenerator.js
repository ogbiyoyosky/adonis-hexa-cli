/*
 * adonis-hexa-cli
 *
 * (c) Emmanuel Ogbiyoyo <ogbiyoyosky@yahoo.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const Git = require('nodegit')
const figlet = require('figlet')
const kleur = require('kleur')
const execSync = require('child_process').execSync
const minimist = require('minimist')
const spawn = require('cross-spawn')
const mustache = require('mustache')
const fs = require('fs-extra')

require('shelljs/global')

/**
 * The BaseGenerator is supposed to be extended by
 * every other command to work properly.
 *
 * @class BaseGenerator
 * @static
 */

class BaseGenerator {
  constructor () {
    this.chalk = kleur

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
    }

    /**
     * The icons to be used on windows
     *
     * @type {Object}
     */

    this.iconsWin = {
      info: this.chalk.cyan('i'),
      success: this.chalk.green('√'),
      warn: this.chalk.yellow('‼'),
      error: this.chalk.red('×')
    }

    /**
     * Get Args
     */

    this.args = minimist(process.argv.slice(2))
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

  icon (type) {
    return process.platform === 'win32' ? this.iconsWin[type] : this.iconsMain[type]
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

  async display (appName, projectName) {
    try {
      console.log(this.chalk.gray.bold(`------------------------- ${this.chalk.cyan(appName)} -----------------------------------`))
      console.log(this.chalk.gray.bold(`-------------------------------------------------------------------`))
      console.log(this.chalk.gray.bold(`---------------------------------------------------------------------`))
      console.log(this.chalk.gray.bold(`-------------------------------------------------------------------`))

      /**
 * Returns ascil reprensentation of text
 *
 * @param {String}
 *
 * @param {Function}
 *
 * @Return {String}
 */
      figlet(projectName, (err, data) => {
        if (err) {
          console.log(this.chalk.red.bold('something went wrong'))
          return
        }
        console.log(data)
        console.log(this.chalk.gray.bold(`-------------------------------------------------------------------`))
        console.log(this.chalk.gray.bold(`-------------------------------------------------------------------`))
        console.log(this.chalk.gray.bold(`-------------------------------------------------------------------`))
      })

      await Git.Clone('https://github.com/creatrixity/adonis-hexa', appName).then(
        async () => {
          cd(appName)

          console.log(`${this.chalk.bold.green.italic('Creating project directory        ')} ${this.icon('success')}`)

          console.log(`${this.chalk.bold.green.italic('Cloning from repository           ')} ${this.icon('success')}`)

          await this.installingPackages(this.args = ['install']).then(() => {
            console.log(`${this.chalk.bold.green.italic('Successfully installed            ')} ${this.icon('success')}`)
            console.log(`${this.chalk.bold.magenta.italic(`Cd into ${appName}                     `)} ${this.icon('info')}`)
            console.log(`${this.chalk.bold.magenta.italic(`run the command npm serve --dev     `)} ${this.icon('info')}`)
          }

          )
        }
      )
    } catch (e) {
      console.log(console.log(`${this.chalk.bold.red.italic('diectory already exit          ')} ${this.icon('error')}`))
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
  async installingPackages (args) {
    
    try {
      let command

      this.shouldUseYarn() ? command = 'yarn' : command = 'npm'

      const child = spawn(command, args, { stdio: 'inherit' })
      child.on('close', code => {
        if (code !== 0) {
          reject({
            command: `${command} ${args.join(' ')}`
          })
        }
      })
    } catch (e) {
      process.exit(1)
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
  shouldUseYarn () {
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' })
      return true
    } catch (e) {
      return false
    }
  }

  emptyDir (dir) {
    return fs.emptyDir(dir)
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
  ensureFile (file) {
    return fs.ensureFile(file)
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
  ensureDir (dir) {
    return fs.ensureDir(dir)
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
  pathExists (file) {
    return fs.pathExists(file)
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
  removeFile (file) {
    return fs.remove(file)
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
  readFile (file, encoding) {
    return fs.readFile(file, encoding)
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
  removeDir (dir) {
    return fs.remove(dir)
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
  copy (src, dest, options) {
    return fs.copy(src, dest, options)
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
  move (src, dest, options) {
    return fs.move(src, dest, options)
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
  async generateFile (file, template, data) {
    const exists = await this.pathExists(file)
    if (exists) {
      throw new Error(`${file} already exists`)
    }

    const output = mustache.render(template, data)
    return this.writeFile(file, output)
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
  writeFile (file, content, options) {
    return fs.outputFile(file, content, options)
  }
}

export default BaseGenerator
