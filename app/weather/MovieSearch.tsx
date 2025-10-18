"use client"
import axios from 'axios'
import { useState, useEffect } from 'react'

function MovieDetailModal({ movie, onClose }: { movie: any, onClose: () => void }) {
  if (!movie) return null
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✖️</button>
        <h2 className="text-2xl font-bold mb-2">{movie.Title} ({movie.Year})</h2>
        <img src={movie.Poster} alt={movie.Title} className="w-40 mb-4 mx-auto" />
        <p className="mb-2"><span className="font-semibold">Género:</span> {movie.Genre}</p>
        <p className="mb-2"><span className="font-semibold">Director:</span> {movie.Director}</p>
        <p className="mb-2"><span className="font-semibold">Actores:</span> {movie.Actors}</p>
        <p className="mb-2"><span className="font-semibold">Sinopsis:</span> {movie.Plot}</p>
        <p className="mb-2"><span className="font-semibold">IMDB:</span> {movie.imdbRating}</p>
      </div>
    </div>
  )
}

export default function MovieSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length < 3) {
      setResults([])
      return
    }
    setLoading(true)
    const timeout = setTimeout(async () => {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=3e224d7a&s=${encodeURIComponent(query)}`
      )
      setResults(res.data.Search || [])
      setLoading(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [query])

  async function showDetail(imdbID: string) {
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=3e224d7a&i=${imdbID}`
    )
    setSelected(res.data)
  }

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-6 border-4 border-white mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🔎 Buscar Películas o Series</h2>
      <input
        className="w-full p-2 border rounded mb-4 font-bold text-black"
        placeholder="Escribe el título..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ fontWeight: 'bold' }}
      />
      {loading && <div className="text-blue-600">Buscando...</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map(movie => (
          <div
            key={movie.imdbID}
            className="bg-white rounded shadow p-2 cursor-pointer hover:scale-105 transition"
            onClick={() => showDetail(movie.imdbID)}
          >
            <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover rounded mb-2" />
            <div className="font-semibold">{movie.Title}</div>
            <div className="text-xs text-gray-500">{movie.Year}</div>
          </div>
        ))}
      </div>
      {selected && <MovieDetailModal movie={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
