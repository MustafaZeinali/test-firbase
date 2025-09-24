import express from "express";
import admin from "firebase-admin";
import serviceAccount from './keyService.json' with {type:'json'};
const router = express();


const randomId = Math.floor(Math.random()*10000).toString();





admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();


router.get('/', async (req , res) =>{


    try {
        const snapshot = await db.collection("newUser").get()
        const data = snapshot.docs.map(doc =>({id: doc.id, ...doc.data()}))
        res.json(data)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.post('/', async (req , res) => {

   try {
    const { email , firstName , lastName} = req.body;
    if (!email){
        return res.status(400).json({error: "email is required"})
    } 
    const userData = {email, firstName, lastName} ;
    const docRef = await db.collection('newUser').add(userData);
    res.status(201).json({message: "user created" , id: docRef.id})
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
router.put("/:id" , async (req , res) =>{
    try {
        const {id}= req.params;
        const updates = req.body;
        if(!id){
            return res.status(400).json({error: "Email is requierd in URL"});
        }
        await db.collection("newUser").doc(id).update(updates);
        res.status(200).json({message: "user Updated" , id})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete('/:id' , async (req , res) =>{
    try {
         const {id} = req.params;
    if(!id){
        res.status(400).json({error: "id is not correct"})
    }
    await db.collection('newUser').doc(id).delete()
    res.status(200).json({message: "user is Deleted"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
   
})
export default router