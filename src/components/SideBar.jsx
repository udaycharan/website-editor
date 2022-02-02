import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import SidePanel from "./Panel";

function SideBar({ panelData }) {
  const [isAddBtnClicked, setBtn] = useState(false);

  const handleClick = () => {
    setBtn(true);
  };

  return (
    <aside className="sidebar">
      <div id="icon-box">
        <FaPlus
          className="sidebar-add-btn"
          title="Add"
          onClick={() => handleClick()}
        />
      </div>
      {isAddBtnClicked && (
        <SidePanel isAddBtnClicked={isAddBtnClicked} setBtn={setBtn} panelData={panelData}/>
      )}
    </aside>
  );
}

export default SideBar;
