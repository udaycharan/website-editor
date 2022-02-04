import React, { useRef, useCallback, useEffect, useState } from "react";
import SideBar from "./SideBar";
import Content from "./Content";
import Header from "./Header";
import { toPng } from "html-to-image";
import data from "../data.json"; 

function Editor() {
  const nodeRef = useRef(null);
  const [panelData, setPanelData] = useState([]);

  useEffect(()=>{

    if(localStorage.getItem("panelData") === null){

      localStorage.setItem("panelData", JSON.stringify(data.data)); 
    }

    setPanelData(data.data);

  },[])


  const downloadFile = () => {
    if (nodeRef.current === null) {
      return;
    }

    const obj = nodeRef.current.outerHTML;
    const blob = new Blob([obj], { type: "application/html" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "preview.html";
    a.click();
  };

  const downloadFileAsImage = useCallback(() => {
    if (nodeRef.current === null) {
      return;
    }

    toPng(nodeRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "preview.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nodeRef]);

  return (
    <div className="App">
      <Header
        downloadFile={downloadFile}
        downloadFileAsImage={downloadFileAsImage}
      />
      <div className="main-container">
        <SideBar panelData={panelData}/>
        <Content nodeRef={nodeRef} />
      </div>
    </div>
  );
}

export default Editor;
