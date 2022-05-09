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
    Spacer
  } from '@chakra-ui/react'

  import axios from 'axios';

  export default function ModalAddFilm({ open, data, aggiunto, closeBack}) {
    function addFilm(){
        axios
            .get(
                'https://87.250.73.22/html/Popa/Cinema/PHP/inserimentoFilm.php?title=' + data.title +
                '&original_title=' + data.original_title +
                '&original_languge=' + data.original_language +
                '&overview=' + data.overview +
                '&backdrop_path=' + data.backdrop_path  +
                '&poster_path=' + data.poster_path +
                '&release_date=' + data.release_date
                
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
    }, [])

    return (
      <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Inserimento {data.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Questo film non e' presente nel DB, vuoi inserirlo?
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