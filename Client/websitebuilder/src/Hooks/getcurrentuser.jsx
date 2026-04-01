import { useContext, useEffect } from "react"
import axios from "axios"
import { ServerContext } from "../Context/ServerContext.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice.js";
export function useGetcurrentuser(){
    const {Serverurl}=useContext(ServerContext);
    const dispatch=useDispatch();
    useEffect(()=>{
        const getcurrentuser=async()=>{
            try {
                const result =await axios.get(`${Serverurl}/api/user/getcurrentuser`,{withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        getcurrentuser();
    },[])
}