const express = require("express")
const {connection}= require("./conifg/db")
const {userRoute}=require("./controllers/user.router")
const {adminRouter} = require("./controllers/admin.router")
const {productRouter} = require("./controllers/product.router")
const {authentication} =require("./middleware/authenticate")
let cors= require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/users",userRoute)
app.use("/admins",adminRouter)
app.use(authentication)
app.use("/products",productRouter)

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`http://localhost:${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})