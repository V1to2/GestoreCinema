import React from "react";
import Movies from '../components/Movie/Movies.js';

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
            <Movies />
        </div>
    );
};

export default About;