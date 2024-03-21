import { compileMDX } from 'next-mdx-remote/rsc'
//rsc includes in the packages means that it supports rsc in nextjs

//function that is used to create URL or path for each individual file
export async function getPostByName(fileName:string): Promise<Blogpost|undefined> {
   
  //fetching the specific fileName from the rawData
  const res = await fetch(`https://raw.githubusercontent.com/Vishal-Chandrasekaran/test-mdx-blogposts/main/${fileName}`,{
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,'X-Github-Api-Version':'2022-11-28'
    }
  })

  //what if the http status is not 200?
  if(!res.ok) return undefined

  //extract raw MDX file from the response
  const rawMDX = await res.text();

  //github gives a 404 page if the file is not found 
  if( rawMDX === '404: Not Found' ) return undefined

  //accessing frontmatter using compileMDX from next-mdx-remote
  const{frontmatter, content} = await compileMDX<{ title:string, date:string, tags:string[] }>({ source: rawMDX, options:{parseFrontmatter:true} })

  //creating id from filename by removing extensions
  const id = fileName.replace(/\.mdx$/,"")

  //creating 
  const blogPostObj: Blogpost = { meta:{id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags},content };

  return blogPostObj;
};

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  
  //type for the trees route we fetch from api
  type Filetree = {
    "tree": [
      {
        "path":string,
      }
    ]
  }


  //request some github data
  const res = await fetch('https://api.github.com/repos/Vishal-Chandrasekaran/test-mdx-blogposts/git/trees/main?recursive=1',{
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,'X-Github-Api-Version':'2022-11-28'
    }
  })

  //What if response is not 200 http status?
  if(!res.ok) return undefined

  //typeFileTree is used here
  const repoFiletree:Filetree = await res.json();

  //To get an array containing the name of the mdx files
  const filesArray = repoFiletree.tree.map((obj) => obj.path).filter((path) => path.endsWith('.mdx'));
  //It is achieved by mapping the tree as seperate objects and filtering the fileName with the extension after it 

  //posts is an empty array which is going to hold the metadata
  const posts:Meta[] = [];

  //using "for of" so that we can use await inside not forEach
  for(const file of filesArray) {

    //going through each post and setting arguments to function
    const post = await getPostByName(file)

    if(post){
      //if post exists we are extracting metadata from it 
      const {meta} = post;
      //It is pushed back to the posts array
      posts.push(meta)
    }
  }
  return posts.sort((a,b) => a.date<b.date ? 1 : -1)
};