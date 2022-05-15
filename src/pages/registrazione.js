import React, { useEffect, useState } from 'react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Flex, Grid, GridItem  } from '@chakra-ui/react'
import { Formik, Field, Form } from "formik"
import { EmailIcon, LockIcon, AttachmentIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement, InputRightElement, Button, Stack } from '@chakra-ui/react'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import axios from 'axios'

function TheInput(props) {
  const [show, setShow] = useState(false)
  const [esito, setEsito] = useState(null)

  function validateMail(value) {
    let error
    if (!value) {
      error = 'Il campo mail è obbligatorio'
    } else if (!(value.includes("@") && value.includes("."))) {
      error = "Inserisci una mail valida"
    }
    return error
  }

  function validatePassword(value){
    let error
    if (!value) {
      error = 'Il campo password è obbligatorio'
    }
    return error
  }

  function validateOnlyText(value){
    let error
    if (!value) {
      error = 'Questo campo è obbligatorio'
    } else if (value.includes("0") || value.includes("1") || value.includes("2") || value.includes("3") || value.includes("4") || value.includes("5") || value.includes("6") || value.includes("7") || value.includes("8") || value.includes("9")){
      error = 'Questo campo non può contenere numeri'
    }
    return error
  }

  function validateOnlyNumber(value){
    let error
    if (value.length == 0) {
      error = 'Questo campo è obbligatorio'
    } else if (isNaN(value)){
      error = 'Questo campo non può contenere Testo'
    }
    return error
  }

  function validateOnlyFilled(value){
    let error
    if (value.length == 0 || !value || value == null) {
      error = 'Questo campo è obbligatorio'
    }
    return error
  }


  return (
    <Box m={20}>
     { (esito != null) ?
          (esito == true) ?
            <Alert status='success'>
              <AlertIcon />
              <AlertTitle>Perfetto</AlertTitle>
              <AlertDescription> la tua richiesta iscrizione è stata completata correttamente, controlla la casella di posta per confermare l'iscrizione</AlertDescription>
            </Alert>
          : 
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Oh Oh!</AlertTitle>
            <AlertDescription>Qualcosa è andato storto, prova ad effetuare l'accesso, altrimenti ripeti l'iscrizione</AlertDescription>
          </Alert>
    :
          <></>
      }



     <Formik initialValues={{
      mail: '',
      password: '',
      username: '',
      nome: '',
      cognome: '',
      indirizzo: '',
      eta: ''
      }}
      onSubmit={(values, actions)=>{
        axios.post(
          "https://87.250.73.22/html/Ardizio/informatica/php/Progetto Cinema/api php/insertNewUser.php?"
          + "mail=" + document.getElementById('mail-input').value
          + "&password=" + document.getElementById('password-input').value
          + "&username=" + document.getElementById('username-input').value
          + "&nome=" + document.getElementById('nome-input').value
          + "&cognome=" + document.getElementById('cognome-input').value
          + "&indirizzo=" + document.getElementById('indirizzo-input').value
          + "&eta=" + document.getElementById('eta-input').value
        ).then((r)=>{
          let c = r.data
          console.log(c);
          setEsito(c);
        })
        actions.setSubmitting(false)
        }
      } >
      {(props) => (
      <Form>
        <Grid templateRows='repeat(4, 1fr)' templateColumns='repeat(12, 1fr)' gap={4}>
        <GridItem colSpan={5}>
          <Field name='mail' validate={validateMail}>
            {({ field, form }) => (
            <FormControl isInvalid={form.errors.mail && form.touched.mail}>
            <FormLabel htmlFor='mail-input'>E-Mail</FormLabel>
            <InputGroup>
               <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children={
               <EmailIcon color={"gray.500"} />
               } />
               <Input {...field} id='mail-input' placeholder='inserisci quì la tua mail' variant={'filled'} />
            </InputGroup>
            <FormErrorMessage>{form.errors.mail}</FormErrorMessage>
            </FormControl>
            )}
          </Field>
        </GridItem>
        <GridItem colSpan={5}>
         <Field name='password' validate={validatePassword}>
            {({ field, form }) => (
            <FormControl isInvalid={form.errors.password && form.touched.password}>
            <FormLabel htmlFor='password-input'>Password</FormLabel>
            <InputGroup>
               <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children={
               <LockIcon color={"gray.500"} />
               } />
               <Input type={ (show) ? "text" : "password"} {...field} id='password-input' placeholder='inserisci quì la tua password' variant={'filled'} />
               <InputRightElement>
                  <Button onClick={()=>
                     {setShow(!show)}}>
                     {(show) ? 
                     <ViewOffIcon m />
                     : 
                     <ViewIcon />
                     }
                  </Button>
               </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
            </FormControl>
            )}
         </Field>
        </GridItem>
        <GridItem colSpan={2}>
         <Field name='username' validate={true}>
            {({ field, form }) => (
            <FormControl>
               <FormLabel htmlFor='username-input'>Username</FormLabel>
               <InputGroup>
                  <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children={
                  <AttachmentIcon color={"gray.500"} />
                  } />
                  <Input {...field} id='username-input' placeholder='inserisci quì un tuo eventuale username (potrai impostarlo anche successivamente)' variant={'filled'} />
               </InputGroup>
            </FormControl>
            )}
         </Field>
        </GridItem>
        <GridItem colSpan={6}>
         <Field name='nome' validate={validateOnlyText}>
            {({ field, form }) => (
            <FormControl isInvalid={form.errors.nome && form.touched.nome}>
            <FormLabel htmlFor='nome-input'>Nome</FormLabel>
            <InputGroup>
               <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children={
               <AttachmentIcon color={"gray.500"} />
               } />
               <Input {...field} id='nome-input' placeholder='inserisci quì il tuo nome' variant={'filled'} />
            </InputGroup>
            <FormErrorMessage>{form.errors.nome}</FormErrorMessage>
            </FormControl>
            )}
         </Field>
        </GridItem>
        <GridItem colSpan={6}>
         <Field name='cognome' validate={validateOnlyText}>
            {({ field, form }) => (
            <FormControl isInvalid={form.errors.cognome && form.touched.cognome}>
            <FormLabel htmlFor='cognome-input'>Cognome</FormLabel>
            <InputGroup>
               <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children={
               <AttachmentIcon color={"gray.500"} />
               } />
               <Input {...field} id='cognome-input' placeholder='inserisci quì il tuo cognome' variant={'filled'} />
            </InputGroup>
            <FormErrorMessage>{form.errors.cognome}</FormErrorMessage>
            </FormControl> 
            )}
         </Field>
        </GridItem>
        <GridItem colSpan={2}>
         <Field name='eta' validate={validateOnlyFilled}>
            {({ field, form }) => (
            <FormControl isInvalid={form.errors.eta && form.touched.eta}>
            <FormLabel htmlFor='eta-input'>Età</FormLabel>
            <InputGroup>
               <NumberInput id='eta-input-group' variant={'filled'} min={0} max={125}>
                  <NumberInputField {...field} id='eta-input' placeholder='inserisci quì la tua età' />
               </NumberInput>
            </InputGroup>
            <FormErrorMessage>{form.errors.eta}</FormErrorMessage>
            </FormControl>
            )}
         </Field>
        </GridItem>
        <GridItem colSpan={4}>
         <Field name='indirizzo' validate={true}>
            {({ field, form }) => (
            <FormControl>
               <FormLabel htmlFor='indirizzo-input'>indirizzo</FormLabel>
               <InputGroup>
                  <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children={ <AttachmentIcon color={"gray.500"} /> } />
                  <Input {...field} id='indirizzo-input' placeholder='inserisci quì il tuo indirizzo' variant={'filled'} />
               </InputGroup>
            </FormControl>
            )}
         </Field>
        </GridItem>
        <GridItem colSpan={12}>
         <Button mt={6} width={"100%"} colorScheme='teal' isLoading={props.isSubmitting} type='submit' > Conferma </Button>
        </GridItem>
        </Grid>
      </Form>
      )}
      </Formik>



    </Box>
  )
}



export default TheInput;