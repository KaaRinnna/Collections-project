import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";

function App() {

  return (
    <NextUIProvider>
      <div>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>
      </div>
    </NextUIProvider>
  )
}

export default App
