'use client'
import React from "react";
import { useState, useRef } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import useNodes from "@/hooks/useNodes";
import ColorPlatter from "../ColorPlatter";

const ParagraphDialog = ({open, onClose, pointer, apiData, onRefresh}) => {
  const { createNode } = useNodes();
  const textfieldParagraph = useRef(null);
  const [color , setColor] = useState("black");
  const handleSubmit = async () => {
    const content = textfieldParagraph.current?.value ?? "" ;
    if (!content) {
      alert("Please input your paragraph!");
      return;
    }
    try {
      const data = {
        type: "paragraph", 
        frontPointer: pointer,
        content,
        color
      };
      await createNode(apiData.token, apiData.pageId, data);
    } catch (error) {
      alert("Error: Failed to create a new Paragraph!");
    } finally {
      onRefresh();
      handleClose();
    }
  }
  const handleClose = () => {
    onClose();
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{fontWeight: 'bold' , fontSize: 22}}>Paragraph</DialogTitle>
      <DialogContent className="w-[550px]">
        <div className="flex p-2">
          <TextField
            className="grow p-2"
            autoFocus
            inputRef={textfieldParagraph}
            label="Enter Paragraph"
            multiline
            rows={9}
          />
        </div>
        <div className="grid grid-cols-11 gap-2 p-2 mt-2 h-56 overflow-y-auto">
          <ColorPlatter Color={color} setColor={setColor}/>
        </div>
      </DialogContent>
      <DialogActions>
        <button 
            className="ml-1 px-5 bg-red-300 rounded-md font-sm text-gray-800 hover:bg-red-600"
            onClick={handleClose}
        >
        Cancel
        </button>
        <div className="grow" />
        <button 
            type="submit"
            className="px-5 bg-green-300 rounded-md font-sm text-gray-800 hover:bg-green-600"
            onClick={handleSubmit}
        >
        Submit
        </button>
		</DialogActions>
    </Dialog>
  );
};
 
export default ParagraphDialog;
