'use client';
import { useContext, createContext, ReactNode, useState } from "react";
import { useLocalStorage } from "react-use";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }: { children: ReactNode }) {

    const [token, , ] = useLocalStorage('token');
    const [categorias, setCategorias] = useState();
    if (!token) return;
    
    const config = {
      headers: { 'Authorization': `Bearer ${token}`}
    }
    const values = { categorias, setCategorias, config }; 
    return (
      <GlobalContext.Provider value={values}>
        {children}
      </GlobalContext.Provider>
    );
  }