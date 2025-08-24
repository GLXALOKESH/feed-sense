import { useState } from 'react'
import './App.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.jsx';
import Incomingcall from './pages/Incomingcall.jsx';
import Activecall from './pages/Activecall.jsx';  
import Callsummery from './pages/Callsummery.jsx';
import Callshistory from './pages/Callhistory.jsx'; 
import Transcript from './pages/Transcript.jsx';
import Profilesetting from './pages/Profilesetting.jsx';
import Landing from './pages/Landing.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
   {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/incomingcall",
    element: <Incomingcall />,
  },
  {
    path: "/activecall",
    element: <Activecall />,
  },
  {
    path: "/callsummery",
    element: <Callsummery />,
  },
  {
    path: "/callhistory",
    element: <Callshistory />,
  },
  {
    path: "/transcript",
    element: <Transcript />,
  },
{
    path: "/profilesetting",
    element: <Profilesetting />,
  },

  
]);

function App() {

  return (
    <>
     <RouterProvider router={router} />,
    </>
  )
}

export default App
