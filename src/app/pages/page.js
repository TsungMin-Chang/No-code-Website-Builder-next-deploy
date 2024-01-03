'use client';
import { useState, useEffect } from 'react';
import { MdOutlinePostAdd } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import {getCookies} from 'cookies-next';
import {useRouter} from "next/navigation";
import usePages from "@/hooks/usePages";
import useUsers from "@/hooks/useUser";
import TitleBar from '@/components/Titlebar';
import IconButton from "@mui/material/IconButton";
import { TiDelete } from "react-icons/ti";

export default function HomePage() {
    const [pages, setPages] = useState([]);
    const { getGallery, deletePage } = usePages();
    const { getUsername } = useUsers();
    const router = useRouter();
    const token = getCookies("jwt-token");
    const [username , setUsername] = useState('');

    if(!token){
        router.push('/');
    }

	useEffect(() => {
		const fetchPages = async () => {
			try{
				const response = await getGallery(token['jwt-token']);				
                const data = response.map(page => ({
                    id : page.page_id,
                    ProjectName : page.name,
                    description: page.description,
                    css_type : page.css_type,
                    bg_image: page.background_image,
                    color1: page.background_color1,
                    color2: page.background_color2,
                }));
                setPages(data);
                
			}catch(error){
				console.log(error);
			}
		}
        const fetchUser = async () => {
            const user  = await getUsername(token['jwt-token']);
            setUsername(user);
        }
        fetchUser();
		fetchPages();
	}, []);  

    const handleDelete = async (page_id) => {
        try{
            await deletePage(token['jwt-token'] , page_id);
            setPages((page) => page.filter((page) => page.id !== page_id));
        }catch(error){
            console.log(error);
        }
        return;
    }

    
	return(
		<>
        <TitleBar/>
        <div className="flex flex-wrap justify-left mt-5 mx-10">
            {pages.map(page => (
                <>        
                <div className="relative p-4 max-w-sm w-96" key={page.id}>
                    <div className="absolute top-0 right-0 z-3">
                        <IconButton 
                            onClick={() => handleDelete(page.id)}
                        >
                            <TiDelete size={35} color='red'/>
                        </IconButton>
                    </div>
                     
                     <div 
                        className="flex rounded-lg h-full bg-purple-200 p-8 flex-col hover:bg-purple-400 z-0"
                        onClick={() => router.push(`/pages/${page.id}`)}
                     >
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-purple-800 flex-shrink-0">
                                <AiFillEdit size={30}/>
                            </div>
                            <h2 className="text-purple-800 text-xl font-bold">{page.ProjectName}</h2>
                        </div>
                        <div className="flex flex-col text-left flex-grow">
                            <p className="leading-relaxed text-base text-black">
                            {page.description}
                            </p>
                        </div>
                    </div>
                </div>
                </>
            ))}
        
            {/*<!-- create -->*/}
            <div className="p-4 max-w-sm w-96" 
                onClick={() => router.push("/create")}>
                <div className="flex rounded-lg h-full bg-purple-950 p-8 flex-col hover:bg-purple-800">
                    <div className="flex items-center mb-3">
                        <div
                            className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                            <MdOutlinePostAdd size={30}/>
                        </div>
                        <h2 className="text-white text-xl font-bold">Create New Project</h2>
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                        <p className="leading-relaxed text-base text-white">
                            Start building websites without writing a single line of code!
                        </p>
                    </div>
                </div>
            </div>
        </div>
		</>
	);
}

