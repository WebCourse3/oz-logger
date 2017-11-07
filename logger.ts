const fs = require('fs');


enum colors
{
	fgBlack = 30,
	fgRed = 31,
	fgGreen = 32,
	fgYellow = 33,
	fgBlue = 34,
	fgWhite = 37
}

interface logInterface {
	info(message:string , supportingDetails?: any[]):void;
	debug(message:string , supportingDetails?: any[]):void;
	error(message:string , supportingDetails?: any[]):void;
	warn(message:string , supportingDetails?: any[]):void;
}

interface configurationInterface {
    console: Boolean,
    file: Boolean,
	colors: Boolean,
	logLevel: Boolean
}

class log implements logInterface
{
	name : string;
	conf : configurationInterface;

	constructor(name:string, conf:configurationInterface)
	{
		this.name = name;
		this.conf = conf;
	}

	public debug(msg:string,supportingDetails?:any[]): void {
		this.emitLogMassage("debug",msg,supportingDetails,colors.fgBlack);
	}

	public info(msg:string,supportingDetails?:any[]): void {
		this.emitLogMassage("info",msg,supportingDetails,colors.fgGreen);
	}

	public error(msg:string,supportingDetails?:any[]): void {
		this.emitLogMassage("error",msg,supportingDetails,colors.fgRed);
	}

	public warn(msg:string,supportingDetails?:any[]): void {
		this.emitLogMassage("warn",msg,supportingDetails,colors.fgYellow);
	}

	private emitLogMassage(msgType: "debug" | "info" | "error" | "warn",msg:string,supportingDetails:any[],colorType:colors) : void {
		if(!this.conf.colors)
			colorType = colors.fgBlack;

		let color = `\x1b[${colorType}m%s\x1b[0m`;

		if(this.conf.console) {
			if (supportingDetails && supportingDetails.length > 0)
				console.log(color, msg, supportingDetails);
			else
				console.log(color, msg);
		}

		if(this.conf.file) {
			var fs = require('fs');
			fs.appendFile("./tmp/text.txt", msg + ':' + supportingDetails + ':'+ msgType +  '\r\n' , function (err) {
				if (err) { throw err}
			});
		}


	}
}

let logger = new log("oz",{console:true,file:true,colors:true,logLevel:false});

logger.info("oz",[""]);
logger.debug("oz",[""]);
logger.warn("oz",[""]);
logger.error("oz",[""]);

logger.info("oz");
logger.debug("oz");
logger.warn("oz");
logger.error("oz");