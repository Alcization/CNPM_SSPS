import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'Order'
const COLLECTION_NAME = 'Orders'
// Declare the Schema of the Mongo model
const orderSchema = new Schema({
  order_state: {
    type: String, required: true,
    enum: ['cancel', 'success', 'failed', 'pending'],
    default: 'pending'
  },
  order_userID: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  order_payment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment',
    default: {}
  },
  quantity: { type: Number, required: true }
}, {
  collection: COLLECTION_NAME,
  timestamps: {
    createdAt: "createdOn",
    updatedAt: "updatedOn"
  }
});


//Export the model
export const orderModel = model(DATABASE_NAME, orderSchema);