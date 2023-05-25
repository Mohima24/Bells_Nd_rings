const oneEl = JSON.parse(localStorage.getItem("oneEl"))

let x=oneEl.price*24
let q=24
productsel.innerHTML=`

<div id="imgside">
<img  src=${oneEl.img} alt="">
</div>
        <div id="detailside">
            <h1>${oneEl.name}</h1>
            <div id="review">${icon(oneEl.rating)} <span>${oneEl.rating}</span></div>
            <p>The item you have selected is on backorder. It should be available within 30 days.</p>
            <p id="amount">${oneEl.price} <span>(each)</span></p>
            <div>
            <select id="quantity">
            <option value=24>24</option>
            <option value=48>48</option>
            <option value=72>72</option>
            <option value=96>96</option>
            </select>
            <p id="total">$ ${oneEl.price*24}</p>
            </div>
            <button id="addtocart">Add to cart</button>
            </div>
            `

const add_tocart_button = document.getElementById("addtocart")
const total= document.getElementById("total")
const selectatg= document.getElementById("quantity")
selectatg.addEventListener("change",(e)=>{
     x = +e.target.value* oneEl.price
     q= +e.target.value
    total.innerText=`$ ${x}`
})
function icon(x){
    if(x==5){
        return '<img src="./src/images/5star.jpg" alt="">'
    }else if(x>=4 && x<5){
        return '<img src="./src/images/star4.jpg" alt="">'
    }else if(x>=3 && x<5){
        return '<img src="./src/images/star3.jpg" alt="">'
    }else if(x>=2 && x<5){
        return '<img src="./src/images/star2.jpg" alt="">'
    }else if(x>=1 && x<5){
        return '<img src="./src/images/star1.jpg" alt="">'
    }else{
        return '<img src="./src/images/star0.jpg" alt="">'
    }
}


add_tocart_button.addEventListener("click",()=>{
    let lsdata =JSON.parse(localStorage.getItem('lsdata'))|| []
    let obj={
        id:oneEl._id,
        name:oneEl.name,
        price:oneEl.price,
        quantity:q,
        img:oneEl.img,
        material:oneEl.material,
        total:x
    }
    
    lsdata.push(obj)
    localStorage.setItem('lsdata',JSON.stringify(lsdata))
    alert("You just added one item in your cart")
})
