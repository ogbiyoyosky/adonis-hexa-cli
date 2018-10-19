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

require('shelljs/global')

/**
 * The BaseGenerator is supposed to be extended by
 * every other command to work properly.
 *
 * @class Command
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
      
      await Git.Clone('https://github.com/ogbiyoyosky/test-repo.git', appName).then(
        async () => {
          cd(appName)
          await this.installingPackages(this.args = ['install']).then(
            console.log(`${this.chalk.bold.green.italic('Successfully installed            ')} ${this.icon('success')}`)
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
 * @param {String} args
 *
 * @return {promise}
 */
  async installingPackages (args) {
    
      console.log(`${this.chalk.bold.green.italic('Creating project directory        ')} ${this.icon('success')}`)
  

    
      console.log(`${this.chalk.bold.green.italic('Cloning from repository           ')} ${this.icon('success')}`)
   
    
    
return
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

    }
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
  shouldUseYarn () {
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' })
      return true
    } catch (e) {
      return false
    }
  }
}
export default BaseGenerator
