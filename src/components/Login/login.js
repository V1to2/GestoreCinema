import { React, useState } from "react";
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
    Input
} from '@chakra-ui/react';

import axios from 'axios';
import profilo from '../../pages/profilo';
import "./login.css";


const Login = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loginErrato, setLoginErrato] = useState(false);
    const [datiUtente, setDatiUtente] = useState(false);

    function login() {
        var passwordInserita = document.getElementById('password').value;
        var emailInserita = document.getElementById('email').value;


        axios
            .get(
                'https://87.250.73.22/html/Popa/Cinema/PHP/login.php?email=' + emailInserita + '&password=' + passwordInserita + ''
            )
            .then(res => {
                if (res.data != 0) {
                    setLoginErrato(false);
                    setDatiUtente(emailInserita);
                    document.cookie = 'username=' + emailInserita;
                    window.location.href = 'profilo';
                } else {
                    document.getElementById('password').value = "";
                }
            });
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Email@test.com' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input placeholder='Password' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        LogIn
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default Login;