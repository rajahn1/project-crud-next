import { IUserLogin, IUserRegister } from '../interfaces/IUsersServices';
import { instance } from '../api/Api';

const loginUser = (data:IUserLogin) => instance.post('/login', data);
const registerUser = (data:IUserRegister) => instance.post('/usuario', data);
const detailUser = () => instance.get('/usuario');
const updateUser = () => instance.put('/usuario')
const getCategoria = () => instance.get('/categoria');
const getTransaction = () => instance.get('/transacao');


export const UserServices = {
    loginUser,
    registerUser,
    detailUser
}

