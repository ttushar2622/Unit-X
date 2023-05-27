let getLocal=JSON.parse(localStorage.getItem("flag"))


let tbody=document.getElementById("tbody")


const handelGetData=()=>{
    fetch(`https://mock4dofinal.vercel.app/appointments`)
    .then((res)=>res.json())
    .then((data)=>{
       fetchDisplay(data)
    })
}

handelGetData()


const fetchDisplay=(data)=>{
  console.log(data)
  tbody.innerHTML=null

data?.map((el,i)=>{
    // tbody.innerHTML=""
    let tr=document.createElement("tr")
    // let td1=document.createElement("td")
    // td1.innerText=el.id
    let td2=document.createElement("td")
    td2.innerText=el.name
  
    let td3=document.createElement("td")
    td3.innerText=el.specialization
    let td4=document.createElement("td")
    td4.innerText=el.experience
    let td5=document.createElement("td")
    td5.innerText=el.location

    let td6=document.createElement("td")
    td6.innerText=el.slots

    let td7=document.createElement("td")
    td7.innerText="Edit"
    let td8=document.createElement("td")
    td8.innerText="Delete"
    td8.addEventListener("click",(e)=>{
     fetch(`https://mock4dofinal.vercel.app/appointments/${el.id}`,{
        method: "DELETE",
     }).then(()=>{
        handelGetData()
     })
    })
    let td9=document.createElement("td")
    td9.innerText="Appontments"
    
    tr.append(td2,td3,td4,td5,td6,td7,td8,td9)
       tbody.append(tr)
})

}
