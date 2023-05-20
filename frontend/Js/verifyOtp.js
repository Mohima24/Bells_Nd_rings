 const inputs = document.querySelectorAll("input");
 const button = document.querySelector("button");
 const resendOTPtimer = document.querySelector('#resendOTP>span')
 const resentButton = document.querySelector('#resendOTP>button')
 const userDetails = JSON.parse(localStorage.getItem('userDetails')) || null

inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {

    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;

    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }
    if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    if (e.key === "Backspace") {

      inputs.forEach((input, index2) => {
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }
    if (!inputs[3].disabled && inputs[3].value !== "") {
      button.classList.add("active");
      return;
    }
    button.classList.remove("active");
  });
});


document.getElementById('btn').addEventListener('click',async(e)=>{
  e.preventDefault()
  let userID = userDetails.userID;
  let otp = inputs[0].value+""+inputs[1].value+""+inputs[2].value+""+inputs[3].value;
  otp=+otp
  console.log(otp)

      try{
        let register_rqst = await fetch("https://busy-gold-scarab-vest.cyclic.app/users/verifyotp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({otp , userID:userID})
        })
        const data = await register_rqst.json()
        if(data.status=="verified"){
          alert("You are verified now")
          window.location.assign("signin.html")
        }else{
            alert("Please try again")
        }
    }
    catch(err){
        console.log(err)
    }
  }
);

let interval=null;
let seconds=60;
start()
function start(){
    if(interval!==null){
        return;
    }else{
        interval=setInterval(time,1000)
    }
}

function time(){
    seconds--;
    if(seconds<10){
      resendOTPtimer.innerText = `00:0${seconds}`
    }else{
      resendOTPtimer.innerText = `00:${seconds}`
    };
    if(seconds<=0){
        clearInterval(interval)
        seconds=60;
        document.getElementById('resendOTP').style.cursor="pointer";
        resentButton.style.cursor= "pointer"
        resentButton.classList.add('activeButton')
        resentButton.removeAttribute("disabled")
    }
}

resentButton.addEventListener('click',()=>{

  const useremail = userDetails.email;
  const userID = userDetails.userID;
  const mobile = userDetails.mobile;

  userDetails?useremail?resenOTPwithemail({useremail,userID}):resenOTPwithMobilel({mobile,userID}):console.log(null)

})

async function resenOTPwithemail({useremail,userID}){
  console.log(useremail,userID)
    try{
      let register_rqst = await fetch("https://busy-gold-scarab-vest.cyclic.app/users/resendOTPEmail",{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({email:useremail , userID:userID})
      })
      const data = await register_rqst.json()
      if(data.status=="PENDING"){
        alert("OTP has send")
      }else{
          alert("Please try again")
      }
  }
  catch(err){
      console.log(err)
  }
}

async function resenOTPwithMobilel({mobile,userID}){

    try{
      let register_rqst = await fetch("https://busy-gold-scarab-vest.cyclic.app/users/resendOTPMobile",{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({mobile:mobile , userID:userID})
      })
      const data = await register_rqst.json()
      if(data.status=="PENDING"){
        alert("OTP has send")
      }else{
          alert("Please try again")
      }
  }
  catch(err){
      console.log(err)
  }
}
window.addEventListener("load", () => inputs[0].focus());