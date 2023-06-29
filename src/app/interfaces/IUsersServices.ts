export interface IUserRegister {
    nome: string,
    email: string,
    senha: string,
}

export interface IUserLogin {
    email: string,
    senha: string
}

export interface IGetUser {
    id: number,
    nome: string,
    email: string
}