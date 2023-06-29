import Image from "next/image";

export default function Logo(){
    return(
        <Image
        width={140}
        height={100}
        src='/logo-dindin.png'
        alt='logo'
        className="absolute top-4 ml-12"
        />
    )
  
}