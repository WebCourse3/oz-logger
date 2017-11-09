import { logInterface } from '../interfaces/logInterface';
import { configurationInterface } from '../interfaces/configurationInterface';
import {colors} from '../enums/colors';
import {actions} from '../enums/actions';

export abstract class log implements logInterface
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

	configurationByFile(fsFile: string): boolean
	{
		const fs = require('fs');
		let returnValue = false;

		if (fs.existsSync(fsFile))
		{
			let configurationJson: string = fs.readFileSync(fsFile, "utf8");
			let newConfiguration = JSON.parse(configurationJson);

			this.conf.console = newConfiguration.console;
			this.conf.logLevel = newConfiguration.logLevel;
			this.conf.colors = newConfiguration.color;
			this.conf.file = newConfiguration.file;

			returnValue = true;
		}

		return (returnValue);
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

		this.write(color,msg);

	}

	abstract write(color:string,msg:string):  void;

}

