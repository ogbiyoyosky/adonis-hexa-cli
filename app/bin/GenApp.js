import BaseGenerator from './BaseGenerator'
const kleur = require('kleur');


class GenApp extends BaseGenerator {
    constructor(args){
        super(args);
        this.args = args;
        this.appName = args.appName || this.args[1];
        this.installing();
    }

    installing(){
        console.log(kleur.green.bold.underline('------------------------------------------------------------'));
    }


}
export default GenApp ;