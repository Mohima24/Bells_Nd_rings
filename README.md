# ---BellsAndRing

- Deployed Webite = https://sage-crostata-a93786.netlify.app/

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
---
<br/>

## Tech Stack Used :-
### Frontend
### Backend

#### Extra :-

> - JWT (JsonWebToken) <br/>
> - Bcrypt <br/>
> - ChatGPT (Used for dummy-data generation only)
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

#### user model :-
```
{
  "firstName":"String",
  "lastName":"String",
  "password":"String",
  "email":"abc@gmail.com",
  "role":"seller" || "admin" || default="customer"
}
```
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

## More Project Details :-

- Type : Individual Project
- Duration of Project - 5 Days

---
<br/>
<h3 align="center" >Thank you for your Time 💝</h3>


<!-- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDViZjI3NWU5YmJhZDNiY2QyYjRkY2IiLCJ1c2VyUm9sZSI6InNlbGxlciIsImlhdCI6MTY4Mzc0ODU1MywiZXhwIjoxNjg0MzUzMzUzfQ.2EpUgMunQY5KP0d17wok2KgF-VPhlMKvJqUbtFbx0Q8 -->
