const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PUBLISH", "DRAFT"], // Valid values for status
      required: true,
    },
    authors: {
      type: [String], // Array of strings
      required: true,
    },
    categories: {
      type: [String], // Array of strings
      required: true,
    },
  },
  {
    collection: "books",
  }
);

module.exports = mongoose.model("Book", bookSchema);