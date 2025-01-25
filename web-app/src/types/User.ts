export interface User {
    id?: string;
    displayName: string;
    username: string;
    token: string;
    roles: string[];
}

export interface UserIdAndName {
    id: string;
    username: string;
    displayName: string;
    email:string;
}
