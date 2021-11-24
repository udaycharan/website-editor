import React from "react";
import interact from "interactjs";
import ToolBox from "./ToolsBox";
import { useState } from "react";


function Content(props) {
  const [isDroppedContentClicked, setBtn] = useState(false);
  const [tag, setTag] = useState(null);


  function dragMoveListener(event) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.transform = "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  interact(".draggable")
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      // enable autoScroll
      autoScroll: true,

      listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,
      },
    })
    // .resizable({
    //   // resize from all edges and corners
    //   edges: { left: true, right: true, bottom: true, top: true },

    //   listeners: {
    //     move(event) {
    //       var target = event.target;
    //       var x = parseFloat(target.getAttribute("data-x")) || 0;
    //       var y = parseFloat(target.getAttribute("data-y")) || 0;

    //       // update the element's style
    //       target.style.width = event.rect.width + "px";
    //       target.style.height = event.rect.height + "px";

    //       // translate when resizing from top or left edges
    //       x += event.deltaRect.left;
    //       y += event.deltaRect.top;

    //       target.style.transform = "translate(" + x + "px," + y + "px)";
    //     },
    //   },
    //   modifiers: [
    //     // keep the edges inside the parent
    //     interact.modifiers.restrictEdges({
    //       outer: "parent",
    //     }),

    //     // minimum size
    //     interact.modifiers.restrictSize({
    //       min: { width: 100, height: 50 },
    //     }),
    //   ],

    //   inertia: true,
    // });


  const drop = (eve) => {

      eve.preventDefault();
      let DropEl = eve.dataTransfer.getData("data");
      const getTag = document.getElementById(DropEl);    
      getTag.classList.add("draggable");
      getTag.addEventListener("dblclick", () => {
        setBtn(true);
        // getTag.setAttribute("contenteditable", true)
        setTag(getTag);
      });
    
    eve.target.appendChild(getTag);  
      
  };

  const dragOver = (eve) => {
    eve.preventDefault();
  };


  return (
    <main
      className="main-content"
      onDrop={drop}
      onDragOver={dragOver}
      ref={props.nodeRef}
    >
      {isDroppedContentClicked && (
        <ToolBox
          isDroppedContentClicked={isDroppedContentClicked}
          setBtn={setBtn}
          tag={tag}
        />
      )}
    </main>
  );
}

export default Content;
