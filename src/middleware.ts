import { NextResponse } from "next/server";

export function middleware(request: Request) {

    //The alternate way to specify the routes for the middleware
    // if(request.url.includes("/api/")) {
    //     //All the middleware code here
    // }

    // You can also use Regex as your prefernce
    // const regex = new RegExp('/api/*');
    // if(regex.test(request.url)){
    //     //All the middleware code here
    // }

    //Options,methods,optionStatus are handled by next.js now we define the origin
    const allowedorigins = process.env.NODE_ENV === 'production' ? ['https://yoursite.com','https://www.yoursite.com'] : ['http://localhost:3000/'];
    //We are removing the google just to whether we get the bad request

    const origin = request.headers.get('origin');
    console.log(origin);
    //Using conditional origins to handle cors issue but most of the RESTapi tools doesn't contain an origin
       if(origin && !allowedorigins.includes(origin) || !origin) {
            return new NextResponse(null,{
                status: 400,
                statusText: 'Bad Request',
                headers:{
                    'Content-Type':'text/plain',

                }
            })
       };

    //To check whether the component works
    console.log("Middleware!");
    //To check the information inside the request parameter
    console.log(request.method);
    //To check the requests from our application
    console.log(request.url);
    //To explore further more
    console.log(request.headers);


    //return the response
    return NextResponse.next();
};

//creating a matcher to specify the routes path for middleware
export const config = {
    matcher: "/api/:path*",
}