import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getHeight } from 'rsuite/esm/DOMHelper';

const getImage = (path) => `https://image.tmdb.org/t/p/original/${path}`;
export default function Slider(props) {
    const moviesList = props.infos.map((movie) => (
        <div>
            <img src={getImage(movie.backdrop_path)} />
        </div>
    ))

    const mystyle = {
        paddingRight: "3rem",
        paddingLeft: "3rem",
    };
    
    return (
        <div style={mystyle}>
            <Carousel autoPlay={true} interval={6000} infiniteLoop={true} centerMode={true} showStatus={false} showThumbs={false}>
                {moviesList}
            </Carousel>
        </div>
    );
}