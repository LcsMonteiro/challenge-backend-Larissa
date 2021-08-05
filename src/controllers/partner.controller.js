const mongoose = require("mongoose");

const Partner = require("../models/partner.model");

const createPartner = async (req, res) => {
  // #swagger.tags = ["Partner"]
  // #swagger.description = "Endpoint para criar parceiro."
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
    /* #swagger.responses[201] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Parceiro criado" 
}     */
    res.status(201).json(newPartner);
  } catch (err) {
    /* #swagger.responses[500] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Erro interno do servidor." 
}     */
    res.status(500).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  // #swagger.tags = ["Partner"]
  // #swagger.description = "Endpoint para listar todos os parceiros."
  const partner = await Partner.find();
  /* #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Parceiros listados." 
}     */
  return res.status(200).json(partner);
};

const getById = async (req, res) => {
  // #swagger.tags = ["Partner"]
  // #swagger.description = "Endpoint para pesquisar parceiro pelo id."
  // #swagger.parameters["id"] = { description: "ID do usuário." }
  try {
    const idFilter = await Partner.findById(req.params.id);

    if (idFilter === undefined || idFilter === " ") {
      /* #swagger.responses[404] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Parceiro não encontrado." 
}     */
      return res.status(404).json({
        message: "Parceiro não encontrado",
      });
    }
    /* #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Parceiro encontrado." 
}     */
    return res.status(200).json(idFilter);
  } catch (err) {
    /* #swagger.responses[500] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Erro interno do servidor." 
}     */
    return res.status(500).json({ message: err.message });
  }
};

const nearestPartnerToCoordinates = async (req, res) => {
  // #swagger.tags = ["Partner"]
  // #swagger.description = "Endpoint para buscar parceiro mais próximo pela longitude e latitude."
  /* #swagger.parameters["lng"] = {
        description: "longitude",
        type: "string"
        } */
  /* #swagger.parameters["lat"] = {
        description: "latitude",
        type: "string"
        } */
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
      /* #swagger.responses[400] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Nao há parceiros próximos." 
}     */
      return res.status(400).json({ message: "No near partner was found." });
    }
    const orderedPartners = await Partner.aggregate().near({
      near: [longitude, latitude],
      $key: "coverageArea.location",
      spherical: true,
      distanceField: "dist.calculated",
    });
    const nearest = orderedPartners[0];
    /* #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Parceiro mais próximo econtrado." 
}     */
    return res.status(200).json(nearest);
  } catch (err) {
    /* #swagger.responses[404] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Parceiro nao encontrado." 
}     */
    return res.status(404).json({ message: `Partners not found:${err}` });
  }
};

const deletePartner = async (req, res) => {
  // #swagger.tags = ["Partner"]
  // #swagger.description = "Endpoint para deletar parceiro pelo id"
  // #swagger.parameters["id"] = { description: "ID do usuário." }
  try {
    const partner = await Partner.findById(req.params.id);
    if (partner == null) {
      /* #swagger.responses[400] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Parceiro nao encontrado." 
}     */
      return res.status(400).json({ message: "Partner not found" });
    }
    await partner.remove();
    /* #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Parceiro deletado." 
}     */
    return res.status(200).json({ message: "Partner deleted" });
  } catch (err) {
    /* #swagger.responses[500] = { 
      schema: { $ref: "#/definitions/User" },
      description: "Erro interno do servidor." 
}     */
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
