/*
Q5. Write an Express route that uses a Mongoose model to find alll documents where "status" is "active" and returns them as JSON
*/
import express from 'express';
import mongoose from 'mongoose';

const app = express();
mongoose.connect('mongodb://localhost:27017/statusDB');

const Item = mongoose.model('Item', { name: String, status: String });

app.get('/active-items', async (req, res) => {
    // Find all items where status is "active"
    const activeItems = await Item.find({ status: "active" });
    res.json(activeItems);
});

app.listen(7005, () => console.log("Q5 Status Filter at 7005"));
