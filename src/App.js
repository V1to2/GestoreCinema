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
import AddFilm from './pages/addFilm.js';
import CinemaProiezione from './components/FilmCard/DetailsPopup'
import Register from './pages/registrazione.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="profilo" element={<Profilo />} />
        <Route path="addFilm" element={<AddFilm />} />
        <Route path="registrazione" element={<Register />} />

      </Routes>
    </ChakraProvider>
  );
}

export default App;