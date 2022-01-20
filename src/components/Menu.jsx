import React from "react";
import { FaRegClone, FaPaste, FaTrash, FaRegFolderOpen } from "react-icons/fa";


function Menu({ parent, tag, x, y }) {

  const deleteItem = () => {
    parent.removeChild(tag);
  };

  const styles = ()=>{

    return{

      borderRadius: 3,
      flexDirection: "column",
      top: y,
      left: x,
      justifyContent: "center",
      position: "absolute",
      display :  "flex" 


    }
  }

  
  return (
    <div className="menu-box"  style={styles()}>
      <ul className= "options-box">
        <li onClick={() => deleteItem()}><FaTrash className="menu-icon"/>delete <span>Crtl + D</span></li>
        <li><FaRegFolderOpen className="menu-icon"/>open <span>Crtl + O</span></li>
        <li><FaRegClone className="menu-icon"/>copy <span>Crtl + C</span></li>
        <li><FaPaste className="menu-icon"/>paste <span>Crtl + V</span></li>
        
        
      </ul>
    </div>
  );
}

export default Menu;
