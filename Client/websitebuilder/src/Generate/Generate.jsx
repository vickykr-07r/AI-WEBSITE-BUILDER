import { useEffect, useState } from "react";
import Style from "../Generate/Generate.module.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios"
import { useContext } from "react";
import { ServerContext } from "../Context/ServerContext.jsx";
import { useNavigate } from "react-router-dom";
function Generate(){
    const[prompt,setprompt]=useState("");
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false);
    const [progress,setProgress]=useState(0);
    const [phaseIndex,setPhaseIndex]=useState(0);
    const [error,setError]=useState("");
    const PHASES=[
        "Understanding your request...",
        "planning layout changes...",
        "Improving responsiveness...",
        "Applying animations...",
        "finalizing update...",
    ]
    function handleinput(event){
     setprompt(event.target.value)
    }
    function handlesubmit(event){
     event.preventDefault();
    }
    let {Serverurl}=useContext(ServerContext)
    const handlegeneratewebsite=async()=>{
        setLoading(true);
        try {
            const result=await axios.post(`${Serverurl}/api/website/generate`,{prompt},{withCredentials:true});
            console.log(result)
            setProgress(100);
            setLoading(false);
             navigate(`/editor/${result.data.websiteId}`)
        } catch (error) {
            console.error("Frontend Error ❌:", error.response?.data || error.message);
            setLoading(false);
            setError(error.response.data.message || "something went wrong");
           
        }
    }

    useEffect(()=>{
     if(!loading){
        setPhaseIndex(0);
        setProgress(0);
        return;
     }
     let value=0;
     let phase =0;

     const interval=setInterval(()=>{
        const increment=value<20 ?Math.random() * 1.5 : value<60 ? Math.random() * 1.2 : Math.random() * 0.6;
        value+=increment

        if(value>93) value=93;
        phase=Math.min(
            Math.floor((value/100)*PHASES.length),PHASES.length-1
        )
        setProgress(Math.floor(value));
        setPhaseIndex(phase)
     },1200)

     return ()=>clearInterval(interval)
    },[loading])
    return (
        <>
         <div className={Style.container}>

         <div className={Style.nav}>
          <IoMdArrowRoundBack onClick={()=>{navigate("/dashboard")}}/>
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
          {error && 
          <p>{error}</p>
          }
          <button onClick={handlegeneratewebsite}>Generate Website</button>
          </form> 

          {loading && (
          <div className={Style.a}>
          <div className={Style.b}>
         <span>{PHASES[phaseIndex]}</span>
         <span>{progress}%</span>
         </div>

         <div className={Style.c}>
      
         </div>
         Estimated time remaining:{""}
         <span>8-12 minutes</span>
         </div>
        )}
         </div>
         </div>
        </>
    )
}

export default Generate