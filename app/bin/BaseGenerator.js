const Git = require('nodegit');
const figlet = require('figlet');
const kleur = require('kleur');
const execSync = require('child_process').execSync;
const minimist = require('minimist')
const spawn = require('cross-spawn');

require('shelljs/global')

class BaseGenerator {
  constructor () {
    this.chalk = kleur

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

    this.args = minimist(process.argv.slice(2))
  }

  icon (type) {
    return process.platform === 'win32' ? this.iconsWin[type] : this.iconsMain[type]
  }

  async display (appName, projectName) {
    try {
      console.log(this.chalk.green.bold.underline(`-------------------------${appName}---------------------------`))
      console.log(this.chalk.green.bold.underline(`--------------------------------------------------------------`))
      console.log(this.chalk.green.bold.underline(`--------------------------------------------------------------`))
      console.log(this.chalk.green.bold.underline(`--------------------------------------------------------------`))
  
      figlet(projectName, (err, data) => {
        if (err) {
          console.log(kleur.red.bold('something went wrong'))
          return
        }
        console.log(data)
      });
      console.log(kleur.green.bold.underline(`-------------------------${projectName}---------------------------`))
  
      await Git.Clone('https://github.com/ogbiyoyosky/test-repo.git', appName).then(
        async () => {
          cd(appName);
          await this.installingPackages(this.args = ['install'])
        }
      )
    
    } catch(e) {
      console.log('directory already exist');
    }
  
    
  }

  async installingPackages (args) {
    console.log(`installing  packages------`);
    try {
      let command
      
      this.shouldUseYarn() ? command = 'yarn' : command = 'npm'
  
      const child = spawn(command, args, { stdio: 'inherit' });
      child.on('close', code => {
        if (code !== 0) {
          reject({
            command: `${command} ${args.join(' ')}`
          });
          return;
        }
      
      })
    }catch (e) {

    }
      
  

  }

  shouldUseYarn(){
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' });
      return true;
    } catch (e) {
      return false;
    }
  }
}
export default BaseGenerator
