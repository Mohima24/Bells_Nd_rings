const express = require('express');
const { Order } = require("../models/order.model");
const { Usermodel } = require("../models/users.model")
const {authentication} = require("../middleware/authenticate")
const orderRouter = express.Router();

orderRouter.get("/orderItems/agregate",async(req,res)=>{
    const data = await Order.aggregate([
            { $lookup: {  from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                        }
            },
            { $unwind: '$orderItems' },
            {$lookup : {from : 'products', localField: 'orderItems.product', foreignField: '_id', as : 'product'}},
            { $unwind: '$product' },
            {$group : { _id: '$_id', user:{'$first':'$user'},products: {$push: '$product'}}}
        ])
    res.send({data})
})

orderRouter.get("/orderItems/:userID",async(req,res)=>{
    const userID = req.params.userID;
    try{
        const data = await Order.aggregate([
                { $match: { $expr : { $eq: [ '$user' , { $toObjectId: userID } ] } } },
                { $lookup: {  from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                    }
                },
                { $unwind: '$orderItems' },
                {$lookup : {from : 'products', localField: 'orderItems.product', foreignField: '_id', as : 'product'}},
                { $unwind: '$product' },
                {$group : { _id: '$_id', user:{'$first':'$user'},products: {$push: '$product'}}}
            ])
        res.send({data})
    }catch(err){
        res.status(403).send({error:"details is not available",err})
    }

})

orderRouter.post("/orderItems",authentication,async(req,res)=>{
    const user = req.body.userID;
    const userdetail = await Usermodel.findById({_id:user});
    const orderItems = req.body.orderItems;

    try{
        if(userdetail.verify==true){

            const payload = await new Order({user,orderItems});
            console.log(payload)
            await payload.save();
            res.send({"msg":"order has placed"})

        }else{

            res.send({msg:"You are not register"})

        }
    }catch(err){

        console.log(err)

    }
})
module.exports= {orderRouter}