import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../model/User";


export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const {review, rating, connectId, sessionId, name, prodId } = req.body

            let id: string
            if (prodId.includes("_")) {
                const idArr = prodId.split('_')
                id = idArr[0]
            } else {
                id = prodId
            }
           
            //save customer ID in database
            await dbConnect()

            //check if sessionId exists
            // @ts-ignore
            await User.findOneAndUpdate(
                {connectedAccount: connectId},
                {$pull: {reviews: {
                    prodId: id,
                    sessionId: sessionId
                }}}
            )
            // @ts-ignore
            await User.findOneAndUpdate(
                {connectedAccount:  connectId}, 
                {$push: {reviews: {
                    review: review,
                    rating: rating,
                    sessionId: sessionId,
                    name: name,
                    prodId: id
                }}})
            
            res.status(200).json({message: "review added"})
        } catch (error) {
            res.status(error.statusCode || 500).json(error.message);
        }
        
    }
}