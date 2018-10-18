const Git = require('nodegit');
const figlet = require('figlet');
const kleur = require('kleur');
require('shelljs/global');

class BaseGenerator {

    async cloneRepo( repo, appName) {
        await Git.clone(repo, `${appName}`)
    }

    display(appName, projectName) {
        console.log(kleur.green.bold.underline(`-------------------------${appName}---------------------------`));
        
            figlet(projectName, (err, data) =>{
                if(err){
                    console.log(kleur.red.bold('something went wrong'))
                    return;
                }
                console.log(data);
            });
            
    }
    
}
export default BaseGenerator