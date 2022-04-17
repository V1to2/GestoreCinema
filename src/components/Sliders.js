import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Slider(props) {
    const moviesList = props.infos.map((movie) => (
        <div>
            <img src={movie.poster} width="800" height="600" />
        </div>
    ))
    return (


        <Carousel autoPlay={true} interval={6000} emulateTouch={true} infiniteLoop={true} stopOnHover={true} centerMode={true} showStatus={false} showThumbs={false}>
            {moviesList}
        </Carousel>
    );
}