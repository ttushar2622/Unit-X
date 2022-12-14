
import loginCheck from "../utils/loginCheck.js";
const status = loginCheck();

if(!status){
    window.location.href="login.html";
}
import navbar from "../components/navbar.js"

const target = document.getElementById("navbar")

target.innerHTML=navbar()

const renderLoadingIndicator = ()=>{

    const cont = document.getElementById("loading_div");

    const  h2 = document.createElement("h2");
    h2.innerText="Loading....";

    h2.style.textAlign="center";
    h2.style.marginTop="2rem";

    cont.append(h2);
}
renderLoadingIndicator();



const handelAddtoCartClick =(el)=>{
    

    let cartArr=JSON.parse(localStorage.getItem("cart")) ||[];
    let flag=false;
    cartArr.map((element)=>{
        if(element.id===el.id){
            flag=true;
        }
    })

    if(flag){
        alert("Item already Present")
        return;
    }
    el.qty=1;

    cartArr.push(el);

    localStorage.setItem("cart",JSON.stringify(cartArr));
    target.innerHTML=navbar()
    alert("Item Added to Cart");



}



const append =(data)=>{

    const container = document.getElementById("products_div");
    container.innerHTML=null;
    
    data.map((el)=>{
       
     const mainDiv=document.createElement("div");
     const imgDiv=document.createElement("div");
     const contentDiv=document.createElement("div");
     const buttonDiv=document.createElement("div");
     const img=document.createElement("img");
     const titleP=document.createElement("p");
     const categoryP=document.createElement("p");
     const priceP=document.createElement("p");
     const buyButton=document.createElement("button");
     const addToCartButton = document.createElement("button");

     img.src=el.image;

     titleP.innerText=el.title;

     categoryP.innerText=el.category;

     priceP.innerText=el.price;

     buyButton.innerText="Buy";

     addToCartButton.innerText="Add To Cart";


     addToCartButton.addEventListener("click",()=>{
           
        handelAddtoCartClick(el)

     })

     imgDiv.append(img);
     contentDiv.append(titleP,categoryP,priceP);
     buttonDiv.append(buyButton,addToCartButton);
     mainDiv.append(imgDiv,contentDiv,buttonDiv);
     container.append(mainDiv)
    })
}



 let data;

const getData= async ()=>{

    try{
        const res = await fetch(`https://fakestoreapi.com/products`);

         data = await res.json();

        console.log(data);

        const cont=document.getElementById("loading_div");
        cont.innerHTML=null;
        append(data);

    }
    catch(err){
        console.log(err);

        const cont=document.getElementById("loading_div");
        cont.innerHTML=null;

        const  h2 = document.createElement("h2");
        h2.innerText="404";
    
        h2.style.textAlign="center";
        h2.style.marginTop="2rem";
    
        cont.append(h2);
        
    }
}

getData();

document.querySelector("#pricesort").addEventListener("change",handlesort);
function handlesort(){
    let selecting = document.querySelector("#pricesort").value;
    if(selecting==""){
      append(data);
    }
    else{
      if(selecting == "High-to-low"){
      data.sort(function (a,b){
         return b.price-a.price;
      });
      append(data);
    }

    if(selecting ==  "Low-to-high"){
      data.sort(function (a,b){
        return a.price-b.price;
      });
      append(data);
    }
  }
}