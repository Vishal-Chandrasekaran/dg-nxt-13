import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
    // we get the secret from the url with params named secret
    const secret = request.nextUrl.searchParams.get('apikey');
    // what if that secret param doesn't match with our token
    if(secret !== process.env.API_KEY) {
        return new NextResponse(JSON.stringify({message: 'Invalid Token'}),
        {
            status: 401,
            statusText: 'Unauthorized',
            headers: {
                'Content-Type': 'application/json',                
            }
        })
    };

    //These lines execute when the secret match
    const path = request.nextUrl.searchParams.get('path') || '/'

    //Either revalidate path if exists or revalidate root 
    revalidatePath(path);

    return NextResponse.json({revalidated:true})
}