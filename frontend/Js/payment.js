const userData = JSON.parse(localStorage.getItem('userData'))
const form = document.querySelector('form');
const lsdata = JSON.parse(localStorage.getItem('lsdata'))
const amount = localStorage.getItem('bill_amount')
const access_token = localStorage.getItem('access_token')
// console.log(access_token)
let productArr = lsdata.map((el)=> {return {product:el.id,quantity:el.quantity}})

form.addEventListener("submit",async (e)=>{
    e.preventDefault()
    let obj = {
        user: userData._id,
        orderItems:productArr,
        totalBill:amount
    }
    if(!access_token){
        alert("Please Sign-In first")
        window.location.assign('signin.html')
    }
    try{

        const postorder = await fetch('https://busy-gold-scarab-vest.cyclic.app/orders/orderItems',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": access_token
            },
            body:JSON.stringify(obj)
        })
        const res = await postorder.json()
        if(res.status=='OK'){

            localStorage.setItem('lsdata',null)
            localStorage.setItem('bill_amount',null)
            alert("Order has been placed")
            window.location.assign('index.html')
        }else{
            alert("Please Sign-In first")
            window.location.assign('signin.html')
        }
    }
    catch(err){

        alert("Please login")
    }
})