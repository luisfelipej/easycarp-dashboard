import React from 'react'
import { Grid, Flex, Text, Button } from '@chakra-ui/core'
import { useAuth } from '../context'

function Layout({ children }) {
  const { logOut } = useAuth()
  return (
    <Grid gridTemplateRows="auto 1fr auto" height="100vh">
      <Flex
        padding="5"
        justifyContent="space-between"
        alignItems="baseline"
        backgroundColor="teal.500"
      >
        <Text color="gray.50">EasyCarp Dashboard</Text>
        <Button onClick={logOut} variant="link" color="gray.50">
          Salir
        </Button>
      </Flex>
      <Flex padding="4">{children}</Flex>
    </Grid>
  )
}

export default Layout
