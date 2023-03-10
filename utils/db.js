// const MongoClient = require('mongodb').MongoClient;

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const {
      DB_HOST = '127.0.0.1',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager',
    } = process.env;

    const url = `mongodb://${DB_HOST}:${DB_PORT}`;

    this.client = MongoClient(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // family: 4
    });

    this.client.connect().catch((error) => {
      console.error('Error occurred while connecting to MongoDB:', error);
    });

    this.db = this.client.db(DB_DATABASE);
  }

  async isAlive() {
    return !!this.client && !!this.client.topology && this.client.topology.isConnected();
    // return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.db.collection('users');
    const countUsers = await users.countDocuments();
    return countUsers;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const countFiles = await files.countDocuments();
    return countFiles;
  }

//   connect() {
//     return this.client.connect();
//   }
//   disconnect() {
//     return this.client.disconnect();
//   }
//   query() {
//     return this.client.query();
//   }
}

const dbClient = new DBClient();
module.exports = dbClient;
