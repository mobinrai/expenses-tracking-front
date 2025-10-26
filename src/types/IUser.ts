export interface IUser {
    id?:string;
    name:string;
    email: string;
    password: string;    
    currency?:string;
    accountId:string;
    settings?:{
        darkMode?:boolean;
        notifications?:boolean;
    },
}