import navbar from "../components/navbar.js"

const target = document.getElementById("navbar")

target.innerHTML=navbar()
const form = document.querySelector("#registration_form");
 
const handleFormSubmit = (events)=>{

    events.preventDefault();

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cPassword").value;

    if(!email || !password || !name || !confirmPassword){
        alert("Fill the details");
        return;
    }

    const payload = {
        email,
        password,
    }
    
    fetch(`https://reqres.in/api/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
    }).then((res)=>{
        return res.json();
    }).then((res)=>{
        console.log(res);
        alert("registration Sucessfull");
        window.location.href="login.html"

    }).catch((err)=>{
        console.log(err)
    })

    
   


}
form.addEventListener("submit",handleFormSubmit)