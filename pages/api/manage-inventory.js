import { inventoryClient } from "../../lib/sanity.server"


export default async function manageInventory(req, res) {
    try {
        const { id, key, quantity } = JSON.parse(req.body)
        const query = key === "" ? `inventory` : `variantComboList[_key == "${key}"].inventory`

         await inventoryClient
            .patch(id)
            .dec({
                [query] : quantity
            })
            .commit()
        return res.status(200).json({message: 'works'})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
    

}