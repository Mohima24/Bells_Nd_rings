const search = document.getElementById("inputsearch")
const searchData = document.getElementById("searchData")
const thrillsec_childdiv = document.querySelectorAll("#thrilling>div")
let access_token = JSON.parse(localStorage.getItem("access_token")) || null

const admin= document.getElementById("admin")
if(access_token){
    admin.innerHTML=`
    <p>${access_token.userName}</p>
    <p>(logout)</p>
    `
    // admin.style.color="#ff5757"
    // admin.style.gap="3px"
}

searchData.innerHTML=""
let bag=[]
let fetchd= async()=>{
    try{
        let data = await fetch("http://localhost:6060/products/all")
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
    window.location.assign("../signuppage/signin.html")
})

// console.log(thrillsec_childdiv[0].attributes.name.value=="hello1")