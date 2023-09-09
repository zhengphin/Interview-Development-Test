import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'

function App() {
 // Initialize a state variable to store the page title
 const [pageTitle, setPageTitle] = useState('Home Page');

 // Use useEffect to update the page title based on the current route
 useEffect(() => {
   const currentPath = window.location.pathname;

   switch (currentPath) {
     case '/profile':
       setPageTitle('Profile Page');
       break;
     case '/message':
        setPageTitle('Message Page');
        break;
      case '/settings':
          setPageTitle('Settings Page');
          break;
     // Add more cases for other routes
     default:
       setPageTitle('Home Page');
       break;
   }
 }, []);
  return (
    <>
 <div className="App">
      <Sidebar />
      <main className="content">
      <h1>{pageTitle}</h1>
    <BrowserRouter>
      <Routes>
      <Route path="/profile" element={<Login/>} />
      <Route path="/" element={<Home/>} />

      </Routes>
    </BrowserRouter>
      </main>
    </div>
    </>
  )
}

export default App
