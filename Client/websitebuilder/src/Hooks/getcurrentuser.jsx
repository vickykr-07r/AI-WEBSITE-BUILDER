import { useContext, useEffect } from "react"
import axios from "axios"
import { ServerContext } from "../Context/ServerContext.jsx";
export function useGetcurrentuser(){
    const {Serverurl}=useContext(ServerContext);
    useEffect(()=>{
        const getcurrentuser=async()=>{
            try {
                const result =await axios.get(`${Serverurl}/api/user/getcurrentuser`,{withCredentials:true})
                console.log(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getcurrentuser();
    },[])
}