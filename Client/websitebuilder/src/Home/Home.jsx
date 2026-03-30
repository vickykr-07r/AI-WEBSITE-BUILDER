import { useState } from "react"
import Style from "../Home/Home.module.css"
import Login from "../Login/Login.jsx"
function Home(){
    const hightlight=["Ai Generated Code","Fully Responsive Layouts","Production Ready Output"]
    const [openlogin,setOpenLogin]=useState(false);
    return (
        <>
        <div className={Style.container}>

        <div className={Style.nav}>
        <div className={Style.left}>
        <h1>GenWeb.ai</h1>
        </div>
        <div className={Style.right}>
         <p>Pricing</p>
         <button onClick={()=>{setOpenLogin(true)}}>Get Started</button>
        </div>
        </div>

        <div className={Style.box}>
        <h1>Build Stunning Websites</h1>
        <h2>With AI</h2>
        <p>Describe Your Idea And Let AI Generate A Modern, responsive,production-ready websites.</p>
        <button onClick={()=>{setOpenLogin(true)}}>Get Started</button>
        </div>

        <div className={Style.card}>
            {hightlight.map((h,i)=>{
            return <div key={i} className={Style.cardata}>
                <h1>{h}</h1>
                <p>GenWeb ai builds real websites - clean codes, animation,responsiveness and scalable structure </p>
            </div>
            })}
        </div>

        <footer>
            &copy; {new Date().getFullYear()} GenWeb.AI
        </footer>

        {openlogin && 
        <Login open={openlogin} onClose={() => setOpenLogin(false)} />
        }
        
        </div>
        </>
    )

}

export default Home