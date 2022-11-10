import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";


export default async function handler( req: NextApiRequest, res: NextApiResponse) {

    try {

        const client = await clientPromise;
        
        const projects = client.db('test').collection('users')
        .find({})
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();
    
        
        
        
        res.status(200).json(projects)
      } catch (e) {
        res.status(500).json({message: e.message})
    
      }

}
