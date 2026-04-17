import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { ServerContext } from "../Context/ServerContext.jsx";
import {useParams} from "react-router-dom"
import Style from "../Editor/Editor.module.css"
import { FaRocket } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
export function Editor(){
    let {Serverurl}=useContext(ServerContext);
    const {id}=useParams();
    const [website,setWebsite]=useState(null);
    const iframeRef=useRef(null);
    useEffect(()=>{
        const getwebsitebyid=async()=>{
            try {
                const result=await axios.get(`${Serverurl}/api/website/get-by-id/${id}`,{withCredentials:true}) 
                setWebsite(result.data);
            } catch (error) {
                console.log(error)
            }
        }
        getwebsitebyid()
    },[id, Serverurl])

    

    if(!website){
        return <div>Loading...</div>
    }

    return (
        <div className={Style.container}>
            <aside>
                <Header/>
                <Chat/>
            </aside>

            <div className={Style.main}>
             <div className={Style.prevheader}>
             <div className={Style.prevheaderleft}>
             <span>Live Preview</span>
             </div>
             <div className={Style.prevheaderright}>
             <button><FaRocket />Deploy</button>
             <button><FaCode /></button>
             <button><MdMonitor /></button>
             </div>
             </div>

             <iframe ref={iframeRef}></iframe>
            </div>
        </div>
    )


    function Header(){
        return(
            <div className={Style.header}>
                <span>{website.title}</span>
            </div>
        )
    }

    function Chat(){
        return(
            <div className={Style.chat}>
                {website.conversation?.map((m,i)=>(
                    <div key={i}>
                        {m.content}
                    </div>
                ))}
            </div>
        )
    }
}

