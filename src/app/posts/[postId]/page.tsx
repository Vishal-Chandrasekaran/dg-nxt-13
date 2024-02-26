import getFormattedDate from "../../../../lib/getFormattedDates";
import { getPostsData, getSortedPostsData } from "../../../../lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

//The some of the lines of code of generateMetadata and Post share the same

export function generateMetadata({params}:{params:{postId:string}})
{
    //we need post from getSortedPostsData to display it as a seperate page
    const posts = getSortedPostsData(); //This can be done more than 1 time Next.js can de-duplicate requests
    //Now, extracting the postId from params
    const {postId} = params;
    //What if there is no page exists for that param 
    //we check its existence by searching the string with notated id property from each post
    const post = posts.find(post => post.id === postId);

    //What if metadata doesn't exist for the page
    if(!post){
        return{
            title:'Post not found'
        }
    }
    
    //it is time to return the title and description of the metadata
    return {
        title:post.title
    }
};

export default async function Post({params}:{params:{postId:string}})
{
    //we need post from getSortedPostsData to display it as a seperate page
    const posts = getSortedPostsData(); //This can be done more than 1 time Next.js can de-duplicate requests
    //Now, extracting the postId from params
    const {postId} = params;
    //What if there is no page exists for that param 
    //we check its existence by searching the string with notated id property from each post
    if (!posts.find(post => post.id === postId)) notFound()
    //as we used this function, most likely we implement a custom 404 page
    //Now we get every single post's details in a request function
    const {title,date,contentHTML} = await getPostsData(postId);

    const pubDate = getFormattedDate(date);

    return(
        <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto" >
            {/* The title of the article is in h1 */}
            <h1 className="text-3xl mt-4 mb-0 font-bold dark:text-white/90">{title}</h1>
            {/* Publication date of the article */}
            <p className="mt-0">{pubDate}</p>
            <article className="dark:text-white/90" >
                {/* This is used to convert the trustedHTML into plain strings */}
                <section dangerouslySetInnerHTML={{__html:contentHTML}} className="mt-6 mx-auto max-w-2xl" />
                <p>
                    <Link href="/" >Back to home</Link>
                </p>
            </article>
        </main>
    )
};