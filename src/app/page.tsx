import Posts from "./components/Posts";
import MyProfilePic from "./components/MyProfilePic";

//This is the only possible area too implement route segment options
export const revalidate = 10;// revalidate at most every hour
//The default values are already applied and handled by Next.js 

export default function Home() {
  return (
    <div className="mx-auto">
      <MyProfilePic/>
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hey there 👉😎👉 &nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">Vishal</span>.
        </span>
      </p>
      {/*Instead of lists of posts we have two json strings*/}
      <Posts/>
    </div>
  );
}
