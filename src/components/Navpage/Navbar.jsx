import React, { useState }  from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {

const [Responsive, setResponsive]= useState(true)
   
  return (
    <>
      <div className="wrapper">
        <h1>logo</h1>
        <nav>
          <ul className={Responsive ? "active-Navbar navbar" : 'navbar'}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/InstantChat">Instant-chat</Link>
            </li>
            <li>
              <Link to="/Blog">How it Work</Link>
            </li>
          </ul>
        </nav>
        <div className="humburger"  onClick={()=> setResponsive(!Responsive)} >
          <FiMenu />
        </div>
      </div>
    </>
  );
};

export default Navbar;
