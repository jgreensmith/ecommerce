import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../model/User";


export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const {review, rating, connectId, sessionId, name, prodId } = req.body

            let id: string
            const fullId = prodId
            if (fullId.includes("_")) {
                const idArr = fullId.split('_')
                id = idArr[0]
            } else {
                id = fullId
            }
           
            //save customer ID in database
            await dbConnect()

            // @ts-ignore
            await User.findOneAndUpdate(
                {connectedAccount: { $eq: connectId}}, 
                {$push: {reviews: {
                    review: review,
                    rating: rating,
                    sessionId: sessionId,
                    name: name,
                    prodId: prodId
                }}})
            
            res.status(200).json({message: "review added"})
        } catch (error) {
            res.status(error.statusCode || 500).json(error.message);
        }
        
    }
}