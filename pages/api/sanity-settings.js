import { groq } from "next-sanity"
import { sanityClient } from "../../lib/sanity.server"

export default async function sanitySettings(req, res) {
    try {
        const query =`*[_type == "siteSettings"]`
        const data = await sanityClient.fetch(query)

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
}