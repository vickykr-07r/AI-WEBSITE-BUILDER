import mongoose from "mongoose"

async function dbconnect(){
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((error)=>{
     console.log(`Database Error ${error}`)
    })
}

export default dbconnect 