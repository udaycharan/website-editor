import Editor from "./components/Editor.jsx";
import HomePage from "./components/LandingPage";
import {BrowserRouter as Router, Routes, Route}  from "react-router-dom";

function App() {
  
 
  return (
    <div className="App" >

     <Router>
        <Routes>
          <Route  path="/" element={<HomePage/>} />
          <Route  path="/editor" element={<Editor/>} />
        </Routes>
      </Router>
 
    </div>
  );
}

export default App;
