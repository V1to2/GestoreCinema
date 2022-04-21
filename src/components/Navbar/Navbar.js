import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

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

import Login from '../Login/login';
export default function Navbar() {

    const [loggato, setLoggato] = useState(false);

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

    useEffect(() => {
        if (getCookie('username') != '') {
            setLoggato(true);
        } else {
            setLoggato(false);
        }
    }, []);

    const [loginErrato, setLoginErrato] = useState(false);
    const [permessi, setPermessi] = useState([]);

    function login() {
        var passwordInserita = document.getElementById('password').value;
        var emailInserita = document.getElementById('email').value;


        axios
            .get(
                'https://87.250.73.22/html/Popa/Cinema/PHP/login.php?email=' + emailInserita + '&password=' + passwordInserita + ''
            )
            .then(res => {
                if (res.data != 0) {
                    console.log("sd")
                    document.cookie = 'username=' + emailInserita;
                    switch (res.data.UserType) {
                        case "DirettoreMultisala":
                            setPermessi(3);
                            break;
                        case "ResponsabileSala":
                            setPermessi(2);
                            break;
                        case "Cliente":
                            setPermessi(1);
                            break;
                    }
                } else {
                    document.getElementById('password').value = "";
                }
            });
    }

    useEffect(() => {
        if(permessi != 0){
            console.log("perme: " + permessi)
            window.location.href = 'profilo';
        }
    }, []);

    function logout() {
        // rimuovo il cookie profilo e ricarico la homepage
        document.cookie = 'username' + '=; Max-Age=-99999999;';
        document.cookie = 'immagineProfilo' + '=; Max-Age=-99999999;';
        window.location.href = '/';
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='20%'
            backdropBlur='10px'
        />
    )

    const [overlay, setOverlay] = React.useState(<OverlayTwo />)

    return (
        <>
            <Nav>
                <NavLogo to="/">
                    Logo
                </NavLogo>
                <Bars>
                    <NavLink
                        to="/profilo"
                        activeStyle={{ color: 'black' }}
                    >
                        Profilo
                    </NavLink>
                </Bars>
                <NavMenu>
                    {loggato ? (
                        <Menu>
                            <MenuButton>
                                <Avatar name="Sasuke Uchiha" src={'https://bit.ly/broken-link'} />
                            </MenuButton>
                            <MenuList>
                                <Link to="profilo">
                                    <MenuItem icon={<BsPerson />} command="⌘T">
                                        Profilo
                                    </MenuItem>
                                </Link>
                                {permessi == 3 ? (
                                    <Link to="adminPanel">
                                        <MenuItem icon={<BsPerson />} command="⌘T">
                                            Pannello Admin
                                        </MenuItem>
                                    </Link>
                                ) :
                                    <Link to="adminPanel">
                                        <MenuItem icon={<BsPerson />} command="⌘T">
                                            Pa
                                        </MenuItem>
                                    </Link>}
                                <MenuItem
                                    onClick={logout}
                                    icon={<MdExitToApp />}
                                    command="⌘N"
                                >
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
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

                            <Modal isOpen={isOpen} onClose={onClose}>
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
                    )}
                </NavMenu>
            </Nav>
        </>
    );
}

