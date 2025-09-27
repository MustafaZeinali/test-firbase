import express from "express";
//import admin from "firebase-admin"
import router from "./apiRoute.js";
import theRouter from "./loginAndRegister.js";
import cors from "cors";
import dotenv from "dotenv";


const app = express()
const port = process.env.PORT || 1331;
dotenv.config();

app.use(express.json())
app.use(cors())
app.use("/api/users", router)
app.use("/api/create", router)
app.use("/api/updated", router)
app.use("/api/delete", router)
app.use("/api/auth" ,theRouter)
app.use("/api/auth" ,theRouter)

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
    
});