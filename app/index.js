#!/usr/bin/env node

/*
 * adonis-hexa-cli
 *
 * (c) Emmanuel Ogbiyoyo <ogbiyoyosky@yahoo.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import GenApp from './bin/GenApp';
import Version from './bin/Version';
import Help from './bin/Help';
const minimist = require('minimist')



class Init {
  constructor () {
    this.args = minimist(process.argv.slice(2))
    this.cmd = this.args._[0] || 'help'
    this.switchCommand(this.cmd)
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
  switchCommand (cmd) {
    switch (cmd) {
      case 'new':
        new GenApp(this.args)
        break
        case 'version':
        new Version(this.args)
        break
        case 'help':
        new Help(this.args);
        break
    }
  }
}(new Init())

export default Init
