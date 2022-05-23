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
import Prenotazione from '../components/Prenotazione/prenotazione.js'
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
    axios.get(
      "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/Request.php?query=" +
      "SELECT * FROM Film WHERE id IN (SELECT film_id FROM Proiezione)"
    ).then((res) => {
      console.log(res.data/*.results*/);
      setData(res.data/*.results*/);
      requestDati("cinema");
    });

    console.log(datiBottone);
  }, []);

  function requestDati(dato) {
    //passare a questa funzione le cose da mettere nei filtri, tipo se passi cinema ti ritorna tutti i cinema presenti nel db
    axios
      .get(
        'https://87.250.73.22/html/Popa/Cinema/PHP/getCinema.php'
      )
      .then((res) => {
        console.log(res.data);
        setDati(res.data);
      });
  }

  const [datiBottone, setDatiBottone] = useState('');
  
  const infoBottone = (datiB) => {
    setDatiBottone(datiB);
  }
  const moviesList = data.map((movie, i) => (
    <Movie key={i} infos={movie} buttonType={"Prenota"} datiBack={infoBottone}/>
  ))

  const dati = getDati.map((d) => (
    <option id={d.codice} key={d.codice} value={d.codice}>{d.nome}</option>
  ))
  const[filmFiltrati, setFilmFiltrati] = useState([]);
  const[oreFiltrate, setoreFiltrate] = useState([]);
  
  const filmF = filmFiltrati.map((d) => (
    <option id={d.id} key={d.id} value={d.title}>{d.title}</option>
  ))

  const oreF = oreFiltrate.map((d) => (
    <option id={d.id} key={d.id} value={d.id}>{d.oraInizio} - {d.oraFine}</option>
  ))

  function getFilmSelect(){
    
    axios.get(
      "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php?query=" +
      "SELECT * FROM `Film` WHERE `id` IN (SELECT `film_id` FROM `Proiezione` WHERE `Id_Cinema` = '"+document.getElementById("SelCinema").value+"')"
    ).then((res) => {
      setFilmFiltrati(res.data);
    })
  }

  function getOreFilmSel(){
    /*
    axios.get(
      "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php?query=" +
      "SELECT * FROM `Proiezione` WHERE `Id_Cinema` = '"+document.getElementById("SelCinema").value+"' AND `film_id` = '"+document.getElementById("selFilm").value+"'"
    ).then((res) => {
      console.log(res.data)
      setoreFiltrate(res.data);
    })
    */
    console.log("sono dentro")
    let filmTitle = document.getElementById('selFlm').value
    console.log(filmTitle)
    document.cookie = "targettedFilm=" + filmTitle
    window.location.href = "prenota"
  }
  const divisore = {
    width: "95%",
    marginLeft: "1rem",
    marginBottom: "1rem",
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
      <div style={divisore}>
        <Select
          bg='RGBA(0, 0, 0, 0.64)'
          borderColor='#2C7A7B'
          color='white'
          placeholder='Seleziona cinema'
          id="SelCinema"
          onChange={getFilmSelect}
          ml={4}
          mr={4}
        >
          {dati}
        </Select>
        <Select
          bg='RGBA(0, 0, 0, 0.64)'
          borderColor='#2C7A7B'
          color='white'
          placeholder='Film nella sala'
          id="selFlm"
          onChange={getOreFilmSel}
          ml={4}
          mr={4}
        >
          {filmF}
        </Select>

      </div>
      </div>
      <Slider infos={data} />

      <div style={divisore}>
        <Select
          bg='RGBA(0, 0, 0, 0.64)'
          borderColor='#2C7A7B'
          color='white'
          placeholder='Seleziona cinema'
          id="SelCinema"
          onChange={getFilmSelect}
        >
          {dati}
        </Select>

        <Select
          bg='RGBA(0, 0, 0, 0.64)'
          borderColor='#2C7A7B'
          color='white'
          placeholder='Film nella sala'
          id="selFilm"
          onChange={getOreFilmSel}
        >
          {filmF}
        </Select>

        <Select
          bg='RGBA(0, 0, 0, 0.64)'
          borderColor='#2C7A7B'
          color='white'
          placeholder='-'
        >
          {oreF}
        </Select>
      </div>

      <div key={"div-slider"} className='movies__container'>
        {moviesList }
      </div>

      {datiBottone != '' ? (<Prenotazione data={datiBottone} />) : (null)}
    </>
  );
};

export default Home;

