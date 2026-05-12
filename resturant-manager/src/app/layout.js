import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Restaurant Manager",
  description: "Manage your restaurants and bookings with Pranay",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
};