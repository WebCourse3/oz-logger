import {log} from './logger';
const fs = require('fs');

export class fileLog extends log
{
	public write(color:string,msg:string) :void
	{
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