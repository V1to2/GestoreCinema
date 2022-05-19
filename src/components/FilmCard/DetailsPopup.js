import { Alert, Divider, AlertIcon, AlertTitle, AlertDescription, Box, Grid, GridItem, Button, Stack, HStack, VStack, StackDivider, Text } from "@chakra-ui/react";
import axios from "axios";
import { data } from "jquery";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Lista(props) {
    function getNumber(array, prId) {
        for (var index = 0; index < array.length && array[index].id != prId; index++);
        if (index < array.length)
            return <Text key={"seats-" + prId}>{array[index].NPosti}</Text>
        else
            return <Text key={"ERROR-" + prId} color='tomato'>ERROR</Text>
    }

    useEffect(()=>{ document.cookie = "targettedFilm=" + props.filTitle},[props.filTitle])

    return (
        <Box>
            <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4} align='stretch'>
                <Grid templateColumns='repeat(6, 1fr)' gap={4}>
                    <GridItem color='#fbd38d' borderBottom='1px' borderColor='#deb162' fontWeight='bold' textAlign='center' key={"cinema-head"}>Cinema</GridItem><GridItem color='#fbd38d' borderBottom='1px' borderColor='#deb162' fontWeight='bold' textAlign='center' key={"sala-head"}>Sala</GridItem><GridItem color='#fbd38d' borderBottom='1px' borderColor='#deb162' fontWeight='bold' textAlign='center' key={"data-head"}>Data</GridItem><GridItem color='#fbd38d' borderBottom='1px' borderColor='#deb162' fontWeight='bold' textAlign='center' key={"inizio-head"}>Inizio</GridItem><GridItem color='#fbd38d' borderBottom='1px' borderColor='#deb162' fontWeight='bold' textAlign='center' key={"fine-head"}>Fine</GridItem><GridItem color='#fbd38d' borderBottom='1px' borderColor='#deb162' fontWeight='bold' textAlign='center' key={"posti-head"}>Posti</GridItem>
                    {props.proiezioni.map((pr) => { return <><GridItem color='#c2c0bc' verticalAlign='center' textAlign='center' key={"cinema-" + pr.id}>{pr.nome}</GridItem><GridItem color='#c2c0bc' verticalAlign='center' textAlign='center' key={"sala-" + pr.id}>{pr.sala_id}</GridItem><GridItem color='#c2c0bc' verticalAlign='center' textAlign='center' key={"data-" + pr.id}>{convertData(pr.data)}</GridItem><GridItem color='#c2c0bc' verticalAlign='center' textAlign='center' key={"inizio-" + pr.id}>{pr.oraInizio}</GridItem><GridItem color='#c2c0bc' verticalAlign='center' textAlign='center' key={"fine-" + pr.id}>{pr.oraFine}</GridItem><GridItem color='#c2c0bc' verticalAlign='center' textAlign='center' key={"posti-" + pr.id}>{getNumber(props.listaPosti, pr.id)}</GridItem></> })}
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

function convertData(Datain) {
    var data = Datain.split("-");
    let mese = "";
    if (data[1] == '01') {
        mese = "Gennaio";
    }
    else if (data[1] == '02') {
        mese = "Febbraio";
    }
    else if (data[1] == '03') {
        mese = "Marzo";
    }
    else if (data[1] == '04') {
        mese = "Aprile";
    }
    else if (data[1] == '05') {
        mese = "Maggio";
    }
    else if (data[1] == '06') {
        mese = "Giugno";
    }
    else if (data[1] == '07') {
        mese = "Luglio";
    }
    else if (data[1] == '08') {
        mese = "Agosto";
    }
    else if (data[1] == '09') {
        mese = "Settembre";
    }
    else if (data[1] == '10') {
        mese = "Ottobre";
    }
    else if (data[1] == '11') {
        mese = "Novembre";
    }
    else if (data[1] == '12') {
        mese = "Dicembre";
    }
    var dataOut = "";
    dataOut = dataOut + (data[2] + " ");
    dataOut = dataOut + (mese + " ");
    dataOut = dataOut + (data[0]);
    return dataOut;
}

function DetailsPopup(props) {
    const [listaProiezioni, setlistaProiezioni] = useState(null)
    const [regista, setRegista] = useState([{ nome: "not", cognome: "found" }])
    const [durata, setDurata] = useState(0)
    const [postiLiberi, setPostiLiberi] = useState([{ NPosti: "0", cinema_id: "0", data: "0-0-0", id: "0", oraInizio: "00:00:00", sala_id: "" }])

    function pr() {
        axios
            .get(
                "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/getProiezioniFilm.php?searchFilm_title=" + props.title
            )
            .then((result) => {
                console.log("proiezioni: ")
                console.log(result.data)
                setlistaProiezioni(result.data)
            })
    }

    function re() {
        axios
            .get(
                "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/Request.php?query=" +
                "SELECT regista_nome, regista_cognome FROM Film WHERE title='" + props.title + "'"
            )
            .then((result) => {
                let r = [{ nome: result.data[0].regista_nome, cognome: result.data[0].regista_cognome }]
                //console.log("regista:")
                //console.log(r)
                setRegista(r)
            })
    }

    function du() {
        axios
            .get(
                "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/Request.php?query=" +
                "SELECT durata FROM Film WHERE title='" + props.title + "'"
            )
            .then((result) => {
                let r = [{ nome: result.data[0].regista_nome, cognome: result.data[0].regista_cognome }]
                let d = result.data[0].durata
                //console.log("durata:")
                //console.log(d)
                setDurata(d)
            })
    }

    function po() {
        axios
            .get(
                "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/Request.php?query=" +
                "SELECT COUNT(*) AS NPosti,Po.cinema_id,Po.sala_id,Pr.id,Pr.data,Pr.oraInizio " +
                "FROM Posto AS Po INNER JOIN Proiezione AS Pr ON Po.cinema_id=Pr.Id_Cinema AND Po.sala_id=Pr.sala_id " +
                "WHERE CONCAT(Po.cinema_id, \"+\", Po.sala_id, \"+\", Po.fila, Po.numero, \"+\", Pr.id)NOT IN(" +
                "SELECT CONCAT(cinema, \"+\", sala, \"+\", posto_fila, posto_numero, \"+\", proiezione_id) " +
                "FROM Biglietto" +
                ")  AND Pr.film_id=(SELECT id FROM Film WHERE title='" + props.title + "')" +
                "GROUP BY Po.cinema_id, Po.sala_id, Pr.data, Pr.oraInizio"
            )
            .then((result) => {
                //console.log("lista posti liberi:")
                //console.log(result.data)
                setPostiLiberi(result.data)
            })
    }

    useEffect(() => {
        pr()
        re()
        du()
        po()
    }, [props.title]);


    const stile = {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: "35px",
    }

    const stilebottone = {
        position: "absolute",
        width: "2.6rem",
        height: "2.6rem",
        top: "-1.3rem",
        right: "-1.3rem"
    }

    const stileimmagine = {
        width: "30%",
        height: "auto",
        borderRadius: "5px",
    }

    const stileTesto = {
        margin: "1rem",
        width: "60%",
        backgroundColor: "#414f67",
        padding: "1rem",
        borderRadius: "15px",
        oveflow: "auto"
    }

    return (
        <div className="PopupFilm-root" style={stile}>
            <div onClick={props.close} style={stilebottone}>
                <img src="https://www.ilsicomoro.it/js/skins/default/lightbox-close.png" alt="close" draggable={false} />
            </div>
            <div style={stileimmagine}>
                <img className="PopupFilm-image" width={"100%"} src={props.imgPath} alt={props.originalTitle} />
            </div>
            <div className="PopupFilm-info" style={stileTesto}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}> {props.title} </h1>
                <p style={{ margin: "1rem" }}>
                    {props.trama}
                </p>
                <pre style={{ margin: "1rem" }}>
                    Durata:      {durata} min
                </pre>
                <pre style={{ margin: "1rem" }}>
                    Data Di Uscita:      {convertData(props.uscita)}
                </pre>
                <pre style={{ margin: "1rem" }}>
                    Regista:             {regista[0].nome + " " + regista[0].cognome}
                </pre>
                <Box className="PopupFilm-Proiezioni">
                    {(!(listaProiezioni != null && listaProiezioni.length > 0)) ? <Alert status='warning'><AlertIcon /> We can't find this Film in any Cinema</Alert> : <Lista filTitle={props.title} proiezioni={listaProiezioni} listaPosti={postiLiberi} />}
                </Box>
            </div>
        </div>
    );
}


export default DetailsPopup;