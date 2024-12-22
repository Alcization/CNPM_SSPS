import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'Payment'
const COLLECTION_NAME = 'Payments'
// Declare the Schema of the Mongo model
const paymentSchema = new Schema({
  order_ID: { type: String, required: true },
  order_checkout: { type: Number, require: true },
  transaction_code: { type: String, require: true },
  // bank_code: { type: String, enum: ["VNPAQRYQR", "VNBANK", "INTCARD"] },// enum(VNPAQRYQR: QR code,VNBANK: thẻ ATM nội địa, INTCARD: thẻ thanh tón quốc tế)
  bank_code: { type: String, require: true },
  date_transcation: { type: String, require: true },
  result_transaction: { type: String, require: true }
}, {
  collection: COLLECTION_NAME,
  timestamps: {
    createdAt: "createdOn",
    updatedAt: "updatedOn"
  }
});


//Export the model
export const paymentModel = model(DATABASE_NAME, paymentSchema);

