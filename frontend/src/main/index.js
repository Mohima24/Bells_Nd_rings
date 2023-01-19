const search = document.getElementById("inputsearch")
const searchData = document.getElementById("searchData")
searchData.innerHTML=""
let bag=[]
let fetchd= async()=>{
    try{
        let data = await fetch("http://localhost:6060/products/all")
        let alldata = await data.json()
        bag=alldata
        console.log(alldata)
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
    console.log(newData,value)
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

