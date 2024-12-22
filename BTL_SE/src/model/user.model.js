import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'User'
const COLLECTION_NAME = 'Users'
// Declare the Schema of the Mongo model
const userSchema = new Schema({
  studentCode: { type: String, required: true, default: '' },
  email: { type: String, required: true, },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  givenName: { type: String, required: true },
  address: { type: String, required: true },
  admin: { type: Boolean, required: true },
  numberPageValid: { type: Number, default: 0 }
}, {
  collection: COLLECTION_NAME,
  timestamps: {
    createdAt: "createdOn",
    updatedAt: "updatedOn"
  }
});


//Export the model
export const userModel = model(DATABASE_NAME, userSchema);