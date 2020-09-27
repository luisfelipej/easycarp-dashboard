import React from 'react'
import { Flex, Text, Image, Icon, Button, Heading } from '@chakra-ui/core'

function Card({ title, phone, estimatedTime, realTime, widthCarp, highCarp }) {
  return (
    <Flex
      marginY="2"
      padding="3"
      borderRadius="5px"
      shadow="2sm"
      backgroundColor="gray.50"
    >
      <Image
        marginRight="3"
        src="gibbresh.png"
        fallbackSrc="https://via.placeholder.com/150"
      />
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
        <Text fontSize="md" color="gray.600">
          <Icon marginRight="2" marginBottom="3" name="time" />
          {`${estimatedTime} días`}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Card
