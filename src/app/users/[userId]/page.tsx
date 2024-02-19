import getUser from "../../../../lib/getUser";
import getUserPosts from "../../../../lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";
import getAllUsers from "../../../../lib/getAllUsers";
import { notFound } from "next/navigation";

type Params = {
  params: {
    userId: string;
  };
};

//To generate dynamic metadata
export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  //Sending request whenever needed will de duplicate the excess requests
  const userData: Promise<User> = await getUser(userId);
  //getting each seperate user from userData
  const user: User = await userData;

  //In this function, if there is no user's properties then change the metadata especially title
  if (!user?.name) {
    return{
      title: 'User Not Found'
    }
  }

  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  };
}

// export const metadata: Metadata = {
//   title: 'Users one by one',
// };

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  //This is a valid approach but for using loading state and suspense we have to refactor the code
  //const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData;

  //Again as same as the condition of metadata, if user's proerties doesn't exists then there should be not found page
  if(!user?.name) return notFound();

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

//This is done for static site generation and generateStaticParams
export async function generateStaticParams() {
  //Fetching all the users to statically generate beforehand
  const usersData: Promise<User[]> = getAllUsers();
  //These fetched datas are stored and awaited till triggering
  const users = await usersData;

  //return will map the array of users
  return users.map((user) => {
    return { userId: user.id.toString() };
  });
}
