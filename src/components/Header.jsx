import React from "react";
// import * as htmlToImage from 'html-to-image';


function Header(props){

   


    return(
        <header>
            <div>
                <h2 style={{margin: "0"}}>Website Editor</h2>
                <small style={{color: "#000D6B", fontWeight: "600"}}><i>Design in your way</i></small>
            </div>
            <div className= "button-box">
                <button onClick={props.downloadFileAsImage}>Download as image</button>
            <button onClick={props.downloadFile}>Download Html</button>
            </div>
 
        </header>
    );
}

export default Header;