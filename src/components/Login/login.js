import { React } from "react";
import {
    chakra,
    Box,
    GridItem,
    useColorModeValue,
    Button,
    Stack,
    Center,
    Flex,
    Icon,
    SimpleGrid,
    VisuallyHidden,
    Input,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
} from '@chakra-ui/react';

import axios from 'axios';
import "./login.css";


const Login = () => {
    function login() {

        console.log("asd");
        var passwordInserita = document.getElementById('username').value;
        var emailInserita = document.getElementById('email').value;

        axios
            .get(
                'https://87.250.73.22/html/Zanchin/vcoopendays/loginTest.php?emailInserita=' +
                emailInserita +
                '&passwordInserita=' +
                passwordInserita
            )
            .then(res => {
                if (res.data == '1' || res.data == '2' || res.data == '3') {

                } else {

                }
            });
    }
    return (
        <div className="main">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className="divBack">
                <h3>Login Here</h3>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" />

                <button className="buttoninvio" onClick={login}>Log In</button>
            </div>
        </div>
    );
};
export default Login;