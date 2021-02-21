export interface BasicResponse {
    code: 200 | 400| 401
    message: string
}


export interface RegisterInfo {
    username: string
    password: string
    email: string
}

export interface LoginInfo {
    username: string
    password: string
}
