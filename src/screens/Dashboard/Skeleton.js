import React from 'react'
import Skeleton from '@chakra-ui/core/dist/Skeleton'

function SkeletonLoading() {
  return (
    <>
      <Skeleton height="8em" />
      <Skeleton height="8em" />
      <Skeleton height="8em" />
      <Skeleton height="8em" />
    </>
  )
}

export default SkeletonLoading
