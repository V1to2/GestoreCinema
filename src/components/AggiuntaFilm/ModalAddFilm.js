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

export default function ModalAddFilm({ open, data, aggiunto, closeBack }) {
  const [durata, setDurata] = useState(0)
  const [genre, setGenre] = useState("")
  const [listaRegisti, setListaRegisti] = useState([])
  const [regista, setRegista] = useState(["", "Unknown", ""])

  const BASE_URL = "https://api.themoviedb.org/3";
  const api_key = '629cebc2d8655797238b9c58281509ae';

  const api = axios.create({ baseURL: BASE_URL });

  const [ore, setOre] = useState([]);

  const getFilm = api.get("movie/" + data.id, {
    params: { api_key }
  });

  function addFilm() {

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
        aggiunto(true);
        onClose();
      });
  }

  const [film, setFilm] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    getFilm.then((res) => {
      setFilm(res.data);
    });



    if (open == true) onOpen()
    axios.get(
      "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php?query=" +
      "SELECT nome, cognome " +
      "FROM RegistaAttore"
    ).then((lista) => {
      setListaRegisti(lista.data)
    })

  }, [onOpen, open])

  const handleSelectionr = () => { let value = document.getElementById('selectPerRegista').value.split("{"); setRegista(value) }
  const handleSelectiong = () => { let valore = document.getElementById('selectPerGenere').value; setGenre(valore) }

  function Generi() {
    if (film.length != 0) {
      return (
        film.genres.map((gen) => { return <option value={gen.name}>{gen.name}</option> })
      )
    } else {
      getFilm.then((res) => {
        setFilm(res.data);
      });
      return (null);
    }

  }

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
                <Slider max={30} flex='1' focusThumbOnChange={false} value={durata} onChange={setDurata} >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb fontSize='sm' boxSize='32px' children={<TimeIcon color={"orange.300"} />} />
                </Slider>
              </Flex>
              <FormLabel htmlFor='selectPerRegista'>Regia</FormLabel>
              <Select id='selectPerRegista' onChange={handleSelectionr}>
                {listaRegisti.map((reg) => { return <option value={"{" + reg.nome + "{" + reg.cognome} key={reg.nome + "-" + reg.cognome}>{reg.nome + " " + reg.cognome}</option> })}
              </Select>
              <FormLabel htmlFor='selectPerGenere'>Genere</FormLabel>
              <Select id='selectPerGenere' onChange={handleSelectiong}>
                <Generi />
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