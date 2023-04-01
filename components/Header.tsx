import Search from "./Search"
import Image from 'next/image'
export default function Header ({panTo}: {panTo: any}) {
    return (
        <>
        
        <Image
    
    
     height="76px"
     width="306px"
      src={"/logo.svg"}
      alt="logo"
   
    />

     
      <Search panTo={panTo} />
      </>
    )
}