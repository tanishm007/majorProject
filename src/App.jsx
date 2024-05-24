import { useState } from 'react'

import './App.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import {BrowserRouter, Router, Routes, Route} from "react-router-dom"
import GoogleAuth from './pages/googleauth';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './component/header';
import TopBanner from './component/head';

import Admin from './pages/admin';
import Login from './pages/login';
import Carda from './pages/card'
import CardGenerate from './pages/cardGenerate';




function App() {




  return (
    <>      
      
      <BrowserRouter>
      <Routes>
      <Route path="/student-login" element={<Header />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/card-generate" element={<CardGenerate />} />
        <Route path="/adminsuccess" element={<Admin />} />
        <Route path="/student" element={<Carda />} />
       
      
      </Routes>
      </BrowserRouter>
    
     

    
   
  </>

  )
}

export default App
