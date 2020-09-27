import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  CloseButton,
  Stack,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
} from '@chakra-ui/core'

const initialState = {
  title: `Nuevo trabajo`,
}

function NewTask() {
  const [state, setState] = useState(initialState)
  const history = useHistory()
  function handleChange(event) {
    const { id, value } = event.target
    setState((prevState) => ({ ...prevState, [id]: value }))
  }
  return (
    <Flex width="100%" alignItems="center" flexDirection="column">
      <Button
        variant="link"
        onClick={() => history.goBack()}
        alignSelf="flex-start"
        leftIcon="arrow-back"
      >
        Atras
      </Button>
      <Grid
        gridTemplateRows="auto 1fr auto"
        width="50%"
        minWidth="20rem"
        minHeight="50%"
        padding="10"
        backgroundColor="gray.50"
        marginY="2"
        shadow="md"
      >
        <Editable
          value={state.title}
          textAlign="center"
          defaultValue="Nuevo trabajo"
          fontSize="2xl"
          submitOnBlur={false}
        >
          <EditablePreview />
          <EditableInput
            id="title"
            onChange={handleChange}
            value={state.title}
          />
        </Editable>
        <Stack marginY="4" spacing="3">
          <FormControl>
            <FormLabel>Input</FormLabel>
            <Input onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Input</FormLabel>
            <Input onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Input</FormLabel>
            <Input onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Input</FormLabel>
            <Input onChange={handleChange} />
          </FormControl>
        </Stack>
        <Button variantColor="teal" leftIcon="plus-square">
          Añadir
        </Button>
      </Grid>
      <Flex
        shadow="sm"
        backgroundColor="gray.50"
        padding="5"
        borderRadius="50%"
      >
        <CloseButton onClick={() => history.goBack()} />
      </Flex>
    </Flex>
  )
}

export default NewTask
