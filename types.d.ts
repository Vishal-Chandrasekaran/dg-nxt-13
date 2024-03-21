//create a type for gthub data

type Meta = {
    id:string,
    title:string,
    date:string,
    tags:string[],
}

type Blogpost = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
};