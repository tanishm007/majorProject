import React, { PureComponent } from 'react'
import GoogleAuth from '../pages/googleauth'
import './header.css'

function Header() {

    return (
        <div class="header-container cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  

  <main class="px-3">
    <h1>Student E-card Login Portal</h1>
    <p class="lead">Student has to Login with it's official given id Provided by NITJ</p>
    <p class="lead">
      <GoogleAuth></GoogleAuth>
    </p>
  </main>

  <footer class="mt-auto text-white-50">
    <p>Officailly Created by <a href="https://getbootstrap.com/" class="text-white"></a>, by <a href="https://twitter.com/mdo" class="text-white">@NITJ</a>.</p>
  </footer>
</div>
        
    )
  }


export default Header