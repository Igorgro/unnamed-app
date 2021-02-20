export enum Role {
    USER,
    ADMIN
}

export interface User {
    username: string
    password: string
    email: string
}
