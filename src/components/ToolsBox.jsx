import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import options from "../selectOptions.json";

function ToolBox(props) {
  const [error, setError] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [contentColor, setContentColor] = useState("#000000");
  const [fontSizeInput, setfontSizeInput] = useState("");

  const handleChange = (inputText) => {
    setTextInput(inputText);
    if (props.tag.name === "Image") {
      setError(true);
      props.tag.title = "Cannot edit image";
    } 
    else {
      props.tag.innerHTML = inputText;
    }
  };
     

  const setColor = (inputColor) => {
    setContentColor(inputColor);
    if (props.tag.name === "Image") {
      setError(true);
      props.tag.title = "Cannot edit image";
    }
    if(props.tag.name === "Header"){

      props.tag.style.backgroundColor = inputColor;
      // props.tag.style.color = inputColor;
    } 
    
      props.tag.style.color = inputColor;

   
  };

  const handleFontSize = (inputFontSize) => {

    setfontSizeInput(inputFontSize);
    props.tag.style.fontSize = inputFontSize;
  }

  const saveContentToLocalStorage = () =>{

      if(localStorage.getItem("droppedTagData") == null){
        localStorage.setItem("droppedTagData", "[]");
      }

      let oldData = JSON.parse(localStorage.getItem("droppedTagData"));
      oldData.push(props.tag);

      // localStorage.setItem("droppedTagData", JSON.stringify(oldData));
  }


  return (
    <div className="tool-box draggable">
      <FaTimes
        id="close-tool-box"
        onClick={() => {
          props.setBtn(false);
        }}
      />
      <h3 className="tool-box-title">Text Settings</h3>
      <div id="color-box">
        <label htmlFor="color" id="color">
          Color picker 
          </label>
        
            <input
              type="color"
              name="color"
              id="color-input"
              value={contentColor}
              onChange={(event) => setColor(event.target.value)}
            />
      </div>
      <div id= "text-box">
        <label htmlFor="color" id="text">
          Update your text
        </label>
            <input
              type="text"
              name="text"
              id="text-input"
              value={textInput}
              placeholder="Add Your Text..."
              onChange={(event) => handleChange(event.target.value)}
            />
      </div>
      <div className= "select-tag-box">
        <label htmlFor= "fontSize" id= "fontSize"> Select font size</label>
       <select id= "select-input-tag" value= {fontSizeInput} onChange={(event)=> handleFontSize(event.target.value)}>
         {options.map(option => {

           return(
            <option value= {option.value} key={option.value}>{option.label}</option>
           );
         })}
         
       </select>
      </div>
      {error && (
        <small style={{ color: "red", margin: "0px", padding: "0px" }}>
          <sup>**</sup>Cannot Edit Image
        </small>
      )}
      <div className= "btn-box">
        <button className= "apply-btn" onClick={saveContentToLocalStorage}>Apply</button>
      </div>
    </div>
  );
}

export default ToolBox;
