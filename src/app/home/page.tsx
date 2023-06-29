'use client'

import useLocalStorage from "react-use/lib/useLocalStorage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import TableHome from "@/components/TableHome";
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import ResumeCard from "@/components/ResumeCard";
import ModalAddRegister from "@/components/ModalAddRegister";

const buttonStyle = {
    borderRadius: '1rem',
    textTransform: 'none'

}

export default function About() {
    const [token, setToken, removeToken] = useLocalStorage('token');
    const [user, setUser, removeUser] = useLocalStorage('user');
    const router = useRouter();

    
    function handleLogout() {
        removeToken();
        removeUser();
        router.push('/');
    }

    useEffect(() => {
        if (!user){
            router.push('/');
        }
    }, [])

    return(
        <div className="w-screen h-screen">
            <header className="flex items-center justify-between w-full px-12 h-1/6 bg-gradient-header">
                <img src="/logo-dindin.png" alt="logo-dindin" className="ml-12 w-32" />
                <div className="flex items-center gap-2">
                    <img src="/account-user-icon.png" alt="avatar" />
                    <span className="text-white font-bold mr-2"> { user && user.nome}</span>
                    <img onClick={() => handleLogout()} src="/logout-arrow.png" alt="loggout" className="cursor-pointer" />
                </div>
            </header>
            <Stack className="px-12 py-4" direction="row" spacing={2}>
                    <Button sx={buttonStyle} variant="outlined" startIcon={<FilterAltIcon />}>
                        Filtrar
                    </Button>
                </Stack>
            <div className="px-12 py-2 flex justify-center gap-8 rounded-t-2xl">
                <TableHome/>
                <div className="flex flex-col gap-4 justify-center">
                    <ResumeCard/>
                    <ModalAddRegister/>
                </div>
            </div>
        </div>
    )
}