import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useQueryMutation } from "../../../Redux/authApi";
import {useAlert} from 'react-alert'

const GetInTouch = () => {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("")

  const [query,{isLoading}] =useQueryMutation()
  const alert=useAlert()


  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{

      const data=await query({name,email,message}).unwrap()
      alert.success(data?.message)

      setName("")
      setEmail("")
      setMessage("")
    }catch(e){

       alert.error(e?.data?.err)

    }
  }


  return (
    <div className="flex flex-col lg:flex-row mt-20 mb-15 p-4 lg:p-10  bg-center tracking-wide">
      <ToastContainer/>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="lg:w-1/2 bg-secondary rounded-lg lg:py-[3rem] lg:px-8 flex flex-col items-start gap-6 shadow-lg p-4 mb-4 text-black "
      >
        <h1 className="text-3xl font-bold text-white">Get in touch!</h1>
        <p className="text-white">
          Whether you have inquiries, suggestions, or would simply like to reach
          out, we welcome the opportunity to engage with you. Our team is here
          to provide the information you need and ensure your experience with us
          is seamless. Reach out today and let&#39;s start a conversation
          towards academic excellence and a promising future.
        </p>
        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
          <input
            className="p-2 pl-3 rounded-md text-black bg-tertiary outline-none font-serif tracking-wide font-semibold"
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            className="p-2 pl-3 rounded-md text-black bg-tertiary outline-none font-serif tracking-wide font-semibold"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}

          />
          <textarea
            className="p-2 pl-3 rounded-md text-black bg-tertiary outline-none font-serif tracking-wider font-semibold"
            type="text"
            name="message"
            placeholder="Message"
            onChange={(e)=>setMessage(e.target.value)}
            rows={5}
            style={{
              resize: "none",
            }}
          />
          <button disabled={isLoading} type="submit" className="bg-ctcSecondary text-ctcPrimary py-2 rounded-sm font-semibold tracking-wider hover:bg-ctcPrimary hover:text-ctcSecondary hover:border hover:scale-95 transition-all duration-400">
            {isLoading?"Submitting...":"Submit"}
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="lg:w-1/2 p-4 lg:p-12 flex flex-col gap-6 text-textSecondary"
      >
        <h2 className=" font-bold text-2xl">Our Location</h2>
        <div className="mt-4 shadow-mb rounded-md">
          <iframe
            title="Google Map"
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d416.1801771458605!2d80.80209792061036!3d7.080072594176758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae37e04bfffffff%3A0x36554e3060bf0d4!2sMathurata%20Maha%20Vidyalaya!5e0!3m2!1sen!2slk!4v1739818275579!5m2!1sen!2slk"
            allowFullScreen=""
          ></iframe>
        </div>

        <p>
          Our campus offers a conducive environment for learning and personal
          growth. Explore the neighborhood, experience our state-of-the-art
          facilities, and feel the vibrant atmosphere that makes our school a
          unique and enriching place for education.
        </p>
        <div className="text-textSecondary">
          <h2 className="text-2xl font-semibold">Social Media</h2>
          <div className="flex gap-3 mt-3">
          <Link to="instagram.com/mys_intl_school">
            <FaInstagram className="text-4xl hover:cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110 hover:text-white p-2 rounded-md instagram-icon"></FaInstagram>
            </Link>
            <Link to="facebook.com/Mysore.Intl.School">
              <FaFacebook className="text-4xl hover:cursor-pointer hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:text-white p-2 rounded-md"></FaFacebook>
            </Link>

            {/* <RiTwitterXLine className="text-4xl hover:cursor-pointer hover:bg-black transition-all duration-300 hover:scale-110 hover:text-white p-2 rounded-md"></RiTwitterXLine> */}
            <Link to="www.youtube.com/@mysoreinternationalschool">
              <BsYoutube className="text-4xl hover:cursor-pointer hover:bg-red-600 transition-all duration-300 hover:scale-110 hover:text-white p-2 rounded-md"></BsYoutube>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GetInTouch;
