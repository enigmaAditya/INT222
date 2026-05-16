/*
1. Build a student login system where students can register and log in using JWT authentication. Store student data in mongodb and use middleware to protect profile routes.
*/
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const app = express();
const port = 6001;
const SECRET = "mysecret";

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/studentDB_v5');

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const Student = mongoose.model('Student', studentSchema);

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send("Access Denied: No Token Provided!");

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1] || authHeader;

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

// 1. Register
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const student = new Student({ username, password });
        await student.save();
        res.send("Student registered in MongoDB!");
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// 2. Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const student = await Student.findOne({ username, password });
    
    if (student) {
        const token = jwt.sign({ username: student.username }, SECRET);
        res.send({ token });
    } else {
        res.status(401).send("Invalid Credentials!");
    }
});

// 3. Protected Profile
app.get('/profile', authMiddleware, (req, res) => {
    res.send(`Welcome to your profile, ${req.user.username}`);
});

app.listen(port, () => console.log(`Q1 Student Login (MongoDB + Middleware) at http://localhost:${port}`));

