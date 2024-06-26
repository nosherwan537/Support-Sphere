// app/api/pay/route.js
import connectDB from "@/db/connectDb";
import Payment from "@/models/Payment";

export const POST = async (req, res) => {
    await connectDB();
    const { name, to_user, oid, message, amount } = req.body;
    try {
        const payment = await Payment.create({
            name,
            to_user,
            oid,
            message,
            amount,
        });
        res.status(201).json({ success: true, data: payment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const GET = async (req, res) => {
    await connectDB();
    const payments = await Payment.find();
    res.status(200).json({ success: true, data: payments });
};
