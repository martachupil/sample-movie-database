export interface Credentials {
    email: string;
    password: string;
}

export interface User extends Credentials {
    name: string;
}
