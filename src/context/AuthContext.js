import React, { useContext, useEffect, useState } from 'react'
import { Box, Text, Spinner, Flex } from '@chakra-ui/core'
import { userRef } from '../config/firebase'

const AuthContext = React.createContext()
const getInitialState = () => ({
  user: null,
  isLoading: true,
})

function AuthProvider({ children }) {
  const [state, setState] = useState(getInitialState())
  useEffect(() => {
    async function getCurrentUser() {
      const token = localStorage.getItem(
        process.env.REACT_APP_TOKEN_KEY || `easycarp_token`,
      )
      if (token) {
        try {
          // traer datos del user DB
          const user = await userRef.doc(token).get()
          if (user.exists) {
            const userData = await user.data()
            setState((prevState) => ({ ...prevState, user: userData }))
          }
        } catch (e) {
          console.log(e)
        }
      }
      setState((prevState) => ({ ...prevState, isLoading: false }))
    }
    getCurrentUser()
  }, [])
  function logIn({ token, user }) {
    localStorage.setItem(
      process.env.REACT_APP_TOKEN_KEY || `easycarp_token`,
      `${token}`,
    )

    return setState({ user })
  }
  function logOut() {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY || `easycarp_token`)

    return setState({ user: null })
  }
  const { user, isLoading } = state
  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {isLoading ? (
        <Flex
          width="100vw"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
