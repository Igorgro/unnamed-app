export enum Role {
    USER,
    ADMIN
}

export interface User {
    username: string
    passwordHash: string
    email: string
}
