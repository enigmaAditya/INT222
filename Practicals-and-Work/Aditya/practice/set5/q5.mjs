/*
5. Create a feedback system where customer feedback is stored in MongoDB and sent to a simple LLM API for short summary generation.
*/
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

import Groq from 'groq-sdk';

const app = express();
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

mongoose.connect('mongodb://localhost:27017/feedback_v5');
const Feedback = mongoose.model('Feedback', { text: String, summary: String });

// Real LLM API Call using Groq
async function getLLMSummary(text) {
    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "Summarize the following customer feedback in one short sentence." },
                { role: "user", content: text }
            ]
        });
        return response.choices[0].message.content;
    } catch (err) {
        console.error("LLM Error:", err);
        return "Summary unavailable (API Error)";
    }
}

app.post('/feedback', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).send("No feedback text provided");

    const summary = await getLLMSummary(text);

    const feedback = new Feedback({ text, summary });
    await feedback.save();

    res.json({ message: "Saved!", summary });
});

app.listen(6005, () => console.log("Q5 Feedback LLM at 6005"));
