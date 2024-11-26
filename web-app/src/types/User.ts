export interface User {
    id?: string;
    displayName: string;
    username: string;
    token: string;
    roles: string[];
}

export interface UserIdAndName {
    id: string;
    displayName: string;
}
