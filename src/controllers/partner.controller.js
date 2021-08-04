const mongoose = require("mongoose");

const Partner = require("../models/partner.model");

const createPartner = async (req, res) => {
  const partner = new Partner({
    _id: new mongoose.Types.ObjectId(),
    tradingName: req.body.tradingName,
    ownerName: req.body.ownerName,
    document: req.body.document,
    coverageArea: req.body.coverageArea,
    address: req.body.address,
  });
  try {
    const newPartner = await partner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  const partner = await Partner.find();
  return res.status(200).json(partner);
};

const getById = async (req, res) => {
  try {
    const idFilter = await Partner.findById(req.params.id);

    if (idFilter === undefined || idFilter === " ") {
      return res.status(404).json({
        message: "Parceiro não encontrado",
      });
    }
    return res.status(200).json(idFilter);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const nearestPartnerToCoordinates = async (req, res) => {
  try {
    const longitude = parseFloat(req.query.lng);
    const latitude = parseFloat(req.query.lat);
    const point = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    const partnersCoveringCoordinate = await Partner.find({})
      .where("coverageArea")
      .intersects(point);

    if (partnersCoveringCoordinate.length === 0) {
      return res.status(400).json({ message: "No near partner was found." });
    }
    const orderedPartners = await Partner.aggregate().near({
      near: [longitude, latitude],
      $key: "coverageArea.location",
      spherical: true,
      distanceField: "dist.calculated",
    });
    const nearest = orderedPartners[0];
    return res.status(200).json(nearest);
  } catch (err) {
    return res.status(400).json({ message: `Partners not found:${err}` });
  }
};

const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (partner == null) {
      return res.status(400).json({ message: "Partner not found" });
    }
    await partner.remove();
    return res.status(201).json({ message: "Partner deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPartner,
  nearestPartnerToCoordinates,
  getAll,
  getById,
  deletePartner,
};
