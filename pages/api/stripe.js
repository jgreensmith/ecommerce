import Stripe from "stripe";
import { countryCodesArray } from "../../utils/countryCodes";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_address_collection: {
              allowed_countries: countryCodesArray,
            },
            shipping_options: [
              { shipping_rate: "shr_1L3KQkJQzZCeROhUPCLHPGGZ" },
              { shipping_rate: "shr_1L3KSvJQzZCeROhUPWnMm2wN" },
            ],
            line_items: req.body.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', `https://cdn.sanity.io/images/${process.env.SANITY_STUDIO_API_PROJECT_ID}/production/`)
                .replace("-webp", ".webp")
                .replace("-png", ".png")
                .replace("-jpg", ".jpg"); 
                 
                //console.log(newImage);

                return {
                  price_data: { 
                    currency: 'gbp',
                    product_data: { 
                      name: item.name,
                      images: [newImage],
                    },
                    unit_amount: item.price * 100,
                  },
                  adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                  },
                  quantity: item.quantity
                }
              }),
              allow_promotion_codes: true,
              success_url: `${req.headers.origin}/success`,
              cancel_url: `${req.headers.origin}/cancelled`,
            }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}