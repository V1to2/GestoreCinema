import { React, useState } from "react";
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
import profilo from '../../pages/profilo';
import "./login.css";


const Login = () => {
    const [loginErrato, setLoginErrato] = useState(false);
    const [datiUtente, setDatiUtente] = useState(false);
  
    function login() {
        var passwordInserita = document.getElementById('password').value;
        var emailInserita = document.getElementById('email').value;
        
        
        axios
            .get(
                'https://87.250.73.22/html/Popa/Cinema/PHP/login.php?email=aaronmessina@eetieg.com&password=EEjFlFa1TE'
            )
            .then(res => {
                console.log("res:" + res);
                console.log("res.data:" + res.data)
                if (res.data != 0) {
                    setLoginErrato(false);
                    setDatiUtente(emailInserita);
                    document.cookie = 'username=' + emailInserita;
                    //window.location.href = 'profilo';
                } else {
                    console.log("hno loggato");

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
                <label htmlFor="email">Email</label>
                <Input
                    mt={0}
                    type="email"
                    placeholder="Email"
                    required="true"
                    id="email"
                  />

                <label htmlFor="password">Password</label>
                <Input
                    mt={0}
                    type="password"
                    placeholder="Password"
                    required="true"
                    id="password"
                  />

                <button className="buttoninvio" onClick={login}>Log In</button>
            </div>
        </div>
    );
};
export default Login;