import { getPidObj } from "../../lib/mongoHelpers"
import { inventoryClient } from "../../lib/sanity.server"


export default async function manageInventory(req, res) {
    try {
        const { id, key, quantity, prodPid, change } = JSON.parse(req.body)
        const query = key === "" ? `inventory` : `variantComboList[_key == "${key}"].inventory`

        const pidObj = await getPidObj(prodPid)

        if(change === "dec") {
            await inventoryClient(pidObj)
            .patch(id)
            .dec({
                [query] : quantity
            })
            .commit()
        } else if (change === "inc") {
            await inventoryClient(pidObj)
            .patch(id)
            .inc({
                [query] : quantity
            })
            .commit()
        }

        
        return res.status(200).json({message: `successfull ${change} by ${quantity}`})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
    

}