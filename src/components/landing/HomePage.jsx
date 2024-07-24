import React, { useEffect } from 'react'
import Navbar from '../Navpage/Navbar'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function HomePage() {
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
            <h1>Instant Messaging</h1>
            <h1>Seamless Delivery</h1>
            <p>
            Connect with family and friend and prospect semless without
            sharing personal contact information. Nothing to download!
            </p>
            <div className="buttons-container">
              <button type="text" className="btn">
                + New Meeting
              </button>
              <button type="text" className="btn btn2 btn3">
              <Link to={"/chat"}>Join Meeting</Link>
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default HomePage