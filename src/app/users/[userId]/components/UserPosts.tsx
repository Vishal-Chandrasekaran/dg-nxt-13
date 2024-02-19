type Props = {
    //In the userPost component, we pass promise(UserPostsData) as props to UserPost component
    promise: Promise<Post[]>
};

export default async function UserPosts({ promise } : Props) {
    //This is an async function due to the promise passed on props
    const posts = await promise;
    //Let's receive the content from each posts
    const content = posts.map((post) => {
        return(
            <article key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <br />
            </article>
        )
    })

    return content;
};