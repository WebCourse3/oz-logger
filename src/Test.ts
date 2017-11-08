
import {log} from './logger';

let logger = new log("oz",{console:true,file:true,colors:true,logLevel:true});

logger.info("oz",[""]);
logger.debug("oz",[""]);
logger.warn("oz",[""]);
logger.error("oz",[""]);

logger.info("oz");
logger.debug("oz");
logger.warn("oz");
logger.error("oz");