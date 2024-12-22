import { string } from "joi";
import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'Document'
const COLLECTION_NAME = 'Documents'

const documentItemSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true // Comment de test
  },
  printerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Printer',
    // required: true // Comment de test
  },
  fileName: {
    type: String,

    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
  },
  fileUrl: {
    type: String,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  printTime: {
    type: Date,
    required: true
  },
  isDoubleSided: {
    type: Boolean,
    default: false
  },
  numCopies: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['PENDING', 'PRINTING', 'COMPLETED', 'CANCELLED', 'FAILED'],
    default: 'PENDING'
  },
  estimatedCost: {
    type: Number,
    // required: true // Comment de test
  },
  pageType: {
    type: String,
    enum: ['A4', 'A3', 'A2', "A5", "A1"],
    default: 'A4'
  },
  pageBefore: {
    type: Number,
    required: true
  }
}, {
  collection: COLLECTION_NAME,
  timestamps: true
});

export const documentModel = model(DATABASE_NAME, documentItemSchema); 