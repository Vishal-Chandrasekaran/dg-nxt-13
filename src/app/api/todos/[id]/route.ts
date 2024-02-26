import { NextResponse } from "next/server";

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function GET(request:Request) {
    //From the route.ts of todos it slightly differs for the dynamic path;
    // here the request.url is slice and checks the value after last slash
    const id = request.url.slice(request.url.lastIndexOf("/")+1) 
    //Template literal for accessing that dynamic todo
    const res = await fetch(`${DATA_SOURCE_URL}/${id}`);
    //changing type for single todo
    const todo :Todo = await res.json();
    // What if that one single todo doesn't exists
    if (!todo.id) return NextResponse.json({"message":"The requested dynamic route(todo) doesn't exists"})
    return NextResponse.json(todo);
};