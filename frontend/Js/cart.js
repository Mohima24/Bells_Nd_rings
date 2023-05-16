
const lsdata =JSON.parse(localStorage.getItem('lsdata'))|| []
const amountall = document.getElementById("amount")
const total_bill = document.getElementById("total_bill")
const proceed= document.getElementById("proceedtocheckout")

let promo= document.getElementById('promocode')
promo.addEventListener('click',function(){
   document.getElementById('promo_code').style.display="flex" ;
   document.getElementById('apply').style.display="flex";

    promo.style.display="none"
    document.getElementById('apply').style.cursor="pointer"

})

document.getElementById('apply').addEventListener('click',function(){
    if(document.getElementById('promo_code').value=="masai30"){
        promo.style.display="flex";
        document.getElementById('promo_code').style.display="none" ;
        document.getElementById('apply').style.display="none";

        document.getElementById('dicount').innerText= 10;
        foodValue=foodValue-10;
        document.getElementById('total_bill').innerText=foodValue;
        document.getElementById('pay-total').innerText=foodValue;
    }
})

const cartalldata = document.getElementById("cartdata")

function addtocart(){
    cartalldata.innerHTML=`${lsdata.map((el,i)=>{
        return `
            <div>
            <img src="${el.img}" alt="">
            <h4>${el.name}</h4>
            <div data-id=${el._id}>
                <select id="quantit">
                ${quantityrender(el.quantity)}
                </select>
            </div>
            <p id="tot">${el.total}</p>
            <button id="delete" value=${i}>Delete</button>
            </div>
        `
    })}`
}
addtocart()
    const tot = document.querySelectorAll("#tot")
    const selecttg= document.querySelectorAll("#cartdata>div>div>select")
    for(let i=0;i<selecttg.length;i++){

        selecttg[i].addEventListener("change",(e)=>{
            let filter= lsdata.filter((el)=>{
                return el._id==selecttg[i].dataset.id
            })
            let diff = Math.abs(e.target.value - filter[0].quantity)
            let x = +e.target.value* filter[0].price
            q= +e.target.value
            tot[i].innerText=`$ ${x}`

            function totalamt(){
                let data = lsdata.reduce((acc,el)=>{
                    acc=acc+el.total
                    return acc
                },0)
                amountall.innerText=data
                return data
            }
            // let totalamt=totalamt()
            total_bill.innerText = +totalamt()+9.9 + diff
        })
    }

const dlt_btn= document.querySelectorAll("#delete")
console.log(dlt_btn[0].value)
for(let i=0;i<dlt_btn.length;i++){
    dlt_btn[i].addEventListener("click",()=>{
        deleteData(dlt_btn[0].value)
        window.location.reload()
    })
}

function deleteData(index){
    let delData = JSON.parse(localStorage.getItem('lsdata')) || []
    delData.splice(index,1)
    localStorage.setItem('lsdata',JSON.stringify(delData))
    addtocart()

    function totalamt(){
        let data = lsdata.reduce((acc,el)=>{
            acc=acc+el.total
            return acc
        },0)
        amountall.innerText=data
        return data
    }
    // let totalamt=totalamt()
    total_bill.innerText = +totalamt()+9.9
}

function totalamt(){
    let data = lsdata.reduce((acc,el)=>{
        acc=acc+el.total
        return acc
    },0)
    amountall.innerText=data
    return data
}
// let totalamt=totalamt()
total_bill.innerText = +totalamt()+9.9
totalamt()


function quantityrender(el){
    if(el==24){
       return`
        <option value=24>24</option>
        <option value=48>48</option>
        <option value=72>72</option>
        <option value=96>96</option>`
    }else if(el==48){
        return`
        <option value=48>48</option>
        <option value=24>24</option>
        <option value=72>72</option>
        <option value=96>96</option>
        `
    }else if(el==72){
        return`
        <option value=24>72</option>
        <option value=48>24</option>
        <option value=72>48</option>
        <option value=96>96</option>
        `
    }else{
        return`
        <option value=24>96</option>
        <option value=48>24</option>
        <option value=72>48</option>
        <option value=96>72</option>
        `
    }
}

proceed.addEventListener("click",()=>{
    window.location.assign("../payment_page/payment.html")
})