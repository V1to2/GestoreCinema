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

    function logout() {
        // rimuovo il cookie profilo e ricarico la homepage
        document.cookie = 'username' + '=; Max-Age=-99999999;';
        document.cookie = 'immagineProfilo' + '=; Max-Age=-99999999;';
        window.location.href = '/';
    }

    return (
        <>
            <Nav>
                <NavLogo to="/">
                    Logo
                </NavLogo>
                <Bars />

                <NavMenu>
                    {/*
                    <NavLink
                        to="/contact"
                        activeStyle={{ color: 'black' }}
                    >
                        Contact
                    </NavLink>
    */}
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
                            <Link to="login">
                                <Button colorScheme="linkedin" leftIcon={<BsPersonFill />}>
                                    Login
                                </Button>
                            </Link>
                        </Flex>
                    )}
                </NavMenu>
            </Nav>
        </>
    );
}

