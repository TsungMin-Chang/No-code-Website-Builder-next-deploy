'use client'
import React from "react";
import { TiMediaRecord } from "react-icons/ti";
import { TiMediaStop } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";
import { TiPin } from "react-icons/ti";
import { TiTick } from "react-icons/ti";

const ListCard = ({eleId, listType, icon, content}) => {
  return (
    <div id={eleId} className="p-5">
      {listType === "ordered" && (
        <div className="grid grid-cols-8 grid-row-flow">
        {Object.keys(content).map((ele, index) => (
          <>
            <div key={index} className="col-span-1 flex justify-start items-center">{`${index + 1}.`}</div>
            <div key={ele} className="col-span-7">{content[ele]}</div>
          </>
        ))}
      </div>
      )}
      {listType === "unordered" && (
        <div className="grid grid-cols-8 grid-row-flow">
          {Object.keys(content).map((ele, index) => (
            <>
              <div key={ele} className="col-span-1 flex justify-start items-center">
                {icon === 1 && <TiMediaRecord/>}
                {icon === 2 && <TiMediaStop/>}
                {icon === 3 && <TiTick/>}
                {icon === 4 && <TiPin/>}
                {icon === 5 && <TiHeartFullOutline/>}
              </div>
              <div key={index} className="col-span-7">{content[ele]}</div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default ListCard;