import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const sha1 = require('sha1');

class AuthController {
  async getConnect(req, res) {
    const credentials = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    const hashedPassword = sha1(password);
    const user = await User.findOne({
      where: { email, password: hashedPassword }
    });

    if (!user || hashPassword(password) !== user.password) return res.status(401).json({ message: 'Unauthorized' });
    
    const token = uuidv4();
    const key = `auth_${token}`;
    const expireTime = 24 * 60 * 60; // 24 hours in seconds
    // Store the user id in redis store using key as key
    await redisClient.set(key, user.id, 'EX', expireTime);
    return res.status(200).json({ token});
  }

  async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    const key = `auth_${token}`;

    const deleted = await redisClient.del(key);

    if (!deleted) return res.status(401).json({ error: 'Unauthorized' });

    // Delete the user id from redis store
    return res.status(204).send();
  }
};

module.exports = AuthController;
