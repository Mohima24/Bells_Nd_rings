const search = document.getElementById("inputsearch")
const searchData = document.getElementById("searchData")
const thrillsec_childdiv = document.querySelectorAll("#thrilling>div")
let access_token = JSON.parse(localStorage.getItem("access_token")) || null
const cartnav= document.getElementById("cart")
const adminside = document.getElementById("adminside")

const admin= document.getElementById("admin")
if(access_token){
    admin.innerHTML=`
    <p>${access_token.userName}</p>
    <p>(logout)</p>
    `
}

searchData.innerHTML=""
let bag=[]
let fetchd= async()=>{
    try{
        let data = await fetch("https://busy-gold-scarab-vest.cyclic.app/products/all")
        let alldata = await data.json()
        bag=alldata
    }
    catch(err){
        console.log(err)
    }
}
fetchd()
search.addEventListener("input",(e)=>{
    let value = e.target.value
    let newData = bag.filter((el)=>{
        if(value){
            return el.name.toLowerCase().includes(value)
        }else{
            return;
        }
    })
    searchrender(newData)
})

function searchrender(data){
    searchData.innerHTML=null
    searchData.innerHTML=`${data.map((el)=>{
        return `
        <div>
        <img src=${el.img}>
        <p>${el.name}</p>
        <h6>$${el.price}</h6>
        </div>
        `
    }).join("")}`
}
admin.addEventListener('click',()=>{
    window.location.assign("./src/signuppage/signin.html")
})
cartnav.addEventListener("click",()=>{
    window.location.assign("./src/cart_page/cart.html")
})

adminside.addEventListener("click",()=>{
    window.location.assign("./Dashboard/signinpage/signin.html")
})

// console.log(thrillsec_childdiv[0].attributes.name.value=="hello1")

// const thrillingdiv= document.querySelectorAll('#thrilling>div')
// let value = sessionStorage.getItem("ptype")

// for(let i=0;i<thrillingdiv.length;i++){
//     thrillingdiv[i].addEventListener("click",(e)=>{
//         let value = thrillingdiv[i].attributes.name.value
//         sessionStorage.setItem("ptype",value)
//         window.location.assign("./src/productpage/productpage.html")
//     })    
// }