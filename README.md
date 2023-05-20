# ---BellsAndRing

- Deployed Webite = https://bellsandribbons.netlify.app/
- Deployed Backend = https://busy-gold-scarab-vest.cyclic.app/

---

 ## What is BellsNRibbons
 - An online e-commerce website, where user can buy cheap price good product.
 - We have 200+ products.
 ---
 <br/>

##  Special Features of BellsNRibbons :-
 - OTP generate for sign-up.
 - JWT Authentication
 - Add to cart.
 - Authorization.
 - Seller and admin Authorization & CRUD Operations.
 - Filter products by rating and material
 - Sort products by price
---
<br/>

## Tech Stack Used :-
### Frontend
### Backend

#### Extra :-

> - JWT (JsonWebToken) <br/>
> - Bcrypt <br/>
> - NodeMailer <br/>
> - Twilio

---
<br/>

## API Routes :

#### User Routes :-

```
POST    /users/signup/phone
POST    /users/signup/email
POST    /users/login/email
POST    /users/login/mobile
POST    /users/resendOTPEmail
POST    /users/resendOTPMobile
POST    /users/verifyotp
GET     /users/getnewToken
```

---

#### Product Routes :-
```
GET       /products/all
GET       /products/limited
GET       /products/:id
GET       /products/?ptype=${value}&rating=${value}&limit=${value}&sort={1}&page={value}
POST      /products/upload
PATCH     /products/update/:id
DELETE    /products/delete/:id
```

---


#### Orders Routes :-

```
GET       /orders/orderItems/agregate
GET       /orders/orderItems/:userID
Post      /orders/orderItems
```

---

#### user model :-
```
{
  "firstName":"String",
  "lastName":"String",
  "password":"String",
  "mobile":Number
  "email":"abc@gmail.com",
  "role":"seller" || "admin" || default="customer"
}
```

---

#### product model :-

```
{
    "name":"String",
    "rating":Number,
    "price":Number,
    "material":"String",
    "sellerID":"String",
    "img":"String",
    "ptype":"String"
}  
```

---

#### order model :-

```

  {
    user: ObjectId(userID),
    orderItems: [
          {
            product: ObjectId(productID),
            quantity: Number
          }  
    ],
  },

```

---

#### Otp model
{
    userID:String,
    otp:String,
    createdAt:Date,
    expiresAt:Date
}

---

## More Project Details :-

- Type : Individual Project
- Duration of Project - 5 Days

---
<br/>
<h3 align="center" >Thank you for your Time 💝</h3>

