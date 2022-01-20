import React from "react";
import interact from "interactjs";
import ToolBox from "./ToolsBox";
import { useState, useEffect } from "react";
import Menu from "./Menu";

function Content({ nodeRef }) {
  const [isDroppedContentClicked, setDroppedContentClicked] = useState(false);
  const [tag, setTag] = useState(null);
  const [parent, setParent] = useState(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [displayMenu, setDisplayMenu] = useState(false);

  const handleClick = () => {
    displayMenu && setDisplayMenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

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

  interact(".draggable").draggable({
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
  });

  interact(".resize")
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move(event) {
          var target = event.target;
          var x = parseFloat(target.getAttribute("data-x")) || 0;
          var y = parseFloat(target.getAttribute("data-y")) || 0;

          // update the element's style
          target.style.width = event.rect.width + "px";
          target.style.height = event.rect.height + "px";

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.transform = "translate(" + x + "px," + y + "px)";

          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        },
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: "parent",
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 },
        }),
      ],

      inertia: true,
    })

    .draggable({
      //call this listener on every dragmove event
      listeners: { move: dragMoveListener },
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
    });

  const drop = (eve) => {
    setParent(eve.target);

    eve.preventDefault();
    let DropEl = eve.dataTransfer.getData("data");
    const getTag = document.getElementById(DropEl);

    getTag.className === "header" ||
    getTag.name === "Image" ||
    getTag.className === "footer"
      ? getTag.classList.add("resize")
      : getTag.classList.add("draggable");

    getTag.addEventListener("dblclick", (event) => {
      event.preventDefault();
      setDroppedContentClicked(true);
      setX(event.clientX);
      setY(event.clientY);
      // getTag.setAttribute("contenteditable", true)
      setTag(getTag);
    });

    getTag.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      setX(event.clientX);
      setY(event.clientY);
      setTag(getTag);
      setDisplayMenu(true);
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
      ref={nodeRef}
    >
      {isDroppedContentClicked && (
        <ToolBox
          setDroppedContentClicked={setDroppedContentClicked}
          tag={tag}
          x={x}
          y={y}
        />
      )}
      {displayMenu && <Menu x={x} y={y} parent={parent} tag={tag} />}
    </main>
  );
}

export default Content;
