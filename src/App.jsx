import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Addbook from "./Pages/Addbook";
import Updatebook from "./Pages/Updatebook";
import Managebook from "./Pages/Managebook";


const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <div className="col-auto">
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addbook" element={<Addbook />} />
            <Route path="/updatebook/:id" element={<Updatebook />} />
            <Route path="/managebook" element={<Managebook />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
