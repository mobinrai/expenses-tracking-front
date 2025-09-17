export interface IUser {
    name:string;
    email: string;
    password: string;
    currency?:string;
    settings?:{
        darkMode?:boolean;
        notifications?:boolean;
    }
}