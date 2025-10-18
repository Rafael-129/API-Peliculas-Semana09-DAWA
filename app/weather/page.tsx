import axios from 'axios'
import MovieGalleryClient from './MovieGalleryClient'

// Justificación SSR: SEO y carga inicial rápida de películas populares
async function getPopularMovies() {
  // Ejemplo: buscar "Marvel" como populares
  const res = await axios.get(
    'https://www.omdbapi.com/?apikey=3e224d7a&s=marvel'
  )
  return res.data.Search || []
}

export default async function MovieGalleryPage() {
  const popularMovies = await getPopularMovies()
  return <MovieGalleryClient popularMovies={popularMovies} />
}
