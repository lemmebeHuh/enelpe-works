"use client";
import { db } from "@/lib/firebase"; 
import { collection, doc, setDoc } from "firebase/firestore";

export default function TambahDataFilm() {
  const newMoviesData = [
    {
      id: "6",
      title: "Na Willa",
      poster: "https://media.themoviedb.org/t/p/w440_and_h660_face/lz874WBix857NH2UpUC9oCOwRCx.jpg",
      trailer: "https://www.youtube.com/embed/hnb3C5Hbk0s?si=4Io7YFACBB1S5u3d", 
      synopsis: "Cerita keluarga musikal yang berfokus pada pengalaman sederhana masa kecil di Indonesia tempo dulu, sarat akan makna pertumbuhan, keberagaman, dan perubahan zaman. Diadaptasi dari novel Reda Gaudiamo.",
      actors: ["Luisa Adreena", "Irma Rihi", "Junior Liem", "Freya Mikhayla"],
      rating: 8.2
    },
    {
      id: "7",
      title: "Jumbo",
      poster: "https://media.themoviedb.org/t/p/w440_and_h660_face/rbjTGOKWcL6xjhTMGhRN1YNejE5.jpg",
      trailer: "https://www.youtube.com/embed/yMqDgbZmBdk?si=4rt3SBY6DhvrmjRx",
      synopsis: "Petualangan Don dan sahabatnya di Kampung Seruni. Mereka menaiki sepeda modifikasi menuju dunia imajinasi dalam kisah yang mengajarkan arti keluarga, persahabatan, dan keberanian.",
      actors: ["Visinema Voice Cast"],
      rating: 8.5
    },
    {
      id: "8",
      title: "No Other Choice",
      poster: "https://media.themoviedb.org/t/p/w440_and_h660_face/zqxc2O6eOcPdkcmvem9kgGHvkmM.jpg",
      trailer: "https://www.youtube.com/embed/HKZpuG_ezvY?si=a54jEXpdCISth8BX",
      synopsis: "Seorang ahli industri kertas yang di-PHK mendadak kehilangan segalanya. Putus asa menyelamatkan keluarganya, ia menghadapi dilema moral ekstrem dengan menyingkirkan para pesaingnya agar mendapat pekerjaan.",
      actors: ["Lee Byung-hun", "Son Ye-jin", "Park Hee-soon", "Lee Sung-min"],
      rating: 7.8
    },
    {
      id: "9",
      title: "Linda Linda Linda",
      poster: "https://media.themoviedb.org/t/p/w440_and_h660_face/nv24G7L9gdlJvDjGCaa9Np07rU9.jpg",
      trailer: "https://www.youtube.com/embed/YIIkWjdiF0U?si=o6Xn0ie2Sb2RycS5",
      synopsis: "Menjelang festival sekolah, sebuah band remaja perempuan kehilangan anggotanya. Mereka nekat merekrut siswi pertukaran asal Korea yang belum fasih berbahasa Jepang untuk menjadi vokalis.",
      actors: ["Bae Doona", "Aki Maeda", "Yu Kashii", "Shiori Sekine"],
      rating: 7.6
    },
    {
      id: "10",
      title: "Merah Putih: One for All",
      poster: "https://media.themoviedb.org/t/p/w440_and_h660_face/16Ly9vDNfXl7RrlMtUUiJJjm1Ac.jpg",
      trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      synopsis: "Sekelompok anak bertualang mencari bendera Merah Putih yang hilang untuk perayaan kemerdekaan desa mereka. Sayangnya, film ini menuai banyak kontroversi karena masalah produksinya.",
      actors: ["Voice Cast"],
      rating: 1.0
    }
  ];

  const tanamDataTambahan = async () => {
    try {
      const moviesRef = collection(db, "movies");
      for (const movie of newMoviesData) {
        await setDoc(doc(moviesRef, movie.id), movie);
      }
      alert("Sip! 5 Film baru berhasil ditambahkan ke Firebase!");
    } catch (error) {
      console.error("Gagal menanam data: ", error);
      alert("Gagal menambahkan data.");
    }
  };

  return (
    <main className="p-20 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Halaman Injeksi Data</h1>
      <button 
        onClick={tanamDataTambahan}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Tambahkan 5 Film Baru
      </button>
    </main>
  );
}