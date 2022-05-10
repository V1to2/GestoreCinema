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

export default function ModalConfermaAdd({ saleSel, open, datiSale, closeBack }) {


    const BASE_URL = "https://api.themoviedb.org/3";
    const api_key = '629cebc2d8655797238b9c58281509ae';

    const api = axios.create({ baseURL: BASE_URL });

    const [film, setFilm] = useState([])
    const [ore, setOre] = useState([]);
    const getFilm = api.get("movie/" + datiSale.id, {
        params: { api_key }
    });

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='20%'
            backdropBlur='10px'
        />
    )
    function time_convert(num) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return hours + "." + minutes.toFixed(0);
    }
    function createHours(hours) {
        console.log(film.title + "-" + film.runtime)
        if (hours != "") {

        } else {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


            let counter = 0;
            var ore = new Array();
            var ora = { inizio: 17.00, fine: Number(time_convert(1020 + film.runtime)) };
            ore.push(ora);


            while (ore[counter].fine.toFixed(0) <= 23 || ore[counter].fine.toFixed(0) == 0 || ore[counter].fine.toFixed(0) == 1) {
                let o = time_convert((ore[counter].fine * 60) + film.runtime);
                let fineTemp = Number(o);
                ore.push({ inizio: ore[counter].fine, fine: fineTemp });
                counter++;
            }
            setOre(ore);
            console.log(ore);
        }
    }

    const datiSel = ore.map((d) => (
        <option value={d.inizio}>{d.inizio} - {d.fine}</option>
    ))

    function getOreFromDb() {
        var data = document.getElementById("selData").value;
        axios
            .get(
                'https://87.250.73.22/html/Popa/Cinema/PHP/getOreSala.php?date=' + data + '&idSala=' + saleSel.checkboxes[0]
            )
            .then(res => {
                createHours(res.data);
            });
    }

    const [overlay, setOverlay] = React.useState(<OverlayTwo />)
    const { isOpen, onOpen, onClose } = useDisclosure()

    function closeFuncition() {
        closeBack(false)
        onClose()
    }
    useEffect(() => {
        getFilm.then((res) => {
            setFilm(res.data);
        });

        if (open == true) onOpen()
    }, [])

    return (
        <Flex>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader >
                        <Center pt="10" pb="5" h='20px' color='white'>
                            Seleziona l'orario e la data per la visione di
                        </Center>

                        <Center> <pre><span style={{ color: "green" }}> {datiSale.title}</span> nella sala <span style={{ color: "green" }}>{saleSel.checkboxes[0]}</span></pre></Center>
                    </ModalHeader>

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
                            onChange={getOreFromDb}
                            id="selData"
                            type="date"
                        >
                            { }
                        </Input>
                    </ModalBody>
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
                            {datiSel}
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => closeBack(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}