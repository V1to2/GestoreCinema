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
import {
    AiOutlineMenu,
    AiFillHome,
    AiOutlineInbox,
    AiFillBell,
    AiOutlineProfile,
} from 'react-icons/ai';
import { BsImage } from 'react-icons/bs';
import {
    BsFillCameraVideoFill,
    BsPerson,
    BsPersonFill,
    BsPlus,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
    MdAddCircle,
    MdEditLocation,
    MdExitToApp,
    MdRepeat,
    MdSchool,
    MdWork,
} from 'react-icons/md';
import {
    FaExternalLinkAlt,
    FaImages,
    FaSchool,
    FaTwitter,
} from 'react-icons/fa';


export default function ModalDatiCinema({ cinemaSale }) {

    function getCookie(cname) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

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
    const [flag, setFlag] = useState(0);
    const [cinemas, setCinemas] = useState([]);
    const [sale, setSale] = useState([]);
    var datiFinali = [];


    function requestDati(dato) {
        //passare a questa funzione le cose da mettere nei filtri, tipo se passi cinema ti ritorna tutti i cinema presenti nel db
        axios
            .get(
                'https://87.250.73.22/html/Popa/Cinema/PHP/getCinema.php'
            )
            .then(res => {
                console.log(res.data);
                setCinemas(res.data);
            });
    }

    function getSale() {
        console.log(document.getElementById('selCinema').value)
        if(document.getElementById('selCinema').value != ""){
        //passare a questa funzione le cose da mettere nei filtri, tipo se passi cinema ti ritorna tutti i cinema presenti nel db
        axios
            .get(
                'https://87.250.73.22/html/Popa/Cinema/PHP/getSale.php?cinema=' + document.getElementById('selCinema').value
            )
            .then(res => {
                console.log(res.data);
                setSale(res.data);
            });
        }else{
            setSale([]);
        }
    }

    useEffect(() => {
        requestDati()
        onOpen()
    }, [])

    const toast = useToast()
    function updateDatiFin() {
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        var array = []
        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if(document.getElementById('selCinema').value != "" && array.length != 0){

            datiFinali = {
                cinema: document.getElementById('selCinema').value,
                checkboxes: array
            }
            onClose()
            return datiFinali;
        }else{
            if(document.getElementById('selCinema').value == ""){
            toast({
                title: `Devi selezionare il cinema!`,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            }else{
                toast({
                    title: `Devi selezionare almeno una sala!`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  })
            }
        }
    }

    const CheckBoxes = sale.map((d, i) => (
        <Checkbox p={"2"} id={i} value={d.nome} colorScheme='green' >
            {d.nome}
        </Checkbox>
    ));
    const datiSel = cinemas.map((d) => (
        <option value={d.codice}>{d.nome}</option>
    ))

    return (
        <Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader >
                        <Center pt="10" pb="5" h='20px' color='white'>
                            Seleziona il cinema a cui vuoi aggiungere il film
                        </Center>
                    </ModalHeader>
                    <ModalBody>
                        <Select
                            bg='RGBA(0, 0, 0, 0.64)'
                            borderColor='#2C7A7B'
                            color='white'
                            onChange={getSale}
                            id="selCinema"
                            required="required"
                        >
                            
                            <option value="">None</option>
                            {datiSel}
                        </Select>
                    </ModalBody>

                    <ModalHeader >
                        <Center pt="10" h='12px' color='white'>
                            Seleziona la/e sala/e
                        </Center>
                    </ModalHeader>
                    <ModalBody>
                        <Flex flexWrap={"wrap"} >
                            {CheckBoxes}
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => cinemaSale(updateDatiFin())} colorScheme='blue' mr={3}>
                            Conferma
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};