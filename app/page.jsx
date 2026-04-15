"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movies"));
        const allMovies = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Logika Acak (Fisher-Yates Shuffle)
        const shuffled = allMovies.sort(() => 0.5 - Math.random());
        
        // Ambil 5 film saja
        setMovies(shuffled.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies: ", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-400 text-sm tracking-widest animate-pulse">
          MEMUAT...
        </span>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-1">
            ENELPE-WORKS
          </h1>
          <p className="text-gray-500 text-sm">
            Menganalisis sentimen ulasan film.
          </p>
        </div>
      </header>

      {/* Grid Minimalis: 2 kolom di HP, 4 kolom di Laptop */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
        {movies.map((movie) => (
          <div key={movie.id} className="group flex flex-col">
            {/* Poster dengan efek hover zoom halus */}
            <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[2/3] mb-4">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md font-medium">
                ★ {movie.rating}
              </div>
            </div>
            
            {/* Teks Minimalis */}
            <h2 className="font-semibold text-base leading-tight mb-1 text-gray-900 line-clamp-1">
              {movie.title}
            </h2>
            <p className="text-xs text-gray-500 mb-4 truncate">
              {movie.actors.slice(0, 2).join(", ")} {/* Hanya nampilin 2 aktor biar rapi */}
            </p>

            {/* Tombol Outline Elegan (Pindah ke bawah otomatis) */}
            <div className="mt-auto">
              <Link href={`/movie/${movie.id}`}>
                <button className="w-full py-2 px-4 bg-transparent border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                  Tulis Ulasan
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}