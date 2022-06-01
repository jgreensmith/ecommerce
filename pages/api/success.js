import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
    const items = await stripe.checkout.sessions.listLineItems(req.query.session_id);

    res.status(200).json({ session, items, customer});
  } catch (error) {
    res.status(404).json({error})
    console.log(error);
  }
  
}