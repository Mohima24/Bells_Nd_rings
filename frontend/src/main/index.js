const thrillingdiv= document.querySelectorAll('#thrilling>div')
let value = sessionStorage.getItem("ptype")

for(let i=0;i<thrillingdiv.length;i++){
    thrillingdiv[i].addEventListener("click",(e)=>{
        let value = thrillingdiv[i].attributes.name.value
        sessionStorage.setItem("ptype",value)
        window.location.assign("./src/productpage/productpage.html")
    })    
}

// console.log(thrillingdiv[0].attributes.name.value)
// .attributes.name.value
// async function
