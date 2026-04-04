import { useSelector } from "react-redux";
import Style from "../Dashboard/Dashboard.module.css"
import { IoMdArrowRoundBack } from "react-icons/io";
function Dashboard(){
    const {userData} =useSelector(state=>state.user)
    return (
        <>
        <div className={Style.container}>

         <div className={Style.nav}>
         <div className={Style.leftnav}>
          <IoMdArrowRoundBack />
          <h3>Dashboard</h3>
         </div>
         <div className={Style.rightnav}>
          <button>New Website</button>
         </div>
         </div>
         
         <div className={Style.body}>
          <h3>Welcome Back</h3>
          <h1>{userData.name}</h1>
         </div>
        </div>
        </>
    )
}

export default Dashboard