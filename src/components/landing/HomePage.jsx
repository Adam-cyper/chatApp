import React, { useEffect, useState } from 'react'
import Navbar from '../Navpage/Navbar'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Modal from '../Modal';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <>
    <div className="wrap">
        <Navbar />
        <div className="container">
          <img src="/images/no_bot_asset.png" alt="images"  data-aos="zoom-in-left"/>
          <div className="detail" data-aos="flip-left">
            <h1>Instant Messaging</h1>
            <h1>Seamless Delivery</h1>
            <p>
            Connect with family and friend and prospect semless without
            sharing personal contact information. Nothing to download!
            </p>
            <div className="buttons-container">
              <button onClick={() => setIsModalOpen(true)} type="text"  className="btn" >
                + New Group
              </button>
              <button type="text" className="btn btn2 btn3">
              <Link to={"/chat"}>Join Group</Link>
              </button>
            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
        
      </div>
    </>
  )
}

export default HomePage