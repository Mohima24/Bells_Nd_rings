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