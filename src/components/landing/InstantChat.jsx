import React, { useEffect } from 'react'
import Navbar from '../Navpage/Navbar'
import AOS from 'aos';
import 'aos/dist/aos.css';

function InstantCaht() {
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <>
    <div className="wrap">
        <Navbar />
        <div className="container">
          <img src="./images/no_bot_asset.PNG" alt="images"  data-aos="zoom-in-left"/>
          <div className="detail" data-aos="flip-left">
            <h1>Premium Chat</h1>
            <h1>Nothing to Download</h1>
            <p>
             We bring to you intantchat, Start chatting right away securely with our state-of-the art encryption technology. No need to share personal information
            </p>
            <div className="buttons-container">
              <button type="text" className="btn">
                + New Meeting
              </button>
              <button type="text" className="btn btn2 btn3">
                Join Meeting
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default InstantCaht