import { NextResponse } from "next/server";

export async function GET(request: Request){
    const {searchParams} = new URL(request.url);

    //Totally non-flexible way for providing responses
    //value for the string entered in searchParams:
    // const name = searchParams.get('name');
    //either returns value or name if that searchParam exists
    //const instrument = searchParams.get('instrument');
    //now we send the response for teh required;
    //return NextResponse.json({name , instrument})

    //Instead of declaring we store the entries inside an object
    const obj = Object.fromEntries(searchParams.entries());
    return NextResponse.json(obj)

}