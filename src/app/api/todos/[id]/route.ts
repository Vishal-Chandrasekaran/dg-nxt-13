import { NextResponse } from "next/server";

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';

//The Next.js way to obtaining id is using the second parameter params 
type Props={
    params:{
        id:string;
    }
}

//From the route.ts of todos it slightly differs for the dynamic path;
export async function GET(request:Request, {params:{id}}:Props) {
    //We can obtain id via the second parameter params
    //Template literal for accessing that dynamic todo
    const res = await fetch(`${DATA_SOURCE_URL}/${id}`);
    //changing type for single todo
    const todo :Todo = await res.json();
    // What if that one single todo doesn't exists
    if (!todo.id) return NextResponse.json({"message":"The requested dynamic route(todo) doesn't exists"})
    return NextResponse.json(todo);
};

// here the request.url is slice and checks the value after last slash
    //const id = request.url.slice(request.url.lastIndexOf("/")+1); 
    //Here this is an alternative way for finding the id but not ideal way