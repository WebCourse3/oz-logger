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

	consoleAction = {
		"info": function(color:string,msg:string,parameters?: any[]) {console.log(color,msg,parameters);},
		"debug": function(color:string,msg:string,parameters?: any[]) {console.log(color,msg,parameters);},
		"error": function(color:string,msg:string,parameters?: any[]) {console.log(color,msg,parameters);},
		"warn": function(color:string,msg:string,parameters?: any[]) {console.log(color,msg,parameters);}
	};

	constructor(name:string, conf:configurationInterface)
	{
		this.name = name;
		this.conf = conf;
	}


	log

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

		if(supportingDetails && supportingDetails.length > 0)
			this.consoleAction[msgType](color,msg,supportingDetails);
		else
			this.consoleAction[msgType](color,msg);

	}
}

let logger = new log("oz",{console:true,file:false,colors:true,logLevel:false});

logger.info("oz",[""]);
logger.debug("oz",[""]);
logger.warn("oz",[""]);
logger.error("oz",[""]);

logger.info("oz");
logger.debug("oz");
logger.warn("oz");
logger.error("oz");