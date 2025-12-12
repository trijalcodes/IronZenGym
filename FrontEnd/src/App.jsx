import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Member from './General/Member'
import Contact from './General/Contact'
import Home from './General/Home'
import Login from './General/Login'
import Picturegallery from './General/Picturegallery'
import ForgotPassword from './General/Forgotpassword'
import VideoGallery from './General/VideoGallery'
import Review from './General/Review'

import Dashboard from './admin/src/pages/Dashboard'
import ContactManagement from './admin/src/pages/ContactManagement'
import MemberManagement from './admin/src/pages/MemberManagement'
import PlanManagement from './admin/src/pages/PlanManagement'
import ChangePassword from './admin/src/pages/ChangePassword'
import ReviewManagement from './admin/src/pages/ReviewManagement'
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://ironzengym-1.onrender.com";


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/member' element={<Member/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/Picturegallery' element={<Picturegallery/>}></Route>
      <Route path='/VideoGallery' element={<VideoGallery/>}></Route>
      <Route path='/Forgotpassword' element={<ForgotPassword/>}></Route>
      <Route path='/review' element={<Review/>}></Route>
      <Route path='/Dashboard' element={<Dashboard/>}></Route>
      <Route path='/ContactManagement' element={<ContactManagement/>}></Route>
      <Route path='/MemberManagement' element={<MemberManagement/>}></Route>
      <Route path='/PlanManagement' element={<PlanManagement/>}></Route>
      <Route path='/ChangePassword' element={<ChangePassword/>}></Route>
      <Route path='/review-management' element={<ReviewManagement/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
  )
}

export default App