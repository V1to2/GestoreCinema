import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor, Button, ButtonGroup, SimpleGrid, Text, Flex, Box, Grid, GridItem, Alert, Center, Stack, HStack, VStack, IconButton, Wrap, WrapItem, Circle, Spacer } from '@chakra-ui/react'
import './Sala.css'
import axios from 'axios'
import {
  CheckIcon, DeleteIcon, InfoOutlineIcon
} from "@chakra-ui/icons"
import {
  chakra,
  useColorModeValue,
  VisuallyHidden,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';




export default function Sala(props) {

  const [postiSel, setPostiSel] = useState([]);
  const [file, setFile] = useState([]);
  const [posti, setPosti] = useState([]);
  const [postiOccupati, setPostiOccupati] = useState([])

  var postiSelTemp = [];
  function addBiglietto(props) {
    var button = document.getElementById(props.dati_posto.fila + "-" + props.dati_posto.numero)
    button.disabled = true
    button.style.backgroundColor = 'yellow';
    postiSelTemp.push(props)
  }
 
  function setPostiDis() {
    axios.get(
      "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php?query=" +
      "SELECT * FROM `Biglietto` WHERE `cinema` = '" + props.cinemaID + "' AND `sala` = '" + props.sala + "'"
    ).then((res) => {
      disPosti(res.data);
    })
  }

  function disPosti(dati) {

    dati.forEach(e => {
      var button = document.getElementById(e.posto_fila + "-" + e.posto_numero)
      button.style.backgroundColor = 'red';
      button.disabled = true
    });
  }

  function rimAllPostiSelezionati() {
    for (var c = 0; c < postiSelTemp.length; c++) {
      var button = document.getElementById(postiSelTemp[c].dati_posto.fila + "-" + postiSelTemp[c].dati_posto.numero)

      button.disabled = false
    }
    postiSelTemp = [];
  }



  function Posto(props) {

    return (
      <IconButton disabled={false} id={props.dati_posto.fila + "-" + props.dati_posto.numero} onClick={() => addBiglietto(props)} aria-label={"'posto'" + props.dati_posto.numero} style={{ fontSize: "12px", borderRadius: "0.8rem 0.8rem 0.2rem 0.2rem" }} icon={<>{props.dati_posto.numero}</>} />
    );
  }
  function getCookie(nome) {
    let cookies = document.cookie.split(";")
    for (let index = 0; index < cookies.length; index++) {
      let target = cookies[index]
      if (target.split("=")[0].replace(" ", "") == nome)
        return target.split("=")[1]
    }
    return -1
  }
  const toast = useToast()

  function insBiglietti() {

    for (var c = 0; c < postiSel.length; c++) {
      addBigliettoDb(c);
    }
    onClose();
    toast({
      title: 'Posti prenotati.',
      description: "Conferma! Hai ricevuto i biglietti via mail.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  function addBigliettoDb(c) {

    axios.get(
      "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/inserimentoBiglietto.php?" +
      "proiezione_id=" + props.idPro + "&cliente_id=" + getCookie("username") + "&cinema=" + props.cinemaID + "&sala=" + props.sala + "&posto_fila=" + postiSel[c].dati_posto.fila + "&posto_numero=" + postiSel[c].dati_posto.numero
    ).then((res) => {
      confermata(res.data, postiSel[c].dati_posto.fila, postiSel[c].dati_posto.numero);
    })
  }

  function confermata(tempBiglietto, fila, posto) {
    axios.get(
      "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/sendTicket.php?" +
      "m=" + getCookie("username") +
      "&pa=" + document.getElementById("password").value +
      "&id=" + tempBiglietto +
      "&po=" + posto +
      "&f=" + fila +
      "&d=" + new Date().toString() +
      "&in=" + props.dati.oraInizio
    ).then((esito) => {
      console.log(esito.data)
    })

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
    getOccupedFromDB(props.idPro)
    setPostiSel(postiSelTemp)
    setPostiDis();
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
        "SELECT posto_fila, posto_numero " +
        "FROM Biglietto " +
        "WHERE proiezione_id=" + idProiezione + " AND sala='" + props.sala + "' AND cinema=" + props.cinemaID + ""
      ).then((result) => {
        let dati = result.data
        setPostiOccupati(dati)
      })
  }

  function openModal() {
    setPostiSel(postiSelTemp)
    onOpen()
  }
  function getPosti(lettera) {

    let seats = new Array()
    for (let index = 0; index < posti.length; index++) {
      if (posti[index].fila == lettera)
        seats.push(posti[index])
    }
    return seats;
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box p={2} m={5} w={"auto"}>
        <Box mb={"4rem"}>
          <Grid gap={2} m={"2%"} w={"auto"}>
            <GridItem key={"schermo"} h={"4rem"} w={"auto"} mb={"10%"} style={{ background: "linear-gradient(to top, lightgrey, white)", marginLeft: "10%", marginRight: "10%", borderRadius: "0.5rem 0.5rem 3rem 3rem" }} />
            {file.map((row) => { return <GridItem><Fila key={"Fila-" + row.fila} lettera_fila={row.fila} posti={getPosti(row.fila)} /></GridItem> })}
          </Grid>
        </Box>
        <Center bg={"blackAlpha.900"} borderRadius={"1rem"} style={{ position: "sticky" }} bottom={"0.4rem"}>
          <Flex p={"1rem"}>
            <Center>
              {postiSelTemp?.map((dati) => { return <IconButton icon={<CheckIcon color={"green.500"} children={<Text>ciao</Text>} />} /> })}
            </Center>
            <Spacer />
            <Grid templateColumns={"repeat(3, 1fr)"} gap={3}>
              <GridItem>
                <Popover placement='top-start'>
                  <PopoverTrigger>
                    <IconButton icon={<CheckIcon color={"green.500"} />} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>Conferma acquisto</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      Confermi di voler aquistare i biglietti quì a fianco ?
                    </PopoverBody>
                    <PopoverFooter>
                      <Flex gap>
                        <Button colorScheme='red' variant={"outline"}>Annulla</Button>
                        <Spacer />
                        <Button onClick={openModal} colorScheme='green' variant={"outline"}>Certo</Button>
                      </Flex>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </GridItem>
              <GridItem>
                <IconButton onClick={rimAllPostiSelezionati} icon={<DeleteIcon color={"red.500"} />} />
              </GridItem>
              <GridItem>
                <Popover placement='top-start'>
                  <PopoverTrigger>
                    <IconButton icon={<InfoOutlineIcon color={"cyan.500"} />} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>Info</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      Clicca sulla spunta per confermare l'acquisto, oppure sul cestino per annulare tutte le selezioni dei posti
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </GridItem>
            </Grid>
          </Flex>
        </Center>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inserisci la password del tuo account per confermare</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type='password' placeholder='Password' id='password' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={insBiglietti}>
              Conferma
            </Button>
            <Button onClick={onClose} variant='ghost'>Annulla</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
