
import { required } from "joi";
import mongoose from "mongoose"
const { Schema, model } = mongoose
const DATABASE_NAME = 'Default_Page'
const COLLECTION_NAME = 'Default_Pages'
// Declare the Schema of the Mongo model
const schemaDefaultPage = new mongoose.Schema({
  defaultPage: {
    type: Number,
    require: true,
    validate: {
      validator: (value) => {
        return value > -1;
      },
      message: 'PageFree must be greater than -1 page!'
    }
  },
  startDateHK1: Date,
  // startDateHK2: Date,
  // limitNumberPages: {
  //   type: Number,
  //   require: true,
  //   validate: {
  //     validator: (value) => {
  //       return value > 0;
  //     },
  //     message: 'Limit must be greater than 0 page!'
  //   }
  // },
  priceA4: {
    type: Number,
    require: true,
    validate: {
      validator: (value) => {
        return value > 0;
      },
      message: 'Price must be greater than 0 VNĐ!'
    }
  },
  // fileType: {
  //   type: Array,
  //   require: true,
  //   default: []
  // },
  semester: {
    type: String,
    required: true
  }
}, {
  collection: COLLECTION_NAME,
  timestamps: true
});



//Export the model
export const defaultPageModel = model(DATABASE_NAME, schemaDefaultPage);