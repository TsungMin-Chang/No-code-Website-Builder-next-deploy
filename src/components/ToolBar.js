'use client';
import React from "react";
import { useState } from 'react';
import TextDialog from './Dialog/TextDialog';
import ParagraphDialog from './Dialog/ParagraphDialog';
import ImageDialog from './Dialog/ImageDialog';
import ListDialog from './Dialog/ListDialog';
import TableDialog from './Dialog/TableDialog';
import { useParams , useRouter } from "next/navigation";

const ToolBar = ({editMode, onChangeMode, onPreDownload, pointer, apiData, onRefresh, projectName}) => {
  const [openTextDialog, setOpenTextDialog] = useState(false);
  const [openParagraphDialog, setOpenParagraphDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [openListDialog, setOpenListDialog] = useState(false);
  const [openTableDialog, setOpenTableDialog] = useState(false);
  const { pageId } = useParams();
  const router = useRouter();


  const handleDownload = () => {
    onPreDownload();
    handleCSS();
    handleCSS2();
    handleHTML();
  }
  const handleHTML = () => {
    const element = document.createElement("a");
    // Get the entire HTML source
    const htmlString = window.document.getElementById("html").innerHTML;
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    // Remove the titlebar and toolbar
    const titlebarElement = tempElement.querySelector('#titlebar');
    const toolbarElement = tempElement.querySelector('#toolbar');
    if (titlebarElement) {
        titlebarElement.parentNode.removeChild(titlebarElement);
    }
    if (toolbarElement) {
        toolbarElement.parentNode.removeChild(toolbarElement);
    }
    const modifiedString = tempElement.innerHTML;
    // Replace the CSS path and layout
    const toBeReplacedCssPathString = "/_next/static/css/";
    const cssPathModifiedString = modifiedString.replaceAll(toBeReplacedCssPathString, './');
    const toBeReplacedLayoutString = "w-3/4";
    const layoutModifiedString = cssPathModifiedString.replaceAll(toBeReplacedLayoutString, 'w-screen');
    const toBeReplacedCssCrossOrigin = 'crossorigin=""';
    const crossOriginModifiedString = layoutModifiedString.replaceAll(toBeReplacedCssCrossOrigin, '');
    const file = new Blob([crossOriginModifiedString], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = projectName + ".html";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  const handleCSS = () => {
    const cssUrl = 'https://no-code-website-builder-next-deploy-34qd.vercel.app/_next/static/css/e7d3bab42d9af29d.css';
    const downloadLink = document.createElement('a');
    downloadLink.href = cssUrl;
    downloadLink.download = 'e7d3bab42d9af29d.css';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  const handleCSS2 = () => {
    const cssUrl = 'https://no-code-website-builder-next-deploy-34qd.vercel.app/_next/static/css/ed4e32fac4b79d78.css';
    const downloadLink = document.createElement('a');
    downloadLink.href = cssUrl;
    downloadLink.download = 'ed4e32fac4b79d78.css';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const handleChange = () => {
    router.push(`/edit/${pageId}`);
  }
  
  return (
    <>
      <div id="toolbar" className="w-1/4 h-full flex flex-col gap-y-4 mx-auto p-4 bg-violet-200 rounded-md relative">
        <button
          onClick={() => onChangeMode()}
          className="tracking-wide font-semibold bg-violet-900 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          {editMode ? "Display" : "Edit"}
        </button>
        {editMode && !!pointer && (
          <>
            <button
              onClick={() => setOpenTextDialog(true)}
              className="tracking-wide font-semibold bg-violet-600 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              Title
            </button>
            <button
              onClick={() => setOpenParagraphDialog(true)}
              className="tracking-wide font-semibold bg-violet-600 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              Paragraph
            </button>
            <button
              onClick={() => setOpenImageDialog(true)}
              className="tracking-wide font-semibold bg-violet-600 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              Image
            </button>
            <button
              onClick={() => setOpenListDialog(true)}
              className="tracking-wide font-semibold bg-violet-600 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              List
            </button>
            <button
              onClick={() => setOpenTableDialog(true)}
              className="tracking-wide font-semibold bg-violet-600 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              Table
            </button>
          </>
        )}
        <div className="grow"></div>
        <button 
          onClick={handleChange}
          className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all focus:outline-none hover:bg-indigo-200 hover:shadow focus:shadow-sm focus:shadow-outline"
        >
          Change Info
        </button>
        <button
          onClick={handleDownload}
          disabled={editMode ? true : false}
          className={`${editMode ? "bg-indigo-100 text-gray-400" : " bg-indigo-100 text-gray-800 transition-all focus:outline-none hover:bg-indigo-200 hover:shadow focus:shadow-sm focus:shadow-outline " } w-full max-w-xs font-bold shadow-sm rounded-lg py-3 flex items-center justify-center`}
        >
          Download
        </button>
      </div>
      <TextDialog
        onClose={() => setOpenTextDialog(false)}
        open={openTextDialog}
        pointer={pointer}
        apiData={apiData}
        onRefresh={onRefresh}
      />
      <ParagraphDialog
        onClose={() => setOpenParagraphDialog(false)}
        open={openParagraphDialog}
        pointer={pointer}
        apiData={apiData}
        onRefresh={onRefresh}
      />
      <ImageDialog
        onClose={() => setOpenImageDialog(false)}
        open={openImageDialog}
        pointer={pointer}
        apiData={apiData}
        onRefresh={onRefresh}
      />
      <ListDialog
        onClose={() => setOpenListDialog(false)}
        open={openListDialog}
        pointer={pointer}
        apiData={apiData}
        onRefresh={onRefresh}
      />
      <TableDialog
        onClose={() => setOpenTableDialog(false)}
        open={openTableDialog}
        pointer={pointer}
        apiData={apiData}
        onRefresh={onRefresh}
      />
    </>
  );
};
 
export default ToolBar;
