/*
7. Create a product management system where admins can add products and users can only view them using JWT and middleware authentication.
*/
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
const SECRET = "product_secret";

const products = [{ id: 1, name: "Sample Laptop" }];

// Auth Middleware
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send("No Token");
    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (e) { res.status(401).send("Invalid Token"); }
};

app.post('/login', (req, res) => {
    const { role } = req.body; // admin or user
    const token = jwt.sign({ role }, SECRET);
    res.json({ token });
});

app.post('/products', auth, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send("Admins Only");
    products.push(req.body);
    res.send("Product Added!");
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(6007, () => console.log("Q7 Product JWT Auth at 6007"));
