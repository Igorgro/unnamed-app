export interface BasicResponse {
    code: 200 | 400| 401
    message: string
}


export interface RegisterInfo {
    firstName: string
    lastName: string
    username: string
    password: string
    email: string
}

export interface LoginInfo {
    username: string
    password: string
}
