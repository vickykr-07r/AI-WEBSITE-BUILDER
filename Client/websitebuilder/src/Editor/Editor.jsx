import { useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import { ServerContext } from "../Context/ServerContext.jsx";
import {useParams} from "react-router-dom"
import Style from "../Editor/Editor.module.css"
export function Editor(){
    let {Serverurl}=useContext(ServerContext);
    const {id}=useParams();
    const [website,setWebsite]=useState(null);
    useEffect(()=>{
    const getwebsitebyid=async()=>{
    try {
      const result=await axios.get(`${Serverurl}/api/website/get-by-id/${id}`,{withCredentials:true}) 
      console.log(result)
      setWebsite(result.data);
    } catch (error) {
        console.log(error)
    }
    }
    getwebsitebyid()
    },[id])
    return (
        <>
         
        </>
    )
}