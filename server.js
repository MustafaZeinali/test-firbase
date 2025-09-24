import express from "express";
//import admin from "firebase-admin"
import router from "./apiRoute.js";



const app = express()
const port = 1331;

// intilize firebase



app.use(express.json())

app.use("/api", router)
app.use("/api", router)
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
    
});