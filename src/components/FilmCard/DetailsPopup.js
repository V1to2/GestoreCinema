import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Lista(props){
    return (
        <div>
        </div>
    );
}

function DetailsPopup(props){
    const [listaSaleProiezioni, setListaSaleProiezioni] = useState(null);

    useEffect(()=>{
        axios
        .get(
            "https://"
        )
        .then(
            //code ...
        )
    },[]);

    return(
        <div className="PopupFilm-root">
            <div onClick={props.close}>
                <img src="https://www.ilsicomoro.it/js/skins/default/lightbox-close.png" alt="close" />
            </div>
            <div>
                <img className="PopupFilm-image" src={props.imgPath} alt={props.originalTitle}/>
            </div>
            <div className="PopupFilm-info">
                <h1> {props.title} </h1>
                <p>
                    {props.trama}
                </p>
                <pre>
                    Data Di Uscita:      {props.uscita}
                </pre>
            </div>
            <div className="PopupFilm-Proiezioni">
                { listaSaleProiezioni == null ? <div className="alert Warning"> you can't find this film in any Cinema</div> : listaSaleProiezioni.map((cine, i)=>{<Lista key={"cinema-" + cine + i} nomeCinema={cine} listaSale={cine} />}) }
            </div>
        </div>
    );
}


export default DetailsPopup;