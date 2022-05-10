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
    Center
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
import profilo from '../../pages/profilo';
import "./login.css";


export default function Login ({open, redirect}){

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

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [permessi, setPermessi] = useState([]);
    const [loginC, setLoginC] = useState(false);
    const [datiUtente, setDatiUtente] = useState(false);
    const [flag, setFlag] = useState(0);

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='20%'
            backdropBlur='10px'
        />
    )

    const [overlay, setOverlay] = React.useState(<OverlayTwo />)

    function login() {
        var passwordInserita = document.getElementById('password').value;
        var emailInserita = document.getElementById('email').value;


        axios
            .get(
                'https://87.250.73.22/html/Popa/Cinema/PHP/login.php?email=' + emailInserita + '&password=' + passwordInserita + ''
            )
            .then(res => {
                if (res.data != 0) {
                    setLoginC(true);
                    console.log("sd")
                    document.cookie = 'username=' + emailInserita;
                    switch (res.data.UserType) {
                        case "DirettoreMultisala":
                            setPermessi(3);
                            document.cookie = 'permessi=3';
                            break;
                        case "ResponsabileSala":
                            document.cookie = 'permessi=2';
                            setPermessi(2);
                            break;
                        case "Cliente":
                            setPermessi(1);
                            document.cookie = 'permessi=1';
                            break;
                    }

                    window.location.href = redirect;
                } else {
                    document.getElementById('password').value = "";
                }
            });
    }


    useEffect(() => {
        console.log("Open: " + open)
        if(open == true) onOpen()
        console.log(getCookie("permessi"))
        if (flag == 0) {
            setPermessi(getCookie("permessi"))
            setFlag(1);
        }
    }, [])


    return (
        <Flex>
            <Link to="registrati">
                <Button
                    marginRight={'0.8vw'}
                    colorScheme="whatsapp"
                    leftIcon={<FaTwitter />}
                >
                    Registrati
                </Button>
            </Link>
            <Button onClick={() => {
                setOverlay(<OverlayTwo />)
                onOpen()
            }} colorScheme="linkedin" leftIcon={<BsPersonFill />}>
                Login
            </Button>

            <Modal colorScheme='blue' isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader >
                        <Center pt="10" h='12px' color='white'>
                            Accedi al tuo account
                        </Center>
                    </ModalHeader>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' placeholder='Email@test.com' id='email' />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' placeholder='Password' id='password' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={login} colorScheme='blue' mr={3}>
                            LogIn
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}