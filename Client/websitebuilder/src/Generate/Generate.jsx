import { useState } from "react";
import Style from "../Generate/Generate.module.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios"
import { useContext } from "react";
import { ServerContext } from "../Context/ServerContext.jsx";
function Generate(){
    const[prompt,setprompt]=useState("");
    function handleinput(event){
     setprompt(event.target.value)
    }
    function handlesubmit(event){
     event.preventDefault();
    }
    let {Serverurl}=useContext(ServerContext)
    const handlegeneratewebsite=async()=>{
        try {
            const result=await axios.post(`${Serverurl}/api/website/generate`,{prompt},{withCredentials:true});
            console.log(result)
        } catch (error) {
            
        }
    }
    return (
        <>
         <div className={Style.container}>

         <div className={Style.nav}>
          <IoMdArrowRoundBack />
          <h3>Genweb.AI</h3>
         </div>

         <div className={Style.data}>
        <h1>Build Website with </h1>
        <h3>Real AI Power</h3>
        <p>This process may take several minutes genweb.ai focuses on quality, not shortcuts.</p>
         </div>

         <div className={Style.inputdata}>
          <p>Describe Your Websites</p> 
          <form onSubmit={handlesubmit}>
          <textarea placeholder="Describe Your website in detail" onChange={handleinput} value={prompt} name="prompt"/>
          <button onClick={handlegeneratewebsite}>Generate Website</button>
          </form> 
         </div>
         </div>
        </>
    )
}

export default Generate