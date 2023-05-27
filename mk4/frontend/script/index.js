let logintog=document.getElementById("logintoggle")
let register=document.getElementById("registertoggle")

const logshow=document.getElementById("login")
const registerform=document.getElementById("register")

let flag=false

logintog.addEventListener("click",(e)=>{
    logshow.style.display="block"
    registerform.style.display="none"
    logintog.style.color="black"
    logintog.style.backgroundColor="white"
    register.style.color="white"
    register.style.backgroundColor=""
    
})

register.addEventListener("click",(e)=>{
    logshow.style.display="none"
    registerform.style.display="block"
    register.style.color="black"
    register.style.backgroundColor="white"
    logintog.style.color="white"
    logintog.style.backgroundColor="#454545"
})




registerform.addEventListener("submit",(e)=>{
    e.preventDefault()
    let obj={
        user:registerform.username.value,
        email:registerform.email.value,
        password:registerform.pass.value,
        doctor:registerform.doc.checked
    }
    console.log(obj)
     
    fetch("https://mock4dofinal.vercel.app/users",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(obj)
    })
    .then(()=>{
        document.getElementById("finalAns").innerText="Registration Successfull"
        setTimeout(()=>{
         window.location.href="index.html"
        },2000)
    })

})


{/* <input type="text" placeholder="email" id="userlogin" required>
<br>
<input type="password" placeholder="password" id="lpassword" required>
<br>
<input type="submit" value="Login"/> */}

logshow.addEventListener("submit",(e)=>{
  e.preventDefault()

  let obj={
    email:logshow.userlogin.value,
    password:logshow.lpassword.value
  }
  console.log(obj)
  fetch(`https://mock4dofinal.vercel.app/users?email=${obj.email}&password=${obj.password}`)
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res)
    if(res.length){
        if(res[0].doctor){
            document.getElementById("finalAns").innerText=`Welcome ${res[0].name}`
            console.log(res)
            flag=true
            localStorage.setItem("flag",JSON.stringify(flag))
            alert("Logged In Successfully")
            setTimeout(()=>{
                window.location.href="./dashboard.html"
               },2000)
        }else{
            document.getElementById("finalAns").innerText=`Welcome ${res[0].name}`
            console.log(res)
            alert("Logged In Successfully")
            setTimeout(()=>{
                window.location.href="./appointment.html"
               },2000)
        }
    }else{
        alert("Please Enter Valid Credentials")
    }
  }).catch((err)=>{
    console.log(err)
  })
})


