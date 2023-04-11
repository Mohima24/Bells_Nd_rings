const express = require("express");
const { Usermodel } = require("../models/users.model")
const { UserOTPVerification } = require("../models/otp.model")
const bcrypt = require("bcrypt")
const nodemailer= require("nodemailer");

require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const auth_token = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, auth_token)

const userRoute = express.Router();

const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  port: 465,
  service:'gmail',
  secure: true,
  auth: {
      user: process.env.email,
      pass: process.env.pass
  }
})
 
userRoute.post("/signup/phone", async (req, res) => {
    const { firstName, lastName, password, mobile } = req.body;
    if (password == "") {
        return res.json({ status: "FAILED", "messege": "Empty Password" })
    }
    // ^[1-9]\d*(\.\d+)?$
    if(mobile){
        if(!/^[1-9]\d*(\.\d+)?$/.test(mobile)){
            return res.json({ status: "FAILED", "messege": "Invadil email" ,"say":"hello"})
        }else{
            const finduser = await Usermodel.find({mobile})
            if(finduser.length>0){
                res.status(501).send("already logged in")
                return 
            }
            bcrypt.hash(password, 7 , async (err, hash) => {
                const user = new Usermodel({
                    firstName, lastName, password:hash, mobile 
                  })
                  user.save()
                  .then((result)=>{
                    sendOTPVErificationNumber(result, res)
                  })
            });
        }
    }
})

userRoute.post("/signup/email", async (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    if (password == "") {
        return res.json({ status: "FAILED", "messege": "Empty Password" })
    }
    if ( email ) {
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            return res.json({ status: "FAILED", "messege": "Invadil email" ,"say":"hello"})
        }else{
            const finduser = await Usermodel.find({email})
            if(finduser.length>0){
                res.status(501).send("already logged in")
                return 
            }
            bcrypt.hash(password, 7 ,(err, hash)=> {
                if(err){
                    res.send("bcrypt err")
                }else{
                    const user = new Usermodel({
                      firstName, lastName, email, password:hash 
                    })
                    user.save()
                    .then((result)=>{
                        sendOTPVErificationEmail(result,res)
                    })
                }
            })
        }
    }
})

// ------------------otp verification for mobile-----------------
async function sendOTPVErificationNumber({ _id, mobile }, res) {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    client.messages.create({
      to: `+91${mobile}`,
      from: '+12765661405',
      body: `${otp} is the verfication code to log in to your Flipkart account. Please DI NOT SHARE this code with anyone including delivery agents. @www.flipkart.com #${otp}.This code <b>expires in 1 hour`
    })
    bcrypt.hash(otp, 7 , async (err, hash) => {
        const newOTPVerification = new Usermodel({
                userID: _id,
                otp: hash,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
          })
          await newOTPVerification.save()
          res.json({
            status: "PENDING",
            message: "Verification otp email sent",
            data: {
              userID: _id,
              mobile
            }
          })
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message
    })
    console.log("while sending mail")
    console.log(err)
  }
}
// ----------------------------otp verification for mobile---------------------------

async function  sendOTPVErificationEmail({_id,email},res){
  try{
      const otp = `${Math.floor(1000+Math.random()*9000)}`
      const mailoptions={
          to:email,
          from:`${process.env.email}`,
          subject:"Verify Your Email",
          html:`<p>Enter <b>${otp}</b> in the app to verify your email address and complete the sign-up</p>
          <p>This code <b>expires in 1 hour</b></p>`
      }
      bcrypt.hash(otp, 7 , async (err, hash) => {
        const newOTPVerification = await new UserOTPVerification({
            userID:_id,
            otp:hash,
            createdAt:Date.now(),
            expiresAt:Date.now() + 3600000
        })
        await newOTPVerification.save()
        await transporter.sendMail(mailoptions)
        res.json({
            status:"PENDING",
            message:"Verification otp email sent",
            data:{
                userID:_id,
                email
            }
        })
    });

  }catch(err){
      res.status(400).json({
          status:"FAILED",
          message:err.message
      })
      console.log("while sending mail")
      console.log(err)
  }
}

userRoute.post("/verifyotp", async(req,res)=>{
  try{
      let {userID,otp} = req.body;
      if(!userID || !otp){
          res.status(400).send("Verification went wrong")
      }else{
          const userotpverification = await UserOTPVerification.find({
              userID
          })
          if(userotpverification.length==0){
              res.status(400).send("Account not exist")
          }else{
              const expiresAt = userotpverification[0].expiresAt;
              const sendotp = userotpverification[0].otp;
              if(expiresAt < Date.now()){
                  await UserOTPVerification.deleteMany({userID})
                  res.status(500).send("Code has been expired")
              }else{
                bcrypt.compare(otp, sendotp, async(err, result) => {
                    if(!result){
                        await Usermodel.updateOne({_id:userID},{verify:true})
                        await UserOTPVerification.deleteMany({userID})
                        res.json({
                            status:"verified",
                            "message":"user has verified"
                        })
                    }else{
                        res.status(500).send("incorrect otp")
                    }
                });
              }
          }
      }
  }
  catch(err){
      res.send({"err":"while verify","message":err.message})
      console.log()
  }
})

// ------------------resend otp----------------

userRoute.post("/resendOTPEmail",async(req,res)=>{
  try{
    let {userID,email}=req.body
    if(!userID || !email){
      throw Error("Empty user details")
    }else{
      const finduser = await Usermodel.find({ email , _id:userID})
      if(finduser>0){
        await UserOTPVerification.deleteMany({userID})
        sendOTPVErificationEmail({_id:userID,email},res)
      }else{
        throw Error("please give correct details")
      }

    }
  }
  catch(err){
    console.log(err)
    throw Error("sending resend otp mail")
  }
})

// -------------------resend otp for mobile------------------------

userRoute.post("/resendOTPMobile",async(req,res)=>{
  try{
    let {userID,mobile}=req.body
    if(!userID || !mobile){
      throw Error("Empty user details")
    }else{
      const finduser = await Usermodel.find({ mobile , _id:userID})
      
      if(finduser.length>0){
        await UserOTPVerification.deleteMany({userID})
        sendOTPVErificationNumber({ _id:userID, mobile }, res)
      }else{
        throw Error("please give correct details")
      }
    }
  }
  catch(err){
    // console.log(err)
    throw Error(err)
  }
})

userRoute.post("/login", async (req, res) => {
  try{
     const { email, password, mobile } = req.body
    if(email){

      const findeuser = await Usermodel.findOne({ email })
      
      if(findeuser.length>0){
        const hashpass= findeuser[0].password;
        bcrypt.compare(password, hashpass, async(err, result) => {
          if(!result){
            res.send({"message":"login successfully"})
          }else{
            res.send(err)
          }
        })
      }else{
        throw Error({"message":"Please sign up"})
      }

    }else if(mobile){

      const findeuser = await Usermodel.find({ mobile })
      
      console.log(findeuser)
      if(findeuser.length>0){
        const hashpass= findeuser[0].password;
        bcrypt.compare(password, hashpass, async(err, result) => {
          if(result){
            res.send({"message":"login successfully"})
          }else{
            throw Error({"message":"failed to hash the password"})
          }
        })
      }else{
        throw Error({"message":"Please sign up"})
      }

    }
  }
  catch(err){
    res.send(err)
  }
})
// ----------------------------------------------------------log in------------------------------------------

// {
//     "otp":5904,
//     "userID":"6435d62eb8376f1194a842fc"
// }

// {
//     "firstName": "MohimaEmail",
//     "lastName": "String",
//     "email": "mohimabahadur@gmail.com",
//     "password":"mohima"
// }

module.exports = {
  userRoute,
};
