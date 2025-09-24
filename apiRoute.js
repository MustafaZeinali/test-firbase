import express from "express";
import admin from "firebase-admin";
import serviceAccount from './keyService.json' with {type:'json'};
const router = express();







admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();


router.get('/users', async (req , res) =>{


    try {
        const snapshot = await db.collection("newUser").get()
        const data = snapshot.docs.map(doc =>({id: doc.id, ...doc.data()}))
        res.json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.post('/create', async (req , res) => {

   try {
    const { email , firstName , lastName} = req.body;
    if (!email){
        return res.status(400).json({error: "eamil is required"})
    } 
    const userData = {email, firstName, lastName} ;
    await db.collection('newUser').doc(firstName).set(userData)
    res.status(201).json({message: "user created"})
   } catch (error) {
    res.status(500).json({error: error.message})
   }
    
})
/*app.post("/create", async (req,res)=> {
    try {
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        const response = await db.collection("newUser").doc(id).set(userJson);
        
        console.log("userJson", userJson);
        console.log("user", response);
        res.status(201).send(response);

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})*/

export default router