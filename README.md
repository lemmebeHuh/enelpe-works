# 🎬 Enelpe Works | Movie Sentiment Analysis

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

Enelpe Works adalah sebuah platform *Full-Stack* untuk menganalisis sentimen ulasan film berbahasa Indonesia. Proyek ini dibangun untuk memenuhi tugas mata kuliah *Natural Language Processing* (NLP).

Sistem ini dirancang untuk mendeteksi apakah sebuah ulasan film bernada Positif atau Negatif, sekaligus mengekstrak emosi dominan dari teks yang diinputkan pengguna.

---

## Roadmap Pengembangan (Project Phasing)

Proyek ini dikembangkan menggunakan pendekatan *iterative* untuk memastikan keandalan sistem secara menyeluruh:

- **Tahap 1: Minimum Viable Product (MVP) - *Current Version***
  Membangun fondasi *Frontend* (Next.js), UI/UX responsif, dan integrasi *database* (Firebase). Fase ini menggunakan **Gemini API** sebagai *baseline LLM* untuk memastikan arsitektur pengiriman data dan respons AI berjalan lancar secara *real-time*.
- **Tahap 2: Local Model Integration - *In Progress***
  Melatih (*training*) model *Machine Learning* mandiri menggunakan algoritma **Support Vector Machine (SVM)** dengan dataset ulasan film lokal (via Google Colab). Model `.pkl` ini nantinya akan di- *deploy* menggunakan FastAPI (Microservices) untuk menggantikan Gemini API.

---

## Fitur Utama (v1.0)

- **Analisis Sentimen Dinamis:** Menggunakan *Prompt Engineering* khusus pada model Generative AI untuk mengklasifikasikan sentimen dan mengekstrak emosi ulasan.
- **Katalog Film Real-time:** Terintegrasi dengan Firebase Cloud Firestore untuk mengelola dan menampilkan daftar film secara dinamis.
- **UI/UX Responsif & Modern:** Antarmuka ramah *mobile* dengan pendekatan *Glassmorphism* menggunakan Tailwind CSS, dikunci pada *Light Mode* agar desain tetap konsisten di berbagai *device*.

---

## Arsitektur Sistem Saat Ini

1. **User Input:** Pengguna memilih film dan mengirimkan teks ulasan melalui antarmuka.
2. **API Route:** Next.js mengolah permintaan melalui serverless function (`app/api/sentiment/route.js`).
3. **AI Processing:** Data dikirim ke Google Gemini API dengan instruksi ketat untuk mengembalikan hasil berupa format JSON murni.
4. **Display:** Hasil klasifikasi (Sentimen, Akurasi, dan Emosi Dominan) ditampilkan secara instan tanpa perlu *reload* halaman.

---

## Panduan Instalasi Lokal

Untuk menjalankan proyek (Tahap 1) ini di laptop Anda:

```bash
# 1. Clone repository ini
git clone [https://github.com/username-kamu/enelpe-works.git](https://github.com/username-kamu/enelpe-works.git)

# 2. Masuk ke direktori proyek
cd enelpe-works

# 3. Install dependencies
npm install

# 4. Konfigurasi Environment Variables
# Buat file .env.local di *root directory* dan masukkan kredensial berikut:
# NEXT_PUBLIC_FIREBASE_API_KEY=...
# ... (masukkan config Firebase lainnya)
# GEMINI_API_KEY=...

# 5. Jalankan server lokal
npm run dev

Buka http://localhost:3000 di browser Anda untuk melihat hasilnya.

## License

Dev: Sang Kala Aji
Role Utama: Frontend Development, API Integration, & Model Training.
[Kala-Works](https://kala-works.vercel.app/)
