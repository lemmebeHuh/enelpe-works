import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { reviewText } = await request.json();
    
    // 1. Pembersihan Teks (Ubah ke huruf kecil dan hapus tanda baca)
    const cleanText = reviewText.toLowerCase().replace(/[^\w\s]/gi, '');
    const words = cleanText.split(/\s+/);
    
    // 2. Kamus Bobot (Lexicon)
    const lexicon = {
      "bagus": 2, "keren": 3, "suka": 2, "mantap": 3, "rekomendasi": 3, 
      "menarik": 2, "epic": 3, "seru": 2, "juara": 3, "pecah": 3,
      "jelek": -3, "buruk": -3, "bosan": -2, "lambat": -2, "kecewa": -3, 
      "sampah": -4, "hambar": -2, "garing": -2, "aneh": -2, "ngantuk": -2
    };

    // Kamus Pembalik Makna (Negasi)
    const negations = ["tidak", "bukan", "kurang", "gak", "nggak", "tak", "jangan"];

    let totalScore = 0;

    // 3. Proses Algoritma
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      
      // Jika kata tersebut ada di dalam kamus bobot kita
      if (lexicon[word]) {
        let wordScore = lexicon[word];
        
        // Pengecekan Negasi: Cek apakah 1 kata SEBELUMNYA adalah kata negasi
        if (i > 0 && negations.includes(words[i - 1])) {
          wordScore = wordScore * -1; // Balikkan nilainya! (Positif jadi Negatif)
        }
        
        totalScore += wordScore;
      }
    }

    // 4. Kalkulasi Hasil Akhir
    let label = "neutral";
    let confidence = 0.5;

    if (totalScore > 0) {
      label = "positive";
      // Membuat persentase (score) dinamis berdasarkan besarnya total bobot
      confidence = 0.70 + (Math.min(totalScore, 10) / 10) * 0.28; 
    } else if (totalScore < 0) {
      label = "negative";
      confidence = 0.70 + (Math.min(Math.abs(totalScore), 10) / 10) * 0.28;
    }

    // Delay bohongan agar UI terasa seperti memproses data berat
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json([[{ label: label, score: confidence }]]);

  } catch (error) {
    console.error("Error NLP Lokal:", error);
    return NextResponse.json({ error: "Gagal memproses analisis sentimen." }, { status: 500 });
  }
}