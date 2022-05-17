import React, { useState, useEffect } from 'react';
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    Button,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
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
    Center,
    Select,
    Checkbox,
    Spacer,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
  } from '@chakra-ui/react'
  import { TimeIcon } from '@chakra-ui/icons';

  import axios from 'axios';

  export default function ModalAddFilm({ open, data, aggiunto, closeBack}) {
    const [durata, setDurata] = useState(0)
    const [genre, setGenre] = useState("")
    const [listaRegisti, setListaRegisti] = useState([])
    const [regista, setRegista] = useState(["","Unknown",""])

    function addFilm(){
        axios
            .get(/*
                'https://87.250.73.22/html/Popa/Cinema/PHP/inserimentoFilm.php?title=' + data.title +
                '&original_title=' + data.original_title +
                '&original_languge=' + data.original_language +
                '&overview=' + data.overview +
                '&backdrop_path=' + data.backdrop_path  +
                '&poster_path=' + data.poster_path +
                '&release_date=' + data.release_date
                */
                "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php?query=" +
                "INSERT INTO Film " +
                "(title, original_title, id, original_languge, overview, backdrop_path, poster_path, release_date, durata, genre, regista_nome, regista_cognome)" + 
                " VALUES " +
                "('" + data.title + 
                "','" + data.original_title + 
                "',NULL,'" + data.original_language + 
                "','" + data.overview + 
                "','" + data.backdrop_path + 
                "','" + data.poster_path + 
                "','" + data.release_date + 
                "','" + durata + 
                "','" + genre + 
                "','" + regista[1] + 
                "','" + regista[2] + "')"
            )
            .then(res => {
                console.log(res)
                onClose();
            });
            aggiunto(true);
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
        console.log(open)
        if (open == true) onOpen()
        axios.get(
          "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php?query=" +
          "SELECT nome, cognome " + 
          "FROM RegistaAttore"
        ).then((lista)=>{
          console.log(lista.data)
          setListaRegisti(lista.data)
          console.log(listaRegisti)
        })
    }, [onOpen, open])

    const handleSelectionr = ()=>{let value = document.getElementById('selectPerRegista').value.split("{"); console.log(value); setRegista(value)}
    const handleSelectiong = ()=>{let valore = document.getElementById('selectPerGenere').value; console.log("genere: " + valore); setGenre(valore)}

    return (
      <>
        <Modal closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Inserimento {data.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Questo film non e' presente nel DB, inserisci i dati e clicca conferma se vuoi inserirlo vuoi inserirlo</Text>
              <Box p={4}>
                <FormLabel>Durata (minuti)</FormLabel>
                <Flex mb={2}>
                  <NumberInput allowMouseWheel maxW='100px' mr='2rem' value={durata} onChange={setDurata}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Slider max={240} flex='1' focusThumbOnChange={false} value={durata} onChange={setDurata} >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb fontSize='sm' boxSize='32px' children={<TimeIcon color={"orange.300"} />} />
                  </Slider>
                </Flex>
                <FormLabel htmlFor='selectPerRegista'>Regia</FormLabel>
                <Select id='selectPerRegista' onChange={handleSelectionr}>
                  { listaRegisti.map((reg)=>{ return <option value={ "{" + reg.nome + "{" + reg.cognome } key={reg.nome + "-" + reg.cognome}>{reg.nome + " " + reg.cognome}</option>}) }
                </Select>
                <FormLabel htmlFor='selectPerGenere'>Genere</FormLabel>
                <Select id='selectPerGenere' onChange={handleSelectiong}>
                  <option value={"NULL"}></option>
                  <option value={"Comico"}>Comico</option>
                  <option value={"Storico"}>Storico</option>
                  <option value={"Cinepanettone"}>Cinepanettone</option>
                  <option value={"Fantasy"}>Fantasy</option>
                  <option value={"Fantascienza"}>Fantascienza</option>
                  <option value={"Poliziesco"}>Poliziesco</option>
                  <option value={"Supereroi"}>Supereroi</option>
                  <option value={"Azione"}>Azione</option>
                  <option value={"Horror"}>Horror</option>
                  <option value={"Western"}>Western</option>
                  <option value={"Thriller"}>Thriller</option>
                  <option value={"Drammatico"}>Drammatico</option>
                  <option value={"Musical"}>Musical</option>
                  <option value={"Cartone"}>Cartone</option>
                  <option value={"Animazione"}>Animazione</option>
                  <option value={"Avventura"}>Avventura</option>
                  <option value={"Biografico"}>Biografico</option>
                  <option value={"Catastrofico"}>Catastrofico</option>
                  <option value={"Commedia"}>Commedia</option>
                  <option value={"Erotico"}>Erotico</option>
                  <option value={"Giallo"}>Giallo</option>
                  <option value={"Guerra"}>Guerra</option>
                  <option value={"Spionaggio"}>Spionaggio</option>
                  <option value={"Sportivo"}>Sportivo</option>
                  <option value={"Storico"}>Storico</option>
                </Select>
              </Box>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={() => closeBack(false)}>
                Annulla
              </Button>
              <Button colorScheme='green' onClick={addFilm}>Conferma</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }