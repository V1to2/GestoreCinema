import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import MovieList from "../Movie/MovieList";
import Movie from "../FilmCard/Card";
import axios from "axios";
import MovieCard from "../Movie/MovieCard";

function Profile() {
    const [loggato, setLoggato] = useState(getCookie('username') != '');
    const [favourites, setFavourites] = useState([]);

    useEffect(getFavourites, [])


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

    function getFavourites(){
        let userid = document.cookie.split("username=")[1].split(";")[0];
        console.log("user = " + userid);
        axios
        .get(
            "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/getFavouritesFilms.php?favoriteOf="+ userid
        )
        .then((res) => {
                let datas = res.data;
                if(datas != 0 && res.data != null){
                    console.log("dati: \n" + res.data);
                    setFavourites(res.data);
                } else {
                    console.log("data: empty");
                    setFavourites(null);
                }
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
                            {favourites!=null ? favourites.map((movie, i)=><Movie key={i} infos={movie} backgroundPath={movie.poster_path} />) : <p><strong>No Such Film</strong></p>}
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            ) : (window.location.href='/')}
        </>
    );
}

export default Profile;
