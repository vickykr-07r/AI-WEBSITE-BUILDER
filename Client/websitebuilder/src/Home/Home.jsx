import Style from "../Home/Home.module.css"
function Home(){
    return (
        <>
        <div className={Style.container}>

        <div className={Style.nav}>
        <div className={Style.left}>
        <h1>GenWeb.ai</h1>
        </div>
        <div className={Style.right}>
         <p>Pricing</p>
         <button>Get Started</button>
        </div>
        </div>

        <div className={Style.box}>
        <h1>Build Stunning Websites</h1>
        <h2>With AI</h2>
        <p>Describe Your Idea And Let AI Generate A Modern, responsive,production-ready websites.</p>
        <button>Get Started</button>
        </div>
        
        </div>
        </>
    )

}

export default Home