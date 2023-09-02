import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { useRouter } from 'next/router'
import { NextPage } from 'next';
import { GetStaticProps } from 'next'
import { pokeApi } from '@/api';
import { Pokemon, PokemonListResponse, SmallPokemon } from '@/interfaces';
import { GetStaticPaths } from 'next'
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import localFavorites from '@/utils/localFavorites';
import confetti from 'canvas-confetti'
import { getPokemonInfo } from '@/utils';

interface Props {
  pokemon: any
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))
  /* console.log(pokemon) */

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if (!isInFavorites) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>

              <Button
                onClick={onToggleFavorite}
                color="gradient"
                ghost={!isInFavorites}
              >
                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>

            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites</Text>

              <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemonNames: string[] = data.results.map(pokemon => pokemon.name)

  return {
    paths: pokemonNames.map(name => ({
      params: { name }
    })),
    /* paths: [
      {
        params: {
          id: '1'
        }
      }
    ], */
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  }
}

export default PokemonByNamePage
