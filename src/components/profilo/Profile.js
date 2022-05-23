import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Grid, GridItem } from '@chakra-ui/react';
import MovieList from "../Movie/MovieList";
import Movie from "../FilmCard/Card";
import axios from "axios";
import MovieCard from "../Movie/MovieCard";

function Profile() {
    const [loggato, setLoggato] = useState(getCookie('username') != '');
    const [favourites, setFavourites] = useState([]);
    const [watched, setWatched] = useState([]);
    const [toWatch, setToWatch] = useState([]);

    useEffect(() => {
        getFavourites()
        console.log(favourites)
        getWatched()
        console.log(watched)
        getToWatch()
        console.log(toWatch)
    }, [])


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

    function getFavourites() {
        console.log("getFavourites")
        let userid = document.cookie.split("username=")[1].split(";")[0];
        //console.log("user = " + userid);
        axios
            .get(
                "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/getFavouritesFilms.php?favoriteOf=" + userid
            )
            .then((res) => {
                let datas = res.data;
                if (datas && datas.length > 0) {
                    console.log("dati: \n" + res.data);
                    setFavourites(res.data);
                } else {
                    console.log("data: empty");
                    setFavourites(null);
                }
                console.log("Favourites:")
                console.log(favourites)
            }
            )
    }


    function getWatched() {
        console.log("getWatched")
        let userid = document.cookie.split("username=")[1].split(";")[0];
        //console.log("user = " + userid);
        axios
            .get(
                "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/Request.php?query=" +
                "SELECT DISTINCT B.* " +
                "FROM Biglietto AS B INNER JOIN Proiezione AS P " +
                "WHERE B.cliente_id='" + userid + "' AND P.data<NOW()"
            )
            .then((res) => {
                let datas = res.data
                if (datas && datas.length > 0) {
                    console.log("dati: \n")
                    console.log(datas)
                    setWatched(datas)
                } else {
                    console.log("data: empty")
                    setWatched(null)
                }
                console.log("Watched:")
                console.log(watched)
            }
            )
    }


    function getToWatch() {
        console.log("getToWatch")
        let userid = document.cookie.split("username=")[1].split(";")[0];
        //console.log("user = " + userid);
        axios
            .get(
                "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/Request.php?query=" +
                "SELECT DISTINCT B.* " +
                "FROM Biglietto AS B INNER JOIN Proiezione AS P " +
                "WHERE B.cliente_id='" + userid + "' AND P.data>=NOW()"
            )
            .then((res) => {
                let datas = res.data
                if (datas && datas.length > 0) {
                    console.log("dati: \n")
                    console.log(datas)
                    setToWatch(datas)
                } else {
                    console.log("data: empty")
                    setToWatch(null)
                }
                console.log("toWatch:")
                console.log(toWatch)
            }
            )
    }


    return (
        <>
            {loggato ? (
                <Tabs isFitted variant='enclosed'>
                    <TabList>
                        <Tab>Film Preferiti</Tab>
                        <Tab>Film gia visti</Tab>
                        <Tab>Prenotazioni</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {(favourites != null) ? <Grid templateColumns='repeat(5, 1fr)' gap={6}>{favourites?.map((movie, i) => <GridItem><Movie key={"preferiti" + i} infos={movie} backgroundPath={movie.poster_path} /></GridItem>)}</Grid> : <p><strong>No Such Film</strong></p>}
                        </TabPanel>
                        <TabPanel>
                            {(watched != null) ? <Grid templateColumns='repeat(5, 1fr)' gap={6}>{watched?.map((movie, i) => <GridItem><Movie key={"visti" + i} infos={movie} backgroundPath={movie.poster_path} /></GridItem>)}</Grid> : <p><strong>No Such Film</strong></p>}
                        </TabPanel>
                        <TabPanel>
                            {(toWatch != null) ? <Grid templateColumns='repeat(5, 1fr)' gap={6}>{toWatch?.map((movie, i) => <GridItem><Movie key={"da vedere" + i} infos={movie} backgroundPath={movie.poster_path} /></GridItem>)}</Grid> : <p><strong>No Such Film</strong></p>}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            ) : (window.location.href = '/')}
        </>
    );
}

export default Profile;
