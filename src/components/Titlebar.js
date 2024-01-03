'use client';
import { useState , useEffect } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import useUsers from "@/hooks/useUser";
import {getCookies} from 'cookies-next';

const TitleBar = ( ) => {
    const router = useRouter();
    const token = getCookies("jwt-token");
    const { getUsername } = useUsers();
    const [username , setUsername] = useState('XXX');

    useEffect(() => {
        const fetchUser = async () => {
            const user  = await getUsername(token['jwt-token']);
            setUsername(user);
        }
        
        fetchUser();
        
    })
    return (
        <>
        <nav id="titlebar" className="bg-violet-300 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <button className="self-center text-2xl font-bold whitespace-nowrap text-blue-800"
                    onClick={()=>router.push("/pages")}>
                    <HiOutlineComputerDesktop className="inline-block mr-3 mb-0.5" size={29}/>
                    No-code Website Builder
                </button>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <span className="font-md">Welcome~</span>
                    <span className="font-bold">{username}&nbsp;&nbsp;&nbsp;</span>
                    <button type="button" 
                    className="px-1 py-1 text-sm bg-violet-700 hover:bg-violet-500 rounded-full mx-3"
                    onClick={() => router.push("/")}>
                        <TbLogout2 size={20} className="text-white"/>
                    </button>
                </div>
            </div>
        </nav>
        </>
    );
};
 
export default TitleBar;
