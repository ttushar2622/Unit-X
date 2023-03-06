import {useState ,useEffect} from "react"

const useOnlineStatus = () => {
   const [status,setStatus]=useState()

   useEffect(()=>{
    if(navigator.onLine){
      setStatus(true)
    }else{
      setStatus(false)
    }
   },[status])

   return status
};

export default useOnlineStatus;
