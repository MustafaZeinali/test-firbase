import express from "express";
import admin from "firebase-admin";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { isEmailValid, isNameValid } from "./validation.js";

const theRouter = express.Router();
const db = admin.firestore();
dotenv.config();

const salty = parseInt(process.env.SALT_ROUNDS, 10) || 10;
console.log("salt rounds" ,salty , typeof salty);

/*const theSalt_rounds = (()=>{
    const checkSAlt = Number(process.env.SALT_ROUNDS);
    return Number.isInteger(checkSAlt) && checkSAlt > 0 ? checkSAlt :10;
})();*/

// register new user
theRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkEmail = isEmailValid(username);
    if (!checkEmail.valid || !username) {
      return res.status(400).json({ error: "username is not valid" });
    }
    const hashedPassword = await bcrypt.hash(password, salty);
    console.log("original password" , password);
    
    console.log("test hashpass", hashedPassword);
    const userData = { username, password: hashedPassword };

    const docRef = await db.collection("user").add(userData);
    return res.status(201).json({ message: "user is registered", id: docRef.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//login the user
theRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // const userValid = isEmailValid(username)
    if (!username || !password) {
      return res.status(400).json({ error: "passwrod or username required" });
    }
    /*if(!userValid){
        return res.status(400).json({error : userValid.message})
    }*/
    const found = db
      .collection("user")
      .where("username", "==", username)
      .limit(1);
    const snap = await found.get();
    if (snap.empty) {
      return res.status(400).json({ error: "username is wrong" });
    }
    const userDoc = snap.docs[0];
    const user = userDoc.data();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "password is wrong" });
    }
    return res.status(200).json({ message: "login successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default theRouter;
