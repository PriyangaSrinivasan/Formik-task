import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sidebar d-flex flex-column justify-content-between bg-dark p-4 vh-100">
      <div>
        <Link className="d-flex align-items-center">
          <i className="bi bi-emoji-laughing fs-5 me-2"></i>
          <span className="fs-4">Admin</span>
        </Link>
        <hr className="text-secondary mt-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
          <li className="nav-item p-1">
            <Link className="nav-link text-white" to="/dashboard">
              <i className="bi bi-window-dash me-2 fs-5"></i>
              <span className="fs-5">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link className="nav-link text-white" to="/addbook">
              <i className="bi bi-folder-plus me-2 fs-5"></i>
              <span className="fs-5">Addbook</span>
            </Link>
          </li>
          {/* <li className="nav-item p-1">
            <Link className="nav-link text-white" to="/updatebook">
              <i className="bi bi-pencil-square me-2 fs-5"></i>
              <span className="fs-5">Updatebook</span>
            </Link>
          </li> */}
          <li className="nav-item p-1">
            <Link className="nav-link text-white" to="/managebook">
              <i className="bi bi-journal-check me-2 fs-5"></i>
              <span className="fs-5">Managebook</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-secondary" />
        <i className="bi bi-book fs-5"></i>
        <span className="fs-4 text-white">Books</span>
      </div>
    </div>
  );
};

export default Navbar;
