import { NextResponse } from "next/server";
import { limiter } from "../config/limiter"

//Implementing limiter inside this async func
export async function GET(request: Request) {

    //Acquiring the origin through the request
    const origin = request.headers.get("origin")

    //debugging the two tokens at the get request
    const remaining = await limiter.removeTokens(1);
    console.log(remaining,'remaining');

    if(remaining<0){
        return new NextResponse(null, {
            status:429,
            statusText:"Too many requests...",
            headers:{
                'Access-Control-Allow-Origin': origin || '*',
                'Content-Type': 'text/plain'
            }
        })
    }
    return new Response('Welcome to API Routes')
}