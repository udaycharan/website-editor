import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdDriveFolderUpload } from "react-icons/md";

function SidePanel(props) {

  const [isListItemClicked, setListItem] = useState(false);
  const [parentTag, setTag] = useState("");
  const [isNestedListClicked, setNestedList] = useState(false);
  const [nestListTag, setNestedListTag] = useState("");

  let panelData  = props.panelData;

  let uploadImageInitialData = panelData
    .filter((el) => el.type === "Image")
    .map((ele) => ele.children)
    .flat()
    .filter((ele) => ele.name === "My Uploads")
    .map((ele) => ele.stylesArr)
    .flat();

  const [uploadedImageList, setUploadedImageList] = useState(
    uploadImageInitialData
  );

  const closePanel = () => {
    props.setBtn(false);
  };

  const handleContent = (element) => {
    if (
      element.className === "Text" ||
      element.className === "Button" ||
      element.className === "Image" ||
      element.className === "Header" ||
      element.className === "Footer" ||
      element.className === "Links" ||
      element.className === "Forms"
    ) {
      setListItem(true);
      setTag(element.className);
    } else {
      setListItem(false);
    }
  };

  const drag = (eve) => {
    eve.dataTransfer.setData("data", eve.target.id);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  const handleNestedList = (element) => {
    if (
      element.id === "Themed texts" ||
      element.id === "Titles" ||
      element.id === "Paragraphs" ||
      element.id === "Themed Buttons" ||
      element.id === "Text & icons Buttons" ||
      element.id === "icon Buttons" ||
      element.id === "My Uploads" ||
      element.id === "My Collections" ||
      element.id === "Social images" ||
      element.id === "Headers" ||
      element.id === "Footer-style-1" ||
      element.id === "Footer-style-2" ||
      element.id === "links" ||
      element.id === "forms"
    ) {
      setNestedList(true);
      setNestedListTag(element.id);
    } else {
      setNestedList(false);
    }
  };

  const uploadFile = () => {
    document.querySelector("#file-upload").click();
  };

  const selectFile = (event) => {
    let imageObj = {};

    if (event.target.files.length !== 0) {
      let image = URL.createObjectURL(event.target.files[0]);
      imageObj.ID = image;
      imageObj.name = "Image";
      imageObj.classname = "social_images";
      imageObj.imageUrl = image;
    } else return;

    setUploadedImageList([...uploadedImageList, imageObj]);
  };

  return (
    <div className="panel-box">
      <span className="panel-header">
        <h5 className="Add_to_site">Add to Site</h5>
        <FaTimes id="close-icon" onClick={() => closePanel()} />
      </span>

      <div className="panel-data-box">
        <ul id="parent-list">
          {panelData ? (
            panelData.map((ele) => (
              <li
                key={ele.type}
                className={ele.type}
                onClick={(event) => handleContent(event.target)}
              >
                {ele.type}
              </li>
            ))
          ) : (
            <p>No Data Found</p>
          )}
        </ul>

        <div className="nested-list-data-box">
          {isListItemClicked && parentTag === "Text" ? (
            <ul key={parentTag} className="nested-data">
              {panelData
                .filter((el) => el.type === "Text")
                .map((ele) => ele.children)
                .flat()
                .map((childObj) => (
                  <li
                    key={childObj.ID}
                    className="text-nested-list"
                    id={childObj.name}
                    onClick={(event) => handleNestedList(event.target)}
                  >
                    {childObj.name}
                  </li>
                ))}
            </ul>
          ) : isListItemClicked && parentTag === "Button" ? (
            <ul className="nested-data">
              {panelData
                .filter((el) => el.type === "Button")
                .map((ele) => ele.children)
                .flat()
                .map((childObj) => (
                  <li
                    key={childObj.name}
                    id={childObj.name}
                    onClick={(event) => handleNestedList(event.target)}
                    className="button-nested-list"
                  >
                    {childObj.name}
                  </li>
                ))}
            </ul>
          ) : isListItemClicked && parentTag === "Image" ? (
            <>
              <ul key={parentTag} className="nested-data">
                {panelData
                  .filter((el) => el.type === "Image")
                  .map((ele) => ele.children)
                  .flat()
                  .map((childObj) => (
                    <li
                      key={childObj.ID}
                      className="image-nested-list"
                      id={childObj.name}
                      onClick={(event) => handleNestedList(event.target)}
                    >
                      {childObj.name}
                    </li>
                  ))}
              </ul>
              <MdDriveFolderUpload
                key=""
                className="sidebar-upload-btn"
                title="upload"
                onClick={() => {
                  uploadFile();
                }}
              />
              <input
                type="file"
                id="file-upload"
                onChange={(event) => selectFile(event)}
              />
            </>
          ) : isListItemClicked && parentTag === "Header" ? (
            <ul key={parentTag} className="nested-data">
              {panelData
                .filter((el) => el.type === "Header")
                .map((ele) => ele.children)
                .flat()
                .map((childObj) => (
                  <li
                    key={childObj.ID}
                    className="header-nested-list"
                    id={childObj.name}
                    onClick={(event) => handleNestedList(event.target)}
                  >
                    {childObj.name}
                  </li>
                ))}
            </ul>
          ) : isListItemClicked && parentTag === "Footer" ? (
            <ul key={parentTag} className="nested-data">
              {panelData
                .filter((el) => el.type === "Footer")
                .map((ele) => ele.children)
                .flat()
                .map((childObj) => (
                  <li
                    key={childObj.ID}
                    className="footer-nested-list"
                    id={childObj.name}
                    onClick={(event) => handleNestedList(event.target)}
                  >
                    {childObj.name}
                  </li>
                ))}
            </ul>
          ) : isListItemClicked && parentTag === "Links" ? (
            <ul key={parentTag} className="nested-data">
              {panelData
                .filter((el) => el.type === "Links")
                .map((ele) => ele.children)
                .flat()
                .map((childObj) => (
                  <li
                    key={childObj.ID}
                    className="links-nested-list"
                    id={childObj.name}
                    onClick={(event) => handleNestedList(event.target)}
                  >
                    {childObj.name}
                  </li>
                ))}
            </ul>
          ) : isListItemClicked && parentTag === "Forms" ? (
            <ul key={parentTag} className="nested-data">
              {panelData
                .filter((el) => el.type === "Forms")
                .map((ele) => ele.children)
                .flat()
                .map((childObj) => (
                  <li
                    key={childObj.ID}
                    className="forms-nested-list"
                    id={childObj.name}
                    onClick={(event) => handleNestedList(event.target)}
                  >
                    {childObj.name}
                  </li>
                ))}
            </ul>
          ) : null}
        </div>

        <div className="content-holder">
          <h3
            style={{
              padding: "0px 0px 10px 20px",
              marginLeft: "5px",
              color: "#B2B1B9",
              borderBottom: "1px solid #E6E6E6",
              width: "85%",
            }}
          >
            {nestListTag}
          </h3>

          {isNestedListClicked && nestListTag === "Themed texts"
            ? panelData
                .filter((el) => el.type === "Text")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "Themed texts")
                .map((ele) =>
                  ele.stylesArr.map((style) => (
                    <div key={style.ID}>
                      <h1
                        draggable={style.draggable}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        id={style.h1}
                        className={style.classname}
                       
                      >
                        {style.h1}
                      </h1>

                      <h2
                        onDragStart={drag}
                        onDragOver={dragOver}
                        draggable={style.draggable}
                        id={style.h2}
                        className={style.classname}
                      >
                        {style.h2}
                      </h2>

                      <h3
                        onDragStart={drag}
                        onDragOver={dragOver}
                        draggable={style.draggable}
                        id={style.h3}
                        className={style.classname}
                      >
                        {style.h3}
                      </h3>

                      <h4
                        onDragStart={drag}
                        onDragOver={dragOver}
                        draggable={style.draggable}
                        id={style.h4}
                        className={style.classname}
                      >
                        {style.h4}
                      </h4>

                      <h5
                        onDragStart={drag}
                        onDragOver={dragOver}
                        draggable={style.draggable}
                        id={style.h5}
                        className={style.classname}
                      >
                        {style.h5}
                      </h5>

                      <h6
                        onDragStart={drag}
                        onDragOver={dragOver}
                        draggable={style.draggable}
                        id={style.h6}
                        className={style.classname}
                      >
                        {style.h6}
                      </h6>
                      <p
                        draggable={style.draggable}
                        id={style.id}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        className={style.className}
                      >
                        {style.para}
                      </p>
                    </div>
                  ))
                )
            : isNestedListClicked && nestListTag === "Titles"
            ? panelData
                .filter((el) => el.type === "Text")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "Titles")
                .map((ele) =>
                  ele.stylesArr.map((style) => (
                    <div key={style.ID}>
                      <h1
                        draggable={style.draggable}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        id={style.ID}
                        key={style.h1}
                        className={style.classname}
                      >
                        {style.h1}
                      </h1>

                      <h2
                        draggable={style.draggable}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        id={style.ID2}
                        key={style.h2}
                        className={style.classname}

                      >
                        {style.h2}
                      </h2>

                      <h3
                        draggable={style.draggable}
                        id={style.ID}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        key={style.h3}
                        className={style.classname}
                      >
                        {style.h3}
                      </h3>

                      <h4
                        draggable={style.draggable}
                        id={style.ID2}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        key={style.h4}
                        className={style.classname}
                      >
                        {style.h4}
                      </h4>

                      <h5
                        draggable={style.draggable}
                        id={style.ID}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        key={style.h5}
                        className={style.classname}
                      >
                        {style.h5}
                      </h5>

                      <h6
                        draggable={style.draggable}
                        id={style.ID2}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        key={style.h6}
                        className={style.classname}
                      >
                        {style.h6}
                      </h6>
                    </div>
                  ))
                )
            : isNestedListClicked && nestListTag === "Paragraphs"
            ? panelData
                .filter((el) => el.type === "Text")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "Paragraphs")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <p
                        draggable={style.draggable}
                        id={style.ID}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        key={style.ID}
                        className={style.classname}
                      >
                        {style.para}
                      </p>
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "Themed Buttons"
            ? panelData
                .filter((el) => el.type === "Button")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "Themed Buttons")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <button
                        draggable={style.draggable}
                        id={style.ID}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        key={style.ID}
                        className = {style.classname}
                      >
                        {style.btnText}
                      </button>
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "Text & icons Buttons"
            ? panelData
                .filter((el) => el.type === "Button")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "Text & icons Buttons")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <button
                        draggable={style.draggable}
                        id={style.ID}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        key={style.ID}
                        className={style.className}

                      >
                        {style.btnText}
                        <i
                          style={{
                            padding: `${style.iconpadding}`,
                            fontSize: `${style.iconsize}`,
                          }}
                          className={style.classname}
                        ></i>
                      </button>
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "icon Buttons"
            ? panelData
                .filter((el) => el.type === "Button")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "icon Buttons")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <i
                        draggable={style.draggable}
                        id={style.ID}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        key={style.ID}
                        style={{
                          fontSize: `${style.fontsize}`,
                          zIndex: `${style.zindex}`,
                          margin: `${style.margin}`,
                          cursor: `${style.cursor}`,
                          color: `${style.color}`,
                          padding: `${style.padding}`,
                          backgroundColor: `${style.bgcolor}`,
                          borderRadius: `${style.borderradius}`,
                        }}
                        className={style.classname}
                      ></i>
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "My Uploads"
            ? panelData
                .filter((el) => el.type === "Image")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "My Uploads")
                .map((ele) => (
                  <div key={ele.name}>
                    {uploadedImageList.map((style) => (
                      <img
                        draggable={style.draggable}
                        id={style.ID}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        src={style.imageUrl}
                        alt="description"
                        name={style.name}
                        key={style.ID}
                        className={style.classname}
                      />
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "My Collections"
            ? panelData
                .filter((el) => el.type === "Image")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "My Collections")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <img
                        draggable={style.draggable}
                        id={style.ID}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        src={style.imageUrl}
                        alt="description"
                        name={style.name}
                        key={style.ID}
                        className={style.classname}
                      />
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "Social images"
            ? panelData
                .filter((el) => el.type === "Image")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "Social images")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <img
                        draggable={style.draggable}
                        id={style.ID}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        src={style.imageUrl}
                        alt="description"
                        name={style.name}
                        className={style.classname}
                        key={style.ID}
                      />
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "Headers"
            ? panelData
                .filter((el) => el.type === "Header")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "Headers")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <header
                        key={style.ID}
                        id={style.ID}
                        draggable={style.draggable}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        className={style.name}
                      >
                        <h5>{style.title}</h5>
                      </header>
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "links"
            ? panelData
                .filter((el) => el.type === "Links")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "links")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <a
                        href={style.href}
                        key={style.ID}
                        id={style.ID}
                        draggable={style.draggable}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        className={style.name}
                      >
                        {style.title}
                      </a>
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "Footer-style-1"
            ? panelData
                .filter((el) => el.type === "Footer")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "Footer-style-1")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <footer
                        key={style.ID}
                        id={style.ID}
                        draggable={style.draggable}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        className={style.name}
                      >
                        <h5>{style.title}</h5>
                      </footer>
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "Footer-style-2"
            ? panelData
                .filter((el) => el.type === "Footer")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "Footer-style-2")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <footer
                        key={style.ID}
                        id={style.ID}
                        draggable={style.draggable}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        className={style.name}
                      >
                        <h5>{style.title}</h5>
                      </footer>
                    ))}
                  </div>
                ))
            : isNestedListClicked && nestListTag === "forms"
            ? panelData
                .filter((el) => el.type === "Forms")
                .map((ele) => ele.children)
                .flat()
                .filter((ele) => ele.name === "forms")
                .map((ele) => (
                  <div key={ele.name}>
                    {ele.stylesArr.map((style) => (
                      <form
                        key={style.ID}
                        id={style.ID}
                        draggable={style.draggable}
                        onDragStart={drag}
                        onDragOver={dragOver}
                        className={style.name}
                        name={ele.name}
                      >
                        <h3>Login</h3>
                        <input type="text" name="username" id="form-username" />
                        <input
                          type="password"
                          name="password"
                          id="form-password"
                        />
                        <button>Login</button>
                      </form>
                    ))}
                  </div>
                ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
