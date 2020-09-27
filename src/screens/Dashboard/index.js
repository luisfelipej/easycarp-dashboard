import React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Text, Button, IconButton } from '@chakra-ui/core'
import { useAuth } from '../../context'

function MainApp() {
  const { user } = useAuth()
  const history = useHistory()
  return (
    <Flex width="100%">
      <Flex width="100%" justifyContent="space-between" alignItems="baseline">
        <Text fontSize="2xl">Hola, {user.name}</Text>
        <Flex>
          <IconButton
            marginRight="2"
            aria-label="Search database"
            icon="search"
          />
          <Button
            onClick={() => history.push(`nuevo`)}
            rightIcon="chevron-right"
            variantColor="teal"
          >
            Nuevo trabajo
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MainApp
