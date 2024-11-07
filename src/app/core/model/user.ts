export interface User {
    id: number;
    name:string;
    email:string;
    contactNumber:string;
    status:string;
    role:string;

}

export enum AccountStatus {
    true,
    false
}

export enum UserType {
    admin,
    user
}