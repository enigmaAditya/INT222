import express from 'express';
const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Route
app.get('/', (req, res) => res.send('Hello World'));

// POST Route
app.post('/data', (req, res) => {
    console.log(req.body);
    res.json({ received: true });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
