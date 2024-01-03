'use client'
import React from "react";
// import Grid from '@mui/material/Grid';
import { twj } from "tw-to-css";

const TableCard = ({eleId, colNumber, rowNumber, tableLayout, tableContent}) => {
  const tableCSS = twj(`grid grid-cols-${colNumber} grid-flow-row gap-2`);
  return (
    <div id={eleId} className="p-5">
      {tableLayout === 1 && (
        // // Material UI
        // <Grid container spacing={{ xs: 2 }} columns={{ xs: colNumber }} className="flex justify-center items-center">
        //   {Object.keys(tableContent).map((key, index) => (
        //     <>
        //       {parseInt(key) <= colNumber ? (
        //         <Grid item xs={1} key={index} className="font-bold flex justify-center items-center border-2 border-black">{tableContent[key]}</Grid>
        //       ) : (
        //         <Grid item xs={1} key={index} className="flex justify-center items-center border-2 border-black">{tableContent[key]}</Grid>
        //       )}
        //     </>
        //   ))}
        // </Grid>
        // Tailwind CSS
          <div className="m-4">
            <div style={tableCSS}>
              {Object.keys(tableContent).map((key, index) => (
                <>
                  {parseInt(key) <= colNumber ? (
                    <div key={index} className="font-bold flex justify-center items-center border-y-2 border-black">
                      {tableContent[key]}
                    </div>
                  ) : (
                    <div item xs={1} key={index} className="flex justify-center items-center border-y-2 border-black">
                      {tableContent[key]}
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
      )}
      {tableLayout === 2 && (
        <div className="m-4">
          <div style={tableCSS}>
            {Object.keys(tableContent).map((key, index) => (
              <>
                {parseInt(key) % colNumber === 1 ? (
                  <div key={index} className="font-bold flex justify-center items-center border-y-2 border-black">
                    {tableContent[key]}
                  </div>
                ) : (
                  <div key={index} className="flex justify-center items-center border-y-2 border-black">
                    {tableContent[key]}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        // <Grid container spacing={{ xs: 2 }} columns={{ xs: colNumber }} className="flex justify-center items-center">
        //   {Object.keys(tableContent).map((key, index) => (
        //     <>
        //       {parseInt(key) % colNumber === 1 ? (
        //         <Grid item xs={1} key={index} className="font-bold flex justify-center items-center border-2 border-black">{tableContent[key]}</Grid>
        //       ) : (
        //         <Grid item xs={1} key={index} className="flex justify-center items-center border-2 border-black">{tableContent[key]}</Grid>
        //       )}
        //     </>
        //   ))}
        // </Grid>
      )}
      {tableLayout === 3 && (
        <div className="m-4">
          <div style={tableCSS}>
            {Object.keys(tableContent).map((key, index) => (
              <>
                {parseInt(key) <= colNumber || parseInt(key) % colNumber === 1 ? (
                  <div key={index} className="font-bold flex justify-center items-center border-y-2 border-black">
                    {tableContent[key]}
                  </div>
                ) : (
                  <div key={index} className="flex justify-center items-center border-y-2 border-black">
                    {tableContent[key]}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        // <Grid container spacing={{ xs: 2 }} columns={{ xs: colNumber }} className="flex justify-center items-center">
        //   {Object.keys(tableContent).map((key, index) => (
        //     <>
        //       {parseInt(key) <= colNumber || parseInt(key) % colNumber === 1 ? (
        //         <Grid item xs={1} key={index} className="font-bold flex justify-center items-center border-2 border-black">
        //           {tableContent[key]}
        //         </Grid>
        //       ) : (
        //         <Grid item xs={1} key={index} className="flex justify-center items-center border-2 border-black">{tableContent[key]}</Grid>
        //       )}
        //     </>
        //   ))}
        // </Grid>
      )}
    </div>
    
  );
};
 
export default TableCard;
