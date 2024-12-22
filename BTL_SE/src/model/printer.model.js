import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'Printer'
const COLLECTION_NAME = 'Printers'

const printerSchema = new Schema({
  printerName: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  // campusName: {
  //   type: String,
  //   required: true
  // },// printer mode
  buildingName: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'DISABLED'],
    default: 'ACTIVE'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, {
  collection: COLLECTION_NAME,
  timestamps: {
    createdAt: "createdOn",
    updatedAt: "updatedOn"
  }
});

export const printerModel = model(DATABASE_NAME, printerSchema)