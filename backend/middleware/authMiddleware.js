const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer token"

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded; // add user to request payload
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
