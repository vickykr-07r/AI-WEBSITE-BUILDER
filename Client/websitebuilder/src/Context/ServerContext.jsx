import { Children, createContext } from "react"

export const ServerContext=createContext()
function Context({children}){
    const Serverurl="http://localhost:8080"
    const value={
        Serverurl
    }
    return(
        <ServerContext.Provider value={value}>
         {children}
        </ServerContext.Provider>
    )
}

export default Context