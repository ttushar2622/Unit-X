import loginCheck from "../utils/loginCheck.js";
const status = loginCheck();

if(!status){
    window.location.href="login.html";
}
import navbar from "../components/navbar.js"

const target = document.getElementById("navbar")

target.innerHTML=navbar()

const handleRemove= (el)=>{

    let  cartArr = JSON.parse(localStorage.getItem("cart"));

    cartArr=cartArr.filter((element)=>{
        return element.id !== el.id;
    })

    localStorage.setItem("cart",JSON.stringify(cartArr));

    append(cartArr);
    handlePriceCalculation();
    target.innerHTML=navbar()
}

const handlePriceCalculation = ()=>{
    const cartArr = JSON.parse(localStorage.getItem("cart"));

    let sum=0;

    cartArr.map((el)=>{

        sum = sum + el.price*el.qty;
    })
    

    const span = document.getElementById("totalPrice_span");

    span.innerText=sum;
    localStorage.setItem("totalPrice",JSON.stringify(sum));

}
 
 handlePriceCalculation();

 const handelQuantity=(el,type)=>{

    if(type === "-" && el.qty===1){
        alert("Can't Reduce  qty")
        return;
    }

    let cartArr = JSON.parse(localStorage.getItem("cart"));
       
    if(type=== "+"){
        
        cartArr=cartArr.map((element)=>{
            if(element.id==el.id){
                return{...element, qty:element.qty+1}
            }
            else{
                return element;
            }
        })
      
        localStorage.setItem("cart",JSON.stringify(cartArr));
        append(cartArr);
        handlePriceCalculation();
        
    }
    else{
         

        cartArr=cartArr.map((element)=>{
            if(element.id==el.id){
                return{...element, qty:element.qty-1}
            }
            else{
                return element;
            }
        })
       
        localStorage.setItem("cart",JSON.stringify(cartArr));
        append(cartArr);
        handlePriceCalculation();
    }
 };



const append =(data)=>{

    const container = document.getElementById("cartProducts_div");
    container.innerHTML=null;
    
    data.map((el)=>{
       
     const mainDiv=document.createElement("div");
     const imgDiv=document.createElement("div");
     const contentDiv=document.createElement("div");
     const buttonDiv=document.createElement("div");
     const img=document.createElement("img");
     const titleP=document.createElement("p");
     const categoryP=document.createElement("p");
     const priceP=document.createElement("p")
     const qtyP=document.createElement("p");
     const incrementButton=document.createElement("button");
     const decrementButton=document.createElement("button");
     const removeButton = document.createElement("button");

     img.src=el.image;

     titleP.innerText=el.title;

     categoryP.innerText=el.category;

     priceP.innerText=el.price;

     incrementButton.innerText="+";

     decrementButton.innerText="-";

     removeButton.innerText="Remove"

     qtyP.innerText="Quantity - " + `${el.qty}`
     qtyP.style.color="orange"

     removeButton.style.backgroundColor="red";
     removeButton.style.color="white";
     incrementButton.style.backgroundColor="teal";
     decrementButton.style.backgroundColor="teal";
     incrementButton.style.color="white";
     decrementButton.style.color="white";


     incrementButton.addEventListener("click" ,()=>{
        handelQuantity(el,"+");
     })

     decrementButton.addEventListener("click",()=>{
        handelQuantity(el,"-");
     })

     removeButton.addEventListener("click",()=>{
        handleRemove(el);
     })


    

     imgDiv.append(img);
     contentDiv.append(titleP,categoryP,priceP,qtyP);
     buttonDiv.append(incrementButton
        ,decrementButton,removeButton);
     mainDiv.append(imgDiv,contentDiv,buttonDiv);
     container.append(mainDiv)
    })
}


const getData=()=>{

    const cartArr=JSON.parse(localStorage.getItem("cart"));

    append(cartArr)
}

getData();