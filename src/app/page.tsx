'use client';
import Logo from "@/components/Logo";
import LoginCard from "@/components/LoginCard";
import { useRouter } from "next/navigation";
export default function Login(){
  const router = useRouter();
  
    return(
      <div className="bg-[url('/background.png')] flex items-center justify-center gap-2 bg-center bg-no-repeat bg-cover w-screen h-screen text-xl">
        <div>
          <Logo />
        </div>
          <div className="w-1/2 h-5/6 flex flex-col gap-4 justify-center">
              <h2 className="w-5/6 text-bold text-white text-4xl"> Controle suas <a className="text-purple-800">finanças</a>, <br/> sem planilha chata. </h2>
              <span className="w-5/6 font-rubik font-medium text-white text-xl"> Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</span>
              <button onClick={() => router.push('/signup')} className="bg-violet-500 text-white font-bold text-sm rounded-md w-3/6 h-12"> Cadastre-se</button>
          </div>
          <LoginCard />
      </div>
    )
}