'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";

import TableHome from "@/components/TableHome";

import ModalAddRegister from "@/components/ModalAddRegister";
import ResumeCard from "@/components/ResumeCard";

const buttonStyle = {
    borderRadius: '1rem',
    textTransform: 'none'

}

export default function About() {
    const [token, setToken, removeToken] = useLocalStorage('token');
    const [user, setUser, removeUser] = useLocalStorage('user');
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!token) {
            router.push('/');
        }
    }, [mounted]);

    if (!mounted) return null;
    if (!token) return null;
    
    function handleLogout() {
        removeToken();
        removeUser();
        router.push('/');
    }
    
    return(
        <div className="w-screen h-screen">
            <header className="flex items-center justify-between w-full px-12 md:h-1/6 h-32 bg-gradient-header">
                <img src="/logo-dindin.png" alt="logo-dindin" className="ml-12 w-32" />
                <div className="flex items-center gap-2">
                    <img src="/account-user-icon.png" alt="avatar" />
                    {/* <span className="text-white font-bold mr-2"> { user && user.nome}</span> */}
                    <img onClick={() => handleLogout()} src="/logout-arrow.png" alt="loggout" className="cursor-pointer" />
                </div>
            </header>
            {/* <Stack className="px-12 py-4" direction="row" spacing={2}>
                    <Button sx={buttonStyle} variant="outlined" startIcon={<FilterAltIcon />}>
                        Filtrar
                    </Button>
                </Stack> */}
            <div className="mt-8 px-12 py-2 flex flex-col items-center md:flex-row md:items-start justify-center gap-8 rounded-t-2xl">
                <TableHome/>
                <div className="flex flex-col gap-4 justify-center">
                    <ResumeCard/>
                    <ModalAddRegister/>
                </div>
            </div>
        </div>
    )
}