'use client'

import { IUserRegister } from "@/app/interfaces/IUsersServices";
import { UserServices } from "@/app/services/UserServices";
import { useState } from "react"

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { useRouter } from "next/navigation";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUpCard() {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const [form, setForm] = useState<IUserRegister>({
        nome: '',
        email: '',
        senha: ''
    });

    function handleOnChange(e:any) {
        const {value, name} = e.target;
        setForm({...form, [name]: value});
    };
    
    function handleClearForm() {
        setForm({
            ...form, nome: '', email: '', senha: ''
        })
    };

    async function handleSubmit(e:any) {
        e.preventDefault();

        if(!form.nome || !form.email || !form.senha ) {
            alert('preencha todos os campos!')
        }
        try {
            const res = await UserServices.registerUser(form);
            setOpen(true);
            handleClearForm();
        } catch (error:any) {
            console.log(error.response.data.mensagem)
        }
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 px-6 py-10 bg-white shadow-md" >
            <h2 className="text-violet-500 text-2xl font-bold mb-4"> Cadastre-se</h2>
            <div className="text-gray-700 w-72 flex flex-col gap-4">
                <div className="flex flex-col w-full">
                    <span>Nome</span>
                    <input
                    name="nome"
                    value={form.nome}
                    onChange={handleOnChange}
                    className="border-gray-500 border h-10 rounded-sm p-2" type="text" placeholder="" />
                </div>
                <div className="flex flex-col w-full">
                    <span>E-mail</span>
                    <input
                    name="email"
                    value={form.email}
                    onChange={handleOnChange}
                     className="border-gray-500 border h-10 rounded-sm p-2" type="email" placeholder="" />
                </div>
                <div className="flex flex-col w-full">
                    <span>Senha</span>
                    <input
                    name="senha"
                    value={form.senha}
                    onChange={handleOnChange}
                     className="border-gray-500 border h-10 rounded-sm p-2" type="password" placeholder="" />
                </div>  
            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <button
                type="submit"
                className="bg-violet-500 font-bold text-sm text-white w-full rounded-sm h-10 mt-4">Cadastrar</button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Conta criada com sucesso!
                </Alert>
                </Snackbar>
            </Stack>
            <a onClick={() => router.push('/')} className="cursor-pointer text-xs text-violet-600 font-bold">Já tem cadastro? Clique aqui!</a>
        </form>
    )
  }