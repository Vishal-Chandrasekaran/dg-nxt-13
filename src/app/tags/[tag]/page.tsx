//This page is going to display a list of dynamic blogposts that all have the same tag
import { getPostsMeta } from "../../../../lib/posts";
//getting the metadata for each file
import ListItem from "@/app/components/ListItem";
// a component acts like lists to cover all the file titles with date
import Link from "next/link";

export const revalidate = 0; // changesd from 86400 to 0 for dev purposes

type Props = {
    params: {
        tag: string
    }
}

export async function generateStaticParams(){
    const posts = await getPostsMeta() //deduped!
    if(!posts) return [];
    //Set is similar to array but doesn't allow duplicate values
    const tags = new Set(posts.map((post) => post.tags).flat())
    //taking each unique tags and removing their nested level by flat method
    return Array.from(tags).map((tag) => ({tag}))
    //converting tags into arrays by using array constructor and from() now we add objects to every single array element using map
}

// Reasons for commenting this generateStaticParams:
// 1) It doesn't work well if the revalidate is zero
// 2) It is easier to debug if there is no cached data

export function generateMetadata({params:{tag}}:Props) {
    // this is so basic for the demonstration purposes
    return {
        title:`Posts about ${tag}`
    }
}
{/* @ts-expect-error Server Component */}
export default async function TagPostList({params:{tag}}) {
    //gathering all the metadata
    const posts = await getPostsMeta();
    // there's no post
    if(!posts) return <p className="mt-10 text-center">Sorry, no posts available.</p>
    // Filtering the posts with tags
    const tagPosts = posts.filter((post) => post.tags.includes(tag));
    // What if no tags in any posts?
    if(!tagPosts.length) {
        return (
            <div className="text-center">
                <p className="mt-10">Sorry, no posts for that keyword.</p>
                <Link href={"/"}>Back to home 🏠</Link>
            </div>
        )
    }
    //returning the jsx if the tagPosts exists!
    return(
        <>
          <h2 className="text-3xl mt-4 mb-0">Results for: #{tag}</h2>
          <section className="mt-6 mx-auto max-w-2xl">
            <ul className="w-full list-none p-0">{
                tagPosts.map((post)=>{
                    return(
                        <ListItem key={post.id} post={post}/>
                    )
                })
            }</ul>
          </section>
        </>
    )
}