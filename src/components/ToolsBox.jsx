import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import options from "../selectOptions.json";

function ToolBox({ tag, setDroppedContentClicked, x, y }) {
  const [error, setError] = useState(false);
  const [linkIcon, setLinkIcon] = useState(false);
  const [linkUrlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [contentColor, setContentColor] = useState("#000000");
  const [fontSizeInput, setfontSizeInput] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#F05454");

  const handleChange = (inputText) => {
    setTextInput(inputText);
    if (tag.name === "Image") {
      setError(true);
      tag.title = "Cannot edit image";
    }
    tag.innerHTML = inputText;
  };

  const setColor = (inputColor) => {
    setContentColor(inputColor);

    if (tag.name === "Image") {
      setError(true);
      tag.title = "Cannot edit image";
    }
    tag.style.color = inputColor;
  };

  const setBackgroundClr = (bgColor) => {
    setBackgroundColor(bgColor);
    tag.style.backgroundColor = bgColor;
  };

  const handleFontSize = (inputFontSize) => {
    setfontSizeInput(inputFontSize);
    tag.style.fontSize = inputFontSize;
  };

  const style = () => {
    return {
      position: "absolute",
      top: y,
      left: x,
    };
  };

  const attachLink = () => {
    setLinkIcon(!linkIcon);
  };

  const handleInputChange = (input) => {
    setUrlInput(input);
    tag.href = input;
    tag.target = "_blank";
  };

  return (
    <div className="tool-box draggable" style={style()}>
      <FaTimes
        id="close-tool-box"
        onClick={() => {
          setDroppedContentClicked(false);
        }}
      />
      <h3 className="tool-box-title">Text Settings</h3>
      <div className="link-input-box">
        <FaLink
          className="link-icon"
          title="link"
          onClick={() => attachLink()}
        />
        {linkIcon && (
          <input
            type="text"
            value={linkUrlInput}
            id="link-url-input"
            placeholder="Paste Url here..."
            onChange={(event) => handleInputChange(event.target.value)}
          />
        )}
      </div>
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

        <label htmlFor="color" id="color">
          Background color
        </label>

        <input
          type="color"
          name="color"
          id="bg-color-input"
          value={backgroundColor}
          onChange={(event) => setBackgroundClr(event.target.value)}
        />
      </div>
      <div id="text-box">
        <label htmlFor="color" id="text">
          Update your text
        </label>
        <textarea
          type="text"
          name="text"
          id="text-input"
          value={textInput}
          placeholder="Add Your Text..."
          onChange={(event) => handleChange(event.target.value)}
        />
      </div>
      <div className="select-tag-box">
        <label htmlFor="fontSize" id="fontSize">
          {" "}
          Select font size
        </label>
        <select
          id="select-input-tag"
          value={fontSizeInput}
          onChange={(event) => handleFontSize(event.target.value)}
        >
          {options.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      {error && (
        <small style={{ color: "red", margin: "0px", padding: "0px" }}>
          <sup>**</sup>Cannot Edit Image
        </small>
      )}
    </div>
  );
}

export default ToolBox;
