import express from 'express'
let app = express()
import mongoose from 'mongoose'
mongoose.connect("mongodb://localhost:27017/ecommerce")
app.use(express.json())
let productSchema = mongoose.Schema({
    name: String,
    price: Number
})
let Product = mongoose.model("products", productSchema)
app.post("/products", async(req, res)=>{
    try{
        let result = await Product.create(req.body)
        res.json(result)
    }
    catch(err){
        res.json({error: "ERROR while inserting: " + err.message})
    }
})
app.put("/products/:id", async(req, res)=>{
    try{
        let result = await Product.updateOne({_id:req.params.id},{$set:{name:req.body.name, price:req.body.price}})
        res.json(result)
    }catch(err){
        res.json({error: "ERROR while updating: " + err.message})
    }
})
app.delete("/products/:id", async(req, res)=>{
    try{
        let result = await Product.deleteOne({_id:req.params.id})
        res.json(result)
    }catch(err){
        res.json({error: "ERROR while deleting: " + err.message})
    }
})
app.listen(3000)