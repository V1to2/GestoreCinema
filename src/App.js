import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid, 
  theme,
} from '@chakra-ui/react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages';
import About from './pages/about.js';
import Login from './pages/Login.js';
import Profilo from './pages/profilo.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="Login" element={<Login />} />
      <Route path="profilo" element={<Profilo />} />
    </Routes>
    </ChakraProvider>
  );
}
  
export default App;