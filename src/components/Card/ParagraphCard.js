'use client'
import React from "react";
import { twj } from "tw-to-css";

const ParagraphCard = ({eleId, content, color}) => {
  const colorDict = { ["text-" + color.toString()]: true };
  const colorStyleCSS = twj(colorDict);
  return (
    <div 
      id={eleId} 
      className={"flex mx-auto p-5 text-base text-" + color.toString()}
      style={colorStyleCSS}
    >
      {content}
    </div>
  );
};

export default ParagraphCard;