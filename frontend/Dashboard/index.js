const container= document.getElementById("container")
// let access_token = JSON.parse(localStorage.getItem("access_token"))

const render = async()=>{
    try{
        let fetchd= await fetch("http://localhost:6060/products/")
        let data = await fetchd.json()
        renderData(data)
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}
function renderData(data){
    container.innerHTML=`${data.map((el)=>{
        return `
        <div>
            <img src=${el.img}></img>
            <p>${el.name}</p>
            <p>${el.material}</p>
            <p>${el.price}</p>
            <p>${el.rating}</p>
            <p>${el.ptype}</p>
            <p>${el._id}</p>
            <p>${el.adminName}</p>
        </div>`
    }).join("")}`
}
render()

