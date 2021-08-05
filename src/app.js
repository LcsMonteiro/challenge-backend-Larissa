const express = require("express");

const swaggerUi = require("swagger-ui-express");

const swaggerDocs = require("../swagger_output.json");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const partner = require("./routes/partner.routes");

app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "Zé Backend Challenge. By Larissa Monteiro." });
});

app.use("/partners", partner);

module.exports = app;
