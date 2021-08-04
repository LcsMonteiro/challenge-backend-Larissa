const express = require("express");

const router = express.Router();

const controller = require("../controllers/partner.controller");

router.post("/create", controller.createPartner);

router.get("/list", controller.getAll);

router.get("/find/:id", controller.getById);

router.get("/nearest", controller.nearestPartnerToCoordinates);

router.delete("/delete/:id", controller.deletePartner);

module.exports = router;
