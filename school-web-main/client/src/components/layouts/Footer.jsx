import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/LogoAndOthers/TeritaryLogo.png"; // Adjust the path accordingly
import { useState } from "react";
import Modal from 'react-modal';
import { useAlert } from "react-alert";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";
import Partner from "../../assets/Images/Fotter/Partner1.jpg"
import { IoMdClose } from "react-icons/io";



const Footer = () => {


  const links = [
    { title: "About Us", to: "/OurTeam" },
    { title: "Admissions", to: "/admissions" },
    { title: "Academics", to: "/academics" },
    { title: "Parents Portal", to: "/parents-portal" },
    { title: "Admin login", to: "/login" },  // Updated path to /login
    // { title: "Quick Links", to: "/FilesContainer" },
  ];
  const links2 = [
    { title: "Calender & Schedules", to: "/calendar" },
    { title: "Career", to: "/career" },
  ];

  const [isModalOpen,setIsModalOpen]=useState(false)
  const [secretKey,setSecretKey]=useState("")
  const navigate=useNavigate()
  const alert=useAlert()
  const [isSecretKeyVisible,setIsSecretKeyVisible]=useState(false)

  const handleSubmit=(e)=>{
    e.preventDefault()

    if(secretKey.toLocaleLowerCase() === process.env.AdminSecretKey.toLocaleLowerCase()){

      alert.success(`Admin access granted`)
      setIsModalOpen(false);
      setSecretKey("")
      navigate("/login")
    }else{
      alert.error(`Admin access denied`)
      setIsModalOpen(false)
      return;
    }

  }

  return (
  <>
  
  <div className="bg-secondary p-4 md:p-10 text-[12px] text-white lg:py-10 tracking-wide">
      <div className="lg:grid grid-cols-4 md:gap-20 space-y-10 md:space-y-0">
        <div className="mb-10 md:mb-0 lg:flex items-center justify-start">
          <img src={logo} className="w-[300px]" alt="" />
        </div>
        <div className="space-y-4">
          <div className="">
            <p className="lg:text-justify">
            CP/HK/Mathurata Maha Vidyalaya, Mathurata, Nuwara-Eliya 20748
            </p>
            <Link
              className="hover:ml-2 transition-all duration-200"
              target="_blank"
              to={
                "https://www.google.com/maps/dir//3RJ2%2B4W8,+Mathurata/@7.0802716,80.7199177,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ae37e04bfffffff:0x36554e3060bf0d4!2m2!1d80.80232!2d7.0802785?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
              }
            >
              Direction &gt;
            </Link>
          </div>
          <div className="space-y-0">
            <span className="block">PH : 011-4596357</span>
            <span className="block">Mobile : 0717686685</span>
            <Link
            className="hover:ml-2 transition-all duration-200"
            to="tel:+918884300400"  
            >
             Call Us &gt;
            </Link>
          </div>
        </div>
        <div>
          <ul className="space-y-3">
            {links.map((link, index) => (
              <li key={index} className="text-start">
                {typeof link === "object" ? (
                <Link
                to={link.title !== "Admin login" && link.to}
                onClick={link.title === "Admin login" ? () => setIsModalOpen(true) : undefined}
                className="after:bg-white after:scale-0 hover:after:scale-100 after:h-[2px] after:origin-center after:block after:transition-all after:duration-300 after:rounded-lg inline-block"
              >

{link.title}                  
</Link>
                ) : (
                  <span>{link}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="space-y-3">
            {links2.map((link, index) => (
              <li key={index} className="text-start">
                {typeof link === "object" ? (
                  <Link
                    to={link.to}
                    className="after:bg-white after:scale-0 hover:after:scale-100 after:h-[2px] after:origin-center after:block after:transition-all after:duration-300 after:rounded-lg inline-block"
                  >
                    {link.title}
                  </Link>
                ) : (
                  <span>{link}</span>
                )}
              </li>
            ))}
            {/* <img src={Partner} alt="" className="w-[8rem]"/> */}
          </ul>
        </div>
      </div>
          
      <div className="space-y-2 md:flex items-center justify-between mt-5">
        <p>
          &copy; Mathurata Maha Vidyalaya 2025 | All rights reserved | Legal Notice.
        </p>
        <p>Developed by <a
            href="https://github.com/Vithurshanan/Community_project"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200"
          >
            WhiteHackz-SUSL
          </a></p>
      </div>
    </div>

    <Modal 
    
    isOpen={isModalOpen}
    shouldCloseOnOverlayClick={true}
    style={{
      overlay: {
        zIndex: 98,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
      },
      content: {
        width: '90%', // Adjust the width for small screens
        maxWidth: '600px',
        height: '40vh', // Set height to auto for responsiveness
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'column',
        color: '#580B57',
        overflowY: 'auto', // Enable vertical scrolling
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        border: 'none',
        outline: 'none',
        backgroundColor:`rgba(255,255,255,0.2)`,
      },
    }}

    >

<form onSubmit={handleSubmit} className="flex items-center justify-center flex-col gap-5">
<button
title="Close"
        className="absolute top-5 right-5 cursor-pointer font-semibold text-3xl text-white"
        onClick={() => setIsModalOpen(false)}
      >
        <IoMdClose />
      </button>
<h2 className="font-semibold tracking-wider text-white underline underline-offset-4 text-2xl">Admin Login</h2>
<div className="flex items-center justify-center bg-white py-1 px-4 rounded-md">
<input
  type={isSecretKeyVisible ? "text" : "password"}
  placeholder="Enter secret key"
  className="rounded-md border-none outline-none"
  style={{   
    backgroundColor: "transparent",
    border:"0px solid"
  }} 
  onChange={(e) => setSecretKey(e.target.value)}
/>
{!isSecretKeyVisible ? <RiEyeCloseFill onClick={()=>setIsSecretKeyVisible(!isSecretKeyVisible)} className="hover:cursor-pointer"/> :<FaEye onClick={()=>setIsSecretKeyVisible(!isSecretKeyVisible)} className="hover:cursor-pointer"/>}
</div>
<button title="Submit" className="bg-ctcPrimary text-white px-4 py-2 rounded-full font-semibold tracking-wide transition-all ease-in-out duration-800" type="submit">Submit</button>

</form>

    </Modal>
  </>
  );
};

export default Footer;
