import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, SimpleGrid, Box, Grid, GridItem, Alert, Center, Stack, HStack, VStack, IconButton, Wrap, WrapItem, Circle } from '@chakra-ui/react'
import './Sala.css'
import axios from 'axios'





export default function Sala(props) {

  const [postiSel, setPostiSel] = useState([]);
  const [file, setFile] = useState([]);
  const [posti, setPosti] = useState([]);
  const [postiOccupati, setPostiOccupati] = useState([])

  var postiSelTemp = [];
  function addBiglietto(props) {
    var button = document.getElementById(props.dati_posto.fila + "-" + props.dati_posto.numero)
    button.disabled = true

    postiSelTemp.push(props)
  }

  function Posto(props) {

    return (
      <IconButton disabled={false} id={props.dati_posto.fila + "-" + props.dati_posto.numero} onClick={() => addBiglietto(props)} aria-label={"'posto'" + props.dati_posto.numero} style={{ fontSize: "12px", borderRadius: "0.5rem 0.5rem 0.3rem 0.3rem" }} icon={<>{props.dati_posto.numero}</>} />
    );
  }

  function Fila(props) {

    return (
      <HStack m={"0.5rem 0 0.5rem 0"}>
        <Circle bg={"blue.800"} p={"1rem"} >{props.lettera_fila}</Circle>
        <Wrap gap={2} m={"2%"} w={"auto"} justify={'center'} >
          {(props.posti.length > 0) ? props.posti.map((seat, i) => { return <WrapItem><Posto key={"seat" + i} dati_posto={seat} /></WrapItem> }) : <Alert>Sala Vuota</Alert>}
        </Wrap>
      </HStack>
    );
  }

  useEffect(() => {
    getSeatsFromDB()
    getRowsFromDB()
    getOccupedFromDB(props.proiezione)
  }, [props.cinemaID, props.sala])

  function getSeatsFromDB() {
    axios
      .get(
        "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php?query=" +
        "SELECT *" +
        "FROM Posto " +
        "WHERE cinema_id=" + props.cinemaID + " AND sala_id='" + props.sala + "'"
      ).then((result) => {
        let dati = result.data
        setPosti(dati)
      })
  }

  function getRowsFromDB() {
    axios
      .get(
        "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php?query=" +
        "SELECT DISTINCT fila " +
        "FROM Posto " +
        "WHERE cinema_id=" + props.cinemaID + " AND sala_id='" + props.sala + "'"
      ).then((result) => {
        let dati = result.data
        setFile(dati)
      })
  }

  function getOccupedFromDB(idProiezione) {
    axios
      .get(
        "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php?query=" +
        "SELECT posto_fila, posto_numero" +
        "FROM Biglietto" +
        "WHERE proiezione_id=" + idProiezione + " AND sala='" + props.sala + "' AND cinema=" + props.cinemaID + ""
      ).then((result) => {
        let dati = result.data
        setPostiOccupati(dati)
      })
  }

  function getPosti(lettera) {

    let seats = new Array()
    for (let index = 0; index < posti.length; index++) {
      if (posti[index].fila == lettera)
        seats.push(posti[index])
    }
    return seats;
  }

  return (
    <>
      <Box p={2} m={5} w={"auto"}>
        <Grid gap={2} m={"2%"} w={"auto"}>
          <GridItem key={"schermo"} h={"4rem"} w={"auto"} mb={"10%"} style={{ background: "linear-gradient(to top, lightgrey, white)", marginLeft: "10%", marginRight: "10%", borderRadius: "0.5rem 0.5rem 3rem 3rem" }} />
          {file.map((row) => { return <GridItem><Fila key={"Fila-" + row.fila} lettera_fila={row.fila} posti={getPosti(row.fila)} /></GridItem> })}
        </Grid>
      </Box>


      <WrapItem>
        <Button colorScheme='whatsapp'>Termina Prenotazione</Button>
      </WrapItem>
    </>
  )
}
