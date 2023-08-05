import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import router from './App.routes';
import { RouterProvider } from 'react-router-dom';
function App() {
 

  return (
  
       <RouterProvider router={router}></RouterProvider>
    
  )
}

export default App
