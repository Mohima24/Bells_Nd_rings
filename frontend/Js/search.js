const search = document.getElementById("inputsearch")
const searchData = document.getElementById("searchData")
const thrillsec_childdiv = document.querySelectorAll("#thrilling>div")
let access_token = JSON.parse(localStorage.getItem("access_token")) || null
const userData = JSON.parse(localStorage.getItem('userData')) || null
const cartnav= document.getElementById("cart")

// const adminside = document.getElementById("adminside")
console.log(userData)
const admin= document.getElementById("admin")
if(userData){
    admin.innerHTML=`
    <p>${userData.firstName}</p>
    <p>(logout)</p>
    `
}

searchData.innerHTML=""
let bag=[]
let fetchd= async()=>{
    try{
        let data = await fetch("https://busy-gold-scarab-vest.cyclic.app/products/?limit=5")
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

    searchData.innerHTML = null;

    searchData.innerHTML = `${data.map((el)=>{
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
    window.location.assign("signin.html")
})
cartnav.addEventListener("click",()=>{
    window.location.assign("cart.html")
})

