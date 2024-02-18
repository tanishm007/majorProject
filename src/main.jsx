import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="838910828839-9hob3eevlvg5vrhfdsrr30se04rgaht9.apps.googleusercontent.com">
 
      <App />
  
    </GoogleOAuthProvider>
    
  </React.StrictMode>
)
