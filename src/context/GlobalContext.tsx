'use client';
import { ICategorias, IConfig, IGlobalProviderProps } from "@/app/interfaces/IUsersServices";
import { useContext, createContext, ReactNode, useState } from "react";
import { useLocalStorage } from "react-use";

export const GlobalContext = createContext<IGlobalProviderProps | undefined>(undefined);

export default function GlobalProvider({ children }: { children: ReactNode }) {

    const [token, , ] = useLocalStorage<string>('token');
    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const config:IConfig = {
        headers: { 'Authorization': `Bearer ${token}`}
      }
 
    const values: IGlobalProviderProps = { categorias, setCategorias, config };
    return (
      <GlobalContext.Provider value={values}>
        {children}
      </GlobalContext.Provider>
    );
  }