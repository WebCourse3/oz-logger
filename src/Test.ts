import {fileLog} from './fileLog'
import {consoleLog} from './consoleLog'

let loggers = [new fileLog("oz",{console:true,file:true,colors:true,logLevel:true}),
		    new consoleLog("oz",{console:true,file:true,colors:true,logLevel:true})];

loggers[0].configurationByFile("./Configuration.json");
loggers.forEach(x=> x.warn("ox",["lol","hhb"]));
