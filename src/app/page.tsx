import Posts from "./components/Posts";

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hey there 👉😎👉 &nbsp;
        <span className="whitespace-nowrap">
          Myself <span className="font-bold">Vishal</span>.
        </span>
      </p>
      {/*Instead of lists of posts we have two json strings*/}
      <Posts/>
    </main>
  );
}
