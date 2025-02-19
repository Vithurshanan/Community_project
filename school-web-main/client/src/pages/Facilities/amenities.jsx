import React from 'react';
import { motion } from 'framer-motion';
import image1 from "../../assets/Images/FacilitiesImages/Amenities/transport.jpg";
import image2 from "../../assets/Images/FacilitiesImages/Amenities/New/Library.jpg";
import image3 from "../../assets/Images/FacilitiesImages/Amenities/SportsGround.jpg";
import image4 from "../../assets/Images/FacilitiesImages/Amenities/New/Chemistry.jpg";
import image5 from "../../assets/Images/FacilitiesImages/Amenities/sportsarea.jpg";
import image6 from "../../assets/Images/FacilitiesImages/Amenities/ComputerLab.jpg"
import image7 from "../../assets/Images/FacilitiesImages/Amenities/New/Classroom.jpg";
import image8 from "../../assets/Images/FacilitiesImages/Amenities/security.jpg";
import image9 from "../../assets/Images/FacilitiesImages/Amenities/music.jpg";
import image10 from "../../assets/Images/FacilitiesImages/Amenities/art.jpg";
import image11 from "../../assets/Images/FacilitiesImages/Amenities/New/Math.jpg";
import image12 from "../../assets/Images/FacilitiesImages/Amenities/scouts.jpg";
import { Link } from "react-router-dom";

const FacilityCard = () => {
  const facilities = [
    {
      id: 1,
      title: 'Transport',
      image: image1,
      description: 'Experience comfortable and secure transportation services for our students.',
      link: '/TransportPage',
    },
    {
      id: 2,
      title: 'Computer Lab',
      image: image6,
      description: 'Explore the world of technology in our state-of-the-art computer lab.',
      link: '/ComputerPage',
    },
    {
      id: 3,
      title: 'Sports',
      image: image3,
      description: 'Engage in various sports activities and stay fit in our modern sports ground.',
      link: '/sports',
    },
    {
      id: 4,
      title: 'Classroom',
      image: image7,
      description: 'Experience interactive learning and a conducive environment in our classrooms.',
      link: '/Classroom',
    },
    {
      id: 11,
      title: 'Houses',
      image: image5,

      description: 'Promote healthy competition to learn and dream big',

      link: '/Houses',
    },
    {
      id: 5,
      title: 'Science Laboratory',
      image: image4,
      description: 'Conduct experiments and explore the world of chemistry in our well-equipped laboratory.',
      link: '/ScienceLab',
    },
    {
      id: 6,
      title: 'Student Safety',
      image: image8,
      description: 'Students behavior not in the moments of comfort and convenient but to stand at times of  challenges.',
      link: '/Security',
    },
    {
      id: 7,
      title: 'Library',
      image: image2,
      description: 'Immerse yourself in a world of knowledge and literature in our spacious library.',
      link: '/Library',
    },
    {
      id: 8,
      title: 'Music',
      image: image9,


      description: 'Unleash your musical talents and creativity in our dedicated music classroom.',

      link: '/Music',
    },
    {
      id: 9,
      title: 'Art',
      image: image10,
      description: 'Unveil your artistic talents and express yourself in our vibrant art studio.',
      link: '/Art',
    },
    {
      id: 10,
      title: 'Scout and Guide',
      image: image12,
      description: 'Teaches the students to take care of themselves and stand on their own feet',
      link: '/ScoutsAndGuide',
    },
    
    {
      id: 12,
      title: 'MATH LAB',
      image: image11,
      description: 'Teaching  equations to acquire more concepts and converse with the cosmos.',
    },
  ];

  return (
    <div className="container mx-auto mt-10 py-10 text-textSecondary">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        className="text-center align-center items-center font-semibold font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase lg:text-center mb-5"
      >
        Amenities
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        className="text-start mx-auto max-w-2xl font-sans mb-10 text-[16px] sm:text-[18px] sm:text-center px-4 tracking-wide"
      >
        Explore our exceptional amenities at Mathurata Maha Vidyalaya, enhancing student life with a modern swimming pool for relaxation and fitness, and a state-of-the-art sports arena for diverse activities.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 lg:px-[150px]">
        {facilities.map((facility) => (
          <div
            key={facility.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <div className="relative">
              <img src={facility.image} alt={facility.title} className="w-full h-48 object-fill" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <Link
                  to={facility.link || '#'}
                  className="text-white font-semibold py-2 px-4 rounded-md bg-secondary hover:bg-ctcPrimaryLight transition duration-300"
                >
                  Know More
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{facility.title}</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityCard;