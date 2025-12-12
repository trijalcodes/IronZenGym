import React from 'react'
import LogoImage from '../assets/images/logo.png'
const Navbar = () => {
  return (
    
    <div className="navbar bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="avatar">
  <div className="w-24 rounded">
    <img src={LogoImage} />
  </div>
</div>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        
      <li><a href='/'>Home</a></li>
      <li><a href='/contact'>Contact us</a></li>
      <li><a href='/Picturegallery'>Picture Gallery</a></li>
      <li><a href='/VideoGallery'>Video Gallery</a></li>
      <li><a href='/member'>Become a Member</a></li>
      <li><a href='/login'>Login</a></li>
      </ul>
    </div>
    <a href='/' className="btn btn-ghost text-xl">IRON-ZEN</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a href='/'>Home</a></li>
      <li><a href='/contact'>Contact us</a></li>
      <li><a href='/Picturegallery'>Picture Gallery</a></li>
      <li><a href='/VideoGallery'>Video Gallery</a></li>
      <li><a href='/member'>Become a Member</a></li>
      <li><a href='/login'>Login</a></li>
      
    </ul>
  </div>
  <div className="navbar-end">
    
  </div>
</div>
  )
}

export default Navbar