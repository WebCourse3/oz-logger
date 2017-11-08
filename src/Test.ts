
import {log} from './logger';
import {fileLog} from './fileLog'
import {consoleLog} from './consoleLog'

let loggers = [new fileLog("oz",{console:true,file:true,colors:true,logLevel:true}),
		    new consoleLog("oz",{console:true,file:true,colors:true,logLevel:true})];
loggers.forEach(x=> x.warn("ox"));


// logger.info("oz",[""]);
// logger.debug("oz",[""]);
// logger.warn("oz",[""]);
// logger.error("oz",["ozzzy","olol","odkf"]);
//
// logger.info("oz");
// logger.debug("oz");
// logger.warn("oz");
// logger.error("oz");