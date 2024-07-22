import React from "react";
import Navbar from "../Navpage/Navbar";
import "./Homepage.css";

function Homapage() {
  return (
    <>
      <div className="wrap">
        <Navbar />
        <div className="container">
          <img src="./images/com_asset.PNG" alt="images" />
          <div className="detail">
            <h1>INSTANT MESSAGING</h1>
            <h1>SEAMLESS DELIVERY</h1>
            <p>
              Connect with family and friend and prospect semless without
              sharing personal contact information. Nothing to download!
            </p>
            <div className="buttons-container">
              <button type="text" className="btn">
                Create chat
              </button>
              <button type="text" className="btn btn2">
                Join Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homapage;
