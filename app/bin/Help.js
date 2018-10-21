/*
 * adonis-hexa-cli
 *
 * (c) Emmanuel Ogbiyoyo <ogbiyoyosky@yahoo.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const kleur = require('kleur')
const figlet = require('figlet')

/** This class is responsible for show the help command
 *
 * @class help
 */

class Help {
  constructor (args) {
    this.menu = {
      command: ['help', 'new', 'version' ]
    }
    this.displayHelp(this.menu)
  }

  /** This method display the help conmmand to the console.
 *
 * @method displayHelp
 *
 * @param {Object} menu
 */
  displayHelp (menu) {
    figlet('help', (err, data) => {
      if (err) {
        console.log(`${kleur.red('something went wrong')}`)
        return
      }
      console.log(data)
      console.log(` ${kleur.white.italic('The help command for adonis-hexa is')}:   ${kleur.magenta.italic('adonis-hexa')} ${kleur.green.italic(menu.command[0])}`)
      console.log(` ${kleur.white.italic('The command to create a new project')}:   ${kleur.magenta.italic('adonis-hexa')} ${kleur.green.italic(menu.command[1])} App`)
      console.log(` ${kleur.white.italic('The command to check version is ')}:   ${kleur.magenta.italic('adonis-hexa')} ${kleur.green.italic(menu.command[2])}`)
    })
  }
}

export default Help
