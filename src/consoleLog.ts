import {log} from './logger';

export class consoleLog extends log
{
	public write(color:string,msg:string) :void
	{
		if(this.conf.console)
			console.log(color, msg);
	}
}