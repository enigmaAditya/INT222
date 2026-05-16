/*
9. Create a movie recommendation API where users enter a movie name and a simple LLM integration returns similar movie suggestions.
*/
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Groq from 'groq-sdk';

const app = express();
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Real LLM API logic using Groq
async function callLLMForMovies(movie) {
    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { 
                    role: "system", 
                    content: "You are a movie recommendation assistant. Return exactly 3 movies similar to the user's input, separated by commas. Do not include any other text." 
                },
                { role: "user", content: movie }
            ]
        });
        
        const content = response.choices[0].message.content;
        // Split by comma and trim whitespace to get an array
        return content.split(',').map(m => m.trim());
    } catch (err) {
        console.error("LLM Error:", err);
        return ["Movie list unavailable"];
    }
}

app.post('/recommend', async (req, res) => {
    const { movie } = req.body;
    if (!movie) return res.status(400).send("Provide a movie name");

    const suggestions = await callLLMForMovies(movie);
    res.json({ movie, suggestions });
});

app.listen(6009, () => console.log("Q9 Movie LLM (Real AI) at 6009"));
