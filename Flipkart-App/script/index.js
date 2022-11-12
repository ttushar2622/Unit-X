

import navbar from "../components/navbar.js"

const target = document.getElementById("navbar")

target.innerHTML=navbar()

// async function search(){

//     let query=document.getElementById("query").value;

//     let res = await  fetch(`https://fakestoreapi.com/products`)

//     let data = await res.json();
//     console.log(data)
// }
// search()