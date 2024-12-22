import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'Report'
const COLLECTION_NAME = 'Reports'

const schemaReport = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  numberPrintError: Number,
  numberPrinterDamage: Number,
  printEachBuilding: { type: Map, of: Number },
  pageEachType: { type: Map, of: Number }
});
// Middleware kiểm tra giới hạn số phần tử
schemaReport.pre('save', function (next) {
  if (this.printEachBuilding.size > 4) {
    return next(new Error('printEachBuilding không được vượt quá 4 phần tử.'));
  }
  if (this.pageEachType.size > 4) {
    return next(new Error('pageEachType không được vượt quá 4 phần tử.'));
  }
  next();
});

export const reportModel = model(DATABASE_NAME, schemaReport)