import redisClient from "../utils/redis"
import dbClient from "../utils/db" 
const getStatus = async (req,res) =>{
	try{
		const db = await dbClient.isAlive()
		const redis = await redisClient.isAlive()
		res.status(200).json({redis ,db})
	}catch(err){
	res.status(400).json({msg:err.message})
	}
}

const getStats = async(req,res)=>{
	try {
		const users = await dbClient.nbUsers()
		const files = await dbClient.nbFiles()
		res.status(200).json({users, files})
	} catch (err) {
		res.status(400).json({msg:err.message})
	}
}

export const f =  {getStats, getStatus}