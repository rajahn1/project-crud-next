import { ITransactionAdd, IUserLogin, IUserRegister } from '../interfaces/IUsersServices';
import { instance } from '../api/Api';
import { config } from 'process';

const loginUser = (data:IUserLogin) => instance.post('/login', data);
const registerUser = (data:IUserRegister) => instance.post('/usuario', data);
const detailUser = () => instance.get('/usuario');
const updateUser = () => instance.put('/usuario')
const getCategoria = () => instance.get('/categoria');
const getTransaction = () => instance.get('/transacao', config);
const getTransactionId = (id:number) => instance.get(`/transacao/${id}`);
const addTransaction = (data:ITransactionAdd) => instance.post(`/transacao`, data);

export const UserServices = {
    loginUser,
    registerUser,
    detailUser,
    getTransaction,
    addTransaction,
    getTransactionId,
}

