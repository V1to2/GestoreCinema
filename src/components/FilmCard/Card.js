import { Button } from "@chakra-ui/react";
import Prenotazione from './DetailsPopup'
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import React from "react";

const Rating = ({ rating }) => {
    let stars = [];
    for (let i = 1; i < 11; i++) {
        let klass = "fa fa-star";
        if (rating >= i && rating !== null) {
            klass = "fa fa-star checked";
        }
        stars.push(
            <i
                style={{ direction: (i % 2 === 0) ? "rtl" : "ltr" }}
                className={klass}
            />
        );
    }
    return (
        <div className="movie__rating">
            {stars}
        </div>
    );
}

const MovieInfo = ({ name, value }) => (
    <div className={`movie__${name}`}>
        <span className='info__head'>
            {name.replace(/\b\w/g, l => l.toUpperCase())}
        </span>
        {value}
    </div>
)

const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

export default function Movie({ infos, buttonType, datiBack }) {
    const data = infos;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef();    //per bloccare lo scorrimento nel momento in cui appare il modal

    return (
        <div className='movie' style={{ zindex: "111", backgroundImage: `url(${getImage(infos.poster_path)})` }}>
            <h3 onClick={onOpen} font-weight="bold" className='movie__title'>{infos.title}</h3>
            <span onClick={onOpen} className='movie__description'>{infos.overview}</span>

            <div className='movie__infos'>
                <MovieInfo name='anno' value={infos.release_date} />
                <button onClick={() => datiBack(data)} className="movie__imdb-button">{buttonType}</button>
            </div> 
            
            <Modal isCentered scrollBehavior={"inside"} finalFocusRef={finalRef} size={''} onClose={onClose} isOpen={isOpen}>
                <ModalContent maxW="75rem">
                    <ModalBody style={{ padding: "1rem" }}>
                        <Prenotazione key={"modalFor-" + infos.title} title={infos.title} imgPath={getImage(infos.poster_path)} trama={infos.overview} uscita={infos.release_date} close={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}