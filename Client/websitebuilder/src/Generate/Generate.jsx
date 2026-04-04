import { useState } from "react";
import Style from "../Generate/Generate.module.css"
import { IoMdArrowRoundBack } from "react-icons/io";
function Generate(){
    const[prompt,setprompt]=useState("");
    function handleinput(event){
     setprompt(event.target.value)
    }
    function handlesubmit(event){
     event.preventDefault();
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
          <button>Generate Website</button>
          </form> 
         </div>
         </div>
        </>
    )
}

export default Generate