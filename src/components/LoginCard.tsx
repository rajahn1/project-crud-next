'use client'
import { IUserLogin } from "@/app/interfaces/IUsersServices";
import { UserServices } from "@/app/services/UserServices";
import { useState, useEffect } from "react"
import { useLocalStorage } from "react-use";
import { useRouter } from "next/navigation";

export default function LoginCard(){
    const router = useRouter();

    const [token, setToken, removeToken] = useLocalStorage('token');
    const [user, setUser, removeUser] = useLocalStorage('user');
    const [form, setForm] = useState<IUserLogin>({
        email: '',
        senha: '',
    });

    function handleOnChange(e:any) {
        const {name, value} = e.target;

        setForm({...form, [name]: value});
    }

    async function handleLogin(e:any) {
        e.preventDefault();

        if (!form.email ){
            alert('preencha o campo de email!')
        }
        if (!form.senha ){
            alert('preencha o campo de senha!')
        }
        try {
            const {data} = await UserServices.loginUser(form);
            setToken(data.token);
            setUser({nome: data.usuario.nome, id: data.usuario.id});
            router.push('/home');
        } catch (error) {
            console.log(error)
        }
    }

    return(
    <form
    onSubmit={handleLogin} 
    className="bg-white flex flex-col px-8 py-10 gap-6 items-center h-96 w-4/12 shadow-sm">
        <h2 className="text-violet-500 text-2xl font-semibold"> Login</h2>
        <div className="w-full flex flex-col gap-4 text-base text-gray-700 ">
            <div className="flex flex-col">
                <span>E-mail</span>
                <input
                className="border-gray-500 border h-12 rounded-sm p-2"
                name="email"
                value={form.email}
                onChange={handleOnChange}
                type="text" />
            </div>
            <div className="flex flex-col">
                <span>Password</span>
                <input
                className="border-gray-500 border h-12 rounded-sm p-2"
                name="senha" 
                value={form.senha}
                onChange={handleOnChange}
                type="password"/>
            </div>
        </div>
            <button type="submit" className="bg-violet-500 font-bold text-sm text-white w-full rounded-sm h-12 mt-4"> Entrar</button>
    </form>
    )
}