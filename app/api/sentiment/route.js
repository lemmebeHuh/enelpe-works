import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { reviewText } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key Gemini tidak terdeteksi." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
    Kamu adalah komentator film yang hobi julid tapi jujur. 
    Tugasmu adalah menganalisis ulasan ini: "${reviewText}".
    
    Berikan respon yang lucu, sedikit sinis, tapi tetap asik diajak ngobrol. 
    Wajib kembalikan jawaban HANYA dalam format JSON mentah dengan struktur:
    {
      "label": "positive atau negative",
      "score": 0.85,
      "emosi_dominan": "Gunakan variasi emosi yang lebih berwarna dan luas (misal: 'Kena Prank Marketing', 'Cinta Buta', 'Ngantuk Berjamaah', 'Gak Habis Fikri', 'Hampir Nangis')",
      "kesimpulan_ai": "Berikan 1 kalimat komentar receh, lucu, atau sindiran halus yang bikin orang yang baca bergumam 'iya juga sih'"
    }
    Jangan tulis apapun selain format JSON.
    `;

    const result = await model.generateContent(prompt);
    const aiResponseText = await result.response.text();
    
    const cleanJson = aiResponseText.replace(/```json|```/g, "").trim();
    const finalResult = JSON.parse(cleanJson);

    return NextResponse.json([[finalResult]]);

  } catch (error) {
    console.error("Error Gemini:", error);
    return NextResponse.json({ error: "Gemini sedang pusing, coba lagi." }, { status: 500 });
  }
}