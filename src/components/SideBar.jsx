import React from "react";
import { useState } from "react";
import {FaPlus} from "react-icons/fa"
import SidePanel from "./Panel";

function SideBar(){
    const [isAddBtnClicked, setBtn] = useState(false);

    const handleClick = ()=>{

        setBtn(true);
    }

    return(

        <aside className="sidebar">
            <div id="icon-box">
             <FaPlus id="add-btn-style" style={{fontSize: "1.4rem", fontWeight: "600", margin: "10px 0px 0px 10px"}} title = "Add" onClick={()=>handleClick()}/>
           </div>
           {/* <FaPalette style={{fontSize: "1.6rem", color: "black", margin: "35px 0px 0px 10px", cursor: "pointer" }} title="Theme Manager"/>
             <FaImages style={{fontSize: "1.6rem", color: "black", margin: "35px 0px 0px 10px", cursor: "pointer"  }} title="Background"/> */}
           {isAddBtnClicked && <SidePanel isAddBtnClicked={isAddBtnClicked} setBtn={setBtn} />}
        </aside>
    )
}

export default SideBar;