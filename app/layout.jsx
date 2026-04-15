import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Menggunakan font yang lebih modern dan minimalis
const pjs = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"] 
});

export const metadata = {
  title: "Movie Review AI",
  description: "Platform ulasan film pintar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${pjs.className} bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}