import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'Cart'
const COLLECTION_NAME = 'Carts'
// Declare the Schema of the Mongo model
const cartSchema = new Schema({
  cart_state: {
    type: String, required: true,
    enum: ['active', 'completed', 'failed', 'pending'],
    default: 'active'
  },
  cart_userID: { type: String, required: true },
  cart_quantity_pages: { type: Number, default: 0 }
}, {
  collection: COLLECTION_NAME,
  timestamps: {
    createdAt: "createdOn",
    updatedAt: "updatedOn"
  }
});


//Export the model
export const cartModel = model(DATABASE_NAME, cartSchema);