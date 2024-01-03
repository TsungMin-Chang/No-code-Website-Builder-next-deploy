'use client'
import React from "react";
import { useState, useRef } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import useNodes from "@/hooks/useNodes";

const ImageDialog = ({open, onClose, pointer, apiData, onRefresh}) => {
  const { createNode } = useNodes();
  const steps = ["", ""];
  const [activeStep, setActiveStep] = useState(0);
  const [imageLayout, setImageLayout] = useState(0);
  const [imageString, setImageString] = useState({imageName: "", image: ""});
  const textfieldCaption = useRef(null);
  const textfieldText = useRef(null);
  const dots = '.'.repeat(15);
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleNext = () => {
    if (imageLayout === 0) {
      alert("Please choose your layout!");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleImage = async (e) => {
    // get file name
    const fileName = e.currentTarget.value.match(/^.*\\(.*?)\..*?$/);
    if (!fileName) return;
    // check file extension
    const validImageType = ['jpg', 'jpeg', 'png'];
    const fileExtension = fileName[0].split('.');
    if ( !validImageType.includes(fileExtension[fileExtension.length - 1]) ) {
      alert("Only jpg, jpeg, png files are accepted!");
      handleClose();
      return;
    }
    // get file in base64 String
    const fakeFile = e.currentTarget.files;
    if (!fakeFile) return;
    const file = fakeFile[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      // save data
      setImageString({imageName: fileName[1], image: base64String});
    };
    // Read the file as a data URL, which will be base64-encoded
    reader.readAsDataURL(file);
  }

  const handleSubmit = async () => {
    if (!imageString.image || !imageString.imageName) {
      alert("Please upload an image!");
      return;
    }
    const text = textfieldText.current?.value ?? "" ;
    const caption = textfieldCaption.current?.value ?? "" ;
    if (imageLayout !== 3 && !text) {
      alert("Please input your text!");
      return;     
    }
    try {
      const rimg = imageString.image.match(/^data:image\/(.*?);base64,(.*)$/);
      const data = {
        type: "image",
        frontPointer: pointer,
        imageLayout,
        imageFileName: imageString.imageName,
        imageFileType: rimg[1],
        imageBase64String: rimg[2],
        text,
        caption,
      };
      await createNode(apiData.token, apiData.pageId, data);
    } catch (error) {
      alert("Error: Failed to create a new Image!");
    } finally {
      onRefresh();
      handleClose();
    }
  }
  const handleClose = () => {
    setActiveStep(0);
    setImageLayout(0);
    setImageString({imageName: "", image: ""});
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{fontWeight: 'bold' , fontSize: 22}}>Image</DialogTitle>
      <DialogContent className="w-[550px]">
        {activeStep === 0 && (
          <div className="flex flex-col gap-4 mx-auto p-4">
            <button className={`rounded-lg bg-gray-100 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none ${imageLayout === 1 ? "shadow-md bg-gray-300" : "bg-gray-100"}`} onClick={() => setImageLayout(1)}>
              <div className="grid grid-rows-4 grid-flow-col gap-1 m-5">
                <div className="flex items-center justify-center row-span-3 bg-purple-300 rounded-md">
                  Image
                </div>
                <div className="flex items-center justify-center row-span-1 bg-purple-200 rounded-md">
                  Caption
                </div>
                <div className="flex items-center justify-center row-span-4 col-span-3 bg-indigo-200 rounded-md">
                  {"Text " + dots}
                </div>
              </div>
            </button>
            <button className={`rounded-lg bg-gray-100 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none ${imageLayout === 2 ? "shadow-md bg-gray-300" : "bg-gray-100"}`} onClick={() => setImageLayout(2)}>
              <div className="grid grid-rows-4 grid-flow-col gap-1 m-5">
                <div className="flex items-center justify-center row-span-4 col-span-3 bg-indigo-200 rounded-md">
                  {"Text " + dots}
                </div>
                <div className="flex items-center justify-center row-span-3 bg-purple-300 rounded-md">
                  Image
                </div>
                <div className="flex items-center justify-center row-span-1 bg-purple-200 rounded-md">
                  Caption
                </div>
              </div>
            </button>
            <button className={`rounded-lg bg-gray-100 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none ${imageLayout === 3 ? "shadow-md bg-gray-300" : "bg-gray-100"}`} onClick={() => setImageLayout(3)}>
              <div className="grid grid-rows-4 grid-flow-col gap-1 m-5">
                <div className="flex items-center justify-center row-span-3 bg-purple-300 rounded-md">
                  Image
                </div>
                <div className="flex items-center justify-center row-span-1 bg-purple-200 rounded-md">
                  Caption
                </div>
              </div>
            </button> 
          </div>
        )}
        {activeStep === steps.length - 1 && (
          <div className="flex flex-col gap-y-4 mx-auto p-4">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={handleImage}
              />
            </Form.Group>
            <TextField
              inputRef={textfieldCaption}     
              label="Enter Caption"
              multiline
              rows={2}
            />
            {(imageLayout === 1 || imageLayout === 2) && (
              <TextField
                inputRef={textfieldText}
                label="Enter Text"
                multiline
                rows={7}
              />
            )}
          </div>
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
 
export default ImageDialog;
