import { getSortedPostsData } from "../../../lib/posts";
import { Fragment } from "react";
import ListItem from "./ListItem";

//This component serves the purpose to render entire post
export default function Posts() {
  // We are not calling this function asynchronously because we have our blogposts locally on our directory
  const posts = getSortedPostsData();

  return (
    <Fragment>
      {/*Mapping out the blogposts in an unordered list*/}
      <section className="mt-6 mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
        <ul className="w-full">{posts.map((post) => {
          return(
            <ListItem key={post.id} post={post} />
          )
        })}</ul>
      </section>
    </Fragment>
  );
}
//Blogs are visible as links now than the json string earlier
//Those listItems won't have any pages but they have a dynamic route
//These dynamic routes are "posts/filename(post-id)"