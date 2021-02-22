export interface UserInfo {
    firstName: string
    lastName: string
    username: string
}

export interface RegisterInfo extends UserInfo {
    email: string
    password: string
}

export interface LoginInfo {
    username: string
    password: string
}
