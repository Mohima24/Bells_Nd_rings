const container= document.getElementById("dataside")
let access_token = JSON.parse(localStorage.getItem("admin_token"))
const searchData = document.getElementById("searchData")
var allproduct = [];

function renderData(data){
  container.innerHTML=""
    container.innerHTML=`${data.map((el)=>{
        return `
        <div>
            <img src=${el.img}></img>
            <p>Product ID : ${el._id}</p>
            <p>Product name : ${el.name}</p>
            <p>Material : ${el.material}</p>
            <p>Price : $${el.price}</p>
            <p>Rating : ${el.rating}</p>
            <p>Product Type : ${el.ptype}</p>
            <p>Created By ${el.adminName}</p>
            <button onclick="deletefun('${el._id}')" data-id=${el._id}>Delete</button>
        </div>`
    }).join("")}`
}

async function deletefun(id){
    try{
        let res = await fetch(`https://busy-gold-scarab-vest.cyclic.app/products/delete/${id}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization:access_token.token
            },
            method:"DELETE"
        })
        if(res.ok){
          productData(6, page);
        }
    }
    catch(err){
        console.log(err)
    }
}

async function productData(page_limit = 6, page_num = 1) {
    try {
      let alldata = await fetch(
        `https://busy-gold-scarab-vest.cyclic.app/products/?limit=${page_limit}&page=${page_num}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `${accesstokenAdmin}`,
          },
        }
      );
      if (alldata.ok) {
        let data = await alldata.json();
        allproduct = [...data];
        let total_page = data.length;
        // console.log(total_page)
        renderPaginationButtons(total_page);
        renderData(data);
        console.log(data)
      }
    } catch (error) {
        console.log(error)
      alert("something is wrong");
    }
  }
//   productData(1,2)
let paginationWrapper = document.querySelector("#pagination-wrapper");

function renderPaginationButtons(total_pages) {
  paginationWrapper.innerHTML = `
      <div className="pagination-btn-list">
	  ${CreatePagButton(total_pages).join(" ")}
      </div>
    `;
  let paginationButtons = document.querySelectorAll(".pagination-btn");
  for (let paginationButton of paginationButtons) {
    paginationButton.addEventListener("click", function (e) {
      let page_number = e.target.dataset.id;
      let page_limit = 6;
      productData(page_limit,page_number)
    });
  }
}


function getAsButton(text, cls, dataId) {
    return `<button class="${cls}" ${
      dataId ? `data-id = ${dataId}` : ""
    } >${text}</button>`;
  }

function CreatePagButton(total_page) {
    let array = [];
    for (let page = 1; page <= total_page; page++) {
      array.push(getAsButton(page, "pagination-btn", page));
    }
    return array;
  }

  window.addEventListener("load", (event) => {
    productData();
  });

let bag=[]
let fetchd= async()=>{
    try{
        let data = await fetch("https://busy-gold-scarab-vest.cyclic.app/products/all")
        let alldata = await data.json()
        bag=alldata
    }
    catch(err){
        console.log(err)
    }
}

searchData.addEventListener("input",(e)=>{
    let value = e.target.value
    let newData = bag.filter((el)=>{
        return el.name.toLowerCase().includes(value)
    })
    // console.log(e.target.value)
    fetchd()
    renderData(newData)
})