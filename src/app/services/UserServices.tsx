import { IEditTransaction, ITransactionAdd, IUserLogin, IUserRegister } from '../interfaces/IUsersServices';
import { instance } from '../api/Api';

const loginUser = (data:IUserLogin) => instance.post('/login', data);
const registerUser = (data:IUserRegister) => instance.post('/usuario', data);

const detailUser = (config:any) => instance.get('/usuario', config);
const updateUser = (config:any) => instance.put('/usuario', config);
const getCategoria = (config:any) => instance.get('/categoria', config);
const getTransaction = (config:any) => instance.get('/transacao', config);
const getTransactionId = (id:number, config:any) => instance.get(`/transacao/${id}`, config);
const addTransaction = (data:ITransactionAdd, config:any) => instance.post(`/transacao`, data, config);
const editTransaction = (data:IEditTransaction, id:number, config:any) => instance.put(`/transacao/${id}`, data, config);
const deleteTransaction = (id:number, config:any) => instance.delete(`/transacao/${id}`, config);
const getExtract = (config:any) => instance.get('/transacao/extrato', config);

export const UserServices = {
    loginUser,
    registerUser,
    detailUser,
    getTransaction,
    addTransaction,
    getTransactionId,
    editTransaction,
    deleteTransaction,
    getExtract,
    getCategoria
}

