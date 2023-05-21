
const thrillingdiv= document.querySelectorAll('#thrilling>div')
let value = sessionStorage.getItem("ptype")


for(let i=0;i<thrillingdiv.length;i++){
    thrillingdiv[i].addEventListener("click",(e)=>{
        let value = thrillingdiv[i].attributes.name.value
        // console.log(thrillingdiv[i])
        sessionStorage.setItem("ptype",value)
        console.log(value)
        window.location.assign("productpage.html")
    })    
}