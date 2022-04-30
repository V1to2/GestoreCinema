import React from "react";
import { useState, useEffect } from 'react';
import Movie from '../components/FilmCard/Card';
import '../components/FilmCard/css.sass';
import axios from 'axios';
import Form from "../components/AggiuntaFilm/FormAdd.js"
import ModalConferma from "../components/AggiuntaFilm/ModalAddSale.js"
import ModalAddFilm from "../components/AggiuntaFilm/ModalAddFilm.js"
import Login from "../components/Login/login.js"
const BASE_URL = "https://api.themoviedb.org/3";
const api_key = '629cebc2d8655797238b9c58281509ae';
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

const About = () => {
    const [data, setData] = useState([]);
    const [getDati, setDati] = useState([]);
    const api = axios.create({ baseURL: BASE_URL });
    const [permessi, setPermessi] = useState([]);
    const [flag, setFlag] = useState([]);
    const [loggato, setLoggato] = useState([]);
    const [openModalC, setOpenModalC] = useState(false);
    const [OpenModalAddFilm, setOpenModalAddFilm] = useState(false);

    function getCookie(cname) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }


    useEffect(() => {
        if (getCookie('username') != '') {
            if (flag == 0 && getCookie('permessi') != '') {
                setPermessi(getCookie("permessi"))
                setFlag(1);
                setLoggato(true);
            }
        } else {
            setLoggato(false);
        }

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
        axios
            .get(
                'https://87.250.73.22/html/Popa/Cinema/PHP/getExistingFilm.php?title=' + datiB.title
            )
            .then(res => {
                console.log(res.data);
                if (res.data == true) {
                    setOpenModalC(true);
                } else {
                    setOpenModalAddFilm(true);
                }
            });
    }

    const closeMod = () => {
        setOpenModalC(false);
    }
    const closeMod2 = () => {
        setOpenModalAddFilm(false);
    }
    const aggiunto = () => {
        setOpenModalAddFilm(false);
    }

    const moviesList = data.map((movie, i) => (
        <Movie key={i} buttonType={"Aggiungi"} infos={movie} backgroundPath={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} datiBack={infoBottone} />
    ))

    return (
        <>
            {loggato ? (<Form />) : <Login open={true} redirect={"addFilm"} />}
            {openModalC ? (<ModalConferma datiSale={datiBottone} open={true} closeBack={closeMod} />) : (null)}
            {OpenModalAddFilm ? (<ModalAddFilm data={datiBottone} open={true} aggiunto={aggiunto} closeBack={closeMod2}/>) : (null)}

            <div className='movies__container'>
                {moviesList}
            </div>
        </>
    );
};

export default About;