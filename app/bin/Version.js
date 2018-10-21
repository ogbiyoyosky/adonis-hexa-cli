/*
 * adonis-hexa-cli
 *
 * (c) Emmanuel Ogbiyoyo <ogbiyoyosky@yahoo.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
const appPackage = require('../../package.json')

class Version {
  constructor (args) {
    this.args = args
    this.displayVersion()
  }

  displayVersion () {
    console.log(appPackage.version)
  }
}

export default Version
