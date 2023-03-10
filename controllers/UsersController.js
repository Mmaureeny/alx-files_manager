import dbClient from "../utils/db"
import crypto from 'crypto';

export const hashPassword = (password) => {
    const sha1 = crypto.createHash('sha1');
    sha1.update(password);
    return sha1.digest('hex');
  }

export const postNew = async (req, res)=>{
    console.log(req.body)
    const {email, password} = req.body
    try {  
        if(!email){
            res.status(400).json({"error":"Missing email"})
        }
        if(!password){
            res.status(400).json({"error":"Missing password"})
        }
        const user = await dbClient.db.collection('users').findOne({email})
        if(user) res.status(400).json({"error":"Already exist"})
        const hashedPass = hashPassword(password)
        const newUser = await dbClient.db.collection('users').insertOne({email,password:hashedPass})
        console.log(newUser)
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}
