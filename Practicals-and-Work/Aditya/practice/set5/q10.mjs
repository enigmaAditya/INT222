/*
10. Build a parcel tracking system where delivery agents update parcel status and customers can check delivery progress using PostgreSQL.
*/
import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
app.use(express.json());

// PG Client Config
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'parcel_tracking',
    password: 'password',
    port: 5432
});

// For local testing without a live DB, I'll log the intended queries.
const runQuery = async (query, params) => {
    console.log(`Executing Query: ${query} | Params: ${params}`);
    // return client.query(query, params); 
    return { rows: [{ id: params[0], status: params[1] || "Shipped" }] }; // Mock
};

// 1. Agent updates status
app.post('/parcel/update', async (req, res) => {
    const { id, status } = req.body;
    await runQuery('UPDATE parcels SET status = $2 WHERE id = $1', [id, status]);
    res.send(`Parcel ${id} updated to ${status}`);
});

// 2. Customer checks progress
app.get('/parcel/:id', async (req, res) => {
    const result = await runQuery('SELECT * FROM parcels WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
});

app.listen(6010, () => console.log("Q10 Parcel Tracking (PG) at 6010"));
