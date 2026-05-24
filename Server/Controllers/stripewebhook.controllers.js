import stripe from "../Config/stripe.js";
import User from "../Models/user.model.js";

export const stripewebhook=async(req,res)=>{
    const sig=req.headers["stripe-signature"]
    let event;
    try {
        event=stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"webhook error"
        })
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const metadata = session?.metadata || {};

        const userId = metadata.userId;
        const credits = Number(metadata.credits);
        const plan = metadata.plan;

        if (!userId || !Number.isFinite(credits) || !plan) {
            console.log("Webhook missing/invalid metadata", { userId, credits, plan });
            return res.status(400).json({ message: "Invalid webhook metadata" });
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            { $inc: { credits }, plan },
            { new: true }
        );

        console.log("Webhook updated user", { userId, addedCredits: credits, updatedCredits: updated?.credits });
    }

    return res.json({received:true})
}

