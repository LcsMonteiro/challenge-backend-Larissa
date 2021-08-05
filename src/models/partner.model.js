const mongoose = require("mongoose");

const multipolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["MultiPolygon"],
    required: true,
  },
  coordinates: [
    {
      type: [[[Number]]],
      index: "2dsphere",
      required: true,
    },
  ],
});

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
    required: true,
  },
  formattedAddress: String,
});

const partnerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tradingName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
    unique: true,
  },
  coverageArea: {
    type: { String },
    location: multipolygonSchema,
    required: true,
  },
  address: {
    type: { String },
    location: pointSchema,
    required: true,
  },
});

module.exports = mongoose.model("partner", partnerSchema);
