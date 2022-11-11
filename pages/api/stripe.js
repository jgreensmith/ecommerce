import Stripe from "stripe";
import { getConnectId } from "../../lib/mongoHelpers"
import { countryCodesArray } from "../../utils/countryCodes";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
    try {
      const {cartItems, pid} = req.body
      const connectAccountId = await getConnectId() 
        const params = {
            payment_intent_data: {
              application_fee_amount: 600,
            },            
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
            line_items: cartItems.map((item) => {
                const img = item.mainImage.asset._ref;
                const newImage = img.replace('image-', `https://cdn.sanity.io/images/${pid}/production/`)
                .replace("-webp", ".webp")
                .replace("-png", ".png")
                .replace("-jpg", ".jpg"); 
                 

                return {
                  price_data: { 
                    currency: process.env.NEXT_PUBLIC_CURRENCY,
                    product_data: { 
                      name: item.name,
                      images: [newImage],
                      metadata: {product_id : item._id},
                      ...(item.personalMessage && {description: `personalisation message: ${item.personalMessage}`}) 
                    },
                    unit_amount: item.price * 100,
                  },
                  quantity: item.quantity,
                }
              }),
              allow_promotion_codes: true,
              success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${req.headers.origin}/cancelled`,
            }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params, {stripeAccount: connectAccountId});
      res.status(200).json(session);

    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}