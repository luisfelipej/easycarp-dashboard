import React, { useState } from 'react'
import {
  Box,
  Text,
  Input,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
  Button,
} from '@chakra-ui/core'
import { auth, userRef } from '../config/firebase'
import { useAuth } from '../context'

const initialState = {
  email: null,
  password: null,
  isLoading: false,
  error: null,
}

function Login() {
  const [state, setState] = useState(initialState)
  const { logIn } = useAuth()
  const toast = useToast()
  async function onSubmit(e) {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    e.preventDefault()
    const { email, password } = state
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password)
      const userData = await (await userRef.doc(user.uid).get()).data()
      logIn({ token: user.uid, user: userData })
    } catch (error) {
      toast({
        title: `Ha ocurrido un error`,
        description:
          typeof error === `string` ? error : `No se ha podido iniciar sesión`,
        status: `error`,
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }
  function handleChange(event) {
    const { id, value } = event.target
    setState((prevState) => ({ ...prevState, [id]: value }))
  }
  return (
    <Flex
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        width="40%"
        height="40%"
        padding="4"
        borderRadius="5px"
        backgroundColor="#f8f8f8"
        flexDirection="column"
        // alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={onSubmit}>
          <FormControl marginBottom="4">
            <FormLabel htmlFor="email">Nombre de usuario</FormLabel>
            <Input onChange={handleChange} id="email" type="email" autoFocus />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input onChange={handleChange} id="password" type="password" />
          </FormControl>
          <Button
            width="100%"
            mt={4}
            variantColor="teal"
            isLoading={state.isLoading}
            type="submit"
          >
            Iniciar sesión
          </Button>
        </form>
      </Flex>
    </Flex>
  )
}

export default Login
