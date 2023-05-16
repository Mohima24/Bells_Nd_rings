const form1 = document.getElementById("register1");
const form2 = document.getElementById("register2");

form1.addEventListener("submit",async(e)=>{
    e.preventDefault()
    try{
        let userobj={
            firstName:fname1.value,
            lastName:lname1.value,
            email:email.value,
            password:pass1.value
        }
        let register_rqst = await fetch("https://busy-gold-scarab-vest.cyclic.app/users/signup/email",{
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
        alert("Enter valid credtials")
    }
})

form2.addEventListener("submit",async(e)=>{
    e.preventDefault()
    try{
        let userobj={
            firstName:fname2.value,
            lastName:lname2.value,
            mobile:mobile.value,
            password:pass2.value
        }
        
        let register_rqst = await fetch("https://busy-gold-scarab-vest.cyclic.app/users/signup/phone",{
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
        alert("Enter valid credtials")
    }
})