import { useSelector } from "react-redux";
import Style from "../Dashboard/Dashboard.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { ServerContext } from "../Context/ServerContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const { userData } = useSelector(state => state.user);
    const { Serverurl } = useContext(ServerContext);
    const navigate=useNavigate();
    const [website, setWebsite] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copiedId,setcopiedId]=useState(null);
    const handledeploy=async(id)=>{
        try {
            const result=await axios.get(`${Serverurl}/api/website/deploy/${id}`,{withCredentials:true})
            window.open(`${result.data.url}`,"_blank")
            setWebsite((prev) =>
    prev.map((w) =>
        w._id === id
            ? {
                  ...w,
                  deployed: true,
                  deployurl: result.data.url,
              }
            : w
    )
);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

        const handlegetallwebsite = async () => {

            setLoading(true);

            try {

                const result = await axios.get(
                    `${Serverurl}/api/website/getall`,
                    { withCredentials: true }
                );

                setWebsite(result.data || []);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        handlegetallwebsite();

    }, []);
   
    const handlecopy=async(site)=>{
        await navigator.clipboard.writeText(site.deployurl)
        setcopiedId(site._id)
        setTimeout(() => {
            setcopiedId(null);
        }, 2000);
    }
    return (
        <div className={Style.container}>

            <div className={Style.nav}>

                <div className={Style.leftnav}>
                    <IoMdArrowRoundBack  onClick={()=>{navigate("/")}}/>
                    <h3>Dashboard</h3>
                </div>

                <div className={Style.rightnav}>
                    <button onClick={()=>{navigate("/generate")}}>New Website</button>
                </div>

            </div>

            <div className={Style.body}>
                <h3>Welcome Back</h3>
                <h1>{userData.name}</h1>
            </div>

            {loading && (
                <div>
                    Loading Your Websites.....
                </div>
            )}

            {!loading && website?.length === 0 && (
                <div>
                    You Have No Websites.....
                </div>
            )}

            {!loading && website?.length > 0 && (

               <div className={Style.websiteshow}>

{
    website.map((w, i) => (

        <div className={Style.websitecard} key={i}>

            <iframe
                srcDoc={w.latestCode}
                title={`website-${i}`}
                width="100%"
                height="100"
                
            ></iframe>

            <div className={Style.websiteinfo}onClick={()=>{navigate(`/editor/${w._id}`)}}>

                <h3>{w.title}</h3>

                <p>
                    Last Updated{" "}
                    {new Date(w.updatedAt).toLocaleDateString()}
                </p>

                {
                    !w.deployed ? (
                        <button onClick={()=>{handledeploy(w._id)}}>Deploy</button>
                    ) : (
                       <button
    onClick={(e) => {
        e.stopPropagation();
        handlecopy(w);
    }}
>
    {copiedId === w._id ? "Link Copied" : "Share Link"}
</button>
                    )
                }

            </div>

        </div>
    ))
}

</div>
            )}

        </div>
    );
}

export default Dashboard;