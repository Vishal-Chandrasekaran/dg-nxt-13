import Posts from "./components/Posts";

//This is the only possible area too implement route segment options
export const revalidate = 10;// revalidate at most every hour
//The default values are already applied and handled by Next.js 

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
