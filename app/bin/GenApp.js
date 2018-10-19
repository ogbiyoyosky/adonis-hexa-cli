/*
 * adonis-hexa-cli
 *
 * (c) Emmanuel Ogbiyoyo <ogbiyoyosky@yahoo.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import BaseGenerator from './BaseGenerator'
/**
 * The GenApp exxtends from BaseGenerator.
 *
 * @class Command
 * @static
 */

class GenApp extends BaseGenerator {
  /**
   * @constructor
   *
   * @param {*} args
   */
  constructor (args) {
    super(args)
    this.args = args
    this.appName = args.appName || this.args._[1]
    this.installing(this.appName)
  }

  /**
   * This methods runs installation
   *
   * @method installing
   *
   * @param {*} appName
   *
   * @returns function
   */
  installing (appName) {
    this.display(appName, 'Adonis Hexa')
  }
}
export default GenApp
