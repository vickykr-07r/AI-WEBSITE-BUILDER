import { useParams } from "react-router-dom";
import Style from "../LiveSite/LiveSite.module.css";
import { useContext, useEffect, useState } from "react";
import { ServerContext } from "../Context/ServerContext";
import axios from "axios";

function LiveSite() {
    const { id } = useParams();
    const { Serverurl } = useContext(ServerContext);

    const [html, setHtml] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getwebsitebyid = async () => {
            try {
                setLoading(true);

                const result = await axios.get(
                    `${Serverurl}/api/website/getbyslug/${id}`,
                    { withCredentials: true }
                );

                setHtml(result.data.latestCode);
                setError("");
            } catch (error) {
                console.log(error);
                setError("Site not found");
            } finally {
                setLoading(false); 
            }
        };

        getwebsitebyid();
    }, [id, Serverurl]);

    if (loading) {
        return <h1 className={Style.message}>Loading...</h1>;
    }

    if (error) {
        return <h1 className={Style.message}>{error}</h1>;
    }

    return (
        <div className={Style.container}>
            <iframe
                title="Live Website"
                srcDoc={html}
                sandbox="allow-scripts allow-same-origin allow-forms"
                className={Style.frame}
            />
        </div>
    );
}

export default LiveSite;