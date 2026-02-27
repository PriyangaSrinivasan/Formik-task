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
      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
          background: #0f0f13;
        }
        .app-content {
          flex: 1;
          overflow: auto;
          display: flex;
          flex-direction: column;
        }
        /* On mobile, Navbar renders a top bar OUTSIDE the flex row,
           so the content must stack below it instead of beside it */
        @media (max-width: 768px) {
          .app-layout {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="app-layout">
        {/* Sidebar on desktop / Top bar on mobile */}
        <Navbar />

        {/* Page content */}
        <div className="app-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addbook" element={<Addbook />} />
            <Route path="/managebook" element={<Managebook />} />
            <Route path="/updatebook/:id" element={<Updatebook />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
