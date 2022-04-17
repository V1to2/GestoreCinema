import { useEffect, useState } from "react";

function Action(props){
    const [choosen, setChoosen] = useState("false");

    return (
        <div className=""> {props.text} </div>
    );
}

function Actions(props){
    return (
        <div>
            <Action key="voice1" text="acquistati" />
            <Action key="voice2" text="preferiti" />
            <Action key="voice3" text="profilo" />
        </div>
    );
}

function Profile(props){
    const [nome, setNome] = useState(props.nome);
    const [img_src, setImg_src] = useState(props.avatar);

    return (
        <>
            <div className="">
                <div className="">
                    <img src={img_src} alt="profile image" />
                </div>
                <p>{nome}</p>
            </div>
            <Actions />
        </>
    );
}

export default Profile;
