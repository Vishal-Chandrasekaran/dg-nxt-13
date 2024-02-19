import Link from "next/link"
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  debugger
  return (
    <main className={inter.className}>
      <h1 className={inter.className} >Home Page</h1>
      <Link href={"/users"}>Users</Link>
    </main>
  )
}
