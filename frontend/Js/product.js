const products = document.getElementById("productDiv")
const options = document.getElementById("options")
const material = document.getElementById("material")
const ratings= document.querySelectorAll('#ratings>div>input')
const righth = document.querySelector("#right>h1")
const pagination_element = document.getElementById('pagination');


const value = sessionStorage.getItem("ptype") || "Calendars & Planners"

righth.innerText = `${value}`


let current_page = 1;
let rows = 8;


let url=`https://busy-gold-scarab-vest.cyclic.app/products/?ptype=${value}`
let arr=[]
const render = async()=>{
    try{
        let fetchd= await fetch(url)
        let data = await fetchd.json()
        arr=data
        // renderData(data)
        DisplayList (data, products, rows, current_page)
        SetupPagination (data, pagination_element, rows)
        reducefun(data)
    }
    catch(err){
        console.log(err)
    }
}

options.addEventListener('change',()=>{
    if(options.value=="lth"){
        url=`https://busy-gold-scarab-vest.cyclic.app/products/?ptype=${value}&sort=1`
    }else if(options.value=="htl"){
        url=`https://busy-gold-scarab-vest.cyclic.app/products/?ptype=${value}&sort=-1`
    }else{
        url=`https://busy-gold-scarab-vest.cyclic.app/products/?ptype=${value}`
    }

    const render = async()=>{
        try{
            let fetchd= await fetch(url)
            let data = await fetchd.json()
            DisplayList (data, products, rows, current_page)
            SetupPagination (data, pagination_element, rows)
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
            url=`https://busy-gold-scarab-vest.cyclic.app/products/?ptype=${value}&rating=${e.target.value}`

            const render = async()=>{
                try{
                    let fetchd= await fetch(url)
                    let data = await fetchd.json()
                    arr=data
                    DisplayList (data, products, rows, current_page)
                    SetupPagination (data, pagination_element, rows)
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

function reducefun(data){

    let reducedata = data.reduce((acc,el)=>{
        acc.push(el.material)
        return acc
    },[])
    let newdata = reducedata.reduce((acc,el)=>{
        let trims= el.trim().toLowerCase()
        acc[trims]=1
        return acc
    },{})
    // console.log(newdata)
    material.innerHTML=`<p>MATERIAL BASE</p> <hr>
    ${forinl(newdata).map((el)=>{
        return `
        <div>
            <input value=${el} type="checkbox"></input>
            <label>${el}</label>
        </div>
        `
    }).join("")}`

    let childdiv=document.querySelectorAll("#material>div>input")
    for(let i=0;i<childdiv.length;i++){
        childdiv[i].addEventListener('click',(e)=>{
            let newData= arr.filter((el)=>{
                return el.material.toLowerCase().trim()==e.target.value.toLowerCase().trim()
            })
            DisplayList (newData, products, rows, current_page)
            SetupPagination (newData, pagination_element, rows)
        })
    }
}


function forinl(reducedata){
    let arr=[]
    for (let key in reducedata){
        arr.push(key)
    }
    return arr
}

render()

function DisplayList (items, wrapper, rows_per_page, page) {
	
	wrapper.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

        products.innerHTML=`${paginatedItems.map((el)=>{
            return `
                <div data-id=${el._id}>
                    <img src=${el.img}></img>
                    <div>${icon(el.rating)}<p>${el.rating}</p></div>
                    <h3>${el.name}</h3>
                    <p>Minimum You Can Buy: 24 (1 case)</p>
                    <div>
                        <h2>$ ${el.price}</h2>
                        <p>per unit</p>
                    </div>
                </div>
                `
        }).join("")}`


        const productsel= document.querySelectorAll("#productDiv>div")
        for(let i=0;i<productsel.length;i++){

            productsel[i].addEventListener('click',()=>{

                const idData = async()=>{
                    try{
                        let fetchd= await fetch(`https://busy-gold-scarab-vest.cyclic.app/products/${productsel[i].dataset.id}`)
                        let data = await fetchd.json()
                        localStorage.setItem('oneEl',JSON.stringify(data))
                        window.location.assign("visible.html")
                        console.log(data)
                    }
                    catch(err){
                        console.log(err)
                    }
                }
                idData()

            })

        }

}


function SetupPagination(items, wrapper, rows_per_page) {

	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);

	for (let i = 1; i < page_count + 1; i++) {

		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);

	}

}

function PaginationButton (page, items) {

	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {

		current_page = page;
		DisplayList(items, products, rows, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');

	});

	return button;

}