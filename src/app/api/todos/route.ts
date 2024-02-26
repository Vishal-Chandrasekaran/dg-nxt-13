import { NextResponse } from "next/server";
//Just the website URL we want to fetch
const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';
//used in header for useCase here implemented in assertion
const API_KEY:string = process.env.DATA_API_KEY as string

export async function GET() {
    //fetching the URL as response
    const res = await fetch(DATA_SOURCE_URL);
    //storing the fetched variables inside array of objects
    const todos: Todo[] = await res.json();
    //using the next reponse on the obtained variable 
    return NextResponse.json(todos);
};

//This uses request parameter because i. This is not get request ii. This produces dynamic route
export async function DELETE(request: Request) {
    //Destructuring a particular property from object
    const {id}:Partial<Todo> = await request.json();
    // What if the destructured value doesn't exists
    if(!id) return NextResponse.json({'message':'The todo id is required!'});
    // Here, the "id" exists and implementing useCase
    await fetch(`${DATA_SOURCE_URL}/${id}` ,{
        method: 'DELETE',
        headers:{
            'Content-Type':'Application/json',
            'Api-Key': API_KEY
        }
    })

    return NextResponse.json({"message": `Todo Number ${id} has been deleted.`})
};

