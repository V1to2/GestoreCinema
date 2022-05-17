import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Grid, GridItem } from '@chakra-ui/react'
import './Sala.css'
import axios from 'axios';

function Posto(props){
  return(
    <Box >
      {props.number}
    </Box>
  );
}

function Fila(props){
  return(
    <Grid>
      {props.posti.map((seat)=>{<Posto key={"seat" + props.lettera + seat.numero} number={seat} />})}
    </Grid>
  );
}

function Sala(){
  const [file, setFile] = useState([])


  useEffect(()=>{
    axios
    .get(
      "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/Request.php"
    ).then((result)=>{
      let dati = result.data
      console.log(dati)
      setFile(dati)
    })
  },[])


  return(
    <Box>
      <Grid>
        <GridItem key={"schermo"} style={{background: "linear-gradient(to top, lightgrey, white)", height: "4rem", width: "auto", marginLeft: "10%", marginRight: "10%", borderRadius: "0.5rem 0.5rem 3rem 3rem"}} />
        <GridItem key={"posti"}>
          { file.map((fila)=>{<Fila key={"fila" + fila.lettera} lettera={fila.lettera} posti={fila.posti} />})}
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Sala