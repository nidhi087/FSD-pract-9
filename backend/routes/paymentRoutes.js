const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Dummy Payment Mockup API
router.post('/process', authMiddleware, (req, res) => {
    const { amount, paymentMethod = 'credit_card' } = req.body;

    if (!amount) {
        return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    if (paymentMethod === 'cash_on_delivery') {
        // Immediate success for COD
        return res.status(200).json({
            success: true,
            transactionId: `COD${Math.floor(Math.random() * 1000000000)}`,
            message: 'Order placed with Cash on Delivery successfully',
            amount,
            paymentMethod
        });
    }

    // Simulate payment processing delay for digital payments (UPI, CC, DC)
    setTimeout(() => {
        // 80% chance of success
        const isSuccess = Math.random() > 0.2;

        if (isSuccess) {
            return res.status(200).json({
                success: true,
                transactionId: `TXN${Math.floor(Math.random() * 1000000000)}`,
                message: 'Payment processed successfully',
                amount,
                paymentMethod
            });
        } else {
            return res.status(200).json({
                success: false,
                message: 'Payment failed due to insufficient funds or network error',
                amount,
                paymentMethod
            });
        }
    }, 1500);
});

module.exports = router;
