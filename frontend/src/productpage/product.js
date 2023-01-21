const products = document.getElementById("products")
const options = document.getElementById("options")
const material = document.getElementById("material")
const ratings= document.querySelectorAll('#ratings>div>input')
const value = sessionStorage.getItem("ptype") || "Calendars & Planners"
let url=`http://localhost:6060/products/?ptype=${value}`

const render = async()=>{
    try{
        let fetchd= await fetch(url)
        let data = await fetchd.json()
        renderData(data)
        reducefun(data)
    }
    catch(err){
        console.log(err)
    }
}

options.addEventListener('change',()=>{
    if(options.value=="lth"){
        url=`http://localhost:6060/products/?ptype=${value}&sort=1`
    }else if(options.value=="htl"){
        url=`http://localhost:6060/products/?ptype=${value}&sort=-1`
    }else{
        url=`http://localhost:6060/products/?ptype=${value}`
    }

    const render = async()=>{
        try{
            let fetchd= await fetch(url)
            let data = await fetchd.json()
            renderData(data)
        }
        catch(err){
            console.log(err)
        }
    }
    render()
})

function rating (){
    for(let i=0;i<ratings.length;i++){
        ratings[i].addEventListener('click',(e)=>{
            url=`http://localhost:6060/products/?ptype=${value}&rating=${e.target.value}&sort=1`

            const render = async()=>{
                try{
                    let fetchd= await fetch(url)
                    let data = await fetchd.json()
                    renderData(data)
                }
                catch(err){
                    console.log(err)
                }
            } 
            render()           
        })
    }
 }
rating ()
function icon(x){
    if(x==5){
        return '<img src="../images/5star.jpg" alt="">'
    }else if(x>=4 && x<5){
        return '<img src="../images/star4.jpg" alt="">'
    }else if(x>=3 && x<5){
        return '<img src="../images/star3.jpg" alt="">'
    }else if(x>=2 && x<5){
        return '<img src="../images/star2.jpg" alt="">'
    }else if(x>=1 && x<5){
        return '<img src="../images/star1.jpg" alt="">'
    }else{
        return '<img src="../images/star0.jpg" alt="">'
    }
}

function reducefun(data){
    let reducedata = data.reduce((acc,el)=>{
        acc.push(el.material)
        return acc
    },[])
    let newdata = reducedata.reduce((acc,el)=>{
        acc[el]=1
        return acc
    },{})
    material.innerHTML=`<p>MATERIAL BASE</p> <hr>
    ${forinl(newdata).map((el)=>{
        return `
        <div>
            <input type="checkbox"></input>
            <label>${el}</label>
        </div>
        `
    }).join("")}`
}
function forinl(reducedata){
    let arr=[]
    for (let key in reducedata){
        arr.push(key)
    }
    return arr
}

function renderData(data){

    products.innerHTML=`${data.map((el)=>{
            return `
                <div>
                    <img src=${el.img}></img>
                    <div>${icon(el.rating)}<p>${el.rating}</p></div>
                    <h3>${el.name}</h3>
                    <p>Minimum You Can Buy: 24 (1 case)</p>
                    <h2>${el.price}</h2>
                    <p>per unit</p>
                </div>
                `
        }).join("")}`
}
render()

function materialData (data){
    const render = async()=>{
        try{
            let fetchd= await fetch(url)
            let data = await fetchd.json()
            renderData(data)
            reducefun(data)
        }
        catch(err){
            console.log(err)
        }
    }
}
// &rating=${ratingsdata()}