const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    orderId: String,
    paymentId: String,
    status: String
    },
    {timestams: true}
);

module.exports = mongoose.model("Order", orderSchema);