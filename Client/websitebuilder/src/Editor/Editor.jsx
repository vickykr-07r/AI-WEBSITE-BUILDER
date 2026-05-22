import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ServerContext } from "../Context/ServerContext.jsx";
import { useParams } from "react-router-dom";
import Style from "../Editor/Editor.module.css";
import { FaRocket } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import MonacoEditor from "@monaco-editor/react";
export function WebsiteEditor() {
  let { Serverurl } = useContext(ServerContext);
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const iframeRef = useRef(null);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showfullpreview, setshowfullpreview] = useState(false);
  const thinkingSteps = [
    "Understanding your request...",
    "planning layout changes...",
    "Improving responsiveness...",
    "Applying animations...",
    "finalizing update...",
  ];
  const handledeploy = async () => {
    try {
      const result = await axios.get(
        `${Serverurl}/api/website/deploy/${website._id}`,
        { withCredentials: true },
      );
      window.open(`${result.data.url}`, "_blank");
    } catch (error) {
      console.log(error);
    }
  };
  const handleinput = async () => {
    setUpdateLoading(true);
    setMessages((m) => [...m, { role: "user", content: prompt }]);
    try {
      const result = await axios.post(
        `${Serverurl}/api/website/update/${id}`,
        { prompt },
        { withCredentials: true },
      );
      console.log(result);
      setUpdateLoading(false);
      setMessages((m) => [...m, { role: "ai", content: result.data.message }]);
      setCode(result.data.code);
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
    }
  };
  useEffect(() => {
    const i = setInterval(() => {
      setThinkingIndex((i) => (i + 1) % thinkingSteps.length);
    }, 1200);

    return () => clearInterval(i);
  }, [updateLoading]);
  useEffect(() => {
    const getwebsitebyid = async () => {
      try {
        const result = await axios.get(
          `${Serverurl}/api/website/get-by-id/${id}`,
          { withCredentials: true },
        );
        setWebsite(result.data);
        setCode(result.data.latestCode);
        setMessages(result.data.conversation);
      } catch (error) {
        console.log(error);
      }
    };
    getwebsitebyid();
  }, [id, Serverurl]);

  useEffect(() => {
    if (!iframeRef.current || !code) return;

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);

  if (!website) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Style.container}>
      <aside>
        <Header />
        <div className={Style.chat}>
          {messages?.map((m, i) => (
            <div key={i}>{m.content}</div>
          ))}

          {updateLoading && (
            <div className={Style.aloading}>{thinkingSteps[thinkingIndex]}</div>
          )}

          <div className={Style.update}>
            <textarea
              placeholder=""
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button onClick={handleinput}>
              <IoIosSend />
            </button>
          </div>
        </div>
      </aside>

      <div className={Style.main}>
        <div className={Style.prevheader}>
          <div className={Style.prevheaderleft}>
            <span>Live Preview</span>
          </div>
          <div className={Style.prevheaderright}>
            {website.deployed ? (
              ""
            ) : (
              <button onClick={handledeploy}>
                <FaRocket />
                Deploy
              </button>
            )}
            <button
              onClick={() => {
                setShowCode(true);
              }}
            >
              <FaCode />
            </button>
            <button onClick={() => setshowfullpreview(true)}>
              <MdMonitor />
            </button>
          </div>
        </div>

        <iframe ref={iframeRef} sandbox="allow-scripts"></iframe>
      </div>

      {showCode && (
        <div className={Style.codeshow}>
          <div className={Style.codeshownav}>
            <span>
              <h1>Index.html</h1>
            </span>
            <button
              onClick={() => {
                setShowCode(false);
              }}
            >
              <MdCancel />
            </button>
          </div>
          <MonacoEditor
            theme="vs-dark"
            value={code}
            language="html"
            onChange={(v) => {
              setCode(v);
            }}
          />
        </div>
      )}

      {showfullpreview && (
        <div className={Style.setfullpreview}>
          <button
            className={Style.closepreview}
            onClick={() => setshowfullpreview(false)}
          >
            <MdCancel />
          </button>

          <iframe srcDoc={code}></iframe>
        </div>
      )}
    </div>
  );

  function Header() {
    return (
      <div className={Style.header}>
        <span>{website.title}</span>
      </div>
    );
  }
}
