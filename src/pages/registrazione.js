import React, { useEffect, useState } from 'react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button } from '@chakra-ui/react'
import { Formik, Field, Form } from "formik";

function TheInput(props) {
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
    if (!value) {
      error = 'Questo campo è obbligatorio'
    } else if (isNaN(value)){
      error = 'Questo campo non può contenere Testo'
    }
    return error
  }

  return (
    <Formik
      initialValues={{ mail: null, password: null, username: null, avatar: null, nome: null, cognome: null, indirizzo: null, eta: null }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }} >
      {(props) => (
        <Form>
          <Field name='mail' validate={validateMail}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.mail && form.touched.mail}>
                <FormLabel htmlFor='mail-input'>inserisci quì sotto la tua mail (ti manderemo una mail per confermare la tua iscrizione)</FormLabel>
                <Input {...field} id='mail-input' placeholder='inserisci quì la tua mail' />
                <FormErrorMessage>{form.errors.mail}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button mt={4} colorScheme='teal' isLoading={props.isSubmitting} type='submit' > Submit </Button>
        </Form>
      )}
    </Formik>
  )
}



export default TheInput;