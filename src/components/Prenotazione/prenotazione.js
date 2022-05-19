import React, { useEffect, useState } from "react"
import './style.css'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    useDisclosure,
    Box,
    Avatar,
    HStack,
    StackDivider,
    Grid,
    GridItem
} from '@chakra-ui/react'
import axios from "axios"
import Sala from "../Sala/Sala"


function getCookie(nome) {
    let cookies = document.cookie.split(";")
    for (let index = 0; index < cookies.length; index++) {
        let target = cookies[index]
        if (target.split("=")[0].replace(" ", "") == nome)
            return target.split("=")[1]
    }
    return -1
}


function destroyCookie(nome) {
    document.cookie = nome + '=; Max-Age=-99999999;';
}

function ChooseFilm(props) {
    const [films, setFilms] = useState([])

    return (
        <></>
    )
}

export default function About() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ sale, setSale ] = useState([])
    const [showSala, setShowSala] = useState(false)
    const btnRef = React.useRef()


    function getSaleFromDB() {
        let tit = getCookie("targettedFilm")
        console.log("cookie: " + tit)
        axios.get(
            "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/Request.php?query=" +
            "SELECT S.nome AS nomeSala, S.cinema_id, C.nome AS nomeCinema, P.data, P.oraInizio, P.oraFine " +
            "FROM Proiezione AS P INNER JOIN Sala AS S ON P.sala_id=S.nome INNER JOIN Cinema AS C ON C.codice=P.id_Cinema " +
            "WHERE P.film_id=(SELECT id FROM Film WHERE title='" + tit + "')"
        ).then((res) => {
            console.log("sale:")
            console.log(res.data)
            setSale(res.data)
        })
        return true
    }

    useEffect(() => {
        onOpen(true)
        getSaleFromDB()
    }, [onOpen])

    function selectedSala(data){
        console.log(data)
        setShowSala(data)
    }

    return (
        <>
            <Drawer size={'xl'} isOpen={isOpen} placement='left' finalFocusRef={btnRef} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Seleziona una sala</DrawerHeader>
                    { sale?.map((s)=>{ return <Grid onClick={()=>{selectedSala(s); onClose(true)}} templateColumns={"repeat(5, 1fr)"} key={"voceSala-" + s.nomeSala + s.data + s.oraInizio} p={4} style={{backgroundColor: "hsl(200°, 50%, 45%)"}}><GridItem>{s.nomeCinema}</GridItem><GridItem>{s.nomeSala}</GridItem><GridItem>{s.data}</GridItem><GridItem>{s.oraInizio}</GridItem><GridItem>{s.oraFine}</GridItem></Grid>})}
                    <DrawerBody>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            {showSala ? <Sala cinemaID={showSala.cinema_id} sala={showSala.nomeSala} /> : <></>}
        </>
    )
}
