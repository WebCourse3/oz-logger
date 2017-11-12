export interface logInterface {
	info(message:string , supportingDetails?: any[]):void;
	debug(message:string , supportingDetails?: any[]):void;
	error(message:string , supportingDetails?: any[]):void;
	warn(message:string , supportingDetails?: any[]):void;
}