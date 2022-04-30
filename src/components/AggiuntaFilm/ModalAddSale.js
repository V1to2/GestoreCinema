import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@chakra-ui/react';

export default function ModalConfermaAdd({ open, datiSale, closeBack }) {

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='20%'
            backdropBlur='10px'
        />
    )


    const [overlay, setOverlay] = React.useState(<OverlayTwo />)
    const { isOpen, onOpen, onClose } = useDisclosure()

    function closeFuncition() {
        closeBack(false)
        onClose()
    }
    useEffect(() => {
        if (open == true) onOpen()
    }, [])

    return (
        <Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader >
                        <Center pt="10" pb="5" h='20px' color='white'>
                            Seleziona l'orario e la data per la visione di 
                        </Center>

                        <Center color='green'>{datiSale.title}</Center>
                    </ModalHeader>
                    <ModalHeader>
                        <Center pt="10" h='12px' color='white'>
                            Ora
                        </Center>
                    </ModalHeader>
                    <ModalBody>
                        <Select
                            bg='RGBA(0, 0, 0, 0.64)'
                            borderColor='#2C7A7B'
                            color='white'
                            id="selOra"
                        >
                            { }
                        </Select>
                    </ModalBody>

                    <ModalHeader>
                        <Center pt="10" h='12px' color='white'>
                            Data
                        </Center>
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            bg='RGBA(0, 0, 0, 0.64)'
                            borderColor='#2C7A7B'
                            color='white'
                            id="selData"
                            type="date"
                        >
                            { }
                        </Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => closeBack(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}