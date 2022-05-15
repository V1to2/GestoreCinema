import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

function QR (props){
  return (
      <>
        <QRCode value={props.value} />
      </>
  );
}

export default QR;