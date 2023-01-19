const express = require("express")
const {ProductModel} = require("../models/product.model")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const productRouter = express.Router()

productRouter.get("/",async(req,res)=>{
        let data = await ProductModel.find({})
        res.send(data)

})

productRouter.post("/post",async(req,res)=>{
    const {name,rating,price,material,adminID,adminName,img,ptype}= req.body;
    const postData = new ProductModel({name,rating,price,material,adminID,adminName,img,ptype})
    await postData.save()
    res.send("User has been posted posts")
})

productRouter.patch("/update/:id",async(req,res)=>{
    const id= req.params.id;
    let data = await ProductModel.findOne({_id:id})
    let reqbody= req.body
    let reqID = req.body.adminID
    if(data){
        let dataId = data.adminID
        if(reqID==dataId){
            await ProductModel.findByIdAndUpdate({_id:id},reqbody)
            res.send("Data has been successfully updated")
        }else{
            res.send("You are not authorized")
        }
    }else{
        res.send("Data is not present")
    }
})

productRouter.delete("/delete/:id",async(req,res)=>{
    const id= req.params.id;
    let data = await ProductModel.findOne({_id:id})
    let reqID = req.body.userID
    if(data){
        let dataId = data.userID
        if(reqID==dataId){
            await ProductModel.findByIdAndDelete({_id:id})
            res.send("Data has been successfully deleted")
        }else{
            res.send("You are not authorized")
        }
    }else{
        res.send("Data is not present")
    }
})


module.exports={
    productRouter
}

// {
//     "name":"Assorted Gold Pedestal Metal Candle Holders",
//   "rating":4.3,
//   "price":1,
//   "material":"Iron",
//   "img":"https://www.dollartree.com/ccstore/v1/images/?source=/file/v4279143830483445188/products/356222.jpg&height=940&width=940",
//   "ptype":"Candleholders"
//   }


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2M2YjE4MjBiY2FkMjkzYjZlZGUwY2QiLCJpYXQiOjE2NzM5NzcwMDV9.VUF-hmVSC6MBGEEL1HyztaWY-IKKsAPoqYnfvhCelGw