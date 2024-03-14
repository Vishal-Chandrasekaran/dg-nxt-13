import { NextResponse } from "next/server";
//Just the website URL we want to fetch
const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
//used in header for useCase here implemented in assertion
const API_KEY: string = process.env.DATA_API_KEY as string;

//Applying the appropriate header to overcome the cors issue due to lack of origin
//Introducing the origin here through the dynamic request
export async function GET(request: Request) {

  const origin = request.headers.get("origin")

  //fetching the URL as response
  const res = await fetch(DATA_SOURCE_URL);
  //storing the fetched variables inside array of objects
  const todos: Todo[] = await res.json();
  //using the next reponse on the obtained variable

  // This will result in CORS ACCESS-CONTROL_ALLOW_ORIGIN issue

  // This NextResponse actually has body of todos and contain appropriate header
  return new NextResponse(JSON.stringify(todos), {
    headers: { "Access-Control-Allow-Origin": origin || "*" ,
                "Content-Type":"application/json"},
  });
  // return NextResponse.json(todos);
}

//This uses request parameter because i. This is not get request ii. This produces dynamic route
export async function DELETE(request: Request) {
  //Destructuring a particular property from object
  const { id }: Partial<Todo> = await request.json();
  // What if the destructured value doesn't exists
  if (!id) return NextResponse.json({ message: "The todo id is required!" });
  // Here, the "id" exists and implementing useCase
  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
      "Api-Key": API_KEY,
    },
  });

  return NextResponse.json({ message: `Todo Number ${id} has been deleted.` });
}

export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json();
  if (!userId || !title)
    return NextResponse.json({ message: "Required value is missing" });
  const res = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
    },
    body: JSON.stringify({ userId, title, completed: false }),
  });
  const newTodo: Todo = await res.json();

  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const { userId, title, id, completed }: Todo = await request.json();
  if (!id || !userId || !title || typeof completed !== "boolean")
    return NextResponse.json({ message: "Required value is missing" });

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
    },
    body: JSON.stringify({ userId, title, completed }),
  });
  const updatedTodo: Todo = await res.json();

  return NextResponse.json(updatedTodo);
}
