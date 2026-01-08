const express = require("express");
const {createOrder, verifyPayment} = require ("../controllers/orderController")
const { protect } = require ("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", protect, createOrder);
router.post("/verify", protect, verifyPayment);

module.exports = router;