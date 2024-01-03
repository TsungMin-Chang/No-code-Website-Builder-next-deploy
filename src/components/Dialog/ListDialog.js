'use client'
import React from "react";
import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { TiMediaRecord } from "react-icons/ti";
import { TiMediaStop } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";
import { TiPin } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import IconButton from "@mui/material/IconButton";
import { TiDelete } from "react-icons/ti";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import useNodes from "@/hooks/useNodes";

const ListDialog = ({open, onClose, pointer, apiData, onRefresh}) => {
  const { createNode } = useNodes();
  const steps = ["", ""];
  const [activeStep, setActiveStep] = useState(0);
  const [listType, setListType] = useState("");
  const [icon, setIcon] = useState(0);
  const [content, setContent] = useState({1: ""});
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    if (!listType) {
      alert("Please select your list type!");
      return;
    }
    if (listType === "unordered" && icon === 0) {
      alert("Please select an icon for your unordered list!");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleSubmit = async () => {
    try {
      const data = {
        type: "list",
        frontPointer: pointer,
        listType,
        icon,
        content
      };
      await createNode(apiData.token, apiData.pageId, data);
    } catch (error) {
      alert("Error: Failed to create a new List!");
    } finally {
      onRefresh();
      handleClose();
    }
  };
  const handleClose = () => {
    onClose();
    setActiveStep(0);
    setListType("");
    setIcon(0);
    setContent({1: ""});
  };
  const handleDeleteItem = (deleteItemKey) => {
    if (Object.keys(content).length === 1) {
      setContent({1: ""});
    } else {
      delete content[deleteItemKey];
      setContent({...content});
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{fontWeight: 'bold' , fontSize: 22}}>List</DialogTitle>
      {activeStep === 0 && (
        <DialogContent className="w-[550px]">
          <div className="flex flex-col gap-2 mx-auto p-4">
            <FormControl className="flex-1" sx={{ m: 1 }}>
              <InputLabel id="list-type">Type</InputLabel>
              <Select
                labelId="list-type"
                label="list-type"
                value={listType}
                onChange={(e) => setListType(e.target.value)}
              >
                <MenuItem value={"ordered"}>Ordered</MenuItem>
                <MenuItem value={"unordered"}>Unordered</MenuItem>
              </Select>
            </FormControl>
            {listType === "unordered" && (
              <FormControl className="flex-1" sx={{ m: 1 }}>
                <InputLabel id="icon">Icon</InputLabel>
                <Select
                  labelId="icon"
                  label="icon"
                  value={icon}
                  onChange={(e) => setIcon(parseInt(e.target.value))}
                >
                  <MenuItem value={1}><TiMediaRecord/></MenuItem>
                  <MenuItem value={2}><TiMediaStop/></MenuItem>
                  <MenuItem value={3}><TiTick/></MenuItem>
                  <MenuItem value={4}><TiPin/></MenuItem>
                  <MenuItem value={5}><TiHeartFullOutline/></MenuItem>
                </Select>
              </FormControl>
            )}
          </div>
        </DialogContent>
      )}
      {activeStep === steps.length - 1 && (
        <DialogContent className="flex flex-col items-center">
          {Object.keys(content).map((key, index) => (
            <div 
              key={key}
              className="flex flex-col items-center justify-center w-[550px] gap-y-4 p-3 m-1"
              style={{position: 'relative'}}
            >
              <div key={index} style={{float: 'right', position: 'absolute', right: '0px', top: '0px'}}>
                <IconButton
                  onClick={() => handleDeleteItem(key)}
                  className="z-3"
                >
                  <TiDelete size={30} color='red'/>
                </IconButton>
              </div>
              <ClickAwayListener
                key={key}
                onClickAway={() => {}}
              >
                <Input
                  key={key}
                  value={content[key]}
                  onChange={(e) => setContent({...content, [key]: e.target.value})}
                  className="w-11/12"
                  placeholder="Enter Element"
                />
              </ClickAwayListener>
            </div> 
          ))}
          <button 
            className="tracking-wide font-semibold bg-violet-600 text-gray-100 w-11/12 py-3 rounded-lg hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            onClick={() => setContent({...content, [Object.keys(content).pop() + 1]: ""})}
          >
          + List Item
          </button >
        </DialogContent>
      )}
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
 
export default ListDialog;
