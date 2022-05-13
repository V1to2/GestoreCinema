import React, { useEffect, useState } from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  FormHelperText,
  FormErrorMessage,
  List,
  Textarea,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  ListItem,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

function Error(props){
  return(
    <div>
      Valore non consentito
      <div>
        {props.errors.map((text)=>{<li key={"input-error-" + text}>text</li>})}
      </div>
    </div>
  )
}

function TheInput(props) {
  const [input, setInput] = useState('')

  const handleInputChange = (e) => setInput(e.target.value)

    const isEmpty = input.length == 0
    const isMail = true
    const isError = isEmpty || isMail

  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor={props.ID}>{props.testoEtichetta}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children='$' />
        <Input id={props.ID} type={props.tipo} value={input} onChange={handleInputChange} />
      </InputGroup>
      {!isError ? (
        <FormHelperText>
          {props.help}
        </FormHelperText>
      ) : (
        <FormErrorMessage>
          <p>
            Valore non valido
            <List>
              <ListItem>
                Formato mail non valido
              </ListItem>
            </List>
          </p>
        </FormErrorMessage>
      )}
    </FormControl>
  )
}




function FormRegistrazione() {

  return (
    <div>
      <TheInput tipo="email" ID="add-client-email" testoEtichetta="E-Mail" help="Inserisci quì la mail che dal momento in cui avrai completato la registrazione utilizzeremo per comunicazioni, biglietti, e altro ancora" />
    </div>
  );
}


export default FormRegistrazione;