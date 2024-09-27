import React, { useEffect } from 'react'
import Navbar from '../Navpage/Navbar'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Blog() {
     useEffect(()=>{
      AOS.init()
     },[])
  return (
    <>
    <div className="wrap">
        <Navbar />
        <div className="banner">
          <h1>Your Most Secure platform for Communication </h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla praesentium quisquam minima, eveniet obcaecati corporis laboriosam ad omnis fuga deserunt.</p>
        </div>
        <div className="container">
          <img src="/images/power_prospects.png" alt="images"  data-aos="zoom-in-left"/>
          <div className="detail" data-aos="flip-left">
           
            <h1>Nothing to Download</h1>
            <p>
             We bring to you intantchat, Start chatting right away securely with our state-of-the art encryption technology. No need to share personal information
            </p>
         
          </div>
        </div>
        <div className="container container1">
          <img src="./images/42d7baea65bda709709bb1f1ed60e886.png" alt="images"  data-aos="zoom-in-left"/>
          <div className="detail" data-aos="flip-left">
            <h1>Join with just a scan</h1>
            <p>
             We bring to you intantchat, Start chatting right away securely with our state-of-the art encryption technology. No need to share personal information
            </p>
          </div>
        </div>
        <div className="container">
          <img src="./images/no_bot_asset.PNG" alt="images"  data-aos="zoom-in-left"/>
          <div className="detail" data-aos="flip-left">
           
            <h1>Nothing to Download</h1>
            <p>
             We bring to you intantchat, Start chatting right away securely with our state-of-the art encryption technology. No need to share personal information
            </p>
       
          </div>
        </div>
      </div>
    </>
  )
}


export default Blog