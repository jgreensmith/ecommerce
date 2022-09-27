import { groq } from "next-sanity"
import { useRouter } from "next/router"
import { getClient, sanityClient } from "../../lib/sanity.server"
import filterDataToSingleItem from "../../utils/functions"

export default async function sanitySettings(req, res) {
    
    try {
        const { preview } = req
        const query =`*[_type == "siteSettings"]`
        const data = await getClient(preview).fetch(query)

        const settings = filterDataToSingleItem(data, preview)


        res.status(200).json({ settings, query})

    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
}