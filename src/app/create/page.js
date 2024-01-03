'use client';
import { useState , useRef, useEffect } from 'react';
import { MdOutlinePostAdd } from "react-icons/md";
import BackgroundDialog from '@/components/Dialog/BackgroundDialog';
import usePages from '@/hooks/usePages';
import {getCookies} from 'cookies-next';
import {useRouter} from "next/navigation";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import '../globals.css';

export default function CreatePage() {
    const InputRef = useRef(null);
    const DescriptionRef = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const [cardChoice , setCardChoice] = useState(-2);
    const { createPage } = usePages();
    const token = getCookies("jwt-token");
    const router = useRouter();
    const [Color1 , setColor1] = useState("white");
    const [Color2 , setColor2] = useState("white");

    const [alertWord , setAlertWord]  = useState('');
    const [openAlert, setAlertOpen] = useState(false);

    if(!token){
        router.push('/');
    }

    
	const handleAlertClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setAlertOpen(false);
	};

    const handleSubmit = async () => {
        const projectName = InputRef.current?.value ?? "";
        const description = DescriptionRef.current?.value ?? "";

        if(!projectName){
            setAlertWord('Project name is required!');
            setAlertOpen(true);
            return;
        }
        

        /* */
        const css_type = 1 ;
        const bg_image = cardChoice;
        var color1 = Color1; 
        var color2 = Color2;
        /* */
        try{
            if(bg_image != '-1'){
                color1 = ''; 
                color2 = '';
            }

            const page_id = await createPage(token['jwt-token'] ,projectName ,description, css_type , bg_image ,color1 , color2);
            router.push(`/pages/${page_id}`);
            
        }catch(error){
            console.log(error);
        }
    }
        
    return(
        <> 
        <p className='py-2 text-md font-bold'>Project info: </p>
        <input
            className="w-3/5 px-5 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-400 text-md focus:outline-none focus:border-gray-400"
            placeholder="Project Name..." 
            ref = {InputRef} required/>
        <input
            className="w-full mt-3 px-5 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-400 text-md focus:outline-none focus:border-gray-400"
            placeholder="Project Description(optional)..." 
            ref = {DescriptionRef}/>
        
        {/*<!-- card 1 -->*/}
        <div className='flex justify-between mt-3'>
            <p className='py-2 text-md font-bold'>Choose a background: </p> 
            <button className='px-2 mr-3 rounded-lg font-semibold text-md bg-violet-300 text-gray-800 hover:bg-violet-400'
                onClick={() => setCardChoice('-2')}
            >Reselect/none background</button>
        </div>

        <div className='flex flex-wrap justify-center gap-4'>
            <div className={`p-1 m-1 max-w-sm w-1/3 h-80 ${cardChoice=='0' && 'outline outline-gray-400'}`} 
                onClick={() => setCardChoice('0')}  id = 'container'>
                <img className='rounded-lg' src="https://thumb.photo-ac.com/56/564d7708097fcf9e3afc35d896da492d_t.jpeg" alt=""/>
            </div>
            <div className={`p-1 m-1 max-w-sm w-1/3 h-80 ${cardChoice=='1' && 'outline outline-gray-400'}`} 
                onClick={() => setCardChoice('1')}  id = 'container'>
                <img className='rounded-lg' src="https://pic.616pic.com/bg_w1180/00/03/91/pIvv6oP7dn.jpg" alt=""/>
            </div>
            <div className={`p-1 m-1 max-w-sm w-1/3 h-80 ${cardChoice=='2' && 'outline outline-gray-400'}`} 
                onClick={() => setCardChoice('2')}  id = 'container'>
                <img className='rounded-lg' src="https://pic.616pic.com/bg_w1180/00/12/30/RfTc2srish.jpg" alt=""/>
            </div>
            <div className={`p-1 m-1 max-w-sm w-1/3 h-80 ${cardChoice=='3' && 'outline outline-gray-400'}`} 
                onClick={() => setCardChoice('3')}  id = 'container'>
                <img className='rounded-lg' src="https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-geometric-low-polygon-blue-purple-simple-romantic-gradient-background-material-polygonblue-image_66649.jpg" alt=""/>
            </div>
            <div className={`p-1 m-1 max-w-sm w-1/3 h-80 ${cardChoice=='4' && 'outline outline-gray-400'}`} 
                onClick={() => setCardChoice('4')}  id = 'container'>
                <img className='rounded-lg' src="https://img-qn.51miz.com/preview/element/00/01/26/82/E-1268285-BC2C6DEA.jpg!/quality/90/unsharp/true/compress/true/fw/450" alt=""/>
            </div>
            <div className={`p-1 m-1 max-w-sm w-1/3 h-80 ${cardChoice=='5' && 'outline outline-gray-400'}`} 
                onClick={() => setCardChoice('5')}  id = 'container'>
                <img className='rounded-lg' src="https://thumb.photo-ac.com/39/39ddfcac8ad4036000aed1c404d9457b_t.jpeg" alt="ii"/>
            </div>
            <div className={`p-1 m-1 max-w-sm w-1/3 h-80 ${cardChoice=='6' && 'outline outline-gray-400'}`} 
                onClick={() => setCardChoice('6')}  id = 'container'>
                <img className='rounded-lg' src="https://png.pngtree.com/background/20210714/original/pngtree-kraft-paper-picture-image_1218869.jpg" alt=""/>
            </div>
            <div className={`p-1 m-1 max-w-sm w-1/3 h-80 ${cardChoice=='7' && 'outline outline-gray-400'}`} 
                onClick={() => setCardChoice('7')}  id = 'container'>
                <img className='rounded-lg' src="https://s3.amazonaws.com/uploads.webconnex.com/1869/lazyb-bg-texture-2000px.jpg?fbclid=IwAR0igawg6w3gziHkn2Bndihh8pT3si6LMPbEwM4Bi9RCmJMvDnbh0LToiNw" alt=""/>
            </div>

            {/*<!-- create -->*/}
            <div className={`p-1 m-1 max-w-sm w-1/3 h-80 ${cardChoice=='-1' && 'outline outline-gray-400'}`}>
                <div className="flex rounded-lg h-full bg-purple-950 p-8 flex-col hover:bg-purple-800"
                    onClick={()=>setOpen(true)}>
                    <div className="flex items-center mb-3">
                        <div
                            className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                            <MdOutlinePostAdd size={30}/>
                        </div>
                        <h2 className="text-white text-xl font-bold">customize your own background</h2>
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                        <p className="leading-relaxed text-base text-white">
                            choose two color and blend them!
                        </p>
                    </div>
                </div>
            </div>
            </div>
        
        <div className='text-right mr-4'>
        <button className='px-10 py-2 ml-3 rounded-lg font-md text-xl bg-green-300 text-gray-800 hover:bg-green-600'
            onClick={handleSubmit}>
            Submit
        </button>
        <button className='px-6 py-2 ml-3 rounded-lg font-md text-xl bg-red-300 font-sm text-gray-800 hover:bg-red-600'
            onClick={() => router.push("/pages")}>
            back to gallery
        </button>
        </div>
        <BackgroundDialog 
            open={isOpen} onClose={setOpen} 
            color1={Color1} setcolor1={setColor1}
            color2={Color2} setcolor2={setColor2}
            cardChoice = {cardChoice} setcardChoice={setCardChoice}
        />
        <Snackbar open={openAlert} autoHideDuration={3500} onClose={handleAlertClose}>
			<Alert severity="error" onClose={handleAlertClose}>
				<AlertTitle>Warning</AlertTitle>
				<strong>{alertWord}</strong>
			</Alert>
		</Snackbar>
        </>
    );
}

