import getUser from "../../../../lib/getUser";
import getUserPosts from "../../../../lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";

type Params = {     
  params: {
    userId: string;
  };
};

//To generate dynamic metadata
export async function generateMetadata({params:{userId}}:Params):Promise<Metadata>{
    //Sending request whenever needed will de duplicate the excess requests
    const userData: Promise<User> = await getUser(userId);
    //getting each seperate user from userData
    const user : User = await userData;
    return {
      title: user.name,
      description: `This is the page of ${user.name}`
    }
};

// export const metadata: Metadata = {
//   title: 'Users one by one',
// };

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);
  
  //This is a valid approach but for using loading state and suspense we have to refactor the code
  //const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading ...</h2>}>
        {/*Due to ignoring the promises there now we are directly passing the promise into the component <UserPosts posts={userPosts} /> */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}
