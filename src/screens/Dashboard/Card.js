import React from 'react'
import { Flex, Text, Image, Icon, Button } from '@chakra-ui/core'
import moment from 'moment'

function Card({
  title,
  phone,
  widthCarp,
  highCarp,
  isFinished,
  finishedAt,
  imgUrl,
}) {
  let extraProps = {}
  if (isFinished && finishedAt) {
    extraProps = {
      border: `1px solid`,
      borderColor: `teal.500`,
      backgroundColor: `teal.100`,
    }
  }
  async function markAsReady(id) {
    try {
      // Realizado
    } catch (error) {
      // Handle error
    }
  }
  return (
    <Flex
      marginY="2"
      padding="3"
      borderRadius="5px"
      shadow="2sm"
      backgroundColor="gray.50"
      {...extraProps}
    >
      {imgUrl ? (
        <Image maxWidth={[`150px`, `300px`]} marginRight="3" src={imgUrl} />
      ) : (
        <Flex
          width={[`150px`, `300px`]}
          height="150px"
          marginRight="3"
          justifyContent="center"
          alignItems="center"
        >
          Sin foto
        </Flex>
      )}
      <Flex flexDirection="column">
        <Text textDecoration="underline" marginBottom="3" fontSize="lg">
          {title}
        </Text>
        <Text fontSize="md" color="gray.600">
          <Icon marginRight="2" marginBottom="3" name="phone" />
          {phone ? `+569${phone}` : `Sin contacto`}
        </Text>
        <Text fontSize="md" color="gray.600">
          <Icon marginRight="2" marginBottom="3" name="info-outline" />
          {`${widthCarp}x${highCarp} mts`}
        </Text>
        {isFinished && finishedAt ? (
          <Text
            display="flex"
            alignItems="baseline"
            fontSize="md"
            color="gray.600"
          >
            <Icon
              alignSelf="flex-end"
              marginRight="2"
              marginBottom="3"
              name="time"
            />
            {moment(finishedAt.toDate()).format(`DD-MM-YYYY`)}
          </Text>
        ) : (
          <Button leftIcon="check" variant="outline" color="teal.500">
            Listo
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default Card
