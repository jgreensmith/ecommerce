import dbConnect from "../../lib/dbConnect";
import User from "../../model/User";

import { previewClient } from "../../lib/sanity.server"

function redirectToPreview(res, Location) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})
  // Redirect to a preview capable route
  res.writeHead(307, { Location })
  res.end()
}

export default async function preview(req, res) {
    if (!req?.query?.secret) {
      return res.status(401).json({message: 'No secret token'})
    }
  
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    await dbConnect()
     
    const pidObj = await User.findOne({preview_mode : req.query.secret })  
    console.log(req.query.secret)
    const pidded = JSON.parse(JSON.stringify(pidObj))     
    // if (req.query.secret !== "skpQhwhL8a9CIEz8vLuPmnnwSgLlB2WQGeHbAzCBFR61z8UolZjGsSdtmMJUjqQ3aoIDki1oicmqoJg3M1yWPfW0ZvtVA6bykm3mQBNWUJHVSX2aAbkjbRu1cAIKiNK0EwDozDjcJtLHaQHwlZse8nkmN0uCoabXro9D4NK0RCLJSxgCEWke") {
    //   return res.status(401).json({message: 'Invalid secret token'})
    // }
  
    if (!req.query.slug) {
      return redirectToPreview(res, `/merchants/${pidded.pid}`) 
    }
    
    //check if slug exists
    const productQuery = `*[_type == "product" && slug.current == $slug][0]`
    const product = await previewClient(pidded).fetch(productQuery, {
      slug: req.query.slug
    })

    if(!product) {
      return res.status(401).json({message: 'Invalid slug'})
    }
  
     // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, `/merchants/${pidded.pid}/products/${req?.query?.slug}`)
}