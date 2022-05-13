import React, { useEffect } from 'react';
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
  InputLeftAddon,
  FormHelperText,
  Textarea,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
export default function FormRegistrazione() {
  function getBase64(file) {}

  function checkDati() {
    var nomeInserito = document.getElementById('first_name').value;
    var cognomeInserito = document.getElementById('last_name').value;
    var passwordInserita = document.getElementById('password').value;
    var emailInserita = document.getElementById('email').value;
    var dataNascitaInserita = document.getElementById('data_nascita').value;
    var sessoInserito = document.getElementById('select_sesso').value;
    var linkImmagine_ = document.getElementById('linkImmagine').value;

    console.log("Link: " + linkImmagine_)

    if (
      nomeInserito.length > 25 ||
      cognomeInserito.length > 25 ||
      emailInserita.length > 50 ||
      passwordInserita.length > 18
    ) {} else {
        inserimentoDati(
          nomeInserito,
          cognomeInserito,
          passwordInserita,
          emailInserita,
          dataNascitaInserita,
          sessoInserito,
          linkImmagine_
        );
      }


    function inserimentoDati(
      nome,
      cognome,
      password,
      email,
      data,
      sesso,
      file
    ) {
      axios
        .post(
          'https://87.250.73.22/html/Zanchin/vcoopendays/insertUtente.php?nome=%27+' +
            nome +
            '%27&cognome=%27' +
            cognome +
            '%27&email=%27' +
            email +
            '%27&codiceMecc=%27AB123%27&password=%27' +
            password +
            '%27&classe=%27terza%27&sesso=%27' +
            sesso +
            '%27&dataNascita=%27' +
            data +
            '%27&profilepic=%27' +
            file+
            '%27'
        )
        .then(res => {
          console.log(res);
        });
    }
  }

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.7 }}
          >
            <GridItem colSpan={{ md: 1 }}>
              <Box px={[4, 0]}>
                <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                  Profilo
                </Heading>
                <Text
                  mt={1}
                  fontSize="sm"
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  Registrazione come visitatore al evento.
                </Text>
              </Box>
            </GridItem>
          </motion.div>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              shadow="base"
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}
            >
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 1 }}
              >
                <Stack
                  px={4}
                  py={5}
                  bg={useColorModeValue('white', 'gray.700')}
                  spacing={6}
                  p={{ sm: 6 }}
                >
                  <SimpleGrid columns={6} spacing={6}>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="first_name"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Nome
                      </FormLabel>

                      <Input
                        required
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                      />
                      <FormLabel
                        htmlFor="email"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                        marginTop="1vw"
                      >
                        Email
                      </FormLabel>
                      <Input
                        placeholder="you@example.com"
                        required
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="family-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="last_name"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Cognome
                      </FormLabel>
                      <Input
                        required
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                      />
                      <FormLabel
                        htmlFor="password"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                        marginTop="1vw"
                      >
                        Password
                      </FormLabel>
                      <Input
                        required
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="family-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                      />
                    </FormControl>
                  </SimpleGrid>

                  <div>
                    <SimpleGrid columns={2} spacing={2}>
                      <FormControl as={GridItem} id="email" mt={1}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        >
                          Data di nascita
                        </FormLabel>
                        <Input
                          required
                          type="date"
                          name="data_nascita"
                          id="data_nascita"
                          autoComplete="family-name"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                        />
                      </FormControl>
                      <FormControl as={GridItem} mt={1}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        >
                          Sesso
                        </FormLabel>
                        <Select id="select_sesso" size={'sm'}>
                          <option value="uomo">Uomo</option>
                          <option value="donna">Donna</option>
                          <option value="altro">Altro</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>
                  </div>

                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Foto
                    </FormLabel>
                    <Flex alignItems="center" mt={1}>
                      <Avatar
                        boxSize={12}
                        bg={useColorModeValue('gray.100', 'gray.800')}
                        icon={
                          <Icon
                            as={FaUser}
                            boxSize={9}
                            mt={3}
                            rounded="full"
                            color={useColorModeValue('gray.300', 'gray.700')}
                          />
                        }
                      />
                      <Button
                        type="button"
                        ml={5}
                        variant="outline"
                        size="sm"
                        fontWeight="medium"
                        _focus={{ shadow: 'none' }}
                      >
                        Cambia
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Link immagine profilo.
                    </FormLabel>
                    <Textarea
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: 'sm' }}
                      id="linkImmagine"
                    />
                  </FormControl>
                </Stack>
              </motion.div>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue('gray.50', 'gray.900')}
                textAlign="right"
              >
                <Button onClick={checkDati} size="lg">
                  Continua
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
}
