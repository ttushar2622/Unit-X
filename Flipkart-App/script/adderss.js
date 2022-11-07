import navbar from "../components/navbar.js"

const target = document.getElementById("navbar")

target.innerHTML=navbar()

import data from "../utils/data.js"
console.log(data)


const renderStateDetails = (data)=>{

    const select = document.getElementById("state_select")

     data.map((el)=>{

        const option = document.createElement("option");
    //    attributes..
        option.innerText=el;
        option.value=el;

        select.append(option);
     })
}

const handlePaymentModeChange = ()=>{
   
    const value = document.getElementById("PaymentMode_select").value;

    if(value=== "cod"){
        const container = document.getElementById("paymentDetails_div")
        container.innerHTML=null;
        return;
    }
    else{

        const container = document.getElementById("paymentDetails_div");

        const html = `<label for="">Card Number</label>
        <input type="number" id="cardNumber" />

        <label for="">CVV</label>
        <input type="number" id="cvv" />

        <label for="">Expiry Date</label>
        <input type="date" id="expiryDate" />

        <label for="">Card Holder Name</label>
        <input type="text" id="cardHolderName" />`

        container.innerHTML=html;

    }
}

renderStateDetails(data);

const paymentModeSelect = document.getElementById("PaymentMode_select");

paymentModeSelect.addEventListener("change",handlePaymentModeChange);


const handleFormSumbit = (event)=>{
    event.preventDefault();

    const name=document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value

    const selectState = document.getElementById("state_select").value;

    const pin = document
    .getElementById("pin").value;

    const paymentMode = document.getElementById("PaymentMode_select").value;

    if(!name||!address||!city||!selectState||!pin||!paymentMode){
        alert("Fields Empty");
        return;
    }

    let cardNumber;
    let cvvNumber;
    let expiryDate;
    let cardHolderName;

    if(paymentMode==="card"){
       
        cardNumber=document.getElementById("cardNumber").value;

        cvvNumber=document.getElementById("cvv").value;

        expiryDate=document.getElementById("expiryDate").value;

        cardHolderName= document.getElementById("cardHolderName").value;

        if(!cardNumber||!cvvNumber||!expiryDate||!cardHolderName){
            alert("Fields Empty");
            return;
        }


    }

    const payload = {
        name,
        address,
        city,
        selectState,
        pin,
        paymentMode
    }

    if(paymentMode === "card"){
        payload.cardDetails ={
            cardNumber,
            cvvNumber,
            expiryDate,
            cardHolderName
        }
    }

    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

    payload.totalPrice=totalPrice
    console.log(payload);

    localStorage.setItem("addressPageData",JSON.stringify(payload))

   window.location.href="otp.html"

}


const form = document.getElementById("addressForm_form");

form.addEventListener("submit", handleFormSumbit);




