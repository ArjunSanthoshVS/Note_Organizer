import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Create from "./pages/Create";
import View from "./pages/View";
import Edit from "./pages/Edit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
        <Route path="/edit/:data" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
