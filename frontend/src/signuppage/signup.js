const form= document.getElementById("register")
form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    try{
        let userobj={
            name:uname.value,
            email:email.value,
            phone:number.value,
            pass:pass.value
        }
        let register_rqst = await fetch("http://localhost:6060/users/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userobj)
        })
        if(register_rqst.ok){
            alert("Sign Up Successfully")
        }else{
            alert("You already have an account")
        }

    }
    catch(err){
        console.log(err)
    }
    console.log("hello")
})