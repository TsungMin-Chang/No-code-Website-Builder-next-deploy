'use client'
import React from "react";
import { twj } from "tw-to-css";

const TextCard = ({key, fontSize, content, color}) => {
  const fontSizeDict = {1: "text-base", 2: "text-lg", 3: "text-xl", 4: "text-2xl", 5: "text-3xl"};
  const colorDict = { ["text-" + color.toString()]: true };
  const colorStyleCSS = twj(colorDict);
  return (
    <div 
      id={key} 
      className={"flex flex-col p-5 font-semibold " + fontSizeDict[fontSize]} 
      style={colorStyleCSS}
    >
      {content}
    </div>
  );
};
 
export default TextCard;