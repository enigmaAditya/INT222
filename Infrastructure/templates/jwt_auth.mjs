import jwt from 'jsonwebtoken';
const SECRET = "your_secret_key";

// 1. Sign (Login)
const token = jwt.sign({ id: 123, role: 'admin' }, SECRET);

// 2. Verify Middleware
const authMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).send("No token");

    const token = header.split(' ')[1] || header; // Handle 'Bearer <token>'
    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (err) {
        res.status(403).send("Invalid Token");
    }
};
