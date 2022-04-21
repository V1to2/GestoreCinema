import React from "react";
import { useState, useEffect } from 'react';
import Movie from '../components/FilmCard/Card';
import '../components/FilmCard/css.sass';
import axios from 'axios';
import Form from "../components/AggiuntaFilm/FormAdd.js"

const BASE_URL = "https://api.themoviedb.org/3";
const api_key = '629cebc2d8655797238b9c58281509ae';
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

const About = () => {
    const [data, setData] = useState([]);
    const [getDati, setDati] = useState([]);
    const api = axios.create({ baseURL: BASE_URL });


    useEffect(() => {
        getUpcoming.then((res) => {
            console.log(res.data.results);
            setData(res.data.results);
        });
    }, []);

    const getUpcoming = api.get("movie/upcoming", {
        params: { api_key }
    }); 
    
    const [datiBottone, setDatiBottone] = useState([]);
  
    const infoBottone = (datiB) => {
      setDatiBottone(datiB);
    }

    const moviesList = data.map((movie, i) => (
        <Movie key={i} infos={movie} datiBack={infoBottone} />
    ))

    return (
        <>
            <Form />


            <div className='movies__container'>
                {moviesList}
            </div>
        </>
    );
};

export default About;