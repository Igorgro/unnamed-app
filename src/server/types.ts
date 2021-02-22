export enum Role {
    USER,
    ADMIN
}

export interface User {
    firstName: string
    lastName: string
    username: string
    passwordHash: string
    email: string
}
