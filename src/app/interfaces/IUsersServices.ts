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

export interface ITransactionAdd {
    valor: number,
    tipo: string,
    descricao: string,
    data: string,
    categoria_id: number
}

export interface IEditTransaction {
    descricao: string
    valor: number
    data: string
    categoria_id: number
    tipo: string
}