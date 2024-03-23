import getFormattedDate from "../../../../lib/getFormattedDates";
import { getPostsMeta, getPostByName } from "../../../../lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import 'highlight.js/styles/github-dark.css'


//a route setup config for revalidation (making this page server-side rendered with no cache)
export const revalidate = 3600;

//creating a type for the prop
type Props = {
    params: {
        postId: string
    }
}

//This function should contain array with objects inside of contents posts and id
export async function generateStaticParams() {
    const posts = await getPostsMeta( ) //deduped!

    //we defined that the posts can be undefined in the typescript
    if(!posts) return []

    return posts.map((post) => ({
        postId: post.id
    }))
}

//
export async function generateMetadata({params:{postId}}: Props)
{
    //we need post from getSortedPostsData to display it as a seperate page
    const post = await getPostByName(`${postId}.mdx`); //The individual files are fetched
    
    //What if metadata doesn't exist for the page
    if(!post){
        return{
            // this is very minimal metadata in order to keep the posts simple
            title:'Post not found'
        }
    }
    
    //it is time to return the title and description of the meta and content from the Blogpost
    return {
        title:post.meta.title
    }
};

export default async function Post({params:{postId}}: Props)
{
    //individual posts fetch 
    const post = await getPostByName(`${postId}.mdx`); 

    if(!post) notFound()
    
    //destructuring the post to get metadata values
    const {meta,content} = post;

     const pubDate = getFormattedDate(meta.date);

     const tags = meta.tags.map((tag,i) => ( <Link key={i} href={`/tags/${tag}`} >{tag}</Link> ))

    return(
        <>
        <h2 className="text-3xl mt-4 mb-0" >{meta.title}</h2>
        <p className="mt-0 text-sm">{pubDate}</p>
        <article>{post.content}</article>
        <section>
            <h3>Related:</h3>
            <div className="flex flex-row gap-4">{tags}</div>
        </section>
        <p className="mb-10">
            <Link href={"/"}>Back to Home</Link>
        </p>
        </>
    )
};