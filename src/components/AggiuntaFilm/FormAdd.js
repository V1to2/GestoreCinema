import React from 'react';
import { useState, useEffect } from 'react';
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
import Modal from './Modal.js';


const Home = () => {
    const [data, setData] = useState([]);
    const [getDati, setDati] = useState([]);

    useEffect(() => {
        requestDati();
        
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


    const dati = getDati.map((d) => (
        <option value={d.nome}>{d.nome}</option>
    ))

    const divisore = {
        paddingTop: "3rem",
        width: "95%",
        marginLeft: "3rem",
        display: "flex",

    };

    const [datiIns, setDatiIns] = useState('');

    const cinemaSale = (data) => {
        setDatiIns(data);
    }

    return (
        <>
            <Modal cinemaSale={cinemaSale} />
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
        </>
    );
};

export default Home;

