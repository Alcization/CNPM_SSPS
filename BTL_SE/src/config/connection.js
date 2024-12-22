import mongoose from "mongoose"
import { env } from "./environment.js"
class Database {
  constructor() {
    this.connect()
  }
  connect(type = "mongodb") {
    mongoose.connect(env.URI_DATABASE, {
      maxPoolSize: 50
    }).then(console.log("Connected Database successfully !"))
      .catch(err => console.log("Error connect !"))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database
    }

    return Database.instance
  }
}
export const instanceMongoDb = Database.getInstance()
