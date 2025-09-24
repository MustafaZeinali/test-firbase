import express from "express";
//import admin from "firebase-admin"
import router from "./apiRoute.js";



const app = express()
const port = 1331;


app.use(express.json())

app.use("/api/users", router)
app.use("/api/create", router)
app.use("/api/updated", router)
app.use("/api/delete", router)
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
    
});