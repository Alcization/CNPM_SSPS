import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  publicKey: {
    type: String,
    required: true
  },
  refreshTokenUsed: {
    type: Array, default: []
  },
  refreshToken: {
    type: String,
    required: true
  }
}, {
  collection: COLLECTION_NAME,
  timestamps: true
});

//Export the model
export const keyTokenModel = model(DATABASE_NAME, keyTokenSchema);