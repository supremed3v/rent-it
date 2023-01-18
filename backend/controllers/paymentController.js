import stripe from "stripe";

const myStripe = new stripe("");

export const createPayment = async (req, res) => {
  try {
    const paymentIntent = await myStripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "PKR",
    });
    const clientSecret = paymentIntent.client_secret;

    res.status(200).json({
      success: true,
      clientSecret,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error.message,
    });
  }
};

export const sendPubKey = async (req, res) => {
  const publishableKey = process.env.STRIPE_PUBLISH_KEY;
  res.status(200).json({
    publishableKey,
    success: true,
  });
};
