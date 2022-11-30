export default function filterDataToSingleItem(data, preview) {
    if (!Array.isArray(data)) {
      return data
    }
  
    if (data.length === 1) {
      return data[0]
    }
  
    if (preview) {
      return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
    }
  
    return data[0]
  }

export async function inventoryHandler(product, quantity, change) {
  let id
  let key
  const fullId = product._id
  const prodPid = product.pid
  if (fullId.includes("_")) {
    const idArr = fullId.split('_')
    id = idArr[0]
    key = idArr[1]
  } else {
    id = fullId
    key = ""
  }
  await fetch('/api/manage-inventory', {
    method: 'POST',
    body: JSON.stringify({id, key, quantity, prodPid, change})
  })
}