//We are going to write some node.js in here
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

//gray matter dependency is installed for reading top section of markdown files
const postsDirectory = path.join(process.cwd(), "blogposts");
//'cwd' stands for Current Working Directory
//the string blogposts indicates the blogposts folder on root directory

export function getSortedPostsData() {
  //In order to sort the posts,
  // i. get the file names under /posts(needs postsDirectory for fileNames)
  const fileNames = fs.readdirSync(postsDirectory);
  // we are using fs to read [postsdirectory] directory where we get the value of current working directory
  const allPostsData = fileNames.map((fileName) => {
    //we map over the fileNames in order to return blogposts which is buried in notations
    const id = fileName.replace(/\.md$/, "");
    //Remove ".md" from filename to get id(filename without .md) of the each file
    //Read markDown file as string
    //we need both postsDirectory and fileName for fullpath
    const fullPath = path.join(postsDirectory, fileName);
    //we need fullpath for filecontents
    const fileContents = fs.readFileSync(fullPath, "utf8");

    //with obtained fileContents, it can be implemented in gray-matter
    const matterResult = matter(fileContents);
    //there is a popular library called "gray-matter" that is used for extracting front matter metadata from files, and it is often used with Markdown files.
    // Front matter is metadata at the beginning of a file, often used in static site generators or content management systems. It typically contains information such as title, date, tags, etc. The "gray-matter" library helps parse and extract this front matter from files, including Markdown files.
    //matterResult holds the data required to display
    const blogpost: BlogPost = {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };

    //Combine the data with id to return blogpost mentioned in markdown
    return blogpost;
  });
  //sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

//the above function destructs and sorts all the posts
// the below function only works on a single post

export async function getPostsData(id: string) {
  //as post directory is globally declared, we need fullpath and fileContent in this file too
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // at getSortedPostsData we removed extensions for id but here we doing vice-versa
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  //matterResult is from library so it is used again;
  const matterResult = matter(fileContents);

  
 //remark is used to convert the markdown content into HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

//Converting HTML into TrustedHTML
  const contentHTML = processedContent.toString();

  const blogPostWithHTML: BlogPost & { contentHTML: string } = {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHTML,
  };

  //combining the data with id
  return blogPostWithHTML;
}
