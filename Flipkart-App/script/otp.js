import navbar from "../components/navbar.js"

const target = document.getElementById("navbar")

target.innerHTML=navbar();

const renderTotalPrice = ()=>{
    const data = JSON.parse(localStorage.getItem("addressPageData"));

    console.log(data);

    const { totalPrice } = data;

    const span = document.getElementById("totalPrice_span");

    span.innerText=totalPrice
}
renderTotalPrice();

const one=document.getElementById("one")
const two=document.getElementById("two")
const three=document.getElementById("three")
const four=document.getElementById("four")

const handleInputOne = ()=>{
   const oneValue=one.value;
   
   if(oneValue.length === 1){
    two.focus();
   }
}

const handleInputTwo = ()=>{

    if(!one.value){
        two.value=null;
        one.focus();
        return
    }
   
    const twoValue=two.value;
    if(twoValue.length===1){
        three.focus();
    }
    if(twoValue.length ===0){
        one.focus();
    }
}

const handleInputThree = ()=>{

    if(!one.value || !two.value){
        three.value=null;
        two.focus();
        return
    }
   
    const threeValue=three.value;
    if(threeValue.length===1){
        four.focus();
    }
    if(threeValue.length ===0){
        two.focus();
    }
}

const handleInputFour = ()=>{

    if(!one.value || !two.value ||!three.value){
        four.value=null;
        three.focus();
        return
    }
    
    const fourValue=four.value;
    if(fourValue.length ===0){
        three.focus();
    }

    if(fourValue.length> 1){
        four.value = fourValue[0];
        return;
    }
}
one.addEventListener("input",handleInputOne);
two.addEventListener("input",handleInputTwo);
three.addEventListener("input",handleInputThree);
four.addEventListener("input",handleInputFour);



const handleSubmit = ()=>{

    const otp = one.value + two.value + three.value + four.value;
    
    if(otp !== "1234"){
        alert("Incorrect Password");
        return;
    }

    const cont = document.querySelector(".otp_div");
    cont.innerHTML=null;

    const h2 = document.createElement("h2");
    h2.innerText="Order Placed Successfully, Thanks for Shopping"

    h2.style.textAlign="center";
    h2.style.marginTop="2rem";
    h2.style.color="yellow";

    cont.append(h2);

    setTimeout(() => {
        localStorage.removeItem("cart")
        window.location.href="product.html"
    }, 3000);

}

const button = document.getElementById("submit");
button.addEventListener("click",handleSubmit)
