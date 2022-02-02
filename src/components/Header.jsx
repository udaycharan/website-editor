import React from "react";
import { VscEditorLayout } from "react-icons/vsc";
import DarkTheme from "react-dark-theme";

function Header(props) {

   
const lightTheme = {
  background: 'white',
  text: 'black',
  textColor: "#343A40",
  logoColor: "#3875fa"

}
 
const darkTheme = {
  background: '#041C32',
  text: 'white',
  textColor: "#FF87CA",
  logoColor: "gray"
  
}


  return (
    <header>
      <div>
        <h2 style={{ margin: "0" }}>
          <VscEditorLayout className="logo" />
          Website Editor
        </h2>
        <small className="logo_caption">
          <i>Design in your way</i>
        </small>
      </div>
      <div className="button-box">
        <DarkTheme light={lightTheme} dark={darkTheme} defaultDark={false} className= "theme-icon"/>
        <button onClick={props.downloadFileAsImage} >Download as image</button>
        <button onClick={props.downloadFile}>Download as Html</button>
      </div>
    </header>
  );
}

export default Header;
