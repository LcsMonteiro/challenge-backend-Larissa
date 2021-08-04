"use strict";

var mongoose = require("mongoose");

var partnerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tradingName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  document: {
    type: Number,
    required: true,
    unique: true
  },
  coverageArea: {
    type: {
      type: String,
      "enum": ["multiPolygon"],
      required: true
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: ""
  }
});
module.exports = mongoose.model("partner", partnerSchema);