import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import Navbar from "../components/Navbar";
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const token = cookies().get('token')
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {token ? <Navbar token={token.value}/> : <Navbar  />}
      
          {children}
          </Providers>
      </body>
    </html>
  );
}
