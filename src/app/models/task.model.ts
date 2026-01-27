import { Status } from "./status.enum";

export interface TaskModel{
    id:number;
    title:string;
    description:string;
    status:Status;
    date_from?:Date;
    date_to?:Date;
}