import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./pages/Profile.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <NextUIProvider>
      <div>
        <Router>
            <Routes>
                <Route path="/" element={<Profile/>}/>
            </Routes>
        </Router>
      </div>
    </NextUIProvider>
  )
}

export default App
