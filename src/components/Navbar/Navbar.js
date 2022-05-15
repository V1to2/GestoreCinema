import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    chakra,
    Box,
    Image,
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
    const [flag, setFlag] = useState(0);
    const [permessi, setPermessi] = useState([]);

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
            if (flag == 0 && getCookie('permessi') != '') {
                setPermessi(getCookie("permessi"))
                setFlag(1);
            }
        } else {
            setLoggato(false);
        }
    }, []);

    function logout() {
        // rimuovo il cookie profilo e ricarico la homepage
        document.cookie = 'username' + '=; Max-Age=-99999999;';
        document.cookie = 'permessi' + '=; Max-Age=-99999999;';
        document.cookie = 'immagineProfilo' + '=; Max-Age=-99999999;';
        window.location.href = '/';
    }

    return (
        <>
            <Nav>
                <NavLogo to="/">
                    <Image draggable={false} boxSize='5.5rem' src="https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/immagini/logocinema.png" alt="Logo" />
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
                    <ColorModeSwitcher justifySelf="flex-end" />

                    <chakra.a
                        pr={2}
                        color={useColorModeValue('gray.800', 'inherit')}
                        rounded="sm"
                        _hover={{ color: useColorModeValue('black.800', 'gray.600') }}
                    ></chakra.a>

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
                                    <Link to="addFilm">
                                        <MenuItem icon={<BsPerson />} command="⌘T">
                                            Aggiungi film
                                        </MenuItem>
                                    </Link>
                                ) : null}
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
                        <Login />
                    )}
                </NavMenu>
            </Nav>
        </>
    );
}

