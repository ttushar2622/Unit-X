const navbar =()=>{

    let length;
    

    const status=JSON.parse(localStorage.getItem("token"));

    if(!status){
        length=null;
    }
    else{
        const cartArr = JSON.parse(localStorage.getItem("cart"));
        if(!cartArr){
            length=0;
        }
        else{
            length=cartArr.length;
        }
      
    }





    return ` <div id="navbar">
    <div><h1>Flipkart</h1></div>
   <div>

    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="product.html">Product</a></li>
        <li><a href="cart.html">Cart ${length ? `${length}`:""}</a></li>
      
    </ul>
   </div>

   
</div>`
}

export default navbar;