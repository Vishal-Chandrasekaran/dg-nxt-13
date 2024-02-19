export default async function getUserPosts( userId: string ) {
    //using cache as 'force-cache' which is actually default 
    //in order to avoid stale data 'no-store'
    //Now for ISR,
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`,{next: {revalidate:60}});
    // We are not throwing error as we are about to create a 404 page
    // if(!res.ok) throw new Error ('failed to fetch user post')
    if(!res.ok) return undefined
    return res.json();
};