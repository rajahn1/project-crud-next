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

export interface IConfig {
    headers: IAuthorization
}
export interface IAuthorization {
    Authorization: string
}

export interface ICategorias {
    id: number,
    descricao: string
}

export interface ITransactionsRes {
    id: number
    tipo: string
    descricao: string
    valor: number
    data: string
    usuario_id: number
    categoria_id: number
    categoria_nome: string
  }

export interface IGlobalProviderProps {
    categorias: ICategorias[]
    setCategorias: (value:ICategorias[]) => void;
    config: IConfig;
}

export interface IExtract {
    entrada: number,
    saida: number
}

export interface IModalEditProp {
    transactionId: number;
}