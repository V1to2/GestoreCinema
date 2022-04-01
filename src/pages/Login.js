import React from "react";
import Login from "../components/Login/login.js";
const About = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <Login />
        </div>
    );
};

export default About;