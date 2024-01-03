'use client'
import React from "react";

const ImageCard = ({eleId, imageLayout, imageBase64String, imageFile, text, caption}) => {
  return (
    <div id={eleId} className="grid grid-rows-4 grid-flow-col gap-x-2 gap-y-1 p-5">
      {imageLayout === 1 && (
        <>
          <div className="flex items-center justify-center row-span-3">
            <img
              src={"data:image/png;base64,"+imageBase64String}
              alt={imageFile}
              style={{width: "13vw", height: "auto"}}
            />
          </div>
          <div className="flex items-center justify-center row-span-1 p-1">
            {caption}
          </div>
          <div className="flex justify-start text-justify row-span-4 col-span-7 py-6 px-3">
            {text}
          </div>
          </>
      )}
      {imageLayout === 2 && (
        <>
          <div className="flex justify-start text-justify row-span-4 col-span-7 py-1 px-3">
            {text}
          </div>
          <div className="flex items-center justify-center row-span-3">
            <img
              src={"data:image/png;base64,"+imageBase64String}
              alt={imageFile}
              style={{width: "13vw", height: "auto"}}
            />
          </div>
          <div className="flex items-center justify-center row-span-1 p-1">
            {caption}
          </div>
          </>
      )}
      {imageLayout === 3 && (
        <>
          <div className="flex items-center justify-center row-span-3">
            <img
              src={"data:image/png;base64,"+imageBase64String}
              alt={imageFile}
              style={{width: "60vw", height: "auto"}}
            />
          </div>
          <div className="flex items-center justify-center row-span-1 p-1">
            {caption}
          </div>
        </>
      )}
    </div>
  );
};
 
export default ImageCard;