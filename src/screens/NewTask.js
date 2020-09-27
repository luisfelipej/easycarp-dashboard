import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Flex,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  CloseButton,
  Stack,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  useToast,
} from '@chakra-ui/core'
import { taskRef } from '../config/firebase'

const initialState = {
  title: `Nuevo trabajo`,
  widthCarp: null,
  highCarp: null,
  estimatedTime: null,
  realTime: null,
}

function NewTask() {
  const [state, setState] = useState(initialState)
  const history = useHistory()
  const toast = useToast()
  function handleChange(event) {
    const { id, value } = event.target
    setState((prevState) => ({ ...prevState, [id]: value }))
  }
  async function createTask() {
    try {
      const { widthCarp, highCarp, realTime, estimatedTime, ...task } = state
      await taskRef.add({
        ...task,
        widthCarp: Number(widthCarp),
        highCarp: Number(highCarp),
        realTime: Number(realTime),
        estimatedTime: Number(estimatedTime),
      })
      toast({
        title: `Trabajo guardado 🔧`,
        status: `success`,
        duration: 3000,
      })
      history.goBack()
    } catch (error) {
      toast({
        title: `No se ha podido guardar el nuevo trabajo`,
        status: `error`,
        duration: 3000,
      })
    }
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
            <FormLabel htmlFor="widthCarp">Ancho carpa</FormLabel>
            <Input
              type="number"
              id="widthCarp"
              autoFocus
              onChange={handleChange}
            />
            <FormHelperText id="helper-widthCarp">
              Unidad: Metros
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="highCarp">Largo carpa</FormLabel>
            <Input type="number" id="highCarp" onChange={handleChange} />
            <FormHelperText id="helper-highCarp">Unidad: Metros</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="estimatedTime">Tiempo estimad</FormLabel>
            <Input type="number" id="estimatedTime" onChange={handleChange} />
            <FormHelperText id="helper-estimatedTime">
              Unidad: Días
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="realTime">Tiempo real</FormLabel>
            <Input type="number" id="realTime" onChange={handleChange} />
            <FormHelperText id="helper-realTime">Unidad: Días</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">Contacto</FormLabel>
            <InputGroup>
              <InputLeftAddon>+569</InputLeftAddon>
              <Input type="tel" id="phone" onChange={handleChange} />
            </InputGroup>
          </FormControl>
        </Stack>
        <Button onClick={createTask} variantColor="teal" leftIcon="plus-square">
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
