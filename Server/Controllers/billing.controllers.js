import Stripe from "stripe";
import { plans } from "../Config/plans.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const billing = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.userId;

    const plan = plans[planType];

    if (!plan || plan.price === 0) {
      return res.status(400).json({
        message: "Invalid paid plan",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Genweb.ai ${planType.toUpperCase()} Plan`,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        userId,
        credits: String(plan.credits),
        plan: planType,
      },

      success_url: `${process.env.FRONTEND_URL}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
    });

    return res.status(200).json({
      sessionUrl: session.url,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};