
import { getClient, sanityClient } from "../../lib/sanity.server"
import filterDataToSingleItem from "../../utils/functions"

export default async function sanitySettings(req, res) {
    
    try {
        const { preview, pid } = req
        const query =`*[_type == "siteSettings"]`
        const data = await getClient(pid, preview).fetch(query)

        const settings = filterDataToSingleItem(data, preview)


        res.status(200).json({ settings, query})

    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
}