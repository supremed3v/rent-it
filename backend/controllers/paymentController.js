import Stripe from "stripe";
import User from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

const myStripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res) => {
  try {
    const paymentIntent = await myStripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "PKR",
      metadata: {
        companyName: "Rent-It",
      },
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

export const createSellerAccount = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.stripe_account_id) {
    return res.status(400).json({
      success: false,
      message: "You already have a stripe account",
    });
  }
  try {
    const account = await myStripe.accounts.create({
      type: "custom",
      country: req.body.country,
      email: req.body.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    const stripe_account_id = account.id;
    user.stripe_account_id = stripe_account_id;
    await user.save();

    res.status(200).json({
      success: true,
      account,
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.raw.message,
    });
    console.log(error);
  }
};

export const getAccountDetails = async (req, res) => {
  try {
    const account = await myStripe.accounts.retrieve(
      req.body.stripe_account_id
    );
    res.status(200).json({
      success: true,
      account,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error.message,
    });
  }
};

export const createSellerTransfer = async (req, res) => {
  try {
    const transfer = await myStripe.transfers.create({
      amount: req.body.amount,
      currency: req.body.currency,
      destination: req.body.accountId,
    });
    res.status(200).json({
      success: true,
      transfer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
    console.log(error);
  }
};

export const sellerSales = async (req, res) => {
  try {
    const sales = await myStripe.balance.retrieve({
      stripeAccount: req.body.accountId,
    });
    res.status(200).json({
      success: true,
      sales,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const sellerTransactions = async (req, res) => {
  try {
    const transactions = await myStripe.balance.listTransactions({
      stripeAccount: req.body.accountId,
    });
    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error.message,
    });
  }
};

export const sellerPayouts = async (req, res) => {
  try {
    const payouts = await myStripe.payouts.list({
      stripeAccount: req.body.accountId,
    });
    res.status(200).json({
      success: true,
      payouts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error.message,
    });
  }
};

export const sellerPayout = async (req, res) => {
  try {
    const payout = await myStripe.payouts.create({
      amount: req.body.amount,
      currency: req.body.currency,
      stripeAccount: req.body.accountId,
    });
    res.status(200).json({
      success: true,
      payout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error.message,
    });
  }
};

export const sellerPayoutCancel = async (req, res) => {
  try {
    const payout = await myStripe.payouts.cancel(req.body.payoutId, {
      stripeAccount: req.body.accountId,
    });
    res.status(200).json({
      success: true,
      payout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error.message,
    });
  }
};
