import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Lista(props){
    return (
        <div>
            <div>props.sala</div>
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
            setListaSaleProiezioni(result.data);
        })
    }, [props.title]);

    const stile = {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        borderRadius: "35px"
    }

    const stilebottone = {
        position: "absolute",
        width: "2.6rem",
        height: "2.6rem",
        top: "-1.3rem",
        right: "-1.3rem",
    }

    const stileimmagine = {
        height: "40rem",
        width: "40rem",
        borderRadius: "5px"
    }

    const stileTesto = {
        margin: "1rem",
        width: "50rem",
        backgroundColor: "#414f67",
        padding: "1rem",
        borderRadius: "15px"
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
                <h1 style={ { fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1.5rem" } }> {props.title} </h1>
                <p style={ {margin: "1rem"} }>
                    {props.trama}
                </p>
                <pre style={ {margin: "1rem"} }>
                    Data Di Uscita:      {props.uscita}
                </pre>
                <div className="PopupFilm-Proiezioni">
                    { (!(listaSaleProiezioni != null && listaSaleProiezioni.length > 0)) ? <div className="alert Warning"> We can't find this Film in any Cinema</div> : listaSaleProiezioni.map((cine, i)=>{<Lista key={"cinema-" + cine + i} nomeCinema={cine} sala={cine.sala_id} />}) }
                </div>
            </div>
        </div>
    );
}


export default DetailsPopup;