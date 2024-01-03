'use client'
import React from "react";

const AddComponentButton = ({eleId, pointer, onSetPointers}) => {
  const handleClick = () => {
    onSetPointers();
  };

  return (
    <button
      id={eleId}
      onClick={handleClick}
      className={`font-semibold p-4 rounded-lg text-white transition-all duration-300 ${pointer === eleId ? "bg-violet-500" : "bg-violet-400"}`}
    >
      + Component
    </button>
  );
};
 
export default AddComponentButton;