/* eslint-disable max-lines-per-function */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker'
import ImageUploader from 'react-images-upload'

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
  Switch,
  useToast,
  Spinner,
  Image,
} from '@chakra-ui/core'
import es from 'date-fns/locale/es'
import { taskRef, storageRef } from '../config/firebase'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale(`es`, es)
const initialState = {
  title: `Nuevo trabajo`,
  widthCarp: null,
  highCarp: null,
  isFinished: false,
  finishedAt: null,
  phone: null,
  imgUrl: null,
}

function NewTask() {
  const [state, setState] = useState(initialState)
  const [uploadingImage, setUploadingImage] = useState(false)
  const history = useHistory()
  const toast = useToast()
  function handleChange(event) {
    const { id, value, checked } = event.target
    setState((prevState) => ({ ...prevState, [id]: value || checked }))
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
  async function uploadImage([image]) {
    setUploadingImage(true)
    try {
      const img = await storageRef.child(`images/${image.name}`).put(image)
      const imgUrl = await img.ref.getDownloadURL()
      setState({ imgUrl })
    } catch (error) {
      console.log(error)
    } finally {
      setUploadingImage(false)
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
            <FormLabel htmlFor="widthCarp">Foto camión</FormLabel>
            {state.imgUrl ? (
              <Image fallbackSrc={state.imgUrl} />
            ) : uploadingImage ? (
              <Spinner />
            ) : (
              <ImageUploader
                buttonText="Subir imagen"
                withLabel={false}
                singleImage
                onChange={uploadImage}
              />
            )}
            <FormHelperText id="helper-widthCarp">
              Foto referencia
            </FormHelperText>
          </FormControl>
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
            <FormLabel htmlFor="phone">Contacto</FormLabel>
            <InputGroup>
              <InputLeftAddon>+569</InputLeftAddon>
              <Input type="tel" id="phone" onChange={handleChange} />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="isFinished">¿Está terminado?</FormLabel>
            <Switch type="number" id="isFinished" onChange={handleChange} />
          </FormControl>
          {state.isFinished ? (
            <FormControl>
              <FormLabel htmlFor="finishedAt">Fecha realizado</FormLabel>
              <DatePicker
                dateFormat="P"
                selected={state.finishedAt || new Date()}
                onChange={(finishedAt) =>
                  setState((prevState) => ({ ...prevState, finishedAt }))
                }
                locale="es"
              />
            </FormControl>
          ) : null}
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
