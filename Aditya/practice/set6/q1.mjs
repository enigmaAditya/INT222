/*
Q1. A user wants to create a dynamic portfolio using a Node.js project initialised with npm init. You need to build an Express POST route to collect user skills, validate them using express-validator, and save the data into a MongoDB collection. Finally, explain how you would use Github to deploy this protfolio and manage different versions of the Portfolio API
*/
import express from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/portfolioDB');
const Skill = mongoose.model('Skill', { name: String, level: String });

// POST route with Validation
app.post('/skills', [
    body('name').isLength({ min: 3 }).withMessage('Skill name must be at least 3 chars'),
    body('level').isIn(['Beginner', 'Intermediate', 'Expert']).withMessage('Invalid level')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const skill = new Skill(req.body);
    await skill.save();
    res.send("Skill saved to MongoDB!");
});

app.listen(7002, () => console.log("Q1 Portfolio API at 7002"));

/* 
GITHUB EXPLANATION:
1. Deployment: Use "git push" to send code to GitHub. Then use platforms like Render, Vercel or Heroku which pull from GitHub.
2. Versioning: Use "git tag v1.0.0" or create different "branches" (e.g., dev, prod) to manage different versions of the Portfolio API.
*/
