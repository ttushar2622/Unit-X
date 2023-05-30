
import './App.css';
import {useState} from "react"
function App() {
  const [count, setcount] = useState(0);
  
  const handleAdd =()=>{
    setcount((prev)=>prev+1)
  }

  const handleDec =()=>{
    setcount((prev)=>prev-1)
  }
  const reset=()=>{
    setcount(0)
  }

  return (
    <div className="App">
       <h1>{count}</h1>
       <button onClick={handleAdd}>Increase</button>
       <button onClick={handleDec}>Decrease</button>
       <button onClick={reset}>Reset</button>
    </div>
  );
}




export default App;
