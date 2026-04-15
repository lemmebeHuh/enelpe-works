"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function MovieDetail() {
  const { id } = useParams(); // Mengambil ID film dari URL
  const [movie, setMovie] = useState(null);
  
  // State untuk form & AI
  const [review, setReview] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sentimentResult, setSentimentResult] = useState(null);

  // Mengambil detail film dari Firebase
  useEffect(() => {
    const fetchDetail = async () => {
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMovie(docSnap.data());
      }
    };
    fetchDetail();
  }, [id]);

  // Fungsi saat tombol "Analisis" ditekan
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!review) return;

    setIsAnalyzing(true);
    setSentimentResult(null);

    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewText: review }),
      });

      const data = await res.json();
      
      // Jika AI melempar error (seperti model sedang loading)
      if (!res.ok) {
        alert(`INFO AI: ${data.error}`);
        setIsAnalyzing(false);
        return;
      }
      
      // Mengambil hasil yang benar
      if(data && data[0] && data[0][0]) {
        setSentimentResult(data[0][0]);
      }
    } catch (error) {
      alert("Gagal menghubungi server AI kita.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!movie) return <div className="p-20 text-center animate-pulse">Mencari gulungan film...</div>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Bagian Trailer & Judul */}
      <div className="aspect-video w-full bg-black rounded-xl overflow-hidden mb-8 shadow-lg">
        <iframe 
          className="w-full h-full" 
          src={movie.trailer} 
          allowFullScreen
        ></iframe>
      </div>
      
      <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-500 mb-8">{movie.synopsis}</p>

      {/* Bagian Form Review & AI */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Uji Sentimen AI</h2>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tulis pendapat jujurmu tentang film ini..."
            className="w-full p-4 rounded-xl border border-gray-200 mb-4 focus:ring-2 focus:ring-black outline-none transition-all"
            rows="4"
          />
          <button 
            type="submit" 
            disabled={isAnalyzing}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 transition-all"
          >
            {isAnalyzing ? "Robot sedang membaca..." : "Kirim & Analisis"}
          </button>
        </form>

        {/* Hasil Analisis AI */}
        {sentimentResult && (
          <div className={`mt-6 p-5 rounded-xl border shadow-sm ${sentimentResult.label === "positive" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
            <h3 className="font-bold text-sm mb-3 text-gray-700 border-b border-gray-200/50 pb-2">
              🤖 Hasil Deteksi AI
            </h3>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
              <span className={`text-2xl font-black uppercase tracking-wider ${sentimentResult.label === "positive" ? "text-green-600" : "text-red-600"}`}>
                {sentimentResult.label === "positive" ? "POSITIF" : "NEGATIF"}
              </span>
              <span className="text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm text-gray-600">
                Akurasi: {(sentimentResult.score * 100).toFixed(1)}%
              </span>
              <span className="text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm text-gray-600 capitalize">
                Emosi: {sentimentResult.emosi_dominan}
              </span>
            </div>
            
            {sentimentResult.kesimpulan_ai && (
              <p className="text-sm text-gray-600 italic bg-white/50 p-3 rounded-lg">
                "{sentimentResult.kesimpulan_ai}"
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}