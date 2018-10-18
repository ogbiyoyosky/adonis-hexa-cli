#!/usr/bin/env node

const minimist = require('minimist')
import GenApp from "./bin/GenApp";

class Init {
    constructor(){
        this.args = minimist(process.argv.slice(2));
        this.cmd = this.args._[0] || 'help';
        this.switchCommand(this.cmd);
    }

    switchCommand(cmd){  
        switch(this.cmd){
            case 'new':
            new GenApp(this.args);
        break
        }
    }

}(new Init)

export default Init;