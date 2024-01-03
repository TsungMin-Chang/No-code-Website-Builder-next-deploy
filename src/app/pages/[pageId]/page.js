"use client"
import { useState, useEffect } from 'react'
import TitleBar from '@/components/Titlebar'
import ToolBar from '@/components/ToolBar'
import TextCard from '@/components/Card/TextCard'
import ImageCard from '@/components/Card/ImageCard'
import ListCard from '@/components/Card/ListCard'
import TableCard from '@/components/Card/TableCard'
import AddComponentButton from '@/components/AddComponentButton'
import ParagraphCard from '@/components/Card/ParagraphCard'
import IconButton from "@mui/material/IconButton";
import { TiDelete } from "react-icons/ti";
import usePages from "@/hooks/usePages";
import useNodes from "@/hooks/useNodes";
import { useParams, useRouter } from "next/navigation";
import {getCookies} from 'cookies-next';
import { twj } from "tw-to-css";

export default function WorkingPage() {
  const { pageId } = useParams();
  const token = getCookies("jwt-token");
  const { getPage } = usePages();
  const { deleteNode } = useNodes();
  const [editMode, setEditMode] = useState(false);
  const [pointer, setPointer] = useState("");
  const [dummy, setDummy] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const backgroundChoice = [
    "https://thumb.photo-ac.com/56/564d7708097fcf9e3afc35d896da492d_t.jpeg",
    "https://pic.616pic.com/bg_w1180/00/03/91/pIvv6oP7dn.jpg",
    "https://pic.616pic.com/bg_w1180/00/12/30/RfTc2srish.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-geometric-low-polygon-blue-purple-simple-romantic-gradient-background-material-polygonblue-image_66649.jpg",
    "https://img-qn.51miz.com/preview/element/00/01/26/82/E-1268285-BC2C6DEA.jpg!/quality/90/unsharp/true/compress/true/fw/450",
    "https://thumb.photo-ac.com/39/39ddfcac8ad4036000aed1c404d9457b_t.jpeg",
    "https://png.pngtree.com/background/20210714/original/pngtree-kraft-paper-picture-image_1218869.jpg",
    "https://s3.amazonaws.com/uploads.webconnex.com/1869/lazyb-bg-texture-2000px.jpg?fbclid=IwAR0igawg6w3gziHkn2Bndihh8pT3si6LMPbEwM4Bi9RCmJMvDnbh0LToiNw"
  ];
  if(!token){
    router.push('/');
  }
  useEffect(() => {
    async function fetchData() {
      const dbData = await getPage(token['jwt-token'], pageId);
      setDummy(dbData.nodes_data);
      if (dbData.information.background_image < 0) {
        const color1 = !dbData.information.background_color1 ? "white" : dbData.information.background_color1;
        const color2 = !dbData.information.background_color2 ? "white" : dbData.information.background_color2;
        const color1StyleCSS = twj({ ["text-" + color1]: true }).color;
        const color2StyleCSS = twj({ ["text-" + color2]: true }).color;
        setPageInfo({
          background_image: dbData.information.background_image,
          background_color1: color1StyleCSS,
          background_color2: color2StyleCSS,
          projectName: dbData.information.name
        });
      } else {
        setPageInfo({
          background_image: dbData.information.background_image,
          projectName: dbData.information.name
        });
      }
    }
    fetchData();
  }, [pageId, refresh]);

  const handleChangeMode = () => {
    setPointer("");
    setEditMode(!editMode);
  }
  const handlePreDownload = () => {
    setPointer("");
    setEditMode(false);
  }
  
  const handleDelete = async (nodeId) => {
    await deleteNode(token['jwt-token'], nodeId);
    setRefresh(!refresh);
  }

  return (
    <>
      <main className='h-screen w-full flex flex-col'>
        <TitleBar />
        <section className="px-5 py-3 h-full w-full flex justify-center gap-2 overflow-hidden">
          <ToolBar
            editMode={editMode}
            onChangeMode={handleChangeMode}
            onPreDownload={handlePreDownload}
            pointer={pointer}
            apiData={{pageId, token: token['jwt-token']}}
            onRefresh={() => setRefresh(!refresh)}
            projectName={pageInfo.projectName}
          />
          <div
            className="relative w-3/4 flex flex-col items-center overflow-y-auto rounded-md" 
          >
            {pageInfo.background_image >= 0 ? (
              <img
                src={backgroundChoice[pageInfo.background_image]}
                alt='background' 
                style={{height: "100%", width: "100%", objectFit: "cover"}}
                className='sticky top-0'
              />
            ) : (
              <div
                className="sticky top-0 h-full w-full" 
                style={{"background": `linear-gradient(to bottom, ${pageInfo.background_color1}, ${pageInfo.background_color2}`}}
              />
            )}
            <div className='absolute flex flex-col w-full gap-y-3 px-24 py-16'>
              {dummy.map((ele) => {
                if (ele.type === 'text') {
                  return (
                    <>
                      <div style={{position: 'relative'}}>
                        {editMode && (
                          <div style={{float: 'right', position: 'absolute', right: '0px', top: '0px'}}>
                            <IconButton 
                              onClick={() => handleDelete(ele.id)}
                            >
                              <TiDelete size={30} color='red'/>
                            </IconButton>
                          </div>
                        )}
                        <TextCard 
                          eleId={ele.id} 
                          fontSize={ele.fontSize} 
                          content={ele.content}
                          color={ele.color}
                        />
                      </div>
                      {editMode && (
                        <AddComponentButton
                          eleId={ele.id}
                          pointer={pointer}
                          onSetPointers={() => setPointer(ele.id)}
                        />
                      )}
                    </>
                  )
                } else if (ele.type === 'paragraph') {
                  return (
                    <>
                      <div style={{position: 'relative'}}>
                        {editMode && (
                          <div style={{float: 'right', position: 'absolute', right: '0px', top: '0px'}}>
                            <IconButton 
                              onClick={() => handleDelete(ele.id)}
                            >
                              <TiDelete size={30} color='red'/>
                            </IconButton>
                          </div>
                        )}
                        <ParagraphCard 
                          eleId={ele.id} 
                          content={ele.content}
                          color={ele.color}
                        />
                      </div>
                      {editMode && 
                        <AddComponentButton
                          eleId={ele.id}
                          pointer={pointer}
                          onSetPointers={() => setPointer(ele.id)}
                        />
                      }
                    </>
                  )
                } else if (ele.type === 'image') {
                  return (
                    <>
                      <div style={{position: 'relative'}}>
                        {editMode && (
                          <div style={{float: 'right', position: 'absolute', right: '0px', top: '0px'}}>
                            <IconButton 
                              onClick={() => handleDelete(ele.id)}
                            >
                              <TiDelete size={30} color='red'/>
                            </IconButton>
                          </div>
                        )}
                        <ImageCard 
                          eleId={ele.id} 
                          imageLayout={ele.imageLayout} 
                          imageBase64String={ele.imageBase64String}
                          imageFile={ele.imageFileName+'.'+ele.imageFileType}
                          text={ele.text}
                          caption={ele.caption}
                        />
                      </div>
                      {editMode && 
                        <AddComponentButton
                          eleId={ele.id}
                          pointer={pointer}
                          onSetPointers={() => setPointer(ele.id)}
                        />
                      }
                    </>
                  )
                } else if (ele.type === 'list') {
                  return (
                    <>
                      <div style={{position: 'relative'}}>
                        {editMode && (
                          <div style={{float: 'right', position: 'absolute', right: '0px', top: '0px'}}>
                            <IconButton 
                              onClick={() => handleDelete(ele.id)}
                            >
                              <TiDelete size={30} color='red'/>
                            </IconButton>
                          </div>
                        )}
                        <ListCard 
                          eleId={ele.id}
                          listType={ele.listType}
                          icon={ele.icon}
                          content={ele.content}
                        />
                      </div>
                      {editMode && 
                        <AddComponentButton
                          eleId={ele.id}
                          pointer={pointer}
                          onSetPointers={() => setPointer(ele.id)}
                        />
                      }
                    </>
                  )
                } else if (ele.type === 'table') {
                  return (
                    <>
                      <div style={{position: 'relative'}}>
                        {editMode && (
                          <div style={{float: 'right', position: 'absolute', right: '0px', top: '0px'}}>
                            <IconButton 
                              onClick={() => handleDelete(ele.id)}
                            >
                              <TiDelete size={30} color='red'/>
                            </IconButton>
                          </div>
                        )}
                        <TableCard 
                          eleId={ele.id} 
                          colNumber={ele.colNumber} 
                          rowNumber={ele.rowNumber}
                          tableLayout={ele.tableLayout}
                          tableContent={ele.tableContent}
                        />
                      </div>
                      {editMode && 
                        <AddComponentButton
                          eleId={ele.id}
                          pointer={pointer}
                          onSetPointers={() => setPointer(ele.id)}
                        />
                      }
                    </>
                  )
                } else {
                  return (
                    <>
                      {editMode &&
                        <AddComponentButton
                          eleId={ele.id}
                          pointer={pointer}
                          onSetPointers={() => setPointer(ele.id)}
                        />
                      }
                    </>
                  ) 
                }
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
