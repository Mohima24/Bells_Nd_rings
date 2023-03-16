const form= document.getElementById("register")
const admin = document.getElementById("admin")

let access_token = JSON.parse(localStorage.getItem("admin_token"))
form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    try{
        let userobj={
            email:email.value,
            pass:pass.value
        }
        let login_rqst = await fetch("https://busy-gold-scarab-vest.cyclic.app/admins/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userobj)
        })
        if(login_rqst.ok){
            let token= await login_rqst.json()
            localStorage.setItem("admin_token",JSON.stringify(token))
            alert("Admin has been sucessfully log in")
            // admin.innerHTML=token.userName;
            window.location.assign("../adminmain/main.html")
        }else{
            alert("Admin not found Please login First")
        }

    }
    catch(err){
        alert("Admin not found Please login")
        console.log(err)
    }

})


