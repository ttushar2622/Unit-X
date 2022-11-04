
import loginCheck from "../utils/loginCheck.js";
const status = loginCheck();

if(!status){
    window.location.href="login.html";
}
import navbar from "../components/navbar.js"

const target = document.getElementById("navbar")

target.innerHTML=navbar()



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



const getData= async ()=>{

    try{
        const res = await fetch(`https://fakestoreapi.com/products`);

        const data = await res.json();

        console.log(data);
        append(data);

    }
    catch(err){
        console.log(err);
    }
}

getData();