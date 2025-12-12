import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gradient-to-r from-red-900 via-black to-blue-900 text-white py-10 px-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.1 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-yellow-400">About IronZen</h2>
          <p className="text-gray-400 text-sm">
            IronZen is a modern gym and yoga center offering premium fitness experiences, professional trainers,
            and peaceful yoga sessions. We help you stay strong, fit, and mindful.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-yellow-400">Quick Links</h2>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="/Picturegallery" className="hover:text-yellow-400 transition">Picture Gallery</a></li>
            <li><a href="/VideoGallery" className="hover:text-yellow-400 transition">Video Gallery</a></li>
            <li><a href="/contact" className="hover:text-yellow-400 transition">Contact Us</a></li>
            <li><a href="/member" className="hover:text-yellow-400 transition">Become a Member</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-yellow-400">Contact</h2>
          <p className="flex items-center text-sm text-gray-300 mb-2">
            <FaPhone className="mr-2 text-yellow-400" /> ‪‪+91 98765 43210‬‬
          </p>
          <p className="flex items-center text-sm text-gray-300 mb-4">
            <FaEnvelope className="mr-2 text-yellow-400" /> info@ironzenfit.com
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="‪https://facebook.com‬" className="text-gray-300 hover:text-yellow-400 transition"><FaFacebookF /></a>
            <a href="‪https://instagram.com‬" className="text-gray-300 hover:text-yellow-400 transition"><FaInstagram /></a>
            <a href="‪https://youtube.com‬" className="text-gray-300 hover:text-yellow-400 transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Main copyright line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} IronZen Fitness. All rights reserved.
      </div>

      {/* Developer credit */}
      <div className="mt-2 text-center text-xs text-gray-400 italic">
        Developed by ©TRIJAL SHUKLA – Government Polytechnic Shahjahanpur<br />
        Within the Guidance of ER. Akhilesh Kumar (Executive Director)<br/>Mecatredz Technology Private Limited<br/> AN ISO 9001: 2015 CERTIFIED COMPANY.
      </div>
    </motion.footer>
  );
};

export default Footer;
