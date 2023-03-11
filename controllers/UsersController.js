/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';


class UsersControllers {
  async createNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });

    const user = await dbClient.db.collection('users').findOne({ email });
    if (user) return res.status(400).json({ error: 'Already exist' });
    const hashedPass = sha1(password);
    const newUser = new User({ email, password: hashedPass });
    try {
      const savedUser = await newUser.save();
      return res.status(201).json({ email: savedUser.email, id: savedUser._id });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    } 

    const UsersController = {me: async (req, res) => {
  //async getMe(req, res) {
    const tokenHeader = req.headers['x-token'];
    const key = `auth_${token}`;

    // Get the user id from redis store using token as key
    const userId = await redisClient.get(key);
    //console.log(userId);
	  
    // Get the user from the database using the user id
    const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
    // res.status(401).send({ error: 'Unauthorized' }); // if user not found
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    // Return the user
    return res.status(200).json(user);
  }
}

module.exports = AuthController;
