let uploadform= document.getElementById("uploadform")
let access_token = JSON.parse(localStorage.getItem("admin_token"))

console.log(access_token)
uploadform.addEventListener("submit",async(e)=>{
    e.preventDefault()
        let productobj={
            name:names.value,
            rating:rating.value,
            price:price.value,
            material:material.value,
            img:image.value,
            ptype:ptype.value
        }
        let post_rqst = await fetch("https://busy-gold-scarab-vest.cyclic.app/products/post",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:access_token.token
            },
            body:JSON.stringify(productobj)
        })
        if(post_rqst.ok){
            alert("Data has been posted")
            // await post_rqst.json()
        }
            
        
})
