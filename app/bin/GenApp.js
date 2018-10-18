import BaseGenerator from './BaseGenerator'



class GenApp extends BaseGenerator {
    constructor(args){
        super(args);
        this.args = args;
        this.appName = args.appName || this.args._[1];
        console.log(this.appName)
        this.installing(this.appName);
         

    }
    installing(appName){
        
        this.display(appName, 'Adonis Hexa');
        
    }


}
export default GenApp ;