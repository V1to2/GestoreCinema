import React from 'react';
import { useState, useEffect } from 'react';
import Movie from '../components/FilmCard/Card';
import '../components/FilmCard/css.sass';
import Slider from '../components/Sliders.js';
import axios from 'axios';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Select,
} from '@chakra-ui/react'
import { reactToString } from 'rsuite/esm/utils';
import { pad } from 'lodash';
import { Route } from 'react-router-dom';
import CinemaProiezione from '../components/FilmCard/DetailsPopup'

const BASE_URL = "https://api.themoviedb.org/3";
const api_key = '629cebc2d8655797238b9c58281509ae';
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;


const Home = () => {
  const [data, setData] = useState([]);
  const [getDati, setDati] = useState([]);
  const api = axios.create({ baseURL: BASE_URL });


  const getUpcoming = api.get("movie/upcoming", {
    params: { api_key }
  });

  useEffect(() => {
    getUpcoming.then((res) => {
      console.log(res.data.results);
      setData(res.data.results);
      requestDati("cinema");
    });
  }, []);

  function requestDati(dato) {
    //passare a questa funzione le cose da mettere nei filtri, tipo se passi cinema ti ritorna tutti i cinema presenti nel db
    axios
      .get(
        'https://87.250.73.22/html/Popa/Cinema/PHP/getCinema.php'
      )
      .then(res => {
        console.log(res.data);
        setDati(res.data);
      });
  }

  const [datiBottone, setDatiBottone] = useState([]);
  
  const infoBottone = (datiB) => {
    setDatiBottone(datiB);
  }
  const moviesList = data.map((movie, i) => (
    <Movie key={i} infos={movie} backgroundPath={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} datiBack={infoBottone}/>
  ))

  const dati = getDati.map((d) => (
    <option value={d.nome}>{d.nome}</option>
  ))

  const divisore = {
    paddingTop: "3rem",
    width: "95%",
    marginLeft: "3rem",
    display: "flex",

  };

  const prenotazioneRapida = {
    width: "100%",
    display: "flex",
    alignitems: "center",
    position: "fixed",
    backgroundColor: "#C05621",
    bottom: "0",
    zIndex: "7",
    borderRadius: "0px 20px 0px 0px",
    paddingTop: "1.2rem",
  }
  return (
    <>



      <div style={prenotazioneRapida}>
        <p>psadpasdaspdasd</p>
      </div>
      <Slider infos={data} />

      <div style={divisore}>
        <Select
          bg='RGBA(0, 0, 0, 0.64)'
          borderColor='#2C7A7B'
          color='white'
          placeholder='Seleziona cinema'
        >
          {dati}
        </Select>

        <Select
          bg='RGBA(0, 0, 0, 0.64)'
          borderColor='#2C7A7B'
          color='white'
          placeholder='Posti liberi'
        >
          {dati}
        </Select>

        <Select
          bg='RGBA(0, 0, 0, 0.64)'
          borderColor='#2C7A7B'
          color='white'
          placeholder='-'
        >
          {dati}
        </Select>
      </div>

      <div className='movies__container'>
        {moviesList }
      </div>
    </>
  );
};

export default Home;

