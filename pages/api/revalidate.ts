//  https://<your-site.com>/api/revalidate?secret=<token>
// This is the example URL provided in the docs for requesting the revalidation

// http://localhost:3000/api/revalidate?path=/&secret=12345

import { NextApiRequest,NextApiResponse } from "next";

//This handler cannot be teseted in the dev mode as it would return a 500 status 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        //Checking our secret
        if (req.query.secret !== process.env.API_KEY) {
            return res.status(401).json({message:'Invalid Token'})
        };
        //Usually here it will be a try-catch block

        //as we using revalidate you cannot assign a type to be undefined
        const path = req.query.path as string
        //the important function that only available in the revalidate file that comes through API of the pages directory
        await res.revalidate(path);
        // We might expect this to change in future where the API directory is available on the routeHandlers where we can use other API directory

        //The path is passed inside the revalidate function where the path is mentioned in the URL and the we assigned path to slash(root) because we have to revalidate the home component essentially where we have the list of blogItems
        return res.json({revalidated:true})

    };
