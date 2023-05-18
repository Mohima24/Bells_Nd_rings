const form1= document.getElementById("register1")
const form2= document.getElementById("register2")
const admin = document.getElementById("admin")
let access_token = JSON.parse(localStorage.getItem("access_token"))

form1.addEventListener("submit",async(e)=>{
    e.preventDefault()
    try{

        let userobj={
            email:email.value,
            password:pass1.value,
        }
        let login_rqst = await fetch("https://busy-gold-scarab-vest.cyclic.app/users/login/email",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userobj)
        })
        if(login_rqst.ok){
            let token= await login_rqst.json()
            localStorage.setItem("access_token",JSON.stringify(token))
            alert("User has been sucessfully log in")
            window.location.assign("index.html")
        }else{
            alert("Please login First")
        }

    }
    catch(err){
        alert("found Please login")
        console.log(err)
    }

})

form2.addEventListener("submit",async(e)=>{
    e.preventDefault()
    try{

        let userobj={
            email:phone.value,
            password:pass2.value,
        }
        let login_rqst = await fetch("https://busy-gold-scarab-vest.cyclic.app/users/login/mobile",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userobj)
        })
        if(login_rqst.ok){
            let token= await login_rqst.json()
            localStorage.setItem("access_token",JSON.stringify(token))
            alert("User has been sucessfully log in")
            window.location.assign("index.html")
        }else{
            alert("Please login First")
        }

    }
    catch(err){
        alert("found Please login")
        console.log(err)
    }

})
