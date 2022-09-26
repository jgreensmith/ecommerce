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
    if (req.query.secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET) {
      return res.status(401).json({message: 'Invalid secret token'})
    }
  
    if (!req.query.slug) {
      return redirectToPreview(res, '/') 
    }
    
    //check if slug exists
    const productQuery = `*[_type == "product" && slug.current == $slug][0]`
    const product = await previewClient.fetch(productQuery, {
      slug: req.query.slug
    })

    if(!product) {
      return res.status(401).json({message: 'Invalid slug'})
    }
  
     // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, `/products/${req?.query?.slug}`)
}