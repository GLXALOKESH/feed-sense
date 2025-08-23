import { useState } from 'react'
import './App.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Signup from './Communication/pages/Signup';
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "/communication/signup",
    element: <Signup />,
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
