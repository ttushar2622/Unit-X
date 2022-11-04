import navbar from "../components/navbar.js"

const target = document.getElementById("navbar")

target.innerHTML=navbar()
const form = document.querySelector("#login_form");
 
const handleFormSubmit = async (events)=>{

    events.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    if(!email || !password){
        alert("Fill the details");
        return;
    }

    const payload = {
        email,
        password,
    }
    
     try{
           
        const res = await fetch(`https://reqres.in/api/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        });

        const data = await  res.json();
    
        console.log(data);
        alert ("Login success")

        localStorage.setItem("token",JSON.stringify(data))

        window.location.href="product.html"

     }
     catch(err){
        console.log(err);
     }


}
form.addEventListener("submit",handleFormSubmit)