import express from "express";
//import admin from "firebase-admin"
import router from "./apiRoute.js";
import theRouter from "./loginAndRegister.js";
import cors from "cors";



const app = express()
const port = 1221;


app.use(express.json())
app.use(cors())
app.use("/api/users", router)
app.use("/api/create", router)
app.use("/api/updated", router)
app.use("/api/delete", router)
app.use("/api" ,theRouter)
app.use("/api" ,theRouter)

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
    
});