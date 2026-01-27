import { Status } from "./status.enum";

export interface NewTask{
    title:string;
    description:string;
    date_from?:Date;
    date_to?:Date;
}