import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Grid, GridItem } from '@chakra-ui/react'
import './Sala.css'

function Sala(){
return(
    <div>
<Grid
marginTop='5%'
  h='120px'
  w='30%'
  marginLeft='17%'
  transform='rotateX(-45deg)'
  boxShadow= '1px 3px 10px white'
  bg='grey'
></Grid>
<SimpleGrid columns={24} marginTop='10%' marginLeft='25%'>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
</SimpleGrid>
<SimpleGrid columns={24} marginLeft='25%'>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
</SimpleGrid>
<SimpleGrid columns={24} marginLeft='25%'>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
</SimpleGrid>
<SimpleGrid columns={24} marginLeft='25%'>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
</SimpleGrid>
<SimpleGrid columns={24} marginLeft='25%'>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
</SimpleGrid>
<SimpleGrid columns={24} marginLeft='25%'>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
  <Box bg='tomato' width='25px' height='22px' margin='3px' borderTopLeftRadius='10px' borderTopRightRadius='10px' className='seat'></Box>
</SimpleGrid>
    </div>
)}

export default Sala