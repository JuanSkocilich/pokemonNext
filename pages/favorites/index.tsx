import { Layout } from '@/components/layouts'
import { NoFavorites } from '@/components/ui'
import { FavoritePokemons } from '@/components/ui';
import localFavorites from '@/utils/localFavorites';
import { Card, Container, Grid, Image, Text } from '@nextui-org/react'
import React from 'react'
import { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
  }, [])

  return (
    <Layout title='Pokemons - Favoritos'>
      {favoritePokemons.length === 0
        ? (<NoFavorites />)
        : (<FavoritePokemons pokemons={favoritePokemons} />)}

    </Layout>
  )
}

export default FavoritesPage
