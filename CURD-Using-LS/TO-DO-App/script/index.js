
const addTodoButton = document.querySelector("#addTodoButton");

addTodoButton.addEventListener("click",handleAddTodo)
    let todoArray  = JSON.parse(localStorage.getItem("todos")) || [];
    function handleAddTodo(){
        // alert  ("Hii")
        
        // catch input value
        const inputTodoValue = document.getElementById("todoInput").value;

        if(!inputTodoValue){
            alert("Type Something");
            return;
        }
        
        // create payload and push this object in array
        const payload = {
            todo: inputTodoValue,
            status:false,
            id:Date.now() + inputTodoValue
        }

        todoArray.push(payload);
        //  store in localstorage or in database
        localStorage.setItem("todos",JSON.stringify(todoArray))

        append(todoArray);
        // in order to get data appended without refreshing we need to call here.

 }
 append(todoArray)

 function append(todos){

    const container = document.querySelector(".allTodo_div")
    container.innerHTML=null;
    
    todos.map((el)=>{

        // create html using dom

        const mainDiv = document.createElement("div");

        const h3 = document.createElement("h3");

        const  updateButton = document.createElement("button");

        const deleteButton = document.createElement("button");


        // give any attribute or style

        h3.textContent=el.todo;

        if(el.status){
           updateButton.textContent="Done"
           updateButton.style.background="green";
        }
        else{
            updateButton.textContent="Not Done"
            updateButton.style.background="red";
        }

        deleteButton.textContent="Delete";
        deleteButton.style.background="orange";
        deleteButton.style.color="black";

        deleteButton.addEventListener("click",()=>{
            handelDelete(el.id)
        })

        updateButton.addEventListener("click",()=>{
            handleUpdateTodo(el.id)
        })

        mainDiv.append(h3,updateButton,deleteButton)
        container.append(mainDiv)

    })
 }

 function handleUpdateTodo(id){
    //    alert(id)

    todoArray= todoArray.map((el)=>{

        if(el.id==id){
            return {...el,status: !el.status}
        }
        else{
            return el;
        }
    })
    localStorage.setItem("todos",JSON.stringify(todoArray));

    append(todoArray);
 }


 function handelDelete(id){

    todoArray=todoArray.filter((el)=>{
        return el.id !== id
    })
    localStorage.setItem("todos",JSON.stringify(todoArray));

    append(todoArray)

 }
    