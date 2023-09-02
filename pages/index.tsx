import { PokemonListResponse, SmallPokemon } from "../interfaces"
import { pokeApi } from "../api"
import { Layout } from "../components/layouts"
import { Button, Card, Grid, Row, Text, Image } from "@nextui-org/react"
import { NextPage } from "next"
import { GetStaticProps } from 'next'
import { PokemonCard } from "../components/pokemon"

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {


  return (
    <>
      <Layout title="Listado de Pokemons">
        <>
          <Image
            src='/img/banner.png'
            width={200}
            height={150}
          />
          <Grid.Container gap={2} justify='flex-start'>
            {pokemons.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </Grid.Container>
        </>
      </Layout>
    </>
  )
}



export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  /* console.log(data) */

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg

  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage
