const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR"
  });

  res.json(order);
};

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseId
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expected !== razorpay_signature)
    return res.status(400).json({ message: "Payment verification failed" });

  await Order.create({
    user: req.user.id,
    course: courseId,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    status: "success"
  });

  await User.findByIdAndUpdate(req.user.id, {
    $push: { purchasedCourses: courseId }
  });

  res.json({ success: true });
};
