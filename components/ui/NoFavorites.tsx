import React from 'react'
import { Container, Image, Text } from '@nextui-org/react'

export const NoFavorites = () => {
  return (
    <Container css={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 100px)',
      justifyContent: 'center',
      alignSelf: 'center'
    }}>
      <Text h1>No hay favoritos</Text>
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
        width={250}
        height={250}
      />
    </Container>
  )
}
