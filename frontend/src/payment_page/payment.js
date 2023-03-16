const gpay = document.getElementById("gpay")
const ppay= document.getElementById("ppay")
const headings= document.querySelector("#popup>form>h2")
const cross= document.querySelector("#popup>form>img")
const popup= document.getElementById("popup")
const form = document.getElementById("form")

gpay.addEventListener("click",()=>{
    popup.style.display="flex"
    headings.innerText= "G-pay"
    // window.location.reload()
    console.log("hello")
})
ppay.addEventListener("click",()=>{
    popup.style.display="flex";
    headings.innerText= "Phone-pe"
    // window.location.reload()
    console.log("hello")
})
cross.addEventListener("click",()=>{
    popup.style.display="none"
})

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    if(number.value){
        console.log(number.value)
        alert("Payment has been succesfull")
        popup.style.display="none"
        window.location.assign("../../index.html")
    }else{
        alert("please try again")
    }
})