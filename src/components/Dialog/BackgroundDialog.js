'use client';
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ColorPlatter from "../ColorPlatter";
import { twj } from "tw-to-css";

export default function BackgroundDialog({ open, onClose, color1 , setcolor1 , color2, setcolor2 , cardChoice , setcardChoice}) {

    const [selection , setSelection] = useState('-1');
    const [gradient , setGradient] = useState({});

    useEffect(() => {
        const color1StyleCSS = twj({ ["text-" + color1]: true }).color;
        const color2StyleCSS = twj({ ["text-" + color2]: true }).color;
        setGradient({
            background_color1: color1StyleCSS,
            background_color2: color2StyleCSS,
        });
    }, [color1, color2 , selection]);

	const handleSubmit = async () => {
        setcardChoice('-1');
        setSelection(-1);
        onClose();
        return;
	};

    const handleCancel = () => {
        setcardChoice('-2');
		setcolor1('white');
        setcolor2('white');
        setSelection(-1);
		onClose();
        return;
    }

  
	return (
		<Dialog open={open} onClose={onClose} fullWidth={true} maxWidth= "sm" >
		<DialogTitle sx={{fontWeight: 'bold' , fontSize: 22}}>Choose two color to blend (click the rectangle)</DialogTitle>
		<DialogContent>
            <div className="flex flex-row space-x-2">
                
                <div className="w-1/2">
                    <label className="text-medium font-medium text-gray-900">Color 1</label>
                    <button className={`w-full h-10 rounded-md bg-${color1} outline outline-gray-300 hover:outline-gray-500`} 
                        onClick={()=> {setSelection('color1');}}/>
                </div>
                <div className="w-1/2">
                    <label className="text-medium font-medium text-gray-900">Color 2</label>
                    <button className={`w-full h-10 rounded-md bg-${color2} outline outline-gray-300 hover:outline-gray-500`} 
                        onClick={()=> {setSelection('color2');}}/>
                </div>
            </div>

            <div className="w-full">
                <label className="text-medium font-medium text-gray-900">Result</label>
                <div
                    className="w-full h-32 rounded-md"
                    style={{"background": `linear-gradient(to bottom, ${gradient.background_color1}, ${gradient.background_color2}`}}
                />
            </div>
            
            {selection=='color1' && 
                <>
                <label className="text-medium font-medium text-gray-900">Select Color</label>
                <div className="grid grid-cols-11 gap-2 p-2 mt-2 h-24 overflow-y-auto">
                    <ColorPlatter Color={color1} setColor={setcolor1}/>
                </div>
                </>
            }
            {selection=='color2' && 
                <>
                <label className="text-medium font-medium text-gray-900">Select Color</label>
                <div className="grid grid-cols-11 gap-2 p-2 mt-2 h-24 overflow-y-auto">
                    <ColorPlatter Color={color2} setColor={setcolor2}/>
                </div>
                </>
            }
		</DialogContent>
		<DialogActions>
            <button 
                type="submit"
                className="px-5 bg-green-300 rounded-md font-sm text-gray-800 hover:bg-green-600"
                onClick={handleSubmit}
            >
            Submit
            </button>
            <button 
                className="ml-1 px-5 bg-red-300 rounded-md font-sm text-gray-800 hover:bg-red-600"
                onClick={handleCancel}
            >
            Cancel
            </button>
		</DialogActions>
		</Dialog>
	);
}
