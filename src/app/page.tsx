import Link from "next/link"

export default function Home() {
  debugger
  return (
    <main>
      <h1>Hello World</h1>
      <Link href={"/about"}>Visit <strong>about</strong> for once</Link>
    </main>
  )
}
