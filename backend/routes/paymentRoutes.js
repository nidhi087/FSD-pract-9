const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Dummy Payment Mockup API
router.post('/process', authMiddleware, (req, res) => {
    const { amount, paymentMethod } = req.body;

    if (!amount || !paymentMethod) {
        return res.status(400).json({ success: false, message: 'Amount and payment method are required' });
    }

    // Simulate payment processing delay
    setTimeout(() => {
        // 80% chance of success
        const isSuccess = Math.random() > 0.2;

        if (isSuccess) {
            res.status(200).json({
                success: true,
                transactionId: `TXN${Math.floor(Math.random() * 1000000000)}`,
                message: 'Payment processed successfully',
                amount
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment failed due to insufficient funds or network error',
                amount
            });
        }
    }, 1500);
});

module.exports = router;
