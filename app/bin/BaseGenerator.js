const Git = require('nodegit');
const figlet = require('figlet');
class BaseGenerator {

    async cloneRepo( repo, appName) {
        await Git.clone(repo, `${appName}`)
    }

    
}
export default BaseGenerator