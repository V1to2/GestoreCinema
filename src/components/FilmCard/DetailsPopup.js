import {   Alert, AlertIcon, AlertTitle, AlertDescription, Box, Grid, GridItem, Button, Stack, HStack, VStack, StackDivider } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Lista(props){
    return (
        <Box>
            <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4} align='stretch'>
                <Grid templateColumns='repeat(6, 1fr)' gap={4}>
                    <GridItem key={"cinema-head"}>Cinema</GridItem><GridItem key={"sala-head"}>Sala</GridItem><GridItem key={"data-head"}>data</GridItem><GridItem key={"inizio-head"}>inizio</GridItem><GridItem key={"fine-head"}>fine</GridItem><GridItem key={"posti-head"}>posti</GridItem>
                    { props.proiezioni.map((pr)=>{ return <><GridItem key={"cinema-" + pr.id}>{pr.nome}</GridItem><GridItem key={"sala-" + pr.id}>{pr.sala_id}</GridItem><GridItem key={"data-" + pr.id}>{pr.data}</GridItem><GridItem key={"inizio-" + pr.id}>{pr.oraInizio}</GridItem><GridItem key={"fine-" + pr.id}>{pr.oraFine}</GridItem><GridItem key={"posti-" + pr.id}>{"Nposti"}</GridItem></>}) }
                </Grid>
                <Link to="/prenota">
                    <Button w={"100%"} mt={3} colorScheme='orange' variant='outline'>
                        Prenota
                    </Button>
                </Link>
            </VStack>
        </Box>
    )
}

function DetailsPopup(props){
    const [listaProiezioni, setlistaProiezioni] = useState(null)
    const [regista, setRegista] = useState([{nome: "not", cognome: "found"}])
    const [durata, setDurata] = useState(0)
    const [postiTot, setPostiTot] = useState(0)
    const [postiLib, setPostiOccupati] = useState(0)

    useEffect(()=>{
        axios
        .get(
            "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/getProiezioniFilm.php?searchFilm_title=" + props.title
        )
        .then((result) => {
            console.log("proiezioni: ")
            console.log(result.data)
            setlistaProiezioni(result.data);
        })
        axios
        .get(
            "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/Request.php?query=" +
            "SELECT regista_nome, regista_cognome, durata FROM Film WHERE title='" + props.title + "'"
        )
        .then((result) => {
            let r = [{nome: result.data[0].regista_nome, cognome: result.data[0].regista_cognome}]
            let d = result.data[0].durata
            console.log("regista:")
            console.log(r)
            console.log("durata:")
            console.log(d)
            setRegista(r)
            setDurata(d)
        })
        axios
        .get(
            "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/Request.php?query=" +
            "SELECT ALL(SELECT COUNT(*) FROM Posto GROUP BY )-COUNT(*) FROM Posto WHERE true"
        )
        .then((result) => {
            let r = [{nome: result.data[0].regista_nome, cognome: result.data[0].regista_cognome}]
            let d = result.data[0].durata
            console.log("regista:")
            console.log(r)
            console.log("durata:")
            console.log(d)
            setRegista(r)
            setDurata(d)
        })
    }, [props.title]);


    const stile = {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        borderRadius: "35px"
    }

    const stilebottone = {
        position: "absolute",
        width: "2.6rem",
        height: "2.6rem",
        top: "-1.3rem",
        right: "-1.3rem"
    }

    const stileimmagine = {
        width: "20rem",
        borderRadius: "5px"
    }

    const stileTesto = {
        margin: "1rem",
        width: "50rem",
        backgroundColor: "#414f67",
        padding: "1rem",
        borderRadius: "15px"
    }

    return(
        <div className="PopupFilm-root" style={stile}>
            <div onClick={props.close} style={stilebottone}>
                <img src="https://www.ilsicomoro.it/js/skins/default/lightbox-close.png" alt="close" draggable={ false } />
            </div>
            <div style={stileimmagine}>
                <img className="PopupFilm-image" width={"100%"} src={props.imgPath} alt={props.originalTitle}/>
            </div>
            <div className="PopupFilm-info" style={stileTesto}>
                <h1 style={ { fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1.5rem" } }> {props.title} </h1>
                <p style={ {margin: "1rem"} }>
                    {props.trama}
                </p>
                <pre style={ {margin: "1rem"} }>
                    Durata:      {durata} min
                </pre>
                <pre style={ {margin: "1rem"} }>
                    Data Di Uscita:      {props.uscita}
                </pre>
                <pre style={ {margin: "1rem"} }>
                    Regista:             {regista[0].nome + " " + regista[0].cognome}
                </pre>
                <Box className="PopupFilm-Proiezioni">
                    { (!(listaProiezioni != null && listaProiezioni.length > 0)) ? <Alert status='warning'><AlertIcon /> We can't find this Film in any Cinema</Alert> : <Lista proiezioni={listaProiezioni} /> }
                </Box>
            </div>
        </div>
    );
}


export default DetailsPopup;