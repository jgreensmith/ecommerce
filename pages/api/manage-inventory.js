import { inventoryClient } from "../../lib/sanity.server"

export default async function manageInventory(req, res) {
    try {
        const { id, key, quan } = JSON.parse(req.body)

         await inventoryClient
            .patch(id)
            .dec({
                [`variantComboList[_key == "${key}"].inventory`] : quan
            })
            .commit()
        return res.status(200).json({message: 'works'})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
    

}