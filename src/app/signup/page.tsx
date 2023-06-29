import { useState } from 'react'
import '../../components/SignUpCard'
import SignUpCard from '../../components/SignUpCard';
import Logo from '@/components/Logo';

export default function SignUp(){
    return(
        <div className="
        bg-[url('/background.png')] bg-cover bg-no-repeat bg-center
        w-screen h-screen
        flex items-center justify-center flex-col static">
            <div className='w-full'>
                <Logo/>
            </div>
            <SignUpCard/>
        </div>
    )
}