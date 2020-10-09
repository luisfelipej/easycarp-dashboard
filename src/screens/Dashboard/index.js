import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Flex,
  Text,
  Button,
  IconButton,
  useToast,
  Grid,
  Spinner,
} from '@chakra-ui/core'
import { taskRef } from '../../config/firebase'
import { useAuth } from '../../context'
import Card from './Card'
import Skeleton from './Skeleton'

const initialState = {
  tasks: [],
  isLoading: true,
  error: null,
}

function MainApp() {
  const { user } = useAuth()
  const history = useHistory()
  const toast = useToast()
  const [state, setState] = useState(initialState)
  useEffect(() => {
    async function getTasks() {
      try {
        const tasksRef = await (await taskRef.get()).docs
        const tasks = tasksRef.map((taskRef) => taskRef.data())
        setState((prevState) => ({
          ...prevState,
          tasks,
          isLoading: false,
          error: null,
        }))
      } catch (error) {
        toast({
          title: `No se ha podido guardar el nuevo trabajo`,
          status: `error`,
          duration: 3000,
        })
        setState((prevState) => ({ ...prevState, error, isLoading: false }))
      }
    }
    getTasks()
  }, [])
  const { tasks, isLoading } = state
  return (
    <Flex width="100%" flexDirection="column">
      <Flex width="100%" justifyContent="space-between" alignItems="baseline">
        <Text fontSize="2xl">Hola, {user.name.split(` `)[0]}</Text>
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
      <Grid gap="2" gridTemplateColumns="repeat(auto-fit, minmax(49%, 1fr))">
        {isLoading ? (
          <Skeleton />
        ) : (
          tasks.map((task) => <Card key={task.uid} {...task} />)
        )}
      </Grid>
    </Flex>
  )
}

export default MainApp
