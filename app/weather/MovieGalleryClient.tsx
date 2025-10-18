"use client"
import { useState } from 'react'
import MovieSearch, { MovieDetailModal } from './MovieSearch'

export default function MovieGalleryClient({ popularMovies }: { popularMovies: any[] }) {
  const [selected, setSelected] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
          🎬 Galería de Películas y Series
        </h1>
        {/* CSR: Búsqueda */}
        <MovieSearch />
        {/* SSR: Populares */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-6 border-4 border-white mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🔥 Populares (SSR)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularMovies.map((movie: any) => (
              <div
                key={movie.imdbID}
                className="bg-white rounded shadow p-2 cursor-pointer"
                onClick={async () => {
                  // Obtén detalles completos usando la API
                  const res = await fetch(`https://www.omdbapi.com/?apikey=3e224d7a&i=${movie.imdbID}`)
                  const data = await res.json()
                  setSelected(data)
                }}
              >
                <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover rounded mb-2" />
                <div className="font-bold text-black">{movie.Title}</div>
                <div className="text-xs font-bold text-black">{movie.Year}</div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-green-800">✅ Renderizado en el servidor para mejor SEO y carga inicial.</p>
        </div>
        {/* Modal para detalles SSR */}
        {selected && (
          <MovieDetailModal movie={selected} onClose={() => setSelected(null)} />
        )}
        {/* Justificación de SSR/CSR */}
        <div className="mt-8 bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-6 border-4 border-white">
          <h3 className="text-gray-700 text-2xl font-bold mb-4">ℹ️ Justificación SSR vs CSR</h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li><b>SSR</b>: Se usa para mostrar películas populares al cargar la página, optimizando SEO y tiempo inicial.</li>
            <li><b>CSR</b>: Se usa para búsqueda y detalles, permitiendo interactividad y experiencia dinámica sin recargar la página.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
