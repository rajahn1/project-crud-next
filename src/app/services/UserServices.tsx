import { ITransactionAdd, IUserLogin, IUserRegister } from '../interfaces/IUsersServices';
import { instance } from '../api/Api';
import { config } from 'process';

const loginUser = (data:IUserLogin) => instance.post('/login', data);
const registerUser = (data:IUserRegister) => instance.post('/usuario', data);
const detailUser = () => instance.get('/usuario');
const updateUser = () => instance.put('/usuario')
const getCategoria = () => instance.get('/categoria');
const getTransaction = () => instance.get('/transacao');
const getTransactionId = (id:number) => instance.get(`/transacao/${id}`);
const addTransaction = (data:ITransactionAdd) => instance.post(`/transacao`, data);
const editTransaction = (data:ITransactionAdd, id:number) => instance.put(`/transacao/${id}`);
const deleteTransaction = (id:number) => instance.delete(`/transacao/${id}`);
const getExtract = () => instance.get('/transacao/extrato');

export const UserServices = {
    loginUser,
    registerUser,
    detailUser,
    getTransaction,
    addTransaction,
    getTransactionId,
    editTransaction,
    deleteTransaction,
    getExtract
}

