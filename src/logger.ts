import { logInterface } from '../interfaces/logInterface';
import { configurationInterface } from '../interfaces/configurationInterface';
import {colors} from '../enums/colors';
import {actions} from '../enums/actions';
const fs = require('fs')

export class log implements logInterface
{
	name : string;
	conf : configurationInterface;
	fileName:string;

	constructor(name:string, conf:configurationInterface)
	{
		this.name = name;
		this.conf = conf;
		this.fileName = "../tmp/text.txt";
	}

	public setConfiguration(configuration:configurationInterface)
	{
		this.conf.console = configuration.console;
		this.conf.file = configuration.file;
		this.conf.colors = configuration.colors;
		this.conf.logLevel = configuration.logLevel;
	}

	public debug(msg:string,supportingDetails?:any[]): void {
		this.emitLogMassage(actions.debug,msg,supportingDetails,colors.fgBlack);
	}

	public info(msg:string,supportingDetails?:any[]): void {
		this.emitLogMassage(actions.info,msg,supportingDetails,colors.fgGreen);
	}

	public error(msg:string,supportingDetails?:any[]): void {
		this.emitLogMassage(actions.error,msg,supportingDetails,colors.fgRed);
	}

	public warn(msg:string,supportingDetails?:any[]): void {
		this.emitLogMassage(actions.warn,msg,supportingDetails,colors.fgYellow);
	}

	private emitLogMassage(msgType: actions,msg:string,supportingDetails:any[],colorType:colors) : void {
		if(!this.conf.colors)
			colorType = colors.fgBlack;

		if (this.conf.logLevel)
			msg = msgType + ": " + msg;

		if(supportingDetails)
			supportingDetails.forEach(x=> msg += " " + x.toString());

		let color = `\x1b[${colorType}m%s\x1b[0m`;

		if(this.conf.console)
			console.log(color, msg);

		if(this.conf.file)
			this.writeToFile(msg + '\r\n');
	}

	private writeToFile(msg:string): void
	{
		fs.appendFile(this.fileName, msg, err => {
			if (err) throw err;
		});
	}
}

