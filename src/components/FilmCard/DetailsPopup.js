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
            "https://87.250.73.22/html/Ardizio/informatica/php/Progetto%20Cinema/api%20php/getProiezioniFilm.php?searchFilm_title=" + props.title
        )
        .then((result) => {
            console.log(result.data)
            
        })
    },[]);

    const stile = {
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between"
    }

    const stilebottone = {
        position: "absolute",
        width: "2.6rem",
        height: "2.6rem",
        top: "-1.3rem",
        right: "-1.3rem",
    }

    const stileimmagine = {
        height: "100%",
        width: 'auto',
        paddingRight: '6%',
    }

    const stileTesto = {
        width: "30rem"
    }

    return(
        <div className="PopupFilm-root" style={stile}>
            <div onClick={props.close} style={stilebottone}>
                <img src="https://www.ilsicomoro.it/js/skins/default/lightbox-close.png" alt="close" draggable={ false } />
            </div>
            <div>
                <img className="PopupFilm-image" style={stileimmagine} src={props.imgPath} alt={props.originalTitle}/>
            </div>
            <div className="PopupFilm-info" style={stileTesto}>
                <h1> {props.title} </h1>
                <p>
                    {props.trama}
                </p>
                <pre>
                    Data Di Uscita:      {props.uscita}
                </pre>
                <div className="PopupFilm-Proiezioni">
                    { listaSaleProiezioni == null ? <div className="alert Warning"> We can't find this Film in any Cinema</div> : listaSaleProiezioni.map((cine, i)=>{<Lista key={"cinema-" + cine + i} nomeCinema={cine} listaSale={cine} />}) }
                </div>
            </div>
        </div>
    );
}


export default DetailsPopup;