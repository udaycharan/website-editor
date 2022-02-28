import React from "react";
import DarkTheme from "react-dark-theme";

function Header(props) {

   
const lightTheme = {
  background: 'white',
  text: 'black',
  textColor: "#612897",
  captionColor: "#082032"

}
 
const darkTheme = {
  background: '#041C32',
  text: 'white',
  textColor: "#FF87CA",
  captionColor: "#ffffff"
  
}


  return (
    <header>
      <div>
        <img src="/HTClogo.png" alt="company logo" className="company_logo"/>
      </div>
      <div className="company_logo_caption">
        <h2>
          Website Editor
        </h2>
        <small className="logo_caption">
          Design in your way
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
