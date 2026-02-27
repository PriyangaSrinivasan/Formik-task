// import React from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="sidebar d-flex flex-column justify-content-between bg-dark p-4 vh-100">
//       <div>
//         <Link className="d-flex align-items-center">
//           <i className="bi bi-emoji-laughing fs-5 me-2"></i>
//           <span className="fs-4">Admin</span>
//         </Link>
//         <hr className="text-secondary mt-2" />
//         <ul className="nav nav-pills flex-column p-0 m-0">
//           <li className="nav-item p-1">
//             <Link className="nav-link text-white" to="/dashboard">
//               <i className="bi bi-window-dash me-2 fs-5"></i>
//               <span className="fs-5">Dashboard</span>
//             </Link>
//           </li>
//           <li className="nav-item p-1">
//             <Link className="nav-link text-white" to="/addbook">
//               <i className="bi bi-folder-plus me-2 fs-5"></i>
//               <span className="fs-5">Addbook</span>
//             </Link>
//           </li>
//           {/* <li className="nav-item p-1">
//             <Link className="nav-link text-white" to="/updatebook">
//               <i className="bi bi-pencil-square me-2 fs-5"></i>
//               <span className="fs-5">Updatebook</span>
//             </Link>
//           </li> */}
//           <li className="nav-item p-1">
//             <Link className="nav-link text-white" to="/managebook">
//               <i className="bi bi-journal-check me-2 fs-5"></i>
//               <span className="fs-5">Managebook</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//       <div>
//         <hr className="text-secondary" />
//         <i className="bi bi-book fs-5"></i>
//         <span className="fs-4 text-white">Books</span>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <div className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <i className="bi bi-book-half"></i>
          <span>BookShelf</span>
        </div>

        <hr className="sidebar-divider" />

        {/* Nav Links */}
        <ul className="sidebar-nav">
          <li>
            <Link
              to="/dashboard"
              className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`}
            >
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/addbook"
              className={`sidebar-link ${location.pathname === "/addbook" ? "active" : ""}`}
            >
              <i className="bi bi-plus-circle"></i>
              <span>Add Book</span>
            </Link>
          </li>
          <li>
            <Link
              to="/managebook"
              className={`sidebar-link ${location.pathname === "/managebook" ? "active" : ""}`}
            >
              <i className="bi bi-journal-check"></i>
              <span>Manage Books</span>
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="sidebar-footer">
          <i className="bi bi-info-circle"></i>
          <span>v1.0.0</span>
        </div>
      </div>

      {/* ── Mobile Top Bar ── */}
      <div className="mobile-topbar">
        <div className="mobile-logo">
          <i className="bi bi-book-half"></i>
          <span>BookShelf</span>
        </div>
        <button className="hamburger" onClick={() => setMobileOpen(true)}>
          <i className="bi bi-list"></i>
        </button>
      </div>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div className="overlay" onClick={() => setMobileOpen(false)}></div>
      )}

      {/* ── Mobile Drawer ── */}
      <div className={`drawer ${mobileOpen ? "drawer-open" : ""}`}>
        <button className="drawer-close" onClick={() => setMobileOpen(false)}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="sidebar-logo">
          <i className="bi bi-book-half"></i>
          <span>BookShelf</span>
        </div>

        <hr className="sidebar-divider" />

        <ul className="sidebar-nav">
          <li>
            <Link
              to="/dashboard"
              className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/addbook"
              className={`sidebar-link ${location.pathname === "/addbook" ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <i className="bi bi-plus-circle"></i>
              <span>Add Book</span>
            </Link>
          </li>
          <li>
            <Link
              to="/managebook"
              className={`sidebar-link ${location.pathname === "/managebook" ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <i className="bi bi-journal-check"></i>
              <span>Manage Books</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
