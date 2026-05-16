import express from 'express'
import mongoose from 'mongoose'
mongoose.connect("mongodb://localhost:27017/ecommerce")
const app = express()
const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});
const product = mongoose.model('products', productSchema)

// app.get("/products", async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = 2;
//     const data = await product.find().skip((page - 1) * limit).limit(limit)
//     res.send(data)
// })
app.get("/products", simplePaginate, async (req, res) => {
    const data = await product.find().skip(req.skip).limit(req.limit);
    res.send(data);
});
// mixamo:


app.listen(3000, () => {
    console.log("server is running on port 3000")
})