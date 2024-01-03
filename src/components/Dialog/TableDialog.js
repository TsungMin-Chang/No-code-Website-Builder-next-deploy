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
import Grid from '@mui/material/Grid';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import useNodes from "@/hooks/useNodes";

const TableDialog = ({open, onClose, pointer, apiData, onRefresh}) => {
  const { createNode } = useNodes();
  const steps = ["", ""];
  const [activeStep, setActiveStep] = useState(0);
  const [tableLayout, setTableLayout] = useState(0);
  const [rowNumber, setRowNumber] = useState(0);
  const [colNumber, setColNumber] = useState(0);
  const [tableContent, setTableContent] = useState({});
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    if (rowNumber === 0){
      alert("Please specify your row number!");
      return;
    }
    if (colNumber === 0){
      alert("Please specify your column number!");
      return;
    }
    if (tableLayout === 0){
      alert("Please choose your layout!");
      return;
    }
    const initialTableContent = Array.from({ length: rowNumber * colNumber }, (_, i) => ({[i + 1]: ""}));
    setTableContent(Object.assign({}, ...initialTableContent));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleSubmit = async () => {
    try {
      const data = {
        type: "table",
        frontPointer: pointer,
        rowNumber,
        colNumber,
        tableLayout,
        tableContent
      };
      await createNode(apiData.token, apiData.pageId, data);
    } catch (error) {
      alert("Error: Failed to create a new Table!");
    } finally {
      onRefresh();
      handleClose();
    }
  }
  const handleClose = () => {
    onClose();
    setActiveStep(0);
    setTableLayout(0);
    setRowNumber(0);
    setColNumber(0);
    // setClassNameString("");
    setTableContent({});
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{fontWeight: 'bold' , fontSize: 22}}>Table</DialogTitle>

      <DialogContent className="w-[600px]">
        {activeStep === 0 && (
          <>
            <div className="flex flex-row justify-between gap-2 mx-auto py-2 px-4">
              <FormControl className="flex-1" sx={{ m: 1 }}>
                <InputLabel id="row-number">Row Number</InputLabel>
                <Select
                  labelId="row-number"
                  label="row"
                  value={rowNumber}
                  onChange={(e) => setRowNumber(parseInt(e.target.value))}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                </Select>
              </FormControl>
              <FormControl className="flex-1" sx={{ m: 1 }}>
                <InputLabel id="col-number">Column Number</InputLabel>
                <Select
                  labelId="col-number"
                  label="col"
                  value={colNumber}
                  onChange={(e) => setColNumber(parseInt(e.target.value))}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                </Select>
              </FormControl> 
            </div>
            <div className="flex flex-col gap-4 mx-auto py-2 px-4">
              <button className={`rounded-lg transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none ${tableLayout === 1 ? "shadow-md bg-gray-300" : "bg-gray-100"}`} onClick={() => setTableLayout(1)}>
                <div className="grid grid-cols-3 grid-rows-3 gap-2 justify-items-stretch items-stretch m-5">
                  <div className="font-bold">Column 1</div>
                  <div className="font-bold">Column 2</div>
                  <div className="font-bold">Column 3</div>
                  <div>text</div>
                  <div>text</div>
                  <div>text</div>
                  <div>text</div>
                  <div>text</div>
                  <div>text</div>
                </div>
              </button>
              <button className={`rounded-lg bg-gray-100 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none ${tableLayout === 2 ? "shadow-md bg-gray-300" : "bg-gray-100"}`} onClick={() => setTableLayout(2)}>
                <div className="grid grid-cols-3 grid-rows-3 gap-2 justify-items-stretch items-stretch m-5">
                  <div className="font-bold">Row 1</div>
                  <div>text</div>
                  <div>text</div>
                  <div className="font-bold">Row 2</div>
                  <div>text</div>
                  <div>text</div>
                  <div className="font-bold">Row 3</div>
                  <div>text</div>
                  <div>text</div>
                </div>
              </button>
              <button className={`rounded-lg bg-gray-100 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none ${tableLayout === 3 ? "shadow-md bg-gray-300" : "bg-gray-100"}`} onClick={() => setTableLayout(3)}>
                <div className="grid grid-cols-3 grid-rows-3 gap-2 justify-items-stretch items-stretch m-5">
                  <div className="font-bold">R1 / C1</div>
                  <div className="font-bold">Column 2</div>
                  <div className="font-bold">Column 3</div>
                  <div className="font-bold">Row 2</div>
                  <div>text</div>
                  <div>text</div>
                  <div className="font-bold">Row 3</div>
                  <div>text</div>
                  <div>text</div>
                </div>
              </button> 
            </div>
          </>
        )}
        {/* Tailwind CSS */}
        {/* {activeStep === steps.length - 1  && (
          <div className="m-4">
            <div className={classNameString}>
              {Object.keys(tableContent).map((key, index) => (
                <div key={index} className="col-span-1 flex justify-center items-center">
                  <ClickAwayListener
                    onClickAway={() => {}}
                  >
                    <Input
                      key={index}
                      value={tableContent[key]}
                      onChange={(e) => setTableContent({...tableContent, [key]: e.target.value})}
                      placeholder={"Item " + key.toString()}
                    />
                  </ClickAwayListener>
                </div>
              ))}
            </div>
          </div>
        )} */}
        {/* Material UI */}
        {activeStep === steps.length - 1  && (
          <Grid container spacing={{ xs: 2 }} columns={{ xs: colNumber }} className="justify-items-center w-[500px]">
            {Object.keys(tableContent).map((ele, index) => (
              <Grid item xs={1} key={index}>
                <ClickAwayListener
                  onClickAway={() => {}}
                >
                  <Input
                    key={index}
                    value={tableContent[ele]}
                    onChange={(e) => setTableContent({...tableContent, [ele]: e.target.value})}
                    placeholder={"Item " + ele.toString()}
                  />
                </ClickAwayListener>
              </Grid>
            ))}
          </Grid>
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
 
export default TableDialog;
