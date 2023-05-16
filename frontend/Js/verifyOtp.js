 const inputs = document.querySelectorAll("input");
 const button = document.querySelector("button");
 const resendOTPtimer = document.querySelector('#resendOTP>span')

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


document.getElementById('btn').addEventListener('click',()=>{

});

let interval=null;
let seconds=5;
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
    resendOTPtimer.innerText = `00:${seconds}`;
    if(seconds<=0){
        clearInterval(interval)
        seconds=60;
        document.getElementById('resendOTP').style.cursor="pointer"
    }
}


window.addEventListener("load", () => inputs[0].focus());