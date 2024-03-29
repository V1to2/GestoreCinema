import React from "react";
import {
  ChakraProvider,
  theme,
  Box
} from '@chakra-ui/react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages';
import About from './pages/about.js';
import Profilo from './pages/profilo.js';
import AddFilm from './pages/addFilm.js';
import Register from './pages/registrazione.js';
import Posti from './pages/Sala.js';
import Graph from './components/qr/Grafico'
import Prenotazione from './components/Prenotazione/prenotazione.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Box mb={"15rem"}><Home /></Box>} />
        <Route path="about" element={<About />} />
        <Route path="profilo" element={<Profilo />} />
        <Route path="addFilm" element={<AddFilm />} />
        <Route path="registrazione" element={<Register />} />
        <Route path="sala" element={<Posti />} />
        <Route path="prenota" element={<Prenotazione />} />
        <Route path="qr" element={<Graph />} />

      </Routes>
    </ChakraProvider>
  );
}

export default App;