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
    Spacer,
    useToast
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
        if (hours != "") { 
            console.log(hours);

            let counter = 0;
            var ore = new Array();
            var minIn = (hours[hours.length - 1].oraFine).split(':');
            var minutiFine = minIn[0] * 60 + Number(minIn[1]);

            var ora = { id: counter, inizio: Number(minIn[0]+'.'+minIn[1]), fine: Number(time_convert(minutiFine + film.runtime)) };
            ore.push(ora);

            while (ore[counter].fine.toFixed(0) <= 23 || ore[counter].fine.toFixed(0) == 0 || ore[counter].fine.toFixed(0) == 1) {
                let o = time_convert((ore[counter].fine * 60) + film.runtime);
                let fineTemp = Number(o);
                ore.push({ id: counter + 1, inizio: ore[counter].fine, fine: fineTemp });
                counter++;
            }

            setOre(ore);
            console.log(ore);

        } else {
            let counter = 0;
            var ore = new Array();
            var ora = { id: counter, inizio: 17.00, fine: Number(time_convert(1020 + film.runtime)) };
            ore.push(ora);

            while (ore[counter].fine.toFixed(0) <= 23 || ore[counter].fine.toFixed(0) == 0 || ore[counter].fine.toFixed(0) == 1) {
                let o = time_convert((ore[counter].fine * 60) + film.runtime);
                let fineTemp = Number(o);
                ore.push({ id: counter + 1, inizio: ore[counter].fine, fine: fineTemp });
                counter++;
            }

            setOre(ore);
            console.log(ore);
        }
    }

    const datiSel = ore.map((d) => (
        <option value={d.id}>{d.inizio} - {d.fine}</option>
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
    const [confermaTrue, setConfermaTrue] = useState(false);
    const toast = useToast()
    function sendOre() {
        var id = document.getElementById("selOra").value;
        console.log(id);
        setConfermaTrue(true);
        if (id != 0) {
            toast.closeAll()
            toast({
                title: 'Attenzione',
                description: `Selezionando quest'ora, le ore precedenti potrebbero diventare non disponibili`,
                status: 'error',
                duration: 9000,
                position: 'top',
                isClosable: true,
            })
        } else {
            toast.closeAll()
        }
    }
    function confermaAdd() {

        var id = document.getElementById("selOra").value;
        if (id != '') {
            var data = document.getElementById("selData").value;
            console.log(film.title)
            let oreIn = String(ore[id].inizio).split('.');
            let oreFin = String(ore[id].fine).split('.');

            if (oreIn.length == 1) {
                oreIn = oreIn[0] + ":00:00"
            } else
                oreIn = oreIn[0] + ":" + oreIn[1] + ":00"

            if (oreFin.length == 1) {
                oreFin = oreFin[0] + ":00:00"
            } else
                oreFin = oreFin[0] + ":" + oreFin[1] + ":00"

            axios.post(
                "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/insertNewProiezione.php?"
                + "data=" + data
                + "&oraInizio=" + oreIn
                + "&oraFine=" + oreFin
                + "&durata=" + film.runtime
                + "&sala_id=" + saleSel.checkboxes[0]
                + "&Id_Cinema=" + saleSel.cinema
                + "&film_id=" + film.title
            ).then((r) => {
                let c = r.data
                if (c == true) {
                    toast({
                        title: `Programmazione avvenuta con successo!`,
                        status: 'success',
                        variant: 'solid',
                        isClosable: true,
                    })
                    closeFuncition();
                }
            })
        }else{
            toast({
                title: 'Attenzione',
                description: `Seleziona un'ora!`,
                status: 'error',
                duration: 9000,
                position: 'top',
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        getFilm.then((res) => {
            setFilm(res.data);
        });

        if (open == true) onOpen()
    }, [])

    return (
        <Flex>
            <Modal size={'xl'} closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
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
                            placeholder="Selezione un'ora"
                            bg='RGBA(0, 0, 0, 0.64)'
                            borderColor='#2C7A7B'
                            color='white'
                            id="selOra"
                            onChange={sendOre}
                        >
                            {datiSel}
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        {confermaTrue ?
                            (<Button
                                colorScheme='teal'
                                variant='outline'
                                spinnerPlacement='start'
                                marginRight={"4px"}
                                onClick={confermaAdd}
                            >
                                Submit
                            </Button>) :
                            (<Button
                                isLoading
                                loadingText='Loading'
                                colorScheme='teal'
                                variant='outline'
                                spinnerPlacement='start'
                                marginRight={"4px"}
                            >
                                Submit
                            </Button>)}

                        <Button onClick={() => closeBack(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}