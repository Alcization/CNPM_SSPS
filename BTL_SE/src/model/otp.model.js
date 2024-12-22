import { boolean } from "joi";
import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'Otp'
const COLLECTION_NAME = 'Otps'
// Declare the Schema of the Mongo model
const otpSchema = new Schema({
  otp: {
    type: String,
    require: [true, "must provide otp"],
    trim: true
  },
  email: {
    type: String,
    require: [true, "must provide email"],
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  time: {
    type: Date,
    default: Date.now,
    index: { expires: 60 } // set la 60s
  }
}, {
  collection: COLLECTION_NAME,
  timestamps: {
    createdAt: "createdOn",
    updatedAt: "updatedOn"
  }
});


//Export the model
export const otpModel = model(DATABASE_NAME, otpSchema);