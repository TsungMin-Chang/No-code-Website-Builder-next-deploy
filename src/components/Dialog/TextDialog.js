'use client'
import React from "react";
import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import useNodes from "@/hooks/useNodes";
import ColorPlatter from "../ColorPlatter";

const TextDialog = ({open, onClose, pointer, apiData, onRefresh}) => {
  const { createNode } = useNodes();
  const steps = ["", ""];
  const [activeStep, setActiveStep] = useState(0);
  const [fontSize, setFontSize] = useState(0);
  const [userText, setUserText] = useState("");
  const [color , setColor] = useState("black");
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    if (!fontSize) {
      alert("Please pick a font size!");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleSubmit = async () => {
    if (!userText) {
      alert("Please input your text!");
      return;
    }
    try {
      const data = {
        type: "text", 
        frontPointer: pointer,
        content: userText,
        fontSize,
        color
      };
      await createNode(apiData.token, apiData.pageId, data);
    } catch (error) {
      console.log("dialog", error);
      alert("Error: Failed to create a new Title!");
    } finally {
      onRefresh();
      handleClose();
    }
  }
  const handleClose = () => {
    setFontSize(0);
    setActiveStep(0);
    setUserText("");
    onClose();
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{fontWeight: 'bold' , fontSize: 22}}>Title</DialogTitle>
      <DialogContent className="flex flex-col items-center justify-center w-[550px] gap-y-4 py-4 px-4 m-2">
      {activeStep === 0 && (
        <>
          <button onClick={() => setFontSize(5)} className={`text-3xl h-12 w-11/12 shadow-md p-2 rounded-lg transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none " ${fontSize === 5 ? "bg-gray-400" : "bg-gray-200"}`}>
            No-Code Website Builder
          </button>
          <button onClick={() => setFontSize(4)} className={`text-2xl h-12 w-11/12 shadow-md p-2 rounded-lg transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none " ${fontSize === 4 ? "bg-gray-400" : "bg-gray-200"}`}>
            No-Code Website Builder
          </button>
          <button onClick={() => setFontSize(3)} className={`text-xl h-12 w-11/12 shadow-md p-2 rounded-lg transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none " ${fontSize === 3 ? "bg-gray-400" : "bg-gray-200"}`}>
            No-Code Website Builder
          </button>
          <button onClick={() => setFontSize(2)} className={`text-lg h-12 w-11/12 shadow-md p-2 rounded-lg transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none " ${fontSize === 2 ? "bg-gray-400" : "bg-gray-200"}`}>
            No-Code Website Builder
          </button>
          <button onClick={() => setFontSize(1)} className={`text-base h-12 w-11/12 shadow-md p-2 rounded-lg transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none " ${fontSize === 1 ? "bg-gray-400" : "bg-gray-200"}`}>
            No-Code Website Builder
          </button>
        </>
      )}
      {activeStep === steps.length - 1 && (
        <>
          <ClickAwayListener
            onClickAway={() => {}}
          >
            <Input
              autoFocus
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              className="w-11/12"
              placeholder="Enter Text"
            />
          </ClickAwayListener>
          <div className="grid grid-cols-11 gap-2 p-2 mt-2 h-56 overflow-y-auto">
            <ColorPlatter Color={color} setColor={setColor}/>
          </div>
        </>
      )}
      </DialogContent>
      <DialogActions>
        <button 
          className="ml-1 px-5 bg-red-300 rounded-md font-sm text-gray-800 hover:bg-red-600"
          onClick={handleClose}
        >
          Cancel
        </button>
        {activeStep > 0 && (
          <button 
            className="ml-1 px-5 bg-amber-300 rounded-md font-sm text-gray-800 hover:bg-amber-600"
            onClick={handleBack}
          >
            Back
          </button >
        )}
        <div className="grow" />
        {activeStep < steps.length - 1 && (
          <button 
            type="submit"
            className="px-5 bg-green-300 rounded-md font-sm text-gray-800 hover:bg-green-600"
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {activeStep === steps.length - 1 && (
          <button 
            type="submit"
            className="px-5 bg-green-300 rounded-md font-sm text-gray-800 hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </DialogActions>
    </Dialog>
  );
};
 
export default TextDialog;
