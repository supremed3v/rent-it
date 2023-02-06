import Stripe from "stripe";
import User from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

const myStripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res) => {
  try {
    const { vendors } = req.body;
    // Create a Payment Intent for each vendor
    const paymentIntent = await myStripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Get all vendors stripe accounts from the database and store in an array

    const vendorAccounts = await User.find({
      _id: { $in: vendors.map((vendor) => vendor.vendor_id) },
    });
    const transferData = vendors.map((vendor) => {
      const vendorAccount = vendorAccounts.find(
        (account) => account._id.toString() === vendor.vendor_id.toString()
      );
      return {
        amount: vendor.amount,
        currency: "usd",
        destination: vendorAccount.stripe_account_id,
      };
    });

    // Create a transfer for each vendor
    // if(res.status === 200) {
    //   transferData.forEach(async (transfer) => {
    //     await myStripe.transfers.create(transfer);
    //   });
    // }

    // Transfer funds to each vendor's bank account

    res.status(200).json({
      success: true,
      message: "Payment successful",
      payment_intent: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
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
      error:
        error.raw.message || error.message || error || "Something went wrong",
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
  const transferGroup = Math.random().toString(36).substring(2, 15);
  try {
    const payout = await myStripe.payouts.create({
      amount: req.body.amount,
      currency: req.body.currency,
      transfer_group: transferGroup,
    });

    const sellerTransfer = await myStripe.transfers.create({
      amount: req.body.amount * 0.97,
      currency: req.body.currency,
      destination: req.body.accountId,
      transfer_group: transferGroup,
    });

    const deliveryTransfer = await myStripe.transfers.create({
      /* 3% of the total amount */
      /* Delivery company account id */
      amount: req.body.amount * 0.03,
      currency: req.body.currency,
      destination: "acct_1J9Z2cKZ2Z2Z2Z2Z",
      transfer_group: req.body.transferGroup,
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

export const sellerRequestWithdrawal = async (req, res) => {
  const seller = await User.findById(req.user.id);
  if (!seller.stripe_account_id) {
    return res.status(400).json({
      success: false,
      message: "You do not have a stripe account",
    });
  }

  const balance = await myStripe.balance.retrieve({
    stripeAccount: seller.stripe_account_id,
  });

  if (balance.available[0].amount < req.body.amount) {
    return res.status(400).json({
      success: false,
      message: "Insufficient funds",
    });
  }

  if (req.body.amount < 1000) {
    return res.status(400).json({
      success: false,
      message: "Minimum withdrawal amount is $10",
    });
  }

  try {
    const payout = await myStripe.payouts.create({
      amount: req.body.amount,
      currency: req.body.currency,
      method: "instant",
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

export const updateSellerAccount = async (req, res) => {
  try {
    const account = await myStripe.accounts.update(req.body.stripe_account_id, {
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: req.connection.remoteAddress,
      },
    });
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
