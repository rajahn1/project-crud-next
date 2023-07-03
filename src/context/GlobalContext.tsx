'use client';
import { useContext, createContext, ReactNode, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }: { children: ReactNode }) {

    const [categorias, setCategorias] = useState();


    const values = { categorias, setCategorias }; 
    return (
      <GlobalContext.Provider value={values}>
        {children}
      </GlobalContext.Provider>
    );
  }